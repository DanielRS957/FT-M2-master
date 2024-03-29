
  // var whiteboard = require(whiteboard);  //sintaxis common js
  import {whiteboard} from "./whiteboard" ;//sintaxis ESC6
// let  io = require("socket.io-client") // sintaxis de common js
  import io from "socket.io-client" // sintaxis ESC6
  

  var socket = io(window.location.origin);

  socket.on("connect", function () {
    console.log("Connected!");
  });

  socket.on("load", function (strokes) {
    strokes.forEach(function (stroke) {
      var start = stroke.start;
      var end = stroke.end;
      var color = stroke.color;
      whiteboard.draw(start, end, color, false);
    });
  });

  socket.on("draw", function (start, end, color) {
    whiteboard.draw(start, end, color, false);
  });

  whiteboard.on("draw", function (start, end, color) {
    socket.emit("draw", start, end, color);
  });

