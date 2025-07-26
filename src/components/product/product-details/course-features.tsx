import { Section } from "@/src/types/product";
import ProductSectionWrapper from "@/src/components/common/wrapper/product-section-wrapper";

interface FeatureItem {
    icon: string;
    id: string;
    subtitle: string;
    title: string;
}

export default function CourseFeaturesSection({ section }: { section: Section }) {
    return (
        <ProductSectionWrapper title={section.name}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-800 rounded-lg">
                {section.values.map((feature: FeatureItem, i) => (
                    <div key={feature.id || i} className="text-white p-4">
                        <div className="flex items-start gap-4">
                            {/* Icon */}
                            <div className="w-10 h-10 flex-shrink-0">
                                <img
                                    src={feature.icon}
                                    alt=""
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            {/* Title & Subtitle */}
                            <div className="flex flex-col">
                                <h3 className="font-semibold text-base mb-1">{feature.title}</h3>
                                <p className="text-gray-300 text-sm leading-relaxed">
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
