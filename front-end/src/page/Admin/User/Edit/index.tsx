import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Form, Select, message } from "antd";

import ButtonAdmin from "@/components/ButtonAdmin";
import { IRoleUser } from "@/interface/auth";
import { useGetUserByIdQuery } from "@/api/auth";
import { useFetchRoleQuery } from "@/api/role";
import { IRole } from "@/interface/role";
import { useUpdateUserMutation } from "@/api/getuser";

const UpdateUser = () => {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [updateUserRoleMutation, {reset}] = useUpdateUserMutation();
  const { data } = useGetUserByIdQuery(Number(id));
  const { data: role1 } = useFetchRoleQuery();
  const [ role, setRole ] = useState<IRole[]>([])
  const navigate = useNavigate();

  useEffect(() => {
    if(role1){
      setRole(role1)
    }
    form.setFieldsValue({
      role_id: data?.role_id,
    });
  }, [data, role1]);

  const onFinish = async (values: { role_id: number }) => {
    try {
      const updatedUser: IRoleUser = {
        id: Number(id),
        role_id: values.role_id,
      };

      await updateUserRoleMutation(updatedUser).unwrap();
      message.success("Vai trò người dùng đã được cập nhật thành công");
      reset();
      navigate("/admin/user");
    } catch (error) {
      console.error("Error updating user role:", error);
      message.error("Có lỗi xảy ra khi cập nhật vai trò người dùng");
      reset();
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  if (!data) {
    return null;
  }
  return (
    <>
      <h1 className="md:ml-16 md:text-left text-center mt-5 text-3xl font-semibold dark:text-white text-black">
        Chỉnh sửa vai trò người dùng #{id}
      </h1>
      <div className="md:ml-14 md:text-left text-center my-2 text-3xl font-semibold">
        <ButtonAdmin title="Quay lại" link="/admin/user" />
      </div>
      <div className="md:ml-16 sm:mx-auto mx-2 mt-5">
        <Form
          form={form}
          name="updateUserRoleForm"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label="Vai trò"
            name="role_id"
            rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
          >
            <Select className="">
              {role.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default UpdateUser;
