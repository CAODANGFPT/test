import { Link } from "react-router-dom";

interface IButtonAdmin {
  title: string;
  add?: boolean;
  edit?: boolean;
  link?: string;
}

const ButtonAdmin = ({
  title,
  add,
  edit,
  link,
}: IButtonAdmin) => {
  return (
    <>
      {add && (
        <Link to={link || ""}>
          <button className="font-sans border border-[#00c6ab] text-sm text-white bg-[#00c6ab] px-5 py-1 rounded-3xl hover:bg-white hover:text-[#00c6ab] ml-2">
            {title}
          </button>
        </Link>
      )}
      {edit && (
        <Link to={link || ""}>
          <button className="font-sans border border-[#FDC85E] text-sm text-white bg-[#FDC85E] px-5 py-1 rounded-3xl hover:bg-white hover:text-[#FDC85E] ml-2">
            {title}
          </button>
        </Link>
      )}
    </>
  );
};

export default ButtonAdmin;
