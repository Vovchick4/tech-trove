import ListItem from '@/components/list-item';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col p-6 justify-center md:flex-row">
      <div className="flex flex-col md:pr-6 md:min-w-[20rem]">
        <ListItem />
      </div>
      <div className="flex flex-col gap-4 md:w-[52rem]">{children}</div>
    </div>
  );
}
