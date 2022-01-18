import express from "express";
import {home, down, restAPI, demo, getLogin, postLogin, easyLogin, verifyToken,
   getJoin, postJoin, header, footer, board, chart, isAdmin, explainAPI, myAPI
} from "../controllers/usercontroller.js";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/index.html", home);
rootRouter.get("/down.html", down);
rootRouter.get("/myAPI.html", myAPI);
rootRouter.get("/explainAPI.html", explainAPI);
rootRouter.get("/restAPI.html", restAPI);
rootRouter.get("/demo.html", demo);
rootRouter.get("/chart.html", chart);
rootRouter.get("/header.html", header);
rootRouter.get("/footer.html", footer);
rootRouter.get("/board.html", board);
rootRouter.route("/login.html").get(getLogin).post(postLogin);
rootRouter.post("/easylogin",easyLogin);
rootRouter.route("/join.html").get(getJoin).post(postJoin);
rootRouter.post("/verifyToken", verifyToken);
rootRouter.post("/isAdmin", isAdmin);

export default rootRouter;   