Cześć wszystkim!
*00:00*

Ja nazywam się Sławek i zapraszam Was na lekcję, a właściwie serię lekcji o tym jak działa LLM, czyli Duży Model Językowy.
*00:02*

LLM tłumaczy się na Large Language Model, stąd ta nazwa - Duży Model Językowy.
*00:11*

I w dużym uproszczeniu jest to super zaawansowany mechanizm do predykcji kolejnych tokenów.
*00:17*

Brzmi to nieprawdopodobnie, ale tak faktycznie jest.
*00:23*

I tutaj widzimy takie bardzo, bardzo uproszczone flow, czyli jaka jest stolica Francji.
*00:26*

Ten input, tutaj mały spoiler, jest tokenizowany, zmieniany na cyfry, które są zrozumiałe dla komputera.
*00:32*

Później wchodzimy do czarnej skrzynki, która nosi nazwę transformera.
*00:41*

I dostajemy coś na wyjściu, przy czym wyjście generowane jest token po tokenie.
*00:46*

Czyli to jest pierwszy token, to jest drugi, trzeci i tak dalej, i tak dalej.
*00:51*

To jest dość nieintuicyjne, natomiast pamiętajcie o tym, że predykcja tych tokenów jest dosyć, że tak powiem, mocno wytrenowana.
*00:56*

Mamy sporo mechanizmów, które powodują, że model generuje tokeny, które mają sens.
*01:08*

I w takim matematycznym spojrzeniu na to, możemy powiedzieć, że to co dostajemy na wyjściu jest efektem dwóch rzeczy.
*01:16*

Pierwsze jest efektem prompta, czyli tego co my wpisujemy na czata GPT i jest efektem jakiejś funkcji, czyli modelu, który wybieramy.
*01:26*

Czyli wchodząc na Cloud AI wybieramy model Antrofica, wchodząc na czat GPT.com wybieramy model OpenAI, i tak dalej, i tak dalej.
*01:37*

Zazwyczaj jest tak, że do różnych zadań różne modele będą najlepsze.
*01:47*

Przykładowo do programowania modele Antrofica uchodzą za najlepsze, do generacji obrazków model Gemini uchodzi za najlepszy,
*01:54*

do Deep Researchu być może ktoś powiedziałby, że OpenAI, być może ktoś powiedziałby, że Gemini.
*02:03*

Także jest tutaj spory wybór.
*02:10*

I wybór mamy nawet na jednej stronie.
*02:14*

To jest na przykład czat GPT.com i zobaczcie, że mamy już wybór pomiędzy dwoma modelami.
*02:19*

Możemy też nie wybierać, jeżeli nie chcemy.
*02:24*

Czyli mamy, zobaczcie, wybór między dwoma funkcjami.
*02:27*

Jedna to model 5.3, który odpowiada od razu i druga to model 5.4, który jest myślący, czyli zanim odpowie to generuje tokeny, które jakby wzbogacają jego kontekst.
*02:31*

I to jest prompt.
*02:44*

Czyli kim jest Sławomir Radzymiński.
*02:46*

To jest nasz prompt.
*02:50*

Używam funkcji 5.3.
*02:52*

I zobaczcie, że model stwierdza, że zawoła funkcję, szuka w internecie i generuje.
*02:54*

Zobaczcie, że ta generacja to jest właśnie token po tokenie.
*03:00*

Teraz być może to widzicie, że faktycznie ta generacja jest przyrostowa, to jest tak zwany streaming HTTP.
*03:03*

I model jakby uzupełnia to, co już zaczął.
*03:10*

Idąc dalej, możemy też wygenerować sobie obrazek.
*03:16*

Czyli powiedziałem, że obecnie model Gemini Banana Pro jest tutaj najlepszy.
*03:22*

Ja akurat użyłem czata GPT.
*03:30*

No i efekt jest taki sobie, bądźmy szczerzy.
*03:32*

Natomiast to też fajnie pokazuje, że nie zawsze dostajemy coś produkcyjnego.
*03:35*

Ale na slide wstydu nie ma myślę.
*03:40*

I to co chciałbym, żebyście zanim przejdziemy do kolejnych lekcji zapamiętali sobie.
*03:44*

To to, że predykcja tego wszystkiego jest oparta o losowość.
*03:50*

I wchodząc do świata LLM-ów, warto nastawić się na chaos.
*03:56*

To jest trochę nieintuicyjne, bo my od właściwie dzieciństwa jesteśmy uczeni, że albo jest coś poprawne, albo nie.
*04:03*

A tutaj trzeba się nastawić na takie myślenie probabilistyczne.
*04:13*

Na myślenie, że coś z jakimś prawdopodobieństwem uda nam się zrobić, albo z jakimś prawdopodobieństwem nam się nie uda.
*04:17*

Można powiedzieć, że techniki promptowania zwiększają prawdopodobieństwo sukcesu.
*04:25*

Napisanie dobrego prompta zwiększa prawdopodobieństwo sukcesu.
*04:29*

Wybranie dobrego modelu zwiększa prawdopodobieństwo sukcesu.
*04:33*

Ale nigdy nie mamy gwarancji.
*04:36*

Także jest to całkowicie nowa dziedzina, która wymaga pewnego rodzaju elastycznego myślenia.
*04:39*

I to chciałbym, żebyście sobie zapamiętali, zaczynając ten kurs, przechodząc do kolejnych lekcji,
*04:47*

że trzeba w pewien sposób swoje myślenie uelastycznić.
*04:55*

I to niech będzie główna lekcja na dziś.
*04:59*

Zapraszam do oglądania kolejnych.
*05:05*

