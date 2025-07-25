import { Section } from "@/src/types/product";

export default function OffersSection({ section }: { section: Section }) {
    return (
        <div>
            {section.name && <h2 className="text-2xl font-semibold">{section.name}</h2>}
            <ul className="space-y-2">
                {section.values.map((offer, i) => (
                    <li key={i} className="p-4 border rounded shadow">{JSON.stringify(offer)}</li>
                ))}
            </ul>
        </div>
    );
}
