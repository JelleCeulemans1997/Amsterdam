const Developer = require("../models/developer");


exports.getByUserId = (req, res) => {
  console.log(req.params)
  try {
    Developer.findOne({ userId: req.params.id }).exec((error, developer) => {
      res.status(200).json(developer);
    });
  } catch (error) {
    res.status(400).json({ message: "Developer not found", error });
  }
};
