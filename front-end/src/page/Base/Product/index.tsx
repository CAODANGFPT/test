import Breadcrumb from "@/components/Breadcrumb";
import ModelCategory from "@/components/ModelCategory";
import CardProducts from "@/components/CardProducts";
import ModelProduct from "@/components/ModelSale";
import { useFetchProductsQuery } from "@/api/product";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useCateProductsQuery } from "@/api/category";
import { IProduct } from "@/interface/Product";

const ProductPage = () => {
  const location = useLocation();
  const { id } = useParams();

  const [data, setData] = useState<IProduct[]>();

  const { data: listProducts } = useFetchProductsQuery();
  const { data: cate } = useCateProductsQuery(Number(id));

  useEffect(() => {
    if (location.pathname !== "/products") {
      setData(cate);
    } else {
      setData(listProducts);
    }
  }, [cate, listProducts, location.pathname]);

  return (
    <div className="xl:max-w-[1200px] lg:max-w-[1024px] md:max-w-[768px] max-w-[640px]  mx-auto xl:px-0  lg:px-3 md:px-3 px-3 md:p-0 font-sans mb-10">
      <Breadcrumb name={"Sản phẩm"} />
      <h1 className="text-center text-2xl font-bold text-[#ea2f38]">
        Sản Phẩm
      </h1>
      <div className="w-full lg:grid xl:grid lg:grid-cols-3 xl:grid-cols-3 flex flex-col-reverse gap-4 ">
        <div className=" xl:col-span-1 lg:col-span-1">
          <div>
            <ModelCategory />
          </div>
          <div>
            <h2 className="text-sm font-bold my-3">SIÊU BÃO VỀ GIÁ</h2>
            <ModelProduct />
          </div>
        </div>
        <div className="lg:col-span-2 xl:col-span-2 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 h-fit">
          {data?.map((item) => (
            <div key={item.id}>
              <CardProducts product={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
