import React, { useState } from 'react';
import Link from 'next/link';

function Navbar() {
    const [searchMoved, setSearchMoved] = useState(false);

    const handleSearchClick = () => {
        setSearchMoved(!searchMoved);
    };

    return (
        <nav className="flex items-center justify-between p-4 bg-primary">
            <div className="flex items-center flex-shrink-0 mr-6">
                <img src="/GnutsHead.png" alt="logo" className="w-2/12 mr-2" />
            </div>
            <div className={`flex items-center justify-${searchMoved ? 'end' : 'center'} flex-grow lg:w-auto`}>
                <form className="flex" onClick={handleSearchClick}>
                    <input
                        readOnly
                        type="text"
                        placeholder="Search movies..."
                        className="bg-transparent text-primary-foreground border-b border-primary-foreground focus:outline-none focus:border-white px-4 py-2"
                    />
                    <button type="submit" className="ml-2 px-4 py-2 bg-primary hover:bg-secondary text-white rounded-md focus:outline-none focus:bg-secondary">
                        Search
                    </button>
                </form>
            </div>
            <div className="hidden lg:block">
                <Link href="/" className="text-white hover:bg-secondary hover:text-primary-foreground px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                <Link href="/ui/popular_people" className="text-white hover:bg-secondary hover:text-primary-foreground px-3 py-2 rounded-md text-sm font-medium">Popular Actors</Link>
                <Link href="/auth/sign-in" className="text-white hover:bg-secondary hover:text-primary-foreground px-3 py-2 rounded-md text-sm font-medium">Sign In</Link>
            </div>
        </nav>
    );
}

export default Navbar;


