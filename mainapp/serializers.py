from rest_framework import serializers
from .models import *
from django.contrib.auth.hashers import make_password

class LoginSerializer(serializers.ModelSerializer):
    def validate(self, attrs):
        return attrs

    class Meta:
        model = User
        fields = ('user_id', 'user_pwd')

class CourseSerializer(serializers.ModelSerializer):

    class Meta:
        fields = '__all__'
        model = Course

class UserSerializer(serializers.ModelSerializer):
    user = CourseSerializer(many=True, read_only = True)

    def create(self, validated_data):
        validated_data['user_pwd'] = make_password(validated_data['user_pwd'])
        user = User.objects.create(**validated_data)
        return user

    def validate(self, attrs):
        return attrs

    class Meta:
        fields = ("user_id", "user_name", "user_pwd", "user_type", "user_org", "user")
        model = User

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Question
        
class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = UserData


class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Chat

class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Submission
