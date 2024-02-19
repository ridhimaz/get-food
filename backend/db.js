const mongoose = require('mongoose');

const mongoURI = "mongodb://ridhimakohli19:123Test@ac-ynlebzj-shard-00-00.tiqr1hb.mongodb.net:27017,ac-ynlebzj-shard-00-01.tiqr1hb.mongodb.net:27017,ac-ynlebzj-shard-00-02.tiqr1hb.mongodb.net:27017/Get-Food?ssl=true&replicaSet=atlas-w8d72y-shard-0&authSource=admin&retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB successfully");

    const inventoryCollection = mongoose.connection.db.collection("inventory");
    const data = await inventoryCollection.find({}).toArray();

    // Store fetched data in global variable
    global.food_items = data;
  //  console.log(global.food_items);

    // Fetch data from the "foodCategory" collection
    const foodCategory = mongoose.connection.db.collection("foodCategory");
    const foodCategoryData = await foodCategory.find({}).toArray();
    global.foodCategory=foodCategoryData;
   // console.log(global.foodCategory);
} catch (error) {
    console.error("Error connecting to MongoDB:", error);
}

};

module.exports = mongoDB;



