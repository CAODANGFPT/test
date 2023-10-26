interface IModelConfirmPassword {
  text: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  icon: React.ReactNode;
}

const ModelConfirmPassword = ({
  open,
  setOpen,
  text,
  icon,
}: IModelConfirmPassword) => {
  return (
    <>
      <div className="fixed top-0 left-0 w-[100vw] drop-shadow-2xl z-50">
        <div
          className={
            open
              ? "mx-auto w-[400px] mt-64 ease-in-out duration-700"
              : "mx-auto w-[400px] -mt-64 ease-in-out duration-700"
          }
        >
          <div className="relative bg-white rounded-lg shadow">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
              data-modal-hide="popup-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
              {icon}
              <h3 className="my-5 text-lg font-normal text-gray-500">{text}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModelConfirmPassword;
