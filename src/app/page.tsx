"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { character1, character2 } from "@/assets"
import Image from "next/image"
import {
	MouseParallaxContainer,
	MouseParallaxChild,
} from "react-parallax-mouse"
import "swiper/css/pagination"

import "swiper/css/mousewheel"

import "swiper/swiper-bundle.css"
import "swiper/css"
import { useEffect, useRef, useState } from "react"
import { CountdownCircleTimer } from "react-countdown-circle-timer"
import { Mousewheel, Navigation, Pagination } from "swiper"

const bg1 =
	"bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-200 via-violet-600 to-sky-900"
const bg2 = "bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900"

const trail1 = "#561D84"
const trail2 = "#F3D993"

export default function Home() {
	const [swiper, setSwiper] = useState<any>(null)
	const [restart, setRestart] = useState(0)
	const [bg, setBg] = useState(bg1)
	const navigationPrevRef = useRef(null)
	const navigationNextRef = useRef(null)

	useEffect(() => {
		if (swiper && swiper["__swiper__"]) {
			swiper.slideTo(swiper.activeIndex === 0 ? 1 : 0)
		}
	}, [swiper])

	const selectColor = (num: number): string => {
		switch (num) {
			case 0:
				return bg2
			case 1:
				return bg1
			case 2:
				return bg2
			case 3:
				return bg1
			default:
				return ""
		}
	}

	return (
		<div
			className={`h-screen relative flex justify-center items-center ${bg} transition-all duration-200`}
		>
			<MouseParallaxContainer
				className="w-full h-full flex justify-center items-center"
				globalFactorX={0.1}
				globalFactorY={0.1}
			>
				<Swiper
					onSlideChange={() => {
						setBg(swiper && swiper.activeIndex === 0 ? bg2 : bg1)
						setRestart(Math.random())
					}}
					onSwiper={(sw) => setSwiper(sw)}
					loop={true}
					modules={[Pagination, Mousewheel, Navigation]}
					allowTouchMove={false}
					mousewheel={true}
					onScroll={() => {
						setBg(() => selectColor(swiper.activeIndex))
					}}
					navigation={{
						prevEl: navigationPrevRef.current,
						nextEl: navigationNextRef.current,
					}}
					pagination={{
						clickable: true,
					}}
				>
					<SwiperSlide>
						<MouseParallaxChild
							className="w-full h-full flex justify-center items-center"
							factorX={0.3}
							factorY={0.5}
						>
							<Image src={character1} alt={"character1"} width={1000} />
						</MouseParallaxChild>
					</SwiperSlide>
					<SwiperSlide>
						<MouseParallaxChild
							className="w-full h-full flex justify-center items-center"
							factorX={0.3}
							factorY={0.5}
						>
							<Image src={character2} alt={"character1"} width={1000} />
						</MouseParallaxChild>
					</SwiperSlide>
					<div>
						<button ref={navigationNextRef}>Next</button>
						<button ref={navigationPrevRef}>Prev</button>
					</div>
				</Swiper>
				<div className="absolute bottom-0 left-0 p-[5rem]">
					<CountdownCircleTimer
						isPlaying
						key={restart}
						duration={7}
						colors={["#FFFFFF", "#FFFFFF"]}
						size={50}
						trailColor={swiper && swiper.activeIndex === 0 ? trail2 : trail1}
						strokeWidth={2}
						colorsTime={[7, 2]}
						onComplete={() => {
							swiper.slideTo(swiper.activeIndex === 0 ? 1 : 0)
							return { shouldRepeat: true }
						}}
					></CountdownCircleTimer>
				</div>
			</MouseParallaxContainer>
		</div>
	)
}
