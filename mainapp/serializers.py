from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = User

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Question
        
class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = UserData