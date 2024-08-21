"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathName = usePathname();
  const params = useParams();

  const route = [
    {
      href: `/${params.storeid}`,
      label: "Overview",
      active: pathName === `/${params.storeid}`,
    },
    {
      href: `/${params.storeid}/billboards`,
      label: "Billboards",
      active: pathName === `/${params.storeid}/billboards`,
    },
    {
      href: `/${params.storeid}/categories`,
      label: "Categories",
      active: pathName === `/${params.storeid}/categories`,
    },
    {
      href: `/${params.storeid}/sizes`,
      label: "Sizes",
      active: pathName === `/${params.storeid}/sizes`,
    },
    {
      href: `/${params.storeid}/colors`,
      label: "Colors",
      active: pathName === `/${params.storeid}/colors`,
    },
    {
      href: `/${params.storeid}/products`,
      label: "Products",
      active: pathName === `/${params.storeid}/products`,
    },
    {
      href: `/${params.storeid}/orders`,
      label: "Orders",
      active: pathName === `/${params.storeid}/orders`,
    },
    {
      href: `/${params.storeid}/settings`,
      label: "Settings",
      active: pathName === `/${params.storeid}/settings`,
    },
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {route.map((routes) => (
        <Link
          key={routes.href}
          href={routes.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            routes.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {routes.label}
        </Link>
      ))}
    </nav>
  );
}
