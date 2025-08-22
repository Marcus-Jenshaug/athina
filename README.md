# Oppdatere prosjekt på GitHub

Når du har gjort endringer i filer lokalt og ønsker å oppdatere GitHub, følger du denne arbeidsflyten:

## 1. Legg til endrede filer (staging)
For å legge til alle endrede filer:
```bash
git add .
```
Hvis du kun vil legge til én bestemt fil:

```bash
git add filnavn
```
## 2. Lag en commit
Skriv en beskrivende melding om hva du har endret:

```bash
git commit -m "Beskriv hva du har gjort"
```
### Eksempler:

```bash
git commit -m "Oppdatert index.html med ny seksjon"
```
```bash
git commit -m "La til nye bilder i media-mappen"
```

## 3. Push til GitHub
Send endringene til GitHub:

```bash
git push
```
## 4. Full arbeidsflyt i én linje
Hvis du vil gjøre alt i ett (for alle filer):

```bash
git add . && git commit -m "Oppdatert prosjekt" && git push
```
### Vanlige kommandoer
Se status på repoet:

```bash
git status
```
Se siste commit-historikk:
```bash
git log --oneline
```
### Kort huskeregel
```bash
git add .
```
``` bash
git commit -m "Melding"
```
``` bash
git push
```

Det er alt som skal til for å oppdatere GitHub med endringene dine