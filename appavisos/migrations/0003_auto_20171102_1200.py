# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-11-02 15:00
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appavisos', '0002_auto_20171102_1134'),
    ]

    operations = [
        migrations.AlterField(
            model_name='categoria',
            name='fecha_creacion',
            field=models.DateTimeField(auto_now=True, null=True, verbose_name='fecha de creaci\xf3n'),
        ),
        migrations.AlterField(
            model_name='historicalcategoria',
            name='fecha_creacion',
            field=models.DateTimeField(blank=True, editable=False, null=True, verbose_name='fecha de creaci\xf3n'),
        ),
    ]
