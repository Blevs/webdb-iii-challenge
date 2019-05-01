const express = require('express');
const db = require('./db.js');

const router = express.Router();

router.get('/', (req, res) => {
  db.get()
    .then(cohorts => res.status(200).json(cohorts))
    .catch(() => res.status(500).json({message: "Error fetching cohorts."}));
});

router.get('/:id', (req, res) => {
  const {id} = req.params;
  db.get(id)
    .then(cohort => cohort
          ? res.status(200).json(cohort)
          : res.status(404).json({message: "Cohort with id does not exist."}))
    .catch(() => res.status(500).json({message: "Error fetching cohort."}));
});

router.get('/:id/students', (req, res) => {
  const {id} = req.params;
  db.getStudents(id)
    .then(students => res.status(200).json(students))
    .catch(() => res.status(500).json({message: "Error fetching students."}))
  ;
});


module.exports = router;
