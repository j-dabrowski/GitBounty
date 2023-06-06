//Este fichero lo creamos solo para importar el abi.json y contractAddresses.json aqui, y luego exportarlo de una .

const abi = require("./abi.json");
const abiConsumer = require("./abiConsumer.json");

module.exports = { abi, abiConsumer };
