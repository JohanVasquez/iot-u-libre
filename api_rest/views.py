# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from consumo.models import Consumo
from .serializers import ConsumoSerializer


class ConsumoViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Consumo.objects.all().order_by('-date_joined')
    serializer_class = ConsumoSerializer
