import {LoaderIcon} from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className="animate-in fade-in-20 mt-14 flex w-full flex-col items-center text-neutral-500 duration-100 dark:text-neutral-400">
      <LoaderIcon className="animate-spin" size={20} />
      <p className="mt-2">Loading...</p>
    </div>
  );
};

export default loading;
