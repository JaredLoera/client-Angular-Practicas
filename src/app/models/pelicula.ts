import { Genero } from "./genero";
export interface Pelicula {
    id: number
    titulo: string
    descripcion: string
    fecha_estreno: string
    imagen_url: string
    created_at: string
    updated_at: string
    generos: Genero[]
}
