# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import Contacto


# Register your models here.
class ContactoAdmin(admin.ModelAdmin):
    model = Contacto
    fieldsets = (
        (('Mensaje'), {
            #'classes': ('collapse',),
            'fields': (('nombre', 'email',),
                       ('mensaje',),
                       ), }),
    )
    list_display = ['nombre', 'email', 'fecha']


#admin.site.register(Contacto, ContactoAdmin)
