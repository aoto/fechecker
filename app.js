/**
 * Created by yushengjie on 16/5/20.
 */

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const runSchedule = require('./lib/runSchedule');
const route = require('./route');

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

route(app);

app.listen(3000, () => {
  console.log('FE Checker listening on port 3000!');
});

runSchedule();
