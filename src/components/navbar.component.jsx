import { Link, Outlet } from "react-router-dom";
import logo from "../imgs/logo.png";
import { CiSearch } from "react-icons/ci";
import { useContext, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { UserContext } from "../App";
import { FaRegBell } from "react-icons/fa";
import UserNavigationPanel from "./user-navigation.component";


const Navbar = () => {
  const [search, setSearch] = useState(false);
  const [userNavPanel , setUserNavPanel ] = useState(false);

  const {userAuth } = useContext(UserContext);
  console.log(userAuth)
  return (
    <>
      <nav className="navbar ">
        <Link to="/" className="flex-none w-10">
          <img src={logo} className="w-full" />
        </Link>

        <div
          className={`absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show ${
            search ? "show" : "hide"
          } `}
        >
          <input
            type="text"
            placeholder="Search"
            className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6  rounded-full placeholder:text-dark-grey"
          />
        </div>

        <div className="flex items-center gap-3 md:gap-6 ml-auto">
          <button
            className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center hover:opacity-80"
            onClick={() => setSearch(!search)}
          >
            <CiSearch className="text-2xl font-bold" />
          </button>

          <Link
            to="/editor"
            className="hidden md:flex gap-2 link items-center justify-center"
          >
            <FiEdit />
            write
          </Link>
          {
            userAuth?.access_token ? 
            <>
              <Link to='dashboard/notification'>
                <button className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/10 flex items-center justify-center">
                  <FaRegBell className="text-2xl" />
                </button>
              </Link>
              <div className="relative">
                <button className="w-12 h-12 mt-1" onClick={() => setUserNavPanel(!userNavPanel)}>
                  <img src={userAuth?.profile_img} className="w-full h-full object-cover rounded-full" />
                </button>

                {
                userNavPanel ? <UserNavigationPanel /> : ''
                }
              </div>
            </>
            :
            <>
              <Link to="/signin" className="btn-dark py-2 ">
                Sign-In
              </Link>
              <Link to="/signup" className="btn-light py-2 hidden md:block">
                Sign-Up
              </Link>
            </>
          }


        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
