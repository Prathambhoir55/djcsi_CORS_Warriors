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
        return User.objects.create_user(**validated_data)