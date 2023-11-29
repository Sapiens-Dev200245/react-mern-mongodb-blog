import { FaRegUser } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { LuKey } from "react-icons/lu";

const InputBox = ({name , type , id , value , placeholder}) => {
    return ( 
        <div className="relative w-full mb-4">
            <input 
                name = {name}
                type= {type}
                placeholder={placeholder}
                defaultValue={value}
                id={id}
                className="input-box "
            />
            {
                type === 'text' 
                ? <FaRegUser className="input-icon" />
                :type === 'email'? <MdOutlineEmail className="input-icon" />
                : <LuKey className="input-icon" />
            }   
        </div>
     );

}
 
export default InputBox;