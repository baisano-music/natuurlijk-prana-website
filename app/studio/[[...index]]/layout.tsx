export const metadata = {
  title: 'Sanity Studio',
  robots: 'noindex, nofollow',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ minHeight: '100vh' }}>{children}</div>
  )
}
