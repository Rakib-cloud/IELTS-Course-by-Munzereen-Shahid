import { Section } from "@/src/types/product";
import ProductSectionWrapper from "@/src/components/common/wrapper/product-section-wrapper";

interface EngagementItem {
    background: {
        image: string;
        primary_color: string;
        secondary_color: string;
    };
    cta: {
        clicked_url: string;
        color: string;
        text: string;
    };
    description: string;
    description_color: string;
    id: string;
    thumbnail: string;
    title: string;
    title_color: string;
    top_left_icon_img: string;
}

export default function EngagementSection({ section }: { section: Section }) {
    return (
        <ProductSectionWrapper >
            <div className="">
                {section.values.map((engagement: EngagementItem, i:number) => (
                    <div
                        key={engagement.id || i}
                        className="flex gap-4 p-4 mb-8 overflow-hidden md:p-8 rounded-lg"
                        style={{
                            backgroundImage: `url(${engagement.background.image})`,
                            backgroundSize: 'cover'
                        }}
                    >
                        {/* Left Content */}
                        <div className="w-full md:w-1/2">
                            {/* Top Left Icon */}
                            <img
                                src={engagement.top_left_icon_img}
                                alt=""
                                className="mb-4"
                                style={{ height: '40px' }}
                            />

                            {/* Title */}
                            <h2
                                className="text-xl font-semibold"
                                style={{ color: engagement.title_color || '#ffffff' }}
                            >
                                {engagement.title}
                            </h2>

                            {/* Description */}
                            <p
                                className="mt-2 text-base"
                                style={{ color: engagement.description_color || '#ededed' }}
                            >
                                {engagement.description}
                            </p>

                            {/* CTA Button */}
                            <a
                                href={engagement.cta.clicked_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 button primary inline-block bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
                                style={engagement.cta.color ? { backgroundColor: engagement.cta.color } : {}}
                            >
                                {engagement.cta.text}
                            </a>
                        </div>

                        {/* Right Thumbnail */}
                        <div className="items-center hidden w-1/2 md:flex">
                            <img
                                src={engagement.thumbnail}
                                alt={engagement.title}
                                height="200"
                                className="object-cover"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </ProductSectionWrapper>
    );
}