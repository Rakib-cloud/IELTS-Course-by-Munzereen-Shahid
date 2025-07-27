'use client';

import { useEffect, useState } from 'react';
import ProductDescription from "@/src/components/product/product-details/product-description";
import { PromoGallerySection } from "@/src/components/product/product-details/promo-gallery-section";
import PricingSection from "@/src/components/product/product-details/product-pricing-section";
import { CtaText } from "@/src/types/product";

interface ProductHeroSectionProps {
    title: string;
    description: string;
    media: any[];
    checklist: any[];
    ctaText: CtaText;
}

export default function ProductHeroSection({
                                               title,
                                               description,
                                               media,
                                               checklist,
                                               ctaText,
                                           }: ProductHeroSectionProps) {
    const [isSticky, setIsSticky] = useState(false);
    const [rightSideHeight, setRightSideHeight] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const rightSideElement = document.getElementById('right-sidebar');
            const heroSection = document.getElementById('hero-section');
            
            if (rightSideElement && heroSection) {
                const heroRect = heroSection.getBoundingClientRect();
                const rightSideRect = rightSideElement.getBoundingClientRect();
                
                // Calculate if we've scrolled past the right side div height
                const scrollY = window.scrollY;
                const heroBottom = heroRect.bottom + scrollY;
                const shouldBeSticky = scrollY > heroBottom - window.innerHeight;
                
                setIsSticky(shouldBeSticky);
            }
        };

        const updateRightSideHeight = () => {
            const rightSideElement = document.getElementById('right-sidebar');
            if (rightSideElement) {
                setRightSideHeight(rightSideElement.offsetHeight);
            }
        };

        // Initial height calculation
        updateRightSideHeight();
        
        // Add scroll listener
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', updateRightSideHeight);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', updateRightSideHeight);
        };
    }, []);

    return (
        <div
            id="hero-section"
            className="w-full min-h-[120px] md:min-h-[120px] relative"
            style={{
                backgroundImage: `url("https://cdn.10minuteschool.com/images/ui_%281%29_1716445506383.jpeg")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                // Ensure hero section height matches or exceeds right sidebar height
                minHeight: `max(300px, ${rightSideHeight}px)`,
            }}
        >
            <div className="container mx-auto px-4 lg:px-32 relative flex flex-col md:flex-row gap-4 md:gap-12 pb-6 md:py-10"
                 style={{ minHeight: `max(300px, ${rightSideHeight}px)` }}>
                {/* Left Content */}
                <div className="flex-1 flex flex-col justify-center md:max-w-[calc(100%_-_400px)] pt-8 md:pt-0">
                    {/* Mobile Gallery */}
                    <div className="block md:hidden mb-6">
                        <PromoGallerySection media={media} />
                    </div>

                    {/* Title */}
                    <h1 className="text-white mb-4 text-2xl md:text-4xl font-semibold leading-tight">
                        {title}
                    </h1>

                    {/* Rating */}
                    <div className="mb-4 flex flex-wrap items-center gap-2 text-white">
                        <img
                            className="w-[100px] md:w-[130px]"
                            src="https://cdn.10minuteschool.com/images/Dev_Handoff_Q1_24_Frame_2_1725444418666.png"
                            alt="rating"
                        />
                        <span className="text-sm md:text-base">
              (82.6% শিক্ষার্থী কোর্স শেষে ৫ রেটিং দিয়েছেন)
            </span>
                    </div>

                    {/* Description */}
                    <div className="text-gray-300 max-w-2xl">
                        <ProductDescription html={description} />
                    </div>
                </div>

                {/* Right Sidebar */}
                <div 
                    id="right-sidebar"
                    className={`w-full md:max-w-[400px] ${
                        isSticky 
                            ? 'md:fixed md:top-8 md:right-8 md:z-50' 
                            : 'md:absolute md:right-4 lg:right-8 md:top-8'
                    } transition-all duration-300`}
                >
                    <div className="bg-white rounded shadow md:sticky md:top-8">
                        {/* Desktop Gallery */}
                        <div className="hidden md:block p-1">
                            <div className="rounded-lg overflow-hidden">
                                <PromoGallerySection media={media} />
                            </div>
                        </div>
                        <PricingSection currentPrice={500} cta={ctaText} checklist={checklist} />
                    </div>
                </div>
            </div>

            {/* Sticky Pricing Section for scroll behavior */}
            {isSticky && (
                <div className="fixed top-8 right-8 w-[400px] z-50 hidden md:block">
                    <div className="bg-white rounded shadow">
                        {/* Desktop Gallery */}
                        <div className="p-1">
                            <div className="rounded-lg overflow-hidden">
                                <PromoGallerySection media={media} />
                            </div>
                        </div>
                        <PricingSection currentPrice={500} cta={ctaText} checklist={checklist} />
                    </div>
                </div>
            )}
        </div>
    );
}




