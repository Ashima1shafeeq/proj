import mongoose from 'mongoose';

const connection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://alashima8924:QuFtxh3ISNdG705x@cluster0.tzxt5.mongodb.net/",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

export default connection;
