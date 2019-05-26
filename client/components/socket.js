import openSocket from 'socket.io-client';
const socket = openSocket('http://iulia.rms-it.ro:8080');
function addPoint(cb) {
    socket.on('addPoint', point => cb(null, point));
  }
function sendPoint(data) {
    socket.emit('addPoint',data);
}
  export { addPoint,sendPoint };

