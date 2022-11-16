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

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Course

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Chat

class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Submission