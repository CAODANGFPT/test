import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import LayoutAdmin from "./LayoutAdmin";

const AdminLayout = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  useEffect(() => {
    if (!darkMode) {
      localStorage.theme = "dark";
    } else {
      localStorage.theme = "light";
    }
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  const  user  = JSON.parse(localStorage.getItem("user") as string);
  if (!user) {
    return <Navigate to="/login" />
  }
  else if(user.user.role_id === 2){
    return <Navigate to="/" />
  }

  return (
    <div className="dark:bg-[#212226] bg-[#f2f2f2] w-[100%]">
      <LayoutAdmin darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="md:w-[calc(100%-219px)] w-[calc(100%-15px)] min-h-[calc(100vh)] md:ml-auto ml-0">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
