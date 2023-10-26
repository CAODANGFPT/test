import "@/public/css/table.css";
import { Table } from "antd";
import {
  useFetchCategoryQuery,
  useRemoveCategoryMutation,
} from "@/api/category";
import ButtonAdmin from "@/components/ButtonAdmin";

const ListCategories = () => {
  const { data: categories, refetch } = useFetchCategoryQuery();
  const [removeCategory] = useRemoveCategoryMutation();
  const remoteCategory = async (id: number) => {
    try {
      await removeCategory(id);
      refetch();
    } catch (error) {
      console.error("Failed to remove category", error);
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
      render: (text: string) => (
        <img className="w-28 h-auto" src={text} alt="" />
      ),
    },
    {
      title: "Hành động",
      dataIndex: "id",
      key: "id",
      render: (text: number) => (
        <>
          <ButtonAdmin
            link={`/admin/categories/${text}/edit`}
            title="Sửa"
            edit
          />
          <button
            onClick={() => remoteCategory(text)}
            className="font-sans border border-alizarin-crimson text-sm text-white bg-alizarin-crimson px-5 py-1 rounded-3xl hover:bg-white hover:text-alizarin-crimson ml-2"
          >
            xóa
          </button>
        </>
      ),
    },
  ];
  const dataSource = categories?.map((item) => ({
    id: item.id,
    name: item.name,
    image: item.image,
  }));
  return (
    <>
      <h1 className="mt-5 text-3xl font-semibold text-center text-black md:ml-16 md:text-left dark:text-white">
        Danh sách danh mục
      </h1>
      <div className="my-2 text-3xl font-semibold text-center md:ml-14 md:text-left">
        <ButtonAdmin title="Thêm danh mục" link="add" add />
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        className=" bg-white md:w-[90%] md:ml-16 sm:mx-auto mx-2 rounded-md mt-5 border border-[#f0f0f0] w-[600px] overflow-x-scroll z-0"
      />
    </>
  );
};

export default ListCategories;
