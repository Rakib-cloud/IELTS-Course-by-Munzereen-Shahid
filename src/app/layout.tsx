import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Header from "@/src/components/common/header";
import Footer from "@/src/components/common/footer";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "IELTS Course | 10 Minute School",
    description: "Join Munzereen Shahid’s IELTS course and boost your score!",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
        >
        <Header/>
        <main className="min-h-screen">{children}</main>
        <Footer/>
        </body>
        </html>
    );
}

