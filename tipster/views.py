import datetime


from django.db.models import Q
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import get_object_or_404, render_to_response

from appcontacto import views
from appavisos.models import Tienda, Categoria, Evento
from appavisos.forms import ComentarioForm
from appmapachile.models import Comuna
from django.shortcuts import render, redirect

def desactivar_tiendas(tienda):
    hoy = datetime.date.today()
    try:
        if tienda.fecha_inicio >= hoy and tienda.expiracion <= hoy:
            tienda.activo = True
        else:
            tienda.activo = False
    except:
        pass

def comment_form(request, tienda):
    if request.method == "POST":
        contact = ComentarioForm(request.POST)
        if contact.is_valid():
            c = contact.save(commit=False)
            try:
                c.save()
                # c.
                c.creado = datetime.datetime.now()
                c.tienda = tienda
                print c.tienda
                print c.creado
                return redirect('/')
            except:
                print 'No se pudo'
    else:
        contact = ComentarioForm()
    return contact

def home(request):
    for tienda in Tienda.objects.all():
        desactivar_tiendas(tienda)
    tiendas = Tienda.objects.exclude(Q(activo=False))
    a = tiendas.filter(panorama_destacado=True, tipo_panorama='A')
    b = tiendas.filter(panorama_destacado=True, tipo_panorama='B')
    c = tiendas.filter(panorama_destacado=True, tipo_panorama='C')
    try:
        slider1 = [a[0], b[0], c[0]]
    except:
        slider1 = []
    try:
        slider2 = [a[1], b[1], c[1]]
    except:
        slider2 = []
    try:
        slider3 = [a[2], b[2], c[2]]
    except:
        slider3 = []
    ciudades = Comuna.objects.filter(activacion=True)
    recomendados = tiendas.filter(tipster_recomienda=True, activo=True)
    eventos = Evento.objects.filter(activo=True)
    return render(request, 'visitante/home.html', {
        'contact': views.form_contacto(request=request),
        'categories': Categoria.objects.all(),
        'slider1': slider1,
        'slider2': slider2,
        'slider3': slider3,
        'recomendado1': recomendados[0:3],
        'recomendado2': recomendados[3:6],
        'recomendado3': recomendados[6:9],
        'stores': tiendas,
        'events': eventos,
        'now_': datetime.datetime.now(),
        'ciudades': ciudades,
    })


def directory(request, slug_cat):
    for tienda in Tienda.objects.all():
        desactivar_tiendas(tienda)
    cats = Categoria.objects.exclude(activo=False)
    tiendas = Tienda.objects.exclude(
        activo=False,
        # expiracion__lte=datetime.datetime.now(),
        categoria__activo=False,
        marca__activo=False,
    )
    return render(request, 'visitante/directorio.html', {
        # 'contact': views.form_contacto(request=request),
        'category': get_object_or_404(Categoria, slug=slug_cat),
        'categories': cats,
        'stores': tiendas,
    })

def todo_directory(request):
    for tienda in Tienda.objects.all():
        desactivar_tiendas(tienda)
    cats = Categoria.objects.exclude(activo=False)
    tiendas = Tienda.objects.exclude(
        activo=False,
        # expiracion__lte=datetime.datetime.now(),
        categoria__activo=False,
        marca__activo=False,
    )
    return render(request, 'visitante/directorio.html', {
        # 'contact': views.form_contacto(request=request),
        'category': cats,
        'categories': cats,
        'stores': tiendas,
    })

def directory_search(request):
    for tienda in Tienda.objects.all():
        desactivar_tiendas(tienda)
    query = request.GET.get('q', '')
    if query:
        qset = (
                Q(nombre__icontains=query) |
                Q(panorama_para__icontains=query) |
                Q(frase__icontains=query)
        )
        results = Tienda.objects.filter(qset).distinct()
    else:
        results = []
    return render_to_response("visitante/directorio_search.html", {
        "results": results,
        "query": query,
    })



def store_detail(request, slug):
    for tienda in Tienda.objects.all():
        desactivar_tiendas(tienda)
    tienda = get_object_or_404(Tienda, slug=slug)
    if request.method == "POST":
        comment_form = ComentarioForm(request.POST)
        if comment_form.is_valid():
            c = comment_form.save(commit=False)
            print c.tienda
            print c.creado
            c.creado = datetime.datetime.now()
            c.tienda_id = tienda.id
            c.evaluacion = request.POST["evaluacion_select"]
            #c.id_usuario = request.user.id
            c.id_usuario = request.POST["id_usuario"]
            int(c.evaluacion)
            c.save()
            return HttpResponseRedirect('/es/tienda/%s' % tienda.slug)
        else:
            pass
    else:
        comment_form = ComentarioForm()
    return render(request, 'visitante/detalle_tienda.html', {
        'comment_form': comment_form,
        # 'contact': views.form_contacto(request=request),
        'tienda': tienda,
        'contact': views.form_contacto_tienda(request=request, tienda_id=tienda.id),
    })

def condiciones(request):
    return HttpResponse("estas en condiciones")

def politica(request):
    return HttpResponse("estas en politica")

def error_facebook(request):
    return HttpResponse("estas en error facebook")

def login(request):
    return render(request,'registration/login.html')



'''
######################social auth######################
@login_required
def home(request):
    return render(request, 'core/home.html')

@login_required
def settings(request):
    user = request.user

    try:
        github_login = user.social_auth.get(provider='github')
    except UserSocialAuth.DoesNotExist:
        github_login = None

    try:
        twitter_login = user.social_auth.get(provider='twitter')
    except UserSocialAuth.DoesNotExist:
        twitter_login = None

    try:
        facebook_login = user.social_auth.get(provider='facebook')
    except UserSocialAuth.DoesNotExist:
        facebook_login = None

    can_disconnect = (user.social_auth.count() > 1 or user.has_usable_password())

    return render(request, 'core/settings.html', {
        'github_login': github_login,
        'twitter_login': twitter_login,
        'facebook_login': facebook_login,
        'can_disconnect': can_disconnect
    })

@login_required
def password(request):
    if request.user.has_usable_password():
        PasswordForm = PasswordChangeForm
    else:
        PasswordForm = AdminPasswordChangeForm

    if request.method == 'POST':
        form = PasswordForm(request.user, request.POST)
        if form.is_valid():
            form.save()
            update_session_auth_hash(request, form.user)
            messages.success(request, 'Your password was successfully updated!')
            return redirect('password')
        else:
            messages.error(request, 'Please correct the error below.')
    else:
        form = PasswordForm(request.user)
    return render(request, 'core/password.html', {'form': form})


# TODO: add to urls xD

'''
