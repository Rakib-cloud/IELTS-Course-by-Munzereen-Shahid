import React from "react";

interface SectionWrapperProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
}

function ProductSectionWrapper({ title, children, className = "" }: SectionWrapperProps) {
    return (
        <div className={`container px-4 lg:px-8 py-4 md:max-w-[calc(70%_-_100px)] ${className}`}>
            {title && <h2 className="mb-4 text-xl font-semibold md:text-2xl">{title}</h2>}
            {children}
        </div>
    );
}

export default ProductSectionWrapper;
