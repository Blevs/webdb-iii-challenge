const db = require('../data/db.js');

module.exports = {
  get,
  insert,
  remove,
  update
};

function get(id) {
  const query = db('students as s')
        .join('cohorts as c', 's.cohort_id', 'c.id')
        .select('s.id', 's.name', 'c.name as cohort');
  if (id) {
    return query
      .where({'s.id': id})
      .first();
  } else {
    return query;
  }
}

function insert(student) {
  return db('students')
    .insert(student, 'id')
    .then(([id]) => get(id));
}

function remove(id) {
  return db('students').where({id}).del();
}

function update(changes, id) {
  return db('students')
    .where({id})
    .update(changes, 'id')
    .then(updates => updates > 0 ? get(id) : null);
}
