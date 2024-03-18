import pageModel from "../model/pages.js"


const createPage = async (req, res) => {
    try {
        console.log(req.body);
        const newUser = new pageModel({
            email: req.body.email,
            title: req.body.title,
            subtitle: req.body.subTitle,
            body: req.body.body,
            url: req.body.url,
            publishDate: req.body.publishDate,
            isdraft: req.body.isDraft,
            ishide: req.body.isHide,
        });

        const result = await newUser.save();
        console.log(result);
        res.status(200).json({ message: "Page saved successfully" });
    } catch (err) {
        console.log(err);
        res.status(501).json({ message: "Page not created", error: err.message });
    }
};



//  const createPage =   (req,res)=>{
//     console.log(req.body);
//     const newUser = new pageModel({
//         email:req.body.email,
//         title: req.body.title,
//         subtitle: req.body.subTitle,
//         body:req.body.body,
//         url:req.body.url,
//         publishDate:req.body.publishDate,
//         isdraft: req.body.isDraft,
//         ishide: req.body.isHide,
//     })

//      newUser.save().then((result)=>{
//         console.log(result)
//         res.send({code: 200, message : "page saved "})
//     })
//     .catch((err)=>{
//         console.log(err);
//         res.send({code: 501, message : "not created"})
//     })
// }

export default createPage;