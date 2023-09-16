from django.core.mail import send_mail, EmailMessage
from django.utils.html import strip_tags
from django.core.mail import send_mail
from user.models import User
from datetime import datetime
from decouple import config
import csv
import os
import requests

def gov_send_email(recipient_mail,positive,negative,neutral,category):
    
    subject = 'Automated News Monitoring Feedback - Positive Sentiment Analysis'
    
    html_message = f"""
<!DOCTYPE html>
<html>
<head>
    <title>{subject}</title>
</head>
<body>
    <p>Dear Government Officer,</p>
    
    <p>{{ news_analysis }}</p>

    <p>Positive : { positive }%</p>
    <p>Neutral : { neutral}%</p>
    <p>Negative : { negative }%</p>

    <p>Category : {category}</p>

    <p>To explore the detailed analysis and categories, please click on the following link:</p>
    <a href="http://localhost:3001/checknews">http://localhost:3001/checknews</a>

    <p>Your feedback on this system is highly valued and appreciated. If you have any questions or need further assistance, please do not hesitate to reach out.</p>

    <p>Best regards,</p>
    <p>Your Name</p>
    <p>Your Position/Title</p>
    <p>Your Contact Information</p>
</body>
</html>
"""

    from_email = config("EMAIL_HOST_USER")  
    recipient_list = [recipient_mail]
    
    send_mail(
        subject,
        strip_tags(html_message),
        from_email,
        recipient_list,
        html_message=html_message,
    )
