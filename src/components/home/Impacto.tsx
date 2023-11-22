function Impacto(){
    return(
    <>
    <div className='flex flex-col justify-center items-center md:px-52 gap-5 mb-5'>
        <h2 className='text-3xl md:text-5xl font-bold md:mb-6 text-cinza-900'>Nosso impacto:</h2>

        <div className='flex items-center md:flex-row flex-col justify-center md:rounded-full bg-laranja-500 text-white w-full md:h-40 h-full md:gap-0 gap-5'>
          <div className='w-full p-3 text-center flex flex-col'>
            <span className='font-bold text-xl'>+300</span>
            <span>Empresas parceiras</span>
          </div>

          <div className='w-full p-3 text-center flex flex-col'>
            <span className='font-bold text-xl'>+470</span>
            <span>Comunidades impactadas</span>
          </div>

          <div className='w-full p-3 text-center flex flex-col'>
            <span className='font-bold text-xl'>+2000</span>
            <span>Vidas transformadas</span>
          </div>
        </div>
    </div>
    </>
    )
}

export default Impacto