import { redirect } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

/** Facility detail page is disabled — redirect to facilities list */
export default async function FacilitySlugPage({ params }: Props) {
  await params;
  redirect("/facilities");
}
