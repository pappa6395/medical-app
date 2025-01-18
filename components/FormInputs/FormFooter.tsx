import React from "react";
import CloseButton from "@/components/FormInputs/CloseBtn";
import SubmitButton from "./SubmitButton";
 
export default function FormFooter({
href,
editingId,
loading,
title,
parent,
}: {
href: string,
editingId: string | undefined,
loading: boolean,
title: string,
parent?: string,
}) {
return (
<div className="flex items-center  gap-2 py-4 justify-between ">
  <CloseButton href={href} parent={parent} />
  <SubmitButton
    title={editingId ? `Update ${title}` : `Save ${title}`}
    isLoading={loading}
    loadingTitle={editingId ? "Updating" : "Saving" }
  />
</div>
);
}
 