import { client } from "@/sanity/client";
import AboutClient from "./AboutClient";
import type { OpenRole } from "@/components/OpenRoles";

async function getOpenRoles(): Promise<OpenRole[]> {
  return client.fetch(
    `*[_type == "openRole"] | order(order asc) { _id, title, description, available, location }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export default async function AboutPage() {
  const openRoles = await getOpenRoles();
  return <AboutClient openRoles={openRoles} />;
}
