export default function CardCustom({title,id}){

return(
    <div className="flex w-[400px] sm:w-[800px] bg-slate-300 h-fit border-gray-100 rounded">
        <div className="flex flex-col justify-center items-center">
            <div>
                <p>{title}</p>
            </div>
            <div>
                <p>{id}</p>
            </div>


        </div>
    </div>
)
}