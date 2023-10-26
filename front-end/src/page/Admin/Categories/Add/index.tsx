import { useState } from "react";
import { Button, Form, Input, Skeleton, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useAddCategoryMutation } from "@/api/category";
import { ICategory } from "@/interface/Category";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const CategoryAdd = () => {
  const [addCategoryMutation, { reset, isLoading: isAddLoading }] =
    useAddCategoryMutation();
  const navigate = useNavigate();
  const onFinish = async (values: ICategory) => {
    const { name } = values;
    const categoryData = {
      name,
      image: image,
    };
    try {
      await addCategoryMutation(categoryData).unwrap();
      message.success("Category added successfully");
      reset();
      navigate("/admin/categories");
    } catch (error) {
      message.error("Failed to add category");
      console.log(categoryData);
    }
  };

  const onFinishFailed = (values: any) => {
    console.log("Failed:", values);
  };
  const [image, setImage] = useState<any | null>(null);
  const handleImageChange = (info: any) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      setImage(info.file.response.url);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  if (isAddLoading) return <Skeleton />;

  return (
    <>
      <h1 className="mt-5 text-3xl font-semibold text-center text-black md:ml-16 md:text-left dark:text-white">
        Thêm danh mục
      </h1>
      <div className="bg-white dark:bg-[#38383B] p-10 md:w-[90%] md:ml-16 sm:mx-auto mx-2 mt-5 shadow-lg rounded ">
        <Form
          className="w-4/5 dark:text-white"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label={
              <span className="text-base dark:text-white">Tên danh mục</span>
            }
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
          >
            <Input className="dark:hover:border-[#00c6ab] transition-colors duration-300" />
          </Form.Item>
          <Form.Item
            label={
              <span className="text-base dark:text-white">Ảnh danh mục</span>
            }
            name="picture-card"
            rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
          >
            <Upload
              name="file"
              action="https://api.cloudinary.com/v1_1/dqqfnp0hk/image/upload"
              data={{
                upload_preset: "asm-web209",
                cloud_name: "dqqfnp0hk",
              }}
              showUploadList={false}
              className="ant-upload-wrapper ant-upload-select"
              onChange={handleImageChange}
            >
              <label
                htmlFor="images"
                className="w-full drop-container"
                id="dropcontainer"
              >
                <div
                  className={
                    !image
                      ? "flex justify-center flex-col items-center"
                      : "hidden"
                  }
                >
                  <span className="drop-title">Thả tập tin ở đây</span>
                  <p>hoặc</p>
                  <Button>Tải lên</Button>
                </div>
                {image && (
                  <label
                    htmlFor="images"
                    className="flex items-center justify-center w-full h-full cursor-pointer"
                  >
                    <img className="w-auto h-full" src={image} alt="Selected" />
                  </label>
                )}
              </label>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              className="text-black transition-colors duration-300 dark:text-white"
              size="large"
            >
              {isAddLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                "Thêm danh mục"
              )}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default CategoryAdd;
