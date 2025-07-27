'use client';

import {useEffect, useState} from 'react';
import ProductDescription from "@/src/components/product/product-details/product-description";
import {PromoGallerySection} from "@/src/components/product/product-details/promo-gallery-section";
import PricingSection from "@/src/components/product/product-details/product-pricing-section";
import {CtaText} from "@/src/types/product";

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

    useEffect(() => {
        const handleScroll = () => {
            const rightSideElement = document.getElementById('right-sidebar');

            if (rightSideElement) {
                const rightSideRect = rightSideElement.getBoundingClientRect();
                const shouldBeSticky = rightSideRect.bottom < 0;

                setIsSticky(shouldBeSticky);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div
                className="w-full min-h-[120px] md:min-h-[120px] relative"
                style={{
                    backgroundImage: `url("https://cdn.10minuteschool.com/images/ui_%281%29_1716445506383.jpeg")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div
                    className="container mx-auto px-4 lg:px-32 relative flex flex-col md:flex-row gap-4 md:gap-12 pb-6 md:py-10 min-h-[300px]">
                    {/* Left Content */}
                    <div className="flex-1 flex flex-col justify-center md:max-w-[calc(100%_-_400px)] pt-8 md:pt-0">
                        {/* Mobile Gallery */}
                        <div className="block md:hidden mb-6">
                            <PromoGallerySection media={media}/>
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
                            <ProductDescription html={description}/>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div
                        id="right-sidebar"
                        className="w-full md:max-w-[400px] md:absolute md:right-4 lg:right-8 md:top-8"
                    >
                        <div className="bg-white  shadow md:sticky md:top-8">
                            {/* Desktop Gallery */}
                            <div className="hidden md:block p-1">
                                <div className="rounded-lg overflow-hidden">
                                    <PromoGallerySection media={media}/>
                                </div>
                            </div>
                            <PricingSection currentPrice={500} cta={ctaText} checklist={checklist}/>
                        </div>
                    </div>
                </div>
            </div>

            {isSticky && (
                <div className="fixed top-0 right-4 lg:right-8 w-full max-w-[400px] z-50 hidden md:block">
                    <div className="bg-white  shadow">
                        <PricingSection currentPrice={500} cta={ctaText} checklist={checklist}/>
                    </div>
                </div>
            )}
        </>
    );
}

