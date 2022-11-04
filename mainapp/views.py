from django.shortcuts import render
from django.http import HttpResponse
from mainapp.models import *


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
