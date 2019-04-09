# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import datetime

from tipster import settings
from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin
from django.utils.translation import ugettext_lazy as _

from .models import Categoria, Tienda, Marca, Foto, Comentario, Evento, Horario, Estilo, Tipografia


# Register your models here.

def desactivar_tiendas(tienda):
    hoy = datetime.date.today()
    try:
        if tienda.fecha_inicio <= hoy and tienda.expiracion >= hoy:
            tienda.activo = True
        else:
            tienda.activo = False
    except:
        pass

class TiendaInLine(admin.StackedInline):
    model = Tienda
    extra = 0
    classes = ['collapse']


class CategoriaAdmin(SimpleHistoryAdmin):
    model = Categoria
    inlines = [TiendaInLine, ]
    fieldsets = (
        (_('De la misma Categoría'), {
            # 'classes': ('collapse',),
            'fields': (('nombre', 'nombre_plural'),
                       ('icono', 'icono_mapa'),
                       ('slug',),
                       ), }),
        #(_('Opciones'), {
        #    'classes': ('collapse',),
        #    'fields': (('activo', 'menu',),
        #               # ('fecha_creacion',),
        #               ), }),
    )
    list_filter = ['fecha_creacion', 'activo', 'menu', ]
    prepopulated_fields = {"slug": ("nombre_plural",)}


admin.site.register(Categoria, CategoriaAdmin)


class MarcaAdmin(SimpleHistoryAdmin):
    model = Marca
    inlines = [TiendaInLine, ]
    fieldsets = (
        (_('De la misma Marca'), {
            # 'classes': ('collapse',),
            'fields': (('nombre', 'frase_corporativa'),
                       ('icono', 'icono_mapa'),
                       'slug'
                       ), }),
        (_('Media'), {
            'classes': ('collapse',),
            'fields': (('logo'),
                       ), }),
        (_('Opciones'), {
            'classes': ('collapse',),
            'fields': (('activo', 'en_menu',),
                       ('busquedas', 'logo',),
                       ), }),
    )
    prepopulated_fields = {"slug": ("nombre",)}


admin.site.register(Marca, MarcaAdmin)


class FotoInLine(admin.StackedInline):
    model = Foto
    extra = 0
    classes = ['collapse']


class ComentarioInLine(admin.StackedInline):
    model = Comentario
    extra = 0
    classes = ['collapse']
    exclude = ['foto', ]


class HorarioInLine(admin.StackedInline):
    model = Horario
    extra = 0
    classes = ['collapse']


class EventoInLine(admin.StackedInline):
    model = Evento
    extra = 0
    classes = ['collapse']

    def save_model(self, request, obj, form, change):
        obj.author = request.user
        obj.in_store = True
        obj.google_map = obj.store_event.google_map
        obj.save()


class TiendaAdmin(SimpleHistoryAdmin):
    inlines = [HorarioInLine, FotoInLine, ComentarioInLine, EventoInLine, ]
    # exclude = ['creation_date', 'modification_date', ]
    list_display = ['nombre', 'activo', 'tipo_panorama', 'panorama_destacado',
                    'tipster_recomienda','fecha_inicio', 'expiracion']
    # list_display_links = ['activo', 'panorama_destacado', 'tipster_recomienda']
    model = Tienda
    search_fields = ['nombre', 'frase', 'quienes_somos']
    list_filter = ['fecha_creacion', 'activo', 'cliente', 'marca', 'categoria']
    fieldsets = (
        (_('Estado'), {
            # 'classes': ('collapse',),
            'fields': (('panorama_destacado', 'tipo_panorama', 'tipster_recomienda', 'habilitacion_comentarios'),
                       'fecha_inicio', 'expiracion', 'estilos', 'precio'), }),
        (_('Sociales'), {
            # 'classes': ('collapse',),
            'fields': (('facebook_url', 'twitter_url'),
                       ('instagram_url', 'youtube_url'),
                       ), }),
        (_('Asociaciones'), {
            # 'classes': ('collapse',),
            'fields': (('cliente', 'marca'),
                       ('categoria', 'comuna'),
                       ), }),
        (_('Información'), {
            # 'classes': ('collapse',),
            'fields': ('nombre', 'logo',
                       'panorama_para',
                       'frase', 'quienes_somos', 'slug',
                       ('sitio_web', 'email'),
                       ('telefono', 'direccion'),
                       'google_map',
                       ), }),
        (_('Tiempos de Horario'), {
            # 'classes': ('collapse',),
            'fields': (
                ('horario_semana_inicio', 'horario_semana_fin'),
                #('horario_fin_semana_inicio', 'horario_fin_semana_fin'),
            ), }),
    )
    prepopulated_fields = {"slug": ("nombre",)}

    def desactivar_tiendas(self, tienda):
        hoy = datetime.date.today()
        if tienda.expiracion < hoy:
            tienda.activo = False
            tienda.save()
        elif tienda.expiracion >= hoy:
            tienda.activo = True
            tienda.save()

    def save_model(self, request, obj, form, change):
        obj.autor = request.user
        desactivar_tiendas(obj)
        obj.save()


admin.site.register(Tienda, TiendaAdmin)


class EventoAdmin(SimpleHistoryAdmin):
    model = Evento
    inlines = [FotoInLine, ]
    fieldsets = (
        (_('Asociaciones'), {
            # 'classes': ('collapse',),
            'fields': (('tienda', 'marca'),
                       ('tipo_evento', 'comuna'),
                       ('activo', 'redireccion'),
                       ), }),
        (_('Datos'), {
            # 'classes': ('collapse',),
            'fields': (('titulo', 'subtitulo',),
                       ('fecha_inicio', 'fecha_expiracion',),
                       ('direccion'),
                       ('descripcion'),
                       ('url'),
                       ('google_map_iframe'),
                       ('en_tienda'),
                       ('slug',),
                       'google_map',
                       # ('slug'),
                       ), }),
    )
    prepopulated_fields = {"slug": ("titulo",)}

    def save_model(self, request, obj, form, change):
        if obj.google_map_iframe:
            obj.google_map_iframe = obj.google_map_iframe.replace("width=\"600\"", "width=\"100%\"").replace(
                "width=\"400\"", "width=\"100%\"")
        obj.save()


admin.site.register(Evento, EventoAdmin)

class EstiloAdmin(SimpleHistoryAdmin):
    fieldsets = (
        (_('Somos'), {
            # 'classes': ('collapse',),
            'fields': (('somos_background', 'somos_titulo_color'),
                       ('somos_titulo_descripcion', ),
                       ), }),
        (_('Horarios'), {
            # 'classes': ('collapse',),
            'fields': (('horarios_background', 'horarios_titulo_color'),
                       ('horarios_horario_relojhoras_color', 'horarios_horario_dias_color'),
                       ), }),
        (_('Galería'), {
            # 'classes': ('collapse',),
            'fields': (('galeria_background', 'galeria_titulo_color'),
                       ), }),
        (_('Reseñas'), {
            # 'classes': ('collapse',),
            'fields': (('resennas_tituloycontenidonombre_background', 'resennas_tituloycontenidonombre_color'),
                       ('resennas_fecha_color', ),
                       ), }),
        (_('Mapa'), {
            # 'classes': ('collapse',),
            'fields': (('mapa_background', 'mapa_color'),
                       ('mapa_info_back', 'mapa_info_color'),
                       ), }),
        (_('Sociales'), {
            # 'classes': ('collapse',),
            'fields': (('sociales_info_background', 'sociales_titulo_color'),
                       ), }),
    )

admin.site.register(Estilo, EstiloAdmin)

class ComentarioAdmin(SimpleHistoryAdmin):
    model = Comentario
    list_display = [
        'nombre','id_usuario', 'creado', 'tienda', 'evaluacion',
    ]
    ordering = ['creado', ]



admin.site.register(Comentario, ComentarioAdmin)
