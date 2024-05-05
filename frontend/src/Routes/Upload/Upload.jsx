import styles from "./upload.module.css"
import MainComponent from "../../Components/Shared/MainComponent/MainComponent"
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import papa from "papaparse"
import axios from "axios"
import { url } from "../../api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router"
import {CircularProgress} from "@mui/material";

const Upload = () => {


    const navigate = useNavigate();
    const isProfessor = useSelector((state) => state?.user?.isProfessor)
    useEffect(() => {
        !isProfessor && navigate("/")
    })

    const UploadComponent = () => {

        const [csvData, setcsvData] = useState([])
        const [loading, setLoading] = useState(false)
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
                setLoading(true)
                const response = await axios.post(`${url}/upload/insert`, csvData, {withCredentials: true})
                setLoading(false);
                alert(response.data.message);
            }catch(err){
                console.log(err)
                setLoading(false)
                alert("Failed to upload !")
            }
        }

        return (
            <div className={styles.container}>
                <input onChange={handleFileChange} type="file" accept=".csv" />
                <Button onClick={submitHandler} sx={{color: "#ffffff" ,backgroundColor: "#4D4C98", blockSize: "2rem"}} variant="contained">Submit</Button>
                {
                    loading && <CircularProgress style={{width: "25px", height: "25px", marginLeft: "10px"}} />
                }
            </div>
        )
    }

  return <MainComponent heading={"CSV"} Upload = {UploadComponent} />
}

export default Upload