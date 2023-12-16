import User from "../models/UserModel.js";

const ProfileDetails = async (req, res) => {
  try {
    const user = await User.findOne({
      verificationToken: req.body.token,
    }).exec();
    return res.status(200).send(user);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal server error");
  }
};

export { ProfileDetails };
