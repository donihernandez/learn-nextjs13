import '@/styles/global.css';

import type { Session } from 'next-auth';

import NavBar from '../components/NavBar';
import Provider from '@/components/Provider';

export const metadata = {
    title: 'Promptopia',
    description: 'Discover & Share AI Prompts',
};

const RootLayout = ({
    children,
    session,
}: {
    children: React.ReactNode;
    session: Session;
}) => {
    return (
        <html lang="en">
            <body suppressHydrationWarning={true}>
                <Provider session={session}>
                    <div className="main">
                        <div className="gradient"></div>
                    </div>

                    <main className="app">
                        <NavBar />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    );
};

export default RootLayout;
