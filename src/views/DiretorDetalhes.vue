<template>
  <div>
    <button class="btn btn-outline-secondary mb-3" @click="voltar">← Voltar</button>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border"></div>
    </div>

    <div v-else-if="erro" class="alert alert-danger">{{ erro }}</div>

    <template v-else-if="diretor">
      <div class="card mb-4">
        <div class="card-header bg-dark text-white">
          <h4 class="mb-0">{{ diretor.nome }}</h4>
        </div>
        <div class="card-body">
          <dl class="row mb-0">
            <dt class="col-sm-3">Nacionalidade</dt>
            <dd class="col-sm-9">{{ diretor.nacionalidade }}</dd>

            <dt class="col-sm-3">Idade</dt>
            <dd class="col-sm-9">{{ diretor.idade }} anos</dd>

            <dt class="col-sm-3">Biografia</dt>
            <dd class="col-sm-9">{{ diretor.biografia || '—' }}</dd>
          </dl>
        </div>
      </div>

      <h5>Filmes dirigidos</h5>
      <table class="table table-bordered">
        <thead class="table-secondary">
          <tr>
            <th>Título</th>
            <th>Gênero</th>
            <th>Ano</th>
            <th>Duração</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!filmes?.length">
            <td colspan="5" class="text-center text-muted">Nenhum filme associado.</td>
          </tr>
          <tr v-for="filme in filmes" :key="filme.idFilme">
            <td>{{ filme.titulo }}</td>
            <td>{{ filme.genero }}</td>
            <td>{{ filme.ano }}</td>
            <td>{{ filme.duracao }} min</td>
            <td>
              <a :to="`/filmes/${filme.idFilme}`" class="btn btn-sm btn-outline-info">
                Ver
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { diretorService } from '@/services/api' 
import type Diretor from '@/interfaces/Diretor'
import type Filme from '@/interfaces/Filme'


const diretor = ref<Diretor | null>(null)
const filmes = ref([] as Filme[])
const loading = ref(true)
const erro = ref('')

function voltar() {

}

onMounted(async () => {
  try {
    //preencher id com parâmetro da rota
    const id = "1"
    const res = await diretorService.getById(id)
    const response = await diretorService.getFilmesByDiretor(id)
    diretor.value = res.data
    filmes.value = response.data
  } catch {
    erro.value = 'Diretor não encontrado.'
  } finally {
    loading.value = false
  }
})
</script>