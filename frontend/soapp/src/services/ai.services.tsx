
export const aiService = {
  improveContent: async (prompt: string) => {
    const response = await fetch('http://localhost:4000/posts/improve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      
      throw new Error("Error al contactar a la IA"); }

    // Retornamos el body para procesar el streaming
    return response.body; 
  }
};