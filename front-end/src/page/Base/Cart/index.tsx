import { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { Link, Navigate } from "react-router-dom";

import Breadcrumb from "@/components/Breadcrumb";
import { useFetchOrderUserQuery, useRemoveOrderMutation, useUpdateQuantityOrderMutation } from "@/api/order";
import { IOrder } from "@/interface/Oder";

const CartPage = () => {
  const [dataOrder, setdataOrder] = useState<any>([]);
  const  { user } = JSON.parse(localStorage.getItem("user") as string);
  const [updateOrderMutation] = useUpdateQuantityOrderMutation();
  const [removeOrderMutation] = useRemoveOrderMutation();
  const { data: order, refetch } = useFetchOrderUserQuery(user.id);
  useEffect(() => {
    if(order){
      setdataOrder(order)
    }
  }, [order]);
  const remoteProducts = async (id: number) => {
    try {
      const confirm = window.confirm("Bạn có muốn xóa");
      if(confirm){
        await removeOrderMutation(id);
        refetch();
      }
    } catch (error) {
      console.error("Failed to remove news", error);
    }
  };
  const handleDecreaseQuantity = (id: number) => {
    const cart = dataOrder.map((cartItem: { id: number; quantity: number; quantityProduct: number; }) =>
      cartItem.id === id && cartItem.quantity < cartItem.quantityProduct
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    setdataOrder(cart);
    updateOrderMutation({
        id: id,
        quantity: cart.find((item: { id: number }) => item.id === id)?.quantity
    });
  };
  const handleIncreaseQuantity = (id: number) => {
    const cart = dataOrder.map((cartItem: { id: number; quantity: number; }) =>
      cartItem.id === id && cartItem.quantity != 0
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
    const check = cart.find((item: { id: number }) => item.id === id)?.quantity;
    if(check > 0){
      updateOrderMutation({
        id: id,
        quantity: cart.find((item: { id: number }) => item.id === id)?.quantity
      });
      setdataOrder(cart);
    }else{
      const confirm = window.confirm("Bạn có muốn xóa");
      if(confirm){
        removeOrderMutation(id);
      }
    }
  };

  const calculateTotal = () => {
    let total = 0;
    dataOrder.forEach((item: { price: number; quantity: number; }) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  if (!user) {
    return <Navigate to="/login" />
  }
  return (
    <div className="xl:max-w-[1200px] mx-auto lg:max-w-[1024px] md:max-w-[768px] max-w-[640px] px-3 md:p-0 font-sans">
      <Breadcrumb name="Giỏ hàng" />
      <h3 className="text-alizarin-crimson text-center pt-2 font-bold text-2xl">
        Giỏ hàng
      </h3>
      <Link
        to="/"
        className="text-2xl font-semibold hover:text-alizarin-crimson"
      >
        Giỏ hàng của bạn
        <span className="text-sm font-normal text-slate-400 ml-1">
          (<span className="mr-1">{dataOrder.length}</span>sản phẩm)
        </span>
      </Link>
      {dataOrder.length <= 0 ? (
        <div className="text-sm font-normal">
          <p className="py-5">
            Không có sản phẩm nào trong giỏ hàng. Quay lại
            <Link to="/" className="hover:text-alizarin-crimson mx-1">
              cửa hàng
            </Link>
            để tiếp tục mua sắm
          </p>
        </div>
      ) : (
        <>
          <table className="w-full ">
            <thead className="hidden lg:table-header-group">
              <tr className="text-base font-sans w-full">
                <th className="w-5/8 text-left py-4">Sản phẩm</th>
                <th className="w-1/8">Giá</th>
                <th className="w-1/8">Số lượng</th>
                <th className="w-1/8">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {dataOrder.map((cartItem : IOrder) => (
                <tr className=" border-y border-slate-300  " key={cartItem.id}>
                  <td className="w-full lg:w-[70%] flex lg:items-center items-start gap-x-5 py-5">
                    <Link to="" className="w-[40%]">
                      <img
                        className="w-full h-auto"
                        src={cartItem.image}
                        alt=""
                      />
                    </Link>
                    <div className="w-[50%]">
                      <h3>
                        <Link
                          to=""
                          className="text-lg font-semibold font-sans hover:text-alizarin-crimson"
                        >
                          {cartItem.name}
                        </Link>
                      </h3>
                      <div className="block lg:hidden text-sm font-normal">
                        <span>Giá:</span>
                        <span className="ml-2 lg:hidden text-blue-700 text-center after:content-['₫']">
                          {cartItem.price}
                        </span>
                      </div>
                      <div className="my-2 lg:hidden flex justify-start items-center text-xs font-normal ">
                        <button
                          className="border border-slate-200 h-6 w-6 lg:h-8 lg:w-8"
                          onClick={() => handleIncreaseQuantity(cartItem.id)}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="border border-slate-200 h-6 w-6 lg:h-8 lg:w-8 text-center"
                          value={cartItem.quantity}
                        />
                        <button
                          className="border border-slate-200 h-6 w-6 lg:h-8 lg:w-8"
                          onClick={() => handleDecreaseQuantity(cartItem.id)}
                        >
                          +
                        </button>
                      </div>
                      <button onClick={() => remoteProducts(cartItem.id)} className="text-alizarin-crimson my-3 flex items-center text-sm font-normal">
                        <BiTrash />
                        <span className="ml-1">Xóa sản phẩm</span>
                      </button>
                    </div>
                  </td>
                  <td className="hidden w-[20%] lg:table-cell text-base font-medium text-blue-700 text-center after:content-['₫']">
                    {cartItem.price}
                  </td>
                  <td className="hidden w-[20%] lg:table-cell text-center pr-3 md:p-0 lg:p-0">
                    <div className="flex justify-center">
                      <button
                        className="border border-slate-200 h-6 w-6 lg:h-8 lg:w-8"
                        onClick={() => handleIncreaseQuantity(cartItem.id)}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className="border border-slate-200 h-6 w-6 lg:h-8 lg:w-8 text-center"
                        value={cartItem.quantity}
                      />
                      <button
                        className="border border-slate-200 h-6 w-6 lg:h-8 lg:w-8"
                        onClick={() => handleDecreaseQuantity(cartItem.id)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="lg:table-cell w-[20%] text-base font-medium text-blue-700 text-center after:content-['₫']">
                    {cartItem.price * cartItem.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-11/12 mx-auto mt-5 md:flex-row flex-col-reverse flex justify-between items-start">
            <div className="lg:w-1/3 md:w-[40%] w-[70%] mx-auto md:mx-0 gap-y-3 grid grid-cols-1">
              <Link
                to="/products"
                className="bg-black text-center w-full py-3 rounded-3xl text-white text-base hover:opacity-80"
              >
                Tiếp tục mua hàng
              </Link>
              <Link
                to=""
                className="bg-alizarin-crimson lg:hidden text-center w-full py-3 rounded-3xl text-white text-base hover:opacity-80"
              >
                Thanh toán
              </Link>
            </div>
            <div className="md:w-2/5 block w-3/5 md:mx-0 mx-auto md:mb-0 mb-5">
              <div className="justify-between flex w-full">
                <span className="text-base font-bold">Thành tiền: </span>
                <span className="text-lg font-bold text-blue-700 after:content-['₫']">
                  {calculateTotal()}
                </span>
              </div>
              <button className="bg-alizarin-crimson mt-5 w-full py-3 rounded-3xl text-white text-sm hidden lg:block hover:opacity-80">
                MUA NGAY - GIAO HÀNG THANH TOÁN
              </button>
              <button className="bg-alizarin-crimson w-full mt-3 mr-0 rounded-full text-white py-3 hidden lg:block hover:opacity-80">
                <p className="text-base font-medium">MUA NGAY</p>
                <p className="text-xs font-light">
                  Thanh toán bằng Visa, Master, JCB...*(Không bao gồm phí ship)
                </p>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
