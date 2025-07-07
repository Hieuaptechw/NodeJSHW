const express = require('express');
const studentRoutes = require('./routes/student.routes');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;


const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

app.use(express.json());
app.use('/students', studentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
