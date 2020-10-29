//@desc get all bootcamps
//@route GET /api/v1/bootcamps
//@access public
exports.getBootCamps = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: "show all bootcamps",
  });
};

//@desc get single bootcamps
//@route GET /api/v1/bootcamps
//@access public
exports.getBootCamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `show bootcamp ${req.params.id}`,
  });
};

//@desc create bootcamp
//@route POST /api/v1/bootcamps
//@access private
exports.createBootCamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: "create new bootcamp",
  });
};

//@desc update bootcamp
//@route PUT /api/v1/bootcamps/id
//@access private
exports.updateBootCamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: "Update bootcamp",
  });
};

//@desc delete bootcamp
//@route DELETE /api/v1/bootcamps/id
//@access private
exports.removeBootCamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: "Delete bootcamp",
  });
};
