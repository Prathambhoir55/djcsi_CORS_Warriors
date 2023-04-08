from rest_framework import serializers
from .models import *
from company.serializers import HRGetSerializer

class BlackFlagPostSerializer(serializers.ModelSerializer):
    hr = serializers.IntegerField(read_only=True)

    class Meta:
        model = BlackFlag
        fields = ['photo', 'hr', 'text']

    def create(self, validated_data, hr):
        obj = BlackFlag.objects.create(hr=hr,**validated_data)
        validated_data['hr'] = hr.user.name
        return validated_data


class BlackFlagListSerializer(serializers.ModelSerializer):
    hr = HRGetSerializer()

    class Meta:
        model = BlackFlag
        fields = ['photo', 'hr', 'text']