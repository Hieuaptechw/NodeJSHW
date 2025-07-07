const fs = require('fs');
const path = require('path');
let students = require('../models/student.model');


function logToFile(message) {
  const logPath = path.join(__dirname, '../logs/access.log');
  const timestamp = new Date().toISOString();
  fs.appendFileSync(logPath, `[${timestamp}] ${message}\n`);
}

exports.getAll = (req, res) => {
  logToFile('GET /students');
  res.json(students);
};

exports.getOne = (req, res) => {
  const id = req.params.id;
  logToFile(`GET /students/${id}`);
  const student = students.find(s => s.id === id);
  if (!student) return res.status(404).json({ message: 'Not found' });
  res.json(student);
};

exports.create = (req, res) => {
  const { id, name, age } = req.body;
  logToFile('POST /students');
  if (!id || !name || !age) return res.status(400).json({ message: 'Missing fields' });

  const exist = students.find(s => s.id === id);
  if (exist) return res.status(409).json({ message: 'Student exists' });

  const newStudent = { id, name, age };
  students.push(newStudent);
  res.status(201).json(newStudent);
};

exports.update = (req, res) => {
  const id = req.params.id;
  const { name, age } = req.body;
  logToFile(`PUT /students/${id}`);
  const student = students.find(s => s.id === id);
  if (!student) return res.status(404).json({ message: 'Not found' });

  student.name = name || student.name;
  student.age = age || student.age;

  res.json(student);
};

exports.delete = (req, res) => {
  const id = req.params.id;
  logToFile(`DELETE /students/${id}`);
  const index = students.findIndex(s => s.id === id);
  if (index === -1) return res.status(404).json({ message: 'Not found' });

  students.splice(index, 1);
  res.json({ message: 'Deleted' });
};
