from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from .models import *
from .serializers import *
from rest_framework import generics
import os
import subprocess
import unittest
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from drf_yasg.utils import swagger_auto_schema

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

@swagger_auto_schema(tags=["detail user"], request_body=UserSerializer, query_serializer=UserSerializer)
def detail_user(request, userid):
    data = User.objects.get(user_id=userid)
    queryset = User.objects.all()
    serializer_class = UserSerializer(data)
    if request.method == 'GET':
        return JsonResponse(serializer_class.data, safe=False)

class DetailUser(generics.RetrieveUpdateDestroyAPIView):
    #   @swagger_auto_schema(tags=["detail user"], request_body=UserSerializer, query_serializer=UserSerializer)
    queryset = User.objects.all()
    serializer_class = UserSerializer

class DetailQuestion(generics.RetrieveUpdateDestroyAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class DetailUserData(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserData.objects.all()
    serializer_class = UserDataSerializer

def initCode(request,input_data):
    course = input_data['course']
    question = input_data['question']
    result = Question.objects.filter(course=course,question=question)
    skeleton = result.skeleton
    return render(request,'hello.html',{'skeleton':skeleton})

def excute(code):
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

@api_view(('GET',))
@renderer_classes((TemplateHTMLRenderer, JSONRenderer))

def excuteCode(request):
    code = request.GET['save1']
    return_data = excute(code)
    data = {'save1':return_data}
    return Response(data)
        
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