// Include other reaourse routers
const coarseRouter = require("./coarses");

const router = require("express").Router();
const {
  getBootCamp,
  getBootCamps,
  createBootCamp,
  updateBootCamp,
  removeBootCamp,
  bootcampPhotoUpload,
} = require("../controllers/bootcamps");

//Re-route into other resourses routers
router.use("/:bootcampId/coarses", coarseRouter);

router.route("/:id/photo").put(bootcampPhotoUpload);

router.route("/").get(getBootCamps).post(createBootCamp);
router
  .route("/:id")
  .get(getBootCamp)
  .put(updateBootCamp)
  .delete(removeBootCamp);
module.exports = router;
