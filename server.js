  console.log('I...Am...alive...')
  //Global variables
  var players = []

  //Constructor of the player
  function Player(id, x, y) {
      this.id = id;
      this.x = x;
      this.y = y;
  }

  //dependencies
  const path = require('path')
  const express = require('express');
  const SocketIO = require('socket.io');
  app = express();


  //settings
  app.set('port', process.env.PORT || 3000);
  //static files
  app.use(express.static(path.join(__dirname, 'public')));

  //start server
  const server = app.listen(app.get('port'), () => {
      console.log("Server on port: ", app.get('port'));
  });


  //Web Sockets
  const io = SocketIO.listen(server)
  //Cuando se conecta un cliente
  io.on('connection', (socket) => {
      let id = socket.id.toString();
      console.log('New connection, welcome:', id);

      //Escuchamos en el disconnect el evento status y mostramos la info
      socket.on('disconnect', () => {
          players = players.filter(el => el.id !== socket.id); // ? Revisar esta sentencia
          console.log(`The user ${id} has disconnected`);
      });

      //Escuchamos en el socket el evento status y mostramos la info
      socket.on('login', (data) => {
          let player = new Player(id, data.x, data.y); //Cambiar para parametros
          //console.log(`El usuario: ${player.id} está saludando desde (${player.x}, ${player.y}) `)
          console.log(player);
          if (players.length < 2) {
              players.push(player);

              if (players.length == 2) {
                  socket.broadcast.emit('2player', players);
                  socket.emit('2player', players)
              }
          } else {
              // Si esa Id no estaba registrada, manda el error -Diferencia el recargar pag-  
              let found = false;
              players.forEach(element => {
                  if (player.id === element.id) {
                      found = true;
                  }
              });
              // ? This is importart if we use hard coded ID's/NickNames
              if (!found) {
                  msm = 'There is 2 players already, try later'
                  socket.emit('fullSala', msm)
              }

          }
          console.log(`players length: ${players.length}`)
      })

      socket.on('newPos', (info) => {
          if (players.length > 1) {
              if (info.id == players[0].id) {
                  players[0].x = info.x;
                  players[0].y = info.y;
              } else {
                  players[1].x = info.x;
                  players[1].y = info.y;
              }
              socket.broadcast.emit('otherPlayer', players)
          }

      })


  });