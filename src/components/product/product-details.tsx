import ProductTitle from "@/src/components/product/product-details/product-title";
import ProductDescription from "@/src/components/product/product-details/product-description";
import ProductTrailer from "@/src/components/product/product-details/product-trailer";
import CTAButton from "@/src/components/product/product-details/cta-button";

import {ProductData, Section} from "@/src/types/product";
import OffersSection from "@/src/components/product/product-details/offers-section";
import InstructorSection from "@/src/components/product/product-details/instructor-section";
import CourseFeaturesSection from "@/src/components/product/product-details/course-features";
import {PromoGallerySection} from "@/src/components/product/product-details/promo-gallery-section";
import EngagementSection from "@/src/components/product/product-details/engagement-section";
import LearningOutcomesSection from "@/src/components/product/product-details/learning-outcomes-section";
import AboutSection from "@/src/components/product/product-details/about-section";
import ExclusiveFeaturesSection from "@/src/components/product/product-details/exclusive-features-section";
import TestimonialsSection from "@/src/components/product/product-details/testimonials-section";
import FAQSection from "@/src/components/product/product-details/faq-section";

export default function ProductDetails({ data }: { data: ProductData }) {
    const getSection:any = (type: string) => data.sections?.find(s => s.type === type);

    return (
        <section className="space-y-10">
            <ProductTitle title={data.title} />
            <ProductDescription html={data.description} />

            {/*<ProductTrailer media={data.media} />*/}
            <PromoGallerySection media={data.media} />
            <CTAButton cta={data.cta_text} />

            {getSection("offers") && <OffersSection section={getSection("offers")} />}
            {getSection("instructors") && <InstructorSection section={getSection("instructors")} />}
            {getSection("features") && <CourseFeaturesSection section={getSection("features")} />}
            {getSection("group_join_engagement") && <EngagementSection section={getSection("group_join_engagement")} />}
            {getSection("pointers") && <LearningOutcomesSection section={getSection("pointers")} />}
            {getSection("about") && <AboutSection section={getSection("about")} />}
            {getSection("feature_explanations") && <ExclusiveFeaturesSection section={getSection("feature_explanations")} />}
            {getSection("testimonials") && <TestimonialsSection section={getSection("testimonials")} />}
            {getSection("faq") && <FAQSection section={getSection("faq")} />}
        </section>
    );
}
