import * as prismic from "@prismicio/client";

const repositoryName = "example-astro";

export function createPrismicClient(options?: prismic.ClientConfig) {
  const endpoint = prismic.getRepositoryEndpoint(repositoryName);
  return prismic.createClient(endpoint, options);
}
