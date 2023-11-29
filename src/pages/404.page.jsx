import pageNotFoundImage from "../imgs/404.png"
import {Link} from "react-router-dom"
import fulllogo from '../imgs/full-logo.png'
const PageNoteFound = () => {
    return ( 
        <section className="h-cover relative p-10 flex flex-col items-center gap-20 text-center">
            <img  src={pageNotFoundImage} className="select-none border-2 border-grey w-72 aspect-square object-cover rounded"/>
            <h1 className="text-4xl text-gelasio leading-7">Page not found</h1>
            <p className="text-dark-grey text-xl leading-7 -mt-8">The page you are looking for does not exits Head back to the 
            <Link to={'/'} className="text-black underline pl-4">
                home page
            </Link>
            </p>
            <div className="mt-auto">
                <img src={fulllogo} className="h-8 object-contain block mx-auto select-none" />
                <p className="text-dark-grey mt-5">Read million of story around the world</p>
            </div>
        </section>
     );
}
 
export default PageNoteFound;