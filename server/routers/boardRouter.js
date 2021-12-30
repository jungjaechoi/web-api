import express from "express";
import { getWrite, postWrite, getLoadboards, postLoadboards,getContents,postContents, 
    loadcomments, getFix,postFix, deletecomment, deleteboard,loadpagination,
    loadmine,onlyminepagination, 
} from "../controllers/boardcontroller.js";

const boardRouter = express.Router();


boardRouter.route("/write.html").get(getWrite).post(postWrite);
boardRouter.route("/loadboards").get(getLoadboards).post(postLoadboards);
boardRouter.route("/contents.html").get(getContents).post(postContents);
boardRouter.post("/loadcomments",loadcomments);
boardRouter.route("/fix.html").get(getFix).post(postFix);
boardRouter.post("/deletecomment", deletecomment);
boardRouter.post("/deleteboard",deleteboard);
boardRouter.get("/loadpagination",loadpagination);
boardRouter.post("/loadmine",loadmine);
boardRouter.post("/onlyminepagination", onlyminepagination)

export default boardRouter;   