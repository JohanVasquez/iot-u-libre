# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.views.generic import ListView, CreateView
from django.urls import reverse_lazy

from .models import Consumo, ValorEnergetico
from .forms import ConsumoForm, ValorEnergeticoForm


class ConsumoCreateView(CreateView):
    """
    Autor: Johan Vasquez
    Fecha: 12/06/2018
    Descripción: Vista para crear consumo energetico
    """
    model = Consumo
    form_class = ConsumoForm
    success_url = reverse_lazy('gestion_consumo:listar_consumo')


class ConsumoListView(ListView):
    """
    Autor: Johan Vasquez
    Fecha: 12/06/2018
    Descripción: Vista para Listar el consumo energetico
    """
    model = Consumo


class ValorEnergeticoCreateView(CreateView):
    """
    Autor: Johan Vasquez
    Fecha: 12/06/2018
    Descripción: Vista para crear consumo energetico
    """
    model = ValorEnergetico
    form_class = ValorEnergeticoForm
    success_url = reverse_lazy('gestion_consumo:listar_valor')


class ValorEnergeticoListView(ListView):
    """
    Autor: Johan Vasquez
    Fecha: 12/06/2018
    Descripción: Vista para Listar el consumo energetico
    """
    model = ValorEnergetico
