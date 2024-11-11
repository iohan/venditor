import { AlertDialogProvider } from "@/hooks/use-alert-dialog";
import { SessionProvider } from "next-auth/react";

const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <SessionProvider>
      <AlertDialogProvider>{children}</AlertDialogProvider>
    </SessionProvider>
  );
};

export default Providers;
