/**
 * Created by yushengjie on 16/5/26.
 */

const fs = require('fs');
const sendMail = require('./sendMail');

const postData = {
  mail_list: 'shengjie.yuysj@alibaba-inc.com',
  mail_subject: `前端JS检查错误统计_${Date.now()}`,
  mail_content: fs.readFileSync('./report/Test.html'),
  mail_content_type: 'html',
  mail_priority: '3'
};

sendMail(postData);
