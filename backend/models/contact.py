from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
import uuid

class ContactFormSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    location: str
    message: Optional[str] = ""
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "new"  # new, contacted, closed

class ContactFormRequest(BaseModel):
    name: str
    email: EmailStr
    phone: str
    location: str
    message: Optional[str] = ""
