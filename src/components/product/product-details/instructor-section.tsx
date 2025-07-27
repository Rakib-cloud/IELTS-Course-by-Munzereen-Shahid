import {Section} from "@/src/types/product";
import ProductSectionWrapper from "@/src/components/common/wrapper/product-section-wrapper";
import {Instructor} from "@/src/types/product-details";

export default function InstructorSection({section}: { section: Section }) {
    return (
        <ProductSectionWrapper title={section.name}>
            {section.values.map((instructor: Instructor, i: number) => (
                <div key={i} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-4">
                        {/*Instructor Image*/}
                        <img
                            src={instructor.image}
                            alt={instructor.name}
                            className="w-20 h-20 rounded-full object-cover"
                        />
                        {/*Instructor Details*/}
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {instructor.name}{" "}
                            </h3>
                            <div className="text-gray-600  text-sm space-y-1"
                                dangerouslySetInnerHTML={{__html: instructor.description}}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </ProductSectionWrapper>

    );
}
