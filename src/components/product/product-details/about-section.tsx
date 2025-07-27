"use client";

import {useState} from "react";
import {Section} from "@/src/types/product";
import ProductSectionWrapper from "@/src/components/common/wrapper/product-section-wrapper";
import {IoChevronDown, IoChevronUp} from "react-icons/io5";
import {AboutItem} from "@/src/types/product-details";


export default function AboutSection({section}: { section: Section }) {
    const [openIndex, setOpenIndex] = useState<number>(0); // First one open

    const toggleItem = (index: number) => {
        setOpenIndex((prev) => (prev === index ? -1 : index));
    };

    return (
        <ProductSectionWrapper title={section.name}>
            <div className="space-y-0 border border-gray-200 rounded-lg overflow-hidden">
                {section.values.map((about: AboutItem, index: number) => (
                    <div
                        key={about.id || index}
                        className="border-b border-gray-200 last:border-b-0"
                    >
                        <button
                            onClick={() => toggleItem(index)}
                            className="w-full px-6 py-5 cursor-pointer text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                        >
              <span
                  className="text-base font-semibold text-gray-900 pr-4"
                  dangerouslySetInnerHTML={{__html: about.title}}
              />
                            {openIndex === index ? (
                                <IoChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0"/>
                            ) : (
                                <IoChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0"/>
                            )}
                        </button>

                        {openIndex === index && (
                            <div className="px-6 pb-5">
                                <div
                                    className="prose prose-gray max-w-none text-gray-700 leading-relaxed"
                                    dangerouslySetInnerHTML={{__html: about.description}}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </ProductSectionWrapper>
    );
}
