import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { useLoginUserMutation } from "@/api/auth";
import ErrorIcon from "@/assets/ErrorIcon";
import SuccessIcon from "@/assets/SuccessIcon";
import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";
import ModelConfirmPassword from "@/components/ModelConfirmPassword";
import { ILogin } from "@/interface/auth";
import { pause } from "@/utils/pause";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loginForm] = useLoginUserMutation();
  const [open, setOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [success, setSuccess] = useState<boolean>();
  const onSubmit = async (data: Partial<ILogin>) => {
    const login = (await loginForm(data)) as { data: ILogin };
    if ("error" in login) {
      setText("Tài khoản mật khẩu không chính xác");
      setSuccess(false);
      setOpen(true);
    } else {
      if(login.data && login.data.user.role_id === 3 ){
        setText("Tải khoản bị khóa");
        setOpen(true);
        setSuccess(false);
      } else{
        localStorage.setItem("user", JSON.stringify(login.data));
        setText("Đăng nhập thành công");
        setOpen(true);
        setSuccess(true);
        await pause(2000);
        login.data.user.role_id === 1 ? navigate("/admin") : navigate("/");
      }
    }
  };
  const user = JSON.parse(localStorage.getItem("user") as string);
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <div className="xl:max-w-[1200px] mx-auto lg:max-w-[1024px] md:max-w-[768px] max-w-[640px] px-3 md:p-0">
      <Breadcrumb name="Đăng nhập" />
      <h1 className="text-2xl font-bold font-sans text-alizarin-crimson text-center pt-2 pb-4">
        Đăng nhập tài khoản
      </h1>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="font-sans w-[70%] mx-auto"
      >
        <h1 className="text-2xl font-normal mb-3">Đăng nhập tài khoản</h1>
        <p className="text-sm mb-10">
          Nếu bạn đã có tài khoản, đăng nhập tại đây.
        </p>
        <div className="mb-4">
          <p className="after:content-['*'] after:text-alizarin-crimson after:pl-1 mb-2">
            Email
          </p>
          <input
            className="w-full h-10 border border-bright-gray placeholder:text-bright-gray placeholder:text-sm pl-5 rounded-sm outline-none"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {typeof errors.email?.message === "string" && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <p className="after:content-['*'] after:text-alizarin-crimson after:pl-1 mb-2">
            Mật khẩu
          </p>
          <input
            className="w-full h-10 border border-bright-gray placeholder:text-bright-gray placeholder:text-sm pl-5 rounded-sm outline-none"
            type="password"
            placeholder="Mật khẩu"
            {...register("password")}
          />
          {typeof errors.password?.message === "string" && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div className="flex justify-start items-center gap-x-5 mt-7 mb-10">
          <Button title="đăng nhập" />
          <Link
            className="font-sans text-sm underline text-davy-grey hover:text-alizarin-crimson"
            to="/register"
          >
            Đăng ký
          </Link>
        </div>
        <span className="md:text-sm text-xs mr-1">
          Bạn quên mật khẩu? lấy lại mật khẩu
        </span>
        <Link
          className="md:text-sm text-xs underline hover:text-alizarin-crimson"
          to="/forgotPassword"
        >
          tại đây
        </Link>
      </form>
      <ModelConfirmPassword
        open={open}
        setOpen={setOpen}
        icon={success ? <SuccessIcon /> : <ErrorIcon />}
        text={text}
      />
    </div>
  );
};

export default Login;
