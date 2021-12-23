const http = require('http');

const server = http.createServer((req,res) => {
    url = req.url;
    method = req.method;
    if(url === '/'){
        res.setHeader('content-type','text/html')
        res.write('<html>')
            res.write('<head><title>uji coba</title></head>')
            res.write('<h1>Selamat datang di website saya</h1>')
            res.write('<body><form action="/users-control" method="POST"><input type="text" name="username"><button type="submit">Login</button></input></form></body>')
        res.write('</html>')
        return res.end()
    }
    if(url === '/users'){
            res.write('<html>');
            res.write('<head><title>Login</title></head>');
            res.write('<body><ul><li>username1</li><li>username 2</li></ul></body>');
        res.write('</html>');
        return res.end();
    }
    if(url === '/users-control'){
        const body = []
        req.on('data',(chunk)=>{
            body.push(chunk)

        })
        req.on('end',()=>{
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split('=')[1];
            console.log(username)
        })
        res.statusCode = 302;
        res.setHeader('Location','/');
        res.end();
    }
})

server.listen(80);