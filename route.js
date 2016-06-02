/**
 * Created by yushengjie on 16/6/1.
 */

const fs = require('fs');
const checker = require('./lib/checker');

function route(app) {
  app.get('/', (req, res) => {
    const projects = require('./db.json'); // eslint-disable-line global-require
    res.render('index', { projects });
  });

  // add project
  app.post('/add', (req, res) => {
    const projectName = req.body.projectName;
    const repositoryUrl = req.body.repositoryUrl;
    const dir = req.body.dir;
    const owner = req.body.owner;

    if (projectName.trim() === ''
      || repositoryUrl.trim() === ''
      || owner.trim() === '') {
      res.redirect('/');

      return;
    }

    const project = {
      projectName,
      repositoryUrl,
      dir,
      owner
    };

    const projects = require('./db.json'); // eslint-disable-line global-require
    projects.push(project);
    fs.writeFileSync('./db.json', JSON.stringify(projects, null, 2));

    console.log('add project success.', project);
    res.redirect('/');
  });

  app.get('/check', (req, res) => {
    console.log('manual execute check.');
    checker();

    res.redirect('/');
  });
}

module.exports = route;
