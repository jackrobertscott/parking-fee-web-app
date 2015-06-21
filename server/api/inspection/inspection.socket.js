/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Inspection = require('./inspection.model');

exports.register = function(socket) {
  Inspection.schema.post('save', function(doc) {
    onSave(socket, doc);
  });
  Inspection.schema.post('remove', function(doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('inspection:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('inspection:remove', doc);
}