import React from 'react';

function SignIn() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="max-w-md w-full px-6 py-8 bg-card shadow-md overflow-hidden sm:rounded-lg">
                <div className="text-center">
                    <img src="/guts.png" alt="logo" className="h-40 mx-auto mb-6" />
                    <h1 className="text-3xl font-extrabold text-primary-foreground">Sign In or Consequence</h1>
                </div>
                <form className="mt-8 space-y-6" action="#" method="POST">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">Pseudo</label>
                            <input id="username" name="username" type="text" autoComplete="username" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-border placeholder-muted-foreground text-foreground rounded-t-md focus:outline-none focus:ring-ring focus:border-ring focus:z-10 sm:text-sm" placeholder="Pseudo" />
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input id="email" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-border placeholder-muted-foreground text-foreground rounded-md focus:outline-none focus:ring-ring focus:border-ring focus:z-10 sm:text-sm mt-1" placeholder="Email address" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-border placeholder-muted-foreground text-foreground rounded-b-md focus:outline-none focus:ring-ring focus:border-ring focus:z-10 sm:text-sm mt-1" placeholder="Password" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
