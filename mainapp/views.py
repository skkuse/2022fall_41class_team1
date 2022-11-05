from django.shortcuts import render
from django.http import HttpResponse
from mainapp.models import *
import sqlite3
import os
import subprocess

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

# excute python code
def excuteCode(request, input_data):
    code = input_data['code']
    py = open('temp.txt','w')
    py.write(code)
    py.close()
    os.rename('temp.txt','temp.py')
    out = subprocess.Popen(['python','temp.py'], stdout=subprocess.PIPE).stdout  
    return_data = out.read().strip()
    out.close()
    os.remove('temp.py') 
    return render(request, 'hello.html', {'return_data':return_data})