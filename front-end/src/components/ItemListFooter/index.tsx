import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

interface IItemListFooter {
  data:
    | {
        id: number;
        title: string;
        list: {
          id: number;
          title: string;
        }[];
      }
    | {
        id: number;
        title: string;
        list: {
          id: number;
          title: JSX.Element;
        }[];
      };
}

const ItemListFooter = ({ data }: IItemListFooter) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isWideScreen, setIsWideScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsWideScreen(screenWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    if (isWideScreen) {
      setOpen(false);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isWideScreen]);

  return (
    <div className="text-[14px]">
      <div
        className="flex justify-between items-center"
        onClick={() => setOpen(!open)}
      >
        <h3 className="font-bold tracking-widest uppercase">{data.title}</h3>
        <FaAngleRight
          className={
            open
              ? "origin-center -rotate-90 ease-in-out duration-500 md:hidden block"
              : "origin-center rotate-90 ease-in-out duration-500 md:hidden block"
          }
        />
      </div>
      <ul
        className={
          open
            ? "mt-[10px] overflow-hidden md:h-auto h-[200px] ease-in-out duration-500"
            : "mt-[10px] overflow-hidden md:h-auto h-0 ease-in-out duration-500"
        }
      >
        {data.list?.map((item) => (
          <li key={item.id}>
            <Link to="" className="leading-8 hover:text-alizarin-crimson">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemListFooter;
