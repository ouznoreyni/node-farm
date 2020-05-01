const http = require('http')
const fs = require('fs')



const templateOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8')
const templateCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8')
const templateProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8')
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)

const replaceTemplate = (temp, product)=>{
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  }


  return output
}



const server = http.createServer((req, res)=>{
  const pathName = req.url;

  //overview page
  if (pathName=='/'|| pathName=='/overview') {
  res.writeHead(200, {"Content-type": "text/html"})

  const cardsHTML = dataObj.map(el=>{
      return replaceTemplate(templateCard, el)
  })

  const output = templateOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHTML)

    res.end(output)    
  }
  //product page
  else if(pathName == '/product'){
    res.end('product')
  }
  //api
  else if (pathName =='/api') {
  
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