const express = require('express')
const corss = require('cors')
const app = express()
const port = 8081
const users =[
   {username: 'Álvaro', password: '1234'},
   {username: 'Mario', password: '0987'}
]
const cards=[
   {
      CardDefId: 'Domino',
      series: '1',
      Img: 'https://images.marvelsnap.io/images/cards/40.webp'
   },
   {
      CardDefId: 'DoctorStrange',
      series: '1',
      Img: 'https://images.marvelsnap.io/images/cards/39.webp'
   },
   {
      CardDefId: 'BlueMarvel',
      series: '1',
      Img: 'https://images.marvelsnap.io/images/cards/19.webp'
   },
   {
      CardDefId: 'Blade',
      series: '1',
      Img: 'https://images.marvelsnap.io/images/cards/18.webp'
   },
   {
      CardDefId: 'Cable',
      series: '1',
      Img: 'https://images.marvelsnap.io/images/cards/21.webp'
   },
   {
      CardDefId: 'Colossus',
      series: '1',
      Img: 'https://images.marvelsnap.io/images/cards/27.webp'
   },
   {
      CardDefId: 'Deathlok',
      series: '1',
      Img: 'https://images.marvelsnap.io/images/cards/34.webp'
   },
   {
      CardDefId: 'DevilDinosaur',
      series: '1',
      Img: 'https://images.marvelsnap.io/images/cards/36.webp'
   },
   {
      CardDefId: 'Bishop',
      series: '1',
      Img: 'https://images.marvelsnap.io/images/cards/13.webp'
   },
   {
      CardDefId: 'Cosmo',
      series: '1',
      Img: 'https://images.marvelsnap.io/images/cards/28.webp'
   },
   {
      CardDefId: 'Forge',
      series: '1',
      Img: 'https://images.marvelsnap.io/images/cards/45.webp'
   },
   {
      CardDefId: 'CaptainAmerica',
      series: '1',
      Img: 'https://images.marvelsnap.io/images/cards/22.webp'
   },
   {
      CardDefId: 'Gamora',
      series: '1',
      Img: 'https://images.marvelsnap.io/images/cards/48.webp'
   },
   {
      CardDefId: 'Abomination',
      series: '1',
      Img: 'https://images.marvelsnap.io/images/cards/1.webp'
   },
   {
      CardDefId: 'Armor',
      series: '1',
      Img: 'https://images.marvelsnap.io/images/cards/9.webp'
   },
]

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
   const { username, password}  = req.body
   console.log('user', { username, password})
   console.log('users', users)
   if (users.some(user=>user['username']===username && user['password']===password)) {
      res.send(true)
   } else {
      res.status(404).send({ data: 'User not found!' })
   }
})

app.post('/user/register', (req, res) => {
   const user = req.body;
   console.log('user', user)
   users.push(user)
   res.send(user)
})

app.get('/cards/loadCards', (req, res) => {
   const response = cards;
   res.send(response)
})
