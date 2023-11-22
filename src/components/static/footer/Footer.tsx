import logoFooter from '../../../assets/cbve/logo_footer.png'
import instagram from '../../../assets/social/instagram.svg'
import youtube from '../../../assets/social/youtube.svg'
import linkedin from '../../../assets/social/linkedin.svg'

function Footer() {
    return(
    <>
        <footer className="bg-cinza-900 flex flex-col items-center pt-5">
            <img src={logoFooter} alt="LOGO" className='w-72'/>
            <p className='text-cinza-100 text-center text-sm'>Conselho brasileiro de voluntariado empresarial.</p>
            <h3 className='text-center text-cinza-100 text-lg mt-5'>Contate-nos</h3>
            
            <ul className='list-none text-cinza-100 text-sm '>
                <li className='mt-2'>Telefone: (21)3094-4555</li>
                <li className='mt-1'>Email: <a href="mailto:contato@cbve.org.br">contato@cbve.org.br</a></li>
            </ul>

            <p className='text-white text-center text-lg mt-5'>Redes Socias</p>
            <div className='flex gap-2 [&>*:hover]:scale-105 [&>*:hover]:cursor-pointer'>
                <img src={instagram} alt="instagram" className='w-10' />
                <img src={youtube} alt="instagram" className='w-10' />
                <img src={linkedin} alt="instagram" className='w-10' />
            </div>
                <a href="" className='text-white text-xs font-light mt-5 hover:underline'>Política de Privacidade</a>
                <p className='text-white text-xs font-light my-8'>© 2023 CBVE. Todos os direitos reservados.</p>
        </footer>
    </>
    )
}

export default Footer;