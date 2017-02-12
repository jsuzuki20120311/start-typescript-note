'use strict';

import * as log4js from 'log4js';

log4js.configure({
  appenders: [
    {
      "type": "file",
      "category": "loggerTest",
      "filename": "./logs/loggerTest.log",
      "pattern": "-yyyy-MM-dd"
    }
  ]
});

export default log4js.getLogger('loggerTest');
