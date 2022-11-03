from django.db import models
from jsonfield import JSONField

# Create your models here.

class User(models.Model):
    user_id = models.BigIntegerField(primary_key=True)
    user_name = models.CharField()
    user_pwd = models.IntegerField()
    user_type = models.SmallIntegerField()
    user_email = models.EmailField()
    user_org = models.CharField(max_length=200)

    def __str__(self):
        return self.user_name

class Question(models.Model):
    course = models.IntegerField(primary_key=True)
    question = models.IntegerField(primary_key=True)
    answer = models.CharField()
    testcase = models.CharField()
    hint = models.CharField()
    duedate = models.DateTimeField()

    def __str__(self):
        return "Course:" + self.course + ", Question: " + self.question

class UserData(models.Model):
    user_id = models.BigIntegerField(primary_key=True)
    question = models.IntegerField()
    save1 = models.TextField()