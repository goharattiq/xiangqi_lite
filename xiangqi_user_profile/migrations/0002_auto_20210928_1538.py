# Generated by Django 3.2.6 on 2021-09-28 15:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('xiangqi_user_profile', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='draw_count',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='winning_percentage',
        ),
        migrations.AlterField(
            model_name='profile',
            name='photo',
            field=models.ImageField(null=True, upload_to='media/images/'),
        ),
    ]
