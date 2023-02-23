import Image from "next/image.js";
import classes from "./MeetupDetail.module.css";

function MeetupDetail(props) {
  return (
    <section className={classes.detail}>
      <div className={classes.imageContainer}>
        <Image
          style={{ objectFit: "cover" }}
          alt={props.title}
          src={props.image}
          fill
        />
      </div>
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </section>
  );
}

export default MeetupDetail;
