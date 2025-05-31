const fs   = require('fs');
const path = require('path');
const file = path.join(__dirname, 'store.json');

function load() {
  if (!fs.existsSync(file)) return [];
  const content = fs.readFileSync(file, 'utf8');
  return JSON.parse(content);
}

function save(obj) {
  const arr = load();
  arr.push(obj);
  fs.writeFileSync(file, JSON.stringify(arr, null, 2), 'utf8');
}

module.exports = { load, save };
