class Habitacion {
    constructor(id, capacidad_personas, cost) {
        this.id = id;
        this.reservada = false;
        this.fecha_inicio = null;
        this.fecha_fin = null;
        this.capacidad_personas = capacidad_personas;
        this.cost = cost;
    }

    reservar(fecha_inicio, fecha_fin) {
        this.reservada = true;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
    }

    disponible() {
        this.reservada = false;
        this.fecha_inicio = null;
        this.fecha_fin = null;
    }

    toString() {
        let descripcion =
            "\n===============\nN° Habitacion: " +
            this.id +
            "\nCapacidad de personas: " +
            this.capacidad_personas +
            "\nCheck-in: " +
            this.fecha_inicio +
            "\nCheck-out: " +
            this.fecha_fin +
            "\nReservada: " +
            this.reservada +
            "\nCosto por persona: $" +
            this.cost +
            "\n";

        return descripcion;
    }
}

class Hotel {
    constructor() {
        this.listaHabitaciones = [];
    }

    agregarHabitacion(habitacion) {
        this.listaHabitaciones.push(habitacion);
    }

    mostrarHabitacionesDisponibles(capacidad_requerida = 1) {
        let disponibles = this.listaHabitaciones.filter(
            (habitacion) =>
                !habitacion.reservada && habitacion.capacidad_personas >= capacidad_requerida
        );

        if (disponibles.length === 0) {
            alert("No hay habitaciones disponibles para la capacidad requerida.");
        } else {
            let descripcion = "Habitaciones Disponibles:\n";
            disponibles.forEach((habitacion) => {
                descripcion += habitacion.toString() + "\n";
            });
            alert(descripcion);
        }
    }

    reservarHabitacion(id_habitacion, fecha_inicio, fecha_fin, totalPersons, nights) {
        let habitacion_escogida = this.listaHabitaciones.find(
            (habitacion) => habitacion.id === id_habitacion
        );
        if (habitacion_escogida) {
            habitacion_escogida.reservar(fecha_inicio, fecha_fin);
        }

        // Calculate total cost based on the number of persons and nights
        const totalCost = totalPersons * nights * habitacion_escogida.cost;
        alert("El costo total de la reserva es: $" + totalCost);

        return habitacion_escogida;
    }
}

const controladorHotel = new Hotel();

const habitacion1 = new Habitacion(1, 4, 100); // Habitacion 1 $100 por persona
const habitacion2 = new Habitacion(2, 2, 150); // Habitacion 2 $150 por persona
const habitacion3 = new Habitacion(3, 4, 120); // Habitacion 3 $120 por persona
const habitacion4 = new Habitacion(4, 2, 180); // Habitacion 4 $180 por persona

habitacion4.reservar();

controladorHotel.agregarHabitacion(habitacion1);
controladorHotel.agregarHabitacion(habitacion2);
controladorHotel.agregarHabitacion(habitacion3);
controladorHotel.agregarHabitacion(habitacion4);

const mostrarHabitacionesDisponibles = () => {
    let capacidad_requerida = parseInt(prompt("Ingrese la capacidad deseada (mínimo 1 persona):"));
    if (isNaN(capacidad_requerida) || capacidad_requerida < 1) {
        alert("Capacidad inválida. Mostrando todas las habitaciones disponibles.");
        capacidad_requerida = 1;
    }

    controladorHotel.mostrarHabitacionesDisponibles(capacidad_requerida);
};

const reservarHabitacion = () => {
    const id_habitacion = parseInt(prompt("Escoja el N° de habitacion a reservar:"));
    const fecha_inicio = new Date(prompt("Desde que fecha desea alojarse? (YYYY-MM-DD):"));
    const fecha_fin = new Date(prompt("Hasta que fecha desea alojarse? (YYYY-MM-DD):"));
    const totalPersons = parseInt(prompt("Ingrese el número total de personas en la reserva:"));

    // Calculo de estadia
    const nights = Math.ceil((fecha_fin - fecha_inicio) / (1000 * 60 * 60 * 24));

    const habitacion_escogida = controladorHotel.reservarHabitacion(
        id_habitacion,
        fecha_inicio,
        fecha_fin,
        totalPersons,
        nights
    );

    if (habitacion_escogida) {
        const totalCost = ((habitacion_escogida.cost * totalPersons) * nights);
        alert("Usted ha reservado la siguiente habitación:\n" + habitacion_escogida.toString() + "\n\nCosto Total de la Reserva: $" + totalCost);
    } else {
        alert("No se encontró una habitación con el N° ingresado.");
    }
};

const showOptions = () => {
    const options =
        "==== Simulador de Reservas ====\n" +
        "1. Mostrar habitaciones disponibles\n" +
        "2. Reservar una habitación\n" +
        "3. Salir\n" +
        "=======================\n\n\n 5. Esta es una opcion que esta aca para mi entretenimiento nomas... aunque funcione no es relevante";

    alert(options);
};

const hotelReservationSimulator = () => {
    let option;
    do {
        showOptions();
        option = parseInt(prompt("Seleccione una opción (1-3):"));
        switch (option) {
            case 1:
                mostrarHabitacionesDisponibles();
                break;
            case 2:
                reservarHabitacion();
                break;
            case 3:
                alert("Gracias por utilizar el simulador de reservas. ¡Hasta luego!");
                break;
            case 5:
                alert(" ༼ ͡ಠ ͜ʖ ͡ಠ ༽ Entonces viniste hasta acá... \n\n\n Yo dije que era para mi entretenimiento nomas... anda corregir el resto del código!!!ヽ༼ ▀̿̿Ĺ̯̿̿▀̿ ̿༽ﾉ")
            default:
                alert("Opción inválida. Por favor, seleccione una opción válida.");
        }
    } while (option !== 3);
};

hotelReservationSimulator();
