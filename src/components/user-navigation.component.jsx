import AnimationWrapper from "../common/page-animation";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { useContext } from "react";
import { UserContext } from "../App";
import { removeFromSession } from "../common/session";
const UserNavigationPanel = () => {
    const {userAuth , setUserAuth} = useContext(UserContext);
    const signOutUser = () => {
        removeFromSession("user");
        setUserAuth({access_token : null})

    }
    return (
        <AnimationWrapper
            transition={{duration : 0.2}}
            className='absolute right-0 z-50'
        >
            <div className="bg-white absolute right-0 border border-grey w-60 duration-200">
                <Link to='/editor' className="flex gap-2 link md:hidden pl-8 py-4 items-center jusify-center" >
                    <FiEdit />
                    write
                </Link>
                <Link to={`/user/${userAuth?.username}`} className="link pl-8 py-4">
                    profile
                </Link>
                <Link to={`/dashboard/blogs`} className="link pl-8 py-4">
                    Dashboard
                </Link>
                <Link to={`/setting/edit-profile`} className="link pl-8 py-4">
                    Settings
                </Link>

                <hr/>
                <button 
                onClick={signOutUser}
                className="text-left p-4 hover:bg-grey w-full pl-8 py-4">
                    <h1 className="font-bold text-xl mg-1">Sign Out</h1>
                    <p className="text-dark-grey ">@{userAuth?.username}</p>
                </button>
            </div>
        </AnimationWrapper>
    )
}

export default UserNavigationPanel;