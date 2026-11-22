from fastapi import APIRouter, HTTPException
from models.contact import ContactFormSubmission, ContactFormRequest
from services.email_service import send_business_notification, send_customer_confirmation
import logging

router = APIRouter(prefix="/contact", tags=["contact"])
logger = logging.getLogger(__name__)


@router.post("/submit", response_model=dict)
async def submit_contact_form(form_request: ContactFormRequest):
    """
    Contactformulier: stuurt de aanvraag per e-mail door.
    Er wordt niets in een database bewaard; de e-mail is de aanvraag.
    """
    submission = ContactFormSubmission(**form_request.dict())

    # De mail naar de zaak is de aanvraag zelf: mislukt die, dan moet de
    # bezoeker een foutmelding krijgen, zodat hij kan bellen.
    try:
        await send_business_notification(form_request.dict())
    except Exception as e:
        logger.error(f"Aanvraag {submission.id} niet doorgestuurd: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Er is een fout opgetreden bij het verzenden van uw aanvraag. Probeer het later opnieuw."
        )

    # De bevestiging naar de bezoeker is bijkomstig: een fout daar mag de
    # aanvraag niet doen mislukken.
    try:
        await send_customer_confirmation(
            customer_email=form_request.email,
            customer_name=form_request.name
        )
        email_status = "sent"
    except Exception as e:
        logger.error(f"Bevestigingsmail voor aanvraag {submission.id} mislukt: {str(e)}")
        email_status = "confirmation_failed"

    return {
        "status": "success",
        "message": "Uw aanvraag is succesvol ontvangen.",
        "submission_id": submission.id,
        "email_status": email_status
    }
