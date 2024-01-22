import express from "express"
import db from "./config/Detabase.js";
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import Userrouter from "./routs/UsersRouts.js";
import categoryRouts from "./routs/categortRouts.js";
import videoRouts from "./routs/videoRouts.js"
import newsRoutes from "./routs/NewsRouts.js"
import commentRouter from "./routs/comentRouts.js";
import Emailrouter from "./routs/emailRoutes.js";
import cors from "cors"//برای اتصال فرانت و بک جهت خطا نخوردن آدرس
// ree col app savar bese -->baray amniyat
dotenv.config()
const app = express()

try {
    await db.authenticate()
    console.log("database")
    await db.sync()
} catch (error) {
    console.log(error)
}




app.use(cors({credentials: true, origin: "http://localhost:3000"}))

// can send json
app.use(express.json())
// barae car ba cooke lazem ast
app.use(cookieParser())
// namaesh images
app.use(express.static('puplic'))
// can fileUpload
app.use(fileUpload())

app.use(newsRoutes)
app.use(Userrouter)
app.use(categoryRouts)
app.use(videoRouts)
app.use(commentRouter)
app.use(Emailrouter)
app.listen(500, () => console.log('server running'))

