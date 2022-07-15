import "../styles/normalize.css"
import "../styles/globals.css"

import { RecoilRoot } from "recoil"
import { Hydrate, QueryClient, QueryClientProvider } from "react-query"
import { useState } from "react"
import type { AppProps } from "next/app"

import ModalProvider from "components/common/ModalProvider"

function App({ Component, pageProps }: AppProps) {
  /* react-query setup */
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            retry: false,
          },
        },
      })
  )

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
            <ModalProvider />
            <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export default App
