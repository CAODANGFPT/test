import "@/public/css/hiddenScrollBar.css";

import { Link } from "react-router-dom";

import { useFetchCategoryQuery } from "@/api/category";
import { useFetchProductsQuery, useTop6ProductsQuery } from "@/api/product";
import CardCategory from "@/components/CardCategory";
import CardProducts from "@/components/CardProducts";
import Carousel from "@/components/Carousel";
import { ICategory } from "@/interface/Category";
import { IProduct } from "@/interface/Product";

const slide = [
  {
    id: 1,
    image:
      "https://bizweb.dktcdn.net/100/347/092/themes/708609/assets/slider_1.jpg?1688378513890",
  },
  {
    id: 2,
    image:
      "https://bizweb.dktcdn.net/100/347/092/themes/708609/assets/slider_2.jpg?1688378513890",
  },
  {
    id: 3,
    image:
      "https://bizweb.dktcdn.net/100/347/092/themes/708609/assets/slider_3.jpg?1688378513890",
  },
  {
    id: 4,
    image:
      "https://bizweb.dktcdn.net/100/347/092/themes/708609/assets/slider_5.jpg?1688378513890",
  },
];


const HomePage = () => {
  const { data: Categories } = useFetchCategoryQuery();
  const { data: products } = useFetchProductsQuery();
  const { data: productTop6 } = useTop6ProductsQuery();

  return (
    <div className="bg-slate-100">
      <div>
        <Carousel autoSlide={true} slides={slide} />
      </div>
      <div className="xl:max-w-[1200px] mx-auto lg:max-w-[1024px] md:max-w-[768px] max-w-[640px] py-10">
        <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-4 xl:px-0 lg:px-0 px-4">
          {Categories?.map((item: ICategory) => (
            <Link to={`/productsCategory/${item.id}`} key={item.id}>
              <CardCategory category={item} />
            </Link>
          ))}
        </div>
        <div className="my-10 xl:px-0 lg:px-0 px-4 bg-white ">
          <p className="uppercase text-[30px] text-center py-4">
            sản phẩm bán chạy
          </p>
          <div className="pb-5">
            <div className="overflow-x-auto w-[98%] mx-[1%] scrollbar-hide">
              <div className="flex lg:w-[1400px] w-[1000px] gap-x-5">
                {productTop6?.map((item: IProduct) => (
                  <div key={item.id}>
                    <CardProducts product={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 bg-white lg:px-0 px-4">
          <p className="uppercase text-[30px] text-center pt-4">sản phẩm</p>
          <div className="grid md:grid-cols-5 sm:grid-cols-3 min-[420px]:grid-cols-2 grid-cols-1 w-full gap-5 p-5">
            {products?.map((item: IProduct) => (
              <div key={item.id}>
                <CardProducts product={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
