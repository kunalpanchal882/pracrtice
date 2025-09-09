const  { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey:"AIzaSyDj1ycc1id-epz4PAbfVHnAhK3q7wTzXRM"
});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}

main();