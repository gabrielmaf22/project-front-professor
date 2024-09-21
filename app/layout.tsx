import "./globals.css";

export const metadata = {
  title: 'App',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className="bg-gray-900">{children}</body>
    </html>
  )
}
