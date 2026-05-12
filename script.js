
document.getElementById('form-examen').addEventListener('submit', function (e) {

  e.preventDefault();

  const nom = document.getElementById('nom').value.trim();
  const duree = document.getElementById('duree').value.trim();
  const description = document.getElementById('description').value.trim();
  const proprietaire = document.getElementById('proprietaire').value.trim();

  if (!nom || !duree || !description || !proprietaire) {
    alert('Veuillez remplir tous les champs.');
    return;
  }
  const examen = {
    nom: nom,
    duree: Number(duree),
    description: description,
    proprietaire: proprietaire,
    questions: []
  };

  const key = 'examens_' + proprietaire;
  const examens = JSON.parse(localStorage.getItem(key)) || [];
  examens.push(examen);
  localStorage.setItem(key, JSON.stringify(examens));

  alert('Examen ajouté avec succès !');
  this.reset();
});
