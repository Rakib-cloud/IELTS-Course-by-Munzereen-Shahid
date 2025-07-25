import { Section } from "@/src/types/product";

export default function InstructorSection({ section }: { section: Section }) {
    return (
        <div>
            <h2 className="text-2xl font-semibold">{section.name}</h2>
            {section.values.map((instructor, i) => (
                <div key={i} className="p-4 border rounded">{JSON.stringify(instructor)}</div>
            ))}
        </div>
    );
}
