import SendIcon from '../../assets/icons/plane.svg'
import { Link } from 'react-router-dom'

type Props = {
    email: string | undefined;
}

function SendMessage(props: Props){
    return(
        <>
        <Link to={`mailto:${props.email}`}>
            <button 
            className='flex justify-center items-center bg-verde-300 px-5 py-3 rounded-md hover:bg-verde-300/80'>
                <img src={SendIcon} width={20} />
            </button>
        </Link>
        </>
    )
}

export default SendMessage