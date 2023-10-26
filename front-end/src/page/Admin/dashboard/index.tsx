import { Card, Col, Row, Statistic } from "antd";
import { useState } from "react";

import Chart from "@/components/Chart/inedx";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

const Dashboard = () => {
  const [chart, setChart] = useState(false);
  
  const gia = 12000000;

  const data = [
    { id: 1, name: "product 1", PT: 50 },
    { id: 2, name: "product 2", PT: 10 },
    { id: 3, name: "product 3", PT: 70 },
    { id: 4, name: "product 4", PT: 30 },
    { id: 5, name: "product 5", PT: 100 },
    { id: 6, name: "product 6", PT: 20 },
    { id: 7, name: "product 7", PT: 70 },
    { id: 8, name: "product 8", PT: 32 },
    { id: 9, name: "product 9", PT: 20 },
    { id: 10, name: "product 10", PT: 10 },
  ];

  setTimeout(() => {
    setChart(true);
  }, 1000);

  return (
    <div>
      <div className="grid grid-cols-1 xl:grid-cols-2 sm:mx-16 mx-2 xl:gap-16 gap-5">
        <div className="bg-white dark:bg-[rgb(56,56,59)] sm:p-10 p-4 w-full sm:mx-auto mx-2 mt-5 shadow-lg rounded ">
          <p className="dark:text-white text-black text-xl">Tổng doanh số</p>
          <p className="dark:text-white text-black text-3xl my-5">
            {gia.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
          <Row gutter={16}>
            <Col span={12}>
              <Card bordered={false} className="dark:bg-[#565656] bg-slate-300">
                <Statistic
                  title={<p className="dark:text-white text-black">Active</p>}
                  value={11.28}
                  precision={2}
                  valueStyle={{ color: "#00c6ab" }}
                  prefix={<AiOutlineArrowUp />}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card bordered={false} className="dark:bg-[#565656] bg-slate-300">
                <Statistic
                  title={<p className="dark:text-white text-black">Idle</p>}
                  value={9.3}
                  precision={2}
                  valueStyle={{ color: "#ea232d" }}
                  prefix={<AiOutlineArrowDown />}
                  suffix="%"
                />
              </Card>
            </Col>
          </Row>
        </div>
        <div className="bg-white dark:bg-[rgb(56,56,59)] sm:p-10 p-4 w-full sm:mx-auto mx-2 sm:mt-5 shadow-lg rounded ">
          <p className="dark:text-white text-black text-xl">Tổng doanh số</p>
          <p className="dark:text-white text-black text-3xl my-5">
            {gia.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
          <Row gutter={16}>
            <Col span={12}>
              <Card bordered={false} className="dark:bg-[#565656] bg-slate-300">
                <Statistic
                  title={<p className="dark:text-white text-black">Active</p>}
                  value={11.28}
                  precision={2}
                  valueStyle={{ color: "#00c6ab" }}
                  prefix={<AiOutlineArrowUp />}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card bordered={false} className="dark:bg-[#565656] bg-slate-300">
                <Statistic
                  title={<p className="dark:text-white text-black">Idle</p>}
                  value={9.3}
                  precision={2}
                  valueStyle={{ color: "#ea232d" }}
                  prefix={<AiOutlineArrowDown />}
                  suffix="%"
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
      <div className="bg-white dark:bg-[rgb(56,56,59)] sm:p-10 p-4 sm:mx-16 mx-2 xl:mt-16 mt-5 shadow-lg rounded h-full relative">
        <div>
          <div className="flex items-center gap-x-3 dark:dark:text-[#00c6ab] text-slate-300 pb-7">
            <p>100%</p>
            <p className="h-[2px] w-full dark:bg-[#00c6ab] bg-slate-300"></p>
          </div>
          <div className="flex items-center gap-x-3 dark:text-[#00c6ab] text-slate-300 py-7">
            <p>80%</p>
            <p className="h-[2px] w-full dark:bg-[#00c6ab] bg-slate-300"></p>
          </div>
          <div className="flex items-center gap-x-3 dark:text-[#00c6ab] text-slate-300 py-7">
            <p>60%</p>
            <p className="h-[2px] w-full dark:bg-[#00c6ab] bg-slate-300"></p>
          </div>
          <div className="flex items-center gap-x-3 dark:text-[#00c6ab] text-slate-300 py-7">
            <p>40%</p>
            <p className="h-[2px] w-full dark:bg-[#00c6ab] bg-slate-300"></p>
          </div>
          <div className="flex items-center gap-x-3 dark:text-[#00c6ab] text-slate-300 py-7">
            <p>20%</p>
            <p className="h-[2px] w-full dark:bg-[#00c6ab] bg-slate-300"></p>
          </div>
          <div className="flex items-center gap-x-3 dark:text-[#00c6ab] text-slate-300 pt-7">
            <p>0%</p>
            <p className="h-[2px] w-full dark:bg-[#00c6ab] bg-slate-300"></p>
          </div>
        </div>
        <div className="absolute sm:top-[52px] top-[28px] w-full h-[400px] left-0">
          <div className="mx-20 grid grid-cols-10 justify-around items-center">
            {data.map((item) => (
              <div key={item.id} className="flex justify-center">
                <Chart name={item.name} PT={item.PT} chart={chart}/>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="absolute bottom-[20px] w-full left-0 dark:text-[#00c6ab] text-slate-300">
          <div className="mx-20 grid grid-cols-10 justify-around items-center">
            {data.map((item) => (
              <p className="flex justify-center">{item.name}</p>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
