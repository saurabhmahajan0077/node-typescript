import * as express from "express"
import * as bodyParser from "body-parser"
import * as logger from "morgan"
import * as config from "./config/main"
import UserRouter from "./routes/user"

class Server {
  private app: express.Application

  public static Bootstrap(): Server {
    return new Server()
  }

  constructor() {
    this.app = express()
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({
      extended: true,
    }))
    this.routes()
    let configObj = new config.Config()
    this.app.listen(configObj.port)
    console.log("Listening on port " + configObj.port)
    this.app.use(logger("dev")) // Log requests to API using morgan

    // Enable CORS from client-side
    this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.header("Access-Control-Allow-Origin", "*")
      res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS")
      res.header("Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials")
      res.header("Access-Control-Allow-Credentials", "true")
      next()
    })
  }

  private routes(): void {
    let router = express.Router()
    // This is just to test the route
    router.post("/", (req, res, next) => {
      console.log(req.body)
      res.json({ message: "Hello World!" })
    })
    this.app.use("/", router)
    this.app.use("/api/v1", UserRouter)
  }
}

Server.Bootstrap()

