const db = require('../data/db.js');

module.exports = {
  get,
  getStudents,
  insert,
  remove,
  update
};

function get(id) {
  if (id) {
    return db('cohorts').select().where({id}).first();
  } else {
    return db('cohorts').select();
  }
}

function getStudents(id) {
  return db('students')
    .where({'cohort_id': id});
}

function insert(cohort) {
  return db('cohorts')
    .insert(cohort, 'id')
    .then(([id]) => get(id));
}

function remove(id) {
  return db('cohorts').where({id}).del();
}

function update(changes, id) {
  return db('cohorts')
    .where({id})
    .update(changes, 'id')
    .then(updates => updates > 0 ? get(id) : null);
}
