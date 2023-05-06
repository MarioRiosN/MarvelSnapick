import express from 'express'
import corss from 'cors'
import{
   getCards,
   getCard
}from "./src/models/CardModel.js"
const app = express()
const port = 8081
const users = [
   { username: 'Álvaro', password: '1234' },
   { username: 'Mario', password: '0987' }
]
let userLogged = ''
const cards = [
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
   const { username, password } = req.body
   if (users.some(u =>
      u['username'] === username
      && u['password'] === password)) {
      userLogged = username
      res.send(true)
   } else {
      res.status(404).send({ data: 'User not found!' })
   }
})

app.post('/user/register', (req, res) => {
   const { username, password } = req.body
   console.log('user', { username, password })
   //busca si existe en el array un objeto cuyo username coincida con el nuevo username
   if (users.some(u =>
      u['username'] === username)) {
      res.status(404).send({ data: 'User repeat!' })
   } else {
      users.push({ username, password })
      console.log(users)
      res.send(true)
   }
})

app.post('/user/rename', (req, res) => {
   const { oldUsername, newUsername } = req.body;
   console.log('name', { oldUsername, newUsername })
   if (oldUsername === userLogged) {
      //busca en el array el objeto cuyo username coincida con oldUsername y lo cambia a newUsername
      users.find(u => u['username'] === oldUsername).username = newUsername
      userLogged = newUsername
      console.log(users)
      res.send(true)
   } else {
      res.status(404).send({ data: 'User does not match!' })
   }
})

app.post('/user/repassword', (req, res) => {
   const { oldPassword, newPassword } = req.body;
   console.log('pass', { oldPassword, newPassword })
   if (oldPassword === users.find(u => u['username'] === userLogged).password) {
      //busca en el array el objeto cuyo password coincida con oldPassword y lo cambia a newPassword
      users.find(u => u['password'] === oldPassword).password = newPassword
      console.log(users)
      res.send(true)
   } else {
      res.status(404).send({ data: 'User does not match!' })
   }
})

app.get('/cards/loadCards', (req, res) => {
   const response = cards;
   res.send(response)
})

app.get('/cards',(req,res)=>{
   getCards((err, results) => {
      if(err){
          res.send(err);
      }else{
          res.send(results);
      }
  });
})