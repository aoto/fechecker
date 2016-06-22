/**
 * Created by yushengjie on 16/5/20.
 */

const fs = require('fs');
const exec = require('sync-exec');
const sendMail = require('./sendMail');

if (!fs.existsSync('db.json')) {
  fs.writeFileSync('db.json', JSON.stringify([], null, 2));
}
// check project list
const projects = require('./../db.json');

function checker() {
  const SUCCESS_CODE = 0;
  /* eslint no-var: 0 */
  var mailContent = '';
  const postData = {
    mail_list: 'shengjie.yuysj@list.alibaba-inc.com',
    mail_subject: `前端JS检查错误统计_${Date.now()}`,
    mail_content: mailContent,
    mail_content_type: 'html',
    mail_priority: '3'
  };

  projects.forEach(project => {
    const projectName = project.projectName;
    const repositoryUrl = project.repositoryUrl;
    const dir = project.dir;
    const owner = project.owner;

    const trueProjectPath = `projects/${projectName}`;

    // clone project
    if (!fs.existsSync(`${trueProjectPath}`)) {
      const cloneResult = exec(`git clone ${repositoryUrl} ${trueProjectPath}`);
      if (cloneResult.status !== SUCCESS_CODE) {
        console.error(`clone ${projectName} project error!`);
      }
    }
    console.log(`clone ${projectName} project success.`);

    // update code
    const pullResult = exec(`cd ${trueProjectPath} && git pull`);
    if (pullResult.status !== SUCCESS_CODE) {
      console.error(`update ${projectName} code error!`);
    }
    console.log(`update ${projectName} code success.`);

    // install node modules
    const installResult = exec(`cd ${trueProjectPath} && npm install`);
    if (installResult.status !== SUCCESS_CODE) {
      console.error(`install ${projectName} node modules error!`);
    }
    console.log(`install ${projectName} node modules success.`);

    // update package.json
    const projectConfig = require('./../package.json'); // eslint-disable-line global-require
    const reportKey = `./report/${projectName}-LintErrors.html`;
    const lint = `eslint ${trueProjectPath}/${dir} --ext .jsx,.js,.vue -o ${reportKey} -f html`;
    const lintKey = `lint-${projectName}`;
    projectConfig.scripts[lintKey] = lint;
    fs.writeFileSync('./package.json', JSON.stringify(projectConfig, null, 2));
    console.log('write package.json success,add lint cmd success.');

    // run lint
    const lintResult = exec(`npm run ${lintKey}`);
    if (lintResult.status !== SUCCESS_CODE) {
      console.error(`lint ${projectName} error!`);

      mailContent += `<h1>Project:${projectName}, Owner:${owner}</h1>`
        + `${fs.readFileSync(`${reportKey}`)}<br/><br/><br/>`;
    } else {
      fs.unlinkSync(`${reportKey}`);
      console.log(`lint ${projectName} success.`);
    }
  });

  if (mailContent !== '') {
    mailContent = mailContent.replace(/display:none/g, '')
      .replace(/<style>([\s\S]*?)<\/style>/g, '');

    mailContent = `<style>${fs.readFileSync('./views/email.css')}</style>${mailContent}`;

    postData.mail_content = mailContent;
    fs.writeFile('./report/MailContent.html', mailContent);
    sendMail(postData);
  }
}

module.exports = checker;
