from rest_framework import serializers
from company.models import *
from accounts.models import *
from accounts.serializers import  UserRegisterSerializer

class SociabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Flag
        fields = ['sociability']

    