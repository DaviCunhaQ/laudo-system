"use client";

import { Card } from "@/components/ui/card";
import { MultiStepProvider } from "../context/Multistepper";
import Form1 from "@/containers/HandleNewOccurrence/Form";
import Form2 from "@/containers/HandleNewOccurrence/Form2";
import Form3 from "@/containers/HandleNewOccurrence/Form3";
import Form4 from "@/containers/HandleNewOccurrence/Form4";
import Form5 from "@/containers/HandleNewOccurrence/Form5";
import FormSend from "@/containers/HandleNewOccurrence/FormSend";
import Form1Update from "@/containers/HandleUpdateOccurrence/Form";
import Form2Update from "@/containers/HandleUpdateOccurrence/Form2";
import Form3Update from "@/containers/HandleUpdateOccurrence/Form3";
import Form4Update from "@/containers/HandleUpdateOccurrence/Form4";
import Form5Update from "@/containers/HandleUpdateOccurrence/Form5";
import FormSendUpdate from "@/containers/HandleUpdateOccurrence/FormSend";
import { ListDraftSchema, ViewOccurenceSchema } from "@/dtos";

export function MultiStepper({data}: {data?:ListDraftSchema}) {
  return (
    <Card className="w-full rounded-none">
      <MultiStepProvider>
        <Form1 draftData={data?.formData}/>
        <Form2 draftData={data?.formData}/>
        <Form3 draftData={data?.formData}/>
        <Form4 draftData={data?.formData}/>
        <Form5/>
        <FormSend/>
      </MultiStepProvider>
    </Card>
  );
}

export function MultiStepperUpdate({data}: {data?:ViewOccurenceSchema}){
  return (
    <Card className="w-full rounded-none">
      <MultiStepProvider>
        <Form1Update data={data}/>
        <Form2Update data={data?.location}/>
        <Form3Update data={data}/>
        <Form4Update data={data}/>
        <Form5Update data={data}/>
        <FormSendUpdate/>
      </MultiStepProvider>
    </Card>
  )
}