"use client";

import {useTheme} from "next-themes";
import {Toaster} from "sonner";

function ToasterComponent() {
  const {theme} = useTheme();

  return <Toaster richColors position="bottom-right" theme={theme === "dark" ? "dark" : "light"} />;
}

export default ToasterComponent;
