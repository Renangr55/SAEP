from rest_framework import serializers
from .models import (Usuario,Tarefa)

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = "__all__"


class TarefaSrializer(serializers.ModelSerializer):
    nomeUsuario = serializers.ReadOnlyField(source='idUser.nomeUsuario')

     
    class Meta:
        model = Tarefa
        fields = "__all__"

