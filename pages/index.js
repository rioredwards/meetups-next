import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

// Props are passed to the component from getStaticProps()
function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

// loaded before the page is rendered
export async function getStaticProps() {
  // fetch data from an API

  // connect to the database
  const client = await MongoClient.connect(
    "mongodb+srv://rioredwards:T4OKFV2xtSEFW3Nn@cluster0.pnosh5s.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  // get all meetups from the database
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
