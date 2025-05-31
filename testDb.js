
const { createSession, getSessions } = require('./src/data/db');

// Önce tüm kayıtları okur
getSessions((err, rows) => {
  if (err) return console.error('Listeleme hatası:', err);
  console.log('Mevcut kayıtlar:', rows);

// Test için yeni bir kayıt ekler
  createSession('work', new Date().toISOString(), 1500, (err, id) => {
    if (err) return console.error('Ekleme hatası:', err);
    console.log('Yeni oturum eklendi, ID:', id);

// Yeniden listeler
    getSessions((err, rows2) => {
      if (err) return console.error('Listeleme hatası:', err);
      console.log('Güncel kayıtlar:', rows2);
    });
  });
});
