import { createSupabaseServerClient } from "./server";

/** Returns a server client explicitly scoped to Rooted In Christ data. */
export async function createRootedSupabaseServerClient() {
  const client = await createSupabaseServerClient();
  if (!client) return null;
  const rooted = client.schema("rooted_in_christ");
  // Schema clients share the parent client's Auth API at runtime.
  return rooted as unknown as typeof client;
}
