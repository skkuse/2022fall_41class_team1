from django.urls import path
from . import views

#URLConf

urlpatterns = [
    path('user/',views.ListUser.as_view()),
    path('user/<int:pk>/',views.DetailUser.as_view()),
    
    path('question/',views.ListQuestion.as_view()),
    path('question/<int:pk>/',views.DetailQuestion.as_view()),
    
    path('userdata/',views.ListUserData.as_view()),
    path('userdata/<int:pk>/',views.DetailUserData.as_view()),
    path('userdata/<int:pk>/results/',views.excuteCode)
] 

