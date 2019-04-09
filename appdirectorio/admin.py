# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin
from django.utils.translation import ugettext_lazy as _

from appcontacto.admin import Contacto, ContactoAdmin
from appmapachile.admin import ProvinciaAdmin, Provincia
from .models import Cliente


# Register your models here.


class ClienteAdmin(admin.ModelAdmin):
    fieldsets = (
        (_('Personal'), {
            'fields': (('rut', 'fecha_nacimiento'),
                       ('nombres', 'apellidos'),
                       'foto',
                       )}),
        (_('Contacto'), {
            # 'classes': ('collapse',),
            'fields': (('email',),
                       ('telefono_personal', 'telefono_emergencia'),
                       ),
        }),
        (_('Ubicaciòn'), {
            'classes': ('collapse',),
            'fields': (('comuna', 'direccion'),),
        }),
    )

    list_display = ('rut', 'apellidos', 'nombres')
    ordering = ('apellidos', 'rut')
    list_filter = ('modificacion', 'autor')
    search_fields = ('apellidos', 'nombres', 'rut')

    def save_model(self, request, obj, form, change):
        obj.auth = request.user
        obj.save()


admin.site.register(Provincia, ProvinciaAdmin)
admin.site.register(Cliente, ClienteAdmin)
admin.site.register(Contacto, ContactoAdmin)
