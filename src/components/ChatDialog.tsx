import React, { useRef, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import useMCP from '../hooks/useMCP';
import Bubble from './SpeechBubble';

export default function ChatDialog() {
    const router = useRouter();
    const { interpret, search } = useMCP();
    const [ message, setMessage ] = React.useState<string>('');
    const [ messages, setMessages ] = React.useState<Array<{ speaker: string; message: string }>>([]);
    const [ mcpLoading, setMcpLoading ] = React.useState<boolean>(false);

    const chatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatRef.current) {
          // 把滾動條移到容器底部
          chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    });

    const handleSand = async () => {
        if (!message.trim()) return;

        setMessages(prev => [...prev, { speaker: 'User', message }]);
        setMessage('');
        setMcpLoading(true);

        try {
            const response = await interpret(message);
            setMessages(prev => [...prev, { speaker: 'LM', message: response.message }]);
            if (response.status === 'success') {
                console.log("enough information for searching");
                const type = response.service_type;
                const data = response.data;
                console.log("type:", type, "data:", data);
                search(type, data);
            }
        } catch (error) {
            console.error('Error interpreting message:', error);
            setMessages(prev => [...prev, { speaker: 'LM', message: 'Sorry, I could not understand that.' }]);
        } finally {
            setMcpLoading(false);
        }
    }

    return (
        <div className="fixed bottom-4 right-20 z-25 transition-all px-4 py-2 max-w-[600px]">
        <div className="layout-container flex flex-col w-[600px] h-[400px] bg-[#445244] text-white shadow-lg rounded-xl px-6 py-4 animate-fadeIn transition-all relative">
            <div className="flex flex-wrap justify-between gap-3 py-4">
                <p className="text-white tracking-light text-[24px] font-bold leading-tight w-36">
                    Chat with us
                </p>
                <p className="text-white text-[16px] font-normal leading-normal">
                    Ask us anything about your booking or travel plans. We're here to help!
                </p>
            </div>

            <div className="flex flex-col gap-3 py-4 overflow-y-auto" ref={chatRef}>
                {messages.map((msg, index) => (
                    <Bubble
                        key={index}
                        speaker={msg.speaker}
                        message={msg.message}
                    />
                ))}
            </div>

            <div className="flex items-center py-3  gap-3 sticky bottom-5 right-0 w-full">
            <label className="flex flex-col min-w-40 h-12 flex-1 ">
                <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                    <input
                        type='text'
                        placeholder="Type your message..."
                        className="form-input flex flex-1 resize-none overflow-hidden rounded-xl text-white 
                        focus:outline-0 focus:ring-0 border-none bg-[#283928] focus:border-none h-full 
                        placeholder:text-[#9cba9c] px-4 rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSand();
                            }
                        }}
                    />
                    <div className="flex border-none bg-[#283928] items-center justify-center rounded-r-xl border-l-0 !pr-2">
                    <div className="flex items-center gap-4 justify-end">
                        <button className="min-w-[84px] cursor-pointer overflow-hidden rounded-full h-8 px-4 bg-[#c98402] text-white text-sm font-medium leading-normal hover:bg-[#d99748]" onClick={() => handleSand()}>
                            <span className="tru</div>ncate">Send</span>
                        </button>
                    </div>
                    </div>
                </div>
            </label>
            </div>
        </div>
        </div>
    );
}