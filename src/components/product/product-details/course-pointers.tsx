
export default function CoursePointers({ pointers }: { pointers: string[] }) {
    return (
        <ul className="list-disc pl-5 space-y-2">
            {pointers.map((point, i) => (
                <li key={i}>{point}</li>
            ))}
        </ul>
    );
}
