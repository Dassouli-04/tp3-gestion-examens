document.getElementById('add-proposition').addEventListener('click', () => {

  const div = document.createElement('div');
  div.className = 'proposition';

  
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Texte de la proposition';
  input.required = true;

  
  div.appendChild(checkbox);
  div.appendChild(input);

  
  document.getElementById('propositions').appendChild(div);
});

document.getElementById('form-question').addEventListener('submit', function (e) {
  e.preventDefault();

  
  const proprietaire = document.getElementById('proprietaire').value.trim();
  const nomExamen = document.getElementById('nom-examen').value.trim();
  const enonce = document.getElementById('enonce').value.trim();
  const duree = document.getElementById('duree').value.trim();
  const points = document.getElementById('points').value.trim();

  if (!proprietaire || !nomExamen || !enonce || !duree || !points) {
    alert('Veuillez remplir tous les champs.');
    return;
  }

  
  const propositions = [];
  document.querySelectorAll('#propositions div').forEach(div => {
    const checkbox = div.querySelector('input[type="checkbox"]');
    const input = div.querySelector('input[type="text"]');

    if (input.value.trim() !== '') {
      propositions.push({
        texte: input.value.trim(),
        correcte: checkbox.checked
      });
    }
  });

  if (propositions.length === 0) {
    alert('Ajoutez au moins une proposition.');
    return;
  }

  if (!propositions.some(p => p.correcte)) {
    alert('Ajoutez au moins une proposition correcte.');
    return;
  }

  
  const key = 'examens_' + proprietaire;
  const examens = JSON.parse(localStorage.getItem(key)) || [];

  
  const exam = examens.find(examen => examen.nom === nomExamen);

  
  if (!exam) {
    alert('Examen introuvable pour ce propriétaire.');
    return;
  }

  
  const question = {
    enonce: enonce,
    duree: Number(duree),
    points: Number(points),
    propositions: propositions
  };

  exam.questions.push(question);
  localStorage.setItem(key, JSON.stringify(examens));

  alert('Question ajoutée avec succès !');
  this.reset();
  document.getElementById('propositions').innerHTML = '';
});
