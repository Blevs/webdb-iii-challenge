const express = require('express');
const db = require('./db.js');

const router = express.Router();

router.get('/', (req, res) => {
  db.get()
    .then(students => res.status(200).json(students))
    .catch(() => res.status(500).json({message: "Error fetching students."}));
});


router.post('/', (req, res) => {
  const student = req.body;
  if (student && (student.name && student.name !== "") && student.cohort_id) {
    db.insert(student)
      .then(student => res.status(201).json(student))
      .catch(error => res.status(500).json({message: "Error creating student.", error}));
  } else {
    res.status(400).json({message: "Student must have name and cohort_id."});
  }
});

router.get('/:id', (req, res) => {
  const {id} = req.params;
  db.get(id)
    .then(student => student
          ? res.status(200).json(student)
          : res.status(400).json({message: "Student with id does not exist."}))
    .catch(() => res.status(500).json({message: "Error fetching students."}));
});

module.exports = router;
