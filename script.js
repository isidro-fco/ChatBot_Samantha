document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener referencias a los elementos clave del DOM
    const campoEntrada = document.getElementById('campo-entrada');
    const botonEnviar = document.getElementById('boton-enviar');
    const contenedorMensajes = document.getElementById('contenedor-mensajes');

    // 2. Función para añadir un nuevo mensaje al chat
    function agregarMensaje(texto, remitente) {
        // Limpiar el texto de espacios en blanco al inicio/final
        const textoMensaje = texto.trim();

        // No agregar mensajes vacíos
        if (textoMensaje === '') {
            return;
        }

        // Crear la burbuja del mensaje
        const burbujaMensaje = document.createElement('div');
        burbujaMensaje.classList.add('burbuja-mensaje');

        // Determinar la clase de estilo (usuario o bot)
        if (remitente === 'usuario') {
            burbujaMensaje.classList.add('mensaje-usuario');
            burbujaMensaje.textContent = textoMensaje;
        } else {
            burbujaMensaje.classList.add('mensaje-bot');
            burbujaMensaje.innerHTML = `
                <img src="sama_icon.png" alt="Icono de SAMANTHA" class="icono-bot">
                <span class="texto-bot">${textoMensaje}</span>
            `;
        }
        
        // Agregar el mensaje al contenedor
        contenedorMensajes.appendChild(burbujaMensaje);

        // Hacer scroll automático hasta el último mensaje
        contenedorMensajes.scrollTop = contenedorMensajes.scrollHeight;
    }

    // 3. Función de respuesta automática simple del bot
    function obtenerRespuestaBot(mensajeUsuario) {
        // Convertir a minúsculas para una comparación fácil
        const msg = mensajeUsuario.toLowerCase();

        if (msg.includes('hola') || msg.includes('saludos')) {
            return "¡Hola! ¿Cómo te encuentras hoy?";
        } else if (msg.includes('clima') || msg.includes('tiempo')) {
            return "Lo siento, no tengo acceso al clima en tiempo real, pero puedo contarte un chiste. 😉";
        } else if (msg.includes('gracias') || msg.includes('adiós')) {
            return "¡De nada! Que tengas un excelente día.";
        } else {
            return "Entiendo. ¿Podrías ser más específico con tu consulta, por favor?";
        }
    }

    // 4. Función principal de envío de mensaje
    function enviarMensaje() {
        const mensajeUsuario = campoEntrada.value;

        // Si el mensaje está vacío, simplemente salimos
        if (mensajeUsuario.trim() === '') return;

        // Añadir el mensaje del usuario al chat
        agregarMensaje(mensajeUsuario, 'usuario');

        // Limpiar el campo de entrada
        campoEntrada.value = '';

        // Generar y añadir la respuesta del bot con un pequeño retraso
        setTimeout(() => {
            const respuestaBot = obtenerRespuestaBot(mensajeUsuario);
            agregarMensaje(respuestaBot, 'bot');
        }, 500); // 500 milisegundos (0.5 segundos) de retraso
    }

    // 5. Asignar Event Listeners (manejadores de eventos)

    // Al hacer clic en el botón de enviar
    botonEnviar.addEventListener('click', enviarMensaje);

    // Al presionar 'Enter' en el campo de entrada
    campoEntrada.addEventListener('keypress', (evento) => {
        if (evento.key === 'Enter') {
            evento.preventDefault();
            enviarMensaje();
        }
    });
});