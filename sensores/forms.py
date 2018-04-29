from django import forms
from .models import Sensores


class SensoresForm(forms.ModelForm):
    """
    Autor: Johan Vasquez
    Fecha: 29/04/2018
    Descripción: Formulario para gestionar los sensores registrados en el sistema
    """
    required_css_class = 'required'

    class Meta:
        model = Sensores
        fields = ('nombre', 'estado', 'ubicacion')
