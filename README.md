# HrmVocabularyTrainer

## 1.) Features

### 1.1.) Erfassen

- [x] Wortpaare alphabetisch sortiert auflisten
- [x] Wortpaare hinzufügen/bearbeiten/löschen
- [x] Button um Beispieldaten einzufüllen
- [x] Button um alles zurückzusetzen
- [x] Bonus: Die Liste der Worpaare können für beide Sprachen sortiert werden
- [x] Bonus: Wortliste persistieren (LocalStorage)

### 1.2.) Trainieren

- [x] Es wird zufällig die eine oder andere Sprache abgefragt
- [x] Wörter werden zufällig ausgewählt
- [x] Nach falschen Antworten wird das korrekte Wort angezeigt
- [ ] Bonus: Falsch beantwortete Wörter werden häufiger wieder abgefragt

### 1.3.) Prüfung

- [x] Während der Prüfung sind die Tabs Erfassen/Trainieren gesperrt
- [x] Es wird zufällig die eine oder andere Sprache abgefragt
- [x] Es werden in zufälliger Reihenfolge alle Wörter abgefragt
- [x] Nach der Prüfung wird das Prüfungsresultat und eine Statistik angezeigt
- [ ] Bonus: Nötige Trefferquote und Anzahl der Wörter kann definiert werden
- [ ] Bonus: Die Prüfungsdauer kann limitiert werden

---

## 2.) Annahmen und Ausgrenzungen:

2.1) Keine Tests

2.2) Es wird pro Wort-Paar zufällig entschieden, welche Sprache abgefragt wird.

2.3) Es wird pro Training / Prüfung zufällig entschieden, welche Sprache abgefragt wird.

2.4) Training ist keine Endlos-Schlaufe sondern ebenfalls alle Wörter einmal abfragen.

---

## 3.) Zeit / Aufwand und Verbesserungen:

### 3.1) Zeit / Aufwand:

Zeit total: ca. 12 Stunden
davon
11 Stunden Angular und Logik
1 Stunde Bootstrap und Styling

### 3.2) Verbesserungen:

Assessment:

- Statistik könnte schöner sein / eigene Komponente sein. Keine Zeit mehr gehabt.
- Styling generell könnte schöner sein. Keine Zeit mehr gehabt.
- Training und Assessment Workflow können verbessert werden. Momentan sehr anfällig für Bugs durch Instanzvariabel-Mutation und komplizierte Call-Chain Logik. Eventuell wäre eine State Maschine ein besserer Ansatz hier.
- Training und Assessment Komponenten können besseren Übergang zwischen Fragen- und Abschluss-Darstellung haben.
- WordListManagement kann vereinfacht werden. Sprachen müssten eventuell nur beim Initialisieren der Liste definiert werden.
