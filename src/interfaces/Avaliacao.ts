import type Filme from "./Filme"

export interface Avaliacao {
  idAvaliacao: number
  nota: number
  comentario: string
  filme?: Filme
}