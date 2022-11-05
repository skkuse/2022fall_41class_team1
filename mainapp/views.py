from django.shortcuts import render
from django.http import HttpResponse
from .models import *
from .serializers import *
from rest_framework import generics

# from serializer 추가 필요

# request -> response : request handler
# Pull data from db, Transform, Send an email, return HttpResponse

# Create your views here.
def say_hello(request):
    return render(request,'hello.html',{'name':'Coldmilk'})

class ListUser(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ListQuestion(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class ListUserData(generics.ListCreateAPIView):
    queryset = UserData.objects.all()
    serializer_class = UserDataSerializer

class DetailUser(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class DetailQuestion(generics.RetrieveUpdateDestroyAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class DetailUserData(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserData.objects.all()
    serializer_class = UserDataSerializer



''''
def initCode(request,input_data):
    course = input_data['course']
    question = input_data['question']
    result = Question.objects.filter(course=course,question=question)
    skeleton = result.skeleton
    return render(request,'hello.html',{'skeleton':skeleton})
'''

def UserAPI(request, input_data):
    id = input_data['id']
    result = User.objects.fillter(id=user_id)
    serializer = UserSerializer(result)
    return Response(serializer.data)

def CourserAPI(request, input_data):
    course = input_data['course']
    question = input_data['question']
    result = Question.objects.filter(course=course)
    serializer = QuestionSerializer(result)
    return Response(serializer.data)

def UserDataAPI(request, input_data):
    id = input_data['id']
    result = User.objects.fillter(id=user_id)
    serializer = UseDatarSerializer(result)
    return Response(serializer.data)

# excute python code
'''
def excuteCode(request, input_data):
    code = input_data['code']
    return_data = excute(code)
    return render(request, 'hello.html', {'return_data':return_data})
        
# compare code with testcase result
def compareTestcases(request, input_data):
    my_code = excute(input_data['code'])
    test_func = MyTests(input_data['testcase_answer'],my_code)
    test_result = test_func.test()
    
    if test_result != None:
        return_data = {'pf':True,'output':input_data['testcase_answer']}
    else:
        return_data = {'pf':False,'output':test_result}
        
    return render(request, 'hello.html', {'return_data':return_data})
    '''