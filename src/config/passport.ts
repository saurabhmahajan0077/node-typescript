import * as passport from "passport"
import * as passportJwt from "passport-jwt"
import * as passportLocal from "passport-local"
import { User } from "../models/User"
import * as config from "./main"



export class PassportConfig {
  public static init() {
    passport.use("local", PassportConfig.configureLocal())
    passport.use("jwt", PassportConfig.configureJwt())
    console.log("init passport")
  }

  private static configureLocal() {
    const localOptions = { usernameField: "username" }
    const localStrategy = new passportLocal.Strategy(localOptions, (username, password, done) => {
      let user: User = new User(username, "", "")
      user.getUserById((err, rows) => {
        if (err) throw err
        if (rows) {
          if (password === rows[0].password) {
            let resultUser = new User(rows[0].username, "", rows[0].name)
            return done(false, resultUser)
          }
          else {
            return done(true, null)
          }
        }
      })
    })

    return localStrategy
  }

  private static configureJwt() {

    const jwtOptions = {
      jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeader(),
      secretOrKey: new config.Config().secret,
    }

    const jwtLogin = new passportJwt.Strategy(jwtOptions, function (payload, done) {
      let user: User = new User(payload.username, "", "")
      user.getUserById((err, rows) => {
        if (err) { return done(err, false) }

        if (rows) {
          let resultUser = new User(rows[0].username, "", rows[0].name)
          done(null, resultUser)
        }
        else {
          done(null, false)
        }
      })
    })

    return jwtLogin
  }
}

PassportConfig.init()