import React from "react";
import { Download } from "lucide-react";
import { WebsiteType, BasicService } from "../types/calculator";
import {
  BASE_PRICES,
  PRICE_PER_PAGE,
  calculateTotalCost,
} from "../utils/pricing";

interface CostSummaryProps {
  websiteType: WebsiteType;
  numberOfPages: number;
  services: BasicService[];
  onDownloadClick: () => void;
}

export function CostSummary({
  websiteType,
  numberOfPages,
  services,
  onDownloadClick,
}: CostSummaryProps) {
  const basePrice = BASE_PRICES[websiteType];
  const pagePrice = PRICE_PER_PAGE[websiteType] * (numberOfPages - 1);
  const selectedServices = services.filter((service) => service.selected);
  const total = calculateTotalCost(websiteType, numberOfPages, services);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Cost Summary</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Base Price ({websiteType.replace("-", " ")})</span>
          <span>${basePrice}</span>
        </div>
        {pagePrice > 0 && (
          <div className="flex justify-between">
            <span>Additional Pages ({numberOfPages - 1})</span>
            <span>${pagePrice}</span>
          </div>
        )}
        {selectedServices.map((service) => (
          <div key={service.id} className="flex justify-between">
            <span>{service.name}</span>
            <span>${service.price}</span>
          </div>
        ))}
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between text-xl font-semibold">
            <span>Total Estimate</span>
            <span>${total}</span>
          </div>
        </div>
        <button
          onClick={onDownloadClick}
          className="w-full mt-6 flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          <Download size={20} />
          <span>Download Quote</span>
        </button>
      </div>
    </div>
  );
}
