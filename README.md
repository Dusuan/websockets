¿Por qué Socket.IO es mejor que HTTP normal para un chat?
  - Porque abre y deja abierto un canal donde el servidor manda los mensajes al cliente instantaneamente sin realizar multiples peticiones que pueden sovbrecargar el chat.
    
¿Qué mantiene “viva” la conexión y cómo detectas que un cliente se desconectó?
  - Un intercambio de ping/pong (heartbeat). Si despues de un tiempo establecido de espera no se recibe un pong despues de un ping, se da como desconectado.
    
¿Qué problema aparece si dos usuarios envían mensajes al mismo tiempo y cómo lo manejas?
  - El servidor itera sobre todas las conexiones que estan activas y al enviar un mensaje de forma individual, ya que el protocolo hace conexiones punto a punto. 

¿Qué riesgos de seguridad tendría tu chat y qué harías para mitigarlos?
  - Inyecciones de script (XSS)
    Sanitizar para utilizar texto.
  - Duplicacion/suplantacion de usaurios
    Utilizar JWT para crear cuentas.

Si tu servidor se cae y vuelve, ¿qué debería hacer el cliente para recuperar la conexión?
  - Socket.IO tiene reconexion automatica por defecto.
