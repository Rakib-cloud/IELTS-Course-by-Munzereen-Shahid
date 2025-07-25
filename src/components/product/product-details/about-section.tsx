import { Section } from "@/src/types/product";

export default function AboutSection({ section }: { section: Section }) {
    return (
        <div>
            <h2 className="text-2xl font-semibold">{section.name}</h2>
            {section.values.map((about, i) => (
                <div key={i} className="prose" dangerouslySetInnerHTML={{ __html: about.text || "" }} />
            ))}
        </div>
    );
}
