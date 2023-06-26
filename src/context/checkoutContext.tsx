import { useState, createContext } from "react";

type CheckoutContextProps = {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
}

export const CheckoutContext = createContext<CheckoutContextProps>({
  isSidebarOpen: false,
  openSidebar: () => {},
  closeSidebar: () => {},
});

export default function CheckoutProvider({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const openSidebar = () => {
      setIsSidebarOpen(true);
    };
  
    const closeSidebar = () => {
      setIsSidebarOpen(false);
    };

    return (
        <CheckoutContext.Provider value={{ isSidebarOpen, openSidebar, closeSidebar }}>
          {children}
        </CheckoutContext.Provider>
    )
}