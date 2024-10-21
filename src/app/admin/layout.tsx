export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div>Admin page</div>
      <div>{children}</div>
    </>
  );
}
