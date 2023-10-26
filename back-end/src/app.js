import cors from "cors";
import express from "express";
import userRouter from "./routers/auth";
import categoryRouter from "./routers/category";
import productsRouter from "./routers/product";
import rolesRouter from "./routers/role";
import newsRouter from "./routers/news";
import orderRouter from "./routers/orders";


const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", categoryRouter);
app.use("/api", categoryRouter);
app.use("/api", productsRouter);
app.use("/api", userRouter);
app.use("/api", rolesRouter);
app.use("/api", newsRouter);
app.use("/api", orderRouter);


export const viteNodeApp = app;
