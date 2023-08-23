import ListItem from '@/components/list-item';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row p-6 justify-center">
      <div className="flex flex-col pr-6">
        <ListItem />
      </div>
      <div className="flex flex-col gap-4 w-[52rem]">{children}</div>
    </div>
  );
}
