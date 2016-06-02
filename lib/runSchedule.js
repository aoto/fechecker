const checker = require('./checker');
const schedule = require('node-schedule');

function runSchedule() {
  // run job at 00:00:00 everyday
  const rule = new schedule.RecurrenceRule();
  rule.hour = 0;
  rule.minute = 0;
  rule.second = 0;

  schedule.scheduleJob(rule, () => {
    console.log('schedule job run.');
    checker();
  });
}

module.exports = runSchedule;
