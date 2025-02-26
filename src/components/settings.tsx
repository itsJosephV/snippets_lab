import React from "react";
import {Settings2} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {Button} from "./ui/button";

function Settings({...props}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label="Open actions menu" size="icon" variant="secondary" {...props}>
          <Settings2 />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>Another action</DropdownMenuItem>
        <DropdownMenuItem>Something else</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Settings;
