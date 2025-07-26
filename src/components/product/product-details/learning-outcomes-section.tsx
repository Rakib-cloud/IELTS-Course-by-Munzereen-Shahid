
import { Section } from "@/src/types/product";
import ProductSectionWrapper from "@/src/components/common/wrapper/product-section-wrapper";
import { FiCheck } from "react-icons/fi";

interface LearningPoint {
    color: string;
    icon: string;
    id: string;
    text: string;
}

export default function LearningOutcomesSection({ section }: { section: Section }) {
    return (
        <ProductSectionWrapper title={section.name}>
            <div className="rounded-lg md:border md:border-gray-200 md:bg-white">
                <div className="md:p-4">
                    <ul className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_1fr] md:gap-4">
                        {section.values.map((point: LearningPoint, i) => (
                            <li key={point.id || i} className="flex items-start gap-2 mb-2">
                                <FiCheck
                                    className="mt-[2px] flex-shrink-0 text-blue-500"
                                    size={18}
                                />
                                <div className="flex-1" style={{ color: point.color || "black" }}>
                                    {point.text}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </ProductSectionWrapper>
    );
}
