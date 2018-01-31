var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([
  {
    id: 10,
    botName: 'BOT ' + 10,
    race:'Protoss',
    BWAPIver: '4.1',
    winCount: 15,
    loseCount: 15,
    drawCount: 15,
    battleTime: new Date(),
  }, 
  {
    id: 11,
    botName: 'BOT ' + 11,
    race:'Terran',
    BWAPIver: '4.2',
    winCount: 17,
    loseCount: 17,
    drawCount: 17,
    battleTime: new Date(),
  }
  ]);
});

module.exports = router;
