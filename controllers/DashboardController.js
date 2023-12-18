import ItemToSell from "../models/SellModel.js";

const dashboardListItems = async (req, res) => {
  // Retrieve the category from the request
  const category = req.body.category;

  console.log("Hello guys category is : ", category);
  if(req.body.rendering=="admin"){
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
  }

  // Retrieve the limit parameter from the query string, default to 5 if not provided
  const limit = parseInt(req.query.limit) || 8;

  // Retrieve the cursor parameter from the query string
  const page = req.query.page;
  console.log(page);

  try {
    let aggregationPipeline = [
      {
        $project: {
          itemName: 1,
          itemCost: 1,
          userName: 1,
          category: 1,
          image: { $arrayElemAt: ["$images", 0] },
        },
      },
    ];

    if (category !== "" && category !== null && category !== undefined) {
      aggregationPipeline.unshift({
        $match: {
          category: category,
        },
      });
    }

    const items = await ItemToSell.aggregate(aggregationPipeline)
      .skip((page - 1) * 8)
      .limit(limit);

    return res.status(200).send(items);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal server error");
  }
};

const totalNumberOfItems = async (req, res) => {
  try {
    const count = await ItemToSell.countDocuments();
    console.log(count);
    return res.status(200).send({ count });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal server error");
  }
};

export { dashboardListItems, totalNumberOfItems };
