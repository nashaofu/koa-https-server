const fs = require('fs')
const Koa = require('koa')
const http = require('http')
const https = require('https')
const { post } = require('koa-route')
const koqLogger = require('koa-logger')
const koaParser = require('koa-parser')
const koaStatic = require('koa-static')
const { toBytes, toString } = require('js-utf8')

const app = new Koa()

app.use(koqLogger())
app.use(koaParser())
app.use(koaStatic('.'))

app.use(
  post('/api/toBytes', async function(ctx, next) {
    ctx.body = toBytes(ctx.request.body.data)
    await next()
  })
)
app.use(
  post('/api/toString', async function(ctx, next) {
    ctx.body = toString(ctx.request.body.data)
    await next()
  })
)

const options = {
  key: fs.readFileSync('./ssl/ssl.key'), //ssl文件路径
  cert: fs.readFileSync('./ssl/ssl.crt') //ssl文件路径
}

http.createServer(app.callback()).listen(8080)
https.createServer(options, app.callback()).listen(8081)

console.log('app listen in 8080 and 8081')
console.log('  http://localhost:8080')
console.log('  https://localhost:8081')
