# -*- coding: utf-8 -*-
import random
import datetime
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView
from sensores.models import Sensores
from consumo.models import Consumo


class Dashboard(LoginRequiredMixin, TemplateView):
    template_name = 'project_iot/index.html'

    def get_context_data(self, *args, **kwargs):
        context = super(Dashboard, self).get_context_data(*args, **kwargs)
        sensores = Sensores.objects.all().count()
        sensores_activos = Sensores.objects.filter(estado=0)
        context['total_sensores'] = sensores
        context['sensores_activos'] = sensores_activos
        consumos = Consumo.objects.all()
        consumo_total = 0
        for consumo in consumos:
            consumo_total += consumo.consumo
        context['consumo_total'] = consumo_total
        return context
