"use server"

import { ReviewCardProps } from "@/utils/types";


  // Create NEXT_PUBLIC_FEEDBOX_API_URL and FEEDBOX_API_KEY variables in .env file
  export async function getReviews() {
    try {
      const response = await fetch('https://feedbox-sync.vercel.app/api/v1/reviews', {
        headers: {
          "x-api-key": process.env.FEEDBOX_API_KEY as string,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
      const results = await response.json();
      if (response.status === 401) {
        return {
          error: "Failed to fetch Reviews",
          data: null,
        };
      }
  
      return {
        error: null,
        data: results.data as ReviewCardProps[],
      };
    } catch (err: any) {
      console.log(err);
    }
  }