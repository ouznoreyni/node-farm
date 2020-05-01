const http = require('http')
const url = require('url')
const fs = require('fs')

const replaceTemplate = require('./modules/replaceTemplate')


const templateOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8')
const templateCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8')
const templateProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8')
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)




const server = http.createServer((req, res)=>{
  const {query, pathname} = url.parse(req.url, true);
  //overview page
  if (pathname=='/'|| pathname=='/overview') {
  res.writeHead(200, {"Content-type": "text/html"})

  const cardsHTML = dataObj.map(el=>{
      return replaceTemplate(templateCard, el)
  })

  const output = templateOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHTML)

    res.end(output)    
  }
  //product page
  else if(pathname == '/product'){
  res.writeHead(200, {"Content-type": "text/html"})
    const product = dataObj[query.id];
    const output = replaceTemplate(templateProduct, product)
    res.end(output)
  }
  //api
  else if (pathname =='/api') {
  
      res.writeHead(200, {"Content-type": "application/json"})
      res.end(data)
}
//page not found
else{
    res.writeHead(404)
    res.end('page not found')
  }
})

server.listen(3000, '127.0.0.1',()=>console.log('working')
)