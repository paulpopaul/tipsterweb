# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from simple_history.models import HistoricalRecords
from django.utils.translation import ugettext_lazy as _


# Create your models here.

class Contacto(models.Model):
    fecha = models.DateTimeField(_('fecha'), auto_now=True, blank=True, null=True, )
    nombre = models.CharField(_('nombre'), help_text=_('This is the help text'), max_length=100, )
    email = models.EmailField(_('email'), )
    mensaje = models.TextField(_('mensaje'), )
    history = HistoricalRecords()

    def __unicode__(self):
        return u"%s" % self.nombre

    class Meta:
        verbose_name = _('Mensaje')
        verbose_name_plural = _('Mensajes')
        ordering = ['fecha']
