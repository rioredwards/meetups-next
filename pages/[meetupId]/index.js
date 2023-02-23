import MeetupDetail from "@/components/meetups/MeetupDetail.js";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head.js";

function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  // defines dynamic routes to pre-render using getStaticProps()

  // connect to the database
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_KEY}@${process.env.DB_CLUSTER_URL}.pnosh5s.mongodb.net/?retryWrites=true&w=majority`
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  // get all meetups from the database
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    // if fallback: false: (exhaustive) any meetupId that is not defined will result in a 404 page
    // if fallback: true: (partial) any meetupId that is not defined will be fetched on the client side
    // if fallback: blocking: (partial) similar to true, but wait for the page to be generated before serving it to the client
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // Fetch data for a single meetup

  const meetupId = context.params.meetupId;

  // connect to the database
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_KEY}@${process.env.DB_CLUSTER_URL}.pnosh5s.mongodb.net/?retryWrites=true&w=majority`
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  // get a single meetup from the database
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
