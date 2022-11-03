from django.shortcuts import render
from django.http import HttpResponse

# request -> response : request handler
# Pull data from db, Transform, Send an email, return HttpResponse


# Create your views here.
def say_hello(request):
    return render(request,'hello.html',{'name':'Coldmilk'})