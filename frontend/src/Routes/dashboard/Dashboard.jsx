import MainComponent from "../../Components/Shared/MainComponent/MainComponent";
const Dashboard = () => {
  return (
    <div>
      <MainComponent heading={"Dashboard"} src={"https://app.powerbi.com/reportEmbed?reportId=6a931f69-9cb3-4f29-9401-a8e68d5b309c&autoAuth=true&ctid=03cb5f0c-1f82-4993-9621-36330f6309ec"} />
    </div>
  );
};

export default Dashboard