
const express = require("express");
const path = require("path");
const fs = require('fs');
const Web3 = require('web3');

const app = express();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
});

// Виправлено: Додано колбек для обробки події запуску сервера
const server = app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

// Виправлено: Переміщено вивід порту сервера до колбеку запуску сервера
server.on('listening', () => {
  const portNumber = server.address().port;
  console.log("Server is running on port: " + portNumber);
});

// Зчитування конфігурації з файлу
// Виправлено: Змінено назву змінної rawdata на rawData
//const rawData = fs.readFileSync('truffle-config.js');
  const config = require('./truffle-config.js');

// Підключення до локального блокчейну Ganache (останні зміни)
const ganache = require('ganache-cli'); // Додано підключення 

// Взаємодія з локальним блокчейном за вказаними параметрами
 // const blockchainHost = config.networks.development.host;
 // const blockchainPort = config.networks.development.port;
const blockchainHost = 'localhost'; // Змінено на 'localhost', якщо Ganache працює на локальному хості
const blockchainPort = 8545; // Змінено на стандартний порт Ganache
//const web3 = new Web3(new Web3.providers.HttpProvider(`http://${blockchainHost}:${blockchainPort}`));

// Підключення до постачальника Web3 (це може змінитися в залежності від версії Web3)
// Створення рядка URL для підключення до локального блокчейну Ganache


const blockchainUrl = `http://${blockchainHost}:${blockchainPort}`;

// Створення об'єкту web3 без постачальника
//const web3 = new Web3();

// Перевірка, чи є постачальник
if (blockchainUrl) {
    // Додавання постачальника до об'єкту web3
 //   web3.setProvider(new Web3.providers.HttpProvider(blockchainUrl));
//}

// Отримання інформації про останній блок
//web3.eth.getBlock('latest').then((block) => {
 //   console.log("Latest block:", block);
//});

const TruffleProvider = require('truffle-provider');

// Отримання TruffleProvider за допомогою налаштувань з truffle-config.js
const truffleProvider = new TruffleProvider({
    provider: 'http',
    host: blockchainHost,
    port: blockchainPort,
    network_id: '*' // або вказати id вашої мережі, зазвичай в truffle-config.js
});

// Отримання інформації про останній блок
truffleProvider.sendAsync({
    method: 'eth_getBlockByNumber',
    params: ['latest', true], // true для отримання повної інформації про блок
    jsonrpc: '2.0',
    id: 1
}, (err, response) => {
    if (err) {
        console.error("Error getting latest block:", err);
    } else {
        console.log("Latest block:", response.result);
    }
});


// Підключення до локального блокчейну Ganache
// Виправлено: Змінено спосіб створення нового екземпляру Web3 за допомогою нового конструктора
//const web3 = new Web3(new Web3.providers.HttpProvider(`http:////${blockchainHost}:${blockchainPort}`));

// Отримання інформації про останній блок
  // web3.eth.getBlock('latest').then((block) => {
  // console.log("Latest block:", block);

//web3.eth.getBlock('latest').then((block) => {
//  console.log("Latest block:", block);
}




// }).catch((error) => {
  //  console.error("Error while getting latest block:", error);
//});
