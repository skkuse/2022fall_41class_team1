<<<<<<< HEAD
from django.shortcuts import render
from mainapp.serializers import *
from mainapp.models import *
from .serializers import *
import os
import subprocess
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import Http404
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

import openai
from .api_secrets import API_KEY
from pathlib import Path
from .reference import crawling_link

openai.api_key = API_KEY

def analyzeCode(user_code,mode):
    #0: simple, 1:detail
    if mode == 1:  #detail
        model = "text-davinci-002"
        token = 2000
    else:           #simple
        model = "text-curie-001"
        token = 500

    analysis_prompt = user_code + """\nHere's what the code is doing:"""

    response = openai.Completion.create(
        model=model,
        prompt=analysis_prompt,
        max_tokens=token,
        temperature=0
    )

    analysis = response["choices"][0]["text"]

    data = {"code": analysis}
    return data

class SimpleExplainApi(APIView):
    
    def get(self,request):
        serializer = CodeExplainSerializer(data=request.data)

        if serializer.is_valid():
            code_analysis = analyzeCode(serializer.data['code'],0)
            output_serializer = CodeExplainSerializer(code_analysis)
            return Response(output_serializer.data)

        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class DetailExplainApi(APIView):
    
    def get(self,request):
        serializer = CodeExplainSerializer(data=request.data)

        if serializer.is_valid():
            code_analysis = analyzeCode(serializer.data['code'],1)
            output_serializer = CodeExplainSerializer(code_analysis)
            return Response(output_serializer.data)

        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class TranslationApi(APIView):

    def translate(self,english):
        translation_prompt = """Translate this into Korean
        """ + english

        response = openai.Completion.create(
            model="text-davinci-002",
            prompt=translation_prompt,
            max_tokens=2000,
            temperature=0
        )

        translation = response["choices"][0]["text"]
    
        data = {"language":translation}

        return data

    def get(self,request):
        serializer = TranslationSerializer(data=request.data)

        if serializer.is_valid():
            output = self.translate(serializer.data['language'])
            output_serializer = TranslationSerializer(output)
            return Response(output_serializer.data)

        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

#코드 저장 관련 api
#post, get, delete 지원
class UserDataApi(APIView):

    def get_object(self,user_id,question):
        try:
            return UserData.objects.get(user_id=user_id,question=question)
        except UserData.DoesNotExist:
            test_data = {
                "user_id":"coldmilk","question":"SWE3021-42-1","save1":"import numpy as np"
            }
            return test_data #Http404
    
    def post(self,request):
        serializer = SaveSerializer(data=request.data)
        
        if serializer.is_valid():
            user_id = serializer.data['user_id']
            question = serializer.data['question']
            count = serializer.data['count']
            code = serializer.data['code']
            
            count = count % 3 #저장 가능 개수 3회 제한

            userdata = self.get_object(user_id,question)
            
            if count == 0:
                userdata.save1 = code
            elif count == 1:
                userdata.save2 = code
            else:
                userdata.save3 = code
            userdata.save() #UserData save
            userdata_serializer = UserDataSerializer(userdata)
            return Response(userdata_serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    #내용 조회
    def get(self,request):
        serializer = SaveSerializer(data=request.data)

        if serializer.is_valid():
            userdata = self.get_object(serializer.data['user_id'],serializer.data['question'])
            userdata_serializer = UserDataSerializer(userdata)
            return  Response(userdata_serializer.data)

        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    #내용 삭제: user + question 조합의 레코드 전체 삭제
    def delete(self,request):
        serializer = SaveSerializer(data=request.data)
        user_id = serializer.data['user_id']
        question = serializer.data['question']

        userdata = self.get_object(user_id,question)
        userdata.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
    

class SkeletonApi(APIView):
    
    def get_object(self,question):
        try:
            return Question.objects.get(pk=question)
        except Question.DoesNotExist:
            test_data = {"question":"프기실_week3","course":"프기실","skeleton":"import numpy as np",
                "answer":"12", "testcase":"[1,2,3,4]", "reference": "잘 풀어봐요", "duedate": "2022-11-17 23:59:59"
            }
            return test_data #Http404
    
    #내용 조회
    def get(self,request):
        question = request.data.get('question')
        question_object = self.get_object(question)
        skeleton_code = {"skeleton": question_object.skeleton}
        serializer = SkeletonSerializer(data=skeleton_code)
        if serializer.is_valid():
            return Response(serializer.data)
        
class ReferenceApi(APIView):

    def get_object(self,question):
        try:
            return Question.objects.get(pk=question)
        except Question.DoesNotExist:
            test_data = {"question":"프기실_week3","course":"프기실","skeleton":"import numpy as np",
                "answer":"12", "testcase":"[1,2,3,4]", "reference": "잘 풀어봐요", "duedate": "2022-11-17 23:59:59"
            }
            return test_data #Http404

    def get(self,request):
        keyword = request.data.get('keyword')
        keyword = keyword.replace(' ', '')
        '''
        question = request.GET.get('question')
        question_object = self.get_object(question)
        keyword = question_object['keyword']
        '''
        links = crawling_link(keyword)
        links['keyword'] = keyword
        serializer = ReferenceSerializer(data=links)
        if serializer.is_valid():
            return Response(serializer.data)