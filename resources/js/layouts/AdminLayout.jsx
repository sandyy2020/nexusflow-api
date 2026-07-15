import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

export default function AdminLayout({ children }) {
    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Navbar />

                <main className="p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}