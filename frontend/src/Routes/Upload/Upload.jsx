import styles from "./upload.module.css"
import MainComponent from "../../Components/Shared/MainComponent/MainComponent"
import { Button } from "@mui/material";
import { useState } from "react";
import papa from "papaparse"
import axios from "axios"
import { url } from "../../api";

const Upload = () => {

    const UploadComponent = () => {

        const [csvData, setcsvData] = useState([])
        console.log(csvData)

        const handleFileChange = (e) => {
            const file = e.target.files[0];
            papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                  setcsvData(results)
                },
              });
        }

        const submitHandler = async () => {
            try{
                const response = await axios.post(`${url}/upload/insert`, csvData, {withCredentials: true})
                alert(response.data.message);
            }catch(err){
                console.log(err)
                alert("Failed to upload !")
            }
        }

        return (
            <div className={styles.container}>
                <input onChange={handleFileChange} type="file" accept=".csv" />
                <Button onClick={submitHandler} sx={{color: "#ffffff" ,backgroundColor: "#4D4C98", blockSize: "2rem"}} variant="contained">Submit</Button>
            </div>
        )
    }

  return <MainComponent heading={"CSV"} Upload = {UploadComponent} />
}

export default Upload