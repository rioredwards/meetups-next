import NewMeetupForm from "@/components/meetups/NewMeetupForm.js";

function newMeetupPage() {
  function addMeetupHandler(enteredMeetupData) {
    console.log(enteredMeetupData);
  }

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
}

export default newMeetupPage;
