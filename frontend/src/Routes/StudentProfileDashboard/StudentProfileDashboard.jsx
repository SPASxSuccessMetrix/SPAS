import MainComponent from "../../Components/Shared/MainComponent/MainComponent";
const Marks = () => {
  return (
    <div>
      <MainComponent
        heading={"Student Profile"}
        src={
          "https://app.powerbi.com/reportEmbed?reportId=5976bd22-4fcf-4b80-aa84-83c50b5a4132&autoAuth=true&ctid=03cb5f0c-1f82-4993-9621-36330f6309ec"
        }
      />
    </div>
  );
};

export default Marks;
