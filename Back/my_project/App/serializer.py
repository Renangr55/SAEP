from rest_framework import serializers
from .models import (Usuario,Tarefa)

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = "__all__"


class TarefaSrializer(serializers.ModelSerializer):
    idUser = serializers.SlugRelatedField(
        slug_field='nomeUsuario',  # 👈 vai mostrar o nomeUsuario
        queryset=Usuario.objects.all())
    class Meta:
        model = Tarefa
        fields = "__all__"

