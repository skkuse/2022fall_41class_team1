from rest_framework import serializers
from .models import *

class ExecuteCodeV1Serializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = ExecuteCodeV1

class ExecuteCodeV2Serializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = ExecuteCodeV2
        
class CheckTestcaseSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = CheckTestcase