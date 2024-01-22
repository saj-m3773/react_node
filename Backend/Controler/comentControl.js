import Comment from "../Models/comentModel.js";

export const getAllComment = async(req, res)=>{
    try {
        const comments = await Comment.findAll({});
        res.json(comments)
    } catch (error) {
        console.log(error);
    }
}

export const createComment = async(req, res)=>{
    const {newsId, description, name, email, subject} = req.body;

    try {
        await Comment.create({
            newsId,
            description,
            name,
            email,
            subject
        })

        res.json("نظر شما ارسال شد و بعد از تایید مدیریت به نمایش در می آید")
    } catch (error) {
        res.json(error)
    }
}

export const updateComment = async(req, res)=> {
    const {name , subject, description} = req.body;

    try {
        await Comment.update({
            name,
            description,
            subject,
        },{
            where: {
                id: req.params.id
            }
        })
        res.json("نظر با موفقیت ویرایش شد")
    } catch (error) {
        res.json(error)
    }
}


export const deleteComment = async(req,res)=> {
    try {
        await Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json("نظر با موفقیت حذف شد")
    } catch (error) {
        res.json(error)
    }
}

export const active = async(req, res) => {
    const {isActive} = req.body;
    try {
        await Comment.update({isActive: isActive}, {
            where: {
                id: req.params.id
            }
        })
        res.json("نظر فعال شد.")
    } catch (error) {
        res.json(error)
    }
}

export const unActive = async(req,res)=> {
    const {isActive} = req.body;
    try {
        await Comment.update({isActive: isActive}, {
            where: {
                id: req.params.id
            }
        })
        res.json("نظر غیر فعال شد.")
    } catch (error) {
        res.json(error)
    }
}

export const getComment = async(req,res)=> {
    try {
        const newsId = req.params.newsId;
        const comments = await Comment.findAll({where: {newsId: newsId}})
        res.json(comments)
    } catch (error) {
        res.json(error)
    }
}