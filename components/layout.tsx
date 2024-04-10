import Navbar from "./organisms/navbar";
import Footer from "./organisms/footer";
import { ReactNode } from "react";


interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <Navbar />
            <main className={"container"}>{children}</main>
            <Footer />
        </>
    );
}