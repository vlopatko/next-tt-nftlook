import { type ClassValue, clsx } from "clsx"
import { Metadata } from "next"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function constructMetadata({
  title = 'NFTlook - Lopatko V.',
  description = 'This is an test task for NFTlook',
  image = '/thumbnail.png',
  icons = '/favicon.ico',
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    icons,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
          alt: 'Test task image desription',
        },
      ],
    },
    metadataBase: new URL('https://nftlook-lopatko.vercel.app'), // DON'T FORGET change this after deploy
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}
