var socket = io.connect('http://localhost:4000');
var persona = document.getElementById('persona'),
    appChat = document.getElementById('app-chat'),
    panelBienvenida = document.getElementById('panel-bienvenida'),
    usuario = document.getElementById('usuario'),
    mensaje = document.getElementById('mensaje'),
    botonEnviar = document.getElementById('enviar'),
    escribiendoMensaje = document.getElementById('escribiendo-mensaje'),
    output = document.getElementById('output');

botonEnviar.addEventListener('click', function(){
    if(mensaje.value){
        socket.emit('chat', {
            mensaje: mensaje.value,
            usuario: usuario.value
        });
        mensaje.value = '';
    }
});

mensaje.addEventListener('keyup', function(){
    if(usuario.value && mensaje.value) {
        socket.emit('typing', {
            nombre: usuario.value,
            texto: mensaje.value
        });
    } else {
        socket.emit('typing', {
            nombre: usuario.value,
            texto: ''
        });
    }
});

socket.on('chat', function(data){
    escribiendoMensaje.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.usuario + ': </strong>' + data.mensaje + '</p>';
});

socket.on('typing', function(data){
    if(data.texto){
        escribiendoMensaje.innerHTML = '<p><em>' + data.nombre + ' está escribiendo un mensaje...</em></p>';
    } else {
        escribiendoMensaje.innerHTML = '';
    }
});

function ingresarALChat(){
    if(persona.value){
        panelBienvenida.style.display = "none";
        appChat.style.display = "block";
        var nombreDelUsuario = persona.value;
        usuario.value = nombreDelUsuario;
        usuario.readOnly = true;
    }
}