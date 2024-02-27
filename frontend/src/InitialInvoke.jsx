import axios from "axios";
import { useEffect } from "react";
import { url } from "./api";
import {useDispatch} from "react-redux"
import { login, setUsername } from "./redux/slices/userSlice";
import {useSelector} from "react-redux"

const initialInvoke = () => {
    const disptach = useDispatch();
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)

    useEffect(() => {
        const fetchUser = async () => {
            try{
                const response = await axios.get(`${url}/auth/me`, {withCredentials: true});
                disptach(setUsername(response.data));
                disptach(login());
            }catch(err){
                console.log(err)
            }
        }
        fetchUser();
    }, [isLoggedIn])

    return(
        <>
        </>
    )
}

export default initialInvoke;