# -*- coding: utf-8 -*-
# Generated by Django 1.11.10 on 2018-04-13 06:13
from __future__ import unicode_literals

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('appavisos', '0038_auto_20180412_1703'),
    ]

    operations = [
        migrations.CreateModel(
            name='HistoricalEstilo',
            fields=[
                ('id', models.IntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('nombre', models.CharField(blank=True, max_length=100, null=True)),
                ('somos_background', models.CharField(blank=True, max_length=100, null=True)),
                ('somos_titulo_color', models.CharField(blank=True, max_length=100, null=True)),
                ('somos_titulo_descripcion', models.CharField(blank=True, max_length=100, null=True)),
                ('horarios_background', models.CharField(blank=True, max_length=100, null=True)),
                ('horarios_titulo_color', models.CharField(blank=True, max_length=100, null=True)),
                ('horarios_horario_relojhoras_color', models.CharField(blank=True, max_length=100, null=True)),
                ('horarios_horario_dias_color', models.CharField(blank=True, max_length=100, null=True)),
                ('galeria_background', models.CharField(blank=True, max_length=100, null=True)),
                ('galeria_titulo_color', models.CharField(blank=True, max_length=100, null=True)),
                ('resennas_tituloycontenidonombre_background', models.CharField(blank=True, max_length=100, null=True)),
                ('resennas_tituloycontenidonombre_color', models.CharField(blank=True, max_length=100, null=True)),
                ('resennas_fecha_color', models.CharField(blank=True, max_length=100, null=True)),
                ('mapa_background', models.CharField(blank=True, max_length=100, null=True)),
                ('mapa_color', models.CharField(blank=True, max_length=100, null=True)),
                ('mapa_info_back', models.CharField(blank=True, max_length=100, null=True)),
                ('mapa_info_color', models.CharField(blank=True, max_length=100, null=True)),
                ('sociales_info_background', models.CharField(blank=True, max_length=100, null=True)),
                ('sociales_titulo_color', models.CharField(blank=True, max_length=100, null=True)),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField()),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': 'history_date',
                'verbose_name': 'historical Estilo',
            },
        ),
        migrations.CreateModel(
            name='HistoricalFoto',
            fields=[
                ('id', models.IntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('fecha_creacion', models.DateTimeField(auto_created=True, default=django.utils.timezone.now)),
                ('fecha_modificacion', models.DateTimeField(default=django.utils.timezone.now)),
                ('nombre', models.CharField(blank=True, max_length=32, null=True)),
                ('archivo', models.TextField(max_length=100)),
                ('cabecera', models.BooleanField(default=False, help_text='aparecer\xe1 en la cabecera, si se agrega m\xe1s de una con esta opci\xf2n se generar\xe0 un slider; s\xf3lo v\xe1lido para tiendas')),
                ('galeria', models.BooleanField(default=True, help_text='se encontrar\xe1 en la galer\xeda de imagenes')),
                ('tarjeta', models.BooleanField(default=False, help_text='ser\xe1 la imagen que aparecer\xe1 en las tarjetas')),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField()),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('evento', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='appavisos.Evento')),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': 'history_date',
                'verbose_name': 'historical foto',
            },
        ),
        migrations.CreateModel(
            name='HistoricalHorario',
            fields=[
                ('id', models.IntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('dias', models.CharField(blank=True, max_length=100, null=True)),
                ('horas', models.CharField(blank=True, max_length=100, null=True)),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField()),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': 'history_date',
                'verbose_name': 'historical horario',
            },
        ),
        migrations.CreateModel(
            name='HistoricalTipografia',
            fields=[
                ('id', models.IntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('style_import_url', models.CharField(help_text='ej: https://fonts.googleapis.com/css?family=Spectral+SC ', max_length=999)),
                ('font_family', models.CharField(help_text='ej: \'Spectral SC\', serif"', max_length=999)),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField()),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': 'history_date',
                'verbose_name': 'historical Tipograf\xeda',
            },
        ),
        migrations.AlterField(
            model_name='historicaltienda',
            name='expiracion',
            field=models.DateField(blank=True, default=datetime.datetime(2018, 4, 13, 3, 13, 9, 337660), null=True),
        ),
        migrations.AlterField(
            model_name='historicaltienda',
            name='fecha_inicio',
            field=models.DateField(blank=True, default=datetime.datetime(2018, 4, 13, 3, 13, 9, 337718), null=True),
        ),
        migrations.AlterField(
            model_name='tienda',
            name='expiracion',
            field=models.DateField(blank=True, default=datetime.datetime(2018, 4, 13, 3, 13, 9, 337660), null=True),
        ),
        migrations.AlterField(
            model_name='tienda',
            name='fecha_inicio',
            field=models.DateField(blank=True, default=datetime.datetime(2018, 4, 13, 3, 13, 9, 337718), null=True),
        ),
        migrations.AddField(
            model_name='historicalhorario',
            name='tienda',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='appavisos.Tienda'),
        ),
        migrations.AddField(
            model_name='historicalfoto',
            name='tienda',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='appavisos.Tienda'),
        ),
    ]
