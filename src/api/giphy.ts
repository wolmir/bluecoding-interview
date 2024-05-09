export interface Images {
  width: number
  height: number
  url: string
}

export interface GIF {
  id: string
  url: string
  images: {
    fixed_height: Images
    original: Images
  }
}

export interface Pagination {
  offset: number
  total_count: number
  count: number
}

export interface SearchResults {
  data: GIF[]
  pagination: Pagination
}

export interface SearchParams {
  q: string
  limit?: number
  offset?: number
}

export async function search(params: SearchParams): Promise<SearchResults> {
  let url = 'https://api.giphy.com/v1/gifs/search?'
  const apiKey: string = import.meta.env.VITE_GIPHY_API_KEY
  url += 'api_key=' + apiKey
  url += `&q=${params.q}`

  if (params.limit) {
    url += `&limit=${params.limit}`
  }
  if (params.offset) {
    url += `&offset=${params.offset}`
  }

  const response = await fetch(url)
  const json = await response.json()
  return json
}
