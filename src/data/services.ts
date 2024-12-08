import { BasicService } from "../types/calculator";

export const basicServices: BasicService[] = [
  { id: "domain", name: "Domain Registration", price: 15 },
  { id: "hosting", name: "Hosting", price: 100 },
  { id: "email", name: "Email IDs", price: 50 },
  { id: "seo", name: "SEO Setup", price: 300 },
  { id: "popups", name: "Pop-up Banners", price: 150 },
  { id: "admin", name: "Admin Panel", price: 800 },
  { id: "content", name: "Content Writing", price: 400 },
];

export const advancedServices: BasicService[] = [
  { id: "chat", name: "Live Chat Integration", price: 200 },
  { id: "gbusiness", name: "Google Business Setup", price: 150 },
  { id: "whatsapp", name: "WhatsApp Chat", price: 100 },
  { id: "call", name: "Call Button", price: 50 },
  { id: "payment", name: "Payment Gateway", price: 500 },
  { id: "sms", name: "SMS API Integration", price: 300 },
];
