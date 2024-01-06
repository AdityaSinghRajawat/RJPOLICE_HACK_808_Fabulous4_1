import "@/app/globals.css"
import Navbar from "@/components/Navbar"
import Provider from "@/components/Provider"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  )
}
