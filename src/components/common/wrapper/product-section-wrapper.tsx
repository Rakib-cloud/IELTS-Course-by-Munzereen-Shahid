import React from "react";

interface SectionWrapperProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
}

function ProductSectionWrapper({title, children, className = ""}: SectionWrapperProps) {
    return (
        <div className={` px-4 py-4 w-full lg:max-w-[calc(100%_-_400px)] ${className}`}>
            {title && <h2 className="mb-4 text-xl font-semibold md:text-2xl">{title}</h2>}
            {children}
        </div>
    );
}

export default ProductSectionWrapper;