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
    const [currentVideoId, setCurrentVideoId] = useState('');
    const [isVideoLoading, setIsVideoLoading] = useState(false);

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

    // Extract YouTube video ID from various URL formats
    const extractYouTubeVideoId = (url: string): string | null => {
        if (!url) return null;
        
        // Remove any whitespace
        url = url.trim();
        
        // Handle different YouTube URL formats
        const patterns = [
            // Standard watch URL
            /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
            // Short URL
            /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
            // Embed URL
            /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
            // YouTube URL with additional parameters
            /(?:youtube\.com\/watch\?.*v=)([a-zA-Z0-9_-]{11})/,
            // Mobile URL
            /(?:m\.youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
        ];
        
        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match && match[1]) {
                console.log('Extracted video ID:', match[1]);
                return match[1];
            }
        }
        
        // If no pattern matches, try to extract 11-character alphanumeric string
        const fallbackMatch = url.match(/([a-zA-Z0-9_-]{11})/);
        if (fallbackMatch) {
            console.log('Fallback video ID:', fallbackMatch[1]);
            return fallbackMatch[1];
        }
        
        console.log('No video ID found for URL:', url);
        return null;
    };

    // Get YouTube thumbnail URL
    const getYouTubeThumbnail = (videoUrl: string): string => {
        const videoId = extractYouTubeVideoId(videoUrl);
        if (!videoId) return '/default-thumbnail.jpg';
        
        // Use maxresdefault for better quality, fallback to hqdefault
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    };

    // Handle video play - show modal with iframe
    const handleVideoPlay = (videoUrl: string) => {
        console.log('Playing video:', videoUrl);
        const videoId = extractYouTubeVideoId(videoUrl);
        if (videoId) {
            setCurrentVideoId(videoId);
            setShowVideoModal(true);
            setIsVideoLoading(true);
        } else {
            // Fallback: open in new tab if video ID extraction fails
            window.open(videoUrl.startsWith('http') ? videoUrl : `https://www.youtube.com/watch?v=${videoUrl}`, '_blank');
        }
    };

    const closeVideoModal = () => {
        setShowVideoModal(false);
        setCurrentVideoId('');
        setIsVideoLoading(false);
    };

    // Handle escape key and outside click
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeVideoModal();
        };

        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains('video-modal-backdrop')) {
                closeVideoModal();
            }
        };

        if (showVideoModal) {
            document.addEventListener('keydown', handleEscape);
            document.addEventListener('click', handleClickOutside);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('click', handleClickOutside);
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
                                                        src={testimonial.thumb || getYouTubeThumbnail(testimonial.video_url)}
                                                        onError={(e) => {
                                                            const target = e.currentTarget;
                                                            const videoId = extractYouTubeVideoId(testimonial.video_url);
                                                            
                                                            if (videoId) {
                                                                // Try different thumbnail qualities
                                                                if (target.src.includes('maxresdefault')) {
                                                                    target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                                                                } else if (target.src.includes('hqdefault')) {
                                                                    target.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
                                                                } else if (target.src.includes('mqdefault')) {
                                                                    target.src = `https://img.youtube.com/vi/${videoId}/default.jpg`;
                                                                } else {
                                                                    target.src = '/default-thumbnail.jpg';
                                                                }
                                                            } else {
                                                                target.src = '/default-thumbnail.jpg';
                                                            }
                                                        }}
                                                        alt={testimonial.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <button
                                                        onClick={() => handleVideoPlay(testimonial.video_url)}
                                                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-50 transition-all duration-200 group"
                                                    >
                                                        <div className="bg-red-600 rounded-full p-3 hover:bg-red-700 transition-colors group-hover:scale-110 transform">
                                                            <FaPlay className="w-4 h-4 text-white ml-0.5" />
                                                        </div>
                                                    </button>
                                                    {testimonial.description && (
                                                        <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold shadow-lg">
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
                                            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 h-full">
                                                <div className="p-4 h-full flex flex-col">
                                                    <div className="flex items-start mb-3 flex-1">
                                                        <div className="text-pink-400 text-2xl mr-2 leading-none flex-shrink-0">"</div>
                                                        <div className="text-gray-700 text-sm leading-relaxed">
                                                            {testimonial.testimonial.length > 120
                                                                ? `${testimonial.testimonial.slice(0, 120)}...`
                                                                : testimonial.testimonial}
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center pt-3 border-t border-gray-200 mt-auto">
                                                        <img
                                                            src={testimonial.profile_image}
                                                            onError={(e) => { e.currentTarget.src = '/default-avatar.jpg'; }}
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

            {/* Video Modal */}
            {showVideoModal && currentVideoId && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 video-modal-backdrop">
                    <div className="relative w-full max-w-4xl mx-4 lg:mx-8">
                        {/* Close Button */}
                        <button
                            onClick={closeVideoModal}
                            className="absolute -top-12 right-0 text-white hover:text-red-400 transition-colors duration-200 z-10"
                            aria-label="Close video"
                        >
                            <FaTimes className="w-8 h-8" />
                        </button>
                        
                        {/* Video Container */}
                        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                            {isVideoLoading && (
                                <div className="absolute inset-0 bg-gray-900 flex items-center justify-center rounded-lg">
                                    <div className="text-white text-lg">Loading video...</div>
                                </div>
                            )}
                            
                            <iframe
                                src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
                                className="absolute top-0 left-0 w-full h-full rounded-lg"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                title="YouTube video player"
                                onLoad={() => setIsVideoLoading(false)}
                                onError={() => {
                                    setIsVideoLoading(false);
                                    console.error('Error loading video iframe');
                                }}
                            />
                        </div>
                        
                        {/* Alternative: Open in YouTube link */}
                        <div className="mt-4 text-center">
                            <a
                                href={`https://www.youtube.com/watch?v=${currentVideoId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white text-sm hover:text-red-400 transition-colors underline"
                            >
                                Open in YouTube
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}