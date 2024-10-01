const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "66f5eb79596b7b3d4ce95885",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras congue vulputate justo id egestas. Donec id tellus vitae est sollicitudin ultrices.",
      price,
      images: [
        {
          url: "https://res.cloudinary.com/dljpwwp2h/image/upload/v1727731131/YelpCamp/wqgctuzyip08vd2esnhf.jpg",
          filename: "YelpCamp/wqgctuzyip08vd2esnhf",
        },
        {
          url: "https://res.cloudinary.com/dljpwwp2h/image/upload/v1727731132/YelpCamp/ghvhzzc5pxpoif9lqrtq.jpg",
          filename: "YelpCamp/ghvhzzc5pxpoif9lqrtq",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
