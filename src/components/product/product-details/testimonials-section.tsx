import { Section } from "@/src/types/product";

export default function TestimonialsSection({ section }: { section: Section }) {
    return (
        <div>
            <h2 className="text-2xl font-semibold">{section.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.values.map((testimonial, i) => (
                    <div key={i} className="p-4 border rounded">{JSON.stringify(testimonial)}</div>
                ))}
            </div>
        </div>
    );
}
