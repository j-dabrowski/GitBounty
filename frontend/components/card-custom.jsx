export default function CardCustom({
    title,
    id,
    name,
    issueUrl,
    avatar,
    repo,
    description,
    isIssueIdIncluded,
    handleClick
    
  }){
    const shortenedDescription = description.substring(0, 50) + "...";
      
return(
    
    <div className=" transition ease-out duration-500  hover:scale-105  p-3 flex-row sm:flex jussm:justify-between bg-[#f2f6ff] hover:bg-slate-200 h-fit rounded-lg border-solid border-lilaSuave border-4">
            <div className=" flex flex-col items-center w-[100%] sm:w-[20%] p-2">
                <p className=" italic text-sm mb-[5px] text-[#757e94]">Issue created by</p>
                <img src={avatar} width="100%" className=" border-0 rounded-full mb-[5px] w-[20%] sm:w-[80%]" ></img>
                <p className=" text-lg text-[#757e94] font-semibold">{name}</p>
            </div>
            <div className="flex flex-col items-center justify-between w-[100%] sm:w-[65%] p-2">
            <p className=" italic text-sm mb-[5px] text-[#757e94]">Issue with ID <span className=" font-bold">#{id}</span></p>
                <h2 className=" text-2xl text-lila font-semibold">{title}</h2>
                <p className=" text-base mb-[5px] text-[#757e94] pl-4 pr-4">{shortenedDescription}</p>
                
            </div>
            <div className="flex justify-center items-center w-[100%] sm:w-[20%]">
            {isIssueIdIncluded ? (
                                <div className=" text-center bg-red-700  text-white font-bold py-2 px-4 border-b-4  border-red-200  rounded">
                                  Already Created
                                </div>
                              ) : (
                                <button
                                  onClick={() =>
                                    handleClick(name,id, issueUrl ,repo)
                                  }
                                  className="bg-lila animate-pulse hover:bg-lilaSuave text-white font-bold py-2 px-4 border-b-4 border-lilaSuave hover:border-lila rounded"
                                >
                                  Create Bounty
                                </button>
                              )}
            </div>
        </div>
    
)
}