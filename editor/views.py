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

openai.api_key = API_KEY

def analyzeCode(self,user_code,mode):
    #0: simple, 1:detail
    if mode == 1:
        model = "text-davinci-002"
    else:
        model = "text-curie-001"

    analysis_prompt = user_code + """\nHere's what the code is doing:
    """

    response = openai.Completion.create(
        model=model,
        prompt=analysis_prompt,
        max_tokens=1000,
        temperature=0
    )

    analysis = response["choices"][0]["text"]

    data = {"code": analysis}
    return data

class SimpleExplainApi(APIView):
    
    def get(self,request):
        serializer = CodeExplainSerializer(data=request.data)

        if serializer.is_valid():
            code_analysis = analyzeCode(serializer.code,0)
            output_serializer = CodeExplainSerializer(code_analysis)
            return Response(output_serializer.data)

        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class DetailExplainApi(APIView):
    
    def get(self,request):
        serializer = CodeExplainSerializer(data=request.data)

        if serializer.is_valid():
            code_analysis = analyzeCode(serializer.code,1)
            output_serializer = CodeExplainSerializer(code_analysis)
            return Response(output_serializer.data)

        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class TranslationApi(APIView):

    def translate(self,english):
        translation_prompt = """Translate this into Korean
        """ + english + "\n"

        response = openai.Completion.create(
            model="text-davinci-002",
            prompt=translation_prompt,
            max_tokens=1000,
            temperature=0
        )

        translation = response["choices"][0]["text"]
    
        data = {"language":translation}

        return data

    def get(self,request):
        serializer = TranslationSerializer(data=request.data)

        if serializer.is_valid():
            output = self.translate(serializer.language)
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
    
    #내용 추가 => 코드를 저장하려고 하는 것임
    success_response = openapi.Schema(
        title='response',
        type=openapi.TYPE_OBJECT,
        properties={
            'user id' : openapi.Schema(type=openapi.TYPE_STRING, description="사용자 ID"),
        }
    )
    @swagger_auto_schema(tags=["userdata 추가"], 
                    request_body=UserDataSerializer, 
                    query_serializer=UserDataSerializer,
                    responses={
                        200 : success_response,
                        404 : '찾을 수 없음',
                        400 : '인풋값 에러',
                        500 : '서버 에러',
                    },
                    operation_id='사용자 데이터 추가',
                    operation_description="사용자 데이터 추가하는 API임...")
    def post(self,request):
        serializer = SaveSerializer(data=request.data)
        
        if serializer.is_valid():
            user_id = serializer.user_id
            question = serializer.question
            count = serializer.count
            code = serializer.code
            
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
            userdata = self.get_object(serializer.user_id,serializer.question)
            userdata_serializer = UserDataSerializer(userdata)
            return  Response(userdata_serializer.data)

        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    #내용 삭제: user + question 조합의 레코드 전체 삭제
    def delete(self,request):
        serializer = SaveSerializer(data=request.data)
        user_id = serializer.user_id
        question = serializer.question

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
        question = request.GET.get('question') #GET 리퀘스트로 들어온 JSON 데이터에서 user_id를 받아옴
        question_object = self.get_object(question)
        skeleton_code = {"skeleton": question_object["skeleton"]}
        serializer = SkeletonSerializer(skeleton_code)
        if serializer.is_valid():
            return Response(serializer.data)