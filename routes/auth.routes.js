const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check,validationResult} = require('express-validator')
const router = Router()
const config = require('config')
const User = require('../models/User')

router.post(
    '/register',[
        check('username','Логин должен содержать только английские символы!').isAscii(),
        check('password','Минимальная длина пароля 6 символов. Максимальная 20 символов.').isLength({min:6,max:20})
    ],
    async(req,res)=>{
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                message:errors.array()[0].msg
            })
        }
        const {username,password} = req.body
        // console.log(username,password)
        const candidate = await User.findOne({username})
        if(candidate){
            return res.status(400).json({message:'Такой пользователь существует'})
        }

        const hashedPassword = await bcrypt.hash(password,8)
        
        const user = new User({username,password:hashedPassword})
        await user.save()

        // const token = jwt.sign(
        //     { userId: user.id },
        //     config.get('jwtSecret'),
        //     {expiresIn:'1h'}
        // )
        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            {expiresIn:'30d'}
        )

        res.json({token,userId:user.id,username:user.username,avatar:user.avatar})

        // res.status(201).json({message:'Пользователь создан'})

    }catch{
        res.status(500).json({status:"error",message: e})
    } 
    }
)

router.post(
    '/login',[
        check('username','Некорректное имя пользователя').isAscii(),
        check('password','Пароль должен содержать только английские символы!').isAscii()
    ],
    async(req,res)=>{
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                // errors: errors.array(),
                message:'Некорректные данные для входа'
            })
        }
        // console.log(req.body)
        const {username,password} = req.body
        // console.log("Поиск пользователя")
        const user = await User.findOne({username})
        
        if(!user){
            return res.status(400).json({message:"Пользователь не найден"})
        }
        // console.log("Пользователь найден!")
        // console.log("Проверка пароля")

        const isMatch = await bcrypt.compare(password,user.password)
        
        if(!isMatch){
            // console.log("Пароль неверный!")

            return res.status(400).json({message:"Неверный пароль"})
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            {expiresIn:'30d'}
        )

        res.json({token,userId:user.id,username:user.username,avatar:user.avatar})

    }catch{
        res.status(500).json({status:"error",message: e})
    } 
    }
)

module.exports = router;