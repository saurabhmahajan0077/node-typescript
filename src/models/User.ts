import { Mysql } from "../config/mysql"

export class User {
  public id: string
  public username: string
  public password: string
  public name: string

  private static createGUID(): string {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
    }
    return s4() + s4() + "-" + s4() + "-" + s4() + "-" +
      s4() + "-" + s4() + s4() + s4()
  }

  constructor(username: string, password: string, name: string) {
    this.username = username
    this.password = password
    this.name = name
  }

  public getUserById(callback: (err, rows) => void) {
    let user: User = this

    Mysql.pool.getConnection((err, connnection) => {
      connnection.query("select * from ciscor.user where username = ?", user.username, (err, rows) => {
        connnection.release()
        callback(err, rows)
      })
    })
  }

  public createUser(callback: (err, rows) => void) {
    let user: User = this
    user.id = User.createGUID()
    Mysql.pool.getConnection((err, connnection) => {
      connnection.query("INSERT INTO user SET ?", user, (err, rows) => {
        connnection.release()
        callback(err, rows)
      })
    })
  }
}