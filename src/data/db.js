const sqlite3 = require('sqlite3').verbose();
const path    = require('path');
const dbPath  = path.join(__dirname, 'pomodoro.db');

// Bağlantıyı aç
const db = new sqlite3.Database(dbPath, err => {
  if (err) console.error('DB açma hatası:', err.message);
  else console.log('SQLite ile bağlantı kuruldu:', dbPath);
});


db.serialize(() => {
  db.run(
  
    err => {
      if (err) console.error('Tablo oluşturma hatası:', err.message);
      else console.log('sessions tablosu hazır');
    }
  );
});

function createSession(mode, startedAt, duration, cb) {
  db.run(
    [mode, startedAt, duration],
    function(err) {
      cb(err, this.lastID);
    }
  );
}

function getSessions(cb) {
  db.all(`SELECT * FROM sessions`, [], (err, rows) => {
    cb(err, rows);
  });
}

module.exports = { createSession, getSessions };
