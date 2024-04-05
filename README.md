# Struktur

Vårat projekt är uppdelat på två repositorier, det här, och våran [utvecklingsserver](https://github.com/ZEEYA-TEAM/dev_server).

Våran frontend är strukturerad så att i src mappen har vi våran App.js och två andra mappar components och resources där vi delar in koden i komponenter och resurser. 

I components mappen finns komponenter som är sidinnehåll. I resources finns hjälpfunktioner och scss filer.

Appen fungerar så att den är wrappad i en AuthProvider komponent som är till för att göra några state-variabler tillgängliga över hela appen. 

# Kom igång

För att installera node dependencies kör:
`npm install`

Därefter kan utvecklingsservern startas med:
`npm start`
