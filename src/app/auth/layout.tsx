import React from "react";

type AuthLayoutsProps = {
  children: React.ReactNode;
};

function AuthLayout({children}: AuthLayoutsProps) {
  return (
    <main>
      <div className="flex flex-col items-center justify-center">{children}</div>
    </main>
  );
}

export default AuthLayout;
