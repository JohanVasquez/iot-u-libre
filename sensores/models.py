# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


class Sensores(models.Model):
    """
    Autor: Johan Vasquez
    Fecha: 29/04/2018
    Descripcion: Modelo para gestionar los sensores registrados en el sistema
    """
    ESTADO = (
        (0, 'ACTIVO'),
        (1, 'INACTIVO'),
    )
    UBICACION = (
        (0, 'SALA'),
        (1, 'CUARTOS'),
        (2, 'COCINA'),
        (3, 'BAÑO'),
        (4, 'COMEDOR'),
        (5, 'PATIO'),
        (5, 'OTROS...'),
    )

    nombre = models.CharField(max_length=50, verbose_name='Nombre del sensor')
    codigo = models.CharField(max_length=4, verbose_name='Código del sensor', unique=True)
    estado = models.PositiveIntegerField(choices=ESTADO)
    ubicacion = models.PositiveIntegerField(choices=UBICACION)

    def __str__(self):
        return self.nombre
