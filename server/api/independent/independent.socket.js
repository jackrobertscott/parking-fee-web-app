/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Independent = require('./independent.model');

exports.register = function(socket) {
  Independent.schema.post('save', function(doc) {
    onSave(socket, doc);
  });
  Independent.schema.post('remove', function(doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('independent:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('independent:remove', doc);
}
