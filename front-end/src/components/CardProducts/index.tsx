import { IProduct } from "@/interface/Product";
import { Link } from "react-router-dom";

type TProducts = {
  product: IProduct;
};

const CardProducts = ({ product }: TProducts) => {
  return (
    <Link to={`/products/${product.id}`} className="p-2 ">
      <div className="relative border-2 border-dotted ">
        <img
          src={product.image}
          className="w-full h-auto mb-2 cursor-pointer"
        />
        <div className="absolute top-0 left-0 w-[125px] h-[65px]">
          <img
            src="https://bizweb.dktcdn.net/100/347/092/themes/708609/assets/hot.png?1688367658721"
            alt=""
          />
        </div>
        <p className=" font-semibold text-center p-2 hover:text-red-500 cursor-pointer">
          {product.name}
        </p>
      </div>
      <div className="flex justify-between items-center border-t-0 border-2 border-dotted p-2">
        <div>
          <p className="text-sm font-bold text-red-500 cursor-pointer">
            {product.discount.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
          <p className="text-xs text-black line-through cursor-pointer">
            {product.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
        </div>
        <button className="border p-0.5  bg-red-500 text-white hover:text-red-500 hover:bg-white cursor-pointer">
          Chi tiết
        </button>
      </div>
    </Link>
  );
};

export default CardProducts;
