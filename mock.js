import express from 'express'
import corss from 'cors'
import { getCards, getCard } from './src/models/CardModel.js'
import {
  getUsers,
  setUser,
  updateUsername,
  updatePassword,
  getUsersAsAdmin
} from './src/models/UserModel.js'
const app = express()
const port = 8081
let userLogged = ''

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
  getUsers((err, results) => {
    if (err) {
      res.send(err)
    } else if (
      results.some(
        (user) =>
          user['username'] === username && user['password'] === password && user['rol'] === 'admin'
      )
    ) {
      userLogged = username
      res.send('admin')
    } else if (
      results.some(
        (user) =>
          user['username'] === username && user['password'] === password && user['rol'] === 'user'
      )
    ) {
      res.send('user')
    } else {
      res.status(404).send({ data: 'User not found!' })
    }
  })
})

app.post('/user/register', (req, res) => {
  const { username, password } = req.body
  //busca si existe en el array obtenido de la bbdd un objeto cuyo username coincida con el nuevo username
  getUsers((err, results) => {
    if (err) {
      res.send(err)
    } else if (results.some((user) => user['username'] === username)) {
      res.status(404).send({ data: 'User repeat!' })
    } else {
      setUser({ username, password }, (err, results) => {
        if (err) {
          res.send(err)
        } else {
          res.send(true)
        }
      })
    }
  })
})

app.put('/user/rename', (req, res) => {
  const { oldUsername, newUsername } = req.body
  if (oldUsername === userLogged) {
    //busca en el array obtenido de la base de datos el objeto cuyo username coincida con oldUsername y lo cambia a newUsername
    updateUsername({ oldUsername, newUsername }, (err, results) => {
      if (err) {
        res.send(err)
      } else {
        userLogged = newUsername
        res.send(true)
      }
    })
  } else {
    res.status(404).send({ data: 'User does not match!' })
  }
})

app.put('/user/repassword', (req, res) => {
  const { oldPassword, newPassword } = req.body
  console.log(oldPassword, newPassword)
  getUsers((err, results) => {
    if (err) {
      res.send(err)
    } else if (
      results.some((user) => user['username'] === userLogged && user['password'] === oldPassword)
    ) {
      updatePassword({ oldPassword, newPassword }, (err, results) => {
        if (err) {
          res.send(err)
        } else {
          res.send(true)
        }
      })
    } else {
      res.status(404).send({ data: 'User not found!' })
    }
  })
})

app.get('/cards', (req, res) => {
  getCards((err, results) => {
    if (err) {
      res.send(err)
    } else {
      res.send(results)
    }
  })
})

app.get('/user/users', (req, res) => {
  getUsersAsAdmin((err, results) => {
    if (err) {
      res.send(err)
    } else {
      res.send(results)
    }
  })
})

app.delete('/user/delete', (req, res) => {
  const { userId } = req.body
  getUsers((err, results) => {
    if (err) {
      res.send(err)
    } else if (results.some((user) => user['username'] === userId)) {
      deleteUser({ userId }, (err, results) => {
        if (err) {
          res.send(err)
        } else {
          res.send(true)
        }
      })
    } else {
      res.status(404).send({ data: 'User not found!' })
    }
  })
})
