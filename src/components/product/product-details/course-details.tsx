
export default function CourseDetails({ html }: { html: string }) {
    return (
        <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
