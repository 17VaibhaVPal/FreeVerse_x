import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { GoogleOAuthProvider } from '@react-oauth/google'
import {Toaster} from 'react-hot-toast'
import {QueryClientProvider, QueryClient } from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
const queryClient = new QueryClient()

const inter = Inter({ subsets: ["latin"] });
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId="949992761626-sjv85anp1ef2limnutvavkppmmdfvers.apps.googleusercontent.com">
        <Component {...pageProps} />
        <Toaster/>
        <ReactQueryDevtools/>
      </GoogleOAuthProvider>
      </QueryClientProvider>
    </div>
  );
}
