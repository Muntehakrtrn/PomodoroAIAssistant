const DataStore = require('nedb');
const path      = require('path');
const db = new DataStore({
  filename: path.join(__dirname, 'sessions.db'),
  autoload: true
});
function addSession(session, cb) {
  db.insert(session, cb);
}
function getSessionCount(cb) {
function clearSessions(cb) {
  db.remove({}, { multi: true }, cb);
}

  db.count({}, cb);
}
module.exports = { addSession, getSessionCount, clearSessions };

