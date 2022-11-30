# Generated by Django 4.1.2 on 2022-11-29 14:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0002_alter_course_user_id_alter_userdata_save1_and_more'),
        ('editor', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='QuestionReceiver',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.ForeignKey(db_column='question', on_delete=django.db.models.deletion.CASCADE, to='mainapp.question')),
            ],
        ),
    ]
