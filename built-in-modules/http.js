const http = require ('http');

const host = 'localhost';
const port = 8080;

const server = http.createServer( (req, res) => {
    console.log('----------------------------------------------------')
    console.log(req);
    console.log('----------------------------------------------------')
    res.write('Hello world');
    res.end();
})

server.listen(port, host, () => {
    console.log(`server listening on ${host}:${port}`)
});