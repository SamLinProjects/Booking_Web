import { useEffect, useState, useMemo } from "react";
import Input from "./Input";
import Button from "./Button"

export default function Form({
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
                value={formData[tab.id] || ""}
                onChange={(e) => handleChange(e.target.value, tab.id)}
                placeholder={tab.placeholder}
            />
        ))}
        <Button type="submit" text="search"/>
        </form>
    );
}

/* 這些是以前的寫法，留著以備不時（紀）之需（念）

const [formData, setFormData] = useState({
    current_type: "stay",
    location: "",
    people: "",
    date: "",
    budget:"",
  });

<form onSubmit={handleSubmit} className="p-4 space-y-0">
      <Input
        label="location"
        value={formData.location}
        onChange={(e) => handleChange(e.target.value,"location")}
        placeholder="which city to stay"
      />
      <Input
        label="people"
        value={formData.people}
        onChange={(e) => handleChange(e.target.value,"people")}
        placeholder="how many people to stay"
      />
      <Input
        label="date"
        value={formData.date}
        onChange={(e) => handleChange(e.target.value,"date")}
        placeholder="when to stay"
      />
      <Input
        label="budget"
        value={formData.budget}
        onChange={(e) => handleChange(e.target.value,"budget")}
        placeholder="how much do you like to spend"
      />
      <Button type="submit" text="search"/>
    </form>
    */