# Autoškola downloader

CLI udělátko na stažení otázek z webu http://etesty2.mdcr.cz/

Funkční k 08.08.2021 - _Verze aplikace: 1.0.19.4 PROD-SQL1\SQL1/eKomunikace_PRODUKCE2_ (z patičky webu)

## K čemu to je
K vytvoření vlastní aplikace na procvičování otázek do autoškoly, která bude narozdíl od etesty2:
- ~~fungovat na iOS (flash -> gif)~~ etesty už používají mp4 video
- fungovat responzivně
- fungovat offline

## Použití
Žádný NPM balíček zatím neexistuje, takže je potřeba naclonovat tento repozitář.

```bash
yarn install --pure-lockfile
yarn start
```

Po vybrání požadovaných oblastí se do `data/lecture-<id>` uloží soubor `data.json` se seznamem otázek spolu se všemi potřebnými obrázky a videi.

Náhled souboru:
```json
[
  {
    "id": 1604,
    "text": "Jak se zachováte v místě, kde je tato výstražná dopravní značka?",
    "code": "06040193",
    "correctAnswers": [
      14813
    ],
    "answers": [
      {
        "id": 14812,
        "text": "Nezměním způsob jízdy ani chování, protože není důvod očekávat změnu dopravní situace."
      },
      {
        "id": 14813,
        "text": "Přizpůsobím jízdu tomu, že se vozovka oproti předcházejícímu úseku výrazně zužuje, a to z obou stran"
      },
      {
        "id": 14814,
        "text": "Zvýším rychlost jízdy, abych byl co nejrychleji z místa zúžení."
      }
    ],
    "assets": [
      {
        "filename": "1604-1.jpg",
        "contentType": "image/jpg"
      }
    ]
  }
  ...
]
```
