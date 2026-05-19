import DiretorDetalhes from '@/views/DiretorDetalhes.vue'
import DiretoresLista from '@/views/DiretoresLista.vue'
import FilmeDetalhes from '@/views/FilmeDetalhes.vue'
import FilmesLista from '@/views/FilmesLista.vue'
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'filmes',
      path: '/filmes',
      component: FilmesLista
    },
    { 
      name: 'filme',
      path: '/filmes/:id',
      component: FilmeDetalhes
    },
    {
      name: "Diretores",
      path: "/diretores",
      component: DiretoresLista
    },
    {
      name: "Diretor",
      path: "/diretores/:id",
      component: DiretorDetalhes
    }
  ],
})

export default router
