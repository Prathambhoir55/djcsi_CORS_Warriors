from django.urls import path
from . import views

urlpatterns = [
    path('hr-register/', views.HRRegisterAPI.as_view(), name = 'hr-registration'),
    path('get-employee/', views.EmployeeGetAPI.as_view(), name = 'get-employee'),
    path('get-all-emp/', views.EmployeeListAPI.as_view(), name = 'get-all-emp'),
    path('hr-get-emp/<int:pk>', views.HRGetEmployee.as_view(), name = 'hr-get-emp'),
]