import { useState } from "react";
import { Link } from "react-router-dom";

import { useEmailPasswordUserMutation } from "@/api/auth";
import ErrorIcon from "@/assets/ErrorIcon";
import SuccessIcon from "@/assets/SuccessIcon";
import Breadcrumb from "@/components/Breadcrumb";
import ModelConfirmPassword from "@/components/ModelConfirmPassword";
import { IEmail } from "@/interface/auth";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const [resetPassword] = useEmailPasswordUserMutation();
  const [open, setOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [success, setSuccess] = useState<boolean>();
  const onSubmit = async (data: Partial<IEmail>) => {
    try {
      const response = (await resetPassword(data)) as
        | { data: IEmail }
        | { error: FetchBaseQueryError | SerializedError };
      if ("error" in response) {
        setError("email", {
          type: "manual",
          message: "Email không tồn tại",
        });
        setText("Email không tồn tại");
        setSuccess(false);
        setOpen(true);
      } else {
        setText("Bạn vui lòng check email");
        setSuccess(true);
        resetPassword(data);
        setOpen(true);
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu đăng ký:", error);
    }
  };
  return (
    <div className="xl:max-w-[1200px] mx-auto lg:max-w-[1024px] md:max-w-[768px] max-w-[640px] px-3 md:p-0">
      <Breadcrumb name="Lấy lại mật khẩu" />
      <h1 className="text-2xl font-bold font-sans text-alizarin-crimson text-center pt-2 pb-4">
        Lấy lại mật khẩu
      </h1>
      <form
        className="font-sans w-[70%] mx-auto "
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-normal mb-6">Lấy lại mật khẩu</h1>
        <p className="text-sm mb-10">
          Bạn quên mật khẩu? Nhập địa chỉ email để lấy lại mật khẩu qua email.
        </p>
        <div className="mb-4">
          <p className="after:content-['*'] after:text-alizarin-crimson after:pl-1 mb-2">
            Email
          </p>
          <input
            className="w-full h-10 border border-bright-gray placeholder:text-bright-gray placeholder:text-sm pl-5 rounded-md outline-none"
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email không được để trống" })}
          />
          {typeof errors.email?.message === "string" && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="flex justify-start items-center gap-x-5 mt-7 mb-10">
          <button className="font-sans border border-alizarin-crimson text-sm text-white bg-alizarin-crimson px-5 py-3 rounded-full hover:bg-white hover:text-alizarin-crimson">
            Đặt lại mật khẩu
          </button>
          <Link
            className="font-sans text-sm underline text-davy-grey hover:text-alizarin-crimson"
            to="/login"
          >
            Đăng nhập
          </Link>
        </div>
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

export default ForgotPassword;
