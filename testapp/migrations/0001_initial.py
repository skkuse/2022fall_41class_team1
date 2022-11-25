# Generated by Django 4.1.2 on 2022-11-25 05:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('mainapp', '0003_alter_question_answer'),
    ]

    operations = [
        migrations.CreateModel(
            name='ExecuteCodeV2',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('exe_result', models.TextField()),
                ('question', models.ForeignKey(db_column='question', on_delete=django.db.models.deletion.CASCADE, to='mainapp.question')),
                ('user_id', models.ForeignKey(db_column='user_id', on_delete=django.db.models.deletion.CASCADE, to='mainapp.user')),
            ],
        ),
        migrations.CreateModel(
            name='ExecuteCodeV1',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('save_type', models.CharField(max_length=1)),
                ('exe_result', models.TextField()),
                ('question', models.ForeignKey(db_column='question', on_delete=django.db.models.deletion.CASCADE, to='mainapp.question')),
                ('user_id', models.ForeignKey(db_column='user_id', on_delete=django.db.models.deletion.CASCADE, to='mainapp.user')),
            ],
        ),
        migrations.CreateModel(
            name='CheckTestcase',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('score', models.CharField(max_length=10)),
                ('o_pass_fail', models.TextField()),
                ('h_pass_fail', models.TextField()),
                ('question', models.ForeignKey(db_column='question', on_delete=django.db.models.deletion.CASCADE, to='mainapp.question')),
                ('user_id', models.ForeignKey(db_column='user_id', on_delete=django.db.models.deletion.CASCADE, to='mainapp.user')),
            ],
        ),
    ]
