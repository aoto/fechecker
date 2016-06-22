/**
 * Created by yushengjie on 16/5/20.
 */

const request = require('request');

// email job url
const emailJobUrl = '';

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

