// src/presentation/app.js

// PomodoroTimer ve path modülünü import et
const PomodoroTimer             = require('../business/timer');
const path                      = require('path');
// Etütleri kaydetmek için
const { addSession, getSessionCount, clearSessions } = require('../data/nedbStore');

document.addEventListener('DOMContentLoaded', () => {
  // UI elemanları
  const timerDisplay     = document.getElementById('timerDisplay');
  const modeDisplay      = document.getElementById('modeDisplay');
  const startBtn         = document.getElementById('startBtn');
  const stopBtn          = document.getElementById('stopBtn');
  const resetBtn         = document.getElementById('resetBtn');
  const sessionCountEl   = document.getElementById('sessionCount');
  const clearSessionsBtn = document.getElementById('clearSessionsBtn');

  console.log('DOMContentLoaded olayı tetiklendi');


  const timer = new PomodoroTimer(5, 3);

  // Alarm sesi
  const alarmSound = new Audio(
    path.join(__dirname, '../assets/alarm.mp3')
  );

  // Uygulama açıldığında önceki toplam etüt sayısını getir
  getSessionCount((err, count) => {
    if (!err) sessionCountEl.textContent = `Toplam etüt sayısı: ${count}`;
  });

  // Her saniye süreyi güncelle
  timer.on('tick', (_mode, secondsLeft) => {
    console.log(`⌛ tick: mode=${_mode}, secondsLeft=${secondsLeft}`); 
    const mins = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
    const secs = String(secondsLeft % 60).padStart(2, '0');
    timerDisplay.textContent = `${mins}:${secs}`;
  });

  // Mod adını güncelle, alarmı çal ve mola başladığında etüt kaydet
// Mevcut modeChange kısmını şu şekilde güncelle:

timer.on('modeChange', (mode) => {
  console.log(`🔄 modeChange: artık mode=${mode}`); 
  modeDisplay.textContent = mode === 'work' ? 'Çalışma' : 'Mola';

  // Alarm sesi çal
  alarmSound.currentTime = 0;
  alarmSound.play().catch(() => {
    console.warn('Ses oynatma izni reddedildi.');
  });

  // Mola modu başladıysa
  if (mode === 'break') {
    console.log('>>> modeChange içinde break moduna girdik, addSession çağırıyoruz.');
    addSession({
      mode: 'work',
      duration: timer.workSec,
      timestamp: new Date()
    }, (err, newDoc) => {
      if (err) {
        console.error('addSession sırasında hata:', err);
        return;
      }
      console.log('>>> addSession callback tetiklendi, yeniDoküman:', newDoc);

      getSessionCount((errCount, count) => {
        if (errCount) {
          console.error('getSessionCount sırasında hata:', errCount);
          return;
        }
        console.log('>>> getSessionCount callback tetiklendi, count:', count);
        sessionCountEl.textContent = `Toplam etüt sayısı: ${count}`;
      });
    });
  }
});


  // Başlat butonu
  startBtn.addEventListener('click', () => {
    console.log('▶ Başlat butonuna tıklandı'); // Log: butona tıklandı
    timer.start();
  });

  // Durdur butonu
  stopBtn.addEventListener('click', () => {
    console.log('⏸ Durdur butonuna tıklandı'); // Log: durduruldu
    timer.stop();
  });

  // Reset butonu
  resetBtn.addEventListener('click', () => {
    console.log(' Sıfırla butonuna tıklandı'); // Log: sıfırlama
    // Zamanlayıcıyı durdur
    timer.stop();

    // Süreyi başa al
    timer.timeLeft = timer.mode === 'work'
      ? timer.workSec
      : timer.breakSec;

    // Ekrandaki sayacı güncelle
    const mins = String(Math.floor(timer.timeLeft / 60)).padStart(2, '0');
    const secs = String(timer.timeLeft % 60).padStart(2, '0');
    timerDisplay.textContent = `${mins}:${secs}`;
  });

  // Etütleri temizle butonu
  clearSessionsBtn.addEventListener('click', () => {
    console.log(' Etüt Sıfırla butonuna tıklandı'); // Log: temizleme başladı
    clearSessions((err, numRemoved) => {
      if (err) return console.error('Etütler silinemedi:', err);
      sessionCountEl.textContent = 'Toplam etüt sayısı: 0';
      console.log(`${numRemoved} kayıt silindi.`);
    });
  });
});
