
function Header(){
return(
    <>
    <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
      Image Captioning 
      <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
        {" "} for Users
      </span>
    </h1>
    <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
      Enhance your content with AI-powered image captions. Automate descriptions effortlessly and make your visuals more engaging today.
    </p>
    <div className="mt-10"></div>
  </>
)};

export default Header
