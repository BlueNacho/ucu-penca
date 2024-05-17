const usuarios = [
  {
    id: '1',
    nombre: 'John',
    apellido: 'Doe',
    mail: 'john@example.com',
    contraseña: '1234',
    carrera: 'ing. Informática',
    puntaje: 100,
    elec_campeon: '1',
    elec_subcampeon: '2',
    admin: true,
  },
  {
    id: '2',
    nombre: 'Jane',
    apellido: 'Smith',
    mail: 'jane@example.com',
    contraseña: '5678',
    carrera: 'medicina',
    puntaje: 150,
    elec_campeon: '2',
    elec_subcampeon: '1',
    admin: false,
  },
];

const equipos = [
  {
    id: "1",
    nombre: "Equipo A",
    fase: "grupos",
    estado_equipo: "clasificado",
  },
  {
    id: "2",
    nombre: "Equipo B",
    fase: "grupos",
    estado_equipo: "eliminado",
  },
];

const partidos = [
  {
    id: "1",
    id_equipo_local: "1",
    id_equipo_visitante: "2",
    goles_equipo_local: 2,
    goles_equipo_visitante: 1,
    fecha_comienzo: new Date(),
    fase: "grupos",
    estado_partido: "finalizado",
  },
];

const predicciones = [
  {
    id_partido: "1",
    id_usuario: "1",
    goles_equipo_local: 2,
    goles_equipo_visitante: 1,
  },
];

module.exports = {
  usuarios,
  equipos,
  partidos,
  predicciones,
};
