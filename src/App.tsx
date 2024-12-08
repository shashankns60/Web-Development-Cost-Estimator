import React, { useState } from "react";
import { WebsiteType, BasicService, ContactInfo } from "./types/calculator";
import { basicServices, advancedServices } from "./data/services";
import { ServiceCheckbox } from "./components/ServiceCheckbox";
import { CostSummary } from "./components/CostSummary";
import { ContactModal } from "./components/ContactModal";
import { Calculator } from "lucide-react";
import { calculateTotalCost } from "./utils/pricing";

function App() {
  const [websiteType, setWebsiteType] = useState<WebsiteType>("static");
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [services, setServices] = useState<BasicService[]>([
    ...basicServices,
    ...advancedServices,
  ]);
  const [specialRequirements, setSpecialRequirements] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleServiceChange = (id: string, checked: boolean) => {
    setServices(
      services.map((service) =>
        service.id === id ? { ...service, selected: checked } : service
      )
    );
  };

  const handleDownloadQuote = (contactInfo: ContactInfo) => {
    const quote = generateQuoteText(
      websiteType,
      numberOfPages,
      services,
      specialRequirements,
      contactInfo
    );
    const blob = new Blob([quote], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "website-quote.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 bodyBack">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-center ">
          <img src="/src/logo.png" alt="" className="w-48 text-center " />
        </div>
        <div className="flex items-center space-x-4 mb-8 items-center justify-center">
          <h1 className="text-4xl font-bold text-white-900 text-center">
            Website Cost Calculator
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Website Type
                  </label>
                  <select
                    value={websiteType}
                    onChange={(e) =>
                      setWebsiteType(e.target.value as WebsiteType)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="static">Static Website</option>
                    <option value="dynamic">Dynamic Website</option>
                    <option value="corporate">Corporate Website</option>
                    <option value="one-page">One-Page Website</option>
                    <option value="ecommerce">E-commerce Website</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Number of Pages
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={numberOfPages}
                    onChange={(e) =>
                      setNumberOfPages(Math.max(1, parseInt(e.target.value)))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Basic Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {basicServices.map((service) => (
                  <ServiceCheckbox
                    key={service.id}
                    service={service}
                    onChange={handleServiceChange}
                  />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Advanced Add-ons</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {advancedServices.map((service) => (
                  <ServiceCheckbox
                    key={service.id}
                    service={service}
                    onChange={handleServiceChange}
                  />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">
                Special Requirements
              </h2>
              <textarea
                value={specialRequirements}
                onChange={(e) => setSpecialRequirements(e.target.value)}
                rows={4}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter any special requirements or custom features you need..."
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <CostSummary
                websiteType={websiteType}
                numberOfPages={numberOfPages}
                services={services}
                onDownloadClick={() => setIsModalOpen(true)}
              />
            </div>
          </div>
        </div>

        <ContactModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleDownloadQuote}
        />
      </div>
    </div>
  );
}

function generateQuoteText(
  websiteType: WebsiteType,
  numberOfPages: number,
  services: BasicService[],
  specialRequirements: string,
  contactInfo: ContactInfo
): string {
  const selectedServices = services.filter((service) => service.selected);
  const total = calculateTotalCost(websiteType, numberOfPages, services);

  return `
Website Development Quote

Client Information:
------------------
Name: ${contactInfo.name}
City: ${contactInfo.city}
Email: ${contactInfo.email}
Mobile: ${contactInfo.mobile}

Project Details:
---------------
Website Type: ${websiteType.replace("-", " ")}
Number of Pages: ${numberOfPages}

Selected Services:
-----------------
${selectedServices
  .map((service) => `- ${service.name}: $${service.price}`)
  .join("\n")}

Special Requirements:
-------------------
${specialRequirements || "None specified"}

Total Estimated Cost: $${total}

Note: This is an estimated cost based on the selected options. Final pricing may vary based on specific requirements and customizations.
`;
}

export default App;
