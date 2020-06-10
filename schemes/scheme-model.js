const db = require('../data/dbConfig');

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
  addStep
}

function find() {
  return db('schemes');
}

function findById(id) {
  return db('schemes')
    .where({ id })
    .first();
}

function findSteps(id) {
  return db('steps')
    .where({ scheme_id: id })
    .join('schemes', 'schemes.id', '=', 'steps.scheme_id')
    .select('schemes.scheme_name', 'steps.step_number', 'steps.instructions')
    .orderBy('steps.step_number')
}

function add(scheme) {
  return db('schemes')
    .insert(scheme)
    .then(ids => {
      return findById(ids[0])
    })
}

function update(changes, id) {
  return db('schemes')
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id)
    })
}

async function remove(id) {
  const removed = await findById(id);
  return db('schemes')
  .where({ id })
  .del()
  .then(() => {
    return removed;
  })
}

function addStep(step, scheme_id) {
  return db('steps')
    .insert({ ...step, scheme_id })
    .then(ids => {
      return db('steps')
        .where({ id: ids[0] })
    })
}