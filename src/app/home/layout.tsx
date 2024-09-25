import "../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <title>Controle de Compras ICMBIO</title>
      </head>
      <body>
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
