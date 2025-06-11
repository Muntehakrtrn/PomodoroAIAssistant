// src/data/nedbStore.js

const Datastore = require('nedb');
const path      = require('path');

// Veritabanını yükle (sessions.db adında aynı klasörde)
const db = new Datastore({
  filename: path.join(__dirname, 'sessions.db'),
  autoload: true
});

// 1) Yeni bir plan ekler
function createPlan(plan, cb) {
  console.log('nedbStore.createPlan, incoming:', plan);
  db.insert(plan, (err, newDoc) => {
    console.log('nedbStore.insert callback:', err, newDoc);
    cb(err, newDoc);
  });
}

// 2) Tüm planları getirir
function getAllPlans(cb) {
  console.log('nedbStore.getAllPlans');
  db.find({}, (err, docs) => {
    console.log('nedbStore.find callback:', err, docs);
    cb(err, docs);
  });
}

// 3) Var olan bir planı günceller
function updatePlan(id, updatedData, cb) {
  console.log('nedbStore.updatePlan:', id, updatedData);
  db.update({ _id: id }, { $set: updatedData }, {}, (err, numReplaced) => {
    console.log('nedbStore.update callback:', err, numReplaced);
    cb(err, numReplaced);
  });
}

// 4) Belirli bir planı siler
function deletePlan(id, cb) {
  console.log('nedbStore.deletePlan:', id);
  db.remove({ _id: id }, {}, (err, numRemoved) => {
    console.log('nedbStore.remove callback:', err, numRemoved);
    cb(err, numRemoved);
  });
}

module.exports = {
  createPlan,
  getAllPlans,
  updatePlan,
  deletePlan
};
