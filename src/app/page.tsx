import ProductPage from "@/src/components/product/product-page";

interface HomeProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

export default function Home({ searchParams }: HomeProps) {
    return (
        <div>
            <ProductPage searchParams={searchParams} />
        </div>
    );
}
