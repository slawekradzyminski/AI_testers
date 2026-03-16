Cześć! Zapraszam na pierwszą lekcję,
*00:01*

gdzie nieco bardziej szczegółowo będę omawiał poszczególne części LLM-a.
*00:04*

I dzisiaj na tapetę weźmiemy sobie prompta.
*00:09*

Pamiętacie, mam nadzieję, z poprzedniej lekcji,
*00:13*

że wysokopoziomowa architektura LLM-u wygląda tak, że
*00:18*

podajemy jakieś wejście,
*00:24*

ono wchodzi do transformera, dostajemy wynik na wyjściu
*00:27*

i zaczniemy sobie naszą analizę od wejścia.
*00:31*

Można powiedzieć, że wejście składa się z trzech osobnych tematów,
*00:35*

które mówię na trzech poszczególnych lekcjach.
*00:45*

I do tego dołożę jeszcze dodatkową lekcję dotyczącą okna kontekstowego,
*00:48*

bo to można poruszyć osobno.
*00:52*

Wygląda to wysokopoziomowo tak, że mamy naszego prompta,
*00:56*

on jest tokenizowany i zmieniony na wektory.
*01:01*

Tokenizacja i wektory, tak zwane beddings, będą wkrótce,
*01:04*

natomiast dzisiaj skupimy się na prompcie.
*01:08*

I tak, niestety, jak to zwykle bywa, nie jest to takie proste,
*01:11*

bo my piszemy user prompta
*01:18*

natomiast to co trafia do LLM jest o wiele bardziej rozbudowane.
*01:25*

Poza promptem użytkownika mamy jeszcze systemowego prompta użytkownika,
*01:30*

czyli coś co my jako użytkownicy np. czata GPT czy Copilot czy kursora
*01:37*

możemy sobie skonfigurować.
*01:42*

Poza tym mamy jeszcze prompt Toola, czyli Copilot, którego używacie,
*01:44*

kursor którego używacie też ma swojego prompta.
*01:52*

Do tego dochodzi cała historia konwersacji
*01:55*

i do tego dochodzi też lista dostępnych narzędzi.
*01:59*

O narzędziach opowiem później przy okazji omawiania agentów AI,
*02:03*

natomiast na ten moment warto być świadomym, że też takie narzędzia są wysyłane.
*02:09*

Więc my wpisujemy to,
*02:16*

natomiast jak widzicie tak naprawdę do LLM trafia znacznie więcej.
*02:19*

I może przejdźmy sobie po kolei po tych wszystkich rzeczach.
*02:25*

Jeżeli chodzi o system prompta, to system prompta zazwyczaj konfiguruje się w opcjach,
*02:30*

czyli np. w czacie GPT mamy tzw. personalizację
*02:38*

i zobaczcie, że możemy sobie napisać tzw. custom instructions
*02:42*

czyli ja tutaj mówię, żeby używać np. brytyjskiego, angielskiego,
*02:49*

bo pracuję w brytyjskiej firmie.
*02:53*

No i poza tym piszę trochę słów o sobie,
*02:55*

że jestem doświadczonym engineering test.
*02:59*

Ja oczywiście Wam dostępnię, ten mój system promptu to nie jest żadna tajemnica,
*03:03*

także znajdziecie to wszystko pod filmem.
*03:08*

Także to jest systemowy prompt i to ma duże znaczenie.
*03:11*

Przykładowo moja żona korzysta też z mojego konta na czacie
*03:16*

i to, że ja mam takiego systemowego prompta tutaj działa na jej niekorzyść,
*03:21*

bo moja żona nie jest test engineerem, tylko jest fizjoterapeutką,
*03:27*

więc ona tak naprawdę nie powinna wysyłać tych promptów,
*03:32*

ale wysyła, bo nie jest do końca tego świadoma.
*03:36*

Także to był prompt tzw. systemowy.
*03:40*

Poza promptem systemowym mamy też prompta narzędzia.
*03:45*

Czyli pamiętajcie, korzystając z Copilota, korzystając z kursora,
*03:49*

te narzędzia wysyłają coś pod spodem.
*03:54*

I przykład tego, co wysyła kursor jest tutaj.
*03:58*

To jest oczywiście nieoficjalne źródło, można powiedzieć,
*04:04*

że jest to prompt, który został wykradziony przez pana Shrivu
*04:07*

i wygląda to mniej więcej tak, że na początku piszemy
*04:14*

"You are a powerful agent in KIA Coding Assistant powered by"
*04:18*

tu jest pewnie podstawiona nazwa modelu
*04:22*

"You operate exclusively in kursor the world's best IDE"
*04:25*

"You are pair programming with a user to solve their coding task"
*04:29*

Także to wszystko leci, no i zobaczcie, że ten prompt tutaj jest bardzo długi.
*04:34*

To wszystko w każdym jednym requestie jest wysyłane
*04:38*

i każde jedno narzędzie ma innego prompta.
*04:42*

To jest często tajemnica handlowa, jakieś intellectual property.
*04:47*

Także my często nie mamy pewności, co tam tak naprawdę pod spodem leci
*04:51*

i warto być po prostu świadomym, że takie coś jest też wysyłane.
*04:57*

Poza tym wysyłamy też całą historię konwersacji.
*05:06*

O tym warto pamiętać.
*05:11*

I wysyłamy też listę narzędzi.
*05:13*

I postaram się to Wam pokazać.
*05:16*

Mam tutaj takiego LLM-a lokalnego.
*05:20*

Mam nawet systemowego prompta.
*05:22*

I otworzymy sobie network i pokażę Wam takie zapytanie.
*05:24*

Jak to wszystko wygląda.
*05:31*

Bo to fajnie pomaga sobie zwizualizować.
*05:33*

"Tell me a short story".
*05:38*

Wysyłamy takiego prompta i czekamy aż LLM nam odpowie.
*05:43*

Zobaczcie, że LLM odpowiada token po tokenie.
*05:50*

To trochę spoiler alert.
*05:54*

Do tego jeszcze wrócimy.
*05:56*

Natomiast request wygląda tak.
*05:59*

Czyli przekazujemy tą całą historię konwersacji.
*06:04*

I zobaczcie, że w historii konwersacji jest przekazywany systemowy prompt.
*06:09*

I jedno zapytanie użytkownika.
*06:15*

I teraz jak będę kontynuował konwersację.
*06:20*

"Tell me more".
*06:23*

To zobaczcie, że ten drugi request ma całą historię konwersacji.
*06:26*

To ma dość duże znaczenie.
*06:34*

Bo jeżeli chcemy promptować na jakiś inny temat.
*06:36*

To warto jest po prostu tą konwersację zmienić.
*06:40*

W momencie kiedy ja zrobię to na nowo.
*06:45*

To zobaczcie, że tej historii nie będzie.
*06:48*

Także zmieniając wątek pamiętajmy o tym, że musimy zmienić konwersację.
*06:54*

Także o tym warto pamiętać.
*07:02*

I kolejna rzecz o której warto pamiętać to to, że my za każdym razem przesyłamy też narzędzia.
*07:07*

"What items do we have in stock?"
*07:15*

Przesyłamy jeszcze narzędzia.
*07:21*

O narzędziach będzie przy okazji agentów.
*07:24*

Nie chciałbym teraz tutaj wchodzić w zbyt duże szczegóły.
*07:26*

Natomiast zwróćcie uwagę, że tutaj lista narzędzi też jest wysyłana.
*07:29*

I Copilot też ma swoje narzędzia.
*07:34*

Cursor też ma swoje narzędzia.
*07:37*

To są narzędzia, które umożliwiają kodowanie z AI.
*07:39*

Także o tym warto pamiętać.
*07:43*

Podsumowując, mamy prompt użytkownika, prompt systemowy, jeszcze mamy prompt, którego dokleja nam twórca tego narzędzia.
*07:49*

To jest zazwyczaj totalnie niewidoczne dla nas.
*08:01*

Mamy pełną historię konwersacji i mamy listę dostępnych narzędzi.
*08:04*

Także jest tego całkiem sporo.
*08:10*

Pamiętacie, kiedyś mówiło się o tzw. prompt engineeringu.
*08:12*

Teraz de facto prompt engineering stracił na znaczeniu, bo twórcy narzędzi nam tego naszego prompta bardzo mocno opakowują.
*08:19*

Natomiast wciąż nie jest to skill pozbawiony znaczenia.
*08:28*

Warto rozumieć, co składa się na dobrego prompta.
*08:34*

Warto też mieć w głowie ten całościowy ogląd, co tak naprawdę składa się na prompta.
*08:37*

No i warto studiować dobre techniki.
*08:44*

Przy czym znaczenie tego nie jest tak duże, jak to było kiedyś.
*08:50*

