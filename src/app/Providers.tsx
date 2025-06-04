import React from "react";
import { AccountProvider } from "../context/Account";

type Props = {
    children: React.ReactNode;
};
export default function Providers({ children }: Props) {
    return (
        <>
        <AccountProvider>
            {children}
        </AccountProvider>
        </>
    );
}