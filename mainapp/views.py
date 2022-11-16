from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from django.core import serializers
from .models import *
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

# from serializer 추가 필요

# request -> response : request handler
# Pull data from db, Transform, Send an email, return HttpResponse

# Create your views here.
#def say_hello(request):
#    return render(request,'hello.html',{'name':'Coldmilk'})

'''
#POST 방식 참고
def user_create(request,user_id):
    user = get_object_or_404(User,pk=user_id)
    #UserData에서 User를 Foreign Key로 참고하고 있기 때문에 User에서 userdata_set으로 역참조 가능
    user.userdata_set.create(content=request.POST.get('content'))  #POST로 폼에 전송된 데이터를 받아옴
    return redirect('mainapp:~~',user_id=user.id)
def question_create(request):
    if request.method == 'POST':
        form = QuestionForm(request.POST)
        if form.is_valid():
            question = form.save(commit=False)
            question.create_date = timezone.now()
            question.save()
            return redirect('pybo:index')
    else:
        form = QuestionForm()
    context = {'form': form}
    return render(request, 'pybo/question_form.html', context)
'''
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
'''
def initCode(request,input_data):
    course = input_data['course']
    question = input_data['question']
    result = Question.objects.filter(course=course,question=question)
    skeleton = result.skeleton
    return render(request,'hello.html',{'skeleton':skeleton})

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

class MyTests(unittest.TestCase):
    def __init__(self, true_result, my_result):
        super(MyTests, self).__init__()
        self.true_result = true_result
        self.my_result = my_result
        
    def test(self):
        if type('s') != type(self.my_result):
            my_result = f'{self.my_result}'
        result = self.assertEqual(self.true_result, my_result)
        return result

@api_view(['GET','POST'])
@renderer_classes((TemplateHTMLRenderer, JSONRenderer))
def executeCode(request):
    code = request.POST.get('code')
    return_data = execute(code)
    serializer = ReturnDataSerializer(return_data,context={'request':request})
    #return_data = return_data.split('/')[-1]
    return Response(serializer.data)
    #return render(request, f'api/results.html', {'return_data':return_data})


# compare code with testcase result
def compareTestcases(request, input_data):
    my_code = execute(input_data['code'])
    test_func = MyTests(input_data['testcase_answer'],my_code)
    test_result = test_func.test()
    
    if test_result != None:
        return_data = {'pf':True,'output':input_data['testcase_answer']}
    else:
        return_data = {'pf':False,'output':test_result}


    return render(request, 'hello.html', {'return_data':return_data})
'''
##################################################################################
##################################################################################

class UserApi(APIView):
    def get_object(self,user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            test_data = {"user_id":"coldmilk","user_name":"Chanu","user_pwd":"1234",
                "user_type":True, "user_org":"성균관대학교"
            }
            return test_data
    
    #내용 추가
    def post(self,request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    #내용 조회
    def get(self,request):
        user_id = request.GET.get('user_id') #GET 리퀘스트로 들어온 JSON 데이터에서 user_id를 받아옴
        user = self.get_object(user_id)
        serializer = UserSerializer(user)

        return Response(serializer.data)
    
    #내용 수정
    def put(self,request):
        user_id = request.PUT.get('user_id')
        user = self.get_object(user_id)
        serializer = UserSerializer(user,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    #내용 삭제
    def delete(self,request):
        user_id = request.DELETE.get('user_id')
        user = self.get_object(user_id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CourseApi(APIView):
    
    def post(self,request):
        serializer = CourseSerializer(data=request.data)

class QuestionApi(APIView):
    
    def post(self,request):
        serializer = QuestionSerializer(data=request.data)

class UserDataApi(APIView):
    
    def post(self,request):
        serializer = UserDataSerializer(data=request.data)
class ChatApi(APIView):
    
    def post(self,request):
        serializer = ChatSerializer(data=request.data)


class SubmissionApi(APIView):
    
    def post(self,request):
        serializer = SubmissionSerializer(data=request.data)
