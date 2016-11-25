import { Router } from "express"
import * as passport from "passport"
import * as passportConfig from "../config/passport"
import { UserController } from "../controllers/User"

class UserRouter {
  private static requireAuth = passport.authenticate("jwt", { session: false })
  private static requireLogin = passport.authenticate("local", { session: false })
  public router: Router

  constructor() {
    this.router = Router()
    this.init()
    passportConfig.PassportConfig.init()
  }

  private init() {
    this.router.post("/register", UserController.handleRegister)
    this.router.post("/login", UserRouter.requireLogin, UserController.handleLogin)
    this.router.get("/dashboard", UserRouter.requireAuth, UserController.handleDashboard)
  }
}

export default new UserRouter().router