import News from "../Models/NewsModels.js";
import path from "path";
import fs from "fs";
import Category from "../Models/categoryModel.js";
import Users from "../Models/userModel.js";

export const getNews=async (req,res)=>{
    try {
         const news=await News.findAll({
              include:[Users] //bfahmad har user id mal kodom user ast
         })
        res.json(news)
    }catch (err){
        console.log(err)
    }

}

export const createNews = async(req,res)=>{
    if(req.files==null) return res.json("عکسی انتخاب نشده")
    const title = req.body.title;
    const desc = req.body.desc;
    const catId = req.body.catId;
    const userId = req.body.userId;
    const file=req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    let dateNow = Math.round(Date.now());
    const fileName = dateNow + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType  = ['.png', ".jpg", ".jpeg"];
    if(!allowedType.includes(ext.toLowerCase())){
        return res.json({msg: " .png .jpeg .jpg *  عکس نامعتبر است از فرمت مجاز استفاده کنید "})
    }
    if(fileSize > 5000000) return res.json({msg: "حجم عکس نباید بیشتر از 5 مگابایت باشد"})
    file.mv(`./puplic/images/${fileName}`, async(err)=> {
        if(err) return res.json({msg: err.message})
        try {
            await News.create({
                title: title,
                desc: desc,
                catId: catId,
                userId: userId,
                image: fileName,
                url: url})
            res.json({msg: "خبر با موفقیت آپلود شد."})
        } catch (error) {
            console.log(error.message);}})}

export const getNewsById=async (req,res)=>{
    try {
        const response=await News.findOne({
            where:{
                 id:req.params.id
            }
        })
        return res.json(response)
    }catch (err){
        console.log(err)
    }
}

export const updateNews = async (req, res) => {
    const news = await News.findOne({
        where: {
            id: req.params.id
        },
    });
    if (!news) return res.json({ msg: "دیتایی وجود ندارد" });

    let fileName = "";
    if (req.files === null) {
        fileName = news.image;
    } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        let dateNow = Math.round(Date.now());
        fileName = dateNow + ext;
        const allowedType = [".png", ".jpg", ".jpeg"];

        if (!allowedType.includes(ext.toLowerCase())) {
            return res.json({
                msg: " .png .jpeg .jpg *  عکس نامعتبر است از فرمت مجاز استفاده کنید ",
            });
        }
        if (fileSize > 5000000) return res.json({ msg: "حجم عکس نباید بیشتر از 5 مگابایت باشد" });


        const filePath = `./puplic/images/${news.image}`;
        fs.unlinkSync(filePath)

        file.mv(`./puplic/images/${fileName}`, (err) => {
            if(err) return res.json({msg: err.message})
        })
    }

    const title = req.body.title;
    const desc = req.body.desc;
    const userId = req.body.userId;
    const catId = req.body.catId;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    try {
        await News.update({
            title: title,
            desc: desc,
            userId: userId,
            catId: catId,
            image: fileName,
            url: url
        }, {
            where: {id: req.params.id}
        })
        res.json({msg: "خبر با موفقیت ویرایش شد."})
    } catch (error) {
        console.log(error);
    }

};

export const deleteNews=async (req,res)=>{
       const news=await News.findOne({
           where:{
               id:req.params.id
           }
       })
    if (!news) return res.json({msg:"این خبر پیدا نشد"})
    try {
        const filePath=`./puplic/images/${news.image}`
        fs.unlinkSync(filePath)
        await News.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json({msg: "خبر با موفقیت حذف شد"})

    }catch (err){
        console.log(err)
    }
}

export const getLastNews = async(req,res)=>{
    try {
        const news = await News.findAll({
            limit: 2,
            order: [["id", "DESC"]],
            include: [{
                model: Users,
                attributes: ['id', 'name', 'email', 'url']
            },{
                model:Category
            }]
        })
        res.json(news)
    } catch (error) {
        console.log(error);
    }
}
//جزیات خبر
export const getDetailNews = async(req,res)=>{
    try {
        const response = await News.findOne({
            where: {
                id: req.params.id,
            }
        })

        const numViews = response.numViews + 1; //بر چه اساس بازدید بیشتر می شه
        await News.update({numViews}, {
            where: {
                id: req.params.id
            }
        })

        res.json(response)
    } catch (error) {
        console.log(error);
    }
}

//محبوبیت خبر
export const popularNews = async(req,res)=>{
    try {
        const news = await News.findAll({
            limit: 3,
            order: [["numViews", "DESC"]],
            include: [{
                model: Users,
                attributes: ['id', 'name', 'email', 'url']
            }]
        })
        res.json(news);
    } catch (error) {
        console.log(error);
    }
}
//جستجو خبر
export const getCatNews=async (req,res)=>{
    try {
        //query --> to search
        const hasCategory=req.query.cat//cat-->mogdare ka baray server ersal misha

        const news= hasCategory ?
            await News.findAll({
                limit:4,
                where:{catId:hasCategory},
                order:['id','DESC'],
                include: [{
                    model: Users,
                    attributes: ['id', 'name', 'email', 'url']
                }]
            }) :await News.findAll({
                limit:4,
                order:['id','DESC'],
                include: [{
                    model: Users,
                    attributes: ['id', 'name', 'email', 'url']
                }]
            })
        return  res.json(news)

    }catch (err){
        console.log(err)
    }
}