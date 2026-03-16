export type LessonSegment = {
  text: string;
  startInSeconds: number;
  endInSeconds: number;
};

export const l1Lesson = {
  id: "L1",
  title: "Jak dziala LLM?",
  subtitle: "Lekcja 1: podstawy",
  durationInSeconds: 310,
  segments: [
  {
    "text": "Cześć wszystkim!",
    "startInSeconds": 0,
    "endInSeconds": 2
  },
  {
    "text": "Ja nazywam się Sławek i zapraszam Was na lekcję, a właściwie serię lekcji o tym jak działa LLM, czyli Duży Model Językowy.",
    "startInSeconds": 2,
    "endInSeconds": 11
  },
  {
    "text": "LLM tłumaczy się na Large Language Model, stąd ta nazwa - Duży Model Językowy.",
    "startInSeconds": 11,
    "endInSeconds": 17
  },
  {
    "text": "I w dużym uproszczeniu jest to super zaawansowany mechanizm do predykcji kolejnych tokenów.",
    "startInSeconds": 17,
    "endInSeconds": 23
  },
  {
    "text": "Brzmi to nieprawdopodobnie, ale tak faktycznie jest.",
    "startInSeconds": 23,
    "endInSeconds": 26
  },
  {
    "text": "I tutaj widzimy takie bardzo, bardzo uproszczone flow, czyli jaka jest stolica Francji.",
    "startInSeconds": 26,
    "endInSeconds": 32
  },
  {
    "text": "Ten input, tutaj mały spoiler, jest tokenizowany, zmieniany na cyfry, które są zrozumiałe dla komputera.",
    "startInSeconds": 32,
    "endInSeconds": 41
  },
  {
    "text": "Później wchodzimy do czarnej skrzynki, która nosi nazwę transformera.",
    "startInSeconds": 41,
    "endInSeconds": 46
  },
  {
    "text": "I dostajemy coś na wyjściu, przy czym wyjście generowane jest token po tokenie.",
    "startInSeconds": 46,
    "endInSeconds": 51
  },
  {
    "text": "Czyli to jest pierwszy token, to jest drugi, trzeci i tak dalej, i tak dalej.",
    "startInSeconds": 51,
    "endInSeconds": 56
  },
  {
    "text": "To jest dość nieintuicyjne, natomiast pamiętajcie o tym, że predykcja tych tokenów jest dosyć, że tak powiem, mocno wytrenowana.",
    "startInSeconds": 56,
    "endInSeconds": 68
  },
  {
    "text": "Mamy sporo mechanizmów, które powodują, że model generuje tokeny, które mają sens.",
    "startInSeconds": 68,
    "endInSeconds": 76
  },
  {
    "text": "I w takim matematycznym spojrzeniu na to, możemy powiedzieć, że to co dostajemy na wyjściu jest efektem dwóch rzeczy.",
    "startInSeconds": 76,
    "endInSeconds": 86
  },
  {
    "text": "Pierwsze jest efektem prompta, czyli tego co my wpisujemy na czata GPT i jest efektem jakiejś funkcji, czyli modelu, który wybieramy.",
    "startInSeconds": 86,
    "endInSeconds": 97
  },
  {
    "text": "Czyli wchodząc na Cloud AI wybieramy model Antrofica, wchodząc na czat GPT.com wybieramy model OpenAI, i tak dalej, i tak dalej.",
    "startInSeconds": 97,
    "endInSeconds": 107
  },
  {
    "text": "Zazwyczaj jest tak, że do różnych zadań różne modele będą najlepsze.",
    "startInSeconds": 107,
    "endInSeconds": 114
  },
  {
    "text": "Przykładowo do programowania modele Antrofica uchodzą za najlepsze, do generacji obrazków model Gemini uchodzi za najlepszy,",
    "startInSeconds": 114,
    "endInSeconds": 123
  },
  {
    "text": "do Deep Researchu być może ktoś powiedziałby, że OpenAI, być może ktoś powiedziałby, że Gemini.",
    "startInSeconds": 123,
    "endInSeconds": 130
  },
  {
    "text": "Także jest tutaj spory wybór.",
    "startInSeconds": 130,
    "endInSeconds": 134
  },
  {
    "text": "I wybór mamy nawet na jednej stronie.",
    "startInSeconds": 134,
    "endInSeconds": 139
  },
  {
    "text": "To jest na przykład czat GPT.com i zobaczcie, że mamy już wybór pomiędzy dwoma modelami.",
    "startInSeconds": 139,
    "endInSeconds": 144
  },
  {
    "text": "Możemy też nie wybierać, jeżeli nie chcemy.",
    "startInSeconds": 144,
    "endInSeconds": 147
  },
  {
    "text": "Czyli mamy, zobaczcie, wybór między dwoma funkcjami.",
    "startInSeconds": 147,
    "endInSeconds": 151
  },
  {
    "text": "Jedna to model 5.3, który odpowiada od razu i druga to model 5.4, który jest myślący, czyli zanim odpowie to generuje tokeny, które jakby wzbogacają jego kontekst.",
    "startInSeconds": 151,
    "endInSeconds": 164
  },
  {
    "text": "I to jest prompt.",
    "startInSeconds": 164,
    "endInSeconds": 166
  },
  {
    "text": "Czyli kim jest Sławomir Radzymiński.",
    "startInSeconds": 166,
    "endInSeconds": 170
  },
  {
    "text": "To jest nasz prompt.",
    "startInSeconds": 170,
    "endInSeconds": 172
  },
  {
    "text": "Używam funkcji 5.3.",
    "startInSeconds": 172,
    "endInSeconds": 174
  },
  {
    "text": "I zobaczcie, że model stwierdza, że zawoła funkcję, szuka w internecie i generuje.",
    "startInSeconds": 174,
    "endInSeconds": 180
  },
  {
    "text": "Zobaczcie, że ta generacja to jest właśnie token po tokenie.",
    "startInSeconds": 180,
    "endInSeconds": 183
  },
  {
    "text": "Teraz być może to widzicie, że faktycznie ta generacja jest przyrostowa, to jest tak zwany streaming HTTP.",
    "startInSeconds": 183,
    "endInSeconds": 190
  },
  {
    "text": "I model jakby uzupełnia to, co już zaczął.",
    "startInSeconds": 190,
    "endInSeconds": 196
  },
  {
    "text": "Idąc dalej, możemy też wygenerować sobie obrazek.",
    "startInSeconds": 196,
    "endInSeconds": 202
  },
  {
    "text": "Czyli powiedziałem, że obecnie model Gemini Banana Pro jest tutaj najlepszy.",
    "startInSeconds": 202,
    "endInSeconds": 210
  },
  {
    "text": "Ja akurat użyłem czata GPT.",
    "startInSeconds": 210,
    "endInSeconds": 212
  },
  {
    "text": "No i efekt jest taki sobie, bądźmy szczerzy.",
    "startInSeconds": 212,
    "endInSeconds": 215
  },
  {
    "text": "Natomiast to też fajnie pokazuje, że nie zawsze dostajemy coś produkcyjnego.",
    "startInSeconds": 215,
    "endInSeconds": 220
  },
  {
    "text": "Ale na slide wstydu nie ma myślę.",
    "startInSeconds": 220,
    "endInSeconds": 224
  },
  {
    "text": "I to co chciałbym, żebyście zanim przejdziemy do kolejnych lekcji zapamiętali sobie.",
    "startInSeconds": 224,
    "endInSeconds": 230
  },
  {
    "text": "To to, że predykcja tego wszystkiego jest oparta o losowość.",
    "startInSeconds": 230,
    "endInSeconds": 236
  },
  {
    "text": "I wchodząc do świata LLM-ów, warto nastawić się na chaos.",
    "startInSeconds": 236,
    "endInSeconds": 243
  },
  {
    "text": "To jest trochę nieintuicyjne, bo my od właściwie dzieciństwa jesteśmy uczeni, że albo jest coś poprawne, albo nie.",
    "startInSeconds": 243,
    "endInSeconds": 253
  },
  {
    "text": "A tutaj trzeba się nastawić na takie myślenie probabilistyczne.",
    "startInSeconds": 253,
    "endInSeconds": 257
  },
  {
    "text": "Na myślenie, że coś z jakimś prawdopodobieństwem uda nam się zrobić, albo z jakimś prawdopodobieństwem nam się nie uda.",
    "startInSeconds": 257,
    "endInSeconds": 265
  },
  {
    "text": "Można powiedzieć, że techniki promptowania zwiększają prawdopodobieństwo sukcesu.",
    "startInSeconds": 265,
    "endInSeconds": 269
  },
  {
    "text": "Napisanie dobrego prompta zwiększa prawdopodobieństwo sukcesu.",
    "startInSeconds": 269,
    "endInSeconds": 273
  },
  {
    "text": "Wybranie dobrego modelu zwiększa prawdopodobieństwo sukcesu.",
    "startInSeconds": 273,
    "endInSeconds": 276
  },
  {
    "text": "Ale nigdy nie mamy gwarancji.",
    "startInSeconds": 276,
    "endInSeconds": 279
  },
  {
    "text": "Także jest to całkowicie nowa dziedzina, która wymaga pewnego rodzaju elastycznego myślenia.",
    "startInSeconds": 279,
    "endInSeconds": 287
  },
  {
    "text": "I to chciałbym, żebyście sobie zapamiętali, zaczynając ten kurs, przechodząc do kolejnych lekcji,",
    "startInSeconds": 287,
    "endInSeconds": 295
  },
  {
    "text": "że trzeba w pewien sposób swoje myślenie uelastycznić.",
    "startInSeconds": 295,
    "endInSeconds": 299
  },
  {
    "text": "I to niech będzie główna lekcja na dziś.",
    "startInSeconds": 299,
    "endInSeconds": 305
  },
  {
    "text": "Zapraszam do oglądania kolejnych.",
    "startInSeconds": 305,
    "endInSeconds": 310
  }
]
} as const;
