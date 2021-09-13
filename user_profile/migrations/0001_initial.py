# Generated by Django 3.2.6 on 2021-09-12 17:23

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
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bio', models.TextField(blank=True, max_length=500, verbose_name='bio')),
                ('rating', models.IntegerField(default=500, verbose_name='ratings')),
                ('games_played_count', models.FloatField(default=0, verbose_name='games_played_count')),
                ('wins_count', models.FloatField(default=0, verbose_name='wins_count')),
                ('losses_count', models.FloatField(default=0, verbose_name='losses_count')),
                ('draw_count', models.FloatField(default=0, verbose_name='draw_count')),
                ('winning_percentage', models.FloatField(default=0, verbose_name='winning_percentage')),
                ('photo', models.ImageField(blank=True, null=True, upload_to='images/')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]