import { createSupabaseServerClient } from "./server";

/** Returns a server client explicitly scoped to Rooted In Christ data. */
export async function createRootedSupabaseServerClient() {
  const client = await createSupabaseServerClient();
  if (!client) return null;
  const rooted = client.schema("rooted_in_christ");
  // Keep Auth available while routing database calls to the isolated schema.
  return new Proxy(rooted, {
    get(target, property, receiver) {
      if (property === "auth") return client.auth;
      if (property === "storage") return client.storage;
      return Reflect.get(target, property, receiver);
    },
  }) as unknown as typeof client;
}
