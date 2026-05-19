import type Filme from "./Filme"

export default interface Diretor {
  idDiretor: number
  nome: string
  nacionalidade: string
  idade: number
  biografia: string
  filmes?: Filme[]
}