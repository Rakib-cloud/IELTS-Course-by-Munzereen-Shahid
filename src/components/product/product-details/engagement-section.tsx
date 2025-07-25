import { Section } from "@/src/types/product";

export default function EngagementSection({ section }: { section: Section }) {
    return (
        <div className="border p-4 rounded">
            {section.values.map((engagement, i) => (
                <div key={i}>{JSON.stringify(engagement)}</div>
            ))}
        </div>
    );
}
