# -*- coding= utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase

# Create your tests here.
from appavisos.models import *
import datetime

t = Tienda.objects.last()

print(t)

numero = None
import random

p = [
    'lorem1', 'ipsum1', 'dolor1', 'ammet1', ' ',
    'lorem2', 'ipsum2', 'dolor2', 'ammet2', ' ',
    'lorem3', 'ipsum3', 'dolor3', 'ammet3', ' ',
    'lorem4', 'ipsum4', 'dolor4', 'ammet4', ' ',
    'lorem5', 'ipsum5', 'dolor5', 'ammet5', ' ',
    'lorem6', 'ipsum6', 'dolor6', 'ammet6', ' ',
    'lorem7', 'ipsum7', 'dolor7', 'ammet7', ' ',
    'lorem7', 'ipsum7', 'dolor7', 'ammet7', ' ',
]

def crea_tiendas():
    for a in 'a' * 14:
        l = t.__dict__
        print(l)
        nueva = Tienda.objects.create(
            #id= 7,
            quienes_somos= u'lorem12 %s' + p[random.randint(0,20)] ,
            youtube_url= 'https://www.youtube.com',
            tipo_panorama= 'B',
            habilitacion_comentarios= True,
            fecha_creacion= None,
            direccion= 'Lorem ipsum es simplemente #1234',
            horario_semana_fin= None,
            twitter_url= 'https://www.twitter.com',
            tipster_recomienda= True,
            nombre= str(p[random.randint(0,20)]),
            cliente_id= 1,
            categoria_id= 4,
            expiracion= datetime.date(2018, 3, 9),
            facebook_url= 'https://www.facebook.com',
            activo= True,
            marca_id= 2,
            instagram_url= 'https://www.instagram.com',
            comuna_id= 1,
            panorama_para= 'Lorem Ipsum es simplemente un texto de apoyo para las imprentas',
            autor_id= 1,
            slug= str(u'%s-%s-%s-%s' % (p[random.randint[1, 25]], p[random.randint[1, 25]], p[random.randint[1, 25]], p[random.randint[1, 25]]))
        )
        nueva.save()


