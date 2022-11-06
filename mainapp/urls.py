from django.urls import path
from . import views

#URLConf

urlpatterns = [
    #path('',views.say_hello)
    path('',views.ListUser.as_view()),
    path('<int:pk>/',views.DetailUser.as_view()),
    path('',views.ListQuestion.as_view()),
    path('<int:pk>/',views.DetailQuestion.as_view()),
    path('',views.ListUserData.as_view()),
    path('<int:pk>/',views.DetailUserData.as_view()),
    path('hello/',views.say_hello)
] 

