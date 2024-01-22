// show the data to the user
import Users from "../Models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import path from "path";
import fs from "fs";

export const getAllUsers = async (req, res) => {
    try {
        const users = await Users.findAll({});
        res.json(users);
    } catch (error) {
        console.log(error);
    }
};
export const Register = async (req, res) => {
    // this come from the front
    const {name, email, password, confPassword, isAdmin} = req.body
    // password === confPassword ?
    if (password !== confPassword) {
        return res.json("رمز ها تطابق ندارند")
    }
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)
    try { // save at data
        // jast one email
        const found = await Users.findOne({where: {email: email}})
        if (found) {
            return res.json("ایمیل قبلا ثبت شده است")
        }
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            isAdmin: isAdmin
        })
        res.json({message: 'ثبت نام موفقیت آمیز بود'})

    } catch (err) {
        console.log(err)
    }
}


export const Login = async (req, res) => {
    try {
        const user = await Users.findAll({
            where: {
                email: req.body.email,
            },
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if (!match) {
            return res.json({
                error: "پسوورد اشتباه است"
            });
        }
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const isAdmin = user[0].isAdmin;
        const accessToken = jwt.sign({
                userId,
                name,
                email,
                isAdmin
            },
            process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "45s"
            }
        );

        const refreshToken = jwt.sign({
                userId,
                name,
                email,
                isAdmin
            },
            process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: "1d"
            }
        )

        await Users.update({
            refresh_token: refreshToken
        }, {
            where: {
                id: userId,
            }
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })

        res.json({
            userId,
            name,
            email,
            isAdmin,
            accessToken,
            msg: "شما با موفقیت وارد شدید"
        });
    } catch (error) {
        res.json({
            error: "کاربر وجود ندارد"
        });
    }
};


export const Logout = async(req,res)=> {
    try {
        const refreshToken = req.cookie.refreshToken;
        if(!refreshToken) return res.json("توکن پیدا نشد")
        const user = await Users.findOne({
            where:{
                refresh_token:refreshToken
            }
        })
        if(!user) return res.json("کاربر پیدا نشد")
        const clr = null;
        await Users.update({
            refresh_token: clr
        }, {
            where: {
                id: user.id
            }
        })
        res.clearCookie("refreshToken")
        res.json("خروج موفقیت آمیز بود")
    } catch (error) {
        console.log(error);
    }
}


export const deleteUser = async (req, res) => {
    const user = await Users.findOne({
        where: {
            id: req.params.id
        }
    })
    if (!user) return res.json({message: 'کاربر پیدا نشد'})
    try {
        // destroy --> fine and delete user
        await Users.destroy({
            where: {
                id: req.params.id
            }
        })
    } catch (err) {

    }
}

export const updateUser = async (req, res) => {
    try {
        const {name, email, password, confPassword, isAdmin} = req.body
        if (password !== confPassword) {
            return res.json({error: 'اشتباه است'})
        }
        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(password, salt)
        await Users.update({
            name: name,
            email: email,
            password: hashPassword,
            isAdmin: isAdmin
        }, {
            where: {
                id: req.params.id
            }
        })
    } catch (error) {
    }
}

export const updateProfile = async(req,res)=>{
    const avatar = await Users.findOne({
        where: {
            id: req.params.id
        }
    })

    if(!avatar) return res.status(404).json({msg: "کاربری پیدا نشد"})

    let fileName = "";
    if(req.files === null){
        fileName = avatar.image
    }else{
        const file = req.files.file
        const fileSize = file.data.length;
        const ext = path.extname(file.name)
        let dateNow = Math.round(Date.now());
        fileName = dateNow + ext
        const allowedType = ['.png','.jpg','.jpeg'];
        if(!allowedType.includes(ext.toLowerCase())){
            return res.json("jpeg jpg png عکس معتبر نیست * فرمت های مجاز ")
        }
        if(fileSize > 1000000) return res.json("حجم عکس نباید بیشتر از 1 مگابایت باشد")

        if(avatar.image){
            const filePath = `./puplic/avatars/${avatar.image}`
            fs.unlinkSync(filePath)
        }


        file.mv(`./puplic/avatars/${fileName}`, (err)=> {
            if(err) return res.json({msg: err.message})
        })
    }

    const {name , password, confPassword} = req.body;
    if(password !== confPassword) {
        return res.json({error: "پسوورد و تکرار آن با هم برابر نیست"})
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt)

    const url = `${req.protocol}://${req.get("host")}/avatars/${fileName}`

    try {
        await Users.update({name: name, password: hashPassword, image: fileName, url: url},{
            where: {
                id: req.params.id
            }
        })
        res.json({msg: "کاربر با موفقیت ویرایش شد"})
    } catch (error) {
        console.log(error);
    }

}

//namaesh porofil barae user
export const Profile=async (req,res)=>{
try {
    const user=req.user//az Veryfiytokn garefte shode
    res.json(user)
}catch (err){

    console.log(err)
}

}