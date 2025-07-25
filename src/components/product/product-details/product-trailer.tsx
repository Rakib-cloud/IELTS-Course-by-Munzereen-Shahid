
export default function ProductTrailer({ url }: { url: string }) {
    return (
        <div className="aspect-video mb-6">
            <iframe
                src={url}
                title="Course Trailer"
                className="w-full h-full"
                allowFullScreen
            />
        </div>
    );
}
