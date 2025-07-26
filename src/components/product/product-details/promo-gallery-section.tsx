'use client';

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export function PromoGallerySection({ media }: any) {
    const galleryItems = media
        .filter((item: any) => item.name === "preview_gallery")
        .map((item: any) => {
            if (item.resource_type === "image") {
                return {
                    original: item.resource_value,
                    thumbnail: item.resource_value,
                    type: "image",
                };
            } else if (item.resource_type === "video") {
                return {
                    thumbnail: `https://img.youtube.com/vi/${item.resource_value}/0.jpg`,
                    embedUrl: `https://www.youtube.com/embed/${item.resource_value}`,
                    type: "video",
                };
            }
        });

    const renderItem = (item: any) => {
        if (item.type === "video") {
            return (
                <div className="video-wrapper aspect-video w-full">
                    <iframe
                        className="w-full h-full rounded"
                        src={item.embedUrl}
                        title="Video Preview"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            );
        }

        return (
            <img
                src={item.original}
                alt="Gallery Item"
                className="w-full h-auto object-cover rounded"
            />
        );
    };

    return (
        <div>
            <ImageGallery
                items={galleryItems}
                showPlayButton={false}
                showFullscreenButton={true}
                renderItem={renderItem}
            />
        </div>
    );
}
