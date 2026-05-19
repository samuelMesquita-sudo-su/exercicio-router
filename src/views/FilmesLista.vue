<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Filmes</h2>
      <button class="btn btn-primary" @click="abrirModal()">+ Novo Filme</button>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border" role="status"></div>
    </div>

    <div v-else-if="erro" class="alert alert-danger">{{ erro }}</div>

    <table v-else class="table table-striped table-hover align-middle">
      <thead class="table-dark">
        <tr>
          <th>#</th>
          <th>Título</th>
          <th>Gênero</th>
          <th>Ano</th>
          <th>Duração</th>
          <th>Diretor</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="filmes.length === 0">
          <td colspan="7" class="text-center text-muted">Nenhum filme cadastrado.</td>
        </tr>
        <tr v-for="filme in filmes" :key="filme.idFilme">
          <td>{{ filme.idFilme }}</td>
          <td>{{ filme.titulo }}</td>
          <td>{{ filme.genero }}</td>
          <td>{{ filme.ano }}</td>
          <td>{{ filme.duracao }} min</td>
          <td>{{ filme.idDiretor || '—' }}</td>
          <td>
            <RouterLink :to="`/filmes/${filme.idFilme}`" class="btn btn-sm btn-outline-info me-1">
              Ver
            </RouterLink>
            <button class="btn btn-sm btn-outline-warning me-1" @click="abrirModal(filme)">
              Editar
            </button>
            <button class="btn btn-sm btn-outline-danger" @click="excluir(filme.idFilme)">
              Excluir
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div class="modal fade" id="filmeModal" tabindex="-1" ref="modalEl">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ form.idFilme ? 'Editar Filme' : 'Novo Filme' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Título</label>
              <input v-model="form.titulo" type="text" class="form-control" />
            </div>
            <div class="mb-3">
              <label class="form-label">Gênero</label>
              <input v-model="form.genero" type="text" class="form-control" />
            </div>
            <div class="row">
              <div class="col mb-3">
                <label class="form-label">Ano</label>
                <input v-model.number="form.ano" type="number" class="form-control" />
              </div>
              <div class="col mb-3">
                <label class="form-label">Duração (min)</label>
                <input v-model.number="form.duracao" type="number" class="form-control" />
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Diretor</label>
              <select v-model="form.idDiretor" class="form-select">
                <option :value="null">Sem diretor</option>
                <option v-for="d in diretores" :key="d.idDiretor" :value="d.idDiretor">
                  {{ d.nome }}
                </option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button class="btn btn-primary" @click="salvar" :disabled="salvando">
              <span v-if="salvando" class="spinner-border spinner-border-sm me-1"></span>
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, useTemplateRef } from 'vue'
import { Modal } from 'bootstrap'
import { filmeService, diretorService } from '@/services/api.ts'
import type Filme from '@/interfaces/Filme'
import type Diretor from '@/interfaces/Diretor'

const filmes   = ref([] as Filme[])
const diretores = ref([] as Diretor[])
const loading  = ref(true)
const salvando = ref(false)
const erro     = ref('')
const modalEl  = useTemplateRef('modalEl')
let modal: any     = null

const form = ref({} as Filme)

onMounted(async () => {
  modal = new Modal(modalEl.value!)
  await Promise.all([carregarFilmes(), carregarDiretores()])
})

async function carregarFilmes() {
  loading.value = true
  try {
    const res = await filmeService.getAll()
    filmes.value = res.data
  } catch {
    erro.value = 'Erro ao carregar filmes.'
  } finally {
    loading.value = false
  }
}

async function carregarDiretores() {
  const res = await diretorService.getAll()
  diretores.value = res.data
}

function abrirModal(filme: Filme | null = null) {
  form.value = filme
    ? { idFilme: filme.idFilme, titulo: filme.titulo, genero: filme.genero, ano: filme.ano, duracao: filme.duracao, idDiretor: filme.idDiretor, diretor: filme.diretor ? filme.diretor : {} as Diretor }
    : {} as Filme
  modal.show()
}

async function salvar() {
  salvando.value = true
  try {
    const payload = { ...form.value }
    if (form.value.idFilme) {
      await filmeService.update(form.value.idFilme, payload)
    } else {
      await filmeService.create(payload)
    }
    modal.hide()
    await carregarFilmes()
  } catch {
    alert('Erro ao salvar filme.')
  } finally {
    salvando.value = false
  }
}

async function excluir(id:number) {
  if (!confirm('Deseja excluir este filme?')) return
  await filmeService.remove(id)
  await carregarFilmes()
}
</script>