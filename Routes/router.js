import express from "express";
import { login, signup } from "../controller/user.js";
import { getPage,findPage } from "../controller/getPage.js";
import sendMail from '../controller/sendMail.js'
import createPage from "../controller/creatPage.js";

const router = express.Router();

router.post('/login',login);
router.post('/signup',signup);
router.post('/create',createPage )
router.post('/getdata',getPage)
router.get('/mail',sendMail)


router.get('/pages/:slug', findPage);

export default router;