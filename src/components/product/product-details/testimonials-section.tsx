'use client';
import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaPlay } from 'react-icons/fa';
import { Section } from "@/src/types/product";

interface Testimonial {
    description: string;
    id: string;
    name: string;
    profile_image: string;
    testimonial: string;
    thumb: string;
    video_type: string;
    video_url: string;
}

export default function TestimonialsSection({ section }: { section: Section }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slidesPerView, setSlidesPerView] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSlidesPerView(1);
            } else if (window.innerWidth < 1024) {
                setSlidesPerView(2);
            } else {
                setSlidesPerView(3);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) =>
            prev >= section.values.length - slidesPerView ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrentSlide((prev) =>
            prev <= 0 ? section.values.length - slidesPerView : prev - 1
        );
    };

    const handleVideoPlay = (videoUrl: string) => {
        if (videoUrl) {
            window.open(`https://www.youtube.com/watch?v=${videoUrl}`, '_blank');
        }
    };

    return (
        <div className="py-12 bg-gray-50">
            <div className="container mx-auto px-4 lg:px-8">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
                    {section.name}
                </h2>

                <div className="relative">
                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors duration-200"
                        disabled={currentSlide === 0}
                    >
                        <FaChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors duration-200"
                        disabled={currentSlide >= section.values.length - slidesPerView}
                    >
                        <FaChevronRight className="w-5 h-5 text-gray-600" />
                    </button>

                    {/* Carousel */}
                    <div className="overflow-hidden mx-12">
                        <div
                            className="flex transition-transform duration-300 ease-in-out"
                            style={{
                                transform: `translateX(-${currentSlide * (100 / slidesPerView)}%)`,
                                width: `${(section.values.length / slidesPerView) * 100}%`,
                            }}
                        >
                            {section.values.map((testimonial: Testimonial) => (
                                <div
                                    key={testimonial.id}
                                    className="px-3"
                                    style={{ flex: `0 0 ${100 / slidesPerView}%` }}
                                >
                                    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col">
                                        {/* Header Section */}
                                        <div className="relative h-48">
                                            {testimonial.thumb && testimonial.video_url ? (
                                                // Video testimonial card
                                                <div className="relative h-full">
                                                    <img
                                                        src={testimonial.thumb}
                                                        onError={(e) => {
                                                            e.currentTarget.src = '/default-thumbnail.jpg';
                                                        }}
                                                        alt={testimonial.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <button
                                                        onClick={() => handleVideoPlay(testimonial.video_url)}
                                                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-50 transition-all duration-200"
                                                    >
                                                        <div className="bg-red-600 rounded-full p-4 hover:bg-red-700 transition-colors">
                                                            <FaPlay className="w-6 h-6 text-white ml-1" />
                                                        </div>
                                                    </button>
                                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                                        <span className="text-white font-bold text-lg">
                                                            {testimonial.description}
                                                        </span>
                                                    </div>
                                                </div>
                                            ) : (
                                                // Text testimonial card
                                                <div className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-500 to-purple-600">
                                                    <img
                                                        src={testimonial.profile_image}
                                                        onError={(e) => {
                                                            e.currentTarget.src = '/default-avatar.jpg';
                                                        }}
                                                        alt={testimonial.name}
                                                        className="w-20 h-20 rounded-full border-4 border-white object-cover mb-4"
                                                    />
                                                    <span className="text-white font-bold text-lg">
                                                        {testimonial.description}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-6 flex flex-col flex-1">
                                            <h3 className="font-bold text-lg text-gray-900 mb-3">
                                                {testimonial.name}
                                            </h3>

                                            <div className="text-gray-700 text-sm leading-relaxed flex-1 whitespace-pre-line">
                                                <p className="line-clamp-4">
                                                    {testimonial.testimonial.length > 150
                                                        ? `${testimonial.testimonial.slice(0, 150)}...`
                                                        : testimonial.testimonial}
                                                </p>
                                            </div>

                                            {!testimonial.thumb && (
                                                <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
                                                    <img
                                                        src={testimonial.profile_image}
                                                        onError={(e) => {
                                                            e.currentTarget.src = '/default-avatar.jpg';
                                                        }}
                                                        alt={testimonial.name}
                                                        className="w-10 h-10 rounded-full object-cover mr-3"
                                                    />
                                                    <div>
                                                        <p className="font-medium text-gray-900 text-sm">{testimonial.name}</p>
                                                        <p className="text-gray-500 text-xs">Student</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
