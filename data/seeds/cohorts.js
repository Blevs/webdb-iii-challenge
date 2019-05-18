exports.seed = function(knex, Promise) {
  return knex('cohorts').del()
    .then(function () {
      return knex('cohorts').insert([
        {id: 1, name: 'First Cohort'},
        {id: 2, name: 'Best Cohort'},
        {id: 3, name: 'Web 18'}
      ]);
    });
};
