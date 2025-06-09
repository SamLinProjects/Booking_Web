import React, { useState, useRef, useEffect } from 'react';
import Input from "./Input";
export default function Dropdown({ 
    label = "",
    options = [{value:"",label:""}], 
    value = "", 
    onChange, 
    placeholder = "請選擇...", 
    searchable = true
  }){
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);
  
    // 過濾選項
    const filteredOptions = searchable 
      ? options.filter(option => 
          option.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : options;
  
    // 點擊外部關閉
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
          setSearchTerm('');
        }
      };
      console.log(value);
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
  
    const handleSelect = async (option) => {
      console.log("選擇的值:", option.value);
      await onChange(option.value);
      setIsOpen(false);
      console.log("value:", value);
      setSearchTerm(option.label);
    };
  
    return (
        <label className="block px-4 py-3 w-full relative">
        {label && (
          <span className="block mb-1 text-sm font-bold text-white font-bold leading-normal">
            {label}
          </span>
        )}
        <div className="flex items-stretch h-12 min-w-40 w-full rounded-xl">
            <div
                  className="text-[#9cba9c] flex border-none bg-[#283928] items-center justify-center pl-4 rounded-l-xl border-r-0"
                  data-icon="MagnifyingGlass"
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
                    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                  </svg>
            </div>
            <input type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#283928] focus:border-none h-full placeholder:text-[#9cba9c] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
            onClick={() => setIsOpen(!isOpen)}/>
            </div>
  
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-[#283928] border border-[#9cba9c] rounded-lg shadow-lg max-h-60 overflow-auto" ref={dropdownRef}>
            <div className="py-1">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text--[#9cba9c] text-center">
                  {searchTerm ? '找不到符合的選項' : '沒有可選項目'}
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`
                      w-full px-4 py-3 text-left hover:bg-[#3c543c] flex items-center justify-between
                      transition-colors duration-150
                      ${option.value === value ? 'bg-[#9cba9c] text-[#283928]' : 'text-[#9cba9c]'}
                    `}
                    onClick={() => handleSelect(option)}
                  >
                    <span>{option.label}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </label>
    );
  };