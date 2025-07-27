import {Section} from "@/src/types/product";
import ProductSectionWrapper from "@/src/components/common/wrapper/product-section-wrapper";
import {FeatureItem} from "@/src/types/product-details";


export default function CourseFeaturesSection({section}: { section: Section }) {
    return (
        <ProductSectionWrapper title={section.name}>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6 bg-gray-800 rounded-lg p-3 sm:p-4 md:p-6">
                {section.values.map((feature: FeatureItem, i: number) => (
                    <div key={feature.id || i} className="text-white p-3 sm:p-4 md:p-5 hover:bg-gray-700 transition-colors duration-200 rounded-md">
                        <div className="flex items-start gap-3 sm:gap-4">
                            {/* Icon */}
                            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex-shrink-0">
                                <img
                                    src={feature.icon}
                                    alt={feature.title}
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            {/* Title & Subtitle */}
                            <div className="flex flex-col min-w-0 flex-1">
                                <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-1 sm:mb-2 line-clamp-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-3">
                                    {feature.subtitle}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </ProductSectionWrapper>
    );
}
