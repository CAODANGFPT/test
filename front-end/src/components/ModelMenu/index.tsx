import { useFetchCategoryQuery } from "@/api/category";
import { Link } from "react-router-dom";

const ModelMenu = () => {
  const { data: categories } = useFetchCategoryQuery();
  return (
    <div className="absolute top-[50px] left-0 z-20 hidden bg-white text-black w-60 group-hover:block hover:block shadow-2xl">
      <ul className="text-start normal-case font-normal">
        {categories?.map((category) => (
          <Link key={category.id} to={`/productsCategory/${category.id}`}>
            <li className="py-3 px-2 border-b-2 border-gray-100 hover:bg-alizarin-crimson hover:text-white cursor-pointer">
              {category.name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default ModelMenu;
