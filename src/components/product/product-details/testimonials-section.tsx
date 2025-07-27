'use client';
import {useState, useEffect} from 'react';
import {FaChevronLeft, FaChevronRight, FaPlay, FaTimes} from 'react-icons/fa';
import {Section} from "@/src/types/product";
import ProductSectionWrapper from "@/src/components/common/wrapper/product-section-wrapper";
import {Testimonial} from "@/src/types/product-details";


export default function TestimonialsSection({section}: { section: Section }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slidesPerView, setSlidesPerView] = useState(2);
    const [playingVideos, setPlayingVideos] = useState<Record<string, boolean>>({});
    const [expandedTexts, setExpandedTexts] = useState<Record<string, boolean>>({});

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


    const extractYouTubeVideoId = (url: string): string | null => {
        if (!url) return null;

        url = url.trim();

        const patterns = [
            /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
            /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
            /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
            /(?:youtube\.com\/watch\?.*v=)([a-zA-Z0-9_-]{11})/,
            /(?:m\.youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
        ];

        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match && match[1]) {
                return match[1];
            }
        }

        const fallbackMatch = url.match(/([a-zA-Z0-9_-]{11})/);
        if (fallbackMatch) {
            return fallbackMatch[1];
        }

        return null;
    };


    const handleVideoPlay = (testimonialId: string) => {
        setPlayingVideos(prev => ({
            ...prev,
            [testimonialId]: !prev[testimonialId]
        }));
    };

    const toggleTextExpansion = (testimonialId: string) => {
        setExpandedTexts(prev => ({
            ...prev,
            [testimonialId]: !prev[testimonialId]
        }));
    };


    const shouldShowSeeMore = (text: string, maxLength: number = 120) => {
        return text.length > maxLength;
    };

    const getTruncatedText = (text: string, maxLength: number = 120) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
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
                                <FaChevronLeft className="w-4 h-4 text-gray-600"/>
                            </button>

                            <button
                                onClick={nextSlide}
                                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors duration-200"
                                aria-label="Next testimonials"
                            >
                                <FaChevronRight className="w-4 h-4 text-gray-600"/>
                            </button>
                        </>
                    )}

                    <div className={`overflow-hidden ${totalSlides > slidesPerView ? 'mx-10' : ''}`}>
                        <div
                            className="flex transition-transform duration-300 ease-in-out gap-4"
                            style={{transform: `translateX(-${currentSlide * (100 / slidesPerView)}%)`}}
                        >
                            {section.values.map((testimonial: Testimonial) => (
                                <div
                                    key={testimonial.id}
                                    className="flex-shrink-0"
                                    style={{width: `calc(${100 / slidesPerView}% - 1rem)`}}
                                >
                                    {testimonial.video_url ? (
                                        <div
                                            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                                            <div className="h-40 bg-gray-200">
                                                {playingVideos[testimonial.id] ? (
                                                    // Video playing state
                                                    <div className="relative w-full h-full">
                                                        <iframe
                                                            src={`https://www.youtube.com/embed/${extractYouTubeVideoId(testimonial.video_url)}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
                                                            className="w-full h-full"
                                                            frameBorder="0"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                            allowFullScreen
                                                            title="YouTube video player"
                                                        />
                                                        <button
                                                            onClick={() => handleVideoPlay(testimonial.id)}
                                                            className="absolute top-2 right-2 bg-black bg-opacity-70 text-white rounded-full p-1 hover:bg-opacity-90 transition-all duration-200"
                                                            aria-label="Close video"
                                                        >
                                                            <FaTimes className="w-3 h-3"/>
                                                        </button>
                                                    </div>
                                                ) : (
                                                    // Thumbnail state - NO relative positioning on container
                                                    <div className="w-full h-full" style={{position: 'relative'}}>
                                                        {/* Image with inline style to force display */}

                                                        <img
                                                            src={testimonial.thumb}
                                                            alt={testimonial.name}
                                                            className="w-full h-full object-cover"
                                                            style={{
                                                                position: 'absolute',
                                                                top: 0,
                                                                left: 0,
                                                                zIndex: 1,
                                                                display: 'block'
                                                            }}
                                                        />

                                                        {/* Play button overlay */}
                                                        <div
                                                            className="flex items-center justify-center  bg-opacity-30 hover:bg-opacity-50 transition-all duration-200 group cursor-pointer"
                                                            style={{
                                                                position: 'absolute',
                                                                top: 0,
                                                                left: 0,
                                                                right: 0,
                                                                bottom: 0,
                                                                zIndex: 2
                                                            }}
                                                            onClick={() => handleVideoPlay(testimonial.id)}
                                                        >
                                                            <div
                                                                className="bg-red-600 rounded-full p-3 hover:bg-red-700 transition-colors group-hover:scale-110 transform">
                                                                <FaPlay className="w-4 h-4 text-white ml-0.5"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-4">
                                                <div className="flex items-center">
                                                    <img
                                                        src={testimonial.profile_image}
                                                        onError={(e) => {
                                                            e.currentTarget.src = '/default-avatar.jpg';
                                                        }}
                                                        alt={testimonial.name}
                                                        className="w-12 h-12 rounded-full object-cover mr-3 border-2 border-gray-200"
                                                    />
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 text-sm">
                                                            {testimonial.name}
                                                        </h3>
                                                        <p className="text-gray-600 text-xs">
                                                            {testimonial.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 h-full">
                                            <div className="p-4 h-full flex flex-col">
                                                <div className="flex items-start mb-3 flex-1">
                                                    <div
                                                        className="text-pink-400 text-2xl mr-2 leading-none flex-shrink-0">"
                                                    </div>
                                                    <div className="text-gray-700 text-sm leading-relaxed">
                                                        <p className="whitespace-pre-line">
                                                            {expandedTexts[testimonial.id]
                                                                ? testimonial.testimonial
                                                                : getTruncatedText(testimonial.testimonial)
                                                            }
                                                        </p>

                                                        {shouldShowSeeMore(testimonial.testimonial) && (
                                                            <button
                                                                onClick={() => toggleTextExpansion(testimonial.id)}
                                                                className="text-blue-600 hover:text-blue-800 text-xs font-medium mt-2 transition-colors duration-200"
                                                            >
                                                                {expandedTexts[testimonial.id] ? 'See Less' : 'See More'}
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>

                                                <div
                                                    className="flex items-center pt-3 border-t border-gray-200 mt-auto">
                                                    <img
                                                        src={testimonial.profile_image}
                                                        onError={(e) => {
                                                            e.currentTarget.src = '/default-avatar.jpg';
                                                        }}
                                                        alt={testimonial.name}
                                                        className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-gray-200"
                                                    />
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 text-sm">
                                                            {testimonial.name}
                                                        </h3>
                                                        <p className="text-gray-600 text-xs">
                                                            {testimonial.description}
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

