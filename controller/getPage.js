import pageModel from "../model/pages.js";


const getPage = async (req, res) => {
    try {
        const result = await pageModel.find({ email: req.body.email });
        if (result.length === 0) {
            return res.status(204).json({ message: "No Data" });
        } else {
            return res.status(200).json(result);
        }
    } catch (e) {
        return res.status(500).json({ message: "Server error", e: e.message });
    }
};

const findPage = async (req, res) => {
    const { slug } = req.params;
    console.log("slugurl",slug);
    const page = await pageModel.findOne({ url : slug});
    console.log(page);
    if (page) {
        let htmlcode =  `<html><head><title>${page.title}</title></head><body>${page.body}</body></html>`;
         res.send(htmlcode);
    } else {
         res.status(404).send('Page not found or not yet published');
    }
  }


  

export { getPage,findPage };


// const getPage = (req, res) => {
//     pageModel.find({ email: req.body.email }) 
//     .then((result) => {
//         if (result.length === 0) {
//             res.send({ code: 404, message: "User not found with the specified email." });
//         } else {
//             res.send(result);
//         }
//     })
//     .catch((err) => {
//         res.status(500).send({ code: 500, message: "Server error" });
//     });
// };

// export { getPage };
