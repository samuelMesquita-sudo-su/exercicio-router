<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Diretores</h2>
      <button class="btn btn-primary" @click="abrirModal(null)">+ Novo Diretor</button>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border"></div>
    </div>

    <div v-else-if="erro" class="alert alert-danger">{{ erro }}</div>

    <table v-else class="table table-striped table-hover align-middle">
      <thead class="table-dark">
        <tr>
          <th>#</th>
          <th>Nome</th>
          <th>Nacionalidade</th>
          <th>Idade</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="diretores.length === 0">
          <td colspan="5" class="text-center text-muted">Nenhum diretor cadastrado.</td>
        </tr>
        <tr v-for="d in diretores" :key="d.idDiretor">
          <td>{{ d.idDiretor }}</td>
          <td>{{ d.nome }}</td>
          <td>{{ d.nacionalidade }}</td>
          <td>{{ d.idade }}</td>
          <td>
            <a :to="`/diretores/${d.idDiretor}`" class="btn btn-sm btn-outline-info me-1">
              Ver
            </a>
            <button class="btn btn-sm btn-outline-warning me-1" @click="abrirModal(d)">Editar</button>
            <button class="btn btn-sm btn-outline-danger" @click="excluir(d.idDiretor)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div class="modal fade" id="diretorModal" tabindex="-1" ref="modalEl">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ form.idDiretor ? 'Editar Diretor' : 'Novo Diretor' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Nome</label>
              <input v-model="form.nome" type="text" class="form-control" />
            </div>
            <div class="row">
              <div class="col mb-3">
                <label class="form-label">Nacionalidade</label>
                <input v-model="form.nacionalidade" type="text" class="form-control" />
              </div>
              <div class="col mb-3">
                <label class="form-label">Idade</label>
                <input v-model.number="form.idade" type="number" class="form-control" />
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Biografia</label>
              <textarea v-model="form.biografia" class="form-control" rows="3"></textarea>
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
import { ref, onMounted } from 'vue'
import { Modal } from 'bootstrap'
import { diretorService } from '@/services/api' 
import type Diretor from '@/interfaces/Diretor'

const diretores = ref([] as Diretor[])
const loading   = ref(true)
const salvando  = ref(false)
const erro      = ref('')
const modalEl   = ref(null)
let modal:any       = null

const form = ref({} as Diretor)

onMounted(async () => {
  modal = new Modal(modalEl.value!)
  await carregar()
})

async function carregar() {
  loading.value = true
  try {
    const res = await diretorService.getAll()
    diretores.value = res.data
  } catch {
    erro.value = 'Erro ao carregar diretores.'
  } finally {
    loading.value = false
  }
}

function abrirModal(diretor: Diretor | null) {
  form.value = diretor ? { ...diretor } : {} as Diretor
  modal.show()
}

async function salvar() {
  salvando.value = true
  try {
    if (form.value.idDiretor) {
      await diretorService.update(form.value.idDiretor, form.value)
    } else {
      await diretorService.create(form.value)
    }
    modal.hide()
    await carregar()
  } catch {
    alert('Erro ao salvar diretor.')
  } finally {
    salvando.value = false
  }
}

async function excluir(id: number) {
  if (!confirm('Deseja excluir este diretor?')) return
  await diretorService.remove(id)
  await carregar()
}
</script>