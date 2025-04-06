const form = document.getElementById('dictionary-form');
const input = document.getElementById('word-input');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const word = input.value.trim().toLowerCase();
  if (!word) return;

  resultDiv.innerHTML = '<p class="loading">Searching for "' + word + '"...</p>';

  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!res.ok) throw new Error("Word not found");

    const data = await res.json();

    const entry = data[0];
    const phonetic = entry.phonetic || 'N/A';
    const meaning = entry.meanings[0];
    const definition = meaning.definitions[0];

    let html = `
      <h2>${entry.word}</h2>
      <p><strong>Phonetic:</strong> ${phonetic}</p>
      <div class="definition">
        <h3>${meaning.partOfSpeech}</h3>
        <p><strong>Definition:</strong> ${definition.definition}</p>
        ${definition.example ? `<p><em>Example:</em> "${definition.example}"</p>` : ''}
      </div>
    `;

    resultDiv.innerHTML = html;
  } catch (err) {
    resultDiv.innerHTML = `<p class="loading">❌ Word not found. Try another!</p>`;
  }
});
