import Items from "../components/Items";
import { useEffect, useState, useMemo } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";


export default function Search(){

    const [activeTab, setActiveTab] = useState("stays");

    const formdata_Stay = [
        { id: "location", label: "location", placeholder: "which city to stay" },
        { id: "people", label: "people", placeholder: "how many people to stay" },
        { id: "date", label: "date", placeholder: "when to stay"},
        { id: "budget", label: "budget", placeholder: "how much do you like to spend"}
    ];
    const formdata_Flight = [
        { id: "departure", label: "departure", placeholder: "the origin of your trip" },
        { id: "destination", label: "destination", placeholder: "the destination of the flight" },
        { id: "date", label: "date", placeholder: "when to fly"},
        { id: "people", label: "people", placeholder:"how many seat to book"}
    ];
    const formdata_Food = [
        { id: "location", label: "location", placeholder: "restaurants at which city" },
        { id: "people", label: "people", placeholder: "what kind of food" },
        { id: "date", label: "date", placeholder: "when to eat"},
        { id: "budget", label: "budget", placeholder: "how much do you like to spend"}
    ];

    const tabs = [
        { id: "stays", label: "Stays" },
        { id: "flights", label: "Flights" },
        { id: "food", label: "Food" },
    ];
    const componentsMap = {
        stays: <Form subject="Stay" formdata={formdata_Stay}/>,
        flights: <Form subject="Flight" formdata={formdata_Flight}/>,
        food: <Form subject="Food" formdata={formdata_Food}/>,
    };

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
                    </button>
                ))}
            </div>
            </div>
            {componentsMap[activeTab]}
            <Items type="activity" start_time="8:00 AM" duration="1 hr" name="Yoga Class"/>
        </div>
        </div>
        </div>
    );
}

function Form({
  subject="",
  formdata=[],
}) {


/*將每個需要的資料寫成一個元素{ id: " ", label: " ", placeholder: " " };
    id 代表這個元素的名字，給我們自己看的 ;
    label 是顯示出來的名字，給網頁的使用者看的 ;
    placeholder 是表單裡input 顯示的提示詞，相對不太重要 ;
  然後將這些元素包成一個list，如：[{lst_element}, {2nd element}, ...]，就是formdata的參數。
  subject 是給我們自己看的東西，就是表單的名字。

  表單送出：subject ＋ 表單裡的文字。
*/

  const initFormData = useMemo(() => {
    return formdata.reduce((acc, item) => {
      acc[item.id] = "";
      return acc;
    }, {});
  }, [formdata]);
  
  const [formData, setFormData] = useState(initFormData);

  useEffect(() => {
    setFormData(initFormData);
  }, [initFormData]);

  const handleChange = (value,name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
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
      onChange={(e) => handleChange(e.target.value,tab.id)}
      placeholder={tab.placeholder}
    />
            ))}

      <Button type="submit" text="search"/>
    </form>
  );
}