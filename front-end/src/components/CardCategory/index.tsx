import { useCateProductsQuery } from "@/api/category";
import { ICategory } from "@/interface/Category";
interface ICardCategory {
  category: ICategory;
}
const CardCategory = ({ category }: ICardCategory) => {
  const { data: cateProducts } = useCateProductsQuery(category.id || 0);
  const quantity = cateProducts?.length;

  return (
    <div className="group relative overflow-hidden cursor-pointer">
      <div className="transition-transform group-hover:scale-110 group-hover:duration-500 group-hover:ease-in-out">
        <img className="w-full" src={category.image} alt="" />
      </div>
      <div className="overlay absolute top-[55%] left-0 right-0 h-96 bg-gradient-to-b from-[rgba(0,0,0,0.01)] to-[rgba(0,0,0,0.9)]"></div>
      <div className="transition-transform group-hover:translate-y-[-20px] group-hover:duration-500 group-hover:ease-in-out  absolute w-full bottom-8 left-0 top-auto">
        <p className="text-white text-center font-bold text-3xl md:text-xl group-hover:text-alizarin-crimson ease-in-out duration-300 ">
          {category.name}
        </p>
        <p className="text-white text-center translate-y-16 group-hover:translate-y-0 ease-in-out duration-300">
          {quantity} sản phẩm
        </p>
      </div>
    </div>
  );
};

export default CardCategory;
