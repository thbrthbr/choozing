const express = require('express');
const app = express();
const PORT = 8000;
const db = require('./models');
app.use(express.json());
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const server = http.createServer(app);

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const router = require('./routes/main');
app.use('/', router);

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
// db.sequelize.sync({ force: false }).then(() => {
//   server.listen(PORT, () => {
//     console.log(`http://localhost:${PORT}`);
//   });
// });
