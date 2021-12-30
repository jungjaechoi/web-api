import Board from "../models/Board.js";
import Comment from "../models/Comment.js";

export const getLoadboards = async(req,res) => {
    const boards = await Board.find({});
    const comments = await Comment.find({});
    const length = Object.keys(comments).length;
    var set = new Set();
    for(var i = 0; i<length ; i++){
        set.add(comments[i].id);
    }
    const comment_exist = JSON.stringify([...set]);
    return res.json({boards, comment_exist});
}

export const postLoadboards = async(req,res) => {
    const {index} = req.body;
    const param = await Board.find({});
    const length = Object.keys(param).length;
    const boards = param[length-1-index];
    return res.json({boards});
}

export const getWrite = async(req,res) => {
    return res.render("write.html");
}

export const postWrite = async(req,res) => {
    const {opinion,cellphone,title, contents, email, name, issecret} = req.body;
    let secret = 1;
    if(issecret==null){
        secret = 0;
    }
    var dates = new Date();
    var year = dates.getFullYear();
    var month = dates.getMonth()+1;
    var day = dates.getDate();
    var date = {"year": year, "month": month, "day": day};
    try{
        await Board.create({
            opinion,
            cellphone,
            title,
            contents,
            date,
            email,
            name,
            secret
        });
    }
    catch(error){
        console.log('db 저장과정에서 error 발생')
    }

    return res.redirect('board.html');
}

export const getContents = async(req,res) => {
    return res.render("contents.html");
}

export const postContents = async(req,res) =>{
    const {id, comment, index} = req.body;
    var dates = new Date();
    var year = dates.getFullYear();
    var month = dates.getMonth() + 1;
    var day = dates.getDate();
    var date = {"year": year, "month": month, "day": day};
    try{
        await Comment.create({
            id,
            comment,
            date 
        });
    }
    catch(error){
        console.log('db 저장과정에서 error 발생')
    }
 
    return res.redirect("/board/contents.html/?index=" + index);
}

export const loadcomments = async(req,res) => {
    const {index} = req.body;
    const param = await Board.find();
    const length = Object.keys(param).length;
    const id = param[length-1-index]._id;
    const comments = await Comment.find({id:id});
    return res.json({comments});
}


export const getFix = async(req,res) => {
    return res.render("fix.html");
}

export const postFix = async(req,res) => {
    const {title, contents, id, index} = req.body;
    var dates = new Date();
    var year = dates.getFullYear();
    var month = dates.getMonth();
    var day = dates.getDate();
    var date = {"year": year, "month": month, "day": day};
    try{
        await Board.findByIdAndUpdate(id,
           {title, contents, date}
        );
    }
    catch(error){
        console.log('db 저장과정에서 error 발생')
    }

    return res.redirect('/board/contents.html/?index='+index);
}

export const deletecomment = async(req,res) =>{
    const {index_board, index_comment} = req.body;
    const boards = await Board.find();
    const length = Object.keys(boards).length;
    const board_id = boards[length-1-index_board]._id;
    const comment = await Comment.find({id:board_id});
    const comment_id = comment[index_comment]._id;
    Comment.deleteOne({_id: comment_id}, function(err){
        if (err) return handleError(err);
    });
    return res.render('');
}

export const deleteboard = async(req,res) => {
    const {index} = req.body;
    const boards = await Board.find();
    const length = Object.keys(boards).length;
    const board_id = boards[length-1-index]._id;
    await Board.deleteMany({_id:board_id});
    await Comment.deleteMany({id:board_id});
    return res.render('');
}

export const loadpagination = async(req,res) =>{
    const boards = await Board.find();
    const length = Object.keys(boards).length;
    return res.json({length});
}


export const loadmine = async(req,res) => {
    const {email} = req.body;
    const boards = await Board.find({email:email});
    const comments = await Comment.find({});
    const length = Object.keys(comments).length;
    var set = new Set();
    for(var i = 0; i<length ; i++){
        set.add(comments[i].id);
    }
    const comment_exist = JSON.stringify([...set]);
    return res.json({boards, comment_exist});
}

export const onlyminepagination = async(req,res) =>{
    const {email} = req.body;
    const boards = await Board.find({email:email});
    const all_boards = await Board.find({});
    const length = Object.keys(boards).length;
    const all_length = Object.keys(all_boards).length;
    return res.json({length, all_length});
}