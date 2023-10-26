import { useLocation, useNavigate } from "react-router-dom";

import { useResetPasswordUserMutation } from "@/api/auth";
import ErrorIcon from "@/assets/ErrorIcon";
import SuccessIcon from "@/assets/SuccessIcon";
import Breadcrumb from "@/components/Breadcrumb";
import ModelConfirmPassword from "@/components/ModelConfirmPassword";
import { IPassword } from "@/interface/auth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    // setError,
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";
  const [open, setOpen] = useState<boolean>(false);
  const [resetPassword] = useResetPasswordUserMutation();
  const [text, setText] = useState<string>("");
  const [success, setSuccess] = useState<boolean>();
  const onSubmit = async (data: Partial<IPassword>) => {
    try {
      const dataForm = {
        ...data,
        email,
        token,
      };
      const reset = await resetPassword(dataForm);
      if ("error" in reset) {
        setText("Đổi mật khẩu thất bại");
        setOpen(true);
        setSuccess(false);
      } else {
        setText("Đổi mật khẩu thành công");
        setOpen(true);
        setSuccess(true);
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu đăng ký:", error);
    }
  };
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [open, navigate]);
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const isPasswordMatching = password === confirmPassword;
  return (
    <div className="xl:max-w-[1200px] mx-auto lg:max-w-[1024px] md:max-w-[768px] max-w-[640px] px-3 md:p-0">
      <Breadcrumb name="Thay đổi mật khẩu" />
      <h1 className="text-2xl font-bold font-sans text-alizarin-crimson text-center pt-2 pb-4">
        Thay đổi mật khẩu
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="font-sans w-[70%] mx-auto"
      >
        <div className="p-4">
          <p className="after:content-['*'] after:text-alizarin-crimson after:pl-1 mb-2">
            Mật khẩu mới
          </p>
          <input
            className="w-full h-10 border border-bright-gray placeholder:text-bright-gray placeholder:text-sm pl-5 rounded-sm outline-none"
            type="password"
            placeholder="mật khẩu mới"
            {...register("password", {
              required: "Mật khẩu không được để trống",
              minLength: {
                value: 6,
                message: "Mật khẩu phải có ít nhất 6 kí tự",
              },
            })}
          />
          {typeof errors.password?.message === "string" && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div className="p-4">
          <p className="after:content-['*'] after:text-alizarin-crimson after:pl-1 mb-2">
            Xác nhận mật khẩu mới
          </p>
          <input
            className="w-full h-10 border border-bright-gray placeholder:text-bright-gray placeholder:text-sm pl-5 rounded-sm outline-none"
            type="password"
            placeholder="xác nhận lại mật khẩu mới "
            {...register("confirmPassword", {
              required: "Nhập lại mật khẩu không được để trống",
            })}
          />
          {typeof errors.confirmPassword?.message === "string" && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
          {!isPasswordMatching && (
            <p className="text-red-500 text-sm">Mật khẩu không khớp</p>
          )}
        </div>
        <div className="flex justify-start items-center gap-x-5 mt-7 mb-10">
          <button className="font-sans border border-alizarin-crimson text-sm text-white bg-alizarin-crimson px-5 py-3 rounded-full hover:bg-white hover:text-alizarin-crimson">
            Đặt lại mật khẩu
          </button>
        </div>
      </form>
      <ModelConfirmPassword
        open={open}
        icon={success ? <SuccessIcon /> : <ErrorIcon />}
        setOpen={setOpen}
        text={text}
      />
    </div>
  );
};

export default ResetPassword;
