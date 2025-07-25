import {CtaText} from "@/src/types/product";


export default function CtaButton({ cta }: { cta: CtaText }) {
    return (
        <a
            href={cta.link}
            className="inline-block bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition"
        >
            {cta.text}
        </a>
    );
}
