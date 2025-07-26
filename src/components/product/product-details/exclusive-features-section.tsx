import {Section} from "@/src/types/product";
import ProductSectionWrapper from "@/src/components/common/wrapper/product-section-wrapper";
import {FiCheck} from "react-icons/fi";

interface ExclusiveFeature {
    checklist: string[];
    file_type: string;
    file_url: string;
    id: string;
    title: string;
    video_thumbnail: string;
}

export default function ExclusiveFeaturesSection({section}: { section: Section }) {
    return (
        <ProductSectionWrapper title={section.name}>
            <div
                className="grid grid-cols-1 px-5 border divide-y divide-gray-200 rounded-lg md:border md:border-gray-200 md:bg-white">
                {section.values.map((feature: ExclusiveFeature, index) => (
                    <div
                        key={feature.id || index}
                        className="flex flex-col items-start justify-between gap-3 py-2 md:flex-row"
                    >
                        {/* Left Content */}
                        <div className="flex flex-col gap-2">
                            <h2 className="text-[14px] font-medium leading-[30px] text-gray-900 md:text-[14px]">
                                {feature.title}
                            </h2>

                            {/* Checklist Items */}
                            {feature.checklist.map((item, itemIndex) => (
                                <div key={itemIndex} className="flex flex-row items-center gap-5">
                                    <FiCheck
                                        className="mt-[2px] flex-shrink-0 text-blue-500"
                                        size={18}
                                    />
                                    <p className="text-[14px] font-normal leading-[24px] text-[#4B5563] md:text-[16px]">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Right Image */}
                        <div className="flex-shrink-0">
                            <div className="mb-4 mx-auto max-w-[350px] transition-opacity duration-300 ease-in-out">
                                <img
                                    alt={feature.title}
                                    src={feature.file_url}
                                    loading="lazy"
                                    width="250"
                                    height="200"
                                    className="rounded-lg object-cover"
                                    style={{color: 'transparent'}}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </ProductSectionWrapper>
    );
}