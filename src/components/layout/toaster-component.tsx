"use client";

import {useTheme} from "next-themes";
import {Toaster, ToasterProps} from "sonner";

function ToasterComponent() {
  const {theme, resolvedTheme} = useTheme();

  const appliedTheme = (theme === "system" ? resolvedTheme : theme) as ToasterProps["theme"];

  return <Toaster richColors position="bottom-right" theme={appliedTheme} />;
}

export default ToasterComponent;
