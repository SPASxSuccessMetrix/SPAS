import axios from "axios";
import { useEffect } from "react";
import { url } from "./api";
import {useDispatch} from "react-redux"
import { login, setRole, setUsername } from "./redux/slices/userSlice";
import {useSelector} from "react-redux"

const initialInvoke = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)

    useEffect(() => {
        const fetchUser = async () => {
            try{
                const response = await axios.get(`${url}/auth/me`, {withCredentials: true});
                dispatch(setUsername(response?.data?.name));
                dispatch(setRole(response?.data?.role))
                dispatch(login());
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