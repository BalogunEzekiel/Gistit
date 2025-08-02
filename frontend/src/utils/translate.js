// frontend/src/utils/translate.js

export async function translateText(text, targetLang = 'yo') {
  const res = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${import.meta.env.VITE_GOOGLE_API_KEY}`,
    {
      method: 'POST',
      body: JSON.stringify({
        q: text,
        target: targetLang,
        format: 'text',
      }),
      headers: { 'Content-Type': 'application/json' },
    }
  );
  const data = await res.json();
  return data.data.translations[0].translatedText;
}
