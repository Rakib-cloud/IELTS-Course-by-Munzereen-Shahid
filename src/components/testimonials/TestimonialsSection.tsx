'use client';
import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaPlay } from 'react-icons/fa';
import { Section } from "@/src/types/product";
import ProductSectionWrapper from "@/src/components/common/wrapper/product-section-wrapper";

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
    const [slidesPerView, setSlidesPerView] = useState(2);

    const totalSlides = section.values.length;
    const maxSlide = Math.max(0, totalSlides - slidesPerView);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSlidesPerView(1);
            } else {
                setSlidesPerView(2);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (currentSlide > maxSlide) {
            setCurrentSlide(maxSlide);
        }
    }, [slidesPerView, maxSlide]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
    };

    const handleVideoPlay = (videoUrl: string) => {
        if (videoUrl) {
            window.open(`https://www.youtube.com/watch?v=${videoUrl}`, '_blank');
        }
    };

    // Extract YouTube video ID from URL for thumbnail
    const getYouTubeVideoId = (url: string) => {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const getYouTubeThumbnail = (videoUrl: string) => {
        const videoId = getYouTubeVideoId(videoUrl);
        return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
    };

    if (!section.values || section.values.length === 0) {
        return null;
    }

    return (
        <ProductSectionWrapper title={section.name}>
            <div>
                <div className="relative">
                    {totalSlides > slidesPerView && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors duration-200"
                                aria-label="Previous testimonials"
                            >
                                <FaChevronLeft className="w-4 h-4 text-gray-600" />
                            </button>

                            <button
                                onClick={nextSlide}
                                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors duration-200"
                                aria-label="Next testimonials"
                            >
                                <FaChevronRight className="w-4 h-4 text-gray-600" />
                            </button>
                        </>
                    )}

                    <div className={`overflow-hidden ${totalSlides > slidesPerView ? 'mx-10' : ''}`}>
                        <div
                            className="flex transition-transform duration-300 ease-in-out gap-4"
                            style={{ transform: `translateX(-${currentSlide * (100 / slidesPerView)}%)` }}
                        >
                            {section.values.map((testimonial: Testimonial) => (
                                <div
                                    key={testimonial.id}
                                    className="flex-shrink-0"
                                    style={{ width: `calc(${100 / slidesPerView}% - 1rem)` }}
                                >
                                    {testimonial.video_url ? (
                                        // Video Card Design
                                        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                                            <div className="relative h-40">
                                                <img
                                                    src={testimonial.thumb || getYouTubeThumbnail(testimonial.video_url) || '/default-thumbnail.jpg'}
                                                    onError={(e) => { 
                                                        const fallback = getYouTubeThumbnail(testimonial.video_url);
                                                        if (fallback && e.currentTarget.src !== fallback) {
                                                            e.currentTarget.src = fallback;
                                                        } else {
                                                            e.currentTarget.src = '/default-thumbnail.jpg';
                                                        }
                                                    }}
                                                    alt={testimonial.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                <button
                                                    onClick={() => handleVideoPlay(testimonial.video_url)}
                                                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-40 transition-all duration-200"
                                                >
                                                    <div className="bg-red-600 rounded-full p-3 hover:bg-red-700 transition-colors">
                                                        <FaPlay className="w-4 h-4 text-white ml-0.5" />
                                                    </div>
                                                </button>
                                                {/* Score Badge */}
                                                <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded text-sm font-bold">
                                                    {testimonial.description}
                                                </div>
                                            </div>
                                            
                                            <div className="p-4">
                                                <div className="flex items-center">
                                                    <img
                                                        src={testimonial.profile_image}
                                                        onError={(e) => { e.currentTarget.src = '/default-avatar.jpg'; }}
                                                        alt={testimonial.name}
                                                        className="w-12 h-12 rounded-full object-cover mr-3"
                                                    />
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 text-sm">
                                                            {testimonial.name}
                                                        </h3>
                                                        <p className="text-gray-600 text-xs">
                                                            IELTS Score: {testimonial.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        // Text Card Design
                                        <div className="bg-pink-50 rounded-lg shadow-md overflow-hidden border border-pink-200">
                                            <div className="p-4">
                                                <div className="flex items-start mb-3">
                                                    <div className="text-pink-400 text-4xl mr-2 leading-none">"</div>
                                                    <div className="text-gray-700 text-sm leading-relaxed">
                                                        {testimonial.testimonial.length > 150
                                                            ? `${testimonial.testimonial.slice(0, 150)}...`
                                                            : testimonial.testimonial}
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-center mt-4 pt-3 border-t border-pink-200">
                                                    <img
                                                        src={testimonial.profile_image}
                                                        onError={(e) => { e.currentTarget.src = '/default-avatar.jpg'; }}
                                                        alt={testimonial.name}
                                                        className="w-10 h-10 rounded-full object-cover mr-3"
                                                    />
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 text-sm">
                                                            {testimonial.name}
                                                        </h3>
                                                        <p className="text-gray-600 text-xs">
                                                            IELTS Score: {testimonial.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </ProductSectionWrapper>
    );
}