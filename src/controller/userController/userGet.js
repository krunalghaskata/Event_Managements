

const User = require('../../model/userModel');

const userGet = async (req, res) => {
    try {
        const userId = req.user.id;
        const users = await User.findById(userId);

        if (!users) {
            return res.status(404).json({ message: "user not found" });
        }
        
      return res.status(200).json({ message: "user get success", users })

    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

module.exports = userGet;






















// const User = require('../../model/userModel')
// const path = require('path')



// const userGet = async (req, res) => {
//     try {



//         const users = await User.find({})
//         res.render("index", {
//             title: "this is home page",
//             users: users
//         })
//         // const userId = req.params.id
  

//         // const users = await User.findById(userId)
     
//         // if (!users) {
//         //     return res.status(404).json({ message: "user not found" })
//         // }
//         // const directory = path.join(__dirname, "../../../views/index.ejs")
      
//         // res.render("../../../views/index.ejs", { users: users });

//         // res.render("/home/ts/Documents/krunal/event_project/views/index.ejs", { users: users })
//         // return res.status(200).json({ message: "user find successfully", userInstance })

//     } catch (error) {
//         return res.status(500).json({ message: error })
//     }
// }


// module.exports = userGet



