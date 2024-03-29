# Generated by Django 3.2.9 on 2022-08-17 15:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_booking__total_cost'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='booking',
            name='room_number',
        ),
        migrations.CreateModel(
            name='BookedRoom',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('booking_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.booking')),
                ('room_number', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.room')),
            ],
        ),
    ]
