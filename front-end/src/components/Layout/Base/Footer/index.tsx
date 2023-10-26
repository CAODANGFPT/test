import { BiLogoFacebook, BiLogoInstagramAlt } from "react-icons/bi";
import { BsFillTelephoneFill, BsYoutube } from "react-icons/bs";
import { GrGooglePlus } from "react-icons/gr";
import { Link } from "react-router-dom";

import ItemListFooter from "@/components/ItemListFooter";

const Footer = () => {
  return (
    <>
      <footer className="w-full font-sans">
        <section className="xl:max-w-[1200px] mx-auto lg:max-w-[1024px] md:max-w-[768px] max-w-[640px] px-3 md:p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 py-5">
            <div className="flex justify-between items-start gap-4">
              <img
                className="w-[50px] h-auto pt-2"
                src="https://bizweb.dktcdn.net/100/347/092/themes/708609/assets/srv_1.png?1688378513890"
                alt=""
              />
              <div className="w-full text-sm">
                <p className="font-bold">VẶN CHUYỂN SIÊU TỐC</p>
                <p className="leading-6">
                  Vận chuyển nội thành HN trong 2 tiếng!
                </p>
              </div>
            </div>
            <div className="flex justify-between items-start gap-4">
              <img
                className="w-[50px] h-auto pt-2"
                src="https://bizweb.dktcdn.net/100/347/092/themes/708609/assets/srv_2.png?1688378513890"
                alt=""
              />
              <div className="w-full text-sm">
                <p className="font-bold">Đổi hàng</p>
                <p className="leading-6">Đổi hàng trong 7 ngày miễn phí!</p>
              </div>
            </div>
            <div className="flex justify-between items-start gap-4">
              <img
                className="w-[50px] h-auto pt-2"
                src="https://bizweb.dktcdn.net/100/347/092/themes/708609/assets/srv_3.png?1688378513890"
                alt=""
              />
              <div className="w-full text-sm">
                <p className="font-bold">Tiết kiệm thời gian</p>
                <p className="leading-6">Mua sắm dễ hơn khi online</p>
              </div>
            </div>
            <div className="flex justify-between items-start gap-4">
              <img
                className="w-[50px] h-auto pt-2"
                src="https://bizweb.dktcdn.net/100/347/092/themes/708609/assets/srv_4.png?1688378513890"
                alt=""
              />
              <div className="w-full text-sm">
                <p className="font-bold">ĐỊA CHỈ CỬA HÀNG</p>
                <p className="leading-6">
                  Tầng 3, TTTM Mỹ Đình Plaza 2 Số 2 Nguyễn Hoàng, Nam Từ Liêm,
                  Hà Nội Sđt: 0977179889
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="w-full bg-center bg-[url('https://bizweb.dktcdn.net/100/347/092/themes/708609/assets/bg_fot.jpg?1688367658721')] bg-cover">
          <div className="xl:max-w-[1200px] mx-auto lg:max-w-[1024px] md:max-w-[768px] max-w-[640px] md:px-0 pt-12 px-3  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-white gap-5">
            {footerList.map((item) => (
              <ItemListFooter key={item.id} data={item} />
            ))}
          </div>
          <div className="mt-[40px]">
            <img
              className="w-[150px] h-auto mx-auto"
              src="https://images.dmca.com/Badges/dmca-badge-w150-5x1-06.png?id=a3fb853b-a3ea-45eb-8af7-adbfca2a1921"
              alt=""
            />
          </div>
          <div className="mt-[20px] text-[14px] text-white flex justify-center items-center gap-x-1">
            <span className="leading-10">© Bản quyền thuộc về</span>
            <Link to="" className="leading-8 hover:text-alizarin-crimson">
              Web17301
            </Link>
            <span className="text-white leading-10">| Cung cấp bởi</span>
            <Link to="" className="leading-8 hover:text-alizarin-crimson">
              We209
            </Link>
          </div>
        </div>

        <div className="xl:max-w-[1200px] mx-auto lg:max-w-[1024px] md:max-w-[768px] max-w-[640px] px-3 md:p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-5 ">
          <div>
            <p className="text-[13px] font-bold leading-6 mb-2 uppercase">
              gọi mua hàng (9h - 23h)
            </p>
            <div className="flex items-center gap-x-2 mt-3">
              <BsFillTelephoneFill className="bg-alizarin-crimson text-white p-1 w-[18px] h-[18px] rounded-[50%]" />
              <Link
                to=""
                className="text-2xl leading-[21px] hover:text-alizarin-crimson"
              >
                0987654321
              </Link>
            </div>
            <p className="text-xs leading-[21px] pt-1">
              Tất cả các ngày trong tuần
            </p>
          </div>
          <div>
            <p className="text-[13px] font-bold leading-6 mb-2 uppercase">
              gọi khiếu nại (10h - 23h)
            </p>
            <div className="flex items-center gap-x-2 mt-3">
              <BsFillTelephoneFill className="bg-alizarin-crimson text-white p-1 w-[18px] h-[18px] rounded-[50%]" />
              <Link
                to=""
                className="text-2xl leading-[21px] hover:text-alizarin-crimson"
              >
                0987654321
              </Link>
            </div>
            <p className="text-xs leading-[21px] pt-1">
              T Các ngày trong tuần (Trừ ngày lễ)
            </p>
          </div>
          <div>
            <p className="text-[13px] font-bold leading-6 mb-2 uppercase">
              nhận ưu đãi ngay
            </p>
            <div className="flex items-center">
              <input
                className="w-[70%] h-10 outline-none border border-5 border-[#e1e1e1] bg-white text-[14px] placeholder:text-[#e1e1e1] pl-3"
                type="email"
                placeholder="Nhập email của bạn"
              />
              <button className="w-[30%] h-10 bg-alizarin-crimson text-white border-alizarin-crimson text-sm font-semibold  mx-auto hover:bg-white hover:text-alizarin-crimson  hover:border-alizarin-crimson border">
                Đăng ký
              </button>
            </div>
          </div>
          <div>
            <p className="text-[13px] font-bold mb-2 uppercase">
              theo dõi ngay
            </p>
            <div className=" flex  items-center gap-x-3 mt-3 text-[40px]">
              <BiLogoFacebook className="bg-alizarin-crimson text-white py-2 w-10 h-10" />
              <GrGooglePlus className="bg-alizarin-crimson text-white py-2 w-10 h-10" />
              <BiLogoInstagramAlt className="bg-alizarin-crimson text-white py-2 w-10 h-10" />
              <BsYoutube className="bg-alizarin-crimson text-white py-2 w-10 h-10" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

const footerList = [
  {
    id: 1,
    title: "thông tin",
    list: [
      {
        id: 1,
        title: "Trang chủ",
      },
      {
        id: 2,
        title: "ADIDAS",
      },
      {
        id: 3,
        title: "NIKE",
      },
      {
        id: 4,
        title: "REEBOK",
      },
      {
        id: 5,
        title: "ĐỒNG HỒ - PHỤ KIỆN ĐIỆN TỬ",
      },
      {
        id: 6,
        title: "QUẦN ÁO - PHỤ KIỆN",
      },
      {
        id: 7,
        title: "TPCN Nhật",
      },
      {
        id: 8,
        title: "CHÍNH SÁCH",
      },
    ],
  },
  {
    id: 2,
    title: "DANH MỤC SẢN PHẨM",
    list: [
      {
        id: 1,
        title: "Phụ kiện, Quần áo",
      },
      {
        id: 2,
        title: "Giày nam",
      },
      {
        id: 3,
        title: "Giày nữ",
      },
      {
        id: 4,
        title: "Adidas Fashion Sneaker - Giày thời trang",
      },
      {
        id: 5,
        title: "Giày đá bóng, Tennis, giày leo núi,...",
      },
      {
        id: 6,
        title: "Giày chạy, giày đi bộ",
      },
      {
        id: 7,
        title: "Giày dép trẻ em",
      },
      {
        id: 8,
        title: "Giày bóng rổ",
      },
      {
        id: 9,
        title: "PUMA",
      },
    ],
  },
  {
    id: 3,
    title: "CHÍNH SÁCH",
    list: [
      {
        id: 1,
        title: "THÔNG TIN ĐIỆN TỬ",
      },
      {
        id: 2,
        title: "Chính sách bảo mật",
      },
      {
        id: 3,
        title: "Chính sách vận chuyển",
      },
      {
        id: 4,
        title: "Chính sách đổi trả",
      },
      {
        id: 5,
        title: "Quy định sử dụng",
      },
      {
        id: 6,
        title: "Hướng dẫn đặt hàng",
      },
      {
        id: 7,
        title: "Thông tin thanh toán",
      },
      {
        id: 8,
        title: "Thông tin về JAPANBABY",
      },
      {
        id: 9,
        title:
          "Bảng đánh giá nhận diện tình trạng sản phẩm đã qua sử dụng Nhật Bản",
      },
    ],
  },
  {
    id: 4,
    title: "thông tin",
    list: [
      {
        id: 1,
        title: (
          <iframe
            className="text-[14px] leading-6 text-justify w-full lg:h-[130px] md:h-64 mt-[10px] border-none"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d476522.14551574754!2d105.21880715515123!3d21.079480449430076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345515f14a641f%3A0xe7f2a647f98416cb!2sFPT%20Polytechnic!5e0!3m2!1sen!2s!4v1688408180252!5m2!1sen!2s"
            allowFullScreen
            loading="lazy"
          />
        ),
      },
    ],
  },
];
