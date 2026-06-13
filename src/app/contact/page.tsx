import type { Metadata } from "next";
import ContactView from "./ContactView";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with Curri Architect about your residential, commercial or cultural project.",
};

export default function ContactPage() {
  return <ContactView />;
}
