document.addEventListener("DOMContentLoaded", function() {

  // Funzione per ottenere i dati dall'API
  function fetchRecords() {
    fetch('/get-shops')
      .then(response => {
        if (!response.ok) {
          throw new Error('Errore durante il recupero dei dati');
        }
        return response.json();
      })
      .then(data => {
        // Aggiungi i record alla tabella
        populateTable(data);
      })
      .catch(error => {
        console.error(error);
      });
  }


  // Funzione per popolare la tabella con i dati ottenuti dall'API
  function populateTable(records) {

    // console.log(records);
    var tableBody = document.querySelector('#table tbody');
    tableBody.innerHTML = ''; // Svuota la tabella prima di popolarla nuovamente

    records.forEach(record => {
      var row = document.createElement('tr');
      row.innerHTML = `
        <td>${record.id}</td>
        <td>${record.denominazione}</td>
        <td>${record.indirizzo}</td>
        <td><button class="edit-btn" data-id=${record.id}>Modifica</button></td>
      `;      
      
      // Aggiungi riga alla tabella
      tableBody.appendChild(row);

      // Aggiungi listener click su ogni pulsante "Modifica"
      var editButton = row.querySelector('.edit-btn');
      editButton.addEventListener('click', function() {
        fetchEditForm(record);
      });

    });
  }


  
  function fetchEditForm(selectedRecord) {
    fetch('/form.html')
      .then(response => response.text())
      .then(data => {
        // Aggiungi il contenuto della modal al div #form
        document.getElementById("form").innerHTML = data;
        document.getElementsByName('id')[0].value = selectedRecord.id;
        document.getElementsByName('denominazione')[0].value = selectedRecord.denominazione;
        document.getElementsByName('indirizzo')[0].value = selectedRecord.indirizzo;
      })
      .catch(error => console.error('Error:', error));
  }


  // Inizializza la tabella caricando i record dall'API
  fetchRecords();

});