const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('cff439bbff274b588593cfc86f0fd457');
var dados = 'dados.json'
const fs = require('fs');


function modificardata (item){
  var data = item.split('T')
  var datamod = data[0].split('-')
  var resposta = datamod[2]+"/"+datamod[1]+'/'+datamod[0]
  return resposta
}

function modificartitulo(item){
  var nome = item.split("-")
  var nomemodificado = nome[0]
  return nomemodificado
}

newsapi.v2.topHeadlines({
  country: 'br',
  language: 'pt'
}).then(response => {

  var dadosatuais = carregar()
  response.articles.map((item)=>{

    var esquema = {}
    var licensa = false
    esquema.id = dadosatuais.contadorId
    esquema.titulo = modificartitulo(item.title)
    esquema.descricao = item.description
    esquema.link = item.url
    esquema.linkimagem = item.urlToImage
    esquema.data = modificardata(item.publishedAt)
    esquema.conteudo = item.content
    
    dadosatuais.noticiasrecentes.map((dado)=>{
      if(dado.titulo === esquema.titulo){
        licensa = true
      }
    })

    if(licensa == false){
      dadosatuais.noticiasrecentes.push(esquema)
      dadosatuais.contadorId = dadosatuais.contadorId + 1
    }else{
      console.log('dados ja existentes')
    }

  })

  salvar(dadosatuais)
  console.log(dadosatuais)
});










function carregar() {
  const fileBuffer = fs.readFileSync(dados, 'utf-8')
  const contentJson = JSON.parse(fileBuffer)
  return contentJson
}
function salvar(content) {
  const contentString = JSON.stringify(content)
 return fs.writeFileSync(dados, contentString)
}