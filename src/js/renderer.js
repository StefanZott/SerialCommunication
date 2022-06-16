const { listPorts, communicateWithSerialPort } = require("../js/serialPort.js");

listPorts();

document.getElementById("sendMassage").addEventListener("click", () => {
    communicateWithSerialPort("COM4");
})