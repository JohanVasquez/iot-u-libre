# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.views.generic import ListView, CreateView, UpdateView
from django.contrib import messages
from django.urls import reverse_lazy

from .models import Sensores
from .forms import SensoresForm


class SensoresCreateView(CreateView):
    """
    Autor: Johan Vasquez
    Fecha: 29/04/2018
    Descripción: Vista para crear sensores
    """
    model = Sensores
    form_class = SensoresForm
    success_url = reverse_lazy('gestion_sensores:listar_sensor')

    def form_valid(self, form):
        messages.success(self.request, "Sensor creado correctamente")
        return super(SensoresCreateView, self).form_valid(form)


class SensoresUpdateView(UpdateView):
    """
    Autor: Johan Vasquez
    Fecha: 29/04/2018
    Descripción: Vista para editar sensores
    """
    model = Sensores
    form_class = SensoresForm
    success_url = reverse_lazy('gestion_sensores:listar_sensor')

    def form_valid(self, form):
        if form.has_changed():
            messages.success(self.request, "Sensor actualizado correctamente")
        return super(SensoresUpdateView, self).form_valid(form)


class SensoresListView(ListView):
    """
    Autor: Johan Vasquez
    Fecha: 29/04/2018
    Descripción: Vista para Listar sensores
    """
    model = Sensores
