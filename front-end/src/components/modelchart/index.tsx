interface IModelChart {
  name: string;
}
const ModelChart = ({ name }: IModelChart) => {
  return (
    <p
      style={{
        transform: "translate(-50%, 0)",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        color: "#fff",
        padding: "8px",
        borderRadius: "4px",
      }}
    >
      {name}
    </p>
  );
};

export default ModelChart;
