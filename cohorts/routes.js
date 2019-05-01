const express = require('express');
const db = require('./db.js');

const router = express.Router();

router.get('/', (req, res) => {
  db.get()
    .then(cohorts => res.status(200).json(cohorts))
    .catch(() => res.status(500).json({message: "Error fetching cohorts."}));
});

router.post('/', (req, res) => {
  const cohort = req.body;
  if (cohort && cohort.name !== "") {
    db.insert(cohort)
      .then(cohort => res.status(201).json(cohort))
      .catch(error => res.status(500).json({message: "Error creating cohort.", error}));
  } else {
    res.status(400).json({message: "Cohort must have name."});
  }
});

router.get('/:id', (req, res) => {
  const {id} = req.params;
  db.get(id)
    .then(cohort => cohort
          ? res.status(200).json(cohort)
          : res.status(404).json({message: "Cohort with id does not exist."}))
    .catch(() => res.status(500).json({message: "Error fetching cohort."}));
});

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  db.remove(id)
    .then(deleted => deleted
          ? res.status(200).end()
          : res.status(404).json({message: "Cohort with id does not exist."}))
    .catch(error => res.status(500).json({message: "Error deleting cohort.", error}));
});

router.put('/:id', (req, res) => {
  const {id} = req.params;
  const changes = req.body;
  if (changes && changes.name && changes.name !== '') {
    db.update(changes, id)
      .then(cohort => cohort
            ? res.status(200).json(cohort)
            : res.status(404).json({message: "Cohort with id does not exist."}))
      .catch(error => console.log(error) || res.status(500).json({message: "Error updating cohort."}));
  } else {
    res.status(400).json({message: "Update requires changes."});
  }
});

router.get('/:id/students', (req, res) => {
  const {id} = req.params;
  db.getStudents(id)
    .then(students => res.status(200).json(students))
    .catch(() => res.status(500).json({message: "Error fetching students."}))
  ;
});


module.exports = router;
