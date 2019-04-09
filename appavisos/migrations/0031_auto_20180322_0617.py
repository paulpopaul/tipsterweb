# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-03-22 09:17
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appavisos', '0030_auto_20180322_0256'),
    ]

    operations = [
        migrations.AlterField(
            model_name='categoria',
            name='icono',
            field=models.FileField(blank=True, help_text='este icono tiene que estar para fondo transparente y de color blanco', null=True, upload_to='categorias', verbose_name='icono'),
        ),
        migrations.AlterField(
            model_name='categoria',
            name='icono_mapa',
            field=models.FileField(blank=True, help_text='este icono ir\xe1 en el mapa: debe ser de 30x30px', null=True, upload_to='categorias', verbose_name='icono en mapa'),
        ),
        migrations.AlterField(
            model_name='historicalcategoria',
            name='icono',
            field=models.TextField(blank=True, help_text='este icono tiene que estar para fondo transparente y de color blanco', max_length=100, null=True, verbose_name='icono'),
        ),
        migrations.AlterField(
            model_name='historicalcategoria',
            name='icono_mapa',
            field=models.TextField(blank=True, help_text='este icono ir\xe1 en el mapa: debe ser de 30x30px', max_length=100, null=True, verbose_name='icono en mapa'),
        ),
    ]
