import { useEffect, useRef, useState } from "react";
import {
  AiOutlineDashboard,
  AiOutlineMenu,
  AiOutlineUser,
} from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { BsFillMoonStarsFill, BsSunFill } from "react-icons/bs";
import { GoProjectRoadmap } from "react-icons/go";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Logo from "@/assets/logo-giay.png";
import AvatarImage from "@/assets/user.png";

interface ILayoutAdmin {
  darkMode: boolean;
  setDarkMode(value: boolean): void;
}

const LayoutAdmin = ({ darkMode, setDarkMode }: ILayoutAdmin) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [icon, setIcon] = useState<boolean>(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [Url, setUrl] = useState("");
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  const user = JSON.parse(localStorage.getItem("user") as string);
  const navigate = useNavigate();

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpenMenu(false);
    }
  };

  useEffect(() => {
    if (Url !== location.pathname) {
      setOpenMenu(false);
      setUrl(location.pathname);
    }
  }, [Url, location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsWideScreen(screenWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    if (isWideScreen) {
      setOpenMenu(false);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isWideScreen]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handledClick = () => {
    setDarkMode(!darkMode);
    setTimeout(() => {
      setIcon(!icon);
    }, 100);
  };

  const logOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  return (
    <>
      <div className="w-[100%] bg-white dark:bg-[#ffffff0d] border-b border-gray-300 dark:border-none">
        <div className="flex items-center justify-between mx-10 md:mx-20 md:justify-end">
          <div
            className="block px-2 cursor-pointer md:hidden"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <AiOutlineMenu className="text-3xl text-black dark:text-white" />
          </div>
          <div className="flex items-center justify-end my-2 gap-x-5">
            <button
              className={
                darkMode
                  ? "bg-white p-1 w-16 rounded-3xl ease-in-out duration-500 border border-yellow-500"
                  : "bg-gray-700 p-1 w-16 rounded-3xl ease-in-out duration-500 border border-gray-700"
              }
              onClick={() => handledClick()}
            >
              <div
                className={
                  darkMode
                    ? "text-3xl text-yellow-500 ml-7 ease-in-out duration-500"
                    : "text-3xl text-white pl-1 ml-0 ease-in-out duration-500"
                }
              >
                {icon ? (
                  <BsSunFill className="text-2xl" />
                ) : (
                  <BsFillMoonStarsFill className="text-2xl" />
                )}
              </div>
            </button>
            <div className="flex items-center gap-x-2">
              <img
                className="h-10 rounded-3xl"
                src={AvatarImage}
                alt="avatar"
              />
              <div>
                <div className="dark:text-white text-black text-md font-light">
                  {user.user.name}
                </div>
                <button
                  onClick={logOut}
                  className="px-3 py-1 rounded-2xl leading-4 font-medium dark:text-white text-[#00c6ab] dark:bg-[#00c6ab] border border-[#00c6ab] bg-white"
                >
                  đăng xuất
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={menuRef}
        className={
          openMenu
            ? "dark:bg-[#292A2E] bg-white w-[220px] border-r border-gray-300 dark:border-[#c2e0ff14] h-screen fixed top-0 overflow-hidden ease-in-out duration-500 ml-0 z-20"
            : "dark:bg-[#292A2E] bg-white w-[220px] border-r border-gray-300 dark:border-[#c2e0ff14] h-screen fixed top-0 overflow-hidden ease-in-out duration-500 md:ml-0 ml-[-220px] z-20"
        }
      >
        <Link to="/">
          <img className="w-[80%] mt-5 h-auto mx-auto" src={Logo} alt="logo" />
        </Link>
        <ul className="list-none flex flex-col gap-4 pt-8">
          <li className=" relative text-lg font-medium gap-x-2 text-black dark:text-[#e4e4e4] cursor-pointer">
            <Link
              to="/admin"
              className="absolute w-full pl-[25%] py-[14px] flex items-center gap-2 hover-div"
            >
              <AiOutlineDashboard className="text-3xl" />
              <h3>Dashboard</h3>
            </Link>
            <div className="dark:bg-[#00c6ab] bg-yellow-300 ease-in-out duration-500 w-0 rounded-r-3xl h-[56px] hover-effect"></div>
          </li>
          <li className=" relative  text-lg font-medium gap-x-2 text-black dark:text-[#e4e4e4] cursor-pointer">
            <Link
              to="products"
              className="absolute w-full pl-[25%] py-[14px] flex items-center gap-2 hover-div"
            >
              <GoProjectRoadmap className="text-3xl" />
              <h3>Products</h3>
            </Link>
            <div className="dark:bg-[#00c6ab] bg-yellow-300 ease-in-out duration-500 w-0 rounded-r-3xl h-[56px] hover-effect"></div>
          </li>
          <li className=" relative text-lg font-medium gap-x-2 text-black dark:text-[#e4e4e4] cursor-pointer">
            <Link
              to="categories"
              className="absolute w-full pl-[25%] py-[14px] flex items-center gap-2 hover-div"
            >
              <BiCategory className="text-3xl" />
              <h3>Category</h3>
            </Link>
            <div className="dark:bg-[#00c6ab] bg-yellow-300 ease-in-out duration-500 w-0 rounded-r-3xl h-[56px] hover-effect"></div>
          </li>
          <li className=" relative text-lg font-medium gap-x-2 text-black dark:text-[#e4e4e4] cursor-pointer">
            <Link
              to="news"
              className="absolute w-full pl-[25%] py-[14px] flex items-center gap-2 hover-div"
            >
              <BiCategory className="text-3xl" />
              <h3>News</h3>
            </Link>
            <div className="dark:bg-[#00c6ab] bg-yellow-300 ease-in-out duration-500 w-0 rounded-r-3xl h-[56px] hover-effect"></div>
          </li>
          <li className=" relative  text-lg font-medium gap-x-2 text-black dark:text-[#e4e4e4] cursor-pointer">
            <Link
              to="user"
              className="absolute w-full pl-[25%] py-[14px] flex items-center gap-2 hover-div"
            >
              <AiOutlineUser className="text-3xl" />
              <h3>User</h3>
            </Link>
            <div className="dark:bg-[#00c6ab] bg-yellow-300 ease-in-out duration-500 w-0 rounded-r-3xl h-[56px] hover-effect"></div>
          </li>
        </ul>
      </div>
      {openMenu && (
        <div className="fixed top-0 w-[100vw] h-[100vh] filter z-10"></div>
      )}
    </>
  );
};

export default LayoutAdmin;
