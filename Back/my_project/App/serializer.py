from rest_framework import serializers
from .models import (Usuario,Tarefa)

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = "__all__"


class TarefaSrializer(serializers.ModelSerializer):
    idUser = serializers.PrimaryKeyRelatedField(queryset=Usuario.objects.all())
    nomeUsuario = serializers.StringRelatedField(source="idUser", read_only=True)

     
    class Meta:
        model = Tarefa
        fields = "__all__"

