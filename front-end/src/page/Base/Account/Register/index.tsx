import { Link, Navigate, useNavigate   } from "react-router-dom";
import { useForm } from 'react-hook-form';
import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";
import {
  useRegisterUserMutation
} from "@/api/auth";
import { IRegister } from "@/interface/auth";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch, setError } = useForm();
  const [registerForm] = useRegisterUserMutation();
  const onSubmit = async (data: Partial<IRegister>) => {
    try {
      const response = await registerForm(data) as { data: IRegister } | { error: FetchBaseQueryError | SerializedError };
      if ("error" in response) {
        setError("email", {
          type: "manual",
          message: "Email đã tồn tại"
        });
      } else {
        alert("Đăng ký thành công!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu đăng ký:", error);
    }
  };

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const isPasswordMatching = password === confirmPassword;
  const  user  = JSON.parse(localStorage.getItem("user") as string);
  if (user) {
    return <Navigate to="/" />
  }
  return (
    <div className="xl:max-w-[1200px] mx-auto lg:max-w-[1024px] md:max-w-[768px] max-w-[640px] px-3 md:p-0">
      <Breadcrumb name="Đăng ký" />
      <h1 className="text-2xl font-bold font-sans text-alizarin-crimson text-center pt-2 pb-4">
        Đăng ký tài khoản
      </h1>
      <div className="px-4">
        <h1 className="text-2xl font-normal mb-3">Đăng ký tài khoản</h1>
        <p className="text-sm mb-10">
          Nếu chưa có tài khoản vui lòng đăng ký tại đây.
        </p>
        <form
          action=""
          className="font-sans w-[100%] mx-auto grid md:grid-cols-2 grid-cols-1 gap-x-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <p className="after:content-['*'] after:text-alizarin-crimson after:pl-1 mb-2">Họ và tên</p>
            <input
              className="w-full h-10 border border-bright-gray placeholder:text-bright-gray placeholder:text-sm pl-5 rounded-sm outline-none"
              type="text"
              placeholder="Họ và tên"
              {...register('name', { required: "Họ và tên không được để trống" })}
            />
            {typeof errors.name?.message === 'string' && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <p className="after:content-['*'] after:text-alizarin-crimson after:pl-1 mb-2">Email</p>
            <input
              className="w-full h-10 border border-bright-gray placeholder:text-bright-gray placeholder:text-sm pl-5 rounded-sm outline-none"
              type="email"
              placeholder="Email"
              {...register('email', { required: "Email không được để trống" })}
            />
            {typeof errors.email?.message === 'string' && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <p className="after:content-['*'] after:text-alizarin-crimson after:pl-1 mb-2">Mật khẩu</p>
            <input
              className="w-full h-10 border border-bright-gray placeholder:text-bright-gray placeholder:text-sm pl-5 rounded-sm outline-none"
              type="password"
              placeholder="Mật khẩu"
              {...register('password', { required: "Mật khẩu không được để trống",  minLength: { value: 6, message: "Mật khẩu phải có ít nhất 6 kí tự" } })}
            />
            {typeof errors.password?.message === 'string' && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <div className="mb-4">
            <p className="after:content-['*'] after:text-alizarin-crimson after:pl-1 mb-2">
              Nhập lại mật khẩu
            </p>
            <input
              className="w-full h-10 border border-bright-gray placeholder:text-bright-gray placeholder:text-sm pl-5 rounded-sm outline-none"
              type="password"
              placeholder="Nhập lại mật khẩu"
              {...register('confirmPassword', { required: "Nhập lại mật khẩu không được để trống" })}
            />
            {typeof errors.confirmPassword?.message === 'string' && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            {!isPasswordMatching && <p className="text-red-500 text-sm">Mật khẩu không khớp</p>}
          </div>
          <div className="flex justify-start items-center gap-x-5 mt-7 mb-10">
            <Button title="đăng ký" />
            <Link
              className="font-sans text-sm underline text-davy-grey hover:text-alizarin-crimson"
              to="/login"
            >
              Đăng nhập
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
