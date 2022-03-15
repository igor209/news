var http = require('http')
var express = require('express')
var dados = require('./dados.json')
var path = require('path')
var app
console.log(dados)
app = express()
app.use(express.static('pagina'))
app.use(express.urlencoded())

app.get('/dadosnoticias', (req, res)=>{
    res.json(dados)
})
app.get('/:noticia', (req, res)=>{
    var dadosdanoticia = 0
    var noticia = req.params.noticia.split('id=')[1]
    dados.noticiasrecentes.map((item)=>{
        
        if(item.id == noticia){
            dadosdanoticia = item
        }
    })
    if(dadosdanoticia == 0){
        res.send('404')
    }else{
        res.sendFile(path.join(__dirname + '/pagina/noticia.html'))
    }
})
porta = process.env.PORT || 3000
http.createServer(app).listen(porta)

console.log('servidor online')