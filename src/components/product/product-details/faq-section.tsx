import { Section } from "@/src/types/product";

export default function FAQSection({ section }: { section: Section }) {
    return (
        <div>
            <h2 className="text-2xl font-semibold">{section.name}</h2>
            <ul className="space-y-4">
                {section.values.map((faq, i) => (
                    <li key={i}>
                        <details>
                            <summary className="cursor-pointer font-semibold">{faq.question}</summary>
                            <p className="mt-2">{faq.answer}</p>
                        </details>
                    </li>
                ))}
            </ul>
        </div>
    );
}
