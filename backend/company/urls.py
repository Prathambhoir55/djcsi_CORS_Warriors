from django.urls import path
from . import views

urlpatterns = [
    path('hr-register/', views.HRRegisterAPI.as_view(), name = 'hr-registration'),
]