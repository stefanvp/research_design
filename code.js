const Si7021 = require('si7021-sensor');
const fs = require('fs');

const si7021 = new Si7021({ i2cBusNo : 1 });

const readSensorData = () => {
  si7021.readSensorData()
    .then((data) => {
        data.now = Date.now();
        fs.appendFile('data.csv', `${data.now},${data.humidity},${data.temperature_C}\n`, err => { if (err) throw err });
      setTimeout(readSensorData, 30000);
    })
    .catch((err) => {
      console.log(`Si7021 read error: ${err}`);
      setTimeout(readSensorData, 2000);
    });
};

si7021.reset()
  .then((result) => readSensorData())
  .catch((err) => console.error(`Si7021 reset failed: ${err} `));