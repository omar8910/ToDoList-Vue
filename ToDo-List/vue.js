// vue.js

// Clase Nota
class Nota {
    constructor(nombre, prioridad = "normal", date = Date.now(), estado = false) {
        this.nombre = nombre;
        this.prioridad = prioridad;
        this.date = date;
        this.estado = estado;
    }
}

// Vue
const { createApp } = Vue;

createApp({
    // Datos
    data() {
        return {
            notas: this.obtenerTodasLasNotas(), // Array de notas.
            nuevaNotaInput: "", // Input para crear una nueva nota.
            filtradoPrioridad: "",  // Select para filtrar por prioridad.
            buscarNotaInput: "", // Input para buscar una nota.
        }
    },
    // Métodos
    methods: {
        calcularFecha(nota) {
            return Math.floor((Date.now() - nota.date) / 1000 / 60);
        },
        ordenarNotas(arrayNotas) {
            return arrayNotas.sort((notaPrimera, notaSegunda) => {
                if (notaPrimera.prioridad === notaSegunda.prioridad) {
                    return 0;
                } else if (notaSegunda.prioridad === "alto") {
                    return 1;
                } else if ((notaSegunda.prioridad === "normal") && (notaPrimera.prioridad === "bajo")) {
                    return 1;
                } else if ((notaPrimera.prioridad === "alto") && (notaSegunda.prioridad !== "alto")) {
                    return -1;
                } else if ((notaPrimera.prioridad === "normal") && (notaSegunda.prioridad === "bajo")) {
                    return -1;
                }
            });
        },

        completarNota(nota) {
            nota.estado = !nota.estado;
            localStorage.notas = JSON.stringify(this.notas);
        },

        crearNuevaNota() {
            const miNota = new Nota(this.nuevaNotaInput);
            this.notas.push(miNota);
            localStorage.notas = JSON.stringify(this.notas);
            this.nuevaNotaInput = "";
        },

        filtradoPorPrioridad() {
            const miArrayFiltradoPrioridad = this.notas.filter(nota => nota.prioridad === this.filtradoPrioridad);
            return this.ordenarNotas(miArrayFiltradoPrioridad);
        },

        buscarNota() {
            miArrayFiltradoPrioridad = this.notas.filter((nota) => nota.nombre.toLowerCase().includes(this.buscarNotaInput.toLowerCase()));
            if(this.filtradoPrioridad == ""){
                return this.ordenarNotas(miArrayFiltradoPrioridad);
            }else{
                resultado = miArrayFiltradoPrioridad.filter((nota) => nota.prioridad == this.filtradoPrioridad);
                return this.ordenarNotas(resultado);
            }
        },

   
        obtenerTodasLasNotas() {
            if(localStorage.notas != null){
                var notas = JSON.parse(localStorage.getItem('notas')) // Si hay notas en el localStorage, las recupero y las guardo en el array notas.
            }else{
                var notas = []; // Si no hay notas en el localStorage, creo un array vacío.
            }
            return notas;
        },

        establecerPrioridad(nota, prioridad) {
            if(nota){
                nota.prioridad = prioridad;
                localStorage.notas = JSON.stringify(this.notas);
            }

        },

        eliminarNota(tarea) {
            var resultado = this.notas.filter(nota => nota.nombre != tarea.nombre);
            this.notas = resultado;
            localStorage.notas = JSON.stringify(this.notas);
        },

        borrarNotasCompletadas() {
            var resultado = this.notas.filter((nota) => nota.estado != true);
            this.notas = resultado;
            localStorage.notas = JSON.stringify(this.notas);
          },
    },
    // Propiedades calculadas.
    computed: {
        notasPendientes() {
            return this.notas.filter(nota => !nota.estado).length;
        },
        totalNotas() {
            return this.notas.length;
        }
    }
}).mount('#app');
