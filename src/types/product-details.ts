export interface FeatureItem {
    icon: string;
    id: string;
    subtitle: string;
    title: string;
}

export interface Instructor {
    name: string;
    image: string;
    description: string;
}

export interface EngagementItem {
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
export interface LearningPoint {
    color: string;
    icon: string;
    id: string;
    text: string;
}

export interface AboutItem {
    description: string;
    icon: string;
    id: string;
    title: string;
}

export interface ExclusiveFeature {
    checklist: string[];
    file_type: string;
    file_url: string;
    id: string;
    title: string;
    video_thumbnail: string;
}
export interface FAQItem {
    question: string;
    answer: string;
    id?: string;
}