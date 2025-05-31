// src/data/nedbStore.js

const Datastore = require('nedb');
const path      = require('path');

const db = new Datastore({
  filename: path.join(__dirname, 'sessions.db'),
  autoload: true
});

// 1) Yeni bir oturum (etüt) ekler.
//    Kaydetme tamamlandığında callback’e (err, newDoc) döner.
function addSession(session, cb) {
  db.insert(session, (err, newDoc) => {
    if (err) {
      return cb(err);
    }
    // Konsola log atarak gerçekten callback’e girildiğini görebiliriz
    console.log('nedbStore.addSession: kayıt eklendi, newDoc =', newDoc);
    cb(null, newDoc);
  });
}

// 2) Veritabanındaki toplam oturum sayısını sayar.
//    Sonuç olarak callback’e (err, count) döner.
function getSessionCount(cb) {
  db.count({}, (err, count) => {
    if (err) {
      return cb(err);
    }
    console.log('nedbStore.getSessionCount: toplam count =', count);
    cb(null, count);
  });
}

// 3) Tüm oturumları siler. callback’e (err, numRemoved) döner.
function clearSessions(cb) {
  db.remove({}, { multi: true }, (err, numRemoved) => {
    if (err) {
      return cb(err);
    }
    console.log('nedbStore.clearSessions: silinen kayıt sayısı =', numRemoved);
    cb(null, numRemoved);
  });
}

module.exports = {
  addSession,
  getSessionCount,
  clearSessions
};
