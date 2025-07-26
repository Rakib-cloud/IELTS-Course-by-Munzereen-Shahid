import { CtaText } from "@/src/types/product";

export default function CtaButton({ cta }: { cta: CtaText }) {
    return (
        <button
            className="w-full bg-green-600 hover:bg-green-700 cursor-pointer text-white font-normal py-3 rounded-lg transition-colors mb-4"
            data-value={cta.value}
        >
            {cta.name}
        </button>
    );
}
