import {ProductData} from "@/src/types/product";
import {fetchProductData} from "@/src/lib/api";
import ProductDetails from "@/src/components/product/product-details";

interface ProductPageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ProductPage({searchParams}: ProductPageProps) {
    const lang = (searchParams.lang as string) || "en";
    const validLang = lang === 'bn' ? 'bn' : 'en';
    const data: ProductData = await fetchProductData("ielts-course", validLang);

    return (
        <>
            {data && <ProductDetails data={data}/>}
        </>
    );
}

