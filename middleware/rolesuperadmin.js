const roleSuper = (req, res, next) => {

  if (req.decode.role !== "superadmin" ) {
    return res.status(400).json( { "success": false,
  "message": "Access denied: Your role does not allow this operation."});
  }
  next();
};
module.exports = roleSuper;
