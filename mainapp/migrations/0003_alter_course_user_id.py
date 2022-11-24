# Generated by Django 4.1.3 on 2022-11-24 23:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("mainapp", "0002_alter_chat_comment_alter_chat_time_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="course",
            name="user_id",
            field=models.ForeignKey(
                blank=True,
                db_column="user_id",
                help_text="예: sunkyun12@skku.edu",
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="user",
                to="mainapp.user",
            ),
        ),
    ]
