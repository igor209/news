var http = require('http')
var express = require('express')
var dados = require('./dados.json')
var app
console.log(dados)
app = express()
app.use(express.static('pagina'))
app.use(express.urlencoded())

app.get('/dadosnoticias', (req, res)=>{
    res.json(dados)
})
porta = process.env.PORT || 3000
http.createServer(app).listen(porta)

console.log('servidor online')