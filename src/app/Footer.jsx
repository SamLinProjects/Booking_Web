'use client';
import { useState, useEffect, useRef } from "react";

export default function Footer(){
    const chatRef = useRef(null);
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        if (chatRef.current) {
        // 把滾動條移到容器底部
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [showDialog]);

    return(
        <>
            <button onClick={() => setShowDialog(!showDialog)} 
            className="flex max-w-[480px] cursor-pointer items-center justify-center 
            overflow-hidden rounded-full h-14 bg-[#1ea61e] text-[#111811] text-base font-bold 
            leading-normal tracking-[0.015em] min-w-0 px-2 gap-4 pl-4 pr-6 fixed right-6 bottom-3 z-50">
                <div
                    className="text-[#111811]"
                    data-icon="ChatCircleDots"
                    data-size="24px"
                    data-weight="regular"
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                    >
                    <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,
                    12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,
                    219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,
                    88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,
                    8,0,0,1,4,1.08A88,88,0,0,0,216,128Z" />
                    </svg>
                </div>
            </button>

            {showDialog && (
                <div className="fixed bottom-4 right-13 z-25 transition-all">
                <div className="layout-container flex flex-col w-[600px] h-[400px] bg-[#445244] text-white 
                shadow-lg rounded-xl px-6 py-4 animate-fadeIn transition-all relative">
                    <div className="flex flex-wrap justify-between gap-3 py-4">
                    <p className="text-white tracking-light text-[24px] font-bold leading-tight w-36">
                        Chat with us
                    </p>
                    <p className="text-white text-[16px] font-normal leading-normal">
                        Ask us anything about your booking or travel plans. We're here to help!
                    </p>
                    </div>

                    <div className="flex flex-col gap-3 py-4 overflow-y-auto "
                    ref={chatRef}>
                    <Dialog speaker="LM" words="Hi there! How can I assist you today?"/>
                    <Dialog speaker="User" words="I want to take a trip to Japan. "/>
                    <Dialog speaker="LM" words="Sounds great! When do you want to go?"/>
                    <Dialog speaker="User" words="Probably somtime in July. "/>
                    </div>

                    <div className="flex items-center py-3  gap-3 sticky bottom-5 right-0 w-full">
                    <label className="flex flex-col min-w-40 h-12 flex-1 ">
                        <div className="flex w-full flex-1 items-stretch rounded-xl h-full">

                        <input
                            placeholder="Type your message..."
                            className="form-input flex flex-1 resize-none overflow-hidden rounded-xl text-white 
                            focus:outline-0 focus:ring-0 border-none bg-[#283928] focus:border-none h-full 
                            placeholder:text-[#9cba9c] px-4 rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal"
                            defaultValue=""
                        />
                        <div className="flex border-none bg-[#283928] items-center justify-center rounded-r-xl border-l-0 !pr-2">
                            <div className="flex items-center gap-4 justify-end">
                                <button className="flex items-center gap-1 justify-center p-1.5">
                                <div
                                    className="text-[#9cba9c]"
                                    data-icon="Image"
                                    data-size="20px"
                                    data-weight="regular"
                                >
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
            
                                    width="20px"
                                    height="20px"
                                    fill="currentColor"
                                    viewBox="0 0 256 256"
                                    >
                                    <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,
                                    16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,
                                    0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,
                                    181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z" />
                                    </svg>
                                </div>
                                </button>
                            <button className="min-w-[84px] cursor-pointer items-center justify-center overflow-hidden 
                            rounded-full h-8 px-4 bg-[#09b809] text-white text-sm font-medium leading-normal">
                                <span className="truncate">Send</span>
                            </button>
                            </div>
                        </div>

                        </div>
                    </label>
                    </div>

                </div>
                </div>
            )}
        </>
    )
}

function Dialog({
  speaker="LM",
  words=""
}){

  const metrics={
    LM:{bg:"bg:[#9cba9c]", align:"self-start", name:"Bookoo"},
    User:{bg:"bg:[#9cba9c]", align:"self-end", name:"You"}
  }

const metric=metrics[speaker]
  return(

<div className={`flex flex-1 flex-col gap-1 item-start ${metric.align} ${metric.bg}`}>
  <p className={`text-[#9cba9c] text-[13px] font-normal leading-normal max-w-[360px] ${metric.align}`}>
    {metric.name}
  </p>
  <p className="text-base font-normal leading-normal flex max-w-[360px] rounded-xl px-4 py-3 bg-[#283928] text-white">
    {words}
  </p>
</div>


  )
}
