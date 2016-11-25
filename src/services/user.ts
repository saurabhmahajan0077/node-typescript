import { Request, Response, NextFunction } from "express"
import * as jwt from "jsonwebtoken"
import { User } from "../models/User"
import * as config from "../config/main";

export class UserService {
  private static configObj: config.Config = new config.Config();

  public static register(req: Request, res: Response, next: NextFunction) {
    let user = new User(req.body.username, req.body.password, req.body.name)

    user.createUser((err, rows) => {
      if (err) throw (err)
      res.send(rows)
    })
  }

  public static dashboard(req: Request, res: Response, next: NextFunction) {
    res.send("dashboard")
  }

  public static login(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({
      token: "JWT " + UserService.generateToken(req.user),
      user: req.user,
    })
  }

  private static generateToken(user) {
    return jwt.sign(user, UserService.configObj.secret, { expiresIn: 10080 });
  }
}