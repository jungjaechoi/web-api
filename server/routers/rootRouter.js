import express from "express";
import {home, down, summary, manual, getLogin, postLogin, easyLogin, verifyToken,
   getJoin, postJoin, header, footer, board, tokenSample
} from "../controllers/usercontroller.js";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/index.html", home);
rootRouter.get("/down.html", down);
rootRouter.get("/summary.html", summary);
rootRouter.get("/manual.html", manual);
rootRouter.get("/header.html", header);
rootRouter.get("/footer.html", footer);
rootRouter.get("/board.html", board);
rootRouter.get("/tokenSample.html", tokenSample);
rootRouter.route("/login.html").get(getLogin).post(postLogin);
rootRouter.post("/easylogin",easyLogin);
rootRouter.route("/join.html").get(getJoin).post(postJoin);
rootRouter.post("/verifyToken", verifyToken);


export default rootRouter;   