import db from "../db.js";

const register = async (req, res) => {
  // check if user exists
  // return user data
  res.json({ message: "register" });
};

const login = async (req, res) => {
  // add a new user to the database
  // return user data
  res.json({ message: "login" });
};

export { register, login };
