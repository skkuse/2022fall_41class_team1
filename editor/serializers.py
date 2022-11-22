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