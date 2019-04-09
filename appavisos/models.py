# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
import datetime
import django
from django.shortcuts import get_object_or_404
from easy_thumbnails.fields import ThumbnailerImageField
from geoposition.fields import GeopositionField
from simple_history.models import HistoricalRecords
from django.utils.translation import ugettext_lazy as _
from django.core.validators import MaxValueValidator, MinValueValidator

from appmapachile.models import Comuna
from appdirectorio.models import Cliente

TIPO_EVENTOS_CHOICES = (
    ('PA', _('Panorama')),
    ('CO', _('Concierto')),
    ('EV', _('Evento')),
    ('SH', _('Show')),
    ('PR', _('Promoción')),
)

TIPO_PANORAMA_CHOICES = (
    ('A', _('Panorama Mañana')),
    ('B', _('Panorama Tarde')),
    ('C', _('Panorama Noche')),
)


# Create your models here.
class Categoria(models.Model):
    nombre = models.CharField(_('nombre'), max_length=42, null=True, blank=True, unique=True)
    nombre_plural = models.CharField(_('nombre plural'), max_length=42, null=True, blank=True, unique=True)
    icono = models.FileField(_('icono'), upload_to='categorias', null=True, blank=True, help_text='este icono tiene que estar para fondo transparente y de color blanco')
    icono_mapa = models.FileField(_('icono en mapa'), upload_to='categorias', null=True, blank=True, help_text='este icono irá en el mapa: debe ser de 30x30px')
    fecha_creacion = models.DateTimeField(_('fecha de creación'), null=True, blank=True, auto_now=True)

    activo = models.BooleanField(_('¿Se encuentra activo?'), default=False)
    menu = models.BooleanField(_('en buscador'), default=False)
    # foot = models.BooleanField(default=False, help_text='')
    slug = models.SlugField(null=True, blank=True)

    history = HistoricalRecords()

    def __unicode__(self):
        return u'%s' % self.nombre

    class Meta:
        verbose_name = _('categoría')
        verbose_name_plural = _('categorías')


class MarcaQuerySet(models.QuerySet):
    pass


class Marca(models.Model):
    nombre = models.CharField(_('nombre'), max_length=100, null=True, blank=True, unique=True)
    frase_corporativa = models.CharField(_('frase corporativa'), max_length=42, null=True, blank=True, unique=True)
    icono = models.FileField(_('icono'), upload_to='categorias', null=True, blank=True)
    icono_mapa = models.FileField(_('icono en mapa'), upload_to='categorias', null=True, blank=True)
    fecha_creacion = models.DateTimeField(_('fecha de creación'), auto_created=True, null=True, blank=True)

    activo = models.BooleanField(default=True,
                                 help_text='Se encuentra activa o no la marca; Una marca puede estar desactivada y guardada')
    en_menu = models.BooleanField(default=True, help_text='')
    busquedas = models.BooleanField(default=True)
    logo = ThumbnailerImageField(upload_to='tienda', null=True, blank=True, help_text='Ojalá png o de acorde al fondo')

    history = HistoricalRecords()
    objects = MarcaQuerySet.as_manager()
    slug = models.SlugField(null=True, blank=True)

    def __unicode__(self):
        return u'%s' % self.nombre

    class Meta:
        verbose_name = _('marca')
        verbose_name_plural = _('marcas')


class Tipografia(models.Model):
    style_import_url = models.CharField(max_length=999,
                                        help_text='ej: https://fonts.googleapis.com/css?family=Spectral+SC ')
    font_family = models.CharField(max_length=999, help_text='ej: \'Spectral SC\', serif\"')

    history = HistoricalRecords()
    def __unicode__(self):
        return self.font_family

    class Meta:
        verbose_name = _('Tipografía')
        verbose_name_plural = _('Tipografías')


class Estilo(models.Model):
    nombre = models.CharField(max_length=100, null=True, blank=True, )

    somos_background = models.CharField(max_length=100, null=True, blank=True, )
    somos_titulo_color = models.CharField(max_length=100, null=True, blank=True, )
    somos_titulo_descripcion = models.CharField(max_length=100, null=True, blank=True, )

    horarios_background = models.CharField(max_length=100, null=True, blank=True, )
    horarios_titulo_color = models.CharField(max_length=100, null=True, blank=True, )
    horarios_horario_relojhoras_color = models.CharField(max_length=100, null=True, blank=True, )
    horarios_horario_dias_color = models.CharField(max_length=100, null=True, blank=True, )

    galeria_background = models.CharField(max_length=100, null=True, blank=True, )
    galeria_titulo_color = models.CharField(max_length=100, null=True, blank=True, )

    resennas_tituloycontenidonombre_background = models.CharField(max_length=100, null=True, blank=True, )
    resennas_tituloycontenidonombre_color = models.CharField(max_length=100, null=True, blank=True, )
    resennas_fecha_color = models.CharField(max_length=100, null=True, blank=True, )

    mapa_background = models.CharField(max_length=100, null=True, blank=True, )
    mapa_color = models.CharField(max_length=100, null=True, blank=True, )
    mapa_info_back = models.CharField(max_length=100, null=True, blank=True, )
    mapa_info_color = models.CharField(max_length=100, null=True, blank=True, )

    sociales_info_background = models.CharField(max_length=100, null=True, blank=True, )
    sociales_titulo_color = models.CharField(max_length=100, null=True, blank=True, )

    history = HistoricalRecords()
    class Meta:
        verbose_name = _('Estilo')
        verbose_name_plural = _('Estilos')

    def __unicode__(self):
        return self.nombre


class TiendaQuerySet(models.QuerySet):
    pass


class Tienda(models.Model):
    estilos = models.ForeignKey(Estilo, on_delete=models.CASCADE, blank=True, null=True)
    # associations
    cliente = models.ForeignKey(Cliente, related_name='client_store', null=True, blank=True)
    marca = models.ForeignKey(Marca, related_name='brand_store', default='Ciente', null=True, blank=True)
    categoria = models.ForeignKey(Categoria, related_name='category_store', null=True, blank=True)
    comuna = models.ForeignKey(Comuna, null=True, blank=True, related_name='comuna_store')

    tipo_panorama = models.CharField(_('tipo de evento'), choices=TIPO_PANORAMA_CHOICES, blank=True, null=True,
                                     max_length=2)

    # metas
    autor = models.ForeignKey('auth.User', null=True, blank=True)
    fecha_creacion = models.DateTimeField(auto_created=True, editable=False, null=True, blank=True)
    fecha_modificacion = models.DateTimeField(auto_now_add=True, editable=False, null=True, blank=True)

    # self
    expiracion = models.DateField(null=True, blank=True, default=datetime.datetime.today())
    fecha_inicio = models.DateField(null=True, blank=True, default=datetime.datetime.today())
    activo = models.BooleanField(default=False)
    panorama_destacado = models.BooleanField('Panoramas', default=False)
    tipster_recomienda = models.BooleanField(default=False)

    # info
    nombre = models.CharField(max_length=64)
    panorama_para = models.CharField('Recomendado para', max_length=64, null=True, blank=True,
                                     help_text='Aparecerá arriba de "abierto ahora"')
    logo = models.FileField(upload_to='logos', null=True, blank=True,
                            help_text='Será procesada como archivo, no se redimensionará ni recortará, solo se modificará su tamaño de ancho y largo')
    frase = models.CharField('Slogan', max_length=64, null=True, blank=True)
    quienes_somos = models.TextField(null=True, blank=True)
    telefono = models.CharField(max_length=16, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    sitio_web = models.URLField(null=True, blank=True)
    direccion = models.CharField(max_length=64, null=True, blank=True)
    precio = models.BigIntegerField('Precio desde', null=True, blank=True)

    # medias
    google_map = GeopositionField(default='-39.8173788,-73.24253329999999', blank=True)

    # others
    habilitacion_comentarios = models.BooleanField(default=False)
    slug = models.SlugField(unique=True)
    history = HistoricalRecords()
    objects = TiendaQuerySet.as_manager()

    # sociales:
    facebook_url = models.URLField(null=True, blank=True)
    twitter_url = models.URLField(null=True, blank=True)
    pinterest_url = models.URLField(null=True, blank=True)
    linkedin_url = models.URLField(null=True, blank=True)
    instagram_url = models.URLField(null=True, blank=True)
    vimeo_url = models.URLField(null=True, blank=True)
    youtube_url = models.URLField(null=True, blank=True)

    # horarios:
    horario_semana_inicio = models.TimeField(_('Apertura durante la semana'), null=True, blank=True)
    horario_semana_fin = models.TimeField(_('Cierre durante la semana'), null=True, blank=True)
    #horario_fin_semana_inicio = models.TimeField(_('Apertura durante fin de semana'), null=True, blank=True)
    #horario_fin_semana_fin = models.TimeField(_('Cierre durante fin de semana'), null=True, blank=True)

    # TODO: options to website (locations, colors, etc)
    def promedio_evaluacion(self):
        acumulador = 0
        contador = 0
        if self.tienda_comentario.select_related() > 2:
            for c in self.tienda_comentario.select_related():
                acumulador = acumulador + float(c.evaluacion)
                contador = contador + 1
                # print acumulador

        if contador == 0:
            acumulador = 4
            contador = 1

        promedio = acumulador / contador
        # print promedio
        return str(round(float(promedio), 1))

    def get_foto_cabecera(self):
        c = self.tienda_foto.filter(cabecera=True).last()
        return c

    def get_foto_tarjeta(self):
        c = self.tienda_foto.filter(tarjeta=True).last()
        return c

    def __unicode__(self):
        if self.nombre:
            return u'%s' % self.nombre
        elif self.marca:
            return u'%s' % self.marca.nombre

    # todo: def publish():
    class Meta:
        verbose_name = _('tienda')
        verbose_name_plural = _('tiendas')

    def ultimo_comentario(self):
        a = self.tienda_comentario.select_related().filter(visible=True).last()
        return a



class Evento(models.Model):
    # associations
    tienda = models.ForeignKey(Tienda, blank=True, null=True, related_name='tienda_evento')
    marca = models.ForeignKey(Marca, blank=True, null=True, related_name='brand_event')

    tipo_evento = models.CharField(_('tipo de evento'), choices=TIPO_EVENTOS_CHOICES, blank=True, null=True,
                                   max_length=2)
    comuna = models.ForeignKey(Comuna, null=True, blank=True, related_name='comuna_event')

    # info
    titulo = models.CharField(max_length=64)
    subtitulo = models.CharField(max_length=300, blank=True, null=True)
    direccion = models.CharField(max_length=64, blank=True, null=True)
    descripcion = models.TextField(blank=True, null=True)

    url = models.URLField(blank=True, null=True)
    google_map_iframe = models.CharField(blank=True, null=True, max_length=999, )

    # options
    en_tienda = models.BooleanField(default=True)
    google_map = GeopositionField(default='-39.8173788,-73.24253329999999', blank=True)

    history = HistoricalRecords()
    slug = models.SlugField(unique=True,
                            null=True, blank=True
                            )  # self

    fecha_expiracion = models.DateTimeField(default=django.utils.timezone.now, null=True, blank=True)
    fecha_inicio = models.DateTimeField(default=django.utils.timezone.now, null=True, blank=True)

    activo = models.BooleanField(_('Activado'), default=False, help_text='Si se encuentra activo será visible')
    redireccion = models.BooleanField(_('Redireccionar'), default=False,
                                      help_text='Al pedir más informaciónredireccionará')

    def __unicode__(self):
        return u'%s' % self.titulo

    def get_map(self):
        return 'inicialize%s' % self.slug.replace("-", "")

class ComentarioQuerySet(models.QuerySet):
    pass

class Comentario(models.Model):
    creado = models.DateTimeField(auto_created=True, null=True, blank=True)
    id_usuario = models.CharField(max_length=999, null=True, blank=True)
    nombre = models.CharField(max_length=100, null=True, blank=True)
    tienda = models.ForeignKey(Tienda, related_name='tienda_comentario', null=True, blank=True)
    visible = models.BooleanField(default=False,
                                  help_text='')
    texto = models.TextField('Comentario', null=True, blank=True)
    evaluacion = models.PositiveSmallIntegerField(
        default=4,
        help_text='del 1 al 7',
        validators=[
            MaxValueValidator(7),
            MinValueValidator(1)
        ])
    foto = ThumbnailerImageField(upload_to='people', null=True, blank=True)
    history = HistoricalRecords()
    objects = ComentarioQuerySet.as_manager()

    def __unicode__(self):
        return u'%s' % self.nombre

class Horario(models.Model):
    tienda = models.ForeignKey(Tienda, related_name='tienda_horario', null=True, blank=True)
    dias = models.CharField(max_length=100, blank=True, null=True)
    horas = models.CharField(max_length=100, blank=True, null=True)

    history = HistoricalRecords()
    def __unicode__(self):
        return '%s' % self.tienda

    def frase(self):
        return '%s %s' % (self.dias, self.horas)


class Foto(models.Model):
    # associations
    tienda = models.ForeignKey(Tienda, related_name='tienda_foto', null=True, blank=True)
    evento = models.ForeignKey(Evento, related_name='evento_foto', null=True, blank=True)

    # info
    fecha_creacion = models.DateTimeField(auto_created=True, default=django.utils.timezone.now)
    fecha_modificacion = models.DateTimeField(default=django.utils.timezone.now)

    nombre = models.CharField(max_length=32, null=True, blank=True)
    archivo = ThumbnailerImageField(upload_to='foto/%Y/%m/%d')
    cabecera = models.BooleanField(default=False,
                                   help_text='aparecerá en la cabecera, si se agrega más de una con esta opciòn se generarà un slider; sólo válido para tiendas')
    galeria = models.BooleanField(default=True, help_text='se encontrará en la galería de imagenes')
    tarjeta = models.BooleanField(default=False, help_text='será la imagen que aparecerá en las tarjetas')

    history = HistoricalRecords()
    def __unicode__(self):
        return u'%s' % self.tienda

    class Meta:
        verbose_name = _('foto')
        verbose_name_plural = _('fotos')
