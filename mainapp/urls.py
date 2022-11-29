from django.urls import path
from django.urls import re_path
from . import views

#URLConf

urlpatterns = [
    re_path(r'^user/',views.ListUser.as_view()),
    re_path(r'^user/(?P<userid>\w+)/',views.DetailUser.as_view()),
    
    re_path(r'^question/',views.ListQuestion.as_view()),
    re_path(r'^question/(?P<question>\w+)/',views.DetailQuestion.as_view()),
    
    re_path(r'^userdata/',views.ListUserData.as_view()),
    re_path(r'^userdata/(?P<userid>\w+)/(?P<question>\w+)/',views.DetailUserData.as_view()),
    #path('userdata/<int:pk>/results/',views.excuteCode)
    re_path(r'^results/',views.excuteCode)
]