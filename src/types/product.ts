

export interface Checklist {
    icon: string;
    text: string;
}
export interface Media{
    name: string;
    resource_type: string;
    type: string;
    embedUrl: string;
    original: string;
}

export interface Section {
    type: string;
    name: string;
    description: string;
    bg_color?: string;
    order_idx?: number;
    values: any[];

}


export interface Seo {
    title: string;
    description: string;
    keywords: string[];
}

export interface CtaText {
    name: string;
    value: string;
}

export interface ProductData {
    slug: string;
    id: number;
    title: string;
    description: string;
    media: Media[];
    checklist: Checklist[];
    seo: Seo;
    cta_text: CtaText;
    sections: Section[];
}
