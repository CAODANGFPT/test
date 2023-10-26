import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";

const Contact = () => {
  return (
    <div className="xl:max-w-[1200px] mx-auto lg:max-w-[1024px] md:max-w-[768px] max-w-[640px] px-3 md:p-0">
      <Breadcrumb name="Liện hệ" />
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-2xl font-semibold text-alizarin-crimson">
          LIỆN HỆ
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 pb-14 mt-5">
          <div className="flex justify-start items-start flex-col gap-y-4 md:mb-0 mb-5">
            <div className="flex justify-between items-center w-full gap-x-5">
              <div className="flex justify-center items-start flex-col w-full gap-y-[10px]">
                <p className="text-sm font-bold text-[#333] after:content-['*'] after:ml-1 after:text-alizarin-crimson">
                  Tên
                </p>
                <input
                  type="text"
                  className="w-full mt-1 py-2 border border-[#ebebeb] outline-none text-base text-[#333] pl-3 rounded-sm"
                  placeholder="Tên"
                />
              </div>
              <div className="flex justify-center items-start flex-col w-full gap-y-[10px]">
                <p className="text-sm font-bold text-[#333] after:content-['*'] after:ml-1 after:text-alizarin-crimson">
                  Email
                </p>
                <input
                  type="text"
                  className="w-full mt-1 py-2 border border-[#ebebeb] outline-none text-base text-[#333] pl-3 rounded-sm"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="flex justify-center items-start flex-col w-full gap-y-[10px]">
              <p className="text-sm font-bold text-[#333] after:content-['*'] after:ml-1 after:text-alizarin-crimson">
                Nội dung
              </p>
              <textarea
                className="w-full mt-1 py-2 border border-[#ebebeb] outline-none text-base text-[#333] pl-3 rounded-sm"
                placeholder="Nội dung"
              ></textarea>
            </div>
            <Button title="Gửi liên hệ" />
          </div>
          <div className="w-full h-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4912.319839549795!2d105.7457957604355!3d21.03777003002319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b991d80fd5%3A0x53cefc99d6b0bf6f!2sFPT%20Polytechnic%20Hanoi!5e0!3m2!1sen!2s!4v1685701099819!5m2!1sen!2s"
              className="border-0 w-full h-72"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
