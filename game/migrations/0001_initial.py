# Generated by Django 3.2.6 on 2021-09-18 08:34

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('user_profile', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Player',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_connected', models.BooleanField(default=False, verbose_name='is_connected')),
                ('time', models.JSONField(blank=True, null=True)),
                ('side', models.CharField(blank=True, max_length=10, verbose_name='side')),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='profile', to='user_profile.profile')),
            ],
        ),
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_active', models.BooleanField(default=True, verbose_name='is_active')),
                ('is_public', models.BooleanField(default=True, verbose_name='is_public')),
                ('is_rated', models.BooleanField(default=True, verbose_name='is_rated')),
                ('is_timed', models.BooleanField(default=True, verbose_name='is_timed')),
                ('move_timer', models.IntegerField(default=1, verbose_name='move_timer')),
                ('game_timer', models.IntegerField(default=30, verbose_name='game_timer')),
                ('last_move', models.DateTimeField(default=django.utils.timezone.now)),
                ('game_board', models.JSONField(blank=True)),
                ('hit_pieces', django.contrib.postgres.fields.ArrayField(base_field=models.JSONField(), blank=True, default=list, size=None)),
                ('history', django.contrib.postgres.fields.ArrayField(base_field=models.JSONField(), blank=True, default=list, size=None)),
                ('player_turn', models.IntegerField(default=-1, verbose_name='player_turn')),
                ('winner', models.CharField(blank=True, max_length=255, null=True, verbose_name='winner')),
                ('player_1', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='player_1', to='game.player')),
                ('player_2', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='player_2', to='game.player')),
            ],
        ),
    ]
