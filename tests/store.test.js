const assert = require('assert');
const fs     = require('fs');
const path   = require('path');
const { load, save } = require('../src/store');

const file = path.join(__dirname, '..', 'src', 'store.json');


function reset() {
  if (fs.existsSync(file)) fs.unlinkSync(file);
}

// Test 1
reset();
let arr = load();
assert.ok(Array.isArray(arr), 'load() bir dizi döndürmeli');
assert.strictEqual(arr.length, 0, 'başlangıçta dizi boş olmalı');

// Test 2
reset();
save({ foo: 'bar' });
arr = load();
assert.strictEqual(arr.length, 1, 'Tek eleman eklenmeli');
assert.strictEqual(arr[0].foo, 'bar', 'Kaydedilen obje doğru olmalı');

// Test 3
reset();
save({ a: 1 });
save({ b: 2 });
arr = load();
assert.deepStrictEqual(arr.map(x => Object.keys(x)[0]), ['a','b'], 'sıralı ekleme çalışmalı');

console.log('oh be sonunda store.json modülü tüm testlerden geçti');
