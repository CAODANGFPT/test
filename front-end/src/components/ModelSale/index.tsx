import { useTop6ProductsQuery } from "@/api/product";
import { Link } from "react-router-dom";

const ModelProduct = () => {
  const { data: product } = useTop6ProductsQuery();
  return (
    <div className="flex flex-col gap-4 ">
      {product?.map((item) => {
        return (
          <Link
            to=""
            className="p-2 border border-slate-200 border-dashed flex gap-2 cursor-pointer"
            key={item.id}
          >
            <img className="w-32" src={item.image} alt="" />
            <div>
              <p className="text-sm font-semibold h-[37px] overflow-hidden hover:text-alizarin-crimson ">
                {item.name}
              </p>
              <div>
                <p className="font-bold text-red-500">
                  {item.discount.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
                <p className="text-xs line-through">
                  {item.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ModelProduct;
