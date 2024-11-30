"user client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

type Payment = {
    sku: string;
    stock: string;
    price: string;
    size: string;
  };

export const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "sku",
      header: "SKU",
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <Input
                id="noOfStock"
                type="number"
                />
          </div>
        );
      }
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <Input
                id="stockPrice"
                type="number"
                />
          </div>
        );
      }
    },
    {
      accessorKey: "size",
      header: "Size",
      cell: ({ row }) => {
        return (
          
            <ToggleGroup type="single">
                <ToggleGroupItem value="s">S</ToggleGroupItem>
                <ToggleGroupItem value="m">M</ToggleGroupItem>
                <ToggleGroupItem value="l">L</ToggleGroupItem>
            </ToggleGroup>

        );
      }
    }
  ];
  
export const data: Payment[] = [
    {
      sku: "GGPC-001",
      stock: "100",
      price: "99.99",
      size: "S"
    },
  ];

