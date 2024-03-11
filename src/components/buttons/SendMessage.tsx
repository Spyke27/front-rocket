import { Link } from 'react-router-dom'
import SendIcon from '../../assets/icons/plane.svg'

type Props = {
    email: string | undefined;
}

function SendMessage(props: Props){
    return(
        <>
        <Link to={`mailto:${props.email}`}>
            <button 
                className='flex justify-center items-center bg-verde-300 md: w-16 h-12 rounded-md hover:bg-verde-300/80'>
                <img src={SendIcon} width={20} />
            </button>
        </Link>
        </>
    )
}

export default SendMessage