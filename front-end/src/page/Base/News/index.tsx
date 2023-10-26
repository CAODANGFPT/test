import { useFetchNewsQuery } from "@/api/news";
import Breadcrumb from "@/components/Breadcrumb";
import CardNews from "@/components/CardNews";
import ModelCategory from "@/components/ModelCategory";
import ModelProduct from "@/components/ModelSale";

const NewsPage = () => {
  const { data: listNews } = useFetchNewsQuery();
  return (
    <div className="xl:max-w-[1200px] lg:max-w-[1024px] md:max-w-[768px] max-w-[640px]  mx-auto xl:px-0  lg:px-3 md:px-3 px-3 md:p-0 font-sans mb-10">
      <Breadcrumb name="Tin tức" />
      <h1 className="text-center text-2xl font-bold text-[#ea2f38]">Tin tức</h1>
      <div className="w-full flex flex-col-reverse lg:flex-row gap-4">
        <div className="basis-1/4">
          <div>
            <h2 className="my-3 text-sm font-bold">DANH MỤC</h2>
            <ModelCategory />
          </div>
          <div>
            <h2 className="my-3 text-sm font-bold">SIÊU BÃO VỀ GIÁ</h2>
            <ModelProduct />
          </div>
        </div>
        <div className="basis-3/4 grid grid-cols-1 lg:grid-cols-2 h-fit gap-5">
          {listNews?.map((item) => (
            <div key={item.id}>
              <CardNews news={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
