import { useState } from "react";

export default function Button({
    type="search",
    text="",
    onClick,
}){


  const [clicked, setClicked] = useState(false);
  const [fade, setFade] = useState(false);
  const Clicking=()=>{
      console.log("clicked");
      onClick;
      setFade(true)
      setTimeout(() => {
          setClicked(true);
      }, 300);
      setTimeout(() => {
          setFade(false);
      }, 1300);
      setTimeout(() => {
          setClicked(false);
      }, 1600);
   };
    
    
    return(
      <button
        type={type}
        className="flex items-center justify-center gap-2 px-4 py-2 rounded bg-[#1ea61e] text-white font-bold hover:bg-[#26d426] transition-all max-w-[200px]"
        onClick={Clicking}
      >
        {clicked ?<div
                className={`flex items-center justify-center gap-2 transition-opacity duration-350  w-[40px] h-[24px]
                ${fade ? "opacity-100" : "opacity-0"}`}>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                className="w-5 h-5 text-green-300"
              >
                <path d="M2 21h4V9H2v12zM23 10.5c0-.83-.67-1.5-1.5-1.5h-6.29l.95-4.57.02-.22c0-.41-.17-.79-.44-1.06L15.17 2 8.59 8.59C8.22 8.95 8 9.45 8 10v9c0 .55.45 1 1 1h9.5c.64 0 1.2-.4 1.41-.99l2.03-6.01c.04-.13.06-.26.06-.4v-2.6z" />
              </svg>
              </div>
                 :<div
                className={`flex items-center gap-2 transition-opacity duration-350 min-w-[40px] max-w-[200px] h-[24px]
                ${fade ? "opacity-0" : "opacity-100"}`}>
                {text}
              </div>
        }
      </button>
    )

}