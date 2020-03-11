const bns = require('bns')
const { wire, AuthServer } = bns
const handler = require('serve-handler')
const http = require('http')
const { readdirSync } = require('fs')

/// Auth DNS Server for the TLD
const server = new AuthServer({
  tcp: true,
  edns: true,
  dnssec: true
})

// Tell bns which zone we're serving.
// Change to your HSD name. Remember to
// add the . at the end
server.setOrigin(process.env.ZONE)
server.setFile(__dirname + '/zone/zonefile')
server.on('query', (req, res, rinfo) => {
  // Log all requests (dig format).
  console.log('Incoming request:')
  console.log(req.toString())
})
server.bind(53, '0.0.0.0')

http.createServer(function (req, res) {
  console.log("Handling request to " + req.headers.host);
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write("Welcome to " + req.headers.host);
  res.end();
}).listen(process.env.PORT || 80, '0.0.0.0');
