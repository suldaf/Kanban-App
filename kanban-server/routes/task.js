const router = require("express").Router();
const { authenticate } = require("../middlewares/authenticate");
const { authorize } = require("../middlewares/authorize");
const Controller = require("../controllers/controller");

router.use(authenticate);

router.get("/", Controller.getTasks);
router.post("/", Controller.addTask);

router.use("/:id", authorize);

router.get("/:id", Controller.getDataById);
router.put("/:id", Controller.update);
router.patch("/:id", Controller.updateCategory);
router.delete("/:id", Controller.delete);
module.exports = router;
