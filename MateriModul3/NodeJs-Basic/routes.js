const fs = require('fs')

function requestHandler(req,res){
    url = req.url;
    method = req.method;
    if(url === '/'){
        res.write('<html>');
            res.write('<head><title>Test NodeJs</title></head>');
            res.write('<body><form action="/pesan" method="POST"><input type="text" name="pesan"><button type="submit">submit</button></input></form></body>');
        res.write('</html>');
        return res.end();
        }
        const body = [];
        if(url === '/pesan' && method === 'POST'){
            req.on('data', (chunk) => {
                console.log(chunk);
                body.push(chunk);
            })
            return req.on('end', () => {
                const parsingBody = Buffer.concat(body).toString();
                const pesan = parsingBody.split('=')[1];
                fs.writeFile("pesan.txt",pesan, (err) => {
                    res.statusCode = 302;
                    res.setHeader('Location','/');
                    return res.end();
                });
            })
            
        }
        res.setHeader('context-type','text/html');
        res.write('<html>');
            res.write('<head><title>FISRT TEST</title></head>');
            res.write('<body><h1>Halo, INI NODE.JS PERTAMA SAYA</h1></body>');
        res.write('</html>');
        res.end();

}
module.exports = {
    handler:requestHandler,
    someText:'Nama saya reyhan'
}