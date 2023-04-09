from django.db import models
from company.models import *

# Create your models here.

class BlackFlag(models.Model):
    photo = models.URLField(max_length=500)
    hr = models.ForeignKey(HR, on_delete=models.SET_NULL, blank=True, null = True)
    text = models.CharField(max_length=200, blank=True)