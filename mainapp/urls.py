from django.urls import path
from django.urls import re_path
from views import *

#URLConf
'''
urlpatterns = [
    re_path(r'^user/',views.ListUser.as_view()),
    re_path(r'^user/(?P<userid>\w+)/',views.DetailUser.as_view()),
    
    re_path(r'^question/',views.ListQuestion.as_view()),
    re_path(r'^question/(?P<question>\w+)/',views.DetailQuestion.as_view()),
    
    re_path(r'^userdata/',views.ListUserData.as_view()),
    re_path(r'^userdata/(?P<userid>\w+)/(?P<question>\w+)/',views.DetailUserData.as_view()),
    #path('userdata/<int:pk>/results/',views.excuteCode)
    re_path(r'^userdata/(?P<userid>\w+)/(?P<question>\w+)/results/',views.executeCode)
]
'''

urlpatterns = [
    path('user/',UserApi.as_view()),
    path('userdata/',UserDataApi.as_view()),
    path('question/',QuestionApi.as_view()),
    path('course/',CourseApi.as_view()),
    path('chat/',ChatApi.as_view()),
    path('submission/',SubmissionApi.as_view()),
]