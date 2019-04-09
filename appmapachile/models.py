# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from easy_thumbnails.fields import ThumbnailerImageField
from simple_history.models import HistoricalRecords

REGIONES_CODIGOS_CHOICES = (
    ('XV', 'Arica y Parinacota'),
    ('II', 'Tarapacá'),
    ('II', 'Antofagasta'),
    ('III', 'Atacama'),
    ('IV', 'Coquimbo'),
    ('V', 'Valparaíso'),
    ('RM', 'Metropolitana de Santiago'),
    ('VI', 'O\'Higgins'),
    ('VII', 'Maule'),
    ('VIII', 'Bío-Bío'),
    ('IX', 'La Araucanía'),
    ('XIV', 'Los Ríos'),
    ('X', 'Los Lagos'),
    ('XI', 'Aysén'),
    ('XII', 'Magallanes'),
)

class ProvinciaQuerySet(models.QuerySet):
    pass


class ComunaQuerySet(models.QuerySet):
    pass



class Provincia(models.Model):
    objects = ProvinciaQuerySet.as_manager()
    history = HistoricalRecords()
    # self
    nombre = models.CharField(max_length=50, help_text='Valdivia, Osorno...', unique=True)
    region = models.CharField(choices=REGIONES_CODIGOS_CHOICES, max_length=4)

    def numero_de_ciudades(self):
        return '%s' % self.comuna_ciudad.count()

    def listado_de_ciudades(self):
        pass

    def __unicode__(self):
        if  self.comuna_ciudad.count() > 1:
            return u'%s (%s Comunas)' % (self.nombre, self.comuna_ciudad.count())
        else:
            return u'%s (%s Comuna)' % (self.nombre, self.comuna_ciudad.count())

    class Meta:
        verbose_name = "Provincia"
        verbose_name_plural = "Provincias"
        ordering = ['nombre']


class Comuna(models.Model):
    objects = ProvinciaQuerySet.as_manager()
    history = HistoricalRecords()
    # self

    nombre = models.CharField(max_length=50, help_text='Valdivia, Osorno...', unique=True)
    portada = ThumbnailerImageField(upload_to='pic_ciudad', null=True, blank=True, help_text='Imagen asociada a Ciudad - Comuna')
    provincia = models.ForeignKey(Provincia, related_name='comuna_ciudad', on_delete=models.CASCADE)
    activacion = models.BooleanField(default=False)

    def __unicode__(self):
        return u'%s (%s, %s Región)' % (self.nombre, self.provincia, self.provincia.region)

    class Meta:
        verbose_name = "Comuna de Chile"
        verbose_name_plural = "Comunas de Chile"
        ordering = ['nombre']
