const express = require('express'),
app = express(),
server = require('http').createServer(app),
port = 1337

Discord = require('discord.js'),
client = new Discord.Client({
  fetchAllMembers: true
}),
discord = require('./discord.js')(client)

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


