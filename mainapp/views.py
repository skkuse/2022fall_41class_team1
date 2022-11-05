from django.shortcuts import render
from django.http import HttpResponse
from mainapp.models import *
#from code_function import *
import sqlite3

# request -> response : request handler
# Pull data from db, Transform, Send an email, return HttpResponse

# Create your views here.
def say_hello(request):
    return render(request,'hello.html',{'name':'Coldmilk'})

def initCode(request,input_data):
    course = input_data['course']
    question = input_data['question']
    result = Question.objects.filter(course=course,question=question)
    skeleton = result.skeleton
    return render(request,'hello.html',{'skeleton':skeleton})
'''
# excute python code
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
        
    return render(request, 'hello.html', {'return_data':return_data})'''