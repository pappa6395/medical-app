import { ReviewCardProps } from '@/utils/types';
import React from 'react'
import Marquee from './ui/marquee';
import { generateStars } from '@/utils/generateStar';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import SectionHeading from './ui/SectionHeading';
import { Button } from './ui/button';


const ReviewCard = ({
    img,
    name,
    title,
    body,
    rating
  }: {
    img: string;
    name: string;
    title: string;
    body: string;
    rating: number;
  }) => {
    return (
      <figure
        className={cn(
          "relative w-72 h-96 cursor-pointer overflow-hidden rounded-xl border p-4",
          // light styles
          "border-gray-950/10 bg-green-800/90 hover:bg-green-950",
          // dark styles
          "dark:border-gray-50/10 dark:bg-green-200/50 dark:hover:bg-green-200/20",
        )}
      >
        <div className="flex flex-col items-center gap-2">
          <img className="pt-4 rounded-full" width="60" height="60" alt="user" src={img} />
          <div className="flex flex-col">
            <figcaption className="text-sm pt-2 text-center font-medium text-white">
              {name} 
            </figcaption>
              <span className="text-amber-200 text-center">{generateStars(rating)}</span>
            <p className="text-lg font-medium text-gray-100 pt-2">{title}</p>
          </div>
        </div>
        <blockquote className="mt-2 text-base font-medium 
        text-slate-200 overflow-scroll line-clamp-6"
        >
            {body}
        </blockquote>
      </figure>
    );
  };
  
  export function Testimonials({reviews, title}: {reviews: ReviewCardProps[], title: string}) {
    return (
      <div className='ralative bg-slate-50 dark:bg-slate-950
      rounded-tr-2xl px-8 py-16'>
          <div className='space-y-2 px-4'>
            <SectionHeading title={title}/>
            <p className="text-gray-500 text-2xl font-semibold dark:text-slate-50">
              See what our satisfied customers are saying about us.
            </p>
            <Button asChild variant={"review"}>
                <Link href={'https://feedbox-sync.vercel.app/reviews/form/medical-care-online'} target='_blank'>
                    Feel free to leave your reviews here
                </Link>
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center py-2">
              <div className="relative h-[400px] max-w-[360px] sm:max-w-[490px] md:max-w-[900px] 
              overflow-hidden rounded-lg border flex items-center
              bg-background md:shadow-md">
                  <Marquee reverse pauseOnHover className="[--duration:40s]">
                      {reviews?.map((review, i) => (
                          <ReviewCard 
                            key={i} 
                            img={review.reviewerImage || "/defaultImage.png"}
                            name={review.reviewerName}
                            title={review.reviewerTitle}
                            body={review.comment}
                            rating={review.rating}
                          />
                        ))}
                  </Marquee>
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-gray-300/60 dark:from-background"></div>
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-gray-300/60 dark:from-background"></div>
              </div>
          </div>
          
      </div>
      
    );
  }