import Navbar from "./organisms/navbar";
import Footer from "./organisms/footer";


export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main className={"container"}>{children}</main>
            <Footer />
        </>
    )
}