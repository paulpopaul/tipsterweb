# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin

# Register your models here.
from .models import Provincia, Comuna


class ComunaInLine(admin.TabularInline):
    model = Comuna
    extra = 0

    def save_model(self, request, obj, form, change):
        obj.nombre = obj.nombre.title()
        obj.save()


class ProvinciaAdmin(SimpleHistoryAdmin):
    inlines = [
        ComunaInLine,
    ]
    list_display = ('nombre', 'region', 'numero_de_ciudades', )
    model = Provincia
    list_filter = ['nombre', 'region', ]
    fields = [('nombre', 'region')]

    def save_model(self, request, obj, form, change):
        obj.nombre = obj.nombre.title()
        obj.save()


#admin.site.register(Provincia, ProvinciaAdmin)
