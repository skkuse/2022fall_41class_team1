<<<<<<< HEAD:backend/mainapp/serializers.py
from rest_framework import serializers
from .models import *
from django.contrib.auth.hashers import make_password

class LoginSerializer(serializers.ModelSerializer):
    def validate(self, attrs):
        return attrs

    class Meta:
        model = User
        fields = ('user_id', 'user_pwd')

class CourseIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('user_id', )

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Question

class CourseSerializer(serializers.ModelSerializer):
    # question = QuestionSerializer(many=True, read_only=True)
    class Meta:
        fields = ('course', 'user_id', 'course_name', 'question')
        model = Course

class UserSerializer(serializers.ModelSerializer):
    user = CourseSerializer(many=True, read_only=True)

    def create(self, validated_data):
        validated_data['user_pwd'] = make_password(validated_data['user_pwd'])
        user = User.objects.create(**validated_data)
        return user

    def validate(self, attrs):
        return attrs

    class Meta:
        fields = ("user_id", "user_name", "user_pwd", "user_type", "user_org", "user")
        model = User

class QuestionIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['course', ]

class QuestionNameSerializer(serializers.ModelSerializer):
    question = serializers.PrimaryKeyRelatedField(required=True, queryset=Question.objects.all())
    class Meta:
        model = Question
        fields = ('question', )
        
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
=======
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

class ReturnDataSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = ReturnData
>>>>>>> b71e8bd3c7d48e401a6543aef7b9253bc6411713:mainapp/serializers.py
