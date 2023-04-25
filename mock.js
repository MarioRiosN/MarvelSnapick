const express = require('express')
const corss = require('cors')
const app = express()
const port = 8081

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})

app.use(corss())
app.use(express.json())

// Middleware to intercept the response body, adding to locals so we can log later.
app.use((req, res, next) => {
   const oldJson = res.json
   res.json = (body) => {
      res.locals.body = body
      return oldJson.call(res, body)
   }
   next()
})

// Middleware to log in console the request and body response.
app.use(function (req, res, next) {
   if (req.url !== '/') {
      res?.on('finish', () => {
         const response = res.locals.body
         const details = {
            method: req?.method,
            url: req?.path,
            status: res.statusCode,
            code: res.statusMessage,
            body: response || {}
         }
         console.log(details)
      })
   }
   next()
})

app.post('/user/login', (req, res) => {
   const user = req.body
   if (user.username === 'Álvaro' && user.password === '1234') {
      res.send(true)
   } else {
      res.status(404).send({ data: 'User not found!' })
   }
})

app.get('/cards/loadCards', (req, res) => {
   const response = [
      {
         CardDefId: 'Domino',
         series: '1',
         Img: 'Domino.png'
      },
      {
         CardDefId: 'DoctorStrange',
         series: '1',
         Img: 'DoctorStrange.png'
      },
      {
         CardDefId: 'BlueMarvel',
         series: '1',
         Img: 'BlueMarvel.png'
      },
      {
         CardDefId: 'Blade',
         series: '1',
         Img: 'Blade.png'
      },
      {
         CardDefId: 'Cable',
         series: '1',
         Img: 'Cable.png'
      },
      {
         CardDefId: 'Colossus',
         series: '1',
         Img: 'Colossus.png'
      },
      {
         CardDefId: 'Deathlok',
         series: '1',
         Img: 'Deathlok.png'
      }
   ]
   res.send(response)
})
