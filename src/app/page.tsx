import Link from "next/link";

// import { LatestPost } from "@/app/_components/post";
// import { api, HydrateClient } from "@/trpc/server";
import { Button } from "@/components/ui/button";
import LinkAccountButton from "@/components/link-account-button";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });

  // void api.post.getLatest.prefetch();

  return (
    // <HydrateClient>
      <LinkAccountButton />
    // </HydrateClient>
  );
}
