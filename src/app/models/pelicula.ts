import { Genero } from "./genero";
export class Pelicula {
    id!: number
    titulo!: string
    descripcion!: string
    fecha_estreno!: string
    imagen_url!: string
    video_url!: string
    created_at!: string
    updated_at!: string
    generos!: Genero[]
}
