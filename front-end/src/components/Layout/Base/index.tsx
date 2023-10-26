import { Outlet, useLocation } from "react-router-dom";

import FooterBase from "./Footer";
import HeaderBase from "./Header";
import { useEffect } from "react";

const LayoutBase = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <HeaderBase />
      <Outlet />
      <FooterBase />
    </>
  );
};

export default LayoutBase;
