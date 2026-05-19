import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' }
})

export const filmeService = {
  getAll:    ()       => api.get('/filmes'),
  getById:   (id: any)     => api.get(`/filmes/${id}`),
  create:    (data: any)   => api.post('/filmes', data),
  update:    (id: any, data: any) => api.put(`/filmes/${id}`, data),
  remove:    (id: any)     => api.delete(`/filmes/${id}`)
}

export const diretorService = {
  getAll:    ()       => api.get('/diretores'),
  getById:   (id: any)     => api.get(`/diretores/${id}`),
  create:    (data: any)   => api.post('/diretores', data),
  update:    (id: any, data: any) => api.put(`/diretores/${id}`, data),
  getFilmesByDiretor: (id: any) => api.get(`/diretores/${id}/filmes`),
  remove:    (id: any)     => api.delete(`/diretores/${id}`)
}

export const avaliacaoService = {
  getByFilme: (idFilme: any) => api.get(`/avaliacoes/filme/${idFilme}`),
  create:     (data: any)    => api.post('/avaliacoes', data),
  remove:     (id: any)      => api.delete(`/avaliacoes/${id}`)
}

export default api