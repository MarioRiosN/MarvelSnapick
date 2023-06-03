import db from '../config/database.js'

export const createDraft = ({userLogged}, result) => {
    db.query('CREATE TABLE `marvelsnapick_db`.`'+userLogged+'` (`jugador` INT NOT NULL AUTO_INCREMENT , `sobre1` VARCHAR(255) NOT NULL , `sobre2` VARCHAR(255) NOT NULL , `sobre3` VARCHAR(255) NOT NULL , `mazo` VARCHAR(1000) NOT NULL , PRIMARY KEY (`jugador`)) ENGINE = InnoDB ', (err, res) => {
      if (err) {
        result(err, null)
      } else {
        result(null, res)
      }
    })
  }