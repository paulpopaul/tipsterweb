# -*- coding: utf-8 -*-
# Generated by Django 1.11.10 on 2018-04-12 20:03
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appavisos', '0037_auto_20180408_1804'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historicaltienda',
            name='expiracion',
            field=models.DateField(blank=True, default=datetime.datetime(2018, 4, 12, 17, 3, 33, 465961), null=True),
        ),
        migrations.AlterField(
            model_name='historicaltienda',
            name='fecha_inicio',
            field=models.DateField(blank=True, default=datetime.datetime(2018, 4, 12, 17, 3, 33, 466000), null=True),
        ),
        migrations.AlterField(
            model_name='tienda',
            name='expiracion',
            field=models.DateField(blank=True, default=datetime.datetime(2018, 4, 12, 17, 3, 33, 465961), null=True),
        ),
        migrations.AlterField(
            model_name='tienda',
            name='fecha_inicio',
            field=models.DateField(blank=True, default=datetime.datetime(2018, 4, 12, 17, 3, 33, 466000), null=True),
        ),
    ]
