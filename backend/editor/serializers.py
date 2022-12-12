from rest_framework import serializers
from .models import *

class SaveSerializer(serializers.ModelSerializer):

    class Meta:
        fields = '__all__'
        model = Save

class CodeExplainSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = CodeExplain

class TranslationSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Translation

class SkeletonSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Skeleton

class ReferenceSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Reference

class QuestionReceiverSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = QuestionReceiver

class AllInfoSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = AllInfo