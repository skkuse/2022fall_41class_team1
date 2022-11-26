from django.urls import path
from django.urls import re_path
from .views import *

#URLConf

urlpatterns = [
    path('user/',UserApi.as_view()),    # 사용자liste 조회가능
    path('userdata/',UserDataApi.as_view()),
    path('question/',QuestionApi.as_view()),
    path('chat/',ChatApi.as_view()),
    path('submission/',SubmissionApi.as_view()),

    path('signin/', Login.as_view()),   # 로그인
    path('signup/', RegistUser.as_view()),  # 회원가입
    path('course/',CourseApi.as_view()), # 과목추가
    path('main/', CourseFindAPI.as_view()), # 메인 페이지 진입시, default정보 불러오기, 해당 유저의 모든 과목명 불러오기
    path('main/question/', QuestionFindAPI.as_view()) # 문제 리스트 불러오기

    # path('add_course/,')
]