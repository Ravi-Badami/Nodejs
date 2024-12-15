const mongoose = require('mongoose');
const connectDB = async () => {
  await mongoose.connect(
    'mongodb+srv://code4662:XYc9qOLAHawk7Oo2@cluster0.kujncfw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/namasteNodeDB'
  );
};
module.exports = { connectDB };
