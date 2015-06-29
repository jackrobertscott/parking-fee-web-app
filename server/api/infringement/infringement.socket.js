/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Infringement = require('./infringement.model');

exports.register = function(socket) {
  Infringement.schema.post('save', function(doc) {
    onSave(socket, doc);
  });
  Infringement.schema.post('remove', function(doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('infringement:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('infringement:remove', doc);
}