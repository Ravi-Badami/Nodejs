const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://code4662:XYc9qOLAHawk7Oo2@cluster0.kujncfw.mongodb.net/';

const client = new MongoClient(url);

const dbname = 'namasteNodeDB';

async function main() {
  //use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbname);
  const collection = db.collection('User');

  const data = {
    name: 'falkeen',
    lastname: 'taj',
    city: 'banglore',
    country: 'india',
  };
  // const insertResult = await collection.insertMany([data]);
  // console.log('Result inserted=>', insertResult);
  // const findResult = await collection.find({}).toArray();
  // console.log('Found documents=>', findResult);

  // const updateResult = await collection.updateOne(
  //   { name: 'ravi' },
  //   { $set: { name: 'ravikumar' } }
  // );

  const deleteResult = await collection.deleteMany({ name: 'falkeen' });
  console.log('deleted documents=>', deleteResult);

  return 'done';
}

main()
  .then(console.log)
  .catch(console.log)
  .finally(() => client.close());
