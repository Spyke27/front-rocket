import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getToken } from "./Auth";
import { useEffect } from "react";

function RedirectLogin(){
    const navigate = useNavigate()

    useEffect(() => {
        teste()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const teste = () => {
        if(!getToken()){
            navigate('/login')
            toast.error('Precisa estar Logado!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
    }
    return(
        <>
        </>
    )
} 
export default RedirectLogin