
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

type DeletePopupProps = {
    handleDelete: (value: string) => void;
    title: string;
    id: string
}

export default function DeletePopup ({ handleDelete, title, id}: DeletePopupProps) {

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                    <button>
                        <Trash className="w-4 h-4 text-red-500 hover:text-red-600">Delete</Trash>
                    </button>
            </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your {title}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(id)}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
        </AlertDialog>

    )
}