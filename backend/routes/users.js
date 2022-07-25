const express = require("express"); 
const { verify } = require("jsonwebtoken");
const {updateUser, deleteUser, getUser, getUsers} = require("../controllers/user");
const {verifyToken, verifyUser, verifyAdmin} = require("../utils/verifyToken");
const router = express.Router();


// router.get('/checkauthentication', verifyToken, (req, res, next)=> {
//     res.send("Salom User muvaffaqiyatli")
// })

// router.get('/checkuser/:id', verifyUser, (req, res, next)=> {
//     res.send("Salom User, muvaffaqiyatli kirdingiz, endi accountingizni uchirishingiz imkoniyatiga egasiz.")
// })

// router.get('/checkadmin/:id', verifyAdmin, (req, res, next)=> {
//     res.send("Salom Admin, muvaffaqiyatli kirdingiz, endi hamma accountlarni uchirishingiz imkoniyatiga egasiz")
// })
// UPDATE
router.put("/:id", verifyUser, updateUser)

// DELETE
router.delete("/:id", verifyUser, deleteUser)

//GET
router.get("/:id", verifyUser, getUser)

//GET ALL
router.get("/", verifyAdmin, getUsers)


module.exports = router