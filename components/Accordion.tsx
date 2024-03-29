import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AccordionBox = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Return Policy</AccordionTrigger>
        <AccordionContent>
          If you receive an order with a defect or an issue, please take a
          picture of the item, laying flat and send it to{" "}
          <span className="font-bold">prayse@gmail.com</span> with the Order ID
          and Order Reference numbers. At this moment we are not able to fully
          refund you the amount, but we will resubmit a new order for that item
          that will ship to your provided address.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionBox;
