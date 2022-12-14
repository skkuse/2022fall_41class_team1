from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from .models import *
from .serializers import *
from rest_framework import generics
import os
import subprocess
import unittest
import json
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import Http404
from rest_framework import status
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from rest_framework.parsers import JSONParser
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.contrib.auth.hashers import make_password, check_password, get_hasher
from django.core import serializers
from mainapp.serializers import CourseIdSerializer

class ListUser(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ListQuestion(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class ListUserData(generics.ListCreateAPIView):
    queryset = UserData.objects.all()
    serializer_class = UserDataSerializer

def detail_user(request, userid):
    data = User.objects.get(user_id=userid)
    queryset = User.objects.all()
    serializer_class = UserSerializer(data)
    if request.method == 'GET':
        return JsonResponse(serializer_class.data, safe=False)

class DetailUser(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class DetailQuestion(generics.RetrieveUpdateDestroyAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class DetailUserData(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserData.objects.all()
    serializer_class = UserDataSerializer

##################################################################################
##################################################################################

class Login(APIView):
    def post(self, request):
        user_id = request.data['user_id']
        user_pwd = request.data['user_pwd']
        user = User.objects.filter(user_id=user_id).first()
        if user is None:
            return Response({"msg":"There's no such ID"})
        if check_password(user.user_pwd, make_password(user.user_pwd)):
            return Response(dict(msg="Login Sucess"))
        else:
            return Response(dict(msg="Login Failure"))
        
class RegistUser(APIView):
    def post(self, request):
        serializer = UserSerializer(request.data)
        if User.objects.filter(user_id=serializer.data['user_id']).exists():
            user = User.objects.filter(user_id=serializer.data['user_id']).first()
            data = dict(
                msg="exist id"
            )
            return Response(data)
        
        user = serializer.create(request.data)
        return Response(data=UserSerializer(user).data)
    

# request??? user_id??? ??????????????? 
# ???????????? ?????? "student@skku.com"??????.
class CourseFindAPI(APIView):
    def get(self, request):
        serializer = CourseIdSerializer(data=request.GET)
        if serializer.is_valid():
            user_id = serializer.data.get('user_id')
            course_list = Lecture.objects.filter(user_id=user_id)
            serializer_list = LectureSerializer(course_list, many=True)
            courses = []

            for i in serializer_list.data:
                courses.append(i['course'])
            return Response(courses, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class QuestionFindAPI(APIView):
    def get(self, request):
        serializer = QuestionIdSerializer(data=request.data)
        if serializer.is_valid():
            course = serializer.data['course']
            question_info = Question.objects.filter(course=course)
            question_info = list(question_info.values())
            print(question_info)
            print("\n")
            questions = []
            for i in question_info:
                questions.append(i['question'])
            return Response(questions, status=status.HTTP_200_OK) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
# request: ?????????????????????_week2
class RequestQuestionAPI(APIView):
    def get(self, request):
        serializers = QuestionNameSerializer(data=request.data)
        if serializers.is_valid():
            question = serializers.data['question']
            question_info = Question.objects.filter(question=question)
            question_info = list(question_info.values())
            return Response(question_info, status=status.HTTP_200_OK)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

# ???????????? ?????? ???????????? API
class LectureAPI(APIView):
    def post(self, request):
        serializers = LectureSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status=status.HTTP_200_OK)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)


class Login(APIView):
    def post(self, request):
        serializer = LoginSerializer(request.data)
        user = User.objects.filter(user_id=serializer.data['user_id']).first()
        if user is None:
            return Response(dict(msg="There's no such ID"))
        if check_password(serializer.data['user_pwd'], user.user_pwd):
            return Response(dict(msg="Login Sucess"))
        else:
            return Response(dict(msg="Login Failure"))


class RegistUser(APIView):
    def post(self, request):
        serializer = UserSerializer(request.data)
        if User.objects.filter(user_id=serializer.data['user_id']).exists():
            user = User.objects.filter(user_id=serializer.data['user_id']).first()
            data = dict(
                msg="exist id"
            )
            return Response(data)
        
        user = serializer.create(request.data)
        return Response(data=UserSerializer(user).data)
    

# request??? user_id??? ??????????????? 
# ???????????? ?????? "student@skku.com"??????.
class CourseFindAPI(APIView):
    def get(self, request):
        serializer = CourseIdSerializer(data=request.data)
        if serializer.is_valid():
            user_id = serializer.data['user_id']
            course_list = Course.objects.filter(user_id=user_id)
            serializer_list = CourseSerializer(course_list, many=True)
            courses = []

            for i in serializer_list.data:
                courses.append(i['course'])
            return Response(courses, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class QuestionFindAPI(APIView):
    def get(self, request):
        serializer = QuestionIdSerializer(data=request.data)
        if serializer.is_valid():
            course = serializer.data['course']
            question_info = Question.objects.filter(course=course)
            question_info = list(question_info.values())
            print(question_info)
            print("\n")
            questions = []
            for i in question_info:
                questions.append(i['question'])
            return Response(questions, status=status.HTTP_200_OK) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
# request: ?????????????????????_week2
class RequestQuestionAPI(APIView):
    def get(self, request):
        serializers = QuestionNameSerializer(data=request.data)
        if serializers.is_valid():
            question = serializers.data['question']
            question_info = Question.objects.filter(question=question)
            question_info = list(question_info.values())
            return Response(question_info, status=status.HTTP_200_OK)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)



class UserApi(APIView):
    def get_object(self,user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            test_data = {"user_id":"coldmilk","user_name":"Chanu","user_pwd":"1234",
                "user_type":True, "user_org":"??????????????????"
            }
            return test_data #Http404
    
    #???????????? ??? response?????? ???????????? ?????? ??????
    success_response = openapi.Schema(
        title='response',
        type=openapi.TYPE_OBJECT,
        properties={
            'user id' : openapi.Schema(type=openapi.TYPE_STRING, description="????????? ID"),
        }
    )
    #?????? ??????
    @swagger_auto_schema(tags=["user??????"], 
                        request_body=UserSerializer, 
                        query_serializer=UserSerializer,
                        responses={
                            200 : success_response,
                            404 : '?????? ??? ??????',
                            400 : '????????? ??????',
                            500 : '?????? ??????',
                        },
                        operation_id='????????? ??????',
                        operation_description="????????? ???????????? API???...")
    def post(self,request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    #?????? ??????
    def get(self,request):
        user_id = request.GET.get('user_id') #GET ??????????????? ????????? JSON ??????????????? user_id??? ?????????
        # user = self.get_object(user_id)
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)

        return Response(serializer.data)
    
    #?????? ??????
    def put(self,request):
        user_id = request.PUT.get('user_id')
        user = self.get_object(user_id)
        serializer = UserSerializer(user,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    #?????? ??????
    def delete(self,request):
        user_id = request.DELETE.get('user_id')
        user = self.get_object(user_id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CourseApi(APIView):

    def get_object(self,course):
        try:
            return Course.objects.get(pk=course)
        except Course.DoesNotExist:
            test_data = {"course":"SWE3002-41","user_id":"coldmilk","course_name":"???????????????????????????"}
            return test_data #Http404
    
    #?????? ??????
    # request???: user_id????????? user_id_id???.

    def post(self, request):
        serializer = CourseSerializer(request.data)
        course = serializer.create(request.data)
        return Response(data=CourseSerializer(course).data)

    # def post(self,request):
    #     serializer = CourseSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    #?????? ??????
    def get(self,request):
        course = request.GET.get('course') #GET ??????????????? ????????? JSON ??????????????? user_id??? ?????????
        course_object = self.get_object(course)
        serializer = CourseSerializer(course_object)

        return Response(serializer.data)
    
    #?????? ??????
    def put(self,request):
        course = request.PUT.get('course')
        course_object = self.get_object(course)
        serializer = CourseSerializer(course_object,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    #?????? ??????
    def delete(self,request):
        course = request.DELETE.get('course')
        course_object = self.get_object(course)
        course_object.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class QuestionApi(APIView):

    def get_object(self,question):
        try:
            return Question.objects.get(pk=question)
        except Question.DoesNotExist:
            test_data = {"question":"?????????_week3","course":"?????????","skeleton":"import numpy as np",
                "answer":"12", "testcase":"[1,2,3,4]", "reference": "??? ????????????", "duedate": "2022-11-17 23:59:59"
            }
            return test_data #Http404
    

    #?????? ??????
    def post(self,request):
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    
    #?????? ??????
    def get(self,request):
        question = request.GET.get('question') #GET ??????????????? ????????? JSON ??????????????? user_id??? ?????????
        question_object = self.get_object(question)
        serializer = UserSerializer(question_object)

        return Response(serializer.data)
    
    #?????? ??????
    def put(self,request):
        question = request.PUT.get('question')
        question_object = self.get_object(question)
        serializer = QuestionSerializer(question_object,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    #?????? ??????
    def delete(self,request):
        question = request.DELETE.get('question')
        question_object = self.get_object(question)
        question_object.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

##pk??? ?????? foreign key??? ?????? ???????????? ????????? ???????????? ??? ??????
class UserDataApi(APIView):

    def get_object(self,user_id,question):
        try:
            return Question.objects.get(user_id=user_id,question=question)
        except Question.DoesNotExist:
            test_data = {"question":"?????????_week3","course":"?????????","skeleton":"import numpy as np",
                "answer":"12", "testcase":"[1,2,3,4]", "reference": "??? ????????????", "duedate": "2022-11-17 23:59:59"
            }
            return test_data #Http404
    
    #?????? ??????
    def post(self,request):
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    #?????? ??????
    def get(self,request):
        question = request.GET.get('question') #GET ??????????????? ????????? JSON ??????????????? user_id??? ?????????
        question_object = self.get_object(question)
        serializer = UserSerializer(question_object)

        return Response(serializer.data)
    
    #?????? ??????
    def put(self,request):
        question = request.PUT.get('question')
        question_object = self.get_object(question)
        serializer = QuestionSerializer(question_object,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    #?????? ??????
    def delete(self,request):
        question = request.DELETE.get('question')
        question_object = self.get_object(question)
        question_object.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class SubmissionApi(APIView):


    def get_object(self,question):
        try:
            return Question.objects.get(pk=question)
        except Question.DoesNotExist:
            test_data = {"question":"?????????_week3","course":"?????????","skeleton":"import numpy as np",
                "answer":"12", "testcase":"[1,2,3,4]", "reference": "??? ????????????", "duedate": "2022-11-17 23:59:59"
            }
            return test_data #Http404
    
    #?????? ??????
    def post(self,request):
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    #?????? ??????
    def get(self,request):
        question = request.GET.get('question') #GET ??????????????? ????????? JSON ??????????????? user_id??? ?????????
        question_object = self.get_object(question)
        serializer = UserSerializer(question_object)

        return Response(serializer.data)
    
    #?????? ??????
    def put(self,request):
        question = request.PUT.get('question')
        question_object = self.get_object(question)
        serializer = QuestionSerializer(question_object,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    #?????? ??????
    def delete(self,request):
        question = request.DELETE.get('question')
        question_object = self.get_object(question)
        question_object.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
