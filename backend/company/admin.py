from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(HR)
admin.site.register(Employee)
admin.site.register(Complaint)
admin.site.register(Review)
admin.site.register(Flag)