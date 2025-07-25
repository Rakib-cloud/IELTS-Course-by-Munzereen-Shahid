
export default function ProductDescription({ html }: { html: string }) {
    return (
        <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
