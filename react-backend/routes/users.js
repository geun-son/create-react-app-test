var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([
  {
    id: 10,
    botName: 'BOT ' + 10,
    vsbotName:'vs BOT ' + 10,
    race: 'Terran',
    mapCd: '01',
    rsltCd: '01',    
    BWAPIver: '4.1',
    battleTime: new Date(),
  }, 
  {
    id: 11,
    botName: 'BOT ' + 11,
    vsbotName:'vs BOT ' + 11,
    race: 'Zerg',
    mapCd: '03',
    rsltCd: '03',    
    BWAPIver: '4.1',
    battleTime: new Date(),
  },
  {
    id: 12,
    botName: 'BOT ' + 12,
    vsbotName:'vs BOT ' + 12,
    race: 'Protoss',
    mapCd: '05',
    rsltCd: '02',    
    BWAPIver: '4.1',
    battleTime: new Date(),
  },
  {
    id: 13,
    botName: 'BOT ' + 13,
    vsbotName:'vs BOT ' + 13,
    race: 'Terran',
    mapCd: '07',
    rsltCd: '06',    
    BWAPIver: '4.1',
    battleTime: new Date(),
  }
  ]);
});

module.exports = router;
