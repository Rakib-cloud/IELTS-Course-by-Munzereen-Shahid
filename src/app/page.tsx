import {ProductData} from "@/src/types/product";
import {fetchProductData} from "@/src/lib/api";
import ProductDetails from "@/src/components/product/product-details";

interface HomeProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function HomePage({searchParams}: HomeProps) {
    const searchParamsValue = await searchParams;
    const lang = (searchParamsValue.lang as string) || "en";
    const validLang = lang === 'bn' ? 'bn' : 'en';
    const data: ProductData = await fetchProductData("ielts-course", validLang);

    return (
        <div>
            {data && <ProductDetails data={data} />}
        </div>
    );
}