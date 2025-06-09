function Input({
    label,
    value,
    onChange,
    placeholder = "",
    type = "text",
    defaultValue = "",
    onKeyDown = ()=>{},
  }) {
    return (
      <label className="block px-4 py-3 w-full">
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
            <input
              type={type}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              defaultValue={defaultValue}
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#283928] focus:border-none h-full placeholder:text-[#9cba9c] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
              onKeyDown={onKeyDown}
          />
        </div>
      </label>
    );
  }
  export default Input
