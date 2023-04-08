from rest_framework.generics import GenericAPIView
from rest_framework.authtoken.models import Token
from .serializers import *
from rest_framework.response import Response
from rest_framework import status,permissions
# Create your views here.


class HRRegisterAPI(GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = HRRegisterSerializer
    
    def post(self,request,*args,**kwargs):
        data = request.data
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception = True)
        user = serializer.save()
        token = Token.objects.create(user=user)
        return Response({"message":"Success", "token":token.key}, status=status.HTTP_201_CREATED)
