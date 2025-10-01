from django.urls import  path
from .views import (UsuarioListCreate,
                    UsuarioRetrieveUpdateDestroyAPIView,

                    TarefasListCreate,
                    TarefaRetrieveUpdateDestroyAPIView
                    )

urlpatterns = [
    path("api/usuario/criarListarUsuario/", UsuarioListCreate.as_view()),
    path("api/usuario/pkAtualizarDeletarUsuario/<int:pk>",UsuarioRetrieveUpdateDestroyAPIView.as_view()),

    path("api/tarefas/criarListarTarefas/",TarefasListCreate.as_view()),
    path("api/tarefas/pkAtualizarDeletarTarefas/<int:pk>", TarefaRetrieveUpdateDestroyAPIView.as_view())


]
