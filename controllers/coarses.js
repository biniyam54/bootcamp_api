const ErrorResponse = require("../utils/errorResponse");
const Coarse = require("../models/Coarse");
const Bootcamp = require("../models/Bootcamp");
const asyncHandler = require("../middlewares/asyncHandler");

//@desc Get getCoarses
//@routes GET /api/v1/coarses
//@routes GET /api/v1/bootcamps/:bootcampId/coarses
// @access public
exports.getCoarses = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    query = Coarse.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Coarse.find().populate({
      path: "bootcamp",
      select: "name description",
    });
  }

  const coarses = await query;

  res.status(200).json({
    success: true,
    count: coarses.length,
    data: coarses,
  });
});

//@desc Get single coarse
//@routes GET /api/v1/coarses/:id
// @access public
exports.getCoarse = asyncHandler(async (req, res, next) => {
  const coarse = await Coarse.findById(req.params.id).populate({
    path: "bootcamp",
    select: " name description ",
  });

  if (!coarse) {
    return next(
      new ErrorResponse(`No coarse with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: coarse,
  });
});

//@desc Add coarse
//@routes POST /api/v1/bootcamp/:bootcampId/coarses
// @access private
exports.addCoarse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No bootcamp with id of ${req.params.bootcampId}`, 404)
    );
  }

  const coarse = await Coarse.create(req.body);

  res.status(200).json({
    success: true,
    data: coarse,
  });
});

//@desc Update coarse
//@routes PUT /api/v1/coarses/:id
// @access private
exports.updateCoarse = asyncHandler(async (req, res, next) => {
  let coarse = await Coarse.findById(req.params.id);

  if (!coarse) {
    return next(
      new ErrorResponse(`No coarse with id of ${req.params.bootcampId}`, 404)
    );
  }

  coarse = await Coarse.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: coarse,
  });
});

//@desc Delete coarse
//@routes DELETE /api/v1/coarses/:id
// @access private
exports.removeCoarse = asyncHandler(async (req, res, next) => {
  const coarse = await Coarse.findById(req.params.id);

  if (!coarse) {
    return next(
      new ErrorResponse(`No coarse with id of ${req.params.bootcampId}`, 404)
    );
  }

  await coarse.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
