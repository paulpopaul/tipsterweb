"""tipster URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""

from django.conf.urls import url, include
from django.contrib import admin
from django.conf.urls.static import static
from django.views.generic import TemplateView

from settings import MEDIA_URL, MEDIA_ROOT
from django.conf.urls.i18n import i18n_patterns
import views
from django.contrib.auth import views as auth_views
from graphene_django.views import GraphQLView
import appdirectorio.schema

urlpatterns = i18n_patterns(

    url('', include('social_django.urls', namespace='social')),
    #url(r'^login/$', views.login, name='login'),
    url(r'^logout/$', auth_views.logout, name='logout'),

    url(r'^admin/', include(admin.site.urls), ),

    url(r'^$', views.home, name='home',),
    url(r'^directorio/(?P<slug_cat>[a-z][\w\-]+)/$', views.directory, name='directory'),
    url(r'^directorios/$', views.todo_directory, name='todo_directory'),
    url(r'^tienda/(?P<slug>[a-z][\w\-]+)/$', views.store_detail, name='detail-store'),
    #url(r'^login/$', auth_views.login, name='login'),
    url(r'^busqueda/$', views.directory_search, name='search'),
    url(r'^politica/$', views.politica, name='politica'),
    url(r'^condiciones/$', views.condiciones, name='condiciones'),
    url(r'^error-fb/$', views.error_facebook, name='error_facebook'),

    #url(r'^graphql', GraphQLView.as_view(graphiql=True, schema=appdirectorio.schema)),
    # url(r'^politicas/$', views.home, name='politicas'),
) + static(MEDIA_URL, document_root=MEDIA_ROOT)
