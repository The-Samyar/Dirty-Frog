# Generated by Django 3.2.9 on 2022-05-17 20:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='RoomType',
            fields=[
                ('room_name', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('cost_per_day', models.IntegerField()),
                ('size', models.IntegerField()),
                ('capacity', models.IntegerField()),
                ('bed', models.CharField(max_length=30)),
                ('room_count', models.IntegerField()),
                ('booked_count', models.IntegerField()),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='UserInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone_number', models.CharField(blank=True, max_length=14, null=True)),
                ('is_checked', models.BooleanField(default=False)),
                ('dob', models.DateField(blank=True, null=True)),
                ('gender', models.CharField(blank=True, max_length=6, null=True)),
                ('profile_picture', models.ImageField(blank=True, null=True, upload_to='')),
                ('user_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='RoomVacancy',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('room_number', models.IntegerField(unique=True)),
                ('is_vacant', models.BooleanField(default=False)),
                ('room_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.roomtype')),
            ],
        ),
        migrations.CreateModel(
            name='RoomService',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('service', models.CharField(max_length=50)),
                ('room_name', models.ManyToManyField(to='api.RoomType')),
            ],
        ),
        migrations.CreateModel(
            name='RoomPicture',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('picture_address', models.CharField(max_length=50)),
                ('room_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='room_pictures', to='api.roomtype')),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('review', models.TextField()),
                ('rate', models.IntegerField()),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('room_number', models.IntegerField()),
                ('check_in', models.DateTimeField()),
                ('check_out', models.DateTimeField()),
                ('adults_count', models.IntegerField()),
                ('children_count', models.IntegerField()),
                ('total_cost', models.IntegerField()),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
