import "@/public/css/table.css";
import { Table } from "antd";
import ButtonAdmin from "@/components/ButtonAdmin";
import { useFetchListUserQuery } from "@/api/getuser";
const ListUser = () => {
  const { data } = useFetchListUserQuery();
  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "vai trò",
      dataIndex: "nameRole",
      key: "nameRole",
    },
    {
      title: "Hành động",
      dataIndex: "id",
      key: "",
      render: (text: number) => (
        <>
          <ButtonAdmin link={`/admin/user/${text}/edit`} title="Sửa" edit />
        </>
      ),
    },
  ];
  return (
    <>
      <h1 className="md:ml-16 md:text-left text-center mt-5 text-3xl font-semibold dark:text-white text-black">
        Danh sách user
      </h1>
      <Table
        columns={columns}
        dataSource={data}
        className=" bg-white md:w-[90%] md:ml-16 sm:mx-auto mx-2 rounded-md mt-5 border border-[#f0f0f0] w-[600px] overflow-x-scroll z-0"
      />
    </>
  );
};
export default ListUser;
