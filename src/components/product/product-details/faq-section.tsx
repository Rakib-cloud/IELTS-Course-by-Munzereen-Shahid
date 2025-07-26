// "use client";
// import { useState } from 'react';
// import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
// import { Section } from "@/src/types/product";
// import ProductSectionWrapper from "@/src/components/common/wrapper/product-section-wrapper";
//
// interface FAQItem {
//     question: string;
//     answer: string;
//     id?: string;
// }
//
// export default function FAQSection({ section }: { section: Section }) {
//     const [openItems, setOpenItems] = useState<Set<number>>(new Set());
//     const [showAll, setShowAll] = useState(false);
//
//     const toggleItem = (index: number) => {
//         const newOpenItems = new Set(openItems);
//         if (newOpenItems.has(index)) {
//             newOpenItems.delete(index);
//         } else {
//             newOpenItems.add(index);
//         }
//         setOpenItems(newOpenItems);
//     };
//
//     const displayedFAQs = showAll ? section.values : section.values.slice(0, 5);
//
//     return (
//        <ProductSectionWrapper title={section.name}>
//            <div>
//                <div className="space-y-0 border border-gray-200 rounded-lg overflow-hidden">
//                    {displayedFAQs.map((faq: FAQItem, index) => (
//                        <div key={faq.id || index} className="border-b border-gray-200 last:border-b-0">
//                            <button
//                                onClick={() => toggleItem(index)}
//                                className="w-full px-6 cursor-pointer py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
//                            >
//                             <span className="text-base font-semibold text-gray-900 pr-4">
//                                 {faq.question}
//                             </span>
//                                {openItems.has(index) ? (
//                                    <IoChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
//                                ) : (
//                                    <IoChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
//                                )}
//                            </button>
//
//                            {openItems.has(index) && (
//                                <div className="px-6 pb-5">
//                                    <div
//                                        className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
//                                        dangerouslySetInnerHTML={{ __html: faq.answer }}
//                                    />
//                                </div>
//                            )}
//                        </div>
//                    ))}
//                </div>
//
//                {section.values.length > 5 && (
//                    <div className="text-center mt-6">
//                        <button
//                            onClick={() => setShowAll(!showAll)}
//                            className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
//                        >
//                         <span className="mr-2">
//                             {showAll ? 'See less' : `See more (${section.values.length - 5} more)`}
//                         </span>
//                            {showAll ? (
//                                <IoChevronUp className="w-4 h-4" />
//                            ) : (
//                                <IoChevronDown className="w-4 h-4" />
//                            )}
//                        </button>
//                    </div>
//                )}
//            </div>
//        </ProductSectionWrapper>
//     );
// }

"use client";

import {useState} from "react";
import {IoChevronDown, IoChevronUp} from "react-icons/io5";
import {Section} from "@/src/types/product";
import ProductSectionWrapper from "@/src/components/common/wrapper/product-section-wrapper";

interface FAQItem {
    question: string;
    answer: string;
    id?: string;
}

export default function FAQSection({section}: { section: Section }) {
    const [openItems, setOpenItems] = useState<Set<number>>(new Set([0])); // first open
    const [showAll, setShowAll] = useState(false);

    const toggleItem = (index: number) => {
        const newOpenItems = new Set(openItems);
        newOpenItems.has(index) ? newOpenItems.delete(index) : newOpenItems.add(index);
        setOpenItems(newOpenItems);
    };

    const displayedFAQs = showAll ? section.values : section.values.slice(0, 5);

    return (
        <ProductSectionWrapper title={section.name}>
            <div className="relative mb-20">
                <div className="space-y-0 border border-gray-200 rounded-lg overflow-hidden">
                    {displayedFAQs.map((faq: FAQItem, index: number) => (
                        <div key={faq.id || index} className="border-b border-gray-200 last:border-b-0">
                            <button
                                onClick={() => toggleItem(index)}
                                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                            >
                <span className="text-sm md:text-base font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                                {openItems.has(index) ? (
                                    <IoChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0"/>
                                ) : (
                                    <IoChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0"/>
                                )}
                            </button>
                            {openItems.has(index) && (
                                <div className="px-6 pb-5">
                                    <div
                                        className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                                        dangerouslySetInnerHTML={{__html: faq.answer}}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {section.values.length > 5 && (
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="absolute cursor-pointer bottom-[-15px] left-1/2 flex translate-x-[-50%] items-center gap-2 rounded-full bg-white px-4 py-1 text-sm text-gray-500 shadow-[0px_0px_17.0361px_#E7EAF7] hover:bg-gray-50 hover:text-gray-700"
                    >
                        {showAll ? "See less" : `See all`}
                        <IoChevronDown className={`w-4 h-4 transition-transform ${showAll ? "rotate-180" : ""}`}/>
                    </button>
                )}
            </div>
        </ProductSectionWrapper>
    );
}

