import { Request, Response, NextFunction } from "express"
import { UserService }  from "../Services/User"

export class UserController {
  public static handleRegister(req: Request, res: Response, next: NextFunction) {
    // validations
    UserService.register(req, res, next)
  }

  public static handleLogin(req: Request, res: Response, next: NextFunction) {
    // Login validations
    UserService.login(req, res, next)
  }

  public static handleDashboard(req: Request, res: Response, next: NextFunction) {
    res.send("Dashboard")
  }
}