"use client";

import React, { useState } from "react";
import Select from "react-tailwindcss-select";
import { Option, Options } from "react-tailwindcss-select/dist/components/type";

type FormSelectInputProps = {
options: Options | null;
label: string;
option: Option | null;
setOption: any;
href?: string;
labelShown?: boolean;
toolTipText?: string;
};

export default function FormSelectInput({
options,
label,
option,
setOption,
labelShown = true,
}: FormSelectInputProps) {


return (
<div className="">
  {labelShown && (
    <h2 className="pb-2 block text-sm font-medium leading-6 text-gray-900">
      Select {label}
    </h2>
  )}
  <div className="flex items-center space-x-2">
    <Select
      isSearchable
      primaryColor="blue"
      value={option}
      onChange={(item) => setOption(item)}
      options={options!}
      placeholder={label}
    />
  </div>
</div>
);
}
 