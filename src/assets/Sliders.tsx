type Props = {
  title: string;
  describe: string;
  image: string;
  textButton: string;
};
function Sliders(props: Props) {
  return (
    <>
        <div className={props.image}>
          <div className="max-w-xl flex flex-col justify-center items-center py-10 md:items-start">
            <p className="mb-4 md:mb-4 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white">
              {props.title}
            </p>
            <p className="mb-8 md:mb-8 text-sm text-white lg:text-xl">
              {props.describe}
            </p>
            <button
              className="bg-roxo-300 hover:bg-roxo-400 px-28 py-4 md:px-6 md:py-3 rounded-2xl md:rounded-md text-white font-bold text-xs md:text-lg">
              {props.textButton}
            </button>
          </div>
          </div>
    </>
  );
}

export default Sliders;
