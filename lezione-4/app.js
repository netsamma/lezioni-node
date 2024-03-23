//**********************************************************************
// Esercitazione - Moduli Built in - os, fs, path
//**********************************************************************

const os = require('os')

// console.log(os.userInfo())
// console.log("Computer acceso da "+os.uptime()/3600+ " ore" )


const info = {
	so: os.type(),
	version: os.version(),
	release: os.release(),
	memoria: os.totalmem(),
	disponibile: os.freemem(),
	home: os.homedir(),
}
console.log(info)

// const path = require('path');
// // Creare un percorso completo a un file
// const nomeFile = 'app.js';
// const percorsoCompleto = path.join(__dirname, nomeFile);
// console.log("Percorso completo al file:", percorsoCompleto);




