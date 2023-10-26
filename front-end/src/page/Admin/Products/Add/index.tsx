import { useFetchCategoryQuery } from "@/api/category";
import { useAddProductMutation } from "@/api/product";
import { IProduct } from "@/interface/Product";
import { Button, Form, Input, InputNumber, Select, Skeleton, Upload, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const ProductAdd = () => {
  const [addProductMutation, { reset, isLoading: isAddLoading }] = useAddProductMutation();
  const { data: categoryList = [] } = useFetchCategoryQuery();
  const navigate = useNavigate();
  const onFinish = async (values: IProduct) => {
    const {
      name,
      brand,
      price,
      discount,
      quantity,
      description,
      category_id,
    } = values;
    const productData = {
      name,
      image: image,
      brand,
      price,
      discount,
      quantity,
      description,
      category_id,
    };
    try {
      await addProductMutation(productData).unwrap();
      message.success("Product added successfully");
      reset();
      navigate("/admin/products");
    } catch (error) {
      message.error("Failed to add product");
      console.log(productData);
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
        Thêm sản phẩm
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
              <span className="text-base dark:text-white">Tên sản phẩm</span>
            }
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
          >
            <Input className="dark:hover:border-[#00c6ab] transition-colors duration-300" />
          </Form.Item>
          <Form.Item
            label={
              <span className="text-base dark:text-white">Ảnh sản phẩm</span>
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
                className="drop-container w-full"
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
          <Form.Item
            label={
              <span className="text-base dark:text-white">Thương hiệu</span>
            }
            name="brand"
            rules={[{ required: true, message: "Vui lòng nhập thương hiệu!" }]}
          >
            <Input className="dark:hover:border-[#00c6ab] transition-colors duration-300" />
          </Form.Item>
          <Form.Item
            label={
              <span className="text-base dark:text-white">Giá sản phẩm</span>
            }
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm!" }]}
          >
            <InputNumber min={1} className="dark:hover:border-[#00c6ab] w-full transition-colors duration-300" />
          </Form.Item>
          <Form.Item
            label={<span className="text-base dark:text-white">Giảm giá</span>}
            name="discount"
            rules={[{ required: true, message: "Vui lòng nhập giảm giá!" }]}
          >
            <InputNumber min={1} className="dark:hover:border-[#00c6ab] w-full transition-colors duration-300" />
          </Form.Item>
          <Form.Item
            label={<span className="text-base dark:text-white">Số lượng</span>}
            name="quantity"
            rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
          >
            <InputNumber min={1} className="dark:hover:border-[#00c6ab] w-full transition-colors duration-300" />
          </Form.Item>
          <Form.Item
            label={<span className="text-base dark:text-white">Mô tả</span>}
            name="description"
          >
            <TextArea rows={4} className="dark:hover:border-[#00c6ab] transition-colors duration-300"/>
          </Form.Item>
          <Form.Item
            name="category_id"
            label={<span className="text-base dark:text-white">Danh mục</span>}
            rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
          >
            <Select className="">
              {categoryList.map((category) => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
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
                            "Thêm sản phẩm"
                        )}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default ProductAdd;
