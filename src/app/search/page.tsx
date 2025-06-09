"use client";
import Items from "@/src/components/Items";
import { useEffect, useState, useMemo } from "react";
import Button from "@/src/components/ui/Button";
import Input from "@/src/components/ui/Input";

export default function Page() {
    type TabKey = keyof typeof componentsMap;
    
    const [activeTab, setActiveTab] = useState<TabKey>("stays");

    const formdata_Stay = [
        { id: "location", label: "location", placeholder: "City you'd like to stay in" },
        { id: "people", label: "people", placeholder: "Number of people joining" },
        { id: "date", label: "date", placeholder: "Preferred travel dates"},
        { id: "budget", label: "budget", placeholder: "Rough budget range (optional)"}
    ];
    const formdata_Flight = [
        { id: "departure", label: "departure", placeholder: "Starting point of your trip" },
        { id: "destination", label: "destination", placeholder: "Place you’re heading to" },
        { id: "date", label: "date", placeholder: "Travel date you have in mind"},
        { id: "people", label: "people", placeholder:"Number of seats needed"}
    ];
    const formdata_Food = [
        { id: "location", label: "location", placeholder: "City you’re eating in" },
        { id: "people", label: "people", placeholder: "Type of food you’re craving" },
        { id: "date", label: "date", placeholder: "Day or time you’re thinking of"},
        { id: "budget", label: "budget", placeholder: "Budget range (optional)"}
    ];
    const formdata_Ticket = [
        { id: "location", label: "location", placeholder: "City you want to explore" },
        { id: "people", label: "people", placeholder: "Number of people going" },
        { id: "date", label: "date", placeholder: "Preferred travel dates"},
        { id: "budget", label: "budget", placeholder: "Budget range (optional)"}
    ];

    const tabs:{id:TabKey, label:string}[] = [
        { id: "stays", label: "Stays" },
        { id: "flights", label: "Flights" },
        { id: "food", label: "Food" },
        { id: "tickets", label: "Tickets" },
    ];
    const componentsMap = {
        stays: <Form subject="Stay" formdata={formdata_Stay}/>,
        flights: <Form subject="Transportation" formdata={formdata_Flight}/>,
        food: <Form subject="Food" formdata={formdata_Food}/>,
        tickets: <Form subject="Tickets" formdata={formdata_Ticket}/>,
    } as const;

    return(
        <div className="layout-container flex h-full grow flex-col pt-16">
        <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <h1 className="text-white tracking-light text-[32px] font-bold leading-tight px-4 text-center pb-3 pt-6">
            Where to?
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
          {componentsMap[activeTab] || <Form subject="Stay" formdata={formdata_Stay}/>}
          <Items type="transport" start_time="8:00 AM" duration="1 hr" name="Yoga Class"/>
          <Items type="car" start_time="8:00 AM" duration="1 hr" name="Yoga Class"/>
          <Items type="airline" start_time="8:00 AM" duration="1 hr" name="Yoga Class"/>
          <Items type="ticket" start_time="8:00 AM" duration="1 hr" name="Yoga Class"/>
          <Items type="attraction" start_time="8:00 AM" duration="1 hr" name="Yoga Class"/>
          <Items type="stay" start_time="8:00 AM" duration="1 hr" name="Yoga Class"/>
        </div>
        </div>
        </div>
    );
}
type formdataProp = {
    id:string
    label:string
    placeholder?:string
};
type FormProp = {
    subject?:string
    formdata:formdataProp[]
};


function Form({
  subject="",
  formdata=[],
}:FormProp) {
    const initFormData = useMemo<Record<string, string>>(() => {
        return formdata.reduce((acc, item) => {
        acc[item.id] = "";
        return acc;
        }, {}as Record<string, string>);
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
        
        console.log("送出資料：", subject, formData);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-0">
        {formdata.map((tab) => (
        <Input
        key={tab.id}
        label={tab.label}
        value={formData[tab.id]||""}
        onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value,tab.id)}
        placeholder={tab.placeholder}
        />
                ))}

        <Button type="submit" text="search"/>
        </form>
    );
}