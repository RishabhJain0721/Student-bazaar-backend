import ItemToSell from "../models/SellModel.js";

const dashboardListItems = async (req, res) => {
  // Retrieve the limit parameter from the query string, default to 5 if not provided
  const limit = parseInt(req.query.limit) || 8;

  // Retrieve the cursor parameter from the query string
  const page = req.query.page;
  console.log(page)

  // Build the query based on the cursor
  // const query = cursor ? { _id: { $gt: ObjectId(cursor) } } : {};

  // Use the limit method to restrict the number of documents returned
  // const limitedListings = await collection.find(query).limit(limit).toArray();
  // const result = await collection.find({}).skip(skipCount).limit(limitCount).toArray();
  try {
    const items = await ItemToSell.aggregate([
      {
        $project: {
          itemName: 1,
          itemCost: 1,
          userName: 1,
          category: 1,
          image: { $arrayElemAt: ["$images", 0] },
        },
      },
    ]).skip((page-1)*8).limit(limit);
    return res.status(200).send(items);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal server error");
  }
};

const totalNumberOfItems = async (req, res) => {
  try {
    const count = await ItemToSell.countDocuments();
    console.log(count)
    return res.status(200).send({count});
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal server error");
  }
};

export { dashboardListItems, totalNumberOfItems };
