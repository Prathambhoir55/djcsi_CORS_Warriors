from django.shortcuts import render
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework.authtoken.models import Token
from .serializers import *
from rest_framework.response import Response
from rest_framework import status,permissions
# Create your views here.


class SociabilityAPI(GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = SociabilitySerializer
    
    def post(self,request,*args,**kwargs):
        data = request.data
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception = True)
        user = serializer.save()
        return Response({"message":"Success", "rating": serializer.validated_data}, status=status.HTTP_201_CREATED)
