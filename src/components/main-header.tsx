interface MainHeaderProps {
  title: string;
  children: React.ReactNode;
}
export default function MainHeader({ title, children }: MainHeaderProps) {
  return (
    <>
      <header className="w-full py-[2rem] flex justify-between items-center">
        <h1 className="text-[1.5rem] text-main-color font-bold">{title}</h1>
        {children}
      </header>
    </>
  );
}
