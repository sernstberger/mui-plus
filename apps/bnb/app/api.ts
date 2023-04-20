export interface Listing {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

export async function getListings(): Promise<Listing[]> {
  const response = await fetch('/api/listings');
  const listings = await response.json();
  return listings;
}
