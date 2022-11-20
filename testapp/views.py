from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from django.core import serializers
from .models import *
from mainapp.models import *
from mainapp.serializers import *
from .serializers import *
from rest_framework import generics
import os
import subprocess
import unittest
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import Http404
from rest_framework import status
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer

def execute(code):
    py = open('temp.txt','w')
    py.write(code)
    py.close()
    os.rename('temp.txt','temp.py')
    out = subprocess.run(['python', 'temp.py'],capture_output=True)
    if(out.stderr):
        return_data = out.stderr.decode('utf-8').split(',')[-1]
    else:
        return_data = out.stdout.decode('utf-8')
    os.remove('temp.py') 
    return return_data

class ExecuteCodeV1API(APIView):
    def get_object(self,user_id,question,save_type):
        try:
            return ExecuteCodeV1.objects.get(user_id=user_id, quetsion=question, save_type=save_type)
        except ExecuteCodeV1.DoesNotExist:
            test_data = {'user_id':'jcy9911','question':'SWE3002-01','save_type':'1','exe_result':'line 1 : assertion error'}
            return test_data #Http404
    
    #내용 추가
    def post(self,request):
        serializer = ExecuteCodeV1Serializer(data=request.data)
        if serializer.is_valid():
            # code 실행한 후에 결과를 저장
            # serializer에서 받은 exe_result -> code file을 실행한 후
            # serializer의 exe_result를 실행결과로 덮어쓰기.
            serializer.exe_result = execute(serializer.exe_result)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    #내용 조회
    def get(self,request):
        serializer = ExecuteCodeV1Serializer(data=request.data)
        
        if serializer.is_valid():
            codedata = self.get_object(serializer.user_id, serializer.question, serializer.save_type)
            codedata_serializer = ExecuteCodeV1Serializer(codedata)
            return Response(codedata_serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    #내용 수정
    '''
    def put(self,request):
        question = request.PUT.get('question')
        question_object = self.get_object(question)
        serializer = ExecuteCodeV1Serializer(question_object,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    '''
    
    #내용 삭제
    def delete(self,request):
        serializer = ExecuteCodeV1Serializer(data=request.data)
        user_id = serializer.user_id
        question = serializer.question
        save_type = serializer.save_type

        codedata = self.get_object(user_id,question,save_type)
        codedata.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)