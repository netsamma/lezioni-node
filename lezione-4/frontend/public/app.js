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
    var tableBody = document.querySelector('#table tbody');
    tableBody.innerHTML = ''; // Svuota la tabella prima di popolarla nuovamente

    records.forEach(record => {
      var row = document.createElement('tr');
      row.innerHTML = `
        <td>${record.id}</td>
        <td>${record.denominazione}</td>
        <td>${record.indirizzo}</td>
        <td><button class="edit-btn">Modifica</button></td>
      `;
      
      var editButton = row.querySelector('.edit-btn');
      editButton.addEventListener('click', function() {
        // Quando viene cliccato il pulsante di modifica, mostra un prompt per modificare i dati
        var updatedDenom = prompt('Inserisci nuova denominazione:', record.denominazione);
        if (updatedDenom !== null) {
          record.denominazione = updatedDenom;
          updateRecord(record);
        }
      });
      
      tableBody.appendChild(row);
    });
  }

  // Funzione per aggiornare un record tramite l'API
  function updateRecord(record) {
    fetch('URL_DEL_TUO_ALTRO_ENDPOINT_API_PER_AGGIORNAMENTO', {
      method: 'PUT', // Metodo HTTP per l'aggiornamento del record
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(record)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Errore durante l\'aggiornamento del record');
      }
      // Se l'aggiornamento è riuscito, ricarica i dati nella tabella
      fetchRecords();
    })
    .catch(error => {
      console.error(error);
    });
  }

  // Inizializza la tabella caricando i record dall'API
  fetchRecords();
});