from django.contrib.auth.models import User, Group
from consumo.models import Consumo
from rest_framework import serializers


class ConsumoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consumo
        fields = ('sensor', 'consumo', 'fecha', 'valor')
