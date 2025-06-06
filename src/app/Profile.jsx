function Profile(){

  return(

    <div className="layout-container flex h-full grow flex-col">
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <p className="text-white text-center tracking-light text-[32px] font-bold leading-tight min-w-72">
              Account
          </p>
          <div className="flex flex-wrap justify-between gap-3 p-4">
          </div>
          <div className="pb-3">
            <div className="flex border-b border-[#3b543b] px-4 gap-8">
              <a
                className="flex flex-col items-center justify-center border-b-[3px] border-b-white text-white pb-[13px] pt-4"
                href="#"
              >
                <p className="text-white text-sm font-bold leading-normal tracking-[0.015em]">
                  Personal info
                </p>
              </a>
              <a
                className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#9cba9c] pb-[13px] pt-4"
                href="#"
              >
                <p className="text-[#9cba9c] text-sm font-bold leading-normal tracking-[0.015em]">
                  Payments and payouts
                </p>
              </a>
              <a
                className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#9cba9c] pb-[13px] pt-4"
                href="#"
              >
                <p className="text-[#9cba9c] text-sm font-bold leading-normal tracking-[0.015em]">
                  Settings
                </p>
              </a>
            </div>
          </div>
          <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            Personal info
          </h2>
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-white text-base font-medium leading-normal pb-2">
                First name
              </p>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#283928] focus:border-none h-14 placeholder:text-[#9cba9c] p-4 text-base font-normal leading-normal"
                defaultValue=""
              />
            </label>
          </div>
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-white text-base font-medium leading-normal pb-2">
                Last name
              </p>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#283928] focus:border-none h-14 placeholder:text-[#9cba9c] p-4 text-base font-normal leading-normal"
                defaultValue=""
              />
            </label>
          </div>
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-white text-base font-medium leading-normal pb-2">
                Email address
              </p>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#283928] focus:border-none h-14 placeholder:text-[#9cba9c] p-4 text-base font-normal leading-normal"
                defaultValue=""
              />
            </label>
          </div>
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-white text-base font-medium leading-normal pb-2">
                Phone number
              </p>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#283928] focus:border-none h-14 placeholder:text-[#9cba9c] p-4 text-base font-normal leading-normal"
                defaultValue=""
              />
            </label>
          </div>
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-white text-base font-medium leading-normal pb-2">
                Date of birth
              </p>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#283928] focus:border-none h-14 placeholder:text-[#9cba9c] p-4 text-base font-normal leading-normal"
                defaultValue=""
              />
            </label>
          </div>
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-white text-base font-medium leading-normal pb-2">
                Gender
              </p>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#283928] focus:border-none h-14 placeholder:text-[#9cba9c] p-4 text-base font-normal leading-normal"
                defaultValue=""
              />
            </label>
          </div>
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-white text-base font-medium leading-normal pb-2">
                Address
              </p>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#283928] focus:border-none h-14 placeholder:text-[#9cba9c] p-4 text-base font-normal leading-normal"
                defaultValue=""
              />
            </label>
          </div>
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-white text-base font-medium leading-normal pb-2">
                City
              </p>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#283928] focus:border-none h-14 placeholder:text-[#9cba9c] p-4 text-base font-normal leading-normal"
                defaultValue=""
              />
            </label>
          </div>
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-white text-base font-medium leading-normal pb-2">
                State
              </p>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#283928] focus:border-none h-14 placeholder:text-[#9cba9c] p-4 text-base font-normal leading-normal"
                defaultValue=""
              />
            </label>
          </div>
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-white text-base font-medium leading-normal pb-2">
                Zip code
              </p>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#283928] focus:border-none h-14 placeholder:text-[#9cba9c] p-4 text-base font-normal leading-normal"
                defaultValue=""
              />
            </label>
          </div>
          <div className="flex px-4 py-3 justify-end">
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#0ac10a] text-[#111811] text-sm font-bold leading-normal tracking-[0.015em]">
              <span className="truncate">Save changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Profile