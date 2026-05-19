<template>
  <div>
    <button class="btn btn-outline-secondary mb-3" @click="voltar">← Voltar</button>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border"></div>
    </div>

    <div v-else-if="erro" class="alert alert-danger">{{ erro }}</div>

    <template v-else-if="filme">
      <!-- Dados do filme -->
      <div class="card mb-4">
        <div class="card-header bg-dark text-white">
          <h4 class="mb-0">{{ filme.titulo }}</h4>
        </div>
        <div class="card-body">
          <dl class="row mb-0">
            <dt class="col-sm-3">Gênero</dt>
            <dd class="col-sm-9">{{ filme.genero }}</dd>

            <dt class="col-sm-3">Ano</dt>
            <dd class="col-sm-9">{{ filme.ano }}</dd>

            <dt class="col-sm-3">Duração</dt>
            <dd class="col-sm-9">{{ filme.duracao }} min</dd>

            <dt class="col-sm-3">Diretor</dt>
            <dd class="col-sm-9">
              <a v-if="filme.idDiretor" :to="`/diretores/${filme.idDiretor}`">
                {{ filme.idDiretor }}
              </a>
              <span v-else>—</span>
            </dd>
          </dl>
        </div>
      </div>

      
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { filmeService } from '@/services/api'
import type Filme from '@/interfaces/Filme'

import { useRoute, useRouter } from 'vue-router'

const filme  = ref<Filme | null>(null)
const loading = ref(true)
const erro    = ref('')


//meu
const route = useRoute()

const router = useRouter()

function voltar() {
  router.push('/filmes')
}

onMounted(async () => {
  try {
    //preencher id com parâmetro da rota
    const id = route.params.id //"1"
    const resFilme = await filmeService.getById(id)
    filme.value    = resFilme.data
  } catch {
    erro.value = 'Erro ao carregar dados do filme.'
  } finally {
    loading.value = false
  }
})

</script>