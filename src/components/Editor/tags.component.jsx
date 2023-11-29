import { useContext } from "react";
import { IoClose } from "react-icons/io5";
import { EditorContext } from "../../pages/editor.pages";
import {toast} from 'react-hot-toast'
const Tag = ({tag , tagIndex}) => {
    let {blog, setBlog} = useContext(EditorContext);

const handleTagDelete = () => {
    let tags = blog?.tags;
    tags = tags.filter(t => t != tag);
    setBlog({...blog , tags})
};

const handleEditTag = (ev) => {
    if(ev.keyCode === 13 || ev.keyCode === 188){
        ev.preventDefault();
        let tags = blog?.tags;
        let currentTag = ev.target.innerText;
        tags[tagIndex] = currentTag;
        setBlog({...blog,tags })
        console.log(tags)
        ev.target.setAttribute("contentEditable" , false);
    }
}
const addEditor = (e) => {
    e.target.setAttribute("contenEditable" , true);
    e.focus();
}


    return ( 
        <div className="relative p-2 mt-2 mr-2 px-5 bg-white rounded-full inline-block hover:bg-opacity-50 pr-8 ">
            <p 
                className="outline-none" 
                contentEditable 
                onKeyDown={handleEditTag}
                onClick={addEditor}
            >{tag}</p>
            <button className="mt-[2px] rounded-full absolute right-2 top-1/2 -translate-y-1/2" onClick={handleTagDelete}>
                <IoClose className="text-xl pointer-events-none"  />
            </button>
        </div>
     );
}
 
export default Tag;