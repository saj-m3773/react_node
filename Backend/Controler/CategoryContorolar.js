import Category from "../Models/categoryModel.js";
//جهت خواندن مدل دیتا بیس خوانده شده
export const getCategory=async (req,res)=>{
    try {
        const categories =await Category.findAll({})
        res.json(categories)
    }catch (err){
        console.log(err)
    }
}


export const carteCategory=async (req,res)=>{

    const name=req.body.name

    try {
        //دسته بندی با نام مشخص ایحاد شد
        await Category.create({
            name:name
        })

        res.json("دسته بندی افزوده شد")
    }catch (error){
        console.log(error)
    }
}

export const  updateCategory=async(req,res)=>{

    const name =req.body.name

    try {
       await Category.update({name:name},{
           where :{id:req.params.id}
       })
        res.json('ویرایش با موفقیت انجام شد')

    }catch (error){
        console.log(error)
    }

}
export const  deleteCategory=async (req,res)=>{

    try {
         await Category.destroy({
             where:{
                 id:req.params.id
             }
         })
        res.json('حذف دسته بندی انجام شد')
    } catch (error){

        console.log(error)
    }
}
export const getCategoryList=async (req,res)=>{
    try {
        const categories =await Category.findAll({})
        res.json(categories)
    }catch (err){
        console.log(err)
    }
}
