'use client'
import {ProductData} from "@/src/types/product";
import InstructorSection from "@/src/components/product/product-details/instructor-section";
import CourseFeaturesSection from "@/src/components/product/product-details/course-features";
import EngagementSection from "@/src/components/product/product-details/engagement-section";
import LearningOutcomesSection from "@/src/components/product/product-details/learning-outcomes-section";
import AboutSection from "@/src/components/product/product-details/about-section";
import ExclusiveFeaturesSection from "@/src/components/product/product-details/exclusive-features-section";
import FAQSection from "@/src/components/product/product-details/faq-section";
import ProductHeroSection from "@/src/components/product/product-details/product-hero-section";
import TestimonialsSection from "@/src/components/product/product-details/testimonials-section";

export default function ProductDetails({data}: { data: ProductData }) {
    const getSection: any = (type: string) => data.sections?.find(s => s.type === type);
    return (
        <section>

            <ProductHeroSection
                title={data.title}
                description={data.description}
                media={data.media}
                checklist={data.checklist}
                ctaText={data.cta_text}

            />

            <div className="container mx-auto px-4 lg:px-32 py-6">
                {getSection("instructors") && <InstructorSection section={getSection("instructors")}/>}
                {getSection("features") && <CourseFeaturesSection section={getSection("features")}/>}
                {getSection("group_join_engagement") &&
                    <EngagementSection section={getSection("group_join_engagement")}/>}
                {getSection("pointers") && <LearningOutcomesSection section={getSection("pointers")}/>}
                {getSection("about") && <AboutSection section={getSection("about")}/>}
                {getSection("feature_explanations") &&
                    <ExclusiveFeaturesSection section={getSection("feature_explanations")}/>}
                {getSection("testimonials") && <TestimonialsSection section={getSection("testimonials")}/>}
                {getSection("faq") && <FAQSection section={getSection("faq")}/>}
            </div>
        </section>
    );
}
