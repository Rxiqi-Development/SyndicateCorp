const express = require('express'),
app = express(),
server = require('http').createServer(app),
io = require('socket.io')(server),
db = require('quick.db'),
port = 1337,
tools = require('./functions.js'),
Discord = require('discord.js'),
client = new Discord.Client({
  fetchAllMembers: true
}),
 discord = require('./discord.js')(client),
qs = require('qs'),
session = require('express-session');

// Listen To Port
server.listen(port, function() {
console.log(`Listening at port ${port}`);
});

// Routing
app.use(express.static('public'));

// Pages 
app.get("/", function(request, response) {
response.sendFile(__dirname + '/public/index.php');
})

app.get("/new", function(request, response) {
//return response.send('We are currently down for maintenance, If you have any issues please join the Discord @ https://discord.gg/plexidev')
return response.sendFile(__dirname + '/public/new.html'); // This is gonna be changed as we need to pass in the proper data for this page.
})


app.get("/api", async function(request, response) {
response.setHeader('Content-Type', 'application/json');
if (!request.query.key) return response.send('null');
let data;
if (request.query.key !== 'all') data = await db.fetch('entries', {
  target: request.query.key
});
else data = await db.fetch('entries');
if (!request.query.key !== 'all' && data) data.code = qs.parse(data.code).raw;
response.send(JSON.stringify(data));
})

