# Generated by Django 3.2.6 on 2021-09-12 17:23

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('user_profile', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_public', models.BooleanField(default=True, verbose_name='is_public')),
                ('is_rated', models.BooleanField(default=True, verbose_name='is_rated')),
                ('is_timed', models.BooleanField(default=True, verbose_name='is_timed')),
                ('move_timer', models.IntegerField(default=1, verbose_name='move_timer')),
                ('game_timer', models.IntegerField(default=30, verbose_name='game_timer')),
                ('is_active', models.BooleanField(default=True, verbose_name='is_active')),
                ('side', models.CharField(blank=True, max_length=10, verbose_name='side')),
                ('game_board', models.JSONField()),
                ('hit_pieces', django.contrib.postgres.fields.ArrayField(base_field=models.JSONField(), default=list, size=None)),
                ('history', django.contrib.postgres.fields.ArrayField(base_field=models.JSONField(), default=list, size=None)),
                ('player_turn', models.IntegerField(default=-1, verbose_name='player_turn')),
                ('connected_player', models.IntegerField(default=0, verbose_name='connected_player')),
                ('player_1', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='player_1', to='user_profile.profile')),
                ('player_2', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='player_2', to='user_profile.profile')),
            ],
        ),
    ]