import Notes from "./Notes";

function Home(props) {
 const {showAlert} = props;
  return (
    <>
     
    <div>
  {/* fetching notes */}
      <Notes showAlert={showAlert} />
      </div>
    </>
  );
}

export default Home;
