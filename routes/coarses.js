const router = require("express").Router({ mergeParams: true });
const {
  getCoarses,
  getCoarse,
  addCoarse,
  updateCoarse,
  removeCoarse,
} = require("../controllers/coarses");

router.route("/").get(getCoarses).post(addCoarse);
router.route("/:id").get(getCoarse).put(updateCoarse).delete(removeCoarse);

module.exports = router;
