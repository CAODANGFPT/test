import { useFetchNewsByIdQuery } from "@/api/news";
import Breadcrumb from "@/components/Breadcrumb";
import ModelCategory from "@/components/ModelCategory";
import ModelProduct from "@/components/ModelSale";
import { AiOutlineCalendar, AiOutlineUser } from "react-icons/ai";
import { useParams } from "react-router-dom";
const DetailNewsPage = () => {

  const { id } = useParams()
  console.log(id);
  const { data } = useFetchNewsByIdQuery(Number(id));
  console.log(data);
  
  
  return (
    <div className="xl:max-w-[1200px] lg:max-w-[1024px] md:max-w-[768px] max-w-[640px]  mx-auto xl:px-0  lg:px-3 md:px-3 px-3 md:p-0 font-sans mb-10">
      <Breadcrumb
        name={data?.name}
        nameLink={"Tin tức"}
        link="/news"
      />
      <div className="w-full gap-8 xl:flex lg:flex">
        <div className="xl:w-3/4 lg:w-3/4 ">
          <div className="my-4">
            <div>
              <img
              className="w-full h-[500px]"
                src={data?.image}
                alt=""
              />
            </div>
            <h1 className="mt-4 mb-4 text-2xl font-bold hover:text-alizarin-crimson">
            {data?.name}
            </h1>
            <div className="flex items-center mt-4 mb-3 text-sm text-slate-400">
            <div className="flex items-center">
              <AiOutlineCalendar />
              <p className="ml-2">Thứ Wed, 03/08/2022</p>
            </div>
            <div className="flex items-center ml-3">
              <AiOutlineUser />
              <p className="ml-2">Đăng bởi LÊ ANH TUẤN</p>
            </div>
          </div>
            
            <p className="my-2 text-base">
           {data?.description}
            </p>
         
          </div>

          <div className="py-6 border-y border-slate-200">
            <h1 className="text-[1.7rem] font-bold">Bình luận:</h1>
            <div>
              <div className="flex my-3 ">
                <div className="w-12 h-12 overflow-hidden rounded-full xl:w-20 xl:h-20 lg:w-16 lg:h-16 ">
                  <img
                    className="w-full"
                    src="https://www.gravatar.com/avatar/96e6554079182be39df64152886e86c8?s=110&d=identicon"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <p className="text-base font-bold">Nguyễn Văn A</p>
                  <p className="text-slate-400">04/06/2023</p>
                  <p className="text-[1.1rem] xl:max-w-3xl lg:max-w-3xl w-64">
                    consectetur adipisicing elit.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-[1.7rem] font-bold mt-4">
              Để lại bình luận của bạn:
            </h1>
            <form action="">
              <div className="xl:flex lg:flex xl:gap-8 lg:gap-8">
                <input
                  type="text"
                  className="w-full p-2 my-2 border rounded outline-none xl:w-1/2 lg:w-1/2 xl:my-4 lg:my-4"
                  placeholder="Họ và tên"
                />
                <input
                  type="text"
                  className="w-full p-2 my-2 border rounded outline-none xl:w-1/2 lg:w-1/2 xl:my-4 lg:my-4"
                  placeholder="Email"
                />
              </div>
              <textarea
                name=""
                id=""
                className="w-full h-[150px] xl:my-4 lg:my-4 my-2 border px-4 py-2 rounded outline-none"
                placeholder="Viết bình luận"
              ></textarea>
              <div>
                <button className="px-8 py-2 text-white border-none outline-none bg-alizarin-crimson">Submit</button>
              </div>
            </form>
          </div>
        </div>
        <div className="xl:w-3/12 lg:w-3/12">
          <div>
            <h2 className="my-3 text-sm font-bold">DANH MỤC</h2>
            <ModelCategory />
          </div>
          <div>
            <h2 className="my-3 text-sm font-bold">SIÊU BÃO VỀ GIÁ</h2>
            <ModelProduct />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailNewsPage;
