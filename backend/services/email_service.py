import os
import asyncio
import logging
import resend
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

# Configure Resend
resend.api_key = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
BUSINESS_EMAIL = os.environ.get('BUSINESS_EMAIL', 'siegert@orthovdv.be')

logger = logging.getLogger(__name__)

def get_business_notification_html(form_data: dict) -> str:
    """HTML email template for business notification"""
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <!-- Header -->
                        <tr>
                            <td style="background-color: #1A4D4D; padding: 30px; text-align: center;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Nieuwe Contactaanvraag</h1>
                                <p style="color: #70C6A5; margin: 10px 0 0 0; font-size: 14px;">Van de Voorde Orthopedie</p>
                            </td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                            <td style="padding: 30px;">
                                <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px;">
                                    U heeft een nieuwe contactaanvraag ontvangen via uw website:
                                </p>
                                
                                <table width="100%" cellpadding="10" cellspacing="0" style="border: 1px solid #e0e0e0; border-radius: 4px; margin-bottom: 20px;">
                                    <tr>
                                        <td style="background-color: #f9f9f9; font-weight: bold; color: #1A4D4D; width: 30%;">Naam:</td>
                                        <td style="color: #333333;">{form_data['name']}</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color: #f9f9f9; font-weight: bold; color: #1A4D4D;">Email:</td>
                                        <td style="color: #333333;"><a href="mailto:{form_data['email']}" style="color: #1A4D4D; text-decoration: none;">{form_data['email']}</a></td>
                                    </tr>
                                    <tr>
                                        <td style="background-color: #f9f9f9; font-weight: bold; color: #1A4D4D;">Telefoon:</td>
                                        <td style="color: #333333;"><a href="tel:{form_data['phone']}" style="color: #1A4D4D; text-decoration: none;">{form_data['phone']}</a></td>
                                    </tr>
                                    <tr>
                                        <td style="background-color: #f9f9f9; font-weight: bold; color: #1A4D4D;">Woonplaats:</td>
                                        <td style="color: #333333;">{form_data['location']}</td>
                                    </tr>
                                </table>
                                
                                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; border-left: 4px solid #1A4D4D;">
                                    <p style="margin: 0 0 10px 0; font-weight: bold; color: #1A4D4D;">Bericht:</p>
                                    <p style="margin: 0; color: #333333; white-space: pre-wrap;">{form_data.get('message', 'Geen bericht')}</p>
                                </div>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style="background-color: #f9f9f9; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
                                <p style="margin: 0; color: #666666; font-size: 12px;">
                                    Deze email werd automatisch verzonden via uw website contactformulier.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    """

def get_customer_confirmation_html(customer_name: str) -> str:
    """HTML email template for customer confirmation"""
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <!-- Header -->
                        <tr>
                            <td style="background-color: #1A4D4D; padding: 30px; text-align: center;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Bedankt voor uw aanvraag!</h1>
                                <p style="color: #70C6A5; margin: 10px 0 0 0; font-size: 14px;">Van de Voorde Orthopedie</p>
                            </td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                            <td style="padding: 30px;">
                                <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px;">
                                    Beste {customer_name},
                                </p>
                                
                                <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                                    Hartelijk dank voor uw interesse in onze diensten. Ik heb uw aanvraag goed ontvangen en zal zo spoedig mogelijk contact met u opnemen.
                                </p>
                                
                                <div style="background-color: #f0f8f5; padding: 20px; border-radius: 4px; border-left: 4px solid #70C6A5; margin: 20px 0;">
                                    <p style="margin: 0 0 10px 0; font-weight: bold; color: #1A4D4D;">Wat gebeurt er nu?</p>
                                    <ul style="margin: 0; padding-left: 20px; color: #333333;">
                                        <li style="margin-bottom: 8px;">Ik bekijk uw aanvraag persoonlijk</li>
                                        <li style="margin-bottom: 8px;">U ontvangt binnen 24-48 uur een reactie</li>
                                        <li style="margin-bottom: 8px;">We plannen een afspraak op een moment dat u uitkomt</li>
                                    </ul>
                                </div>
                                
                                <p style="margin: 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                                    Heeft u dringende vragen? U kunt mij altijd direct bereiken via:
                                </p>
                                
                                <table width="100%" cellpadding="10" cellspacing="0" style="margin-bottom: 20px;">
                                    <tr>
                                        <td style="text-align: center;">
                                            <a href="tel:+32472917918" style="display: inline-block; background-color: #F4A531; color: #1A4D4D; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; margin: 5px;">
                                                📞 +32 472 91 79 18
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="text-align: center;">
                                            <a href="https://wa.me/32472917918" style="display: inline-block; background-color: #25D366; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; margin: 5px;">
                                                💬 WhatsApp
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                                
                                <p style="margin: 20px 0 0 0; color: #333333; font-size: 16px;">
                                    Met vriendelijke groet,<br>
                                    <strong style="color: #1A4D4D;">Siegert Van de Voorde</strong><br>
                                    <span style="color: #666666; font-size: 14px;">Orthopedisch Schoentechnoloog</span>
                                </p>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style="background-color: #f9f9f9; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
                                <p style="margin: 0 0 10px 0; color: #1A4D4D; font-weight: bold;">Van de Voorde Orthopedie</p>
                                <p style="margin: 0; color: #666666; font-size: 12px;">
                                    Antwerpsesteenweg 29 bus 7, 2500 Lier<br>
                                    RIZIV: 101546-46 001 | BTW: BE 1021.586.776
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    """

async def send_business_notification(form_data: dict) -> dict:
    """Send email notification to business"""
    params = {
        "from": SENDER_EMAIL,
        "to": [BUSINESS_EMAIL],
        "subject": f"Nieuwe Contactaanvraag van {form_data['name']}",
        "html": get_business_notification_html(form_data)
    }
    
    try:
        email = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Business notification sent successfully. Email ID: {email.get('id')}")
        return {"status": "success", "email_id": email.get("id")}
    except Exception as e:
        logger.error(f"Failed to send business notification: {str(e)}")
        raise Exception(f"Failed to send business notification: {str(e)}")

async def send_customer_confirmation(customer_email: str, customer_name: str) -> dict:
    """Send confirmation email to customer"""
    params = {
        "from": SENDER_EMAIL,
        "to": [customer_email],
        "subject": "Bevestiging - Uw aanvraag bij Van de Voorde Orthopedie",
        "html": get_customer_confirmation_html(customer_name)
    }
    
    try:
        email = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Customer confirmation sent successfully. Email ID: {email.get('id')}")
        return {"status": "success", "email_id": email.get("id")}
    except Exception as e:
        logger.error(f"Failed to send customer confirmation: {str(e)}")
        raise Exception(f"Failed to send customer confirmation: {str(e)}")
