from django.urls import path
from django.urls import re_path
from .views import *

#URLConf

urlpatterns = [
    path('execute1/',ExecuteCodeV1API.as_view()),
    path('execute2/',ExecuteCodeV2API.as_view()),
    path('testcase/',CheckTestcaseAPI.as_view())
]