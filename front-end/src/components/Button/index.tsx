interface IButton {
  title: string;
}

const Button = ({ title }: IButton) => {
  return (
    <button className="font-sans border border-alizarin-crimson text-sm text-white bg-alizarin-crimson px-5 py-3 rounded-3xl hover:bg-white hover:text-alizarin-crimson">
      {title}
    </button>
  );
};

export default Button;
