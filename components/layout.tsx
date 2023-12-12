import { ProcessTimeline } from "./process-timeline";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <ProcessTimeline />
      <main>{children}</main>
    </>
  );
};
