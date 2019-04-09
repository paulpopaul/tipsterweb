# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import datetime
import django
from django.utils import timezone
from django.db import models
from django.utils.translation import ugettext_lazy as _
from simple_history.models import HistoricalRecords
from easy_thumbnails.fields import ThumbnailerImageField
from appmapachile.models import Comuna


# Create your models here.

class ClienteQuerySet(models.QuerySet):
    pass


class Cliente(models.Model):
    history = HistoricalRecords()
    objects = ClienteQuerySet
    # self:
    autor = models.ForeignKey('auth.User', auto_created=True, related_name='cliente_autor', blank=True, null=True
                              , help_text='Nombre del autor, aparecerá solo para ver quien agregó al cliente')
    modificacion = models.DateTimeField(_('modificación'), auto_now_add=True, editable=False
                              , help_text='Fecha en la que se realiza algun cambio en el cliente guardado')
    creacion = models.DateTimeField(_('creación'), auto_created=True, auto_now_add=True, editable=False
                              , help_text='Fecha en la que se creó el registro del cliente')
    rut = models.CharField(_('RUT'), max_length=15, unique=True, null=True, blank=True
                              , help_text='Ej: 12345678-9')
    nombres = models.CharField(_('nombres'), max_length=24
                              , help_text='Ej: Pedro Patricio')
    apellidos = models.CharField(_('apellidos'), max_length=24
                              , help_text='Ej: Pérez Pereira')
    email = models.EmailField(_('email'),  null=True, blank=True
                              , help_text='nombre@dominio.cl')
    foto = ThumbnailerImageField(_('foto'), upload_to='cliente/%Y/%m/%d', null=True, blank=True
                              ,)
    fecha_nacimiento = models.DateField(_('fecha de nacimiento'), blank=True, null=True, default=django.utils.timezone.now
                              , help_text='01/02/1991')

    telefono_personal = models.CharField(_('telefono personal'), max_length=16, null=True, blank=True
                              , help_text='Ej: +56987654321')
    telefono_emergencia = models.CharField(_('telefono emergencia'), max_length=16, null=True, blank=True
                              , help_text='Ej: +56987654321')

    comuna = models.ForeignKey(Comuna
                              , help_text='Seleccionar una comuna asociada al cliente')
    direccion = models.CharField(max_length=100, null=True, blank=True
                              , help_text='Dirección asociada al cliente')

    def __unicode__(self):
        return u'%s %s' % (self.nombres, self.apellidos)

    class Meta:
        verbose_name = _('Cliente')
        verbose_name_plural = _('Clientes')

    def reciente(self):
        return self.creacion >= timezone.now() - datetime.timedelta(days=1)


    '''
    def get_stores(self, Tienda):
        for e in Tienda.objects.filter(cliente=self.id):
            print(e.nombre)
    '''
