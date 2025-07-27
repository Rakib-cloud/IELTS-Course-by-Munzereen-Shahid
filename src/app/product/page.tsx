import { ProductData} from "@/src/types/product";
import {fetchProductData} from "@/src/lib/api";
import ProductDetails from "@/src/components/product/product-details";

interface ProductPageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ProductPage({ searchParams }: ProductPageProps) {
    // Get lang from URL params, default to 'en' if not provided
    const lang = (searchParams.lang as string) || "en";
    
    // Validate lang parameter (only allow 'en' or 'bn')
    const validLang = lang === 'bn' ? 'bn' : 'en';
    
    const data: ProductData = await fetchProductData("ielts-course", validLang);

    return (
        <section className="">
            <ProductDetails data={data}/>
        </section>
    );
}