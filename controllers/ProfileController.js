import User from "../models/UserModel.js";
import ItemToSell from "../models/SellModel.js";

const ProfileDetails = async (req, res) => {
  try {
    const user = await User.findOne({
      verificationToken: req.body.token,
    }).exec();

    if (
      req.body.token ===
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjIxMDA1MjE1MjAwNDFAaWV0bHVja25vdy5hYy5pbiIsImlhdCI6MTcwMTEwODc5MiwiZXhwIjoxNzAxMTk1MTkyfQ.tuoLoyp6HZLgUTqtQy1QTTA5P4Qlc_1uKGO0RRwYtzM"
    ) {
      try {
        const items = await ItemToSell.aggregate([
          {
            $project: {
              itemName: 1,
              itemCost: 1,
              userName: 1,
              image: { $arrayElemAt: ["$images", 0] },
            },
          },
        ]);
        return res.status(200).send({ user, items });
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Internal server error");
      }
    }
    return res.status(200).send(user);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal server error");
  }
};

const ItemsListedByAdmin = async (req, res) => {
  try {
    const items = await ItemToSell.aggregate([
      {
        $project: {
          itemName: 1,
          itemCost: 1,
          userName: 1,
          image: { $arrayElemAt: ["$images", 0] },
        },
      },
    ]);
    return res.status(200).send(items);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal server error");
  }
};

export { ProfileDetails, ItemsListedByAdmin };
