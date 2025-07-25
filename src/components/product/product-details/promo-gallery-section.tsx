export function PromoGallerySection({ media }: any) {
    const galleryItems = media.filter((item:any) => item.name === "preview_gallery");
    return (
        <div>
            <h2 className="text-2xl font-semibold">Gallery Preview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {galleryItems.map((item:any, index:number) => (
                    <div key={index}>
                        {item.resource_type === "image" ? (
                            <img
                                src={item.resource_value}
                                alt="Preview"
                                className="rounded w-full h-auto object-cover"
                            />
                        ) : (
                            <iframe
                                className="w-full aspect-video rounded"
                                src={`https://www.youtube.com/embed/${item.resource_value}`}
                                title="Video Preview"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
