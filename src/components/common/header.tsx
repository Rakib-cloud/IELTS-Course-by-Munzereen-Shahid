
'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiMenu, FiX, FiChevronDown, FiSearch, FiPhoneCall } from 'react-icons/fi';

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState('en');

    const router = useRouter();
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            const langParam = url.searchParams.get('lang');
            if (langParam && (langParam === 'en' || langParam === 'bn')) {
                setCurrentLang(langParam);
            } else {
                setCurrentLang('en');
            }
        }
    }, []);


    useEffect(() => {
        const handleUrlChange = () => {
            if (typeof window !== 'undefined') {
                const url = new URL(window.location.href);
                const langParam = url.searchParams.get('lang');
                if (langParam && (langParam === 'en' || langParam === 'bn')) {
                    setCurrentLang(langParam);
                }
            }
        };

        window.addEventListener('popstate', handleUrlChange);

        return () => {
            window.removeEventListener('popstate', handleUrlChange);
        };
    }, []);

    const toggleLanguage = () => {
        const newLang = currentLang === 'bn' ? 'en' : 'bn';
        setCurrentLang(newLang);

        if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            url.searchParams.set('lang', newLang);
            router.push(url.pathname + url.search);
        }
    };

    const navItems = [
        { label: 'Class 6–12', hasDropdown: true },
        { label: 'Skills', hasDropdown: true },
        { label: 'Admission' },
        { label: 'Online Batch', hasDropdown: true },
        { label: 'English Centre', hasDropdown: true },
        { label: 'More', hasDropdown: true },
    ];

    return (
        <header className="w-full border-b border-b-gray-200 bg-white shadow">
            <div className="container mx-auto px-4 py-2 flex items-center justify-between gap-4">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <img
                        src="/logo.svg"
                        alt="Logo"
                        className="h-8 w-auto"
                    />
                </div>

                {/* Search bar - hidden on mobile */}
                <div className="hidden lg:flex flex-1 mx-4 max-w-md">
                    <div className="flex items-center w-full border rounded-full px-4 py-2 bg-gray-50 shadow-sm">
                        <FiSearch className="text-gray-500 w-5 h-5" />
                        <input
                            type="text"
                            placeholder={currentLang === 'bn'
                                ? "স্কিলস কোর্স, কিংবা স্কুল প্রোগ্রাম সার্চ করুন..."
                                : "Search for skills courses or school programs..."}
                            className="ml-2 bg-transparent w-full outline-none text-sm text-gray-700"
                        />
                    </div>
                </div>

                {/* Navigation links - hidden on mobile */}
                <nav className="hidden lg:flex items-center space-x-4 text-sm text-gray-700">
                    {navItems.map((item, i) => (
                        <div key={i} className="flex items-center cursor-pointer hover:text-green-600">
                            {item.label}
                            {item.hasDropdown && <FiChevronDown className="ml-1 w-4 h-4" />}
                        </div>
                    ))}
                </nav>

                {/* Right section */}
                <div className="flex items-center gap-2 text-sm">
                    <button
                        onClick={toggleLanguage}
                        className="border px-2 py-1 cursor-pointer rounded text-gray-700 hover:bg-gray-50 transition-colors"
                        title={`Switch to ${currentLang === 'bn' ? 'English' : 'বাংলা'}`}
                    >
                        {currentLang === 'bn' ? 'EN' : 'বাং'}
                    </button>
                    <div className="hidden lg:flex items-center gap-1 text-green-600 font-medium">
                        <FiPhoneCall className="w-5 h-5" />
                        16910
                    </div>
                    <button className="bg-green-600 cursor-pointer text-white px-4 py-1 rounded text-sm hover:bg-green-700 transition-colors">
                        {currentLang === 'bn' ? 'লগ-ইন' : 'Login'}
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden">
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? (
                            <FiX className="w-6 h-6 text-gray-800" />
                        ) : (
                            <FiMenu className="w-6 h-6 text-gray-800" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            {mobileMenuOpen && (
                <div className="lg:hidden px-4 pb-4">
                    <div className="flex flex-col gap-2 text-sm text-gray-700 mt-2">
                        {navItems.map((item, i) => (
                            <div key={i} className="flex items-center justify-between border-b py-2">
                                {item.label}
                                {item.hasDropdown && <FiChevronDown className="w-4 h-4" />}
                            </div>
                        ))}
                        <div className="flex items-center gap-2 mt-2">
                            <button
                                onClick={toggleLanguage}
                                className="border px-2 py-1 cursor-pointer rounded text-gray-700 hover:bg-gray-50 transition-colors"
                                title={`Switch to ${currentLang === 'bn' ? 'English' : 'বাংলা'}`}
                            >
                                {currentLang === 'bn' ? 'EN' : 'বাং'}
                            </button>
                            <div className="flex items-center gap-1 text-green-600 font-medium">
                                <FiPhoneCall className="w-5 h-5" />
                                16910
                            </div>
                            <button className="bg-green-600 cursor-pointer text-white px-4 py-1 rounded text-sm ml-auto hover:bg-green-700 transition-colors">
                                {currentLang === 'bn' ? 'লগ-ইন' : 'Login'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;