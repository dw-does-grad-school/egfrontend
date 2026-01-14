export async function searchGallery(query: string) {
  const baseUrl = process.env.NEXT_PUBLIC_HF_SPACE_URL;
  
  // Note: Adjust the method (POST vs GET) based on your backend logic
  const response = await fetch(`${baseUrl}/search`, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${process.env.HF_TOKEN}` // Uncomment if needed
    },
    body: JSON.stringify({ query: query }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch from EchoGallery');
  }

  return response.json();
}