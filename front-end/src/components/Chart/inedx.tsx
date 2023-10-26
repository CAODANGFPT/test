import { useState } from "react";
import ModelChart from "../modelchart";

interface IChart {
  name: string;
  PT: number;
  chart: boolean;
}
const Chart = ({ name, PT, chart }: IChart) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      onMouseOver={() => setOpen(true)}
      onMouseOut={() => setOpen(false)}
      style={{
        paddingTop: chart ? `${(400 / 100) * (100 - PT)}px` : "400px",
        height: "400px",
        width: "60%",
        cursor: "pointer",
        transition: "all 1s ease-in-out",
      }}
    >
      {chart && (
        <div className="w-full h-full dark:bg-[#00c6ab] bg-slate-300 dark:text-white text-black flex justify-center items-center relative">
          {PT}%
        </div>
      )}
      {open && chart && (
        <div
          style={{
            position: "absolute",
            top: "0",
            paddingTop: `${(400 / 100) * (100 - PT) - 50}px`,
          }}
        >
          <ModelChart name={name} />
        </div>
      )}
    </div>
  );
};

export default Chart;
