from django.urls import path
from . import views

urlpatterns = [
    path('add-social/', views.SociabilityAPI.as_view(), name = 'add-social'),
]