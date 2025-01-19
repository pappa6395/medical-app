import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { FAQItem } from "@/utils/types"

  
  
  export default function CustomAccordion({ FAQS }:{FAQS:FAQItem[]}) {

    
    return (
      <Accordion type="single" collapsible className="w-full">
        {FAQS.map((faq,i) => {
          return (
            <AccordionItem key={i} value={faq.qn}>
              <AccordionTrigger className="text-xl text-slate-800
               dark:text-slate-50"
              >{faq.qn}
              </AccordionTrigger>
              <AccordionContent className="text-lg text-slate-800
               dark:text-slate-50"
               >{faq.ans}
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    )
  }
  