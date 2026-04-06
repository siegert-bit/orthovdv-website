from fastapi import APIRouter, HTTPException
from models.contact import ContactFormSubmission, ContactFormRequest
from services.email_service import send_business_notification, send_customer_confirmation
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging

router = APIRouter(prefix="/contact", tags=["contact"])
logger = logging.getLogger(__name__)

# Database connection will be injected from main server.py
db = None

def set_database(database):
    global db
    db = database

@router.post("/submit", response_model=dict)
async def submit_contact_form(form_request: ContactFormRequest):
    """
    Submit contact form - saves to database and sends emails
    """
    try:
        # Create contact submission object
        submission = ContactFormSubmission(**form_request.dict())
        
        # Save to database
        await db.contact_submissions.insert_one(submission.dict())
        logger.info(f"Contact form saved to database: {submission.id}")
        
        # Send emails in parallel (non-blocking)
        try:
            # Send notification to business
            await send_business_notification(form_request.dict())
            
            # Send confirmation to customer
            await send_customer_confirmation(
                customer_email=form_request.email,
                customer_name=form_request.name
            )
            
            email_status = "sent"
        except Exception as e:
            logger.error(f"Email sending failed: {str(e)}")
            email_status = "failed"
            # Don't fail the whole request if emails fail
        
        return {
            "status": "success",
            "message": "Uw aanvraag is succesvol ontvangen. U ontvangt een bevestigingsmail.",
            "submission_id": submission.id,
            "email_status": email_status
        }
        
    except Exception as e:
        logger.error(f"Error submitting contact form: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Er is een fout opgetreden bij het verzenden van uw aanvraag. Probeer het later opnieuw."
        )

@router.get("/submissions")
async def get_all_submissions():
    """
    Get all contact form submissions (for admin use)
    """
    try:
        submissions = await db.contact_submissions.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
        return {"submissions": submissions, "count": len(submissions)}
    except Exception as e:
        logger.error(f"Error fetching submissions: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch submissions")
