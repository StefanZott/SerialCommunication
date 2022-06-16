const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline')

let PLUS = '+';
let serialPortIsOpen = false;
let serialPort;

async function listSerialPorts() {
  await SerialPort.list().then((ports, err) => {
    if(err) {
      document.getElementById('error').textContent = err.message
      return
    } else {
      document.getElementById('error').textContent = ''
    }

    if (ports.length === 0) {
      document.getElementById('error').textContent = 'No ports discovered'
      }

      let customTable = "";
      customTable += "<table>"
      for (let index = 0; index < ports.length; index++) {
          customTable += "<tr>"
          
          for (const key in ports[index]) {
              
              customTable += "<th>"
              customTable += key
              customTable += "</th>"
              
          }
          customTable += "</tr>"
      }

      for (let index = 0; index < ports.length; index++) {
          customTable += "<tr>"
          for (const key in ports[index]) {
              
              customTable += "<td>"
              customTable += ports[index][key]
              customTable += "</td>"
              
          }
          customTable += "</tr>"
      }

      customTable += "</table>"

      document.getElementById('ports').innerHTML = customTable;
  })
}

function listPorts() {
  listSerialPorts();
  setTimeout(listPorts, 2000);
}

function communicateWithSerialPort(port) {
    serialPort = new SerialPort({ path: port, baudRate: 9600 })
    
    serialPort.on('open', () => {
        console.log('serialPort opened')

    })

    

    serialPort.write('+');

    serialPort.on("data", (line) => {
        console.log(line);
        const output = Buffer.from(line, 'hex');
        console.log(output);
    });
}

module.exports = {
    listPorts,
    communicateWithSerialPort
}
