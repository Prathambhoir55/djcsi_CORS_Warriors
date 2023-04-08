from rest_framework import serializers
from .models import *
from accounts.models import *
from accounts.serializers import  UserRegisterSerializer

class HRRegisterSerializer(serializers.ModelSerializer):
    user = UserRegisterSerializer()

    class Meta:
        model = HR
        fields = ['user']

    def validate(self, attrs):
        attrs = attrs.get('user')
        return attrs

    def create(self, validated_data):
        validated_data['is_active'] = True
        user = User.objects.create_user(**validated_data)
        hr, created = HR.objects.get_or_create(user = user)
        return user
    
class EmployeeRegisterSerializer(serializers.ModelSerializer):
    user = UserRegisterSerializer()

    class Meta:
        model = Employee
        fields = ['user', 'photo']

    def validate(self, attrs):
        attrs = attrs.get('user')
        return attrs

    def create(self, validated_data):
        validated_data['is_active'] = True
        return User.objects.create_user(**validated_data)
    

class HRGetSerializer(serializers.ModelSerializer):
    user = UserRegisterSerializer()
    class Meta:
        model = HR
        fields = '__all__'


class EmployeeGetSerializer(serializers.ModelSerializer):
    user = UserRegisterSerializer()

    class Meta:
        model = Employee
        fields = ['user','arrival_time', 'leaving_time', 'hr', 'aadhar_card', 'pan_card', 'is_verified', 'photo']

class MyComplaintSerializer(serializers.ModelSerializer):

    class Meta:
        model=Complaint
        fields=['issued_by','issued_for','text','is_resolved','hr']


class HRComplaintSerializer(serializers.ModelSerializer):

    class Meta:
        model=Complaint
        fields=['issued_by','issued_for','text','is_resolved','hr']


class RegisterComplaintSerializer(serializers.ModelSerializer):
    is_resolved = serializers.BooleanField(default=False)
    class Meta:
        model=Complaint
        fields=['issued_by','issued_for','text','is_resolved']

    
