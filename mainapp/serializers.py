from rest_framework import serializers
from .models import *

#dummy

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'user_id',
            'user_name',
            'user_pwd',
            'user_type',
            'user_email',
            'user_org'
        )
        model = User

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'course',
            'question',
            'skeleton',
            'answer',
            'testcase',
            'hint',
            'duedate'
        )
        model = Question
        
class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'user_id',
            'question',
            'save1',
            'save2',
            'save3'
        )
        model = UserData       