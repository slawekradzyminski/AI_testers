Cześć, z tej strony Sławek i zapraszam Was na kolejną lekcję dotyczącą przetwarzania wejścia, czyli tego co wpisujemy w ekranie do promptowania.
*00:00*

Dzisiaj skupmy się na tokenizacji, pisanej przez Z, po amerykańsku lub przez S, po angielsku.
*00:12*

Także warto pamiętać, że tutaj pisownia jest wymienna.
*00:20*

I dla przypomnienia, zajmujemy się inputem, czyli wejściem.
*00:25*

I na ostatniej lekcji powiedzieliśmy sobie o prompcie.
*00:31*

Myślę, że najważniejsza rzecz, jaka jest do zapamiętania odnośnie promptowania, to kwestia związana z tym, że prompt tak naprawdę jest o wiele większy.
*00:35*

To co idzie do LLM jest o wiele większe i to co my wpisujemy to jest tylko niewielki ułamek.
*00:45*

Bo bardzo dużo rzeczy związanych z obsługą Prompt Engineering'u dodaje nam twórca narzędzia.
*00:52*

Także w Copilot'cie na pewno mamy, można powiedzieć, ten Prompt Engineering stosunkowo dobrze ograny.
*01:00*

I my musimy po prostu się wczuć w ten styl promptowania w Copilot'cie.
*01:06*

I tak, zanim nasz prompt, właściwie nie tylko nasz prompt, trafi do LLM'a, to musi przejść, musi zostać przeliczony na cyferki.
*01:13*

I to przeliczenie odbywa się w dwóch fazach.
*01:28*

Po pierwsze robimy dzielenie tekstu na tokeny, a następnie te tokeny są zamieniane na wektory liczb.
*01:31*

O tym na kolejnej lekcji, natomiast dzisiaj na tapetę bierzemy tokenizację.
*01:39*

I tak, żeby tokenizację najlepiej wyjaśnić, to moim zdaniem najlepiej jest to zobaczyć na przykładzie tokenizera, który udostępnia OpenAI.
*01:46*

To jest link, który macie pod filmem.
*01:57*

On jest dostępny w sieci.
*02:00*

Każdy może sobie tutaj wejść.
*02:03*

I mam tutaj wrzucony pierwszy rozdział 1984 Orwella.
*02:06*

Bardzo dobra książka, polecam swoją drogą.
*02:13*

I zobaczcie, mamy tutaj ilość znaków, mamy ilość tokenów.
*02:16*

Tutaj mamy słowa, a tutaj mamy tokeny.
*02:22*

I zobaczcie, że większość słów, przynajmniej angielskich, jest tłumaczone na jeden token.
*02:26*

Czyli można powiedzieć, że token to jest coś pomiędzy słowem a literą.
*02:33*

Przy czym dla języka angielskiego można powiedzieć, że token jest de facto słowem, prawie że wymiennie.
*02:38*

I jest nawet taki wzór tutaj udostępniony przez OpenAI, że ilość tokenów to jest 1,33 razy liczba słów.
*02:44*

Czyli wiedząc ile mamy słów, możemy łatwo obliczyć ilość tokenów.
*02:55*

Bo zobaczcie, że na przykład też znaki interpunkcyjne są tokenami.
*03:01*

No i mamy specjalne tokeny początku sesji, mamy specjalny token końca sesji.
*03:06*

Tego akurat tutaj nie widać, ale to tam pod spodem wszystko leci.
*03:11*

I to obliczenie dotyczy języka angielskiego.
*03:16*

Bo mam ten sam rozdział numer 1 Orwella 1984 po polsku.
*03:21*

I zobaczcie jaka jest ogromna różnica.
*03:28*

Ilość znaków jest mniejsza, natomiast ilość tokenów jest o wiele, wiele większa.
*03:31*

Prawie że o 3 tysiące tokenów mamy więcej.
*03:36*

I zobaczcie, że w przypadku języka polskiego słowa są dzielone nieraz na 4 tokeny.
*03:40*

Być może nawet więcej widzicie.
*03:48*

Nienawiści też 4.
*03:52*

Prawdopodobnie gdybym dobrze poszukał to udałoby mi się znaleźć słowo, które jest dzielone na 5 tokenów.
*03:55*

Także płynie z tego ważna lekcja.
*04:02*

Mówię to nieprzypadkowo.
*04:06*

Bo jeżeli my dzielimy tekst polski na większą ilość tokenów,
*04:09*

to znaczy, że promptowanie w języku polskim jest po prostu nieefektywne.
*04:17*

To o czym warto pamiętać to to, że algorytmy tokenizacji są zoptymalizowane pod kątem języka angielskiego.
*04:22*

Oczywiście algorytm tokenizacji jest dostosowany do modelu.
*04:32*

Polskie modele językowe mają algorytm tokenizacji zoptymalizowany pod język polski.
*04:36*

Chińskie modele mają algorytm zoptymalizowany pod kątem chińskiego i angielskiego.
*04:43*

A te najbardziej topowe modele typu Chargipity, Antrophic,
*04:48*

to one są zoptymalizowane pod kątem języka angielskiego.
*04:54*

I to jest bardzo istotne, bo to oznacza, że promptować warto w języku angielskim.
*04:58*

Oczywiście jeżeli mamy proste pytanie typu "powiedz żart",
*05:06*

to możemy napisać po polsku, dostaniemy dobry wynik.
*05:10*

Natomiast w przypadku jakichś takich większych zadań, jakichś takich zadań nazwijmy to biznesowych,
*05:14*

analiza kodu, jakieś większe plany, pamiętajcie żeby promptować w języku angielskim.
*05:19*

To jest bardzo ważna lekcja.
*05:27*

Jakiś czas temu pojawił się taki fake news w mediach,
*05:31*

że polski jest językiem EI i warto pisać po polsku.
*05:37*

Podsyłam wam artykuł, który trochę to obala, przebija balonik jak widzicie.
*05:41*

I tutaj autor fajnie napisał, że jest to pewnego rodzaju nadinterpretacja.
*05:48*

Także ten artykuł powstał na podstawie pracy.
*05:54*

Ta praca była dosyć specyficzna, bo nabrała różne, że tak powiem, książki dla różnych języków.
*05:59*

I myślę, że nie można powiedzieć, że język polski jest najlepszy do EI.
*06:06*

Myślę, że język polski jest najlepszy do polskich modeli językowych, ale nie do tych topowych.
*06:14*

Myślę, że to wszystko jeśli chodzi o tokeny i przechodzimy powoli do wektoryzacji
*06:22*

i zbliżamy się do transformera. Dziękuję.
*06:28*

