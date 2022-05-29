const router = require("express").Router();
const {checkToken} = require("../middleware/auth");
const {
    createUser,
    login,
    getUserByUserId,
    getUsers,
    updateUsers,
    deleteUser
} = require("../controllers/userControllers");
const userMiddleware = require('../middleware/users.js');
//======================LOGIN + SIGN IN =======================//

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getUserByUserId);
router.post("/login", login);
router.patch("/", checkToken, updateUsers);
router.delete("/", checkToken, deleteUser);

module.exports = router;