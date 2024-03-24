import React, { useState } from 'react';
import { useRouter } from 'next/router';

function Navbar() {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== '') {
            router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <nav className="flex items-center justify-between p-4 bg-primary">
            <div className="flex items-center flex-shrink-0 mr-6">
                <img src="/GnutsHead.png" alt="logo" className="w-2/12 mr-2" />
            </div>
            <div className="flex items-center justify-center flex-grow lg:w-auto">
                <form onSubmit={handleSearch} className="flex">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search movies..."
                        className="bg-transparent text-primary-foreground border-b border-primary-foreground focus:outline-none focus:border-white px-4 py-2"
                    />
                    <button type="submit" className="ml-2 px-4 py-2 bg-primary hover:bg-secondary text-white rounded-md focus:outline-none focus:bg-secondary">
                        Search
                    </button>
                </form>
            </div>
            <div className="hidden lg:block">
                <a href="/" className="text-white hover:bg-secondary hover:text-primary-foreground px-3 py-2 rounded-md text-sm font-medium">Home</a>
                <a href="/auth/sign-in" className="text-white hover:bg-secondary hover:text-primary-foreground px-3 py-2 rounded-md text-sm font-medium">Sign In</a>
            </div>
        </nav>
    );
}

export default Navbar;

