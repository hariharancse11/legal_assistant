# authentication/models.py
from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # Add additional fields like profile picture, etc.


from django.db import models

class Document(models.Model):
    user_id = models.TextField()
    content = models.TextField()
    time = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Document {self.id}"

