import { useGetProductsByIdQuery, useTop6ProductsQuery } from "@/api/product";
import Breadcrumb from "@/components/Breadcrumb";
import CardProducts from "@/components/CardProducts";
import ModelDelivery from "@/components/ModelDelivery";
import { useEffect, useState } from "react";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { IProduct } from "@/interface/Product";
import {
  useAddToOrderMutation,
  useFetchOrderUserQuery,
  useUpdateQuantityOrderMutation,
} from "@/api/order";
import { message } from "antd";
import { IOrder } from "@/interface/Oder";
const ProductDetailPage = () => {
  const { id } = useParams();
  const { data: products } = useTop6ProductsQuery();

  const [AddToOrder, { reset }] = useAddToOrderMutation();
  const { user } = JSON.parse(localStorage.getItem("user") as string);
  const { data: order } = useFetchOrderUserQuery(user.id);
  const { data: product } = useGetProductsByIdQuery(Number(id));
  const [updateOrderMutation] = useUpdateQuantityOrderMutation();
  const [quantityProduct, setQuantityProduct] = useState<number>(1); 
  const [idOrder, setIdOrder] = useState<number>(1); 
  const [quatity, setQuatity] = useState<number>(1);
  const Cong = () => {
    setQuatity(quatity + 1);
  };
  const Tru = () => {
    if (quatity >= 2) {
      setQuatity(quatity - 1);
    } else {
      setQuatity(quatity);
    }
  };
  useEffect(() => {
    if(order) {
      const orderItem = order.find((item: IOrder) => item.productId === Number(id));
      if (orderItem) {
        const { quantity } = orderItem;
        const { id } = orderItem;
        setIdOrder(id);
        setQuantityProduct(quantity);
      }
      
    }
  },[id, order])
  const addToCart = async () => {
    const isProductInCart = order?.some(
      (item) => item.productId === Number(id)
    );
    if (!isProductInCart) {
      if (product) {
        const cartItem = {
          userId: user?.id,
          productId: Number(id),
          name: product.name,
          image: product.image,
          price: product.discount,
          quantity: quatity,
          quantityProduct: product.quantity
        };
        try {
          await AddToOrder(cartItem).unwrap();
          message.success("Add to cart  successfully");
          reset();
        } catch (error) {
          message.error("Failed add to cart product");
          console.log(cartItem);  
        }
      }
    } else {
      try {
        const quantity = quatity+quantityProduct;
        await updateOrderMutation({ id: idOrder, quantity:quantity });
        message.success("Add to cart  successfully");
        reset();
      } catch (error) {
        message.error("Failed add to cart product");
      }
    }
  };
  return (
    <div className="xl:max-w-[1200px] lg:max-w-[1024px] md:max-w-[768px] max-w-[640px]  mx-auto xl:px-0  lg:px-3 md:px-3 px-3 md:p-0 font-sans mb-10">
      <Breadcrumb nameLink="Sản phẩm" link="/products" name={product?.name} />
      <h1 className="text-center text-2xl font-bold text-[#ea2f38]">
        Chi tiết sản phẩm
      </h1>
      <div className="w-full xl:flex lg:flex gap-4 mt-10">
        <div className="w-full">
          <div className="xl:flex lg:flex md:flex justify-center items-start gap-x-10">
            <img
              className="basis-2/5 md:w-1/2 w-full cursor-pointer"
              src={product?.image}
              alt=""
            />
            <div className="flex flex-col gap-y-2 basis-3/5 md:mt-0 mt-5">
              <h1 className="text-2xl font-semibold cursor-pointer">
                {product?.name}
              </h1>
              <div className="text-base font-normal flex items-center">
                <p>Thương Hiệu:</p>
                <p className="px-1 text-blue-500 cursor-pointer">
                  {product?.brand}
                </p>
                |<p className="p-1">Kho:</p>
                <p className="text-blue-500 cursor-pointer">
                  {product?.quantity ? "Còn hàng" : "Hết hàng"}
                </p>
              </div>
              <div className="flex items-end gap-x-2">
                <p className="text-3xl font-semibold text-red-500 cursor-pointer">
                  {product?.discount.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
                <p className="text-base text-[#8d90a6] line-through font-light cursor-pointer">
                  {product?.price?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              </div>
              <p className="text-base font-medium py-2">
                Ship COD toàn quốc | Miễn phí đổi size, đổi mẫu trong 1 tuần !!!
              </p>
              <div className="flex justify-start items-center gap-x-3 py-2">
                <p className="text-base font-medium">số lượng:</p>
                <div className="flex justify-start items-center">
                  <button
                    onClick={() => Tru()}
                    className="border-2 border-black px-3 py-1 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="border-2 border-black border-x-0 py-1 w-10 text-center">
                    {quatity}
                  </span>
                  <button
                    onClick={() => Cong()}
                    className="border-2 border-black px-3 py-1 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-5">
                <button className="sm:text-lg text-base font-semibold text-white bg-alizarin-crimson border-2 border-[#f8babd] rounded-full hover:text-alizarin-crimson hover:bg-white hover:border-alizarin-crimson w-full py-3 flex justify-center items-center gap-x-2">
                  <RiMoneyDollarCircleFill />
                  Mua ngay
                </button>
                <button
                  onClick={addToCart}
                  className="sm:text-lg text-base font-semibold text-white bg-alizarin-crimson border-2 border-[#f8babd] rounded-full hover:text-alizarin-crimson hover:bg-white hover:border-alizarin-crimson w-full py-3 flex justify-center items-center gap-x-2"
                >
                  <AiOutlineShoppingCart />
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="border rounded text-center p-2 bg-red-500 text-white mt-3">
              MÔ TẢ SẢN PHẨM
            </div>
            <p className="border-2 rounded p-2 leading-7">
              {product?.description}
            </p>
          </div>
        </div>
        <div className="w-1/3">
          <ModelDelivery />
        </div>
      </div>

      <div className="border rounded text-center p-2 bg-red-500 text-white mt-3">
        sản phẩm liên quan
      </div>
      <div className="overflow-x-auto overflow-hidden w-full mx-auto">
        <div className="flex xl:w-[1400px] lg:w-[1400px] w-[1000px]">
          {products?.map((item: IProduct) => (
            <CardProducts product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
