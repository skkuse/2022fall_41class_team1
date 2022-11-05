from email.policy import default
from django.db import models
from jsonfield import JSONField

# Create your models here.
#dummy
class User(models.Model):
    user_id = models.BigIntegerField(primary_key=True)
    user_name = models.CharField(max_length=20)
    user_pwd = models.IntegerField()
    user_type = models.SmallIntegerField()
    user_email = models.EmailField()
    user_org = models.CharField(max_length=200)

    def __str__(self):
        return self.user_name

class Question(models.Model):
    course = models.IntegerField()
    question = models.IntegerField(primary_key=True)
    skeleton = models.TextField(default="")
    answer = models.CharField(max_length=200)
    testcase = models.CharField(max_length=200)
    hint = models.CharField(max_length=512)
    duedate = models.DateTimeField()
    

    def __str__(self):
        return "Course:" + self.course + ", Question: " + self.question

class UserData(models.Model):
    user_id = models.BigIntegerField(primary_key=True)
    question = models.IntegerField()
    save1 = models.TextField()
    save2 = models.TextField(default="")
    save3 = models.TextField(default="")