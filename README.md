# Autoškola downloader

CLI udělátko na stažení otázek z webu http://etesty2.mdcr.cz/

Funkční k 12.12.2018 - _Verze aplikace: 1.0.18.4 PROD-SQL1\SQL1/eKomunikace_PRODUKCE2_ (z patičky webu)

## K čemu to je
K vytvoření vlastní aplikace na procvičování otázek do autoškoly, která bude narozdíl od etesty2:
- fungovat na iOS (flash -> gif)
- fungovat responzivně
- fungovat offline

## Použití
Žádný NPM balíček zatím neexistuje, takže je potřeba naclonovat tento repozitář.

```bash
yarn install --pure-lockfile
yarn start
```

Po vybrání požadovaných oblastí se do `data/lecture-<id>` uloží soubor `data.json` se seznamem otázek spolu se všemi potřebnými obrázky. Flash soubory jsou ihned po stažení automaticky konvertovány do GIF - **je potřeba mít v PATH program ffmpeg**

Náhled souboru:
```js
[
  {
    "id": 2362,
    "text": "Může řidič motocyklu přepravovat osobu, která nedosáhne nohama na stupačky?",
    "code": "06050445",
    "correctAnswers": [
      23279
    ],
    "answers": [
      {
        "id": 23278,
        "text": "Ano, ale jen v obci."
      },
      {
        "id": 23279,
        "text": "Nesmí."
      },
      {
        "id": 23280,
        "text": "Může, pokud je přepravované osobě více než 12 let."
      }
    ],
    "images": []
  },
  ...
]
```
