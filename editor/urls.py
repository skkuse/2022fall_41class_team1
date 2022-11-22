from django.urls import path
from .views import *
from mainapp.views import QuestionApi

#URLConf

#default url = 'editor/'
urlpatterns = [
    path('save/',UserDataApi.as_view()),
    path('reinit/',SkeletonApi.as_view()),
    path('simple_explain/',SimpleExplainApi.as_view()),
    path('detail_explain/',DetailExplainApi.as_view()), #only GET request
    path('translate/',TranslationApi.as_view()),
    #path('reference/',ReferenceApi.as_view()),
]