import type {AppProps} from "next/app";
import {NextPageWithLayout} from "../pages/_app";

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}