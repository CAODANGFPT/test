import "@/public/css/table.css";
import { Skeleton, Table } from "antd";
import { useFetchProductsQuery, useRemoveProductMutation } from "@/api/product";
import ButtonAdmin from "@/components/ButtonAdmin";

const ListProducts = () => {
  const { data, isLoading, refetch } = useFetchProductsQuery();
  const [removeProducts] = useRemoveProductMutation();
  const remoteProducts = async (id: number) => {
    try {
      await removeProducts(id);
      refetch();
    } catch (error) {
      console.error("Failed to remove news", error);
    }
  };
  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <>
          <img
            src={image}
            alt="Product"
            style={{ width: "50px", height: "50px" }}
          />
        </>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Giảm giá",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "hành động",
      dataIndex: "id",
      key: "",
      render: (text: number) => (
        <>
          <ButtonAdmin link={`/admin/products/${text}/edit`} title="Sửa" edit />
          <button
            onClick={() => remoteProducts(text)}
            className="font-sans border border-alizarin-crimson text-sm text-white bg-alizarin-crimson px-5 py-1 rounded-3xl hover:bg-white hover:text-alizarin-crimson ml-2"
          >
            xóa
          </button>
        </>
      ),
    },
  ];
  if (isLoading) return <Skeleton />;
  return (
    <>
      <h1 className="mt-5 text-3xl font-semibold text-center text-black md:ml-16 md:text-left dark:text-white">
        Danh sách sản phẩm
      </h1>
      <div className="my-2 text-3xl font-semibold text-center md:ml-14 md:text-left">
        <ButtonAdmin title="Thêm sản phẩm" link="add" add />
      </div>
      <Table
        columns={columns}
        dataSource={data}
        className=" bg-white md:w-[90%] md:ml-16 sm:mx-auto mx-2 rounded-md mt-5 border border-[#f0f0f0] w-[600px] overflow-x-scroll z-0"
      />
    </>
  );
};

export default ListProducts;
