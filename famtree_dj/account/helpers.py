from djoser import utils
from djoser.compat import get_user_email_field_name
from djoser.conf import settings


def send_password_reset_email(user):
    context = {
        "user": user,
        "uid": user.pk,
        "token": "TOKEN_VALUE"  # Replace "TOKEN_VALUE" with the actual token value
    }
    email_subject = "Password Reset"
    email_message = """
    Hello {user},

    You have requested to reset your password. Please use the following details to reset your password:

    UID: {uid}
    Token: {token}

    You need to enter the UID and token with desire New Password.

    Thank you.
    """.format(**context)
    
    to = [getattr(user, get_user_email_field_name())]
    utils.send_email(
        to,
        email_subject,
        email_message,
    )
