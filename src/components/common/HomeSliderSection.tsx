'use client';
import DabuduSection from "./DabuduSection";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { CustomArrowProps } from "react-slick";
import Image from "next/image";
import Link from "next/link";

const NextArrow = (props: CustomArrowProps) => {
    const { onClick } = props;
    return (
        <div className="absolute sm:bottom-[60px] bottom-[20px] md:left-38 left-20 cursor-pointer z-10 w-[40px] h-[40px] bg-[#edf2f7] rounded-full flex items-center justify-center" onClick={onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#718096" viewBox="0 0 24 24"><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" /></svg>
        </div>
    );
};

const PrevArrow = (props: CustomArrowProps) => {
    const { onClick } = props;
    return (
        <div className="absolute sm:bottom-[60px] bottom-[20px] md:left-24 left-8 cursor-pointer z-10 w-[40px] h-[40px] bg-[#edf2f7] rounded-full flex items-center justify-center" onClick={onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#718096" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" /></svg>
        </div>
    );
};
const HomeSliderSection = () => {
    var settings = {
        dots: true,
        arrows: true,
        infinite: true,
        fade: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };
    return (
        <>
            <div className="md:py-16 py-8 w-full max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 homeslider px-4">
                    <div className="lg:col-span-2">
                        <Slider {...settings}>
                            <div className="relative rounded-2xl overflow-hidden">
                                <Image
                                    src={`/assets/images/slider-img1.webp`}
                                    alt="Slider Image 1"
                                    width={800}
                                    height={600}
                                    className="w-full h-auto object-cover rounded-2xl"
                                />
                                <div className="absolute inset-0 z-10 bg-[linear-gradient(120deg,_rgba(45,55,72,0.9)_0%,_rgba(45,55,72,0.4)_50%,_transparent_100%)]"></div>
                                <div className="absolute inset-0 z-20 flex items-center md:px-24 px-8">
                                    <Link href="#" className="text-white md:text-4xl text-2xl hover:text-amber-500 font-bold">
                                        Sport as prevention
                                    </Link>
                                </div>
                            </div>
                            <div className="relative rounded-2xl overflow-hidden">
                                <Image
                                    src={`/assets/images/slider-img2.webp`}
                                    alt="Slider Image 2"
                                    width={800}
                                    height={600}
                                    className="w-full h-auto object-cover rounded-2xl"
                                />
                                <div className="absolute inset-0 z-10 bg-[linear-gradient(120deg,_rgba(45,55,72,0.9)_0%,_rgba(45,55,72,0.4)_50%,_transparent_100%)]"></div>
                                <div className="absolute inset-0 z-20 flex items-center md:px-24 px-8">
                                    <Link href="#" className="text-white md:text-4xl text-2xl hover:text-amber-500 font-bold">
                                        How to limit sugar in your diet
                                    </Link>
                                </div>
                            </div>
                            <div className="relative rounded-2xl overflow-hidden">
                                <Image
                                    src={`/assets/images/slider-img3.webp`}
                                    alt="Slider Image 3"
                                    width={800}
                                    height={600}
                                    className="w-full h-auto object-cover rounded-2xl"
                                />
                                <div className="absolute inset-0 z-10 bg-[linear-gradient(120deg,_rgba(45,55,72,0.9)_0%,_rgba(45,55,72,0.4)_50%,_transparent_100%)]"></div>
                                <div className="absolute inset-0 z-20 flex items-center md:px-24 px-8">
                                    <Link href="#" className="text-white md:text-4xl text-2xl hover:text-amber-500 font-bold">
                                        Cold shower or just lukewarm?
                                    </Link>
                                </div>
                            </div>
                        </Slider>
                    </div>
                    <div className="col-span-1">
                        <DabuduSection />
                    </div>
                </div>
            </div>
        </>
    )
}
export default HomeSliderSection;