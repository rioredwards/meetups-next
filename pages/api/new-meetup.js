// Server Side Code
// POST: /api/new-meetup
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // connect to the database
    const client = await MongoClient.connect(
      "mongodb+srv://rioredwards:T4OKFV2xtSEFW3Nn@cluster0.pnosh5s.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    // insert data into the database
    const result = meetupsCollection.insertOne(data);
    console.log(result);
    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
