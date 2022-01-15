import User from "../models/User.js";
import Board from "../models/Board.js";
import jwt from 'jsonwebtoken';
import {secretKey, option} from "../config/secretkey.js";
import {admin} from "../config/admin.js";

export const home = async (req, res) => {
    return res.render("index.html");
}; 

export const header = async (req, res) => {
    return res.render("header.html");
}; 

export const footer = async (req, res) => {
    return res.render("footer.html");
}; 

export const down = async(req,res) => {
    return res.render("down.html");
};

export const restAPI = async(req,res) => {
    return res.render("restAPI.html");
};

export const demo = async(req,res) => {
    return res.render("demo.html");
};

export const chart = async(req,res) => {
    return res.render("chart.html");
};

export const getLogin = async(req,res) => {
    return res.render("login.html");
}

export const getJoin = async(req,res) => {
    return res.render("join.html");
}

export const postJoin = async(req,res) => {
    const {name, email, password1, password2, phonenumber} = req.body;
    if(password1 != password2){
        return res.status(409).send({error: 'database failure'});
    }
    else{
        const useremailExists = await User.exists({email});
        if(useremailExists){
            console.log("이미 가입된 회원입니다.");
        }
        else{
            try{
                console.log('db에 회원정보가 저장되었습니다');
                await User.create({
                    name,
                    email,
                    password: password1,
                    phonenumber
                });
            }
            catch(error){
                console.log("db 저장과정에서 error 발생")
            }
            res.write("<script>alert(\"Accepted. Please Login Again.\")</script>");
            res.write("<script>window.location='/login.html'</script>");
        }
        
    }
}

export const postLogin = async(req,res) => {
    const {email, password} = req.body;
    const useremailExists = await User.exists({email});
    if(useremailExists){
        const user = await User.find({email:email});
        if(user[0].password == password){
            const token1 = jwt.sign({
                email: user[0].email
            }, secretKey,{
                expiresIn: option.expiresIn
            });
            const token =String(token1);
            const name = user[0].name;
            const email = user[0].email;
            return res.json({token, name, email});
        }
        else{
            return res.json({token:'wrongpassword'});
        }
    }
    else{
        return res.json({token:'wrongemail'});
    }
}

export const easyLogin = async(req,res) => {
    const {name, email} = req.body;
    const useremailExists = await User.exists({email});
    if(useremailExists){
        console.log("이미 가입된 회원입니다.");
        const token1 = jwt.sign({
            email: email
        }, secretKey,{
            expiresIn: option.expiresIn
        });
        const token = String(token1);
        return res.json({token, name, email});
    }
    else{
        try{
            console.log('db에 회원정보가 저장되었습니다');
            const token1 = jwt.sign({
                email: email
            }, secretKey,{
                expiresIn: option.expiresIn
            });
            const token = String(token1);
            console.log(token1);
            res.json({token, name, email});
            await User.create({
                name,
                email,
                password : '1'
            });
        }
        catch(error){
            console.log("db 저장과정에서 error 발생")
        }
    }
}

export const board = async(req,res) => {
    const boards = await Board.find({});
    return res.render("board.html", {boards});
}

export const verifyToken = async(req,res) => {
    if(req.body.token==''){
        return res.send('needLogin');
    }
    try{
        const {token} = req.body;
        const decoded = jwt.verify(token, secretKey);

        if(decoded){
            return res.send('ok');
        }
        else{
            return res.status(404);
        }
    } catch(err){
        return res.send('tokenExpired');
    }
}

export const isAdmin = async(req,res) => {

    try{
        const {email} = req.body; 
        if(email==admin){
            return res.send('admin');
        }
        else{
            return res.send('user');
        }
    } catch(err){
        console.log('error')
        return res.send(404);
    }
}