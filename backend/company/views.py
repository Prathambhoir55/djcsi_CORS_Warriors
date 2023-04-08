from rest_framework.generics import GenericAPIView, ListAPIView
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
    
class EmployeeRegisterAPI(GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = EmployeeRegisterSerializer
    
    def post(self,request,*args,**kwargs):
        data = request.data
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception = True)
        user = serializer.save()
        token = Token.objects.create(user=user)
        return Response({"message":"Success", "token":token.key}, status=status.HTTP_201_CREATED)


class EmployeeListAPI(ListAPIView):
    serializer_class = EmployeeGetSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Employee.objects.all()


class EmployeeGetAPI(GenericAPIView):
    serializer_class = EmployeeGetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        try:
            user = User.objects.get(id = request.user.id)
            serializer = self.serializer_class(user)
        except:
            return Response("User not found", status= status.HTTP_404_NOT_FOUND)
        return Response(serializer.data)

    def put(self,request,*args,**kwargs):
        user = User.objects.get(id=request.user.id)
        data = request.data
        serializer = self.serializer_class(data=data)
        user = serializer.update(request.data, user)
        return Response(request.data, status = status.HTTP_200_OK)

class HRGetEmployee(GenericAPIView):
    serializer_class = EmployeeGetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        try:
            user = User.objects.get(id = request.user.id)
            serializer = self.serializer_class(user)
        except:
            return Response("User not found", status= status.HTTP_404_NOT_FOUND)
        return Response(serializer.data)