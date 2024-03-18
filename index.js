import express from 'express';
import './db/conn.js';
import cors from 'cors';
import bodyParser from 'body-parser'
import Router from './Routes/router.js';
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import cron from 'node-cron'
// // import fs from 'fs';
import Pages from './model/pages.js';




dotenv.config();
const app = express();
app.use(bodyParser.json({extended:true}));
app.use(cors({origin:true,credentials:true}))
app.use('/',Router);
const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log("Server is listening");
})

const  sendToALL = async (email , htmldata)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: "adityabanduke@gmail.com",
          pass: "xyjtmivdvskvbmce",
        },
      });

      const mailOptions = {
        from : "Rapidops",
        to: email,
        subject:"cron test mail",
        html: htmldata
      }

      transporter.sendMail(mailOptions,function(err,info){
         if(err){
            console.log(err);
         }else{
            console.log("mail sent ")
         }
      });
}


cron.schedule('* * * * *',async function(){

           const now = new Date();
           let year = now.getFullYear();
           let month = (now.getMonth()+1 > 9) ? now.getMonth()+1 : `0${now.getMonth()+1}` 
           let day = (now.getDate() > 9) ? now.getDate() : `0${now.getDate()}` 
           let date = `${year}-${month}-${day}`
           let allMails = await Pages.find();
           let mail = [];
         //   let htmlBody = [];
           
           allMails.forEach(element => {
            let str = date;
              console.log("cron running");
              if(str.includes(date)){
               //   htmlBody.push(element.body)
               // sendToALL(element.email,element.body)
               //   mail.push(element.email);
               }
            });

         //   console.log(htmlBody);
})

// cron.schedule('* * * * *',function(){
//     console.log("cron runnit")
//     fs.appendFile("./htmlPages/logs.txt","data",function(err){
//         if(err){
//             throw err;
//         }
//         console.log("data added");
//     })

// })


// const transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // Use `true` for port 465, `false` for all other ports
//     auth: {
//       user: "maddison53@ethereal.email",
//       pass: "jn7jnAPss4f63QBp6D",
//     },
//   });
  
//   // async..await is not allowed in global scope, must use a wrapper
//   async function main() {
//     // send mail with defined transport object
//     const info = await transporter.sendMail({
//       from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
//       to: "bar@example.com, baz@example.com", // list of receivers
//       subject: "Hello ✔", // Subject line
//       text: "Hello world?", // plain text body
//       html: "<b>Hello world?</b>", // html body
//     });
  
//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
//   }
  
//   main().catch(console.error);

// const USERNAME = process.env.DB_USERNAME;
// const  PASSWORD = process.env.DB_PASSWORD;


// import express from 'express';
// import './db/conn.js';
// import cors from 'cors';
// import bodyParser from 'body-parser'
// import dotenv from 'dotenv'
// import cookieParser from 'cookie-parser';
// import {signup,login} from './controller/user.js'
// import {createPage} from './controller/creatPage.js'
// import { getPage } from './controller/getPage.js';

// const app = express();

// app.use(express.json())
// app.use(cookieParser())
// app.use(cors({
//     origin: ["http://localhost:5173"],
//     credentials: true
// })) 

// const port = 5000;

// app.use(cors({origin: ["http://localhost:5173"], credentials: true}));
// app.use(bodyParser.urlencoded({extended:false}))
// app.use(bodyParser.json())

// const varifyUser = (req, res, next) => {
//     const accesstoken = req.cookies.accessToken;
//     if(!accesstoken) {
//         if(renewToken(req, res)) {
//             next()
//         }
//     } else {
//         jwt.verify(accesstoken, 'jwt-access-token-secret-key', (err ,decoded) => {
//             if(err) {
//                 return res.status(401).json({ error: "Unauthorized"});
//             } else {
//                 req.email = decoded.email
//                 next()
//             }
//         })
//     }
// }

// const renewToken = (req, res) => {
//     const refreshtoken = req.cookies.refreshToken;
//     let exist = false;
//     if(!refreshtoken) {
//         return res.json({valid: false, message: "No Refresh token"})
//     } else {
//         jwt.verify(refreshtoken, 'jwt-refresh-token-secret-key', (err ,decoded) => {
//             if(err) {
//                 return res.json({valid: false, message: "Invalid Refresh Token"})
//             } else {
//                 const accessToken = jwt.sign({email: decoded.email}, 
//                     "jwt-access-token-secret-key", {expiresIn: '1m'})
//                 res.cookie('accessToken', accessToken, {maxAge: 60000})
//                 exist = true;
//             }
//         })
//     }
//     return exist;
// }


// app.post('/signup',signup)
// app.post('/login', login)
// app.post('/create', createPage)
// app.post('/getdata',getPage)

// app.listen(port,()=>{
//     console.log(`listioning on port ${port}`);
// }) 