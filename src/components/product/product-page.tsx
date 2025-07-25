import {CtaText, ProductData} from "@/src/types/product";
import {fetchProductData} from "@/src/lib/api";
import ProductDetails from "@/src/components/product/product-details";


export default async function ProductPage() {
    const lang = process.env.NEXT_PUBLIC_DEFAULT_LANG || "en";
    const data: ProductData = await fetchProductData("ielts-course", lang);


    return (
        <section className="">
            <ProductDetails data={data}/>
        </section>
    );
}
