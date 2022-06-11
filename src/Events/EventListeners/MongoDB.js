import mongoose from 'mongoose';

const MongoDB = () => {
  // MongoseDB Server Connection
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(_ => console.log('The DataBase is ready'))
    .catch(err => console.log(err));
};

export default MongoDB;
