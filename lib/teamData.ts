// Datos locales del equipo consultor

export interface TeamMember {
  id: string
  name: string
  position: string
  bio?: string
  specialties?: string[]
  experience?: string
  photo: string
  email?: string
  linkedin?: string
  order: number
  active: boolean
}

export const teamData: TeamMember[] = [
  {
    id: "edwin-tapia",
    name: "Edwin Oswaldo Tapia Palomino",
    position: "MSc. Sistemas de Gestión Ambiental",
    photo: "/edwin.jpg",
    specialties: ["Gestión Ambiental", "Sistemas de Gestión", "Certificaciones ISO"],
    order: 1,
    active: true,
  },
  {
    id: "diana-mena",
    name: "Diana María Mena Minuche",
    position: "Ing. Comercio Exterior",
    photo: "/diana.png",
    specialties: ["Comercio Exterior", "Logística", "Gestión Comercial"],
    order: 2,
    active: true,
  },
  {
    id: "carlos-pacheco",
    name: "Carlos Mauricio Pacheco Merizalde",
    position: "Ing. Forestal",
    photo: "/carlos.png",
    specialties: ["Ingeniería Forestal", "Manejo de Bosques", "Inventarios Forestales"],
    order: 3,
    active: true,
  },
  {
    id: "ronald-villamar",
    name: "Ronald Oswaldo Villamar Torres",
    position: "PhD. Diversidad y Mejoramiento de Plantas",
    photo: "/ronald.png",
    specialties: ["Mejoramiento Genético", "Diversidad Vegetal", "Investigación"],
    order: 4,
    active: true,
  },
  {
    id: "carlos-carrera",
    name: "Carlos Gabriel Carrera Díaz",
    position: "MSc. Sistemas de Información Geográfica",
    photo: "/carlos gabriel.jpg",
    specialties: ["SIG", "Geomática", "Análisis Espacial"],
    order: 5,
    active: true,
  },
  {
    id: "gregorio-vasconez",
    name: "Gregorio Humberto Vásconez Montufar",
    position: "PhD. Suelos y Nutrición Vegetal",
    photo: "/gregorio.png",
    specialties: ["Edafología", "Nutrición Vegetal", "Fertilidad de Suelos"],
    order: 6,
    active: true,
  },
]
