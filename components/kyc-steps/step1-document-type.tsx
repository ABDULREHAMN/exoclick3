"use client"

import { BadgeIcon as IdCard, StampIcon as Passport, Car } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useKyc } from "../kyc-context"

export default function Step1DocumentType() {
  const { selectedDocumentType, setSelectedDocumentType } = useKyc()

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-4">
        <h3 className="text-sm font-medium mb-2">Select Document Type</h3>
        <p className="text-sm text-gray-500 mb-4">
          Choose the type of identification document you will use for verification.
        </p>
        <RadioGroup
          value={selectedDocumentType || ""}
          onValueChange={setSelectedDocumentType}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Label
            htmlFor="cnic"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-blue-500 cursor-pointer"
          >
            <RadioGroupItem value="cnic" id="cnic" className="sr-only" />
            <IdCard className="mb-3 h-8 w-8 text-blue-500" />
            <span className="block text-sm font-medium">CNIC (National ID)</span>
          </Label>
          <Label
            htmlFor="passport"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-blue-500 cursor-pointer"
          >
            <RadioGroupItem value="passport" id="passport" className="sr-only" />
            <Passport className="mb-3 h-8 w-8 text-blue-500" />
            <span className="block text-sm font-medium">Passport</span>
          </Label>
          <Label
            htmlFor="driving-license"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-blue-500 cursor-pointer"
          >
            <RadioGroupItem value="driving-license" id="driving-license" className="sr-only" />
            <Car className="mb-3 h-8 w-8 text-blue-500" />
            <span className="block text-sm font-medium">Driving License</span>
          </Label>
        </RadioGroup>
      </div>
    </div>
  )
}
