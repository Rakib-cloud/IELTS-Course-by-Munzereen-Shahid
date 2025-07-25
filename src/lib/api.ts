import {API_URL} from "@/src/constant/api-url";

export const fetchProductData = async (slug: string, lang: string = "en") => {
    const res = await fetch(
        `${API_URL.PRODUCTS}/${slug}?lang=${lang}`,
        {
            headers: {
                "X-TENMS-SOURCE-PLATFORM": "web",
                Accept: "application/json",
            },
            next: {revalidate: 60},
        }
    );

    if (!res.ok) throw new Error("Failed to fetch product data");

    const json = await res.json();

    return json.data;
};
