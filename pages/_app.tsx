import Layout from "../components/layout";
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import "../styles/global.css"
import {AppPropsWithLayout} from "../types/AppPropsWithLayout";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}