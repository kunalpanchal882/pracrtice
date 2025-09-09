const userModel = require("../models/auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
  try {
    const { username, password } = req.body;

    const IsExsistUser = await userModel.findOne({
      username,
    });

    if (IsExsistUser) {
      return res.status(409).json({
        messasge: "user is already register",
      });
    }

    const user = await userModel.create({
      username,
      password: await bcrypt.hash(password, 10),
    });

    const token = jwt.sign(
      {
        id: user._id,
      },process.env.JWT_SECRATE,
      { expiresIn: "1h" }
    );

    res.cookie("token", token);

    res.status(201).json({
      message:"register user succesfully"
    })

  } catch (error) {
    res.status(404).json({
      messasge: "somthing went wrong",
      error,
    });
  }
}

async function logInConroller(req, res) {
  try {
    const { username, password } = req.body;

    const user = await userModel.findOne({
     username,
    });

    if (!user) {
      return res.status(401).json({
        message: "username is not find",
      });
    }

    const IspasswordValid = await bcrypt.compare(password,user.password);

    if (!IspasswordValid) {
      return res.status(401).json({
        message: "invalid paswword unauthorized",
      });
    }

    const token = jwt.sign({
      id:user._id
    },process.env.JWT_SECRATE)

    res.cookie("token",token)

    res.status(200).json({
      message: "user logedin succesfully",
    });
  } catch (error) {
    res.status(404).json({
      message: "unvalid user and password",
      error,
    });
  }
}

module.exports = {
  registerController,
  logInConroller,
};
