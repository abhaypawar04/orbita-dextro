import User from "../model/userModel.js";

//@desc     GET ALL USERS
//@route    GET/api/users
//@access   Public
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ data: users, success: true, count: users.length });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

//@desc     GET SINGLE USERS
//@route    GET/api/users/:id
//@access   Public
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ data: user, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//@desc     create a user
//@route    post/api/users/
//@access   Public
export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ data: user, success: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

//@desc     delete a user
//@route    delete/api/users/:id
//@access   Public
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ data: user, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//@desc     update a user
//@route    put/api/users/:id
//@access   Public
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ data: user, success: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
