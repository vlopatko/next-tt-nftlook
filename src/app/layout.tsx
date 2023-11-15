import './globals.css'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import NavBar from '@/components/NavBar'
import { constructMetadata } from '@/lib/utils'
import { ReduxProvider } from '@/redux/provider'

export const metadata = constructMetadata()

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <ReduxProvider>
          <NavBar />
          <MaxWidthWrapper className="flex-1">{children}</MaxWidthWrapper>
        </ReduxProvider>
      </body>
    </html>
  )
}
