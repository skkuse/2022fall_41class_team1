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
        model = Lecture
        fields = ('user_id', )

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Question

class CourseSerializer(serializers.ModelSerializer):
    # question = QuestionSerializer(many=True, read_only=True)
    class Meta:
        fields = ('course', 'user_id', 'course_name')
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


class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Submission

class LectureSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Lecture

