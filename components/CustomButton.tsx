
import { Button } from "@/components/ui/button"
import { ReactNode } from "react";
import Link from "next/link";

type CustomButtonProps = {
    title: string;
    icon?: ReactNode;
    href?: string;
    className?: string;
}

export default function CustomButton({ title, icon, href, className }: CustomButtonProps) {

  return (
    <div>
        {href ? (
            <Button asChild className={className}>
                <Link href={href} className="flex items-center">
                    {icon && <span className="mr-2 h-4 w-4">{icon}</span>}
                    {title}
                </Link>
            </Button>
        ) : (
            <Button className={className}>
                {icon && <span className="mr-2 h-4 w-4">{icon}</span>}
                {title}
            </Button>
        )}
    </div>
  )
}
