var neuerAuftragFlag_1 = false;
var zweitePaletteFlag_1 = false;
var neuerAuftragFlag_2 = false;
var zweitePaletteFlag_2 = false;


var previousValues = {}; // Objekt zum Speichern der vorherigen Werte
var previousValuesPalettenwechsel = {}; // Objekt zum Speichern der vorherigen Werte


// Event-Handler für die Checkbox
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("neuerAuftragCheckbox_1").addEventListener("change", function() {

    neuerAuftragFlag_1 = this.checked;
    
    });
    document.getElementById("neuerAuftragCheckbox_2").addEventListener("change", function() {
    
    neuerAuftragFlag_2 = this.checked;
    
    });
    
    document.getElementById("zweitePaletteCheckbox_1").addEventListener("change", function() {
    
    zweitePaletteFlag_1= this.checked;
    
    
    })
    
    document.getElementById("zweitePaletteCheckbox_2").addEventListener("change", function() {
    
    zweitePaletteFlag_2= this.checked;
    
    
    })
   
    document.getElementById("resetButton").addEventListener("click", deleteAllValues);
    
    });





function editStueckzahl(reiheNummer) {

var input = prompt("Stückzahl eingeben:", 0);

var vorherigeReiheNummer = reiheNummer - 1;

var currentValue = parseInt(document.getElementById("stueckzahl-palette-" + reiheNummer).value);

var newValue = parseInt(input);



if (input !== null && !isNaN(newValue)) {

// Vorherigen Wert speichern

previousValues[reiheNummer] = currentValue;



// Neue Eingabe verarbeiten

var updatedValue = newValue;

document.getElementById("stueckzahl-palette-" + reiheNummer).value = updatedValue;
var previousRowValue = reiheNummer - 1 >= 1 ? parseInt(document.getElementById("stueckzahl-palette-" + (reiheNummer - 1)).value) : 0;

var updatedPaletteValue = updatedValue;
document.getElementById("stueckzahl-palette-" + reiheNummer).value = isNaN(updatedPaletteValue) || updatedPaletteValue === null ? 0 : updatedPaletteValue;



var zaehlwerkValue = updatedValue;
document.getElementById("zaehlwerk-" + reiheNummer).value = isNaN(zaehlwerkValue) || zaehlwerkValue === null ? 0 : zaehlwerkValue;

// Zurücksetzen von Stückzahl-Palette nach einer Palettenwechsel

if (vorherigeReiheNummer >= 1) {

  var stueckzahlPalettenWechseln = parseInt(document.getElementById("stueckzahl-palettenwechseln-" + vorherigeReiheNummer).value);
  var stueckzahlNachPalettenwechsel = stueckzahlPalettenWechseln > 0 ? updatedValue : updatedPaletteValue + previousRowValue;
  document.getElementById("stueckzahl-palette-" + reiheNummer).value = stueckzahlNachPalettenwechsel;

}

// Aktualisierung von Zählerwerk nach einer Palettenwechsel

if (reiheNummer > 1) {

  var previousZaehlwerkValue = parseInt(document.getElementById("zaehlwerk-" + (reiheNummer - 1)).value) + newValue;

  document.getElementById("zaehlwerk-" + reiheNummer).value = previousZaehlwerkValue;

}



// Prüfung auf neuen Auftrag und Zurücksetzen von Zähler und Stückzahl-Palette, in Fall dass der Stückzahl nach hinein korrigiert wird, Zähler wird aktualisiert


if ((neuerAuftragFlag_1 || neuerAuftragFlag_2) && (reiheNummer > 1)) {

var stueckzahlPalettenWechseln = parseInt(document.getElementById("stueckzahl-palettenwechseln-" + reiheNummer).value);

document.getElementById("zaehlwerk-" + reiheNummer).value = 0 + newValue + stueckzahlPalettenWechseln;

document.getElementById("stueckzahl-palette-" + reiheNummer).value = 0 + newValue;


}
saveSelectedValue();
saveTodayDate();
saveFormData();

}

setZeroToUnvisible();

}

// Überprüfung auf Eingabe in den Feldern, wenn Null dann wird in der CSS Datei der Schriftfarbe auf Weiss gewechselt

function setZeroToUnvisible() {
var inputs = document.querySelectorAll('input[type="number"]');
inputs.forEach(function(input) {

if (input.value != 0) {

input.classList.add('has-value');

} else {

input.classList.remove('has-value');

}



input.addEventListener('input', function() {

if (this.value != 0) {

this.classList.add('has-value');

} else {

this.classList.remove('has-value');

}

});

});

}





function editPalettenWechsel(reiheNummer) {
var palettenwechselInput = document.getElementById("stueckzahl-palettenwechseln-" + reiheNummer);
var zweiterPalettenwechselInput = document.getElementById("zweiteStueckzahlPalettenwechseln-" + reiheNummer);
var zweiterPalettenwechselContainer = document.getElementById("zweiterPalettenwechselContainer-" + reiheNummer);
var zweitePaletteCheckbox_1 = document.getElementById("zweitePaletteCheckbox_1").checked;
var zweitePaletteCheckbox_2 = document.getElementById("zweitePaletteCheckbox_2").checked;




if (zweitePaletteCheckbox_1 || zweitePaletteCheckbox_2) {
// Die Checkbox ist aktiviert, zeige das zweite Inputfeld an
zweiterPalettenwechselContainer.style.display = "inline";


// Hier öffnen wir das Prompt-Fenster, um den zweiten Wert einzugeben
var input = prompt("Stückzahl bei Palettenwechsel eingeben:", "0");
if (input !== null) {
  var newValuePalettenwechsel = parseInt(input);

  if (!isNaN(newValuePalettenwechsel)) {
    var currentValuePalettenwechsel = palettenwechselInput.value;
    var currentValueZweiterPalettenwechsel = zweiterPalettenwechselInput.value;

    console.log("currentValueZweiterPalettenwechsel:" + currentValueZweiterPalettenwechsel);
    var vorherigeStueckzahlPalettenwechsel = parseInt(currentValuePalettenwechsel);
    var vorherigeStueckzahlZweiterPalettenwechsel = parseInt(currentValueZweiterPalettenwechsel);

    if (isNaN(vorherigeStueckzahlPalettenwechseln)) {
      vorherigeStueckzahlPalettenwechseln = 0;
    }

    if (isNaN(vorherigeStueckzahlZweiterPalettenwechsel)) {
      vorherigeStueckzahlZweiterPalettenwechsel = 0;
    }

    // Berücksichtige die Stückzahl von der vorherigen Palette, falls vorhanden
    var stueckzahlPalette = parseInt(document.getElementById("zaehlwerk-" + reiheNummer).value);
    if (isNaN(stueckzahlPalette)) {
      stueckzahlPalette = 0;
    }

    var neuesZaehlwerk = stueckzahlPalette - vorherigeStueckzahlPalettenwechsel - vorherigeStueckzahlZweiterPalettenwechsel;
    

    // Schreibe den neuen Wert in das zweite Inputfeld un d aktualisiere den Zählwerk!
    zweiterPalettenwechselInput.value = newValuePalettenwechsel;
    neuesZaehlwerk = stueckzahlPalette + newValuePalettenwechsel - vorherigeStueckzahlZweiterPalettenwechsel;
    
    document.getElementById("zaehlwerk-" + reiheNummer).value = isNaN(neuesZaehlwerk) ? 0 : neuesZaehlwerk;
  }
}
} else {
// Die Checkbox ist deaktiviert, verstecke das zweite Inputfeld
zweiterPalettenwechselContainer.style.display = "none";

// Hier öffnen wir das Prompt-Fenster, um den ersten Wert einzugeben
var input = prompt("Stückzahl bei Palettenwechsel eingeben:", "0");
if (input !== null) {
  var newValuePalettenwechsel = parseInt(input);

  if (!isNaN(newValuePalettenwechsel)) {
    var currentValuePalettenwechsel = palettenwechselInput.value;
    var vorherigeStueckzahlPalettenwechseln = parseInt(currentValuePalettenwechsel);
    var neuesZaehlwerk = parseInt(document.getElementById("zaehlwerk-" + reiheNummer).value);
    neuesZaehlwerk = neuesZaehlwerk - currentValuePalettenwechsel;

    // Schreibe den neuen Wert in das erste Inputfeld
    palettenwechselInput.value = newValuePalettenwechsel;

    // Überprüfe, ob die Stückzahl-Korrektur-Checkbox aktiv ist
    
      // Wenn die Stückzahl-Korrektur-Checkbox nicht aktiv ist, addiere den neuen Wert zum Zählwerk
      neuesZaehlwerk = neuesZaehlwerk + newValuePalettenwechsel;
    

    document.getElementById("zaehlwerk-" + reiheNummer).value = isNaN(neuesZaehlwerk) ? 0 : neuesZaehlwerk;
  }
}
}

setZeroToUnvisible();
saveFormData();
saveSelectedValue();
}





// Datumsformat umsetzen
function formatDate(date) {
var year = date.getFullYear();
var month = ("0" + (date.getMonth() + 1)).slice(-2);
var day = ("0" + date.getDate()).slice(-2);
// return year + "-" + month + "-" + day;
return day + "-" + month + "-" + year;
}


// Aktualisiere den heutigen Datum und zeige es in der Datumspicker an
var TodayDate = [];

function saveTodayDate() {
  var dateInputs = document.querySelectorAll('input[type="date"]');
  for (var i = 0; i < dateInputs.length; i++) {
    var datumInput = dateInputs[i];
    var stueckzahlPalette = document.getElementById("stueckzahl-palette-" + (i + 1));
    var currentDate = new Date();
    // currentDate.setDate(currentDate.getDate() + 1);
    var timezoneOffset = currentDate.getTimezoneOffset() * 60000;
    
    console.log('Datum im Input-Feld:', datumInput.valueAsDate);
   
    // Prüfen, ob das Datum bereits ausgewählt wurde && stueckzahlPalette.value === "0" 
    var isDateSelected = datumInput.value !== "";
   
    if (datumInput.value === "" || stueckzahlPalette === 0) {
      // Setzen Sie das Datum auf den aktuellen Tag unter Berücksichtigung der Zeitzone
      var adjustedDate = new Date(currentDate - timezoneOffset);
      datumInput.valueAsDate = adjustedDate;
      console.log("saveTodayDate wurde aufgerufen!");
    } else if (isDateSelected) {
      currentDate = new Date(datumInput.value);
    }

    var row = datumInput.closest("tr");
    var inputs = row.getElementsByTagName("input");
    var values = {};
    var hasDateInput = false;

    for (var j = 0; j < inputs.length; j++) {
      var input = inputs[j];
      values[input.id] = input.value;
      if (input.type === "date" && input.value !== "") {
        hasDateInput = true;
      }
    }

    var datumId = "datum" + i;
    values[datumId] = formatDate(currentDate);
    TodayDate.push(values);
  }
  console.log(TodayDate);
}

// Speichert die Eingaben in den Local Storage
function saveFormData() {
  for (var i = 0; i <= 36; i++) {
    
    var stueckzahlPaletteInput = document.getElementById("stueckzahl-palette-" + i);
    var datumInput = document.getElementById("datum" +i);

    if (stueckzahlPaletteInput  && stueckzahlPaletteInput.value.trim() !== "0") {
      // Nur wenn das Stückzahl-Palette-Feld nicht leer ist, das Datum speichern
      localStorage.setItem("selectedDatum" + i, datumInput.value);
      console.log("selectedDatum" + i, datumInput.value);
      
    }
  }

// Iteriere über die Felder mit den ID-Namen datum1, schicht1, datum2, schicht2 usw.
for (var i = 1; i <= 36; i++) {
// var datumInput = document.getElementById("datum" + i);
var schichtSelect = document.getElementById("schicht" + i);
var zaehlwerkInput = document.getElementById("zaehlwerk-" + i);
var stueckzahlPaletteInput = document.getElementById("stueckzahl-palette-" + i);
var stueckzahlPalettenwechselnInput = document.getElementById("stueckzahl-palettenwechseln-" + i);
var stueckzahlZweiterPalettenwechselInput = document.getElementById("zweiteStueckzahlPalettenwechseln-" + i);


// Speichern des ausgewählten Datums und der ausgewählten Option in den Web Storage

// localStorage.setItem("selectedDatum" + i, datumInput.value);
localStorage.setItem("selectedSchicht" + i, schichtSelect.value);
localStorage.setItem("selectedZaehlwerk-" + i, zaehlwerkInput.value);
localStorage.setItem("selectedStueckzahlPalette-" + i, stueckzahlPaletteInput.value);
localStorage.setItem("selectedStueckzahlPalettenwechseln-" + i, stueckzahlPalettenwechselnInput.value);
if (stueckzahlZweiterPalettenwechselInput) {
  localStorage.setItem("selectedZweiterStueckzahlPalettenwechseln-" + i, stueckzahlZweiterPalettenwechselInput.value);
}

}

}

// Laden der gespeicherten Daten aus der localStorage
function loadFormData() {

for (var i = 1; i <= 36; i++) {
var datumInput = document.getElementById("datum" + i);
var schichtSelect = document.getElementById("schicht" + i);
var zaehlwerkInput = document.getElementById("zaehlwerk-" + i);
var stueckzahlPaletteInput = document.getElementById("stueckzahl-palette-" + i);
var stueckzahlPalettenwechselnInput = document.getElementById("stueckzahl-palettenwechseln-" + i);
var stueckzahlZweiterPalettenwechselInput = document.getElementById("zweiteStueckzahlPalettenwechseln-" + i);

    

var selectedDatum = localStorage.getItem("selectedDatum" + i);
var selectedSchicht = localStorage.getItem("selectedSchicht" + i);
var selectedZaehlwerk = localStorage.getItem("selectedZaehlwerk-" + i);
var selectedStueckzahlPalette = localStorage.getItem("selectedStueckzahlPalette-" + i);
var selectedStueckzahlPalettenwechseln = localStorage.getItem("selectedStueckzahlPalettenwechseln-" + i);

var selectedZweiterStueckzahlPalettenwechseln = localStorage.getItem("selectedZweiterStueckzahlPalettenwechseln-" + i);
console.log("selectedZweiterStueckzahlPalettenwechseln-:" + i + ":" + selectedZweiterStueckzahlPalettenwechseln);
if (selectedZweiterStueckzahlPalettenwechseln !== null) {
var zweiterPalettenwechselContainer = document.getElementById("zweiterPalettenwechselContainer-" + i);
}


if (selectedDatum) {
  datumInput.value = selectedDatum;
}

if (selectedSchicht) {
  var schichtOption = schichtSelect.querySelector('option[value="' + selectedSchicht + '"]');
  if (schichtOption) {
    schichtOption.selected = true;
  }
}

if (selectedZaehlwerk) {
  zaehlwerkInput.value = selectedZaehlwerk;
}

if (selectedStueckzahlPalette) {
  stueckzahlPaletteInput.value = selectedStueckzahlPalette;
}

if (selectedStueckzahlPalettenwechseln) {
  stueckzahlPalettenwechselnInput.value = selectedStueckzahlPalettenwechseln;
}

if (stueckzahlZweiterPalettenwechselInput && selectedZweiterStueckzahlPalettenwechseln !== null && parseInt(selectedZweiterStueckzahlPalettenwechseln) > 0) {
stueckzahlZweiterPalettenwechselInput.value = selectedZweiterStueckzahlPalettenwechseln;
zweiterPalettenwechselContainer.style.display = "inline";
}

}

setZeroToUnvisible();


}



// zeigt die gespeicherten Wert der Select-Box für die Anlagen-Nr
function restoreSelectedValue() {
var selectedAnlagenNummer = localStorage.getItem("anlagenAuswahlListe");
var anlagenNummerSelect = document.getElementById("anlagenAuswahlListe");

console.log("selectedAnlagenNummer:", selectedAnlagenNummer);
console.log("anlagenNummerSelect:", anlagenNummerSelect);

if (selectedAnlagenNummer && anlagenNummerSelect) {
// Durchlaufe die Optionen des Dropdown-Menüs und setze das selected-Attribut manuell
for (var i = 0; i < anlagenNummerSelect.options.length; i++) {
  if (anlagenNummerSelect.options[i].value === selectedAnlagenNummer) {
    anlagenNummerSelect.options[i].selected = true;
    break;
  }
}
}
}


// Werte löschen um eine neue Seite anfangen zu können
function deleteAllValues() {
  localStorage.clear();// Löscht alle Einträge im localStorage
  location.reload();
}


// Event-Listener, um die Funktionen bei Bedarf auszuführen
document.addEventListener("DOMContentLoaded", function () {
// restoreSelectedValue(); // Wenn die Funktion hier aufgerufen wird, kommentiere diese Zeile aus
loadFormData();

// Führe die Funktion nach einer kurzen Verzögerung aus, um sicherzustellen, dass das Dropdown-Menü vollständig geladen ist
restoreSelectedValue();
});



// Funktion zum Speichern der ausgewählten Option für den Anlagen-Nr. in den Local Storage
function saveSelectedValue() {
var anlagenNummerSelect = document.getElementById("anlagenAuswahlListe");
var selectedAnlagenNummer = anlagenNummerSelect.value;
localStorage.setItem("anlagenAuswahlListe", selectedAnlagenNummer);

}

// Event-Listener, um die Funktionen bei Bedarf auszuführen
document.addEventListener("DOMContentLoaded", function () {

loadFormData(); // Laden der übrigen Daten aus dem Local Storage
});



// Beim Laden der Seite die gespeicherten Daten laden

window.onload = function() {

loadFormData();
saveTodayDate();

}

// Diese Funktion übersetzt die Schichtwerte
function translateSchicht(schicht) {
  switch (schicht) {
    case "1":
      return "Früh";
    case "2":
      return "Spät";
    case "3":
      return "Nacht";
    default:
      return schicht; // Wenn der Wert unbekannt ist, wird er nicht übersetzt
  }
}

function formatExportDate(dateString) {
  const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
  const date = new Date(dateString);
  return date.toLocaleDateString('de-DE', options);
}


function exportDataToTable() {

  
   // Anlagennummer außerhalb der Tabelle anzeigen
   var selectedAnlagenNummer = localStorage.getItem("anlagenAuswahlListe");
   var saveDate = new Date();
   var selectedSaveDate = formatExportDate(saveDate);
   if (selectedAnlagenNummer) {
     var anlagenNummerDiv = document.createElement("div");
     anlagenNummerDiv.appendChild(document.createTextNode("Anlagennummer: Ex -  " + selectedAnlagenNummer + " " + " / " + "Datum:    "+ selectedSaveDate));
     document.body.appendChild(anlagenNummerDiv);
   }
  // Hier den Code zum Erstellen der HTML-Tabelle einfügen
  var table = document.createElement("table");
  table.classList.add("exported-table"); 

  // Hier können Sie die Tabellenüberschriften hinzufügen
  var thead = document.createElement("thead");
  var headerRow = document.createElement("tr");
  var headers = ["Datum", "Schicht", "Zählwerk", "Stückzahl Palette", "Stückzahl Palettenwechsel", "Zweite Stückzahl Palettenwechsel"];

  headers.forEach(function (headerText) {
    var th = document.createElement("th");
    th.appendChild(document.createTextNode(headerText));
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Hier den Code zum Abrufen der Daten aus dem Local Storage und Hinzufügen in die Tabelle einfügen
  var tbody = document.createElement("tbody");

  for (var i = 1; i <= 36; i++) {
    var selectedDatum = localStorage.getItem("selectedDatum" + i);
    var formattedDatum = formatExportDate(selectedDatum);
    var selectedSchicht = localStorage.getItem("selectedSchicht" + i);
    var selectedZaehlwerk = localStorage.getItem("selectedZaehlwerk-" + i);
    var selectedStueckzahlPalette = localStorage.getItem("selectedStueckzahlPalette-" + i);
    var selectedStueckzahlPalettenwechseln = localStorage.getItem("selectedStueckzahlPalettenwechseln-" + i);
    var selectedZweiterStueckzahlPalettenwechseln = localStorage.getItem("selectedZweiterStueckzahlPalettenwechseln-" + i);

   // Übersetzen Sie die ausgewählte Schicht
   var translatedSchicht = translateSchicht(selectedSchicht);

   var row = document.createElement("tr");
   var cellData = [formattedDatum, translatedSchicht, selectedZaehlwerk, selectedStueckzahlPalette, selectedStueckzahlPalettenwechseln, selectedZweiterStueckzahlPalettenwechseln];

   cellData.forEach(function (cellText) {
     var td = document.createElement("td");
     td.appendChild(document.createTextNode(cellText));
     row.appendChild(td);

   });
    

    tbody.appendChild(row);

  }

  table.appendChild(tbody);

  // Hier können Sie die Tabelle in eine separate Datei exportieren (z. B. CSV, Excel, PDF) oder einfach auf der Seite anzeigen
  // Beispiel: table.innerHTML kann in eine separate Datei exportiert werden
  var styleElement = document.createElement("style");
  styleElement.appendChild(document.createTextNode(`
    /* Fügen Sie hier Ihre CSS-Regeln für die Tabelle ein */
    .exported-table {
      width: 50%;
    }
    .exported-table th, .exported-table td {
      width: 9%;
        border: 1px solid;
        height: 30px;
        font-size: 18px; 
        background-color: rgb(241, 241, 241);
        
    }
  `));
  // Fügen Sie die Tabelle in das Dokument ein, um sie auf der Seite anzuzeigen
 
  document.body.appendChild(table);
   document.body.appendChild(styleElement);

 
}
