# Generated by Django 3.2.9 on 2023-02-28 14:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_auto_20230228_1758'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booking',
            name='user_rating',
            field=models.IntegerField(default=None),
        ),
    ]
