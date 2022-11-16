from django.urls import path
from django.urls import re_path
from views import *

#URLConf

urlpatterns = [
    path('user/',UserApi.as_view()),
    path('userdata/',UserDataApi.as_view()),
    path('question/',QuestionApi.as_view()),
    path('course/',CourseApi.as_view()),
    path('chat/',ChatApi.as_view()),
    path('submission/',SubmissionApi.as_view()),
]