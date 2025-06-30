import { client, urlFor } from "./sanity";
import { SanityProduct, SimpleProduct } from "@/types/sanity";
import type { FilteredResponseQueryOptions } from "@sanity/client";
export type { SimpleProduct } from "@/types/sanity";

function toSimpleProduct(product: SanityProduct): SimpleProduct {
  return {
    id: product.id.current,
    name: product.name,
    price: product.price,
    description: product.description,
    images: product.images.map((image) =>
      image.asset ? urlFor(image).url() : ""
    ),
    category: product.category,
    featured: product.featured,
    date: product.date,
  };
}

export async function getAllProducts(): Promise<SimpleProduct[]> {
  const query = `*[_type == "product"] | order(date desc) {
    _id,
    id,
    name,
    price,
    description,
    images,
    category,
    featured,
    date
  }`;

  const options: FilteredResponseQueryOptions = {
    filterResponse: true,
    perspective: "published",
    useCdn: false,
  };

  const products = await client.fetch<SanityProduct[]>(query, {}, options);
  return products.map(toSimpleProduct);
}

export async function getProductById(
  id: string
): Promise<SanityProduct | null> {
  const query = `*[_type == "product" && id.current == $id][0] {
    _id,
    id,
    name,
    price,
    description,
    images,
    category,
    weight,
    dimensions,
    material,
    featured,
    date
  }`;

  const options: FilteredResponseQueryOptions = {
    filterResponse: true,
    perspective: "published",
    useCdn: false,
  };

  const product = await client.fetch<SanityProduct | null>(
    query,
    { id },
    options
  );
  return product;
}

export async function getFeaturedProducts(
  limit?: number
): Promise<SimpleProduct[]> {
  let query = `*[_type == "product" && featured == true] | order(date desc) {
    _id,
    id,
    name,
    price,
    description,
    images,
    category,
    featured,
    date
  }`;

  if (limit) {
    query += `[0...${limit}]`;
  }

  const options: FilteredResponseQueryOptions = {
    filterResponse: true,
    perspective: "published",
    useCdn: false,
  };

  const products = await client.fetch<SanityProduct[]>(query, {}, options);
  return products.map(toSimpleProduct);
}
