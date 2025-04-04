import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const isUserExist = await User.findOne({ email });
    console.log(isUserExist);

    if (isUserExist) {
      throw new Error("User already exists !");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.json({
      success: true,
      message: "User registered successfully !",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUserExist = await User.findOne({ email });

    if (!isUserExist) {
      throw new Error("Email or password is not valid");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      isUserExist.password
    );

    if (!isPasswordValid) {
      throw new Error("Email or password is not valid");
    }

    res.json({
      success: true,
      message: "User logged in successfully !",
      data: {
        user: isUserExist,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
