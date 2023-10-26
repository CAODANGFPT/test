import { useFetchCategoryQuery } from "@/api/category";
import { Link } from "react-router-dom";
const ModelCategory = () => {
  const { data: category } = useFetchCategoryQuery();
  return (
    <div className="px-4 pb-4 border border-slate-200">
      <ul>
        {category?.map((item) => {
          return (
            <li className=" py-4 cursor-pointer" key={item.id}>
              <div className="flex justify-between items-center hover:text-red-500 text-sm">
                <Link to={`/productsCategory/${item.id}`}>{item.name}</Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ModelCategory;
