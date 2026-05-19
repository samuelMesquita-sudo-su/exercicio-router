import type { Avaliacao } from "./Avaliacao"
import type Diretor from "./Diretor"

export default interface Filme {
  idFilme: number
  titulo: string
  genero: string
  ano: number
  duracao: number,
  idDiretor: number,
  diretor?: Diretor
  avaliacoes?: Avaliacao[]
}