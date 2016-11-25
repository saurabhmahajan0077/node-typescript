import * as mysql from "mysql"

export class Mysql {
  public static pool: mysql.IPool

  public static createPool() {
    Mysql.pool = mysql.createPool({
      connectionLimit: 10,
      host: "localhost",
      user: "root",
      password: "",
      database: "ciscor",
    })
  }
}

Mysql.createPool()