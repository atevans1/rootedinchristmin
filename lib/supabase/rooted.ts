import { createSupabaseServerClient } from "./server";

/** Returns a server client explicitly scoped to Rooted In Christ data. */
export async function createRootedSupabaseServerClient() {
  const client = await createSupabaseServerClient();
  return client?.schema("rooted_in_christ") ?? null;
}
