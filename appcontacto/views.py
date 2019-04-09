# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, get_object_or_404

# Create your views here.
from django.shortcuts import redirect
from django.core.mail import EmailMultiAlternatives
import datetime

from appavisos.models import Tienda


from .models import Contacto

now = str(datetime.datetime.now())
from .forms import ContactoForm


def form_contacto(request):
    if request.method == "POST":
        contact = ContactoForm(request.POST)
        if contact.is_valid():
            c = contact.save(commit=False)
            try:
                if c.mensaje == Contacto.objects.get(mensaje=c.mensaje):
                    c.delete()
                    contact = ContactoForm()
                    pass
                elif '<' in c.mensaje:
                    print('se intentó con <')
                    contact = ContactoForm()
                    pass
                elif '</' in c.mensaje:
                    contact = ContactoForm()
                    pass
                elif '<img' in c.mensaje:
                    contact = ContactoForm()
                    pass
                elif '>' in c.mensaje:
                    contact = ContactoForm()
                elif '==' in c.mensaje:
                    contact = ContactoForm()
                    pass
            except:
                c.save()
                to_mail = c.email
                subject, from_email, to = 'Copia Mensaje', 'contacto@tipster.cl', to_mail,
                text_content = 'Gracias por escribirnos'
                html_content = '<p><strong>Mensaje: </strong><br>' + c.mensaje + '</p><br><p><strong>De: </strong>' + c.nombre + '(' + c.email + ' - enviado: ' + now + ')</p>'
                print(html_content)
                msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
                msg.attach_alternative(html_content, "text/html")
                msg.send()
                print('Enviado a cliente :v')
                to_mail = 'contacto@tipster.cl'
                subject, from_email, to = 'Copia Mensaje Tipster', 'contacto@tipster.cl', to_mail,
                text_content = 'Gracias por escribirnos'
                html_content = '<p><strong>Mensaje: </strong><br>' + c.mensaje + '</p><br><p><strong>De: </strong>' + c.nombre + '(' + c.email + ' - enviado: ' + now + ')</p>'
                msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
                msg.attach_alternative(html_content, "text/html")
                msg.send()
                print('Enviado copia :v')
                return redirect('/')
    else:
        contact = ContactoForm()
    return contact


def form_contacto_tienda(request, tienda_id):
    if request.method == "POST":
        contact = ContactoForm(request.POST)
        if contact.is_valid():
            c = contact.save(commit=False)
            try:
                if c.mensaje == Contacto.objects.get(mensaje=c.mensaje):
                    c.delete()
                    contact = ContactoForm()
                    pass
                elif '<' in c.mensaje:
                    print('se intentó con <')
                    contact = ContactoForm()
                    pass
                elif '</' in c.mensaje:
                    contact = ContactoForm()
                    pass
                elif '<img' in c.mensaje:
                    contact = ContactoForm()
                    pass
                elif '>' in c.mensaje:
                    contact = ContactoForm()
                elif '==' in c.mensaje:
                    contact = ContactoForm()
                    pass
                else:
                    c.save()
                    to_mail = Tienda.objects.get(id=tienda_id).email
                    subject, from_email, to = 'Copia Mensaje', 'noresponder@tipster.cl', to_mail,
                    text_content = 'Gracias por escribirnos'
                    html_content = '<p><strong>Mensaje: </strong><br>' + c.mensaje + '</p><br><p><strong>De: </strong>' + c.nombre + '(' + c.email + ' - enviado: ' + now + ')</p>'
                    print(html_content)
                    msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
                    msg.attach_alternative(html_content, "text/html")
                    msg.send()
                    print('Enviado a cliente :v')
                    to_mail = c.email
                    subject, from_email, to = 'Copia Mensaje Tipster', 'noresponder@tipster.cl', to_mail,
                    text_content = 'Gracias por escribirnos'
                    html_content = '<p><strong>Mensaje: </strong><br>' + c.mensaje + '</p><br><p><strong>De: </strong>' + c.nombre + '(' + c.email + ' - enviado: ' + now + ')</p>'
                    msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
                    msg.attach_alternative(html_content, "text/html")
                    msg.send()
                    print('Enviado copia :v')
                    return redirect('/')
            except:
                print('no se pudo enviar :c')
        else:
            print('no valido')
    else:
        contact = ContactoForm()
    return contact
