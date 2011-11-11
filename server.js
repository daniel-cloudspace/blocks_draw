var express = require('express')
var socketio = require("socket.io")

var app = express.createServer(express.logger(), express.bodyParser())
app.use(app.router)
app.use(express.static(__dirname + '/public'))
app.listen(8000)

var init_data = ''

var io = socketio.listen(app)
io.sockets.on('connection', function(socket) {
  console.log(init_data)
  socket.emit('init_data', { 
    my_id: socket.id, 
    init_data: init_data
  })

  socket.on('keystroke', function(keystroke) {
    // do stuff in response to keystrokes
  })

  socket.on('add_voxel', function(data) {
    init_data = data.init_data
    socket.broadcast.emit('add_voxel', data)
    console.log(init_data, data)
  })

  socket.on('disconnect', function(){
    // handle disconnections, remove users, etc
  })
})
