# Generated by Django 3.2.9 on 2023-06-29 16:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_rename_user_id_userinfo_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='roomtype',
            name='booked_count',
        ),
    ]