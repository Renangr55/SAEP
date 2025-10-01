from django.db import models

# Create your models here.

class Usuario(models.Model):
    nomeUsuario = models.CharField(null=False)
    emailUsuario = models.EmailField()

    def __str__(self):
        return self.nomeUsuario

class Tarefa(models.Model):

    PRIORIDADE_CHOICES = (
        ("Baixa","Baixa"),
        ("Media","Media"),
        ("Alta","Alta")
    )

    STATUS_CHOICES = (
        ("Fazer","Fazer"),
        ("Fazendo","Fazendo"),
        ("Pronto","Pronto")
    )

    descricao = models.CharField(null=False)
    setor = models.CharField(null=False)
    prioridade = models.CharField(choices=PRIORIDADE_CHOICES,null=False)
    status = models.CharField(choices=STATUS_CHOICES,null=True)
    idUser = models.ForeignKey(Usuario,on_delete=models.CASCADE,null=False)

    def __str__(self):
        return self.descricao

