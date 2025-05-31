// src/business/timer.js
const EventEmitter = require('events');

// Pomodoro zamanlayıcısı 
class PomodoroTimer extends EventEmitter {
  constructor(workSec = 1500, breakSec = 300) {
    super();
    this.workSec = workSec;
    this.breakSec = breakSec;
    this.mode = 'work';
    this.timeLeft = workSec;
    this._interval = null;
  }

  // Zamanlayıcıyı başlat
  start() {
    if (this._interval) return;
    this._interval = setInterval(() => {
      this.timeLeft -= 1;
      this.emit('tick', this.mode, this.timeLeft);
      if (this.timeLeft <= 0) this._switchMode();
    }, 1000);
  }

  // Zamanlayıcıyı durdur
  stop() {
    clearInterval(this._interval);
    this._interval = null;
    this.emit('stopped', this.mode);
  }

  // Mod değiştir ve yeniden başlat
  _switchMode() {
    clearInterval(this._interval);
    this._interval = null;
    this.mode = this.mode === 'work' ? 'break' : 'work';
    this.timeLeft = this.mode === 'work' ? this.workSec : this.breakSec;
    this.emit('modeChange', this.mode);
    this.start();
  }
}

module.exports = PomodoroTimer;
