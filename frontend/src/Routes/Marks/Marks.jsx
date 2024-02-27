import MainComponent from "../../Components/Shared/MainComponent/MainComponent";
const Marks = () => {
  return (
    <div>
      <MainComponent
        heading={"Marks"}
        src={
          "https://app.powerbi.com/reportEmbed?reportId=6df8052a-da53-4da6-8626-980d2648ad35&autoAuth=true&ctid=03cb5f0c-1f82-4993-9621-36330f6309ec&navContentPaneEnabled=false"
        }
      />
    </div>
  );
};

export default Marks;
