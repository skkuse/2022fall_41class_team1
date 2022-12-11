from django.db import models
from mainapp.models import *

class Save(models.Model):
    user_id = models.ForeignKey(User,on_delete=models.CASCADE,db_column='user_id')
    question = models.ForeignKey(Question,on_delete=models.CASCADE,db_column='question')
    count = models.IntegerField()
    code = models.TextField()


class CodeExplain(models.Model):
    code = models.TextField()

class Translation(models.Model):
    language = models.TextField()


class Skeleton(models.Model):
    skeleton = models.TextField()


class QuestionReceiver(models.Model):
    question = models.ForeignKey(Question,on_delete=models.CASCADE,db_column='question')

class Reference(models.Model):
    keyword = models.TextField()
    youtube = models.TextField()
    beakjun = models.TextField()
    wiki = models.TextField()
