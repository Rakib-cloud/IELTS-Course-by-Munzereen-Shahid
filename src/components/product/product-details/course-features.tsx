import { Section } from "@/src/types/product";

export default function CourseFeaturesSection({ section }: { section: Section }) {
    return (
        <div>
            <h2 className="text-2xl font-semibold">{section.name}</h2>
            <ul className="list-disc pl-6 space-y-2">
                {section.values.map((feature, i) => (
                    <li key={i}>{JSON.stringify(feature)}</li>
                ))}
            </ul>
        </div>
    );
}
