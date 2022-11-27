# Generated by Django 4.1.2 on 2022-11-18 12:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chat',
            name='comment',
            field=models.TextField(help_text='글 내용'),
        ),
        migrations.AlterField(
            model_name='chat',
            name='time',
            field=models.TimeField(help_text='글을 남긴 시간'),
        ),
        migrations.AlterField(
            model_name='course',
            name='course',
            field=models.CharField(help_text='예: SWE3002-41', max_length=50),
        ),
        migrations.AlterField(
            model_name='course',
            name='course_name',
            field=models.CharField(help_text='예: 소프트웨어공학개론', max_length=50),
        ),
        migrations.AlterField(
            model_name='course',
            name='user_id',
            field=models.ForeignKey(db_column='user_id', help_text='예: sunkyun12@skku.edu', on_delete=django.db.models.deletion.CASCADE, to='mainapp.user'),
        ),
        migrations.AlterField(
            model_name='question',
            name='course',
            field=models.ForeignKey(db_column='course', help_text='프로그래밍기초실습', on_delete=django.db.models.deletion.CASCADE, to='mainapp.course'),
        ),
        migrations.AlterField(
            model_name='question',
            name='duedate',
            field=models.DateTimeField(help_text='마감기한'),
        ),
        migrations.AlterField(
            model_name='question',
            name='question',
            field=models.CharField(help_text='예: 프로그래밍기초실습_week2', max_length=50, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='question',
            name='reference',
            field=models.CharField(help_text='문제 설명 밑의 참고사항', max_length=300),
        ),
        migrations.AlterField(
            model_name='question',
            name='skeleton',
            field=models.TextField(help_text='스켈레톤 코드'),
        ),
        migrations.AlterField(
            model_name='submission',
            name='submission',
            field=models.BooleanField(help_text='제출: 1, 미제출: 0, null값 가능'),
        ),
        migrations.AlterField(
            model_name='user',
            name='user_id',
            field=models.EmailField(help_text='사용자가 가입할 때 쓰는 이메일을 id로 사용하기로 했음', max_length=50, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='user',
            name='user_name',
            field=models.CharField(help_text='예: 홍길동', max_length=50),
        ),
        migrations.AlterField(
            model_name='user',
            name='user_org',
            field=models.CharField(help_text='예: 소프트웨어학과', max_length=100),
        ),
        migrations.AlterField(
            model_name='user',
            name='user_pwd',
            field=models.CharField(help_text='admin비번은: 1q2w3e4r', max_length=50),
        ),
        migrations.AlterField(
            model_name='user',
            name='user_type',
            field=models.BooleanField(help_text='학습자: True, 교수자: False'),
        ),
    ]