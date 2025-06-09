"use client";
import React from "react";
import { useEffect, useState, useMemo, useRef } from "react";

export default function Page(){
    type TabKey = 'profile';
    const [activeTab, setActiveTab] = useState<TabKey>("profile");
    const tabs: { id: TabKey; label: string }[] = [
      { id: "profile", label: "Personal Profile" },
    ];
    const componentsMap = {
      profile: <PForm subject="profile" formdata={[
        { id: "Name"},
        { id: "Display Name"},
        { id: "Phone number", type:"tel"},
        { id: "Email address", type:"email"},
        { id: "Gender", label: "Physical gender"}
      ]}/>,
    };

  return(

  <div className="layout-container flex h-full grow flex-col pt-16">
  <div className="px-40 flex flex-1 justify-center py-5">
  <div className="layout-content-container flex flex-col w-full flex-1">
    <h1 className="text-white tracking-light text-[32px] font-bold leading-tight px-4 text-center pb-3 pt-6">
      Account
    </h1>
    <div className="pb-3">
    <div className="flex border-b border-[#3b543b] px-4 gap-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex flex-col items-center justify-center pb-[13px] pt-4 transition duration-200
          ${activeTab === tab.id
            ? "border-b-[3px] border-b-white text-white font-bold"
            : "border-b-[3px] border-b-transparent hover:border-b-white text-[#9cba9c] hover:text-white"
          }`}>
          <p className="text-sm tracking-[0.015em] font-bold leading-normal">{tab.label}</p>
      </button>))}
    </div>
    </div>
    {componentsMap[activeTab] || <PForm/>}
  </div>
  </div>
  </div>
  )
}



/*再來是一些這個頁面的元件，將Button, Input, Form 針對此頁面做了一些小調整
  預計會用PForm 來操作、修改個人資料    */
type PFormProps={
  subject?:string
  formdata?:(PInputProps & { id: string })[]
};

function PForm({
  subject="",
  formdata=[],
}:PFormProps){

  /*根據formdata裡的item，生出一個 {item.id = ""} 的字典，是為initFormData*/
  const initFormData = useMemo<Record<string, string>>(() => {
    return formdata.reduce((acc, item) => {
      acc[item.id] = "";
      return acc;
    }, {} as Record<string, string>);
  }, [formdata]);
  
  const [formData, setFormData] = useState(initFormData);

  useEffect(() => {
    setFormData(initFormData);
  }, [initFormData]);

  const handleChange = (value:string,name:string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("儲存資料：", subject, formData);
  };
  /*按下ENTER會換行*/
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleKeyDown = (index:number) => (e:React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const next = inputRefs.current[index + 1];
      if (next) next.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-0">
      {formdata.map((tab,i) => (
      <PInput
      key={tab.id}
      inputRef={(el) => (inputRefs.current[i] = el)}
      onKeyDown={handleKeyDown(i)}
      label={tab.label || tab.id}
      value={formData[tab.id]||""}
      onChange={(e) => handleChange(e.target.value,tab.id)}
      placeholder={tab.placeholder}
      type={tab.type || ""}
      />))}
      <div className="flex px-4 py-3 justify-end">
        <PButton/>
      </div>
    </form>
  );
}

type PInputProps = {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  inputRef?: React.Ref<HTMLInputElement>;
};

function PInput({
  label = "",         value = "",
  onChange= ()=>{},           onKeyDown = ()=>{},
  placeholder = "",   type = "text",
  inputRef
}:PInputProps){
  return(
  <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
    <label className="flex flex-col min-w-40 flex-1">
      <p className="text-white text-base font-medium leading-normal pb-2">{label}</p>
      <input
        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 
        focus:ring-0 border-none bg-[#283928] focus:border-none h-14 placeholder:text-[#9cba9c] p-4 text-base font-normal"
        value={value}  placeholder = {placeholder}  type = {type}
        onChange={onChange}  onKeyDown = {onKeyDown}  ref = {inputRef}
      />
    </label>
  </div>
  )
}

type PButtonProps = {
  type?: "submit" | "button" | "reset";      
  text?: string;      
  onClick?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function PButton({
  type="submit",      text="Save Changes",      onClick=()=>{},
}:PButtonProps){

const [clicked, setClicked] = useState(false);
const [fade, setFade] = useState(false);
const Clicking=()=>{
    console.log("clicked");  onClick;
    setFade(true)
    setTimeout(() => {setClicked(true);}, 300);
    setTimeout(() => {setFade(false);}, 1300);
    setTimeout(() => {setClicked(false);}, 1600);
 };
  
  return(
    <button
      type={type}
      className="flex items-center justify-center gap-2 px-4 py-2 rounded bg-[#1ea61e] text-white font-bold 
      hover:bg-[#26d426] transition-all"
      onClick={Clicking}
    >
      {clicked ?
      <div className={`flex items-center justify-center gap-2 transition-opacity duration-350  w-[110px] h-[24px]
          ${fade ? "opacity-100" : "opacity-0"}`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-5 h-5 text-green-300">
          <path d="M2 21h4V9H2v12zM23 10.5c0-.83-.67-1.5-1.5-1.5h-6.29l.95-4.57.02-.22c0-.41-.17-.79-.44-1.06L15.17 2 8.59 
          8.59C8.22 8.95 8 9.45 8 10v9c0 .55.45 1 1 1h9.5c.64 0 1.2-.4 1.41-.99l2.03-6.01c.04-.13.06-.26.06-.4v-2.6z"/>
        </svg>
      </div>
      :<div className={`flex items-center justify-center gap-2 transition-opacity duration-350 w-[110px] h-[24px]
        ${fade ? "opacity-0" : "opacity-100"}`}>
        {text}
      </div>}
    </button>
  )

}