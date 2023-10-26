import "@/public/css/table.css";
import { Skeleton, Table } from "antd";
import { useFetchNewsQuery, useRemoveNewsMutation } from "@/api/news";
import ButtonAdmin from "@/components/ButtonAdmin";
const ListNews = () => {
  const { data, isLoading, refetch } = useFetchNewsQuery();
  const [removeNews] = useRemoveNewsMutation();
  const remoteNews = async (id: number) => {
    try {
      await removeNews(id);
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
      render: (text: string) => (
        <div className="tooltip truncate max-w-xs">{text}</div>
      ),
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
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (text: string) => (
        <div className="tooltip truncate max-w-xs">{text}</div>
      ),
    },
    {
      title: "Hành Động",
      dataIndex: "id",
      key: "",
      render: (text: number) => (
        <>
          <ButtonAdmin link={`/admin/news/${text}/edit`} title="Sửa" edit />
          <button
            onClick={() => remoteNews(text)}
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
      <h1 className="md:ml-16 md:text-left text-center mt-5 text-3xl font-semibold dark:text-white text-black">
        Danh sách tin tức
      </h1>
      <div className="md:ml-14 md:text-left text-center my-2 text-3xl font-semibold">
        <ButtonAdmin title="Thêm tin tức" link="add" add />
      </div>
      <Table
        columns={columns}
        dataSource={data}
        className=" bg-white md:w-[90%] md:ml-16 sm:mx-auto mx-2 rounded-md mt-5 border border-[#f0f0f0] w-[600px] overflow-x-scroll z-0"
      />
    </>
  );
};
export default ListNews;
