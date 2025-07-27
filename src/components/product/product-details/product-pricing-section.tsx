"use client";

import { useMemo } from "react";
import { CtaText } from "@/src/types/product";
import CtaButton from "@/src/components/product/product-details/cta-button";
import {FiPhone} from "react-icons/fi";



interface PricingSectionProps {
    currentPrice: number;
    cta: CtaText;
    checklist: any;
}

export default function PricingSection({ currentPrice, cta, checklist }: PricingSectionProps) {
    const defaultPrice = useMemo(() => {
        const price = parseInt(process.env.NEXT_PUBLIC_DEFAULT_PRICE || "0", 10);
        return isNaN(price) ? 0 : price;
    }, []);

    const discount = defaultPrice - currentPrice;

    return (
        <>
            {/* Pricing + CTA */}
            <div className="p-4 md:p-6">
                <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                        <span className="text-xl md:text-2xl font-bold text-gray-900">৳{currentPrice}</span>
                        <span className="text-lg text-gray-500 line-through">৳{defaultPrice}</span>
                    </div>
                    {discount > 0 && (
                        <div className="inline-block bg-red-300 text-white px-3 py-0.5 rounded text-sm font-medium">
                            {discount} ৳ ছাড়
                        </div>
                    )}
                </div>

                <CtaButton cta={cta} />
            </div>

            {/* Features + Contact */}
            <div className="px-4 md:px-6 pb-4 md:pb-6">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
                    এই কোর্সে যা থাকছে
                </h3>

                <div className="space-y-3">
                    {checklist?.map((item:any, index:number) => (
                        <div key={index} className="flex items-center space-x-3">
                            <img
                                src={item.icon}
                                alt="icon"
                                className="w-5 h-5 flex-shrink-0"
                            />
                            <span className="text-gray-700 text-sm leading-5">
                {item.text}
              </span>
                        </div>
                    ))}
                </div>


            </div>
            <div className="mt-3 p-4  flex items-center justify-between">
                <p className="text-gray-600 text-[12px]">
                    কোর্সটি সম্পর্কে বিস্তারিত জানতে
                </p>
                <a
                    href="tel:16910"
                    className="inline-flex text-[12px] items-center space-x-2 text-green-600 hover:text-green-700 font-medium"
                >
                    <FiPhone className="w-4 h-4" />
                    <span>ফোন করুন (16910)</span>
                </a>
            </div>
        </>
    );
}
