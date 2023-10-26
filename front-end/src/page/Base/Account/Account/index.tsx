import Breadcrumb from "@/components/Breadcrumb";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { BsBodyText } from "react-icons/bs";
import { Link } from "react-router-dom";

const AccountPage = () => {
  const data = {
    name: "thuc",
    email: "thuc@gmail.com",
    password: "12345",
    role: "Admin",
  };
  return (
    <div className="xl:max-w-[1200px] mx-auto lg:max-w-[1024px] md:max-w-[768px] max-w-[640px] px-3 md:p-0">
      <Breadcrumb name="Tài khoản" />
      <h1 className="text-2xl font-bold font-sans text-alizarin-crimson text-center  pt-2 pb-4">
        Trang khách hàng
      </h1>
      <h1 className="text-lg font-bold mb-3 uppercase ">trang khách hàng</h1>
      <p className="text-sm mb-4">
        Tên tài khoản:<span className="font-bold px-2">{data.name}!</span>
      </p>
      <div className="flex flex-col text-red-500">
        <div className="flex items-center mb-2 ">
          <BsBodyText />

          <p className="px-2 text-black">Name: {data.name}</p>
        </div>
        <div className="flex items-center mb-2">
          <AiOutlineMail />
          <p className="px-2 text-black">Email: {data.email}</p>
        </div>
        <div className="flex items-center mb-2">
          <AiOutlineUser />
          <p className="px-2 text-black">Role: {data.role}</p>
        </div>
      </div>
      <Link
        to="/resetPassword"
        className="w-1/3 bg-red-500 text-white border rounded-xl p-2 px-4 hover:text-red-500 hover:bg-white"
      >
        Đổi mật khẩu
      </Link>
    </div>
  );
};

export default AccountPage;
