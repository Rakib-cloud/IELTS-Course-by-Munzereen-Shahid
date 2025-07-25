'use client';

import Link from 'next/link';

const footerSections = [
    {
        title: 'Company',
        links: [
            {label: 'Career / Recruitment', href: '#'},
            {label: 'Join as a Teacher', href: '#'},
            {label: 'Join as an Affiliate', href: '#'},
            {label: 'Privacy policy', href: '#'},
            {label: 'Refund policy', href: '#'},
            {label: 'Terms & Conditions', href: '#'},
        ],
    },
    {
        title: 'Others',
        links: [
            {label: 'Blog', href: '#'},
            {label: 'Book Store', href: '#'},
            {label: 'Free Notes & Guides', href: '#'},
            {label: 'Job Preparation Courses', href: '#'},
            {label: 'Verify Certificate', href: '#'},
            {label: 'Free Download', href: '#'},
        ],
    },
    {
        title: 'Keep up with us at',
        links: [
            {label: 'Call Us: 16910 (24×7)', href: 'tel:16910'},
            {label: 'Whatsapp: +8801896016252 (24×7)', href: 'https://wa.me/8801896016252'},
            {label: 'Outside Bangladesh: +880 9610916910', href: 'tel:+8809610916910'},
            {label: 'Email: support@10minuteschool.com', href: 'mailto:support@10minuteschool.com'},
        ],
        socials: [
            {icon: 'fab fa-facebook', href: '#'},
            {icon: 'fab fa-instagram', href: '#'},
            {icon: 'fab fa-linkedin', href: '#'},
            {icon: 'fab fa-youtube', href: '#'},
            {icon: 'fab fa-tiktok', href: '#'},
        ],
    },
];

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white text-black   container mx-auto px-4 py-10">
            <div className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Logo & App Promo */}
                <div>
                    <img src="/logo.svg" alt="10 Minute School Logo" className="h-12 mb-3"/>
                    <p className="mb-3">Download Our Mobile App</p>
                    <div className="flex gap-2">
                        <img src="/google-play-icon.jpeg" alt="Google Play" className="h-12"/>
                        <img src="/ios-store-icon.jpeg" alt="App Store" className="h-12"/>
                    </div>
                </div>

                {/* Dynamic Footer Sections */}
                {footerSections.map((section, idx) => (
                    <div key={idx}>
                        <h2 className="text-lg font-semibold mb-3">{section.title}</h2>
                        <ul className="space-y-2 text-sm">
                            {section.links.map((link, i) => (
                                <li key={i}>
                                    <Link href={link.href} className="hover:underline text-gray-700">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Social Icons (only for last section) */}
                        {section.socials && (
                            <div className="flex space-x-4 mt-4 text-xl">
                                {section.socials.map((social, i) => (
                                    <Link key={i} href={social.href}>
                                        <i className={`${social.icon} hover:text-blue-500`}/>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="text-center text-xs text-gray-500 py-4">
                {`2015 - ${currentYear} Copyright © 10 Minute School. All rights reserved.`}
            </div>
        </footer>
    );
};

export default Footer;
