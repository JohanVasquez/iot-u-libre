"""projec_iot URL Configuration

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
from django.contrib.auth import views as auth_views
from django.conf.urls import url, include
from django.conf import settings
from django.conf.urls.static import static
from .views import Dashboard

urlpatterns = [

    url(r'^$', Dashboard.as_view(), name='inicio'),
    url(r'^login$', auth_views.login, name='login'),
    url(r'^logout$', auth_views.logout, {'next_page': 'inicio'}, name='logout'),
    url(r'^cambiar-password/$', auth_views.password_change, name='password_change'),
    url(r'^password-cambiado/$', auth_views.password_change_done, name='password_change_done'),
    url(r'^restablecer-password/', auth_views.password_reset, name='password_reset'),
    url(r'^restablecer-password-correo-enviado/', auth_views.password_reset_done,
        name='password_reset_done'),
    url(
      r'^crear-nuevo-password/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
      auth_views.password_reset_confirm, name='password_reset_confirm'),
    url(r'^restablecer-password-completado/', auth_views.password_reset_complete,
        name='password_reset_complete'),
    url(r'session_security/', include('session_security.urls')),

    # apps
    url(r'^gestion-sensores/', include('sensores.urls', namespace='gestion_sensores')),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
