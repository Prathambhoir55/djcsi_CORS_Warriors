from django.db import models
from accounts.models import User

# Create your models here.
class HR(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Employee(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    arrival_time = models.TimeField(blank=True, null=True)
    leaving_time = models.TimeField(blank=True, null=True)
    hr = models.ForeignKey(HR, on_delete=models.SET_NULL, blank=True, null = True)
    photo = models.URLField(max_length=200)
    aadhar_card = models.URLField(max_length=200, blank=True)
    pan_card = models.URLField(max_length=200, blank = True)
    is_verified = models.BooleanField(blank=True, default=False)

class Complaint(models.Model):
    issued_by = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name="issued_by")
    issued_for = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name="issued_for")
    is_resolved = models.BooleanField(blank=True, default=False)
    text = models.CharField(max_length=300)


class Attendance(models.Model):
    date = models.DateField(models.Model)
    start_time = models.TimeField(blank=True, null=True)
    end_time = models.TimeField(blank=True, null=True)
    hours = models.IntegerField(blank=True, null=True)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    is_late = models.BooleanField(blank=True, default=False) 
    overtime_hours = models.IntegerField(blank=True, null=True)


class Review(models.Model):
    text = models.CharField(max_length= 300)
    rating = models.DecimalField(max_digits=3, decimal_places=1, blank=True, default=0)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)


class Flag(models.Model):
    punctuality = models.DecimalField(max_digits=3, decimal_places=1, blank=True, default=0)
    sociability = models.DecimalField(max_digits=3, decimal_places=1, blank=True, default=0)
    rating = models.DecimalField(max_digits=3, decimal_places=1, blank=True, default=0) #avg rating of Reviews
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
