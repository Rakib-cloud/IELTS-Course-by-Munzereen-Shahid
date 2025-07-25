export interface Medium {
    type: string;
    url: string;
}

export interface Checklist {
    title: string;
    items: string[];
}

export interface Section {
    type: string;
    name: string;
    description: string;
    bg_color?: string;
    order_idx?: number;
    values: any[];

}

export interface Instructor {
    name: string;
    bio: string;
    image: string;
}

export interface Seo {
    title: string;
    description: string;
    keywords: string[];
}

export interface CtaText {
    text: string;
    link: string;
}

export interface ProductData {
    slug: string;
    id: number;
    title: string;
    description: string;
    media: Medium[];
    checklist: Checklist[];
    seo: Seo;
    cta_text: CtaText;
    sections: Section[];
}
