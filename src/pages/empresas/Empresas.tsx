import { getToken } from "../../service/Auth"

function Empresas(){
    const token = getToken()

return(
<>
{!token &&
    <div>
        
    </div>
}
    
</>
)
}

export default Empresas