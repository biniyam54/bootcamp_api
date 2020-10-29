const router = require("express").Router();
const {
  getBootCamp,
  getBootCamps,
  createBootCamp,
  updateBootCamp,
  removeBootCamp,
} = require("../controllers/bootcamps");

router.route("/").get(getBootCamps);
router.route("/:id").get(getBootCamp);
router.route("/").post(createBootCamp);
router.route("/:id").put(updateBootCamp);
router.route("/:id").delete(removeBootCamp);

module.exports = router;
