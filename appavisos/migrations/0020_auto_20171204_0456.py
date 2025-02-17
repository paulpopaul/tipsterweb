# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-12-04 07:56
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appavisos', '0019_auto_20171204_0440'),
    ]

    operations = [
        migrations.AddField(
            model_name='estilo',
            name='color_letra_nombre_subtitulo',
            field=models.CharField(blank=True, default='000000', max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='estilo',
            name='color_letra_nombre_titulo',
            field=models.CharField(blank=True, default='000000', max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='estilo',
            name='color_fondo_mapa',
            field=models.CharField(blank=True, default='000000', max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='estilo',
            name='color_fondo_principal',
            field=models.CharField(blank=True, default='000000', max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='estilo',
            name='color_fondo_resennas',
            field=models.CharField(blank=True, default='000000', max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='estilo',
            name='color_letra_destacada',
            field=models.CharField(blank=True, default='000000', max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='estilo',
            name='color_letra_resennas',
            field=models.CharField(blank=True, default='000000', max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='estilo',
            name='color_letra_subtitulo',
            field=models.CharField(blank=True, default='000000', max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='estilo',
            name='color_letra_titulo',
            field=models.CharField(blank=True, default='000000', max_length=30, null=True),
        ),
    ]
