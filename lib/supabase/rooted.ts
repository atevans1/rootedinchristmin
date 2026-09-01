import { createSupabaseServerClient } from "./server";

/** Returns a server client explicitly scoped to Rooted In Christ data. */
export async function createRootedSupabaseServerClient() {
  const client = await createSupabaseServerClient();
  if (!client) return null;
  const rooted = client.schema("rooted_in_christ");
  // Keep Auth available while routing database calls to the isolated schema.
  Object.defineProperty(rooted, "auth", { value: client.auth, enumerable: false });
  return rooted as unknown as typeof client;
}
