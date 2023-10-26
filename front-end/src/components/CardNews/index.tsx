import { INews } from "@/interface/News";
import { Link } from "react-router-dom";

type TCardNews = {
  news: INews;
};

const CardNews = ({ news }: TCardNews) => {
  return (
    <div className="">
      <Link
        to={`/news/${news.id}`}
        className="xl:grid xl:grid-cols-3 lg:grid lg:grid-cols-3 md:grid md:grid-cols-3 cursor-pointer"
        key={news.id}
      >
        <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 w-full mb-2 cursor-pointer">
          <img className="w-full" src={news.image} alt="" />
        </div>
        <div className="xl:col-span-2 lg:col-span-2 md:col-span-2 lg:pl-4 xl:pl-4 md:pl-4 ">
          <h3 className="lg:text-base xl:text-base text-sm font-bold pb-1 pt-3 md:pt-0 lg:pt-0 xl:pt-0 hover:text-alizarin-crimson">
            {news.name}
          </h3>
          <div className="h-16 overflow-hidden">
            <div className="line-clamp-2 lg:text-base xl:text-base text-sm font-normal">
              {news.description}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardNews;
