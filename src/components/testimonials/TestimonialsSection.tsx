'use client';
import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaPlay, FaTimes } from 'react-icons/fa';
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
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [currentVideoUrl, setCurrentVideoUrl] = useState('');

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

    // Extract YouTube video ID from URL
    const getYouTubeVideoId = (url: string) => {
        if (!url) return null;
        
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
            /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
        ];
        
        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match && match[1]) {
                return match[1];
            }
        }
        return null;
    };

    // Get YouTube thumbnail with multiple quality options
    const getYouTubeThumbnail = (videoUrl: string) => {
        const videoId = getYouTubeVideoId(videoUrl);
        if (!videoId) return null;
        
        // Try high quality first, fallback to medium quality
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    };

    // Convert YouTube URL to embed URL
    const getYouTubeEmbedUrl = (videoUrl: string) => {
        const videoId = getYouTubeVideoId(videoUrl);
        if (!videoId) return null;
        
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    };

    const handleVideoPlay = (videoUrl: string) => {
        const embedUrl = getYouTubeEmbedUrl(videoUrl);
        if (embedUrl) {
            setCurrentVideoUrl(embedUrl);
            setShowVideoModal(true);
        }
    };

    const closeVideoModal = () => {
        setShowVideoModal(false);
        setCurrentVideoUrl('');
    };

    // Handle escape key to close modal
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeVideoModal();
            }
        };

        if (showVideoModal) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [showVideoModal]);

    if (!section.values || section.values.length === 0) {
        return null;
    }

    return (
        <>
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
                                            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                                                <div className="relative h-40">
                                                    <img
                                                        src={testimonial.thumb || getYouTubeThumbnail(testimonial.video_url) || '/default-thumbnail.jpg'}
                                                        onError={(e) => {
                                                            const target = e.currentTarget;
                                                            // Try different thumbnail qualities
                                                            if (target.src.includes('hqdefault')) {
                                                                const videoId = getYouTubeVideoId(testimonial.video_url);
                                                                if (videoId) {
                                                                    target.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
                                                                    return;
                                                                }
                                                            }
                                                            if (target.src.includes('mqdefault')) {
                                                                const videoId = getYouTubeVideoId(testimonial.video_url);
                                                                if (videoId) {
                                                                    target.src = `https://img.youtube.com/vi/${videoId}/default.jpg`;
                                                                    return;
                                                                }
                                                            }
                                                            target.src = '/default-thumbnail.jpg';
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
                                                    {testimonial.description && (
                                                        <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
                                                            {testimonial.description}
                                                        </div>
                                                    )}
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
                                                                {testimonial.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 h-full">
                                                <div className="p-4">
                                                    <div className="flex items-start mb-3">
                                                        <div className="text-pink-400 text-4xl mr-2 leading-none">"</div>
                                                        <div className="text-gray-700 text-sm leading-relaxed">
                                                            {testimonial.testimonial.length > 150
                                                                ? `${testimonial.testimonial.slice(0, 150)}...`
                                                                : testimonial.testimonial}
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center mt-4 pt-3 border-t border-gray-200">
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

            {/* Video Modal */}
            {showVideoModal && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="relative w-full max-w-4xl mx-4">
                        <button
                            onClick={closeVideoModal}
                            className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                            aria-label="Close video"
                        >
                            <FaTimes className="w-8 h-8" />
                        </button>
                        <div className="relative pb-[56.25%] h-0 bg-black rounded-lg overflow-hidden">
                            <iframe
                                src={currentVideoUrl}
                                className="absolute top-0 left-0 w-full h-full"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Video testimonial"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}