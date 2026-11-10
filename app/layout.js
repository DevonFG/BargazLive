export const metadata = {title: "Bargaz",description: "Bargaz software and services",};
export default function RootLayout({ children }) {return(
    <html lang="en">
      <body style={{ fontFamily: "Arial, sans-serif", margin: "40px" }}>
        {children}
      </body>
    </html>
);}
