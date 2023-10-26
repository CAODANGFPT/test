import { useFetchCategoryQuery } from "@/api/category";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

interface IModelMenuResponsive {
  link: string;
  title: string;
}

const ModelMenuResponsive = ({ title, link }: IModelMenuResponsive) => {
  const [openModel, setOpenModel] = useState<boolean>(false);

  const { data: categories } = useFetchCategoryQuery();

  return (
    <>
      <div
        onClick={() => setOpenModel(!openModel)}
        className="flex items-center justify-start "
      >
        <Link className="" to={link}>
          <p>{title}</p>
        </Link>
        <div className="ml-auto">
          <IoIosArrowDown
            className={
              openModel
                ? "origin-center rotate-180 ease-in-out duration-500"
                : "origin-center rotate-0 ease-in-out duration-500"
            }
          />
        </div>
      </div>
      <div
        className={
          openModel
            ? "h-[190px] overflow-hidden ease-in-out duration-500"
            : "h-0 overflow-hidden ease-in-out duration-500"
        }
      >
        <ul className="">
          {categories?.map((category) => (
            <li key={category.id} className="border-b-2 border-gray-100 py-[5px]">
              <Link
                to={`/productsCategory/${category.id}`}
                className="py-[10px] pl-[30px] pr-[10px] relative before:absolute before:top-[16px] before:left-[10px] before:w-[9px] before:h-[9px] before:border-2 before:border-[#d7d7d7] before:rounded-[50%]"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ModelMenuResponsive;
