from email.policy import default
from django.db import models
from jsonfield import JSONField

# Create your models here.

class User(models.Model):
    user_id = models.EmailField(max_length=50,primary_key=True) #사용자가 가입할 때 쓰는 이메일을 id로 사용하기로 했음
    user_name = models.CharField(max_length=50) #홍길동
    user_pwd = models.CharField(max_length=50) #1q2w3e4r
    user_type = models.BooleanField() # 학습자: True, 교수자: False
    user_org = models.CharField(max_length=100) #소프트웨어학과

    def __str__(self):
        return self.user_name

class Course(models.Model):
    course= models.CharField(max_length=50) # SWE3002-41
    user_id = models.ForeignKey(User,on_delete=models.CASCADE,db_column='user_id') # sunkyun12@skku.edu
    course_name = models.CharField(max_length=50) #소프트웨어공학개론

    def __str__(self):
        return self.course_name

class Question(models.Model):
    question = models.CharField(primary_key=True,max_length=50) # 프로그래밍기초실습_week2
    course = models.ForeignKey(Course,on_delete=models.CASCADE,db_column='course') #프로그래밍기초실습
    skeleton = models.TextField() #스켈레톤 코드
    answer = models.CharField(max_length=1000)
    testcase = models.CharField(max_length=100)
    reference = models.CharField(max_length=300) #문제 설명 밑의 참고사항
    duedate = models.DateTimeField() #마감기한
    
    def __str__(self):
        return self.course_id + " " + self.question_id


#/api/userdata/ 로 접근할 경우 프론트에서 user_id와 question을 같이 보내줘야 함
class UserData(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE,db_column='user_id')
    question = models.ForeignKey(Question, on_delete=models.CASCADE,db_column='question')
    save1 = models.TextField()
    save2 = models.TextField()
    save3 = models.TextField()

    def __str__(self):
        return "UserData of " + self.user_id + " " + self.question

class Chat(models.Model):
    course = models.ForeignKey(Course,on_delete=models.CASCADE,db_column='course')
    user_id = models.ForeignKey(User,on_delete=models.CASCADE,db_column='user_id')
    time = models.TimeField() #글을 남긴 시간
    comment = models.TextField() #글 내용

    def __str__(self):
        return "Chat of " + self.course + " " + self.user_id + " " + self.time

class Submission(models.Model):
    user_id = models.ForeignKey(User,on_delete=models.CASCADE,db_column='user_id')
    question = models.ForeignKey(Question,on_delete=models.CASCADE,db_column='question')
    submission = models.BooleanField() # 제출: 1, 미제출: 0, null값 가능

    def __str__(self):
        return "Submission of " + self.question
