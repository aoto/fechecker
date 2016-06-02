/**
 * Created by yushengjie on 16/5/20.
 */

const request = require('request');

const emailJobUrl = 'http://jenkins.shenma-inc.local:8080/view/basic_service/job' +
  '/mail_service/buildWithParameters?token=RUPAKtgjkMPanrFY&';

function sendMail(data) {
  request.post(emailJobUrl, { form: data }, (err) => {
    if (err) {
      console.error('send mail error!');
    } else {
      console.log('send mail success!');
    }
  });
}

module.exports = sendMail;

