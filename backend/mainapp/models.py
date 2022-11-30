from email.policy import default
from django.db import models
from jsonfield import JSONField

# Create your models here.

class User(models.Model):
    user_id = models.EmailField(max_length=50,primary_key=True, help_text="사용자가 가입할 때 쓰는 이메일을 id로 사용하기로 했음") 
    user_name = models.CharField(max_length=50, help_text="예: 홍길동")
    user_pwd = models.CharField(max_length=50, help_text="admin비번은: 1q2w3e4r")
    user_type = models.BooleanField(help_text="학습자: True, 교수자: False") 
    user_org = models.CharField(max_length=100, help_text="예: 소프트웨어학과")

    def __str__(self):
        return self.user_id

class Course(models.Model):
    course= models.CharField(max_length=50, primary_key=True, help_text="예: SWE3002-41")
    user_id = models.ForeignKey(User, on_delete=models.CASCADE,db_column='user_id', help_text="예: sunkyun12@skku.edu")
    course_name = models.CharField(max_length=50, help_text="예: 소프트웨어공학개론")

    def __str__(self):
        return self.course

class Lecture(models.Model):
    course = models.ForeignKey(Course,on_delete=models.CASCADE, db_column='course', help_text="프로그래밍기초실습") 
    user_id = models.ForeignKey(User,on_delete=models.CASCADE,db_column='user_id', help_text="예: sunkyun12@skku.edu")
   
    def __str__(self):
        return str(self.course)


class Question(models.Model):
    question = models.CharField(primary_key=True,max_length=50, help_text="예: 프로그래밍기초실습_week2")
    course = models.ForeignKey(Course,on_delete=models.CASCADE, db_column='course', null=True, help_text="프로그래밍기초실습") 
    skeleton = models.TextField(help_text="스켈레톤 코드") 
    answer = models.TextField()
    testcase = models.CharField(max_length=100)
    reference = models.CharField(max_length=300, help_text="문제 설명 밑의 참고사항") 
    duedate = models.DateTimeField(help_text="마감기한") 

    def __str__(self):
        return self.question


#/api/userdata/ 로 접근할 경우 프론트에서 user_id와 question을 같이 보내줘야 함
class UserData(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE,db_column='user_id')
    question = models.ForeignKey(Question, on_delete=models.CASCADE,db_column='question')
    save1 = models.TextField(null=True)
    save2 = models.TextField(null=True)
    save3 = models.TextField(null=True)

    def __str__(self):
        return "UserData of " + str(self.user_id) + " " + str(self.question)

# class Chat(models.Model):
#     course = models.ForeignKey(Course,on_delete=models.CASCADE,db_column='course')
#     user_id = models.ForeignKey(User,on_delete=models.CASCADE,db_column='user_id')
#     time = models.TimeField(help_text="글을 남긴 시간") 
#     comment = models.TextField(help_text="글 내용")

#     def __str__(self):
#         return "Chat of " + self.course + " " + self.user_id + " " + self.time

class Submission(models.Model):
    user_id = models.ForeignKey(User,on_delete=models.CASCADE,db_column='user_id')
    question = models.ForeignKey(Question,on_delete=models.CASCADE,db_column='question')
    submission = models.BooleanField(help_text="제출: 1, 미제출: 0, null값 가능") 

    def __str__(self):
        return "Submission of " + str(self.question)
