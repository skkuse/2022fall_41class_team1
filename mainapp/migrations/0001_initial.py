# Generated by Django 4.1.2 on 2022-11-06 14:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Question',
            fields=[
                ('course', models.IntegerField()),
                ('question', models.IntegerField(primary_key=True, serialize=False)),
                ('skeleton', models.TextField()),
                ('answer', models.CharField(max_length=200)),
                ('testcase', models.CharField(max_length=200)),
                ('hint', models.CharField(max_length=512)),
                ('duedate', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('user_id', models.BigIntegerField(primary_key=True, serialize=False)),
                ('user_name', models.CharField(max_length=20)),
                ('user_pwd', models.IntegerField()),
                ('user_type', models.SmallIntegerField()),
                ('user_email', models.EmailField(max_length=254)),
                ('user_org', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='UserData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('save1', models.TextField()),
                ('save2', models.TextField()),
                ('save3', models.TextField()),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mainapp.question')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mainapp.user')),
            ],
        ),
    ]
