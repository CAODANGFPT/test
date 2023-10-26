import { useEffect, useState } from "react";

type Props = {
  slides: TSlides[];
  autoSlide: boolean;
};
type TSlides = {
  id: number;
  image: string;
};

const Carousel = ({ slides, autoSlide }: Props) => {
  const [curr, setCurr] = useState(0);
  const autoSlideInterval = 5000;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, next]);
  return (
    <div className="overflow-hidden relative">
      <div
        className="flex transition-transform ease-out duration-500 w-[100%]"
        style={{ transform: `translateX(-${curr * 100}vw)` }}
      >
        {slides.map((slide: TSlides) => (
          <img
            className="min-w-[100vw] h-auto"
            key={slide.id}
            src={slide.image}
            alt=""
          />
        ))}
      </div>

      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_: TSlides, i: number) => (
            <div
              key={i}
              className={`
                 transition-all w-3 h-3 bg-white rounded-full
                 ${curr === i ? "p-2" : "bg-opacity-50"}
               `}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
