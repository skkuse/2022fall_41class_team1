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
            
def testcase(code1, code2, testcase):
    
    def excute_testcase(code, type, stdin):
        
        py = open('temp.txt','w')
        py.write(code)
        py.close()
        os.rename('temp.txt','temp.py')
        
        sh = open('temp.txt','w')
        sh.write('python temp.sh '+stdin)
        sh.close()
        os.rename('temp.txt','temp.sh')
        
        out = subprocess.run(['sh','temp.sh',f'>result_{type}.txt'],capture_output=True)
       
        if (out.stderr):
            print("")
               
    if ("*" in testcase):
        testcase1 = testcase.split("*")
        testcase2 = testcase1[-1].split("&")
            
        o_testcase = [tc for tc in testcase1] + [testcase2[0]]
        h_testcase = [testcase2[i] for i in range(testcase2)-1]        
    
    else:
        testcase = testcase.split("&")
        
        o_testcase = testcase[0]
        h_testcase = testcase[1]
    
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
            # 실행할 때, 인자가 있는 경우 없는 경우를 구분.
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
    
    #내용 삭제
    def delete(self,request):
        serializer = ExecuteCodeV1Serializer(data=request.data)
        user_id = serializer.user_id
        question = serializer.question
        save_type = serializer.save_type

        codedata = self.get_object(user_id,question,save_type)
        codedata.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
    
class ExecuteCodeV2API(APIView):
    def get_object(self,user_id,question):
        try:
            return ExecuteCodeV2.objects.get(user_id=user_id, quetsion=question)
        except ExecuteCodeV2.DoesNotExist:
            test_data = {'user_id':'jcy9911','question':'SWE3002-01','exe_result':'line 1 : assertion error'}
            return test_data #Http404
    
    #내용 추가
    def post(self,request):
        serializer = ExecuteCodeV2Serializer(data=request.data)
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
        serializer = ExecuteCodeV2Serializer(data=request.data)
        
        if serializer.is_valid():
            codedata = self.get_object(serializer.user_id, serializer.question)
            codedata_serializer = ExecuteCodeV2Serializer(codedata)
            return Response(codedata_serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    #내용 삭제
    def delete(self,request):
        serializer = ExecuteCodeV2Serializer(data=request.data)
        user_id = serializer.user_id
        question = serializer.question

        codedata = self.get_object(user_id,question)
        codedata.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
    
# 마지막 제출한 결과를 테스트 케이스 점수들과 함께 저장함.

class CheckTestcaseAPI(APIView):
    def get_object(self, user_id, question):
        try:
            return CheckTestcase.objects.get(user_id=user_id, question=question)
        except CheckTestcase.DoesNotExist:
            test_data = {'user_id':'jcy9911','question':'SWE3002-01','exe_result':'line 1 : assertion error'}
            return test_data
    
    def post(self, request):
        # testcase에 대한 정보가 들어있는 question seraializer
        q_serializers = QuestionSerializer(data=request.data)
        # 실제로 데이터를 저장할 serializer
        serializers = CheckTestcaseSerializer(data=request.data)
        if q_serializers.is_valid():
            # *로 구분 , &로 구분
            # 예시 1 2 3 * 4 5 6 * 7 8 9 & 10 11 12 & 13 14 15 & 16 17 18
            # split('*') = 1 2 3 , 4 5 6 , 7 8 9 & 10 11 12 & 13 14 15 & 16 17 18
            # -1 index split('&') = 10 11 12 , 13 14 15 , 16 17 18
            testcase = q_serializers.testcase
            answer = q_serializers.anwer
            
    def get(self, request):
        print("")
        
    def delete(self,request):
        print("")