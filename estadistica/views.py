# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.views.generic import TemplateView
from sensores.models import Sensores
from django.shortcuts import render


class Grafica(TemplateView):
    template_name = 'grafica/index.html'

    def get_context_data(self, *args, **kwargs):
        context = super(Grafica, self).get_context_data(*args, **kwargs)
        """ORM de django"""
        sensores = Sensores.objects.filter(codigo=1)
        context["variable"] = sensores
        return context


class Tiempo_real(TemplateView):
    template_name = 'grafica/tiempo_real.html'

    def get_context_data(self, *args, **kwargs):
        context = super(Tiempo_real, self).get_context_data(*args, **kwargs)
        """ORM de django"""
        sensores = Sensores.objects.filter(codigo=1)
        context["variable"] = sensores
        return context
