import db from '../config/database.js'

export const getUsers = (result) => {
  db.query('SELECT * FROM users', (err, res) => {
    if (err) {
      console.log(err)
      result(err, null)
    } else {
      console.log(res)
      result(null, res)
    }
  })
}

export const getUsersAsAdmin = (result) => {
  db.query('SELECT * FROM users WHERE rol = "user"', (err, res) => {
    if (err) {
      console.log(err)
      result(err, null)
    } else {
      console.log(res)
      result(null, res)
    }
  })
}

export const setUser = ({ username, password }, result) => {
  db.query('INSERT INTO users SET? ', [{ username, password }], (err, res) => {
    if (err) {
      console.log(err)
      result(err, null)
    } else {
      result(null, res)
    }
  })
}

export const updateUsername = ({ oldUsername, newUsername }, result) => {
  db.query(
    'UPDATE users SET username = ? WHERE username= ?',
    [newUsername, oldUsername],
    (err, res) => {
      if (err) {
        console.log(err)
        result(err, null)
      } else {
        result(null, res)
      }
    }
  )
}

export const updatePassword = ({ oldPassword, newPassword }, result) => {
  db.query(
    'UPDATE users SET password = ? WHERE password= ?',
    [newPassword, oldPassword],
    (err, res) => {
      if (err) {
        console.log(err)
        result(err, null)
      } else {
        result(null, res)
      }
    }
  )
}

export const deleteUser = ({ username }, result) => {
  db.query('DELETE FROM users WHERE username = ?', [username], (err, res) => {
    if (err) {
      console.log(err)
      result(err, null)
    } else {
      result(null, res)
    }
  })
}
