import { Link, useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/");
  }, 5000);
  return (
    <section className="p-[40px 0] bg-white mt-28">
      <div className="container mx-auto">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  text-center">
              <div className="bg-[url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)] h-96 bg-center bg-no-repeat mt-16">
                <h1 className="text-center text-7xl text-red-500">404</h1>
              </div>

              <div className="">
                <h3 className="text-7xl">Trang không khả dụng</h3>

                <p className="mt-12">
                  Xem lại đường dẫn của mình hoặc có thể click về trang chủ
                </p>

                <Link
                  to="/"
                  className="text-white p-5 rounded-3xl bg-green-500 m-[20px 0] inline-block mt-12"
                >
                  Trở về trang chủ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
