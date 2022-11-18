from django.urls import path
from .views import *
from mainapp.views import QuestionApi

#URLConf

#default url = 'editor/'
urlpatterns = [
    path('save/',UserDataApi.as_view()),
    path('reinit/',QuestionApi.as_view()),
    
]