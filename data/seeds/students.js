exports.seed = function(knex, Promise) {
  return knex('students').del()
    .then(function () {
      return knex('students').insert([
        {name: 'Henry', cohort_id: 3},
        {name: 'Doris', cohort_id: 3},
        {name: 'TJ', cohort_id: 3},
        {name: 'Riley', cohort_id: 2},
        {name: 'Elly', cohort_id: 2},
        {name: 'Caileen', cohort_id: 1},
      ]);
    });
};
