const MULTIPLE_CHOICE_QUESTIONS = [
 
 { id: "mcq_1", category: "hungary_pre_1848", prompt: "Kit választottak a hagyomány szerint a korai sztyeppei jellegű állam élére a vérszerződés során?", options: ["Árpádot", "Álmost", "Koppányt", "Lehelt"], correctOptionIndex: 1 },
  { id: "mcq_2", category: "hungary_pre_1848", prompt: "Hol éltek a magyar törzsek a Kárpát-medence elfoglalását megelőző időszakban?", options: ["Levédia területén", "A Balkánon", "Etelközben", "Pannóniában"], correctOptionIndex: 2 },
  { id: "mcq_3", category: "hungary_pre_1848", prompt: "Melyik hatalommal léptek szövetségre a magyarok a bolgárok ellen?", options: ["A Frank Birodalommal", "Bizánccal", "A Német-római Császársággal", "A Kijevi Rusz államával"], correctOptionIndex: 1 },
  { id: "mcq_4", category: "hungary_pre_1848", prompt: "Kiket hívtak segítségül a bolgárok a magyarok etelközi szállásterülete ellen?", options: ["Kunokat", "Avarokat", "Normannokat", "Besenyőket"], correctOptionIndex: 3 },
  { id: "mcq_5", category: "hungary_pre_1848", prompt: "Mi biztosította hosszú távon a magyarok megmaradását a Kárpát-medencében?", options: ["Augsburg elfoglalása", "A besenyők legyőzése", "Az 907-es pozsonyi győzelem", "A frankokkal kötött béke"], correctOptionIndex: 2 },
  { id: "mcq_6", category: "hungary_pre_1848", prompt: "Mi volt a magyar hadisikerek egyik legfontosabb oka a kalandozások idején?", options: ["Nehézpáncélos lovagsereg", "Kiváló lovasíjász harcmodor", "Erős tengeri flotta", "Tüzérségi fölény"], correctOptionIndex: 1 },
  { id: "mcq_7", category: "hungary_pre_1848", prompt: "Melyik esemény vetett véget a nyugati irányú kalandozásoknak?", options: ["A muhi csata", "A pozsonyi csata", "Az augsburgi csata", "A merseburgi csata"], correctOptionIndex: 2 },
  { id: "mcq_8", category: "hungary_pre_1848", prompt: "Miért törekedett Géza keresztény alapú monarchia létrehozására?", options: ["Mert Bizánc ezt követelte", "Mert a nomád életmódot akarta visszaállítani", "Mert Európában a legitim uralkodói hatalom alapja a kereszténység volt", "Mert így akarta megszüntetni a vármegyéket"], correctOptionIndex: 2 },
  { id: "mcq_9", category: "hungary_pre_1848", prompt: "Melyik házasság volt Géza diplomáciai politikájának egyik legfontosabb lépése?", options: ["István és bajor Gizella házassága", "Géza és Sarolt házassága", "Koppány és Gizella házassága", "István és egy bizánci hercegnő házassága"], correctOptionIndex: 0 },
  { id: "mcq_10", category: "hungary_pre_1848", prompt: "Melyik hittérítőt említi név szerint az anyag Géza tevékenysége kapcsán?", options: ["Szent Benedeket", "Szent Adalbertet", "Assisi Szent Ferencet", "Szent Lászlót"], correctOptionIndex: 1 },
  { id: "mcq_11", category: "hungary_pre_1848", prompt: "Kivel kellett Istvánnak trónharcot vívnia Géza halála után?", options: ["Ajtonnyal", "Gyulával", "Koppánnyal", "Vazullal"], correctOptionIndex: 2 },
  { id: "mcq_12", category: "hungary_pre_1848", prompt: "Ki koronázta meg Istvánt 1000-ben az anyag szerint?", options: ["III. Ottó császár", "II. Szilveszter pápa", "VII. Gergely pápa", "Anasztáz pápa"], correctOptionIndex: 1 },
  { id: "mcq_13", category: "hungary_pre_1848", prompt: "Mi adta az ország irányításának alapját Szent István idején?", options: ["A nemzetségi szállások", "A királyi vármegyék", "A szabad királyi városok", "A rendi gyűlés"], correctOptionIndex: 1 },
  { id: "mcq_14", category: "hungary_pre_1848", prompt: "Melyik két központot emeli ki az anyag Szent István államában?", options: ["Buda és Visegrád", "Pécs és Kalocsa", "Esztergom és Székesfehérvár", "Győr és Eger"], correctOptionIndex: 2 },
  { id: "mcq_15", category: "hungary_pre_1848", prompt: "Miből származtak korábban főként a királyi bevételek?", options: ["A királyi birtokokból", "A jobbágyi robotból", "A pápai tizedből", "A céhek adójából"], correctOptionIndex: 0 },
  { id: "mcq_16", category: "hungary_pre_1848", prompt: "Mi volt II. András úgynevezett „nagyszerű terve”?", options: ["A városi kiváltságok eltörlése", "Nagy birtokadományozás hívek szerzése érdekében", "A tatárok elleni kővárprogram", "A jobbágyfelszabadítás előkészítése"], correctOptionIndex: 1 },
  { id: "mcq_17", category: "hungary_pre_1848", prompt: "Mit jelentettek a regálé jövedelmek ?", options: ["Egyházi eredetű bevételeket", "A nemesek önkéntes adományait", "Királyi felségjogon szedett jövedelmeket", "Csak a külkereskedelemből származó hasznot"], correctOptionIndex: 2 },
  { id: "mcq_18", category: "hungary_pre_1848", prompt: "Melyik NEM tartozott a felsorolt regálé jövedelmek közé?", options: ["Harmincadvám", "Bányajogok", "Sómonopólium", "Kilenced"], correctOptionIndex: 3 },
  { id: "mcq_19", category: "hungary_pre_1848", prompt: "Mi váltotta ki elsősorban a nemesség elégedetlenségét II. András idején?", options: ["A gyakori pénzrontás, az új adók és az idegen pénzügyi tisztviselők", "A túl alacsony sóárak", "A jobbágyok katonai szolgálata", "A városok kiváltságai"], correctOptionIndex: 0 },
  { id: "mcq_20", category: "hungary_pre_1848", prompt: "Mi tette jellegzetessé az Aranybullát?", options: ["A ráírt latin himnusz", "Az okmányon függő arany pecsét", "A király kézzel rajzolt címere", "A kőbe vésett szöveg"], correctOptionIndex: 1 },
  { id: "mcq_21", category: "hungary_pre_1848", prompt: "Kik sérelmeire reagált eredetileg főleg az Aranybulla?", options: ["A jobbágyok és a városi polgárok", "A királyi szerviensek és az egyház", "A kunok és a jászok", "A céhek és a kereskedők"], correctOptionIndex: 1 },
  { id: "mcq_22", category: "hungary_pre_1848", prompt: "Hol kellett évente gyűlést tartani az 1. cikkely szerint?", options: ["Esztergomban", "Budán", "Fehérváron", "Visegrádon"], correctOptionIndex: 2 },
  { id: "mcq_23", category: "hungary_pre_1848", prompt: "Mit mondott ki a 4. cikkely a fiúörökös nélkül meghalt szerviens lányáról?", options: ["Semmit sem örökölhet", "A teljes birtokot megkapja", "Egy negyedrészt kap", "Csak készpénzt örökölhet"], correctOptionIndex: 2 },
  { id: "mcq_24", category: "hungary_pre_1848", prompt: "Mikor kellett a szervienseknek feltétlenül hadba vonulniuk a 7. cikkely szerint?", options: ["Minden külföldi hadjáratban", "Csak a pápa parancsára", "Ha az országot támadás érte", "Kizárólag zsoldért"], correctOptionIndex: 2 },
  { id: "mcq_25", category: "hungary_pre_1848", prompt: "Kiket zárt volna ki a 24. cikkely a pénzügyi, só- és vámtisztségekből?", options: ["Kunokat és jászokat", "Izmaelitákat és zsidókat", "Püspököket és apátokat", "Várjobbágyokat és udvarnokokat"], correctOptionIndex: 1 },
  { id: "mcq_26", category: "hungary_pre_1848", prompt: "Mit biztosított a 31. cikkely?", options: ["A vámmentes kereskedelmet", "Az örökös főispáni címet", "Az ellenállási jogot hűtlenségi vád nélkül", "A szabad papválasztást"], correctOptionIndex: 2 },
  { id: "mcq_27", category: "hungary_pre_1848", prompt: "Ki figyelmeztette IV. Bélát a tatárveszélyre?", options: ["Anonymus", "Julianus barát", "Kézai Simon", "Szent Gellért"], correctOptionIndex: 1 },
  { id: "mcq_28", category: "hungary_pre_1848", prompt: "Kitől kért nyugati segítséget IV. Béla a tatár veszély idején?", options: ["A franciáktól", "A velenceiektől", "Az osztrákoktól", "Az angoloktól"], correctOptionIndex: 2 },
  { id: "mcq_29", category: "hungary_pre_1848", prompt: "Hol zajlott a muhi csata döntő szakasza?", options: ["A Tisza mellett, Szegednél", "A Sajó mellett, Muhi térségében", "A Duna mellett, Pestnél", "A Dráva mellett, Eszéknél"], correctOptionIndex: 1 },
  { id: "mcq_30", category: "hungary_pre_1848", prompt: "Mivel vette körül táborát a magyar sereg a muhi csatában?", options: ["Kőfallal", "Palánkkerítéssel", "Szekérvárral", "Vizesárokkal"], correctOptionIndex: 2 },
  { id: "mcq_31", category: "hungary_pre_1848", prompt: "Mi történt a hídnál a csata előtti estén?", options: ["A magyarok azonnal visszavonultak", "A tatárok felégették a hidat", "A magyarok visszavertek egy mongol támadást", "IV. Béla átadta a hidat a tatároknak"], correctOptionIndex: 2 },
  { id: "mcq_32", category: "hungary_pre_1848", prompt: "Ki keresett északi kerülővel átkelőt, hogy oldalba-hátba támadjon?", options: ["Batu kán", "Szübötej", "Kötöny", "Julianus barát"], correctOptionIndex: 1 },
  { id: "mcq_33", category: "hungary_pre_1848", prompt: "Hogyan szorították össze végül a mongolok a magyar tábort?", options: ["Tengeri blokáddal", "Egyetlen frontális rohammal", "Két irányból", "A hegyekből lezúdulva"], correctOptionIndex: 2 },
  { id: "mcq_34", category: "hungary_pre_1848", prompt: "Miért volt különösen súlyos a tatárjárás pusztítása?", options: ["Mert a tatárok elfoglalták a teljes királyi kincstárat", "Mert falvak tűntek el és óriási emberveszteség történt", "Mert az egyház teljesen megszűnt", "Mert az ország rögtön három részre szakadt"], correctOptionIndex: 1 },
  { id: "mcq_35", category: "hungary_pre_1848", prompt: "Mi tette lehetővé, hogy 1242 után új korszak kezdődjön?", options: ["A német-római császár azonnali segítsége", "A pápai hadsereg bevonulása", "IV. Béla életben maradt", "Az Aranybulla visszavonása"], correctOptionIndex: 2 },
  { id: "mcq_36", category: "hungary_pre_1848", prompt: "Mi volt IV. Béla legjelentősebb városalapítási akciója?", options: ["Esztergom újjáépítése", "Budavár építése", "Pozsony fallal körülvétele", "Pannonhalma megerősítése"], correctOptionIndex: 1 },
  { id: "mcq_37", category: "hungary_pre_1848", prompt: "Melyik település lakosságát költöztették át a Várhegyre 1247-ben?", options: ["Fehérvár", "Esztergom", "Pest", "Székesfehérvár"], correctOptionIndex: 2 },
  { id: "mcq_38", category: "hungary_pre_1848", prompt: "Melyik harcmodort ítélte hatékonyabbnak IV. Béla a nomádokkal szemben?", options: ["Könnyűlovas íjászok alkalmazását", "A nehézlovasságot, páncélos lovagokkal", "Csak gyalogos paraszthadakat", "Tengeri flottát"], correctOptionIndex: 1 },
  { id: "mcq_39", category: "hungary_pre_1848", prompt: "Kik visszatelepítése szolgált védelmi célokat?", options: ["Besenyők", "Székelyek", "Kunok", "Szászok"], correctOptionIndex: 2 },
  { id: "mcq_40", category: "hungary_pre_1848", prompt: "Melyik lovagrenddel kötött szerződést IV. Béla 1247-ben?", options: ["Templomosokkal", "Johanitákkal", "Német lovagrenddel", "Pálosokkal"], correctOptionIndex: 1 },
  { id: "mcq_41", category: "hungary_pre_1848", prompt: "Mi volt a birtokadományok egyik feltétele IV. Béla új politikájában?", options: ["Kolostoralapítás", "Vámmentesség biztosítása", "Kővár építése", "Évenkénti zarándoklat"], correctOptionIndex: 2 },
  { id: "mcq_42", category: "hungary_pre_1848", prompt: "Mely két helyen emeltek új királyi erődítményeket?", options: ["Egerben és Pécsen", "Budán és Visegrádon", "Győrben és Sopronban", "Debrecenben és Szolnokon"], correctOptionIndex: 1 },
  { id: "mcq_43", category: "hungary_pre_1848", prompt: "Mely társadalmi réteg hatalma nőtt meg a várépítési program nyomán?", options: ["A jobbágyoké", "A báróké, nagybirtokosoké", "A céhmestereké", "A mezővárosi polgároké"], correctOptionIndex: 1 },
  { id: "mcq_44", category: "hungary_pre_1848", prompt: "Kiket fogadott be IV. Béla a népességpótlás érdekében?", options: ["Csak olasz kereskedőket", "Jászokat és kunokat", "Kizárólag francia lovagokat", "Csak cseh bányászokat"], correctOptionIndex: 1 },
  { id: "mcq_45", category: "hungary_pre_1848", prompt: "Mi tette lehetővé a tartományurak megerősödését a 14. század elején?", options: ["III. András halála és az Árpád-ház kihalása", "A tatárjárás újabb hulláma", "A pápa magyarországi hadjárata", "A törökök balkáni áttörése"], correctOptionIndex: 0 },
  { id: "mcq_46", category: "hungary_pre_1848", prompt: "Hogyan nevezzük azokat a nagyhatalmú főurakat, akik saját területükön szinte királyként uralkodtak?", options: ["Nádorok", "Tartományurak", "Banderiálisok", "Familiárisok"], correctOptionIndex: 1 },
  { id: "mcq_47", category: "hungary_pre_1848", prompt: "Ki segítette jelentősen I. Károly legitimitásának megerősítését?", options: ["A Német Lovagrend", "A velencei dózse", "A pápaság és Gentilis pápai legátus", "A bizánci császár"], correctOptionIndex: 2 },
  { id: "mcq_48", category: "hungary_pre_1848", prompt: "Melyik város támogatta I. Károlyt az Aba-fiakkal szemben?", options: ["Pozsony", "Temesvár", "Nagyvárad", "Kassa"], correctOptionIndex: 3 },
  { id: "mcq_49", category: "hungary_pre_1848", prompt: "Melyik csata számított I. Károly hatalmának egyik döntő fordulópontjának?", options: ["Rozgonyi csata", "Nikápolyi csata", "Várnai csata", "Mohácsi csata"], correctOptionIndex: 0 },
  { id: "mcq_50", category: "hungary_pre_1848", prompt: "Mire támaszkodott I. Károly a királyi bevételek megszilárdításakor elsősorban?", options: ["A rendkívüli hadiadóra", "A regáléjövedelmekre", "Az egyházi tizedre", "A robotra"], correctOptionIndex: 1 },
  { id: "mcq_51", category: "hungary_pre_1848", prompt: "Ki volt I. Károly korszakának egyik legfontosabb pénzügyi irányítója?", options: ["Kinizsi Pál", "Vitéz János", "Nekcsei Demeter", "Cillei Ulrik"], correctOptionIndex: 2 },
  { id: "mcq_52", category: "hungary_pre_1848", prompt: "Melyik pénzt vezette be I. Károly a stabil pénzrendszer megteremtésére?", options: ["Tallér", "Garas", "Krajcár", "Aranyforint"], correctOptionIndex: 3 },
  { id: "mcq_53", category: "hungary_pre_1848", prompt: "Mi volt az aranyforint váltópénze?", options: ["Ezüstdénár", "Korona", "Obulus", "Denarius aureus"], correctOptionIndex: 0 },
  { id: "mcq_54", category: "hungary_pre_1848", prompt: "Mit tiltottak be a királyi pénzverési monopólium megerősítése érdekében?", options: ["A sókereskedelmet", "A nyers nemesfémmel való kereskedést", "A városi vásárokat", "A külföldi pénzek használatát"], correctOptionIndex: 1 },
  { id: "mcq_55", category: "hungary_pre_1848", prompt: "Miért engedte át I. Károly a bányahaszon egy részét a földbirtokosnak?", options: ["Hogy csökkentse a városok hatalmát", "Hogy a nemességet mentesítse az adó alól", "Hogy érdekeltté tegye a lelőhelyek bejelentésében", "Hogy megszüntesse a királyi monopóliumot"], correctOptionIndex: 2 },
  { id: "mcq_56", category: "hungary_pre_1848", prompt: "Mit jelentett a harmincad?", options: ["A jobbágytelek után fizetett földbért", "Az egyházi tized harmincad részét", "A hadsereg harmincnapos szolgálatát", "A kereskedők áruinak 1/30-a utáni vámot"], correctOptionIndex: 3 },
  { id: "mcq_57", category: "hungary_pre_1848", prompt: "Mi volt az 1335-ös visegrádi királytalálkozó egyik fő célja?", options: ["Bécs árumegállító jogának megkerülése", "A pápa kiközösítésének visszavonása", "A törökök balkáni feltartóztatása", "A cseh trón megszerzése"], correctOptionIndex: 0 },
  { id: "mcq_58", category: "hungary_pre_1848", prompt: "Mi alapján vetették ki a kapuadót?", options: ["A földbirtok nagysága alapján", "A jobbágyporta után, olyan kapu után, amelyen megrakott szekér is befért", "A gabonatermés mennyisége alapján", "A nemesi cím rangja alapján"], correctOptionIndex: 1 },
  { id: "mcq_59", category: "hungary_pre_1848", prompt: "Melyik hely lett az oszmánok első fontos állandó európai támaszpontja?", options: ["Drinápoly", "Nándorfehérvár", "Gallipoli", "Rigómező"], correctOptionIndex: 2 },
  { id: "mcq_60", category: "hungary_pre_1848", prompt: "Melyik katonai alakulat volt az Oszmán Birodalom fizetett elit gyalogsága?", options: ["Szpáhik", "Banderiálisok", "Husziták", "Janicsárok"], correctOptionIndex: 3 },
  { id: "mcq_61", category: "hungary_pre_1848", prompt: "Mi jellemezte a timár-rendszert?", options: ["A katonai szolgálatért földből vagy jövedelemből részesedtek", "A katonák kizárólag pénzzsoldot kaptak", "Csak a janicsárokra vonatkozott", "A városok önkormányzatát erősítette"], correctOptionIndex: 0 },
  { id: "mcq_62", category: "hungary_pre_1848", prompt: "Melyik város elfoglalása jelentette az oszmánok legnagyobb áttörését 1453-ban?", options: ["Buda", "Konstantinápoly", "Velence", "Belgrád"], correctOptionIndex: 1 },
  { id: "mcq_63", category: "hungary_pre_1848", prompt: "Hol szenvedett vereséget Luxemburgi Zsigmond 1396-ban?", options: ["Várnánál", "Rigómezőn", "Nikápolynál", "Rozgonynál"], correctOptionIndex: 2 },
  { id: "mcq_64", category: "hungary_pre_1848", prompt: "Mivel próbálta Zsigmond lassítani a török előrenyomulást?", options: ["Tengeri flottával", "Kereskedővárosok szövetségével", "Pénzreformokkal", "Déli végvárrendszer kiépítésével"], correctOptionIndex: 3 },
  { id: "mcq_65", category: "hungary_pre_1848", prompt: "Mit jelentett a banderiális hadsereg?", options: ["A főurak és főpapok saját zászló alatt kiállított csapatai", "A parasztokból álló királyi sereg", "A városi polgárok őrsége", "A zsoldosok különleges alakulata"], correctOptionIndex: 0 },
  { id: "mcq_66", category: "hungary_pre_1848", prompt: "Mi alapozta meg Hunyadi János hadvezéri hírnevét az 1440-es évek elején?", options: ["Az itáliai hadjáratai", "Az 1441-1442-es erdélyi sikerei", "A bécsi ostrom", "A cseh korona megszerzése"], correctOptionIndex: 1 },
  { id: "mcq_67", category: "hungary_pre_1848", prompt: "Mit jelentett a huszita szekérvár alkalmazása?", options: ["Ostromtornyok használatát", "Kizárólag lovasrohamot", "Harci szekerekből kialakított védelmi vonalat", "Hídépítést a hadjáratok során"], correctOptionIndex: 2 },
  { id: "mcq_68", category: "hungary_pre_1848", prompt: "Mi vezetett közvetlenül az 1444-es várnai hadjárathoz?", options: ["Hunyadi lemondása", "A pápa megtiltotta a tárgyalást", "A törökök elfoglalták Budát", "Ulászló király megszegte a békét"], correctOptionIndex: 3 },
  { id: "mcq_69", category: "hungary_pre_1848", prompt: "Ki került a magyar trónra Ulászló halála után?", options: ["V. László", "III. Frigyes", "I. Károly", "Corvin János"], correctOptionIndex: 0 },
  { id: "mcq_70", category: "hungary_pre_1848", prompt: "Milyen tisztségbe választották Hunyadit 1446-ban?", options: ["Nádor", "Kormányzó", "Tárnokmester", "Érsek"], correctOptionIndex: 1 },
  { id: "mcq_71", category: "hungary_pre_1848", prompt: "Mi volt az egyik fő oka Hunyadi vereségének a második rigómezei csatában?", options: ["A magyar flottát megsemmisítették", "A zsoldosok átálltak a törökökhöz", "Nem jött létre a remélt szélesebb keresztény összefogás", "Kitört a pestis a seregben"], correctOptionIndex: 2 },
  { id: "mcq_72", category: "hungary_pre_1848", prompt: "Ki segítette a nándorfehérvári védelem sikerét 1456-ban Hunyadi mellett?", options: ["Vitéz János", "Nekcsei Demeter", "Podjebrád György", "Kapisztrán János"], correctOptionIndex: 3 },
  { id: "mcq_73", category: "hungary_pre_1848", prompt: "Hová hurcolták fogságba a fiatal Mátyást?", options: ["Prágába", "Krakkóba", "Velencébe", "Bécsbe"], correctOptionIndex: 0 },
  { id: "mcq_74", category: "hungary_pre_1848", prompt: "Mi erősítette meg döntően Mátyás belpolitikai helyzetét 1463-1464-ben?", options: ["A nikápolyi győzelem", "A Szent Korona visszaszerzése és a szabályos koronázás", "A pápa császárrá koronázta", "A lengyel trón megszerzése"], correctOptionIndex: 1 },
  { id: "mcq_75", category: "hungary_pre_1848", prompt: "Mit tartalmazott a bécsújhelyi egyezség örökösödési záradéka?", options: ["A trón a Jagellókra száll, ha nincs fiúörökös", "Corvin János automatikusan örököl", "A trón a Habsburgokra szállhat, ha nincs törvényes fiúörökös", "A rendek szabadon választhatnak bármely külföldi uralkodót"], correctOptionIndex: 2 },
  { id: "mcq_76", category: "hungary_pre_1848", prompt: "Mi lett Mátyás alatt a harmincadvámból?", options: ["Kapuadó", "Huszadvám", "Füstpénz", "Koronavám"], correctOptionIndex: 3 },
  { id: "mcq_77", category: "hungary_pre_1848", prompt: "Melyik adónem kiszélesítésével akarta Mátyás elérni, hogy többen fizessenek közterhet?", options: ["Füstadó", "Tized", "Robot", "Ajándékadó"], correctOptionIndex: 0 },
  { id: "mcq_78", category: "hungary_pre_1848", prompt: "Mi volt Mátyás legnagyobb bevételi forrása?", options: ["Egyházi adók", "Rendkívüli hadiadó", "Kilenced", "Telekadó"], correctOptionIndex: 1 },
  { id: "mcq_79", category: "hungary_pre_1848", prompt: "Mi volt a fekete sereg?", options: ["A jobbágyokból toborzott határőrség", "A nemesség alkalmi felkelő serege", "Állandó zsoldoshadsereg", "A pápa által küldött keresztes had"], correctOptionIndex: 2 },
  { id: "mcq_80", category: "hungary_pre_1848", prompt: "Ki volt Mátyás egyik legismertebb hadvezére?", options: ["Cillei Ulrik", "Aba Amadé", "Gentilis", "Kinizsi Pál"], correctOptionIndex: 3 },
  { id: "mcq_81", category: "hungary_pre_1848", prompt: "Mi volt a Corvinák jelentősége?", options: ["Mátyás híres könyvtárának díszes kódexei voltak", "Mátyás törvénykönyvének példányai voltak", "A fekete sereg zsoldjegyzékei voltak", "A bányavárosok számadáskönyvei voltak"], correctOptionIndex: 0 },
  { id: "mcq_82", category: "hungary_pre_1848", prompt: "Mi volt Mátyás külpolitikájának egyik központi célja?", options: ["A francia trón megszerzése", "A törökök megállítása és egy közép-európai szuperhatalom létrehozása", "A pápai állam elfoglalása", "A Balkán teljes meghódítása a velenceiekkel közösen"], correctOptionIndex: 1 },
  { id: "mcq_83", category: "hungary_pre_1848", prompt: "Milyen ürüggyel indított hadjáratot Mátyás Podjebrád György ellen?", options: ["A lengyel trón öröksége miatt", "A török szövetség miatt", "A huszita eretnekség vádjára hivatkozva", "A bányavárosok birtoklásáért"], correctOptionIndex: 2 },
  { id: "mcq_84", category: "hungary_pre_1848", prompt: "Melyik várost foglalta el Mátyás 1485-ben, és tette székhelyévé?", options: ["Prága", "Krakkó", "Konstantinápoly", "Bécs"], correctOptionIndex: 3 },
  { id: "mcq_85", category: "hungary_pre_1848", prompt: "Ki lett magyar király Hunyadi Mátyás halála után?", options: ["Corvin János", "II. Ulászló", "Szapolyai János", "Habsburg Ferdinánd"], correctOptionIndex: 1 },
  { id: "mcq_86", category: "hungary_pre_1848", prompt: "Miért nem támogatta a főurak többsége Corvin Jánost a trónon?", options: ["Mert külföldi volt", "Mert túl fiatal volt", "Mert inkább könnyebben befolyásolható uralkodót akartak", "Mert lemondott a trónról"], correctOptionIndex: 2 },
  { id: "mcq_87", category: "hungary_pre_1848", prompt: "Mi gyengült meg II. Ulászló uralkodása alatt?", options: ["A végvárrendszer mellett a központi hatalom is", "A török hadsereg", "A nemesség birtokai", "A pápa tekintélye"], correctOptionIndex: 0 },
  { id: "mcq_88", category: "hungary_pre_1848", prompt: "Melyik esemény rontotta tovább az ország belső helyzetét 1514-ben?", options: ["A visegrádi béke", "A Dózsa-féle parasztfelkelés", "A mohácsi csata", "A tordai országgyűlés"], correctOptionIndex: 1 },
  { id: "mcq_89", category: "hungary_pre_1848", prompt: "Miért volt stratégiailag kiemelt jelentőségű Nándorfehérvár?", options: ["A magyar aranybányák központja volt", "A Duna és a Száva találkozásánál feküdt", "Ott koronázták a királyokat", "Erdély fővárosa volt"], correctOptionIndex: 1 },
  { id: "mcq_90", category: "hungary_pre_1848", prompt: "Ki támadta meg Nándorfehérvárt 1521-ben?", options: ["I. Ferdinánd", "Tomori Pál", "I. Szulejmán", "János Zsigmond"], correctOptionIndex: 2 },
  { id: "mcq_91", category: "hungary_pre_1848", prompt: "Hová rendelte II. Lajos a gyülekezőt 1526 júliusában?", options: ["Pozsony mellé", "Tolna mellé", "Esztergom mellé", "Kassa mellé"], correctOptionIndex: 1 },
  { id: "mcq_92", category: "hungary_pre_1848", prompt: "Kik voltak a forrás szerint a mohácsi csata fővezérei?", options: ["Dobó István és Zrínyi Miklós", "Tomori Pál és Szapolyai György", "Báthory István és Fráter György", "Szapolyai János és Jurisics Miklós"], correctOptionIndex: 1 },
  { id: "mcq_93", category: "hungary_pre_1848", prompt: "Mi jelentette az oszmán hadsereg egyik legnagyobb előnyét Mohácsnál?", options: ["A magyarokénál gyengébb, de gyorsabb lovasság", "A teljesen páncél nélküli gyalogság", "A korszerűbb, összehangoltabb hadsereg", "A kizárólagos tengeri támogatás"], correctOptionIndex: 2 },
  { id: "mcq_94", category: "hungary_pre_1848", prompt: "Mi volt a magyar támadás kezdeti eredménye a csatában?", options: ["Azonnali teljes visszavonulás", "Korai magyar sikerek", "A török tüzérség megsemmisítése", "Szulejmán fogságba esett"], correctOptionIndex: 1 },
  { id: "mcq_95", category: "hungary_pre_1848", prompt: "Mi történt II. Lajossal a mohácsi csata után?", options: ["Bécsbe menekült", "Fogságba esett", "A csatában meghalt", "Lemondott a trónról"], correctOptionIndex: 2 },
  { id: "mcq_96", category: "hungary_pre_1848", prompt: "Kit támogatta az egyik főúri tábor Mohács után?", options: ["Szapolyai Jánost", "Corvin Jánost", "Mátyás fiát", "Dobó Istvánt"], correctOptionIndex: 0 },
  { id: "mcq_97", category: "hungary_pre_1848", prompt: "Ki formált dinasztikus alapon igényt a magyar trónra?", options: ["Tomori Pál", "János Zsigmond", "Habsburg Ferdinánd", "Fráter György"], correctOptionIndex: 2 },
  { id: "mcq_98", category: "hungary_pre_1848", prompt: "Mikor választották királlyá Szapolyai Jánost?", options: ["1526 novemberében", "1527 tavaszán", "1529 őszén", "1538-ban"], correctOptionIndex: 0 },
  { id: "mcq_99", category: "hungary_pre_1848", prompt: "Kihez fordult segítségért Szapolyai, amikor meggyengült?", options: ["A pápához", "Velencéhez", "Szulejmánhoz", "Franciaországhoz"], correctOptionIndex: 2 },
  { id: "mcq_100", category: "hungary_pre_1848", prompt: "Mi volt a váradi béke?", options: ["Nyílt szövetség a pápával", "Titkos megállapodás Ferdinánd és Szapolyai között", "Béke a csehekkel", "Kereskedelmi egyezmény Erdéllyel"], correctOptionIndex: 1 },
  { id: "mcq_101", category: "hungary_pre_1848", prompt: "Melyik esemény tette semmissé a váradi béke logikáját?", options: ["Bécs ostroma", "János Zsigmond születése", "Eger eleste", "A drinápolyi béke"], correctOptionIndex: 1 },
  { id: "mcq_102", category: "hungary_pre_1848", prompt: "Mi vezetett közvetlenül az ország három részre szakadásához?", options: ["A mohácsi csata első lovasrohama", "Buda 1541-es elfoglalása", "A tordai országgyűlés", "A speyeri szerződés"], correctOptionIndex: 1 },
  { id: "mcq_103", category: "hungary_pre_1848", prompt: "Kinek a gyámsága alá került kezdetben a keleti országrész igazgatása?", options: ["Tomori Pál", "Fráter György", "Dobó István", "Jurisics Miklós"], correctOptionIndex: 1 },
  { id: "mcq_104", category: "hungary_pre_1848", prompt: "Mi történt az 1542-es Habsburg kísérlettel Buda visszafoglalására?", options: ["Sikerrel járt", "Kudarcot vallott", "Béketárgyalássá alakult", "Erdély támogatta"], correctOptionIndex: 1 },
  { id: "mcq_105", category: "hungary_pre_1848", prompt: "Ki vezette Eger várának védelmét 1552-ben?", options: ["Szondy György", "Dobó István", "Zrínyi Miklós", "Frangepán Kristóf"], correctOptionIndex: 1 },
  { id: "mcq_106", category: "hungary_pre_1848", prompt: "Hol tartották a rendi országgyűléseket Buda eleste után?", options: ["Kolozsváron", "Pozsonyban", "Egerben", "Gyulafehérváron"], correctOptionIndex: 1 },
  { id: "mcq_107", category: "hungary_pre_1848", prompt: "Mely intézmények működtek tovább a királyi országrészben?", options: ["Csak az Udvari Haditanács", "A Magyar Kancellária és a Magyar Kamara", "Csak a nádori hivatal", "A tordai országgyűlés és a fejedelmi tanács"], correctOptionIndex: 1 },
  { id: "mcq_108", category: "hungary_pre_1848", prompt: "Mi lett a török elleni védekezés kulcsa a 16. században?", options: ["A nyílt mezei ütközetek", "A végvárrendszer", "A teljes kivonulás a déli határokról", "A kizárólagos tengeri harc"], correctOptionIndex: 1 },
  { id: "mcq_109", category: "hungary_pre_1848", prompt: "Melyik vár védelme állította meg az 1532-es török előrenyomulást?", options: ["Eger", "Szigetvár", "Kőszeg", "Nándorfehérvár"], correctOptionIndex: 2 },
  { id: "mcq_110", category: "hungary_pre_1848", prompt: "Ki védte Szigetvárt 1566-ban?", options: ["Dobó István", "Zrínyi Miklós", "Fráter György", "Jurisics Miklós"], correctOptionIndex: 1 },
  { id: "mcq_111", category: "hungary_pre_1848", prompt: "Mi történt I. Szulejmánnal Szigetvár ostroma után?", options: ["Bécsben békét kötött", "A táborában meghalt", "Fogságba esett", "Visszavonult Isztambulba tárgyalni"], correctOptionIndex: 1 },
  { id: "mcq_112", category: "hungary_pre_1848", prompt: "Mit jelentett a drinápolyi béke?", options: ["Örök békét a törökkel", "Nyolcéves fegyverszünetet", "A teljes török kivonulást", "A magyar egység helyreállítását"], correctOptionIndex: 1 },
  { id: "mcq_113", category: "hungary_pre_1848", prompt: "Mikor hívták vissza Izabellát Lengyelországból az erdélyi rendek?", options: ["1541-ben", "1556-ban", "1568-ban", "1570-ben"], correctOptionIndex: 1 },
  { id: "mcq_114", category: "hungary_pre_1848", prompt: "Mit kapott János Zsigmond a speyeri szerződésben 1570-ben?", options: ["A magyar király címet", "A horvát bán címet", "Erdély és a Partium fejedelme címet", "A császári herceg címet"], correctOptionIndex: 2 },
  { id: "mcq_115", category: "hungary_pre_1848", prompt: "Milyen viszonyban állt Erdély az Oszmán Birodalommal?", options: ["Közvetlenül tartomány volt", "Teljesen független állam volt", "Vazallus állam volt jelentős belső önállósággal", "Habsburg tartomány volt"], correctOptionIndex: 2 },
  { id: "mcq_116", category: "hungary_pre_1848", prompt: "Melyik országgyűlés hirdette ki Európában elsőként a vallásszabadságot négy irányzatnak?", options: ["Pozsonyi országgyűlés", "Tordai országgyűlés", "Rákosi országgyűlés", "Váradi gyűlés"], correctOptionIndex: 1 },
  { id: "mcq_117", category: "hungary_pre_1848", prompt: "Hány irányzat számára ismert el vallásszabadságot a forrás szerint a tordai országgyűlés?", options: ["Kettő", "Három", "Négy", "Öt"], correctOptionIndex: 2 },
  { id: "mcq_118", category: "hungary_pre_1848", prompt: "Melyik rendet telepítette Báthory István Kolozsvárra 1579-ben?", options: ["Bencéseket", "Jezsuitákat", "Ferenceseket", "Domonkosokat"], correctOptionIndex: 1 },
  { id: "mcq_119", category: "hungary_pre_1848", prompt: "Kit zárattak Déva várbörtönébe?", options: ["Fráter Györgyöt", "Dávid Ferencet", "János Zsigmondot", "Szondy Györgyöt"], correctOptionIndex: 1 },
  { id: "mcq_120", category: "hungary_pre_1848", prompt: "Mennyi lehetett nagyjából az Erdélyi Fejedelemség lakossága a 16. században?", options: ["100-200 ezer fő", "300-400 ezer fő", "700-900 ezer fő", "1,5-2 millió fő"], correctOptionIndex: 2 },
  { id: "mcq_121", category: "hungary_pre_1848", prompt: "A forrás becslése szerint melyik népcsoport adta Erdély lakosságának legnagyobb részét?", options: ["Szászok", "Románok", "Magyarok a székelyekkel együtt", "Szerbek"], correctOptionIndex: 2 },
  { id: "mcq_122", category: "hungary_pre_1848", prompt: "Körülbelül mekkora lehetett a román népesség aránya Erdélyben a 16. század végén?", options: ["5-10%", "25-30%", "40-45%", "60-65%"], correctOptionIndex: 1 },
  { id: "mcq_123", category: "hungary_pre_1848", prompt: "Körülbelül mekkora lehetett a szászok aránya Erdélyben a 16. század végén?", options: ["8-10%", "15-20%", "25-30%", "40-50%"], correctOptionIndex: 0 },
  { id: "mcq_124", category: "hungary_pre_1848", prompt: "Hol működött a szultán követe Erdélyben?", options: ["Kolozsváron", "Gyulafehérváron", "Pozsonyban", "Nándorfehérváron"], correctOptionIndex: 1 },
  { id: "mcq_125", category: "hungary_pre_1848", prompt: "Mi volt a reformkor egyik legfontosabb célja?", options: ["A feudális rend megerősítése", "A polgári, alkotmányos állam kialakítása", "A rendi kiváltságok változatlan fenntartása", "A jobbágyrendszer kiterjesztése"], correctOptionIndex: 1 },
  { id: "mcq_126", category: "hungary_pre_1848", prompt: "Melyik jelszó fejezte ki a korszak alapgondolatát?", options: ["Isten, haza, család", "Haza és haladás", "Szabadság vagy halál", "Munka és béke"], correctOptionIndex: 1 },
  { id: "mcq_127", category: "hungary_pre_1848", prompt: "Melyik társadalmi csoport tartozott inkább a reformpártiak közé?", options: ["A bécsi udvar", "A konzervatív nagybirtokosok egy része", "A városi polgárság és értelmiség", "A rendi privilégiumokhoz ragaszkodó körök"], correctOptionIndex: 2 },
  { id: "mcq_128", category: "hungary_pre_1848", prompt: "Miért volt fontos a magyar nyelv államnyelvvé tétele?", options: ["Mert így csökkent a belpolitikai viták száma", "Mert a latin nyelv használata kötelező lett volna", "Mert erősítette a nemzeti egységet és csökkentette a külső befolyást", "Mert a német nyelv teljes betiltása volt a cél"], correctOptionIndex: 2 },
  { id: "mcq_129", category: "hungary_pre_1848", prompt: "Melyik nyelv uralta sokáig a közigazgatást és a törvénykezést?", options: ["A magyar", "A latin", "A német", "A francia"], correctOptionIndex: 1 },
  { id: "mcq_130", category: "hungary_pre_1848", prompt: "Melyik nem tartozott a reformkor fő kérdései közé?", options: ["A jobbágykérdés", "A magyar nyelv ügye", "A polgári alkotmányosság", "A gyarmatosítás kiterjesztése"], correctOptionIndex: 3 },
  { id: "mcq_131", category: "hungary_pre_1848", prompt: "Ki fogalmazta meg az érdekegyesítés elvét?", options: ["Kossuth Lajos", "Wesselényi Miklós", "Táncsics Mihály", "Deák Ferenc"], correctOptionIndex: 1 },
  { id: "mcq_132", category: "hungary_pre_1848", prompt: "Mit jelentett az önkéntes örökváltság?", options: ["A jobbágyok azonnali felszabadítását kárpótlás nélkül", "A jobbágy és a földesúr megegyezéses megváltását", "Az állam által kikényszerített felszabadítást", "A nemesség adómentességének megszüntetését"], correctOptionIndex: 1 },
  { id: "mcq_133", category: "hungary_pre_1848", prompt: "Ki képviselte azt az álláspontot, hogy a nemest kártalanítás nélkül kellene felszabadítani a jobbágyokat?", options: ["Széchenyi István", "Wesselényi Miklós", "Táncsics Mihály", "Kölcsey Ferenc"], correctOptionIndex: 2 },
  { id: "mcq_134", category: "hungary_pre_1848", prompt: "Melyik állítás igaz Széchenyi Istvánra?", options: ["Gyors, tömeges politizálást sürgetett", "A Habsburg Monarchia keretei között képzelte el a reformokat", "A sajtónyilvánosságot tartotta a legfőbb eszköznek", "Elsősorban védővámokkal akarta fejleszteni az ipart"], correctOptionIndex: 1 },
  { id: "mcq_135", category: "hungary_pre_1848", prompt: "Széchenyi szerint mi akadályozta a hitelpiac fejlődését?", options: ["A túl gyors iparosodás", "A nemesi birtokjog kötöttségei és az ősiség logikája", "A városok túlzott megerősödése", "A jobbágyfelszabadítás"], correctOptionIndex: 1 },
  { id: "mcq_136", category: "hungary_pre_1848", prompt: "Melyik mű kapcsolódik Széchenyihez?", options: ["Pesti Hírlap", "Hitel", "Törvényhatósági Tudósítások", "Országos Védegylet"], correctOptionIndex: 1 },
  { id: "mcq_137", category: "hungary_pre_1848", prompt: "Mi volt a Nemzeti Kaszinó szerepe Széchenyi programjában?", options: ["Katonai kiképzőhely volt", "A reformelit együttműködését és a közéletet erősítette", "A jobbágyfelszabadítás végrehajtását irányította", "A birodalmi hivatalnokok találkozóhelye volt"], correctOptionIndex: 1 },
  { id: "mcq_138", category: "hungary_pre_1848", prompt: "Melyik nagy beruházás kötődik közvetlenül Széchenyihez?", options: ["Visegrádi fellegvár helyreállítása", "Lánchíd építése", "Első magyar vasútvonal megnyitása", "A Parlament felépítése"], correctOptionIndex: 1 },
  { id: "mcq_139", category: "hungary_pre_1848", prompt: "Mely folyók szabályozásának és vízi közlekedésének támogatása szerepelt Széchenyi programjában?", options: ["Duna és Tisza", "Tisza és Dráva", "Duna és Rába", "Maros és Körös"], correctOptionIndex: 0 },
  { id: "mcq_140", category: "hungary_pre_1848", prompt: "Melyik állítás jellemzi leginkább Kossuth Lajos programját?", options: ["A reformokat csak az elit jóindulatától várta", "A gyorsabb politikai-jogi reformokat hangsúlyozta", "Ellenezte a népképviseletet", "A latin államnyelv fenntartását támogatta"], correctOptionIndex: 1 },
  { id: "mcq_141", category: "hungary_pre_1848", prompt: "Melyik lap szerkesztőjeként épített Kossuth országos politikai nyilvánosságot?", options: ["Hitel", "Pesti Hírlap", "Világ", "Tudományos Gyűjtemény"], correctOptionIndex: 1 },
  { id: "mcq_142", category: "hungary_pre_1848", prompt: "Mi volt az Országos Védegylet célja?", options: ["A magyar nemesség adómentességének megőrzése", "A hazai ipar és kereskedelem támogatása", "Az udvarral való megegyezés elősegítése", "A jobbágyok katonai kiképzése"], correctOptionIndex: 1 },
  { id: "mcq_143", category: "hungary_pre_1848", prompt: "Kossuth szerint mi kellett a reformok sikeréhez?", options: ["A nyilvánosság és a társadalmi támogatás", "A latin nyelv megtartása", "A politikai viták elkerülése", "A reformok teljes titokban tartása"], correctOptionIndex: 0 },
  { id: "mcq_144", category: "hungary_pre_1848", prompt: "Melyik követelés NEM tartozott Kossuth programjához?", options: ["Közteherviselés", "Jogegyenlőség", "Népképviselet", "A rendi különállás megerősítése"], correctOptionIndex: 3 },
  { id: "mcq_145", category: "hungary_pre_1848", prompt: "Mi volt a Széchenyi-Kossuth-vita lényege?", options: ["Hogy kell-e egyáltalán reform", "Hogy ki legyen a király", "Hogy milyen ütemben és eszközökkel menjen végbe az átalakulás", "Hogy Magyarország maradjon-e a Monarchiában"], correctOptionIndex: 2 },
  { id: "mcq_146", category: "hungary_pre_1848", prompt: "Melyik állítás felel meg inkább Széchenyi álláspontjának?", options: ["A sajtó és a tömeges mozgósítás a legfontosabb", "Kerülni kell a nyílt összeütközést az udvarral", "Azonnali teljes politikai fordulat szükséges", "A hazai ipar védelme minden másnál fontosabb"], correctOptionIndex: 1 },
  { id: "mcq_147", category: "hungary_pre_1848", prompt: "Melyik állítás felel meg inkább Kossuth álláspontjának?", options: ["A vezető réteg önreformja elegendő", "A konfliktusokat mindenáron kerülni kell", "Széles társadalmi támogatás és politikai szervezés nélkül nincs áttörés", "A gazdasági modernizáció megelőzi a politikai reformot"], correctOptionIndex: 2 },
  { id: "mcq_148", category: "hungary_pre_1848", prompt: "Ki vált a vita végére a reformtábor vezető alakjává?", options: ["Széchenyi István", "Kölcsey Ferenc", "Wesselényi Miklós", "Kossuth Lajos"], correctOptionIndex: 3 },
  { id: "mcq_149", category: "hungary_pre_1848", prompt: "Ki vezette a Rákóczi-szabadságharcot?", options: ["I. Lipót", "II. Rákóczi Ferenc", "Pálffy János", "Károlyi Sándor"], correctOptionIndex: 1 },
  { id: "mcq_150", category: "hungary_pre_1848", prompt: "Melyik fogalom jelöli a Habsburgok ellen harcoló felkelőket?", options: ["Labanc", "Kuruc", "Hajdú", "Vitéz"], correctOptionIndex: 1 },
  { id: "mcq_151", category: "hungary_pre_1848", prompt: "Melyik fogalom jelöli a császárhoz hű oldalt?", options: ["Kuruc", "Várjobbágy", "Labanc", "Hajdú"], correctOptionIndex: 2 },
  { id: "mcq_152", category: "hungary_pre_1848", prompt: "Mi volt a breznai kiáltvány?", options: ["A szatmári béke egyik pontja", "Rákóczi hadba hívó felhívása", "A trónfosztásról szóló döntés", "A karlócai béke latin szövege"], correctOptionIndex: 1 },
  { id: "mcq_153", category: "hungary_pre_1848", prompt: "Mi volt a gyulaji pátens célja?", options: ["A protestánsok üldözése", "A nemesek megnyerése azzal, hogy tiltották a nemesek elleni támadásokat", "A rézpénz bevezetése", "A jobbágyok röghöz kötése"], correctOptionIndex: 1 },
  { id: "mcq_154", category: "hungary_pre_1848", prompt: "Mi volt a vetési pátens célja?", options: ["A katonáskodó jobbágyok terheinek könnyítése", "A nemesség adómentességének növelése", "A trónfosztás kimondása", "A szerbek betelepítése"], correctOptionIndex: 0 },
  { id: "mcq_155", category: "hungary_pre_1848", prompt: "Mit neveztek libertásnak?", options: ["Rákóczi rézpénzét", "A kuruc hadsereg zászlaját", "A szécsényi országgyűlés helyszínét", "A labancok gúnynevét"], correctOptionIndex: 0 },
  { id: "mcq_156", category: "hungary_pre_1848", prompt: "Melyik tényező segítette közvetlenül a felkelés kirobbanását?", options: ["Az oszmánok magyarországi előretörése", "A spanyol örökösödési háború miatt meggyengült császári jelenlét", "A francia hadsereg magyarországi bevonulása", "A pápa felszólítása"], correctOptionIndex: 1 },
  { id: "mcq_157", category: "hungary_pre_1848", prompt: "Melyik területet szerezték meg gyorsan a kurucok 1703-ban?", options: ["Dalmáciát", "A Tiszántúlt", "Stájerországot", "Morvaországot"], correctOptionIndex: 1 },
  { id: "mcq_158", category: "hungary_pre_1848", prompt: "Ki vezette a Dunántúlon a sikeres kuruc hadjáratokat 1705 végén?", options: ["Bottyán János", "Bercsényi Miklós", "Pálffy János", "Esze Tamás"], correctOptionIndex: 0 },
  { id: "mcq_159", category: "hungary_pre_1848", prompt: "Mi történt a szécsényi országgyűlésen?", options: ["Megkötötték a szatmári békét", "Rákóczit vezérlő fejedelemmé választották", "Kimondták a Habsburg-ház trónfosztását", "Létrehozták a katonai határőrvidéket"], correctOptionIndex: 1 },
  { id: "mcq_160", category: "hungary_pre_1848", prompt: "Hol mondták ki a Habsburg-ház trónfosztását?", options: ["Pozsonyban", "Nagykárolyban", "Ónodon", "Trencsénben"], correctOptionIndex: 2 },
  { id: "mcq_161", category: "hungary_pre_1848", prompt: "Melyik csata jelentett katonai töréspontot a szabadságharcban?", options: ["Mohács", "Trencsén", "Muhi", "Nándorfehérvár"], correctOptionIndex: 1 },
  { id: "mcq_162", category: "hungary_pre_1848", prompt: "Ki vezette a császári tárgyalásokat a szabadságharc végén?", options: ["Pálffy János", "Nagy Péter", "XIV. Lajos", "Sennyey István"], correctOptionIndex: 0 },
  { id: "mcq_163", category: "hungary_pre_1848", prompt: "Kire bízta Rákóczi a főparancsnokságot a végjátékban?", options: ["Bercsényi Miklósra", "Bottyán Jánosra", "Károlyi Sándorra", "Esze Tamásra"], correctOptionIndex: 2 },
  { id: "mcq_164", category: "hungary_pre_1848", prompt: "Hová került végül Rákóczi emigrációjának központja?", options: ["Bécs", "Rodostó", "Párizs", "Róma"], correctOptionIndex: 1 },
  { id: "mcq_165", category: "hungary_pre_1848", prompt: "Melyik béke zárta le a szabadságharcot?", options: ["Nikolsburgi béke", "Szatmári béke", "Bécsi béke", "Linzi béke"], correctOptionIndex: 1 },
  { id: "mcq_166", category: "hungary_pre_1848", prompt: "Mi NEM szerepelt a szatmári béke eredményei között?", options: ["Általános amnesztia", "A rendi jogok tiszteletben tartásának ígérete", "Önálló magyar hadsereg létrehozása", "Az országgyűlés összehívásának ígérete"], correctOptionIndex: 2 },
  { id: "mcq_167", category: "hungary_pre_1848", prompt: "Miért volt szükség Magyarország újranépesítésére a 18. század elején?", options: ["Mert túl gyors volt az iparosodás", "Mert az előző másfél évszázad háborúi és járványai erősen lecsökkentették a népességet", "Mert betiltották a belső vándorlást", "Mert a nemesség teljesen kivándorolt"], correctOptionIndex: 1 },
  { id: "mcq_168", category: "hungary_pre_1848", prompt: "Mely területek ritkultak meg leginkább?", options: ["A Felvidék és Erdély északi része", "A volt hódoltsági területek, főleg az ország közepe és déli részei", "Csak a Dunántúl nyugati része", "Kizárólag a Székelyföld"], correctOptionIndex: 1 },
  { id: "mcq_169", category: "hungary_pre_1848", prompt: "Mivel segítették a földbirtokosok és az állam a telepesek letelepedését?", options: ["Kizárólag katonai szolgálattal", "Földdel, adókedvezménnyel és átmeneti mentességekkel", "A nemesi cím automatikus adományozásával", "A tized eltörlésével egész Magyarországon"], correctOptionIndex: 1 },
  { id: "mcq_170", category: "hungary_pre_1848", prompt: "Kiket neveztek gyakran összefoglalóan sváboknak?", options: ["A betelepülő szerbeket", "A betelepülő románokat", "A betelepülő német telepeseket", "A ruszinokat"], correctOptionIndex: 2 },
  { id: "mcq_171", category: "hungary_pre_1848", prompt: "Hol telepedtek meg nagy számban a románok?", options: ["Erdélyben és a Temesközben", "Kizárólag a Felvidéken", "A Bakonyban és a Vértesben", "Sopron és Pozsony környékén"], correctOptionIndex: 0 },
  { id: "mcq_172", category: "hungary_pre_1848", prompt: "Mi lett az újranépesülés egyik hosszabb távú következménye?", options: ["Megszűnt minden nemzetiségi különbség", "Az ország teljesen egynyelvűvé vált", "A 19. században nemzetiségi feszültségek alakultak ki", "Megszűnt a mezőgazdaság jelentősége"], correctOptionIndex: 2 },
  { id: "mcq_173", category: "hungary_pre_1848", prompt: "Melyik háború kitörése kapcsolódott közvetlenül Mária Terézia trónra lépéséhez?", options: ["A spanyol örökösödési háború", "Az osztrák örökösödési háború", "A hétéves háború", "A harmincéves háború"], correctOptionIndex: 1 },
  { id: "mcq_174", category: "hungary_pre_1848", prompt: "Melyik tartományt veszítette el Mária Terézia uralkodása elején?", options: ["Morvaországot", "Galíciát", "Sziléziát", "Erdélyt"], correctOptionIndex: 2 },
  { id: "mcq_175", category: "hungary_pre_1848", prompt: "Mi volt a kettős vámrendszer fő gazdaságpolitikai jellege?", options: ["Liberális szabadkereskedelem", "Merkantilista védelem", "Szocialista tervgazdaság", "Fiziokrata rendszer"], correctOptionIndex: 1 },
  { id: "mcq_176", category: "hungary_pre_1848", prompt: "A belső vámhatár elsősorban melyik gazdasági szerep felé tolta Magyarországot?", options: ["Ipari nagyhatalom", "Tengerhajózási központ", "Élelmiszer- és nyersanyag-beszállító", "Bankközpont"], correctOptionIndex: 2 },
  { id: "mcq_177", category: "hungary_pre_1848", prompt: "Miért tett Mária Terézia az uralkodás elején gesztusokat a magyar rendek felé?", options: ["Mert le akart mondani a trónról", "Mert szüksége volt a támogatásukra", "Mert fel akarta számolni a nemességet", "Mert be akarta vezetni a köztársaságot"], correctOptionIndex: 1 },
  { id: "mcq_178", category: "hungary_pre_1848", prompt: "Mit korlátozott az úrbéri rendelet a földesurakkal szemben?", options: ["A nemesek öröklési jogát", "A városok önkormányzatát", "A földesúri önkényt és a jobbágyterheket", "A céhek működését"], correctOptionIndex: 2 },
  { id: "mcq_179", category: "hungary_pre_1848", prompt: "Az úrbéri rendelet szerint egy egész jobbágytelek után évente legfeljebb mennyi igásrobotot lehetett követelni?", options: ["26 napot", "52 napot", "104 napot", "156 napot"], correctOptionIndex: 1 },
  { id: "mcq_180", category: "hungary_pre_1848", prompt: "Mit jelentett a 104 gyalognap az úrbéri szabályozásban?", options: ["A maximális gyalogrobotot", "Az éves katonai szolgálatot", "A földesúri pénzadót", "A robot alóli mentességet"], correctOptionIndex: 0 },
  { id: "mcq_181", category: "hungary_pre_1848", prompt: "Mit jelentett a Ratio Educationis?", options: ["Az adórendszer egységesítését", "Az iskolarendszer állami keretezését", "Az úrbéri viszonyok eltörlését", "A céhek felszámolását"], correctOptionIndex: 1 },
  { id: "mcq_182", category: "hungary_pre_1848", prompt: "Mi történt 1773-ban Mária Terézia alatt?", options: ["Bevezették a német nyelvet", "Kiadták a türelmi rendeletet", "Feloszlatták a jezsuita rendet", "Megszüntették a vármegyéket"], correctOptionIndex: 2 },
  { id: "mcq_183", category: "hungary_pre_1848", prompt: "Miért nevezték II. Józsefet „kalapos királynak”?", options: ["Mindig katonai sisakot viselt", "Nem koronáztatta meg magát a Szent Koronával", "Betiltotta a koronázásokat", "A papság ellenfele volt"], correctOptionIndex: 1 },
  { id: "mcq_184", category: "hungary_pre_1848", prompt: "Mi jellemezte leginkább II. József uralkodási módszerét?", options: ["Lassú, rendi egyeztetésre épülő reformok", "Rendeletekkel végrehajtott, központosító reformpolitika", "Teljes passzivitás", "Csak külpolitikai döntések"], correctOptionIndex: 1 },
  { id: "mcq_185", category: "hungary_pre_1848", prompt: "Melyik rendeletet hagyta érvényben II. József a rendeletek többségének visszavonásakor?", options: ["Nyelvrendelet", "Türelmi rendelet", "Kerületi rendszer", "Koporsórendelet"], correctOptionIndex: 1 },
  { id: "mcq_186", category: "hungary_pre_1848", prompt: "Kik vallásgyakorlatát tágította a türelmi rendelet? (II. József)", options: ["Csak a katolikusokét", "A protestánsokét és a görögkeletiekét", "Csak a zsidókét", "Kizárólag a nemességét"], correctOptionIndex: 1 },
  { id: "mcq_187", category: "hungary_pre_1848", prompt: "Mit akart elérni II. József az 1784-es nyelvrendelettel?", options: ["A magyar nyelv kizárólagosságát", "A latin visszaállítását", "A német hivatali használatának kiterjesztését", "A többnyelvűség teljes megszüntetését"], correctOptionIndex: 2 },
  { id: "mcq_188", category: "hungary_pre_1848", prompt: "Mi váltotta fel 1785-ben a vármegyei rendszert?", options: ["A szabad királyi városok tanácsa", "A kerületi rendszer", "A nemesi várőrség", "A kamarai igazgatás"], correctOptionIndex: 1 },
  { id: "mcq_189", category: "hungary_pre_1848", prompt: "Mi volt a Josephina egyik fontos újítása?", options: ["Bevezette a kínvallatást", "Megsokszorozta a halálbüntetéseket", "Korlátozta a halálbüntetést és megszüntette a kínvallatást", "Eltörölte az összes börtönbüntetést"], correctOptionIndex: 2 },
  { id: "mcq_190", category: "hungary_pre_1848", prompt: "Mit szüntetett meg II. József jobbágyrendelete a személyi jogállásban?", options: ["A nemesi adómentességet", "A röghöz kötöttséget", "A földesúri birtoklást", "A tizedet"], correctOptionIndex: 1 },
  { id: "mcq_191", category: "hungary_pre_1848", prompt: "Melyik intézkedés vált különösen népszerűtlenné a mindennapi életben II. József?", options: ["A színházak támogatása", "A körmenetek és a koporsó betiltása", "A vámok csökkentése", "A városok kiváltságainak növelése"], correctOptionIndex: 1 },
  { id: "mcq_192", category: "hungary_pre_1848", prompt: "Milyen államot épített Mária Terézia reformpolitikája?", options: ["Felvilágosult demokráciát", "Hatékonyabb abszolutisztikus államot", "Szövetségi köztársaságot", "Rendi parlamentarizmust"], correctOptionIndex: 1 }
,
  { id: "mcq_193", category: "hungary_pre_1848", prompt: "Hol gyűltek össze március 15-én a márciusi ifjak a nap kezdetén?", options: ["A Landerer nyomdánál", "Pilvax kávéházban", "Országházban", "Helytartótanácsnál"], correctOptionIndex: 1 },
  { id: "mcq_194", category: "hungary_pre_1848", prompt: "Melyik nyomdában nyomtatták ki cenzúra nélkül a Nemzeti dalt és a 12 pontot?", options: ["Athenaeum", "Landerer és Heckenast", "Egyetemi Nyomda", "Trattner-Károlyi"], correctOptionIndex: 1 },
  { id: "mcq_195", category: "hungary_pre_1848", prompt: "Kit szabadított ki a pesti tömeg 1848. március 15-én?", options: ["Kossuth Lajost", "Batthyány Lajost", "Táncsics Mihályt", "Deák Ferencet"], correctOptionIndex: 2 },
  { id: "mcq_196", category: "hungary_pre_1848", prompt: "Ki lett az első felelős magyar kormány miniszterelnöke?", options: ["Szemere Bertalan", "Batthyány Lajos", "Kossuth Lajos", "Mészáros Lázár"], correctOptionIndex: 1 },
  { id: "mcq_197", category: "hungary_pre_1848", prompt: "Melyik követelés NEM szerepelt a 12 pontban?", options: ["Sajtószabadság", "Unió Erdéllyel", "Kötelező általános választójog", "Felelős minisztérium"], correctOptionIndex: 2 },
  { id: "mcq_198", category: "hungary_pre_1848", prompt: "Mit jelentett az úrbéri viszonyok megszüntetése?", options: ["A céhek eltörlését", "A jobbágyi szolgáltatások eltörlését", "A nemesség eltörlését", "A városok kiváltságainak megszüntetését"], correctOptionIndex: 1 },
  { id: "mcq_199", category: "hungary_pre_1848", prompt: "Melyik állítás igaz az áprilisi törvényekre?", options: ["Teljes függetlenséget teremtettek Ausztriától", "Általános választójogot vezettek be", "A polgári átalakulás jogi alapjait teremtették meg", "Megszüntették a magántulajdont"], correctOptionIndex: 2 },
  { id: "mcq_200", category: "hungary_pre_1848", prompt: "Ki volt a magyar kormány hadügyminisztere 1848-ban?", options: ["Klapka György", "Görgei Artúr", "Mészáros Lázár", "Damjanich János"], correctOptionIndex: 2 },
  { id: "mcq_201", category: "hungary_pre_1848", prompt: "Melyik hadsereg szerveződött önálló, magyar irányítású reguláris erőként?", options: ["Nemzetőrség", "Császári sereg", "Honvédsereg", "Határőrvidék"], correctOptionIndex: 2 },
  { id: "mcq_202", category: "hungary_pre_1848", prompt: "Mikor történt a pákozdi csata?", options: ["1848. szeptember 29.", "1848. október 6.", "1849. április 6.", "1849. augusztus 13."], correctOptionIndex: 0 },
  { id: "mcq_203", category: "hungary_pre_1848", prompt: "Melyik ütközet jelentett vereséget a magyar seregnek 1848. október 30-án?", options: ["Isaszeg", "Schwechat", "Pákozd", "Temesvár"], correctOptionIndex: 1 },
  { id: "mcq_204", category: "hungary_pre_1848", prompt: "Melyik csata volt a tavaszi hadjárat döntő magyar győzelme 1849. április 6-án?", options: ["Tápióbicske", "Komárom", "Isaszeg", "Nagysalló"], correctOptionIndex: 2 },
  { id: "mcq_205", category: "hungary_pre_1848", prompt: "Mi történt 1849. április 14-én Debrecenben?", options: ["Megalakult az első felelős kormány", "Kimondták a trónfosztást", "Kiszabadították Táncsicsot", "Elesett Buda"], correctOptionIndex: 1 },
  { id: "mcq_206", category: "hungary_pre_1848", prompt: "Kit választottak kormányzó-elnökké a függetlenségi nyilatkozat után?", options: ["Görgei Artúrt", "Deák Ferencet", "Kossuth Lajost", "Batthyány Lajost"], correctOptionIndex: 2 },
  { id: "mcq_207", category: "hungary_pre_1848", prompt: "Melyik hatalom avatkozott be döntően a szabadságharc leverésébe 1849 nyarán?", options: ["Poroszország", "Franciaország", "Oroszország", "Anglia"], correctOptionIndex: 2 },
  { id: "mcq_208", category: "hungary_pre_1848", prompt: "Ki volt az orosz intervenció egyik fő parancsnoka?", options: ["Haynau", "Paszkevics Iván", "Jelačić", "Radetzky"], correctOptionIndex: 1 },
  { id: "mcq_209", category: "hungary_pre_1848", prompt: "Melyik vereség után szűkült be végzetesen a magyar főerők mozgástere?", options: ["Schwechat", "Pákozd", "Temesvár", "Hatvan"], correctOptionIndex: 2 },
  { id: "mcq_210", category: "hungary_pre_1848", prompt: "Hol történt a fegyverletétel 1849. augusztus 13-án?", options: ["Aradon", "Világosnál", "Temesváron", "Komáromnál"], correctOptionIndex: 1 },
  { id: "mcq_211", category: "hungary_pre_1848", prompt: "Kihez kötik a megtorlások legismertebb alakját a szabadságharc leverése után?", options: ["Ferenc József", "Haynau Julius", "Jelačić Josip", "Metternich"], correctOptionIndex: 1 },
  { id: "mcq_212", category: "hungary_pre_1848", prompt: "Mikor végezték ki Batthyány Lajost és a 13 aradi vértanút?", options: ["1848. március 15.", "1849. április 14.", "1849. október 6.", "1849. augusztus 13."], correctOptionIndex: 2 },
  { id: "mcq_213", category: "hungary_pre_1848", prompt: "Mi jellemezte a neoabszolutizmus időszakát Magyarországon?", options: ["Erős vármegyei önkormányzat", "Teljes sajtószabadság", "Erős központi irányítás és rendőri ellenőrzés", "Független magyar hadügy"], correctOptionIndex: 2 },


  { id: "mcq_1055", category: "hungary_post_1848", prompt: "Mi jellemezte leginkább a szabadságharc leverése utáni neoabszolutista rendszert Magyarországon?", options: ["Széles körű magyar önkormányzatiság", "Bécsből irányított központosítás és rendeleti kormányzás", "Teljes magyar parlamenti önállóság", "Szövetségi rendszerű tartományi önrendelkezés"], correctOptionIndex: 1 },
  { id: "mcq_1056", category: "hungary_post_1848", prompt: "Ki volt a passzív ellenállás legismertebb képviselője?", options: ["Andrássy Gyula", "Teleki László", "Deák Ferenc", "Tisza Kálmán"], correctOptionIndex: 2 },
  { id: "mcq_1057", category: "hungary_post_1848", prompt: "Melyik esemény gyengítette meg döntően Ausztriát 1866-ban?", options: ["A krími háború", "A porosz–osztrák háború", "A francia–porosz háború", "Az orosz–török háború"], correctOptionIndex: 1 },
  { id: "mcq_1058", category: "hungary_post_1848", prompt: "Mi volt az Októberi Diploma lényege?", options: ["Teljes magyar függetlenséget adott", "Alkotmányosabbnak szánt engedményt tett, de a császári kontrollt fenntartotta", "Megszüntette a közös uralkodót", "Föloszlatta az osztrák kormányt"], correctOptionIndex: 1 },
  { id: "mcq_1059", category: "hungary_post_1848", prompt: "Miben volt centralistább a Februári Pátens?", options: ["A magyar országgyűlésre bízta a hadügyet", "Bécs vezető szerepét erősítette", "Megszüntette a közös külügyet", "Bevezette az általános választójogot"], correctOptionIndex: 1 },
  { id: "mcq_1060", category: "hungary_post_1848", prompt: "Kihez kötődött a felirati politika?", options: ["Teleki Lászlóhoz", "Kossuth Lajoshoz", "Deák Ferenchez", "Baross Gáborhoz"], correctOptionIndex: 2 },
  { id: "mcq_1061", category: "hungary_post_1848", prompt: "Mi jellemezte a határozati politikát?", options: ["Udvarias tárgyalási ajánlat a királynak", "A bécsi rendszer teljes elfogadása", "Az országgyűlés saját döntéssel utasította el a tárgyalást", "A közös ügyek azonnali elfogadása"], correctOptionIndex: 2 },
  { id: "mcq_1062", category: "hungary_post_1848", prompt: "Mi könnyítette meg Deák kompromisszumos irányvonalának győzelmét 1861-ben?", options: ["Ferenc József lemondása", "Teleki László halála", "Az általános választójog bevezetése", "A magyar hadsereg győzelme"], correctOptionIndex: 1 },
  { id: "mcq_1063", category: "hungary_post_1848", prompt: "Mi volt Deák Ferenc Húsvéti cikkének kulcsállítása?", options: ["Magyarországnak azonnal ki kell lépnie a birodalomból", "A Pragmatica Sanctio alapján lehetséges a megegyezés és a közös ügyek rendezése", "A magyar félnek el kell fogadnia a teljes bécsi központosítást", "A közös uralkodó intézményét meg kell szüntetni"], correctOptionIndex: 1 },
  { id: "mcq_1064", category: "hungary_post_1848", prompt: "Mi lett az 1867-es kiegyezés államszerkezeti lényege?", options: ["Egyetlen központosított császárság jött létre", "Két külön állam működött közös uralkodóval", "Három egyenjogú állam szövetsége alakult ki", "Magyarország perszonálunió nélkül függetlenné vált"], correctOptionIndex: 1 },
  { id: "mcq_1065", category: "hungary_post_1848", prompt: "Mely ügyek tartoztak a közös ügyek közé?", options: ["Belügy, igazságügy, oktatás", "Külügy, hadügy és ezek pénzügye", "Mezőgazdaság, ipar és kereskedelem", "Adórendszer, közoktatás és közlekedés"], correctOptionIndex: 1 },
  { id: "mcq_1066", category: "hungary_post_1848", prompt: "Miért lett közös a hadügy?", options: ["Mert a magyar fél ezt külön kérte belpolitikai okból", "Mert a hadsereg egységes stratégia és mozgósítás nélkül nem működik hatékonyan", "Mert a közös hadügy olcsóbb volt a mezőgazdaságnál", "Mert a hadsereg irányítása teljesen magyar kézbe került"], correctOptionIndex: 1 },
  { id: "mcq_1067", category: "hungary_post_1848", prompt: "Mi volt a közös hadsereg vezényleti és szolgálati nyelve?", options: ["Magyar", "Latin", "Német", "Cseh"], correctOptionIndex: 2 },
  { id: "mcq_1068", category: "hungary_post_1848", prompt: "Mi biztosította a közös ügyek ellenőrzését?", options: ["A közös parlament", "A delegációk rendszere", "A magyar vármegyék", "A főrendiház kizárólagos joga"], correctOptionIndex: 1 },
  { id: "mcq_1069", category: "hungary_post_1848", prompt: "Hány főt küldött külön-külön a két törvényhozás a delegációkba?", options: ["30 főt", "40 főt", "60 főt", "100 főt"], correctOptionIndex: 2 },
  { id: "mcq_1070", category: "hungary_post_1848", prompt: "Ki lett az első magyar miniszterelnök a kiegyezés után?", options: ["Tisza Kálmán", "Andrássy Gyula", "Deák Ferenc", "Baross Gábor"], correctOptionIndex: 1 },
  { id: "mcq_1071", category: "hungary_post_1848", prompt: "Melyik állítás igaz a pénzügyi kiegyezésre?", options: ["A teljes állami pénzügy közössé vált", "Magyarország kezdetben a közös kiadások 30%-át vállalta", "Nem kellett újratárgyalni a kvótát", "A kvóta kezdetben 50–50% volt"], correctOptionIndex: 1 },
  { id: "mcq_1072", category: "hungary_post_1848", prompt: "Mi volt Tisza Kálmán korszakának egyik legfontosabb gazdaságpolitikai célja?", options: ["A vasúthálózat leépítése", "Az állam működőképessé tétele és a beruházásbarát környezet kialakítása", "A közös piac felszámolása", "A nemzetközi kereskedelem visszaszorítása"], correctOptionIndex: 1 },
  { id: "mcq_1073", category: "hungary_post_1848", prompt: "Miért volt fontos Baross Gábor 1889-es zónatarifája?", options: ["Megdrágította a távolsági közlekedést", "Olcsóbbá és tömegessé tette a távolsági közlekedést", "Megszüntette a vasúti áruszállítást", "Csak katonai célokat szolgált"], correctOptionIndex: 1 },
  { id: "mcq_1074", category: "hungary_post_1848", prompt: "Miért vált világszintűvé a budapesti malomipar?", options: ["Mert kizárólag nyers gabonát exportált", "Mert magasabb minőségű lisztet állított elő és exportált", "Mert teljesen független volt a közlekedéstől", "Mert csak a magyar belső piacra termelt"], correctOptionIndex: 1 },
  { id: "mcq_1075", category: "hungary_post_1848", prompt: "Mi jellemezte az Osztrák–Magyar Bank dualizált működését?", options: ["Egyetlen központja Prágában volt", "Két központtal, Bécsben és Budapesten működött", "Kizárólag magyar irányítás alatt állt", "Nem bocsáthatott ki hitelt"], correctOptionIndex: 1 },
  { id: "mcq_1076", category: "hungary_post_1848", prompt: "Miért volt fontos az 1892-ben bevezetett aranyalapú korona?", options: ["Megszüntette a külkereskedelmet", "Bizalmat és kiszámíthatóságot adott a kereskedelemben és hitelezésben", "Lehetővé tette a közös hadügy megszüntetését", "Csak a mezőgazdasági árakat szabályozta"], correctOptionIndex: 1 },
  { id: "mcq_1077", category: "hungary_post_1848", prompt: "Kihez köthető a budapesti telefonközpont?", options: ["Puskás Tivadarhoz", "Bánki Donáthoz", "Csonka Jánoshoz", "Zipernowsky Károlyhoz"], correctOptionIndex: 0 },
  { id: "mcq_1078", category: "hungary_post_1848", prompt: "Kikhez kötődik a porlasztó (karburátor)?", options: ["Deák Ferenc és Andrássy Gyula", "Bánki Donát és Csonka János", "Tisza Kálmán és Baross Gábor", "Puskás Tivadar és Ganz Ábrahám"], correctOptionIndex: 1 },
  { id: "mcq_1079", category: "hungary_post_1848", prompt: "Miért vált az első világháborúban a védelem erősebbé a támadásnál?", options: ["Mert a támadó félnek kevesebb katonája volt", "Mert a géppuska, a gyors tüzérség, a lövészárok és a szögesdrót a védekező felet segítette", "Mert a támadó felek nem használtak tüzérséget", "Mert a háború kizárólag tengeren zajlott"], correctOptionIndex: 1 },
  { id: "mcq_1080", category: "hungary_post_1848", prompt: "Mi jellemezte leginkább az első világháború hadseregeit?", options: ["Kis létszámú hivatásos seregek", "Tömeghadseregek és tömeges mozgósítás", "Csak önkéntes katonákból álló hadseregek", "Főleg zsoldos hadseregek"], correctOptionIndex: 1 },
  { id: "mcq_1081", category: "hungary_post_1848", prompt: "Miért merevedett állóháborúvá a nyugati front?", options: ["Mert a felek nem akartak támadni", "Mert a védelem tűzereje és a műszaki akadályok megakasztották az áttörést", "Mert elfogyott a lőszer", "Mert a hadviselő felek békét kötöttek"], correctOptionIndex: 1 },
  { id: "mcq_1082", category: "hungary_post_1848", prompt: "Miért vált a hátország sorsa döntő jelentőségűvé?", options: ["Mert a frontokon megszűnt a harc", "Mert a győzelem termelési és ellátási versennyé vált", "Mert a hadseregek önellátóvá váltak", "Mert csak a propaganda döntött a háborúról"], correctOptionIndex: 1 },
  { id: "mcq_1083", category: "hungary_post_1848", prompt: "Mi volt a mérges gáz legfontosabb hatása?", options: ["Gyorsan eldöntötte a háborút", "Új dimenziót adott a tömeges sebesüléseknek és a pszichológiai terrornak", "Megszüntette a lövészárokháborút", "Feleslegessé tette a tüzérséget"], correctOptionIndex: 1 },
  { id: "mcq_1084", category: "hungary_post_1848", prompt: "Mi volt a harckocsi jelentősége?", options: ["Főleg tengeri hadviselésre használták", "Elvben megoldást adott a szögesdrót–árok–géppuska problémára", "Kizárólag felderítésre használták", "A háború elején már teljesen kiforrott fegyver volt"], correctOptionIndex: 1 },
  { id: "mcq_1085", category: "hungary_post_1848", prompt: "Miért vált fontossá a tengeralattjáró?", options: ["Mert hegyi hadviselésre is alkalmas volt", "Mert a tengeri utánpótlást támadta", "Mert kiváltotta a csatahajókat mindenütt", "Mert kizárólag partvédelemre használták"], correctOptionIndex: 1 },
  { id: "mcq_1086", category: "hungary_post_1848", prompt: "Miért tartotta Tisza István kockázatosnak a Szerbia elleni háborút?", options: ["Mert tartott egy nagyhatalmi háborúvá válástól és a nemzetiségi következményektől", "Mert Szerbiát erősebbnek tartotta Németországnál", "Mert Magyarország hadserege nem létezett", "Mert azonnali olasz támadástól félt"], correctOptionIndex: 0 },
  { id: "mcq_1087", category: "hungary_post_1848", prompt: "Milyen feltételhez kötötte Tisza István a beleegyezését?", options: ["Magyarország külön hadsereget kapjon", "Győzelem esetén ne kebelezzenek be egyszerűen újabb szerb területeket", "Azonnal vezessék be az általános választójogot", "A Monarchia lépjen ki a német szövetségből"], correctOptionIndex: 1 },
  { id: "mcq_1088", category: "hungary_post_1848", prompt: "Miért volt fontos, hogy a Monarchia mozgósított emberanyagának jelentős része magyar állampolgár volt?", options: ["Mert így Magyarország önállóan kiléphetett a háborúból", "Mert ez erősítette a későbbi magyar belpolitikai feszültségeket", "Mert így a magyar fél irányította a közös hadsereget", "Mert emiatt a Monarchia nem szenvedett veszteségeket"], correctOptionIndex: 1 },
  { id: "mcq_1089", category: "hungary_post_1848", prompt: "Melyik keleti fronti esemény vetette vissza az oroszokat jelentősen 1915-ben?", options: ["Bruszilov-offenzíva", "Marne", "Gorlice–Tarnów", "Vittorio Veneto"], correctOptionIndex: 2 },
  { id: "mcq_1090", category: "hungary_post_1848", prompt: "Miért volt különösen súlyos a Bruszilov-offenzíva a Monarchia számára?", options: ["Mert Olaszországot kiszorította a háborúból", "Mert reálisan felvetette a Monarchia összeomlásának veszélyét", "Mert elfoglalta Berlint", "Mert a Balkánon zajlott"], correctOptionIndex: 1 },
  { id: "mcq_1091", category: "hungary_post_1848", prompt: "Mi jellemezte az olasz frontot?", options: ["Gyors lovassági hadműveletek sora", "Hegyvidéki, állóháborús felőrlés", "Kizárólag tengeri csaták", "Csak román egységek harcoltak ott"], correctOptionIndex: 1 },
  { id: "mcq_1092", category: "hungary_post_1848", prompt: "Melyik 1917-es esemény számított nagy sikernek az olasz fronton?", options: ["Caporetto", "Verdun", "Gallipoli", "Szaloniki áttörés"], correctOptionIndex: 0 },
  { id: "mcq_1093", category: "hungary_post_1848", prompt: "Mi volt a román hadbalépés fő célja?", options: ["Dalmácia megszerzése", "Erdély megszerzése", "Szerbia megsegítése", "Oroszország megtámadása"], correctOptionIndex: 1 },
  { id: "mcq_1094", category: "hungary_post_1848", prompt: "Miért számított a román betörés a legközvetlenebb területi fenyegetésnek?", options: ["Mert Bécset veszélyeztette", "Mert a magyar korona országainak belsejébe nyúlt", "Mert az Adriát zárta el", "Mert Németországot támadta"], correctOptionIndex: 1 },
  { id: "mcq_1095", category: "hungary_post_1848", prompt: "Mi alapozta meg Horthy Miklós háborús hírnevét?", options: ["A Marne-nál vezetett támadás", "Az otrantói zár elleni 1917-es rajtaütés", "A Bruszilov-offenzíva visszaverése", "Az isonzói áttörés olasz oldalon"], correctOptionIndex: 1 },
  { id: "mcq_1096", category: "hungary_post_1848", prompt: "Mi változott Ferenc József halála után IV. Károly uralkodásával?", options: ["A Monarchia azonnal kilépett a háborúból", "Erősebb lett a béketapogatózás és a reformszándék", "Megszűnt a magyar országgyűlés", "A német szövetség azonnal felbomlott"], correctOptionIndex: 1 },
  { id: "mcq_1097", category: "hungary_post_1848", prompt: "Mi indította el közvetlenül a Monarchia végső katonai-politikai szétesését 1918 őszén?", options: ["A Marne-i vereség", "A Vardar-offenzíva és Bulgária fegyverszünete", "A román hadbalépés", "A szarajevói merénylet"], correctOptionIndex: 1 },
  { id: "mcq_1098", category: "hungary_post_1848", prompt: "Miért nem volt 1918 őszén reális a történelmi Magyarország egyben tartása pusztán budapesti politikai manőverekkel?", options: ["Mert Budapest nem volt főváros", "Mert a katonai vereség kilátása, a tömeges dezorganizáció és a nemzetiségi szerveződés együtt lépett fel", "Mert a magyar hadsereg győzelmet aratott", "Mert az antant elismerte a magyar határokat"], correctOptionIndex: 1 },
  { id: "mcq_1099", category: "hungary_post_1848", prompt: "Mi volt a Magyar Nemzeti Tanács fő politikai célja?", options: ["A Monarchia megerősítése", "Különválás Ausztriától, gyors béke és demokratizálás", "Azonnali kommunista diktatúra", "A régi dualista rendszer változatlan fenntartása"], correctOptionIndex: 1 },
  { id: "mcq_1100", category: "hungary_post_1848", prompt: "Mi jellemezte az őszirózsás forradalmat?", options: ["A régi rendszer teljes katonai győzelme", "A budapesti helyőrség és karhatalmi elemek átállása a Nemzeti Tanács oldalára", "Olasz csapatok bevonulása Budapestre", "A király hadüzenete Romániának"], correctOptionIndex: 1 },
  { id: "mcq_1101", category: "hungary_post_1848", prompt: "Mi volt Károlyi Mihály külpolitikai alapfeltevése?", options: ["A német segítségtől várta az ország megmentését", "A Wilsoni elvek és az antant jóindulata mérsékeltebb békét hozhat", "A Monarchia újjáépíthető változatlan formában", "Csak katonai győzelemmel lehet tárgyalni"], correctOptionIndex: 1 },
  { id: "mcq_1102", category: "hungary_post_1848", prompt: "Mi volt Károlyi rendszerének egyik legsúlyosabb hibája?", options: ["Az ipar teljes államosítása", "A hadsereg gyors leépítése", "A választójog teljes megszüntetése", "A királyság azonnali visszaállítása"], correctOptionIndex: 1 },
  { id: "mcq_1103", category: "hungary_post_1848", prompt: "Miért nem tudta a Károlyi-rendszer stabilizálni a helyzetet belpolitikailag?", options: ["Mert nem ígért demokratikus reformokat", "Mert a demokratikus ígéretek mellett rend, ellátás és területi integritás nélkül hitelességi válság alakult ki", "Mert azonnal sikeres választásokat tartott", "Mert nem próbálkozott földreformmal"], correctOptionIndex: 1 },
  { id: "mcq_1104", category: "hungary_post_1848", prompt: "Miért omlott össze 1919 tavaszára Károlyi rendszere?", options: ["Mert megnyerte a külpolitikai tárgyalásokat", "Mert elvesztette a külső alkupozíciót és a belső stabilitást is", "Mert a hadsereg elfoglalta Bécset", "Mert az antant elismerte a magyar kormányt"], correctOptionIndex: 1 },
  { id: "mcq_1105", category: "hungary_post_1848", prompt: "Mi adta a döntő lökést a kommunista hatalomátvételhez 1919 márciusában?", options: ["A compiègne-i fegyverszünet", "A Vix-jegyzék", "A padovai fegyverszünet", "A wilsoni pontok elfogadása"], correctOptionIndex: 1 },
  { id: "mcq_1106", category: "hungary_post_1848", prompt: "Mi jellemezte a Tanácsköztársaság rendszerét?", options: ["Pluralista parlamenti demokrácia", "Kommunista diktatúra, központosított irányítással", "Szövetségi királyság", "Katonai alkotmányos monarchia"], correctOptionIndex: 1 },
  { id: "mcq_1107", category: "hungary_post_1848", prompt: "Mi volt a vörös terror szerepe?", options: ["A választások lebonyolítása", "A rendszer fenntartása félelemkeltéssel és erőszakszervezeti eszközökkel", "Az antanttal való béketárgyalás", "A földreform végrehajtása"], correctOptionIndex: 1 },
  { id: "mcq_1108", category: "hungary_post_1848", prompt: "Mi mutatta meg a felvidéki hadjárat során, hogy a Tanácsköztársaság célja nem pusztán a magyar állami fennhatóság helyreállítása volt?", options: ["A szlovák területek kiürítése", "A Szlovák Tanácsköztársaság létrehozása", "A Monarchia helyreállításának kihirdetése", "A románokkal kötött különbéke"], correctOptionIndex: 1 },
  { id: "mcq_1109", category: "hungary_post_1848", prompt: "Mi volt a wilsoni önrendelkezési elv gyakorlati problémája?", options: ["Túl pontos jogi szabály volt", "Egyértelműen csak a nyelv alapján döntött", "A megvalósítása önkényes érdekpolitikává vált", "Kizárólag gazdasági szempontokat vett figyelembe"], correctOptionIndex: 2 },
  { id: "mcq_1110", category: "hungary_post_1848", prompt: "Mi volt a győztes nagyhatalmak egyik fontos célja Közép-Kelet-Európában?", options: ["A Habsburg Birodalom helyreállítása", "Egy franciabarát ütközőzóna létrehozása", "Magyarország megerősítése", "A nemzetiségi kérdés teljes mellőzése"], correctOptionIndex: 1 },
  { id: "mcq_1111", category: "hungary_post_1848", prompt: "Mely államok együttműködése testesítette meg a Kisantantot?", options: ["Németország, Ausztria, Magyarország", "Csehszlovákia, Románia, Jugoszlávia", "Franciaország, Olaszország, Nagy-Britannia", "Lengyelország, Ausztria, Magyarország"], correctOptionIndex: 1 },
  { id: "mcq_1112", category: "hungary_post_1848", prompt: "Miért volt problematikus a korabeli népszámlálási adatok használata?", options: ["Mert kizárólag vallási alapon készültek", "Mert főleg anyanyelv alapján mértek, nem etnikum alapján", "Mert csak a nemességet vették számba", "Mert kizárólag a városi lakosságot vizsgálták"], correctOptionIndex: 1 },
  { id: "mcq_1113", category: "hungary_post_1848", prompt: "Melyik állítás igaz a nemzetiségi helyzetre?", options: ["A magyar tömbök főleg a peremvidékeken helyezkedtek el", "A nem magyar népesség szinte teljesen hiányzott", "A magyar tömb inkább a középső területeken koncentrálódott", "A Monarchia magyar része nem volt többnemzetiségű"], correctOptionIndex: 2 },
  { id: "mcq_1114", category: "hungary_post_1848", prompt: "Miért volt gyenge a magyar tárgyalási pozíció?", options: ["Mert Magyarország nem küldött delegációt", "Mert a stratégiai döntések lényegében már előre megszülettek", "Mert a magyar fél bojkottálta az aláírást", "Mert csak gazdasági kérdésekről lehetett tárgyalni"], correctOptionIndex: 1 },
  { id: "mcq_1115", category: "hungary_post_1848", prompt: "Ki vezette a magyar békedelegációt?", options: ["Bethlen István", "Teleki Pál", "Apponyi Albert", "Horthy Miklós"], correctOptionIndex: 2 },
  { id: "mcq_1116", category: "hungary_post_1848", prompt: "Mi volt Apponyi Albert érvelésének egyik fő eleme?", options: ["A teljes katonai ellenállás meghirdetése", "A wilsoni önrendelkezésre való hivatkozás és népszavazások kérése", "Azonnali különbéke kérése Németországgal", "A történelmi határok erőszakos visszaállítása"], correctOptionIndex: 1 },
  { id: "mcq_1117", category: "hungary_post_1848", prompt: "Mire használta a magyar delegáció a „vörös térképet”?", options: ["A hadsereg mozgásának megtervezésére", "Az etnikai viszonyok szemléltetésére", "A vasúti tarifák kiszámítására", "A jóvátétel összegének meghatározására"], correctOptionIndex: 1 },
  { id: "mcq_1118", category: "hungary_post_1848", prompt: "Hol írták alá a békeszerződést?", options: ["Versailles-ban, a Grand Trianon szárnyban", "Bécsben, a Hofburgban", "Berlinben, a Reichstagban", "Budapesten, az Országházban"], correctOptionIndex: 0 },
  { id: "mcq_1119", category: "hungary_post_1848", prompt: "Kik írták alá magyar részről a békeszerződést?", options: ["Apponyi Albert és Teleki Pál", "Bethlen István és Horthy Miklós", "Benárd Ágost és Drasche-Lázár Alfréd", "Károlyi Mihály és Kun Béla"], correctOptionIndex: 2 },
  { id: "mcq_1120", category: "hungary_post_1848", prompt: "Mi volt az egyik legfontosabb katonai korlátozás?", options: ["Kötelező sorkatonaság bevezetése", "A hadsereg létszámának 35 000 főben való maximalizálása", "A haditengerészet megerősítése", "A páncélos haderő fejlesztésének ösztönzése"], correctOptionIndex: 1 },
  { id: "mcq_1121", category: "hungary_post_1848", prompt: "Mi történt az általános hadkötelezettséggel?", options: ["Kiterjesztették", "Csak háború esetére függesztették fel", "Eltörölték", "A tisztekre korlátozták"], correctOptionIndex: 2 },
  { id: "mcq_1122", category: "hungary_post_1848", prompt: "Mi jellemezte a trianoni Magyarország népességét?", options: ["A magyar anyanyelvűek aránya csökkent 50% alá", "A magyar anyanyelvűek aránya 88% fölé emelkedett", "A magyar anyanyelvűek aránya változatlan maradt", "A nem magyar népesség többségbe került"], correctOptionIndex: 1 },
  { id: "mcq_1123", category: "hungary_post_1848", prompt: "Mi volt a legjobban dokumentált gazdasági veszteség?", options: ["A feldolgozóipar teljes eltűnése", "A nyersanyag- és erőforrás-bázis szétesése", "A bankrendszer teljes megszűnése", "A mezőgazdaság teljes összeomlása"], correctOptionIndex: 1 },
  { id: "mcq_1124", category: "hungary_post_1848", prompt: "Miért okozott súlyos gazdasági zavart az új határrendszer?", options: ["Mert megszüntette a folyami közlekedést Európában", "Mert szétvágta a történeti vasúti és piaci integrációt", "Mert megtiltotta a belső adóztatást", "Mert megszüntette Budapest szerepét"], correctOptionIndex: 1 },
  { id: "mcq_1125", category: "hungary_post_1848", prompt: "Mi lett a kisebbségvédelem gyakorlati problémája?", options: ["Túl szigorúan betartatták", "A gyakorlatban sokszor következetlenül hajtották végre", "Csak Magyarországon alkalmazták", "Kizárólag vallási kisebbségekre vonatkozott"], correctOptionIndex: 1 },
  { id: "mcq_1126", category: "hungary_post_1848", prompt: "Miért jelent meg a két világháború között erősen a revíziós gondolkodás?", options: ["Mert a rendszer katonailag könnyen megváltoztatható volt", "Mert Trianont igazságtalannak, gazdaságilag működésképtelennek és politikailag nem véglegesnek látták", "Mert a nagyhatalmak ezt kifejezetten támogatták", "Mert a kisebbségi kérdés teljesen rendeződött"], correctOptionIndex: 1 },
  { id: "mcq_1127", category: "hungary_post_1848", prompt: "Milyen államforma működött Magyarországon Horthy kormányzóvá választása után?", options: ["Köztársaság", "Abszolút monarchia", "Királyság király nélkül, kormányzóval az állam élén", "Szovjet típusú tanácsköztársaság"], correctOptionIndex: 2 },
  { id: "mcq_1128", category: "hungary_post_1848", prompt: "Mikor választották Horthy Miklóst kormányzóvá?", options: ["1919 őszén", "1920. március 1-jén", "1920. június 4-én", "1921. január 1-jén"], correctOptionIndex: 1 },
  { id: "mcq_1129", category: "hungary_post_1848", prompt: "Mi volt a rendszer első legfontosabb feladata a Tanácsköztársaság bukása után?", options: ["Azonnali területi revízió", "A rend helyreállítása", "A király visszahívása", "A többpártrendszer felszámolása"], correctOptionIndex: 1 },
  { id: "mcq_1130", category: "hungary_post_1848", prompt: "Mi jellemezte a numerus clausus törvényt?", options: ["Általános tankötelezettséget vezetett be", "A középiskolák számát korlátozta", "A felsőoktatási felvételt korlátozta, és gyakorlatban főleg a zsidó fiatalokat sújtotta", "Az ipari munkások választójogát szűkítette"], correctOptionIndex: 2 },
  { id: "mcq_1131", category: "hungary_post_1848", prompt: "Mi volt Bethlen István fő politikai célja?", options: ["Totális diktatúra kiépítése", "Stabil, konzervatív-autoriter rendszer létrehozása korlátozott parlamentarizmussal", "Szocialista tervgazdaság megteremtése", "A Habsburg-restauráció végrehajtása"], correctOptionIndex: 1 },
  { id: "mcq_1132", category: "hungary_post_1848", prompt: "Mi biztosította leginkább a kormánypárt tartós parlamenti fölényét?", options: ["A teljes választójogi egyenlőség", "A vidéki titkos szavazás", "A szűkített választójog és vidéken a nyílt szavazás", "Az ellenzéki pártok betiltása"], correctOptionIndex: 2 },
  { id: "mcq_1133", category: "hungary_post_1848", prompt: "Mi volt a Bethlen–Peyer-paktum lényege?", options: ["A kommunisták kormányra kerültek", "Az MSZDP legálisan működhetett, cserébe önkorlátozást vállalt", "A kisgazdák és a legitimisták egyesültek", "A kormány eltörölte a szakszervezeteket"], correctOptionIndex: 1 },
  { id: "mcq_1134", category: "hungary_post_1848", prompt: "Mi járult hozzá jelentősen Bethlen bukásához?", options: ["A pengő bevezetése", "Az 1929-es világgazdasági válság", "A Népszövetségi kölcsön", "A Bethlen–Peyer-paktum"], correctOptionIndex: 1 },
  { id: "mcq_1135", category: "hungary_post_1848", prompt: "Mi volt a pénzügyi stabilizáció egyik fontos nemzetközi feltétele?", options: ["Belépés a Népszövetségbe és népszövetségi kölcsön felvétele", "Katonai szövetség Németországgal", "Az Osztrák–Magyar Bank visszaállítása", "Jóvátételi pénzek beáramlása"], correctOptionIndex: 0 },
  { id: "mcq_1136", category: "hungary_post_1848", prompt: "Mi volt a Magyar Nemzeti Bank létrehozásának egyik fő szerepe?", options: ["A mezőgazdasági termelés irányítása", "A pénz értékének védelme és a hitelviszonyok szabályozása", "A revíziós propaganda szervezése", "A földreform végrehajtása"], correctOptionIndex: 1 },
  { id: "mcq_1137", category: "hungary_post_1848", prompt: "Mi történt 1927-ben a pénzrendszerben?", options: ["Megszűnt a jegybank", "Bevezették a koronát", "Bevezették a pengőt", "Visszatértek az aranykoronához"], correctOptionIndex: 2 },
  { id: "mcq_1138", category: "hungary_post_1848", prompt: "Mi jellemezte a korszak gazdaságpolitikáját az iparral kapcsolatban?", options: ["Teljes szabadkereskedelem", "Magas ipari importvámokkal védték a hazai ipart", "Az ipar tudatos leépítése", "Az összes üzem államosítása"], correctOptionIndex: 1 },
  { id: "mcq_1139", category: "hungary_post_1848", prompt: "Mi maradt a gazdaság egyik tartós szerkezeti problémája?", options: ["A túl fejlett nehézipar", "A teljes importfüggőség az élelmiszerekből", "Az agrárfüggés fennmaradása", "A bankrendszer hiánya"], correctOptionIndex: 2 },
  { id: "mcq_1140", category: "hungary_post_1848", prompt: "Melyik fejlesztés kapcsolódott a korszak technikai modernizációjához?", options: ["A Duna teljes szabályozása", "A Budapest–Hegyeshalom vasútvonal villamosítása", "A metróhálózat országos kiépítése", "A haditengerészet újjászervezése"], correctOptionIndex: 1 },
  { id: "mcq_1141", category: "hungary_post_1848", prompt: "Mi volt a német, olasz és osztrák piacok felé való nyitás egyik következménye?", options: ["Csökkent a külkereskedelem", "Megszűnt a gabonaexport", "Nőtt a német gazdasági függés", "Magyarország kilépett az európai piacról"], correctOptionIndex: 2 },
  { id: "mcq_1142", category: "hungary_post_1848", prompt: "Mi állt Klebelsberg Kunó kultúrpolitikájának középpontjában?", options: ["A katonai revans előkészítése", "A kultúra és a tudás mint nemzetmegtartó erő", "A felsőoktatás teljes privatizációja", "Az elemi oktatás visszaszorítása"], correctOptionIndex: 1 },
  { id: "mcq_1143", category: "hungary_post_1848", prompt: "Mi volt a Klebelsberg-féle népiskolaépítési program egyik legfontosabb eredménye?", options: ["Az analfabetizmus növekedése", "Az elemi iskolai infrastruktúra jelentős bővítése", "A középiskolák megszüntetése", "A külföldi ösztöndíjak eltörlése"], correctOptionIndex: 1 },
  { id: "mcq_1144", category: "hungary_post_1848", prompt: "Mi jellemezte a Horthy-korszak revíziós magatartását?", options: ["A trianoni határok végleges elfogadása", "A revízió kizárólag titkos diplomáciai eszköz volt", "A revízió külpolitikai és tömegnevelési programmá is vált", "A revízió csak a hadsereg belügye volt"], correctOptionIndex: 2 },
  { id: "mcq_1145", category: "hungary_post_1848", prompt: "Mi volt Magyarország hadba sodródásának egyik fő oka?", options: ["A gyarmatszerzés igénye", "A trianoni veszteségek visszaszerzésének reménye", "A tengeri terjeszkedés terve", "A semlegesség megőrzése"], correctOptionIndex: 1 },
  { id: "mcq_1146", category: "hungary_post_1848", prompt: "Mi kötötte gazdaságilag is egyre szorosabban Magyarországot Németországhoz?", options: ["A közös pénzrendszer", "Németország fontos exportpiaccá vált", "A közös haditengerészet", "A német földreform"], correctOptionIndex: 1 },
  { id: "mcq_1147", category: "hungary_post_1848", prompt: "Melyik eseményt tekintik általában a tényleges hadba lépés kezdetének?", options: ["A háromhatalmi egyezmény aláírását", "A Jugoszlávia elleni bevonulást", "A Szovjetunió elleni hadiállapotot", "Az első bécsi döntést"], correctOptionIndex: 2 },
  { id: "mcq_1148", category: "hungary_post_1848", prompt: "Mi adott ürügyet a Szovjetunió elleni hadba lépéshez?", options: ["A debreceni csata", "A kassai bombázás", "A román átállás", "A budapesti ostrom"], correctOptionIndex: 1 },
  { id: "mcq_1149", category: "hungary_post_1848", prompt: "Melyik terület került vissza az első bécsi döntéssel?", options: ["Észak-Erdély és a Székelyföld", "A Felvidék déli, többségében magyar lakta sávja", "Kárpátalja teljes egésze", "A Délvidék egésze"], correctOptionIndex: 1 },
  { id: "mcq_1150", category: "hungary_post_1848", prompt: "Mi történt 1939-ben a revíziós sikerek közül?", options: ["Belépés a háromhatalmi egyezménybe", "Kárpátalja visszacsatolása", "Észak-Erdély visszaszerzése", "A kassai bombázás"], correctOptionIndex: 1 },
  { id: "mcq_1151", category: "hungary_post_1848", prompt: "Melyik terület került vissza a második bécsi döntéssel?", options: ["Bácska", "A Muraköz", "Észak-Erdély és a Székelyföld", "Kárpátalja"], correctOptionIndex: 2 },
  { id: "mcq_1152", category: "hungary_post_1848", prompt: "Mi lett a második bécsi döntés egyik fontos külpolitikai következménye?", options: ["Magyarország kilépett a német szövetségi rendszerből", "Magyarország belépett a háromhatalmi egyezménybe", "Magyarország semlegességet hirdetett", "Magyarország csatlakozott a szövetségesekhez"], correctOptionIndex: 1 },
  { id: "mcq_1153", category: "hungary_post_1848", prompt: "Melyik állítás igaz az 1941-es jugoszláv eseményekre?", options: ["Teleki nyíltan hadat üzent Jugoszláviának", "Teleki barátsági szerződést kötött Jugoszláviával, majd a helyzetbe beleroppanva öngyilkos lett", "Magyarország visszaadta a Délvidéket", "A magyar kormány azonnal kilépett a háborúból"], correctOptionIndex: 1 },
  { id: "mcq_1154", category: "hungary_post_1848", prompt: "Miért szállta meg Hitler Magyarországot 1944 márciusában?", options: ["Mert Magyarország megtámadta Németországot", "Mert a magyar vezetés különbéke-lehetőségeket keresett és a németek átállástól tartottak", "Mert Magyarország kilépett a háromhatalmi egyezményből", "Mert Románia megszállta az országot"], correctOptionIndex: 1 },
  { id: "mcq_1155", category: "hungary_post_1848", prompt: "Ki váltotta Kállay Miklóst a német megszállás után?", options: ["Lakatos Géza", "Teleki Pál", "Döme Sztójay", "Szálasi Ferenc"], correctOptionIndex: 2 },
  { id: "mcq_1156", category: "hungary_post_1848", prompt: "Ki váltotta le később Sztójayt 1944 augusztusában?", options: ["Bárdossy László", "Lakatos Géza", "Imrédy Béla", "Jaross Andor"], correctOptionIndex: 1 },
  { id: "mcq_1157", category: "hungary_post_1848", prompt: "Miért vallott kudarcot az 1944. október 15-i kiugrási kísérlet?", options: ["Mert a szovjetek nem tudtak róla", "Mert túl korán és túl jól előkészítve történt", "Mert túl későn, rosszul előkészítve próbálták meg, és nem volt egységes végrehajtás", "Mert Horthy nem hirdetett fegyverszünetet"], correctOptionIndex: 2 },
  { id: "mcq_1158", category: "hungary_post_1848", prompt: "Mivel tették Horthyt személyesen is zsarolhatóvá a németek?", options: ["Elrabolták a miniszterelnököt", "Elrabolták ifjabb Horthy Miklóst", "Elfoglalták a parlamentet", "Letartóztatták Lakatos Gézát"], correctOptionIndex: 1 },
  { id: "mcq_1159", category: "hungary_post_1848", prompt: "Mi jellemezte a nyilas diktatúrát?", options: ["Hosszú, stabil parlamentáris korszak volt", "Rövid, de kegyetlen terroruralom volt", "Teljes semlegességet hirdetett", "Megszüntette a zsidóüldözést"], correctOptionIndex: 1 },
  { id: "mcq_1160", category: "hungary_post_1848", prompt: "Miért vált Magyarország 1944 őszétől valódi hadszíntérré?", options: ["Mert az angolok megszállták az országot", "Mert Románia átállt a szovjetek oldalára, és a szovjet csapatok megkerülték az Árpád-vonalat", "Mert Jugoszlávia támadta meg Budapestet", "Mert a magyar hadsereg elfoglalta Erdélyt"], correctOptionIndex: 1 },
  { id: "mcq_1161", category: "hungary_post_1848", prompt: "Mi volt a debreceni csata legfontosabb következménye?", options: ["Megnyílt az út a Vörös Hadsereg előtt az Alföld belseje felé", "A németek visszafoglalták Erdélyt", "Magyarország kilépett a háborúból", "A főváros felszabadult"], correctOptionIndex: 0 },
  { id: "mcq_1162", category: "hungary_post_1848", prompt: "Mi volt a budapesti hadművelet csúcspontja?", options: ["A kassai bombázás", "Budapest ostroma", "A tavaszi ébredés hadművelet", "A doni áttörés"], correctOptionIndex: 1 },
  { id: "mcq_1163", category: "hungary_post_1848", prompt: "Mi volt a tavaszi ébredés hadművelet célja?", options: ["Budapest visszafoglalása a szovjetektől", "A dunántúli olajmezők védelme", "A Felvidék visszaszerzése", "A román hadsereg megsemmisítése"], correctOptionIndex: 1 },
  { id: "mcq_1164", category: "hungary_post_1848", prompt: "Mi lett a háború egyik súlyos társadalmi következménye Magyarországon?", options: ["A lakosság tömeges meggazdagodása", "A civilek és hadifoglyok tömeges elhurcolása „malenkij robotra”", "A mezőgazdaság teljes fellendülése", "A revíziós területek megtartása"], correctOptionIndex: 1 },
  { id: "mcq_1165", category: "hungary_post_1848", prompt: "Mi történt a revíziós területekkel a háború után?", options: ["Mind Magyarországnál maradtak", "Csak Észak-Erdély maradt meg", "Mind elvesztek, és lényegében visszaálltak a trianoni határok", "A Délvidék Magyarországhoz került véglegesen"], correctOptionIndex: 2 },
  { id: "mcq_1166", category: "hungary_post_1848", prompt: "Melyik állítás igaz az első zsidótörvényre?", options: ["Fajelvi alapon határozta meg a zsidóságot", "Megtiltotta a vegyes házasságot", "Több értelmiségi és gazdasági pályán korlátozta a zsidók arányát", "Azonnal deportálást rendelt el"], correctOptionIndex: 2 },
  { id: "mcq_1167", category: "hungary_post_1848", prompt: "Mi jellemezte a második és harmadik zsidótörvényt?", options: ["Megszüntették az első zsidótörvényt", "Fajelvi alapon határozták meg, kit tekintenek zsidónak", "Teljes jogegyenlőséget adtak", "Csak gazdasági kérdésekkel foglalkoztak"], correctOptionIndex: 1 },
  { id: "mcq_1168", category: "hungary_post_1848", prompt: "Hová deportálták 1944-ben a magyar zsidók többségét?", options: ["Dachauba", "Auschwitz-Birkenauba", "Treblinkába", "Mauthausenbe"], correctOptionIndex: 1 },
  { id: "mcq_1169", category: "hungary_post_1848", prompt: "Kik segítették magyar oldalon a deportálások lebonyolítását a legfontosabb szereplők között?", options: ["Bethlen István és Teleki Pál", "Jaross Andor, Endre László, Baky László és Ferenczy László", "Horthy Miklós és Lakatos Géza", "Klebelsberg Kunó és Imrédy Béla"], correctOptionIndex: 1 },
  { id: "mcq_1170", category: "hungary_post_1848", prompt: "Mi tette különösen instabillá Európát az első világháború után Németország szempontjából?", options: ["A versailles-i béke megalázó és korlátozó jellege", "A német gyarmatok megerősödése", "A gyors német demokratizálódás", "A teljes gazdasági fellendülés"], correctOptionIndex: 0 },
  { id: "mcq_1171", category: "hungary_post_1848", prompt: "Mi volt a „békéltetés” politikájának csúcspontja?", options: ["A Rajna-vidék remilitarizálása", "Az Anschluss", "A müncheni egyezmény", "A Molotov–Ribbentrop-paktum"], correctOptionIndex: 2 },
  { id: "mcq_1172", category: "hungary_post_1848", prompt: "Mi mutatta meg 1939 márciusában, hogy Hitler már nem csak revíziót akar?", options: ["A Szudéta-vidék megszerzése", "Csehország elfoglalása", "Ausztria bekebelezése", "A sorkatonaság visszaállítása"], correctOptionIndex: 1 },
  { id: "mcq_1173", category: "hungary_post_1848", prompt: "Mi volt a Molotov–Ribbentrop-paktum lényege?", options: ["Német–olasz katonai szövetség", "Német–szovjet megnemtámadási szerződés, titkos területi felosztással", "Brit–francia garancia Lengyelországnak", "Japán és Németország közös haditerve"], correctOptionIndex: 1 },
  { id: "mcq_1174", category: "hungary_post_1848", prompt: "Mi jellemezte leginkább a villámháborút?", options: ["Elhúzódó lövészárokháború", "Gyors, gépesített támadás rádiós koordinációval és légierővel", "Kizárólag tengeri hadviselés", "Csak védelmi célú hadműveletek"], correctOptionIndex: 1 },
  { id: "mcq_1175", category: "hungary_post_1848", prompt: "Mi indította el az európai háborút?", options: ["Franciaország megtámadása", "A Szovjetunió lerohanása", "Lengyelország német megtámadása", "Pearl Harbor"], correctOptionIndex: 2 },
  { id: "mcq_1176", category: "hungary_post_1848", prompt: "Mi történt a „furcsa háború” időszakában?", options: ["A nyugati fronton azonnal eldőltek a fő csaták", "Papíron háború volt, de nyugaton kevés nagy hadművelet zajlott", "A britek elfoglalták Berlint", "Franciaország megtámadta Olaszországot"], correctOptionIndex: 1 },
  { id: "mcq_1177", category: "hungary_post_1848", prompt: "Mi volt a brit csata jelentősége?", options: ["Németország elfoglalta Angliát", "A németek megtörték a brit légvédelmet", "Németország nem tudta térdre kényszeríteni Nagy-Britanniát", "A brit flotta elsüllyedt"], correctOptionIndex: 2 },
  { id: "mcq_1178", category: "hungary_post_1848", prompt: "Miért számított Hitler egyik legnagyobb hibájának a Barbarossa hadművelet?", options: ["Mert ezzel elvesztette Japán támogatását", "Mert kétfrontos háborút indított", "Mert feladta Franciaországot", "Mert lemondott a légierőről"], correctOptionIndex: 1 },
  { id: "mcq_1179", category: "hungary_post_1848", prompt: "Melyik ütközet volt fordulópont a csendes-óceáni háborúban?", options: ["El-Alamein", "Midway", "Kurszk", "Dunkerque"], correctOptionIndex: 1 },
  { id: "mcq_1180", category: "hungary_post_1848", prompt: "Mi törte meg a német lendületet keleten?", options: ["A brit csata", "Sztálingrád", "Ardennek", "Szicília"], correctOptionIndex: 1 },
  { id: "mcq_1181", category: "hungary_post_1848", prompt: "Mi lett Kurszk legfontosabb következménye?", options: ["A németek újra támadó fölénybe kerültek", "A stratégiai kezdeményezés végleg a szovjetekhez került keleten", "A Szovjetunió kilépett a háborúból", "Megnyílt a nyugati front"], correctOptionIndex: 1 },
  { id: "mcq_1182", category: "hungary_post_1848", prompt: "Mi volt a D-nap jelentősége?", options: ["Japán kapitulációja", "A nyugati front megnyitásának döntő lépése", "Olaszország hadba lépése", "Berlin elfoglalása"], correctOptionIndex: 1 },
  { id: "mcq_1183", category: "hungary_post_1848", prompt: "Mi jellemezte a második világháborút az elsőhöz képest?", options: ["Lassabb és kevésbé technikai jellegű volt", "A civilek kevésbé voltak célpontok", "Mozgékonyabb, gyorsabb és technológiailag fejlettebb volt", "Kizárólag Európában zajlott"], correctOptionIndex: 2 },
  { id: "mcq_1184", category: "hungary_post_1848", prompt: "Mi volt a wannsee-i konferencia történelmi szerepe?", options: ["A német kapituláció aláírása", "A végső megoldás előterjesztése", "A normandiai partraszállás megszervezése", "A Népszövetség megalapítása"], correctOptionIndex: 1 },
  { id: "mcq_1185", category: "hungary_post_1848", prompt: "Mi tette lehetővé, hogy a kommunisták 1945 után a választási eredmény ellenére is kulcspozícióban maradjanak?", options: ["A király támogatása", "A belügy megszerzése és a szovjet támogatás", "A földreform teljes sikere", "A többpártrendszer megszüntetése már 1945-ben"], correctOptionIndex: 1 },
  { id: "mcq_1186", category: "hungary_post_1848", prompt: "Mi volt a szalámi taktika lényege?", options: ["Az ellenfelek fokozatos szétverése", "A parlament megerősítése", "A választójog bővítése", "A kommunista párt feloszlatása"], correctOptionIndex: 0 },
  { id: "mcq_1187", category: "hungary_post_1848", prompt: "Miért vált hírhedtté az 1947-es választás?", options: ["Mert kizárólag falun rendezték meg", "Mert kékcédulás csalások torzították", "Mert azon nem indulhattak a kommunisták", "Mert titkos szavazás nélkül zajlott az egész országban"], correctOptionIndex: 1 },
  { id: "mcq_1188", category: "hungary_post_1848", prompt: "Mi történt 1948. június 12-én?", options: ["Megalakult az ÁVH", "Bevezették a forintot", "Létrejött a Magyar Dolgozók Pártja", "Kikiáltották a Magyar Népköztársaságot"], correctOptionIndex: 2 },
  { id: "mcq_1189", category: "hungary_post_1848", prompt: "Mi volt az 1949. évi XX. törvény jelentősége?", options: ["Megerősítette a többpártrendszert", "Hivatalossá tette a diktatórikus rendszert", "Megszüntette az államosítást", "Visszaállította a királyságot"], correctOptionIndex: 1 },
  { id: "mcq_1190", category: "hungary_post_1848", prompt: "Mi volt az ÁVH legfontosabb szerepe?", options: ["A gazdasági tervek kidolgozása", "A társadalom megfigyelése és megfélemlítése", "A külpolitika irányítása", "A választások szervezése"], correctOptionIndex: 1 },
  { id: "mcq_1191", category: "hungary_post_1848", prompt: "Mit jelentett a „csengőfrász”?", options: ["A munkaversenyek ünneplését", "Az éjszakai letartóztatástól való félelmet", "A rádióadások kötelező hallgatását", "A beszolgáltatás kezdetét"], correctOptionIndex: 1 },
  { id: "mcq_1192", category: "hungary_post_1848", prompt: "Mi jellemezte az első ötéves tervet?", options: ["A fogyasztási cikkek fejlesztését állította középpontba", "A mezőgazdaság teljes felszabadítását hozta", "A nehézipar erőltetett fejlesztését szolgálta", "A piacgazdaság visszaállítását célozta"], correctOptionIndex: 2 },
  { id: "mcq_1193", category: "hungary_post_1848", prompt: "Miért lett népszerű Nagy Imre „új szakasza”?", options: ["Mert további terrorintézkedéseket vezetett be", "Mert enyhítést és jobb életszínvonalat ígért", "Mert megszüntette a forintot", "Mert betiltotta a mezőgazdaságot"], correctOptionIndex: 1 },
  { id: "mcq_1194", category: "hungary_post_1848", prompt: "Mi adott különösen erős bátorítást a reformköveteléseknek 1956 előtt?", options: ["A nyugati katonai beavatkozás", "A desztalinizáció és Rákosi leváltása", "A Varsói Szerződés megszűnése", "A többpártrendszer visszaállítása"], correctOptionIndex: 1 },
  { id: "mcq_1195", category: "hungary_post_1848", prompt: "Miért volt különösen fontos Rajk László újratemetése?", options: ["Mert ekkor lett miniszterelnök Nagy Imre", "Mert tömeges tiltakozó üzenetté vált a koncepciós perek ellen", "Mert ezen alakult meg a MEFESZ", "Mert ekkor vonultak ki a szovjet csapatok"], correctOptionIndex: 1 },
  { id: "mcq_1196", category: "hungary_post_1848", prompt: "Miért számított kulcsfontosságúnak a MEFESZ megalakulása?", options: ["Mert a párt ifjúsági szervezete hozta létre", "Mert független, alulról szerveződő diákmozgalom volt", "Mert katonai szövetségként jött létre", "Mert kizárólag szegedi ügy maradt"], correctOptionIndex: 1 },
  { id: "mcq_1197", category: "hungary_post_1848", prompt: "Mi volt a 16 pont egyik központi követelése?", options: ["A sorkötelezettség bevezetése", "A szovjet csapatok kivonása", "A köztársaság megszüntetése", "A termelőszövetkezetek kötelező bővítése"], correctOptionIndex: 1 },
  { id: "mcq_1198", category: "hungary_post_1848", prompt: "Mi fordította át a békés tüntetést fegyveres felkeléssé?", options: ["A választások azonnali meghirdetése", "A rádiónál történt sortűz", "A nyugati csapatok bevonulása", "Horthy Miklós visszatérése"], correctOptionIndex: 1 },
  { id: "mcq_1199", category: "hungary_post_1848", prompt: "Mi történt 1956. október 24-én?", options: ["Kikiáltották a köztársaságot", "Nagy Imre újra miniszterelnök lett, és a szovjetek beavatkoztak", "Aláírták a békeszerződést", "Megalakult a Kádár-kormány"], correctOptionIndex: 1 },
  { id: "mcq_1200", category: "hungary_post_1848", prompt: "Miért lett fordulópont a Kossuth téri sortűz?", options: ["Mert lezárta a forradalmat", "Mert bizonyította sokak szemében, hogy a hatalom erővel akar fellépni", "Mert ekkor vonultak ki teljesen a szovjetek", "Mert ekkor fogták el Nagy Imrét"], correctOptionIndex: 1 },
  { id: "mcq_1201", category: "hungary_post_1848", prompt: "Mi jellemezte az október 28-a utáni napokat?", options: ["A forradalom teljes leverése", "Tűzszünet, engedmények, forradalmi bizottságok és munkástanácsok megjelenése", "A Rákosi-rendszer teljes helyreállítása", "A hadkötelezettség visszaállítása"], correctOptionIndex: 1 },
  { id: "mcq_1202", category: "hungary_post_1848", prompt: "Miért volt döntő jelentőségű Nagy Imre november 1-jei bejelentése?", options: ["Mert bejelentette a szovjet blokkhoz való szorosabb csatlakozást", "Mert kimondta a Varsói Szerződésből való kilépést és a semlegességet", "Mert lemondott a miniszterelnökségről", "Mert elismerte Gerő Ernő vezetését"], correctOptionIndex: 1 },
  { id: "mcq_1203", category: "hungary_post_1848", prompt: "Mi történt Tökölön 1956. november 3-án?", options: ["Aláírták a magyar–szovjet békét", "Letartóztatták a tárgyalásra érkező magyar küldöttséget", "Kikiáltották a köztársaságot", "Kiszabadították Rajk Lászlót"], correctOptionIndex: 1 },
  { id: "mcq_1204", category: "hungary_post_1848", prompt: "Mi volt a „Forgószél” hadművelet?", options: ["A forradalmárok budapesti támadása", "A szovjetek november 4-i, túlerővel végrehajtott támadása", "A MEFESZ titkos szervezkedése", "A forradalmi bizottságok közös programja"], correctOptionIndex: 1 },
  { id: "mcq_1205", category: "hungary_post_1848", prompt: "Miért tűnhetett Kádár 1956-ban elfogadható választásnak a szovjetek szemében?", options: ["Mert nyíltan antikommunista volt", "Mert a hadsereg főparancsnoka volt", "Mert régi kommunista kádernek számított, de kevésbé volt kompromittált, mint Rákosi vagy Gerő", "Mert a nyugati hatalmak támogatták"], correctOptionIndex: 2 },
  { id: "mcq_1206", category: "hungary_post_1848", prompt: "Mi történt 1956. november 1-jén Kádár politikai szerepével kapcsolatban?", options: ["Lemondott minden tisztségéről", "Bejelentette az MSZMP megalakulását, majd rövidesen a szovjet oldalra állt", "Nyilvánosan kilépett a kommunista mozgalomból", "Visszatért Nagy Imre teljes programjához"], correctOptionIndex: 1 },
  { id: "mcq_1207", category: "hungary_post_1848", prompt: "Kik voltak a pufajkások?", options: ["A rendszer korai karhatalmi egységei, amelyek a megtorlásban és megfélemlítésben vettek részt", "A mezőgazdasági termelőszövetkezetek helyi vezetői", "A Munkásőrség kulturális szervezői", "A reformközgazdászok gúnyneve"], correctOptionIndex: 0 },
  { id: "mcq_1208", category: "hungary_post_1848", prompt: "Mi volt az 1956 utáni megtorlás egyik fő célja?", options: ["A többpártrendszer előkészítése", "Az ipari termelés gyors helyreállítása", "A szovjet csapatok kivonásának kikényszerítése", "Az egész társadalom megfélemlítése, hogy senki ne próbálja újra"], correctOptionIndex: 3 },
  { id: "mcq_1209", category: "hungary_post_1848", prompt: "Mi volt a III/III. Csoportfőnökség feladata?", options: ["A külkereskedelem irányítása", "Az IMF-tárgyalások lebonyolítása", "A rendszer ellenfeleinek megfigyelése, bomlasztása és üldözése", "A mezőgazdasági kollektivizálás szervezése"], correctOptionIndex: 2 },
  { id: "mcq_1210", category: "hungary_post_1848", prompt: "Mi fejezi ki legjobban a Kádár-rendszer társadalmi alkut?", options: ["Politikai szabadság helyett emelkedő életszínvonalat ígért", "Teljes politikai részvételt adott, de alacsony béreket", "Visszaállította a többpártrendszert a szocializmus mellett", "Földet osztott a parasztoknak a rendszer támogatásáért"], correctOptionIndex: 0 },
  { id: "mcq_1211", category: "hungary_post_1848", prompt: "Mit fejezett ki a „fridzsiderszocializmus”?", options: ["A nehézipar elsőbbségét", "A rendszer katonai erejét", "A teljes nyugati jólét elérését", "A fogyasztás bővítésére épülő legitimációt"], correctOptionIndex: 3 },
  { id: "mcq_1212", category: "hungary_post_1848", prompt: "Mi volt a 3T rendszer lényege?", options: ["A teljes kulturális szabadság biztosítása", "A kultúra támogatott, tűrt és tiltott kategóriákba sorolása", "A művészeti élet teljes privatizálása", "A vallási élet felszabadítása"], correctOptionIndex: 1 },
  { id: "mcq_1213", category: "hungary_post_1848", prompt: "Mi volt az új gazdasági mechanizmus legfontosabb újítása?", options: ["A magántulajdon általános visszaállítása", "A központi tervezés teljes felszámolása", "A vállalatok nagyobb önállósága és a nyereségesség szempontjának erősítése", "A kollektivizálás újraindítása"], correctOptionIndex: 2 },
  { id: "mcq_1214", category: "hungary_post_1848", prompt: "Mi volt a Kádár-rendszer egyik alapvető gazdasági ellentmondása?", options: ["Szocialista ideológiát hirdetett, de piaci elemeket és nyugati hiteleket használt", "A piacgazdaságot hirdette, de feudális maradt", "Nem használt központi tervet", "Megszüntette az állami tulajdont"], correctOptionIndex: 0 },
  { id: "mcq_1215", category: "hungary_post_1848", prompt: "Miért kezdett a hetvenes évektől recsegni a rendszer?", options: ["Mert túl gyorsan bevezette a többpártrendszert", "Mert felbomlott a Varsói Szerződés", "Mert megszűnt az ipari termelés", "Mert egyre nehezebb lett finanszírozni a viszonylagos jólétre épülő alkut"], correctOptionIndex: 3 },
  { id: "mcq_1216", category: "hungary_post_1848", prompt: "Mely külső gazdasági sokkok mélyítették el különösen a válságot?", options: ["A koreai háború és a szuezi válság", "Az 1973-as és 1979-es olajárrobbanás", "A versailles-i béke és a nagy gazdasági világválság", "A Marshall-segély megszűnése"], correctOptionIndex: 1 },
  { id: "mcq_1217", category: "hungary_post_1848", prompt: "Mi volt a lakiteleki találkozó történelmi jelentősége?", options: ["Ott alakult meg a Fidesz", "Ott döntöttek a négyigenes népszavazásról", "A népi-nemzeti ellenzék szerveződésének kulcspillanata volt, amelyből kinőtt az MDF", "Ott kiáltották ki a köztársaságot"], correctOptionIndex: 2 },
  { id: "mcq_1218", category: "hungary_post_1848", prompt: "Mi jelezte 1988 májusában, hogy még az állampárton belül is fordulat kezdődik?", options: ["Kádár leváltása és Grósz Károly előtérbe kerülése", "Azonnal megtartották az első szabad választásokat", "Megszűnt az MSZMP", "Az ország kilépett a Varsói Szerződésből"], correctOptionIndex: 0 },
  { id: "mcq_1219", category: "hungary_post_1848", prompt: "Miért volt fontos Németh Miklós miniszterelnökké választása?", options: ["Mert visszaállította a tervutasításos rendszert", "Mert felszámolta az ellenzéket", "Mert azonnal bevezette a piacgazdaságot", "Mert felgyorsultak a jogi és gazdasági átalakítások"], correctOptionIndex: 3 },
  { id: "mcq_1220", category: "hungary_post_1848", prompt: "Miért volt sorsfordító Pozsgay Imre 1989. január 28-i kijelentése?", options: ["Mert bejelentette a Munkásőrség visszaállítását", "Mert népfelkelésnek nevezte 1956-ot, ezzel megrendítve a rendszer legitimációját", "Mert közölte a szovjet csapatok azonnali kivonását", "Mert feloszlatta az MSZMP-t"], correctOptionIndex: 1 },
  { id: "mcq_1221", category: "hungary_post_1848", prompt: "Mi volt az Ellenzéki Kerekasztal elsődleges szerepe?", options: ["Az MSZMP és a kormány közös fóruma volt", "A gazdasági reformok részletes költségvetésének elkészítése", "Az ellenzéki csoportok egyeztetése, hogy a hatalom ne tudja kijátszani őket egymás ellen", "A szovjet kivonulás katonai koordinációja"], correctOptionIndex: 2 },
  { id: "mcq_1222", category: "hungary_post_1848", prompt: "Mi volt a Nemzeti Kerekasztal tárgyalások jelentősége?", options: ["Itt rögzítették a békés átmenet, a többpártrendszer és a szabad választások alapjait", "Itt döntöttek a Varsói Szerződés megalapításáról", "Itt választották meg Göncz Árpádot köztársasági elnöknek", "Itt írták alá a Bokros-csomagot"], correctOptionIndex: 0 },
  { id: "mcq_1223", category: "hungary_post_1848", prompt: "Mi történt 1989. október 23-án?", options: ["Megalakult az MDF", "Megszűnt az Ellenzéki Kerekasztal", "Göncz Árpádot közvetlenül elnökké választották", "Kikiáltották a Magyar Köztársaságot, és formálisan véget ért a népköztársasági államforma"], correctOptionIndex: 3 },
  { id: "mcq_1224", category: "hungary_post_1848", prompt: "Mi volt a négyigenes népszavazás valódi politikai tétje?", options: ["Az, hogy Magyarország belépjen-e az IMF-be", "Az, hogy az állampárt ne betonozhassa be a saját emberét az elnöki székbe a választások előtt", "Az, hogy újraállamosítsák-e a nagyipart", "Az, hogy maradjon-e a Munkásőrség"], correctOptionIndex: 1 },
  { id: "mcq_1225", category: "hungary_post_1848", prompt: "Mi volt a kétszintű bankrendszer visszaállításának lényege?", options: ["Megszűnt a Magyar Nemzeti Bank", "A jegybank és a kereskedelmi bankok feladatai szétváltak", "Az összes bank külföldi kézbe került", "Bevezették az eurót"], correctOptionIndex: 1 },
  { id: "mcq_1226", category: "hungary_post_1848", prompt: "Miért volt fontos az 1988-as gazdasági társaságokról szóló törvény?", options: ["Megtiltotta a vállalkozások alapítását", "Korszerű kereteket adott a vállalkozásoknak és a tőkeáramlásnak", "Megszüntette a külföldi működő tőkét", "Visszaállította a tervutasításos rendszert"], correctOptionIndex: 1 },
  { id: "mcq_1227", category: "hungary_post_1848", prompt: "Mit tett lehetővé az 1989. évi átalakulási törvény?", options: ["A privatizáció teljes leállítását", "Az állami vállalatok gazdasági társasággá alakulását", "A KGST újjászervezését", "A kötelező termelőszövetkezeteket"], correctOptionIndex: 1 },
  { id: "mcq_1228", category: "hungary_post_1848", prompt: "Mi jellemezte a spontán privatizációt?", options: ["Teljesen egységes és átlátható volt", "Főleg 1988 és 1990 között zajlott, és sokszor átláthatatlan volt", "Csak külföldi cégeket érintett", "Kizárólag a mezőgazdaságban jelent meg"], correctOptionIndex: 1 },
  { id: "mcq_1229", category: "hungary_post_1848", prompt: "Mi volt az Állami Vagyonügynökség létrehozásának célja?", options: ["A privatizáció megszüntetése", "A privatizáció ellenőrzöttebb, központosítottabb mederbe terelése", "A bankrendszer államosítása", "Az import korlátozása"], correctOptionIndex: 1 },
  { id: "mcq_1230", category: "hungary_post_1848", prompt: "Miért privatizált az állam?", options: ["Mert túl sok lett a költségvetési többlet", "Mert gyors bevételt, tőkét és hatékonyabb működést vártak tőle", "Mert meg akarta szüntetni a vállalatokat", "Mert a KGST ezt előírta"], correctOptionIndex: 1 },
  { id: "mcq_1231", category: "hungary_post_1848", prompt: "Mit jelentett a puha költségvetési korlát?", options: ["Az állam mindig hagyta csődbe menni a veszteséges cégeket", "A veszteséges állami vállalatokat az állam gyakran tovább finanszírozta", "A cégek csak külföldi hitelből élhettek", "A vállalatoknak tilos volt nyereséget termelniük"], correctOptionIndex: 1 },
  { id: "mcq_1232", category: "hungary_post_1848", prompt: "Miért okozott súlyos sokkot a KGST megszűnése?", options: ["Mert megszűnt az európai uniós tagság", "Mert eltűnt a sok magyar vállalat számára biztos keleti piac", "Mert azonnal bevezették a közös valutát", "Mert megtiltották az exportot"], correctOptionIndex: 1 },
  { id: "mcq_1233", category: "hungary_post_1848", prompt: "Mi jellemezte a transzformációs válságot?", options: ["Gyors növekedés és teljes foglalkoztatás", "GDP-visszaesés és munkanélküliség-emelkedés", "Csak a mezőgazdaságot érintette", "Kizárólag politikai válság volt"], correctOptionIndex: 1 },
  { id: "mcq_1234", category: "hungary_post_1848", prompt: "Mi volt a Bokros-csomag célja?", options: ["A privatizáció leállítása", "A pénzügyi egyensúly romlásának megállítása", "Az állami támogatások növelése", "Az import ösztönzése"], correctOptionIndex: 1 },
  { id: "mcq_1235", category: "hungary_post_1848", prompt: "Mi jellemezte a kárpótlást?", options: ["Teljes vagyon-visszaadás történt", "Részleges, sávosan csökkenő térítés történt kárpótlási jegyben", "Csak készpénzben fizettek", "Csak az egyházak kaptak kárpótlást"], correctOptionIndex: 1 },
  { id: "mcq_1236", category: "hungary_post_1848", prompt: "Mi jelezte politikailag is, hogy az átmenet lezárult és az ország végleg a nyugati piacgazdasági térbe tagozódott?", options: ["A KGST létrejötte", "Az IMF-be való belépés", "Az Európai Unióhoz való csatlakozás", "A taxisblokád"], correctOptionIndex: 2 },
  { id: "mcq_1237", category: "world_pre_1848", prompt: "Hol született Mohamed?", options: ["Jeruzsálemben", "Mekkában", "Medinában", "Damaszkuszban"], correctOptionIndex: 1 },
  { id: "mcq_1238", category: "world_pre_1848", prompt: "Ki közvetítette a hagyomány szerint Allah akaratát Mohamednek?", options: ["Mihály arkangyal", "Rafael arkangyal", "Gábriel arkangyal", "Izrael arkangyal"], correctOptionIndex: 2 },
  { id: "mcq_1239", category: "world_pre_1848", prompt: "Melyik törzs volt Mekka legerősebb törzse a 6–7. században?", options: ["Omajjád", "Quraysh", "Abbászida", "Szeldzsuk"], correctOptionIndex: 1 },
  { id: "mcq_1240", category: "world_pre_1848", prompt: "Mi volt a Kába a preiszlám korban?", options: ["Keresztény templom", "Zsidó zsinagóga", "Szentély", "Királyi palota"], correctOptionIndex: 2 },
  { id: "mcq_1241", category: "world_pre_1848", prompt: "Melyik állítás fejezi ki legjobban a tawhid lényegét?", options: ["Több isten tisztelete", "Az ősök kultusza", "Szigorú egyistenhit", "A természet erőinek imádása"], correctOptionIndex: 2 },
  { id: "mcq_1242", category: "world_pre_1848", prompt: "Melyik számít az iszlám egyik legsúlyosabb bűnének?", options: ["Böjt elmulasztása", "Shirk", "Zarándoklat", "Adakozás"], correctOptionIndex: 1 },
  { id: "mcq_1243", category: "world_pre_1848", prompt: "Melyik étel vagy ital tiltott az iszlám hagyománya szerint az anyag alapján?", options: ["Kenyér", "Hal", "Sertéshús", "Marhahús"], correctOptionIndex: 2 },
  { id: "mcq_1244", category: "world_pre_1848", prompt: "Mi az Íd al-Fitr?", options: ["A zarándoklat kezdete", "A ramadán végét jelző ünnep", "Mohamed születésnapja", "Az iszlám újév"], correctOptionIndex: 1 },
  { id: "mcq_1245", category: "world_pre_1848", prompt: "Melyik a muszlim közösség vezetője Mohamed halála után?", options: ["Pátriárka", "Kalifa", "Püspök", "Császár"], correctOptionIndex: 1 },
  { id: "mcq_1246", category: "world_pre_1848", prompt: "Mi a mecset szerepe?", options: ["Katonai központ", "Adószedő hivatal", "Az imádság és a közösségi vallási élet központja", "Csak bíráskodásra szolgál"], correctOptionIndex: 2 },
  { id: "mcq_1247", category: "world_pre_1848", prompt: "Melyik az iszlám legszentebb városa?", options: ["Medina", "Bagdad", "Mekka", "Kairó"], correctOptionIndex: 2 },
  { id: "mcq_1248", category: "world_pre_1848", prompt: "Meddig terjedt az Arab Birodalom?", options: ["Hispániától Indiáig", "Itáliától Skandináviáig", "Egyiptomtól Kínáig", "Perzsiától Britanniáig"], correctOptionIndex: 0 },
  { id: "mcq_1249", category: "world_pre_1848", prompt: "Ki állította meg az arab előrenyomulást 732-ben?", options: ["Nagy Károly", "Martell Károly", "I. Ottó", "Justinianus"], correctOptionIndex: 1 },
  { id: "mcq_1250", category: "world_pre_1848", prompt: "Mit jelent a feudum szó?", options: ["Egyházi adó", "Örökölhető földbirtok", "Kereskedelmi vám", "Városi kiváltságlevél"], correctOptionIndex: 1 },
  { id: "mcq_1251", category: "world_pre_1848", prompt: "Melyik csoportot nevezték bellatoresnak?", options: ["Dolgozó jobbágyság", "Városi polgárok", "Harcoló nemesség", "Papság"], correctOptionIndex: 2 },
  { id: "mcq_1252", category: "world_pre_1848", prompt: "Hol végzett robotmunkát a jobbágy?", options: ["A királyi udvarban", "A földesúr majorságában", "A kolostor kertjében", "A városi tanácsházán"], correctOptionIndex: 1 },
  { id: "mcq_1253", category: "world_pre_1848", prompt: "Melyik mezőgazdasági eszköz szerepel a városfejlődés egyik okaként?", options: ["Sarló", "Szőlőprés", "Nehézeke", "Kézimalom"], correctOptionIndex: 2 },
  { id: "mcq_1254", category: "world_pre_1848", prompt: "Hol alakultak ki gyakran a középkori városok?", options: ["Kizárólag hegytetőkön", "Csak királyi várak mellett", "Olyan helyeken, ahol már volt infrastruktúra", "Csak kolostoroktól távol"], correctOptionIndex: 2 },
  { id: "mcq_1255", category: "world_pre_1848", prompt: "Mi volt a kommunák egyik célja?", options: ["A földesúri joghatóság erősítése", "Saját városi önkormányzat kialakítása", "A céhek megszüntetése", "A robot növelése"], correctOptionIndex: 1 },
  { id: "mcq_1256", category: "world_pre_1848", prompt: "Melyik NEM tartozott a városi kiváltságok közé?", options: ["Piactartási jog", "Árumegállítási jog", "Saját bíró", "Tizedszedési jog az egyháztól"], correctOptionIndex: 3 },
  { id: "mcq_1257", category: "world_pre_1848", prompt: "Kik álltak a városi társadalom élén?", options: ["Céhlegények", "Beköltöző jobbágyok", "Patríciusok", "Inasok"], correctOptionIndex: 2 },
  { id: "mcq_1258", category: "world_pre_1848", prompt: "Melyik kereskedelmi hálózat uralta a Balti- és Északi-tenger térségét?", options: ["Levantei kereskedelem", "Hanza-szövetség", "Selyemút", "Atlanti szövetség"], correctOptionIndex: 1 },
  { id: "mcq_1259", category: "world_pre_1848", prompt: "Ki állt a középkori egyház hierarchiájának csúcsán?", options: ["A császár", "A pápa", "Az érsek", "A pátriárka"], correctOptionIndex: 1 },
  { id: "mcq_1260", category: "world_pre_1848", prompt: "Kik álltak közvetlenül a püspökök fölött az egyházi hierarchiában?", options: ["Az érsekek", "A plébánosok", "A szerzetesek", "A remete közösségek"], correctOptionIndex: 0 },
  { id: "mcq_1261", category: "world_pre_1848", prompt: "Kik irányították a helyi keresztény közösségeket?", options: ["Püspökök", "Érsekek", "Plébánosok", "Lovagok"], correctOptionIndex: 2 },
  { id: "mcq_1262", category: "world_pre_1848", prompt: "Mi adott az egyháznak jelentős anyagi hatalmat?", options: ["Csak a kereskedelem", "A földbirtokok és a tized", "A bányák és a vámok", "A városi céhek"], correctOptionIndex: 1 },
  { id: "mcq_1263", category: "world_pre_1848", prompt: "Kik ellen lépett fel az egyház kiközösítéssel és egyházi bírósági eljárásokkal?", options: ["Jobbágyok", "Eretnekek", "Kereskedők", "Lovagrendek"], correctOptionIndex: 1 },
  { id: "mcq_1264", category: "world_pre_1848", prompt: "Kik voltak azok, akik elvonultak a világtól, hogy magányosan, egyszerűen éljenek?", options: ["Plébánosok", "Püspökök", "Remeték", "Keresztesek"], correctOptionIndex: 2 },
  { id: "mcq_1265", category: "world_pre_1848", prompt: "Mi volt a szerzetesek három fogadalma?", options: ["Szegénység, tisztaság, engedelmesség", "Bátorság, hűség, hallgatás", "Munka, ima, hallgatás", "Böjt, zarándoklat, adakozás"], correctOptionIndex: 0 },
  { id: "mcq_1266", category: "world_pre_1848", prompt: "Melyik rendet nevezik a monasztikus szerzetesrendek közül a legjelentősebbnek?", options: ["Domonkosok", "Ferencesek", "Bencések", "Pálosok"], correctOptionIndex: 2 },
  { id: "mcq_1267", category: "world_pre_1848", prompt: "Mi volt Szent Benedek szabályzatának ismert jelmondata?", options: ["Credo quia absurdum", "Ora et labora", "Deus vult", "Pax romana"], correctOptionIndex: 1 },
  { id: "mcq_1268", category: "world_pre_1848", prompt: "Melyik az egyetlen magyar alapítású szerzetesrend?", options: ["Ciszterciek", "Pálos rend", "Premontreiek", "Bencések"], correctOptionIndex: 1 },
  { id: "mcq_1269", category: "world_pre_1848", prompt: "Melyik században jelentek meg a koldulórendek?", options: ["11. század", "12. század", "13. század", "14. század"], correctOptionIndex: 2 },
  { id: "mcq_1270", category: "world_pre_1848", prompt: "Mely rendek a koldulórendek?", options: ["Bencések és ciszterciek", "Ferencesek és domonkosok", "Premontreiek és pálosok", "Bencések és pálosok"], correctOptionIndex: 1 },
  { id: "mcq_1271", category: "world_pre_1848", prompt: "Melyik stílust jellemezték vastag falak, félköríves boltívek és kis ablakok?", options: ["Gótika", "Reneszánsz", "Barokk", "Román stílus"], correctOptionIndex: 3 },
  { id: "mcq_1272", category: "world_pre_1848", prompt: "Melyik elem tette lehetővé a gótikában a falak könnyítését és a nagy üvegablakok alkalmazását?", options: ["Kupola", "Támpillér", "Oszlopcsarnok", "Kazettás mennyezet"], correctOptionIndex: 1 },
  { id: "mcq_1273", category: "world_pre_1848", prompt: "Melyik országban indult a reneszánsz?", options: ["Franciaországban", "Német-római Birodalomban", "Itáliában", "Angliában"], correctOptionIndex: 2 },
  { id: "mcq_1274", category: "world_pre_1848", prompt: "Melyik eszme állította középpontba az egyéni szabadságjogokat?", options: ["Konzervativizmus", "Liberalizmus", "Szocializmus", "Anarchizmus"], correctOptionIndex: 1 },
  { id: "mcq_1275", category: "world_pre_1848", prompt: "Ki írta a „The Wealth of Nations” című művet?", options: ["Adam Smith", "David Ricardo", "John Locke", "Edmund Burke"], correctOptionIndex: 0 },
  { id: "mcq_1276", category: "world_pre_1848", prompt: "Melyik gondolkodó kapcsolódik a természetes jogok és a beleegyezés elméletéhez?", options: ["Herder", "Mazzini", "John Locke", "Edmund Burke"], correctOptionIndex: 2 },
  { id: "mcq_1277", category: "world_pre_1848", prompt: "Melyik társadalmi réteg volt a liberalizmus tipikus bázisa?", options: ["Jobbágyság", "Városi polgárság", "Földnélküli parasztság", "Udvari nemesség"], correctOptionIndex: 1 },
  { id: "mcq_1278", category: "world_pre_1848", prompt: "Mi segítette különösen a nacionalizmus terjedését a 18. század vége és a 19. század során?", options: ["A keresztes hadjáratok", "A napóleoni háborúk", "A nagy földrajzi felfedezések", "A reformáció"], correctOptionIndex: 1 },
  { id: "mcq_1279", category: "world_pre_1848", prompt: "Melyik gondolkodó hangsúlyozta a nyelv és a népi kultúra szerepét a nemzetfelfogásban?", options: ["Montesquieu", "Herder", "Burke", "Ricardo"], correctOptionIndex: 1 },
  { id: "mcq_1280", category: "world_pre_1848", prompt: "Melyik állítás illik a konzervativizmushoz?", options: ["A gyors és erőszakos átalakulás támogatása", "A hagyományos intézmények teljes felszámolása", "A fokozatosság és a hagyomány tisztelete", "Az állam teljes megszüntetése"], correctOptionIndex: 2 },
  { id: "mcq_1281", category: "world_pre_1848", prompt: "Melyik találmány tartozik az első ipari forradalom textilipari újításai közé?", options: ["Gőzhajó", "Repülő vetélő", "Távíró", "Belső égésű motor"], correctOptionIndex: 1 },
  { id: "mcq_1282", category: "world_pre_1848", prompt: "Melyik országban indult meg először az I. ipari forradalom?", options: ["Franciaországban", "Németországban", "Nagy-Britanniában", "Oroszországban"], correctOptionIndex: 2 },
  { id: "mcq_1283", category: "world_pre_1848", prompt: "Mi volt a Newcomen-féle gőzgép fő feladata?", options: ["Szövés", "Bányavíz szivattyúzása", "Vasútvontatás", "Gőzhajók hajtása"], correctOptionIndex: 1 },
  { id: "mcq_1284", category: "world_pre_1848", prompt: "Miért vált a gőzgép kulcsfontosságúvá?", options: ["Mert megszüntette a munkamegosztást", "Mert leválasztotta a termelést a folyók és a szél korlátairól", "Mert kiváltotta az összes kézi munkát", "Mert megszüntette a városiasodást"], correctOptionIndex: 1 },
  { id: "mcq_1285", category: "world_pre_1848", prompt: "Kihez köthető a „Blücher” mozdony?", options: ["Robert Fulton", "George Stephenson", "James Watt", "David Ricardo"], correctOptionIndex: 1 },
  { id: "mcq_1286", category: "world_pre_1848", prompt: "Kihez köthető a Clermont gőzhajó?", options: ["James Watt", "George Stephenson", "Robert Fulton", "Adam Smith"], correctOptionIndex: 2 },
  { id: "mcq_1287", category: "world_pre_1848", prompt: "Mi jellemezte az ipari forradalom nyomán kialakuló gyári munkát?", options: ["Saját tempóban végzett háziipari termelés", "Munkaidő-fegyelem és felügyelet", "Csak szezonális munka", "Kizárólag mezőgazdasági jelleg"], correctOptionIndex: 1 },
  { id: "mcq_1288", category: "world_pre_1848", prompt: "Mi lett a gépesítés egyik társadalmi következménye?", options: ["A céhek megerősödése", "A gépromboló mozgalmak megjelenése", "A jobbágyság visszaállítása", "A nemzeti egység létrejötte"], correctOptionIndex: 1 },
  { id: "mcq_1289", category: "world_pre_1848", prompt: "Melyik közlekedési fejlesztés kapcsolódik 1761-hez?", options: ["Liverpool–Manchester vasút", "Bridgewater-csatorna", "Stockton–Darlington vasút", "Clermont gőzhajó"], correctOptionIndex: 1 },
  { id: "mcq_1290", category: "world_pre_1848", prompt: "Mit eredményezett a vasút és a gőzhajó elterjedése?", options: ["A piacok időbeli összezsugorodását", "A pénzforgalom megszűnését", "A kéziipar teljes eltűnését", "A városok elnéptelenedését"], correctOptionIndex: 0 },
  { id: "mcq_1291", category: "world_pre_1848", prompt: "Melyik csoport érdekeit képviselték később a szakszervezetek?", options: ["Főnemesség", "Munkásság", "Papság", "Királyi udvar"], correctOptionIndex: 1 },
  { id: "mcq_1292", category: "world_pre_1848", prompt: "Melyik államfeladat szerepel Adam Smith felsorolásában?", options: ["A teljes gazdaság központi irányítása", "Közjavak és közmunkák biztosítása", "A céhek kötelező fenntartása", "A külkereskedelem teljes tiltása"], correctOptionIndex: 1 },
  { id: "mcq_1293", category: "world_pre_1848", prompt: "Melyik fogalom kapcsolódik a piac önszabályozó működésének leírásához Smithnél?", options: ["Szent szövetség", "Láthatatlan kéz", "Társadalmi szerződés", "Népfelség"], correctOptionIndex: 1 },
  { id: "mcq_1294", category: "world_pre_1848", prompt: "Melyik gondolkodó kapcsolódik a természetes jogokhoz és az ellenállás jogához?", options: ["Montesquieu", "John Locke", "Rousseau", "Adam Smith"], correctOptionIndex: 1 },
  { id: "mcq_1295", category: "world_pre_1848", prompt: "Ki hangsúlyozta a hatalmi ágak szétválasztását?", options: ["Rousseau", "John Locke", "Montesquieu", "Lafayette"], correctOptionIndex: 2 },
  { id: "mcq_1296", category: "world_pre_1848", prompt: "Kinél központi fogalom a közakarat?", options: ["Rousseau", "Smith", "Locke", "Jefferson"], correctOptionIndex: 0 },
  { id: "mcq_1297", category: "world_pre_1848", prompt: "Ki a modern közgazdaságtan egyik alapítója?", options: ["Voltaire", "Adam Smith", "Montesquieu", "Washington"], correctOptionIndex: 1 },
  { id: "mcq_1298", category: "world_pre_1848", prompt: "Melyik kifejezéssel írta le Smith a piaci koordinációt?", options: ["vasfüggöny", "láthatatlan kéz", "szent szövetség", "társadalmi szerződés"], correctOptionIndex: 1 },
  { id: "mcq_1299", category: "world_pre_1848", prompt: "Mit jelent a népszuverenitás elve?", options: ["A királytól ered minden hatalom", "A nemességtől ered minden hatalom", "A politikai hatalom végső forrása a nép", "Az egyház a főhatalom forrása"], correctOptionIndex: 2 },
  { id: "mcq_1300", category: "world_pre_1848", prompt: "Melyik államforma jött létre Franciaországban a nyilatkozat nyomán?", options: ["köztársaság", "alkotmányos monarchia", "abszolút monarchia", "császárság"], correctOptionIndex: 1 },
  { id: "mcq_1301", category: "world_pre_1848", prompt: "Mikor fogadták el az Emberi és Polgári Jogok Nyilatkozatát?", options: ["1776. július 4.", "1787", "1789. augusztus 26.", "1689"], correctOptionIndex: 2 },
  { id: "mcq_1302", category: "world_pre_1848", prompt: "Melyik jog NEM szerepel a nyilatkozat alapelvei között?", options: ["szabadság", "tulajdon", "biztonság", "jobbágyság"], correctOptionIndex: 3 },
  { id: "mcq_1303", category: "world_pre_1848", prompt: "Mit mond ki az ártatlanság vélelme?", options: ["Mindenki bűnös, amíg ellenkezője be nem bizonyosodik", "A vádlott vallomása a legfontosabb", "Mindenki ártatlannak tekintendő, amíg bűnösségét meg nem állapítják", "Csak nemesekre vonatkozik"], correctOptionIndex: 2 },
  { id: "mcq_1304", category: "world_pre_1848", prompt: "Melyik testület adja a brit rendszerben a demokratikus legitimitást?", options: ["Felsőház", "Alsóház", "Királyi tanács", "Bíróság"], correctOptionIndex: 1 },
  { id: "mcq_1305", category: "world_pre_1848", prompt: "Kinek a kezében van a tényleges végrehajtó hatalom a brit rendszerben?", options: ["az uralkodó kezében", "a lordok kezében", "a kormány kezében", "a bíróság kezében"], correctOptionIndex: 2 },
  { id: "mcq_1306", category: "world_pre_1848", prompt: "Ki irányítja a brit kormányt?", options: ["kancellár", "miniszterelnök", "lordkancellár", "házelnök"], correctOptionIndex: 1 },
  { id: "mcq_1307", category: "world_pre_1848", prompt: "Melyik ház dönt általában a kormány sorsáról Nagy-Britanniában?", options: ["Felsőház", "Királyi udvar", "Alsóház", "Legfelsőbb Bíróság"], correctOptionIndex: 2 },
  { id: "mcq_1308", category: "world_pre_1848", prompt: "Mit jelent a felelős kormány elve?", options: ["A kormány csak a királynak felel", "A kormány a parlamentnek tartozik politikai felelősséggel", "A kormány nem váltható le", "A kormányt a bíróság nevezi ki"], correctOptionIndex: 1 },
  { id: "mcq_1309", category: "world_pre_1848", prompt: "Melyik esemény kapcsolódik 1688-hoz?", options: ["az amerikai alkotmány elfogadása", "a dicsőséges forradalom", "a francia nyilatkozat elfogadása", "a párizsi béke"], correctOptionIndex: 1 },
  { id: "mcq_1310", category: "world_pre_1848", prompt: "Mit kifogásoltak leginkább a 13 gyarmat lakói?", options: ["túl kevés brit katona volt jelen", "adóztatás képviselet nélkül", "túl nagy önállóságuk volt", "nem kereskedhettek Európával"], correctOptionIndex: 1 },
  { id: "mcq_1311", category: "world_pre_1848", prompt: "Melyik szerv vette át a közös fellépés irányítását az amerikai háború alatt?", options: ["Parlament", "Kontinentális Kongresszus", "Szenátus", "Legfelsőbb Bíróság"], correctOptionIndex: 1 },
  { id: "mcq_1312", category: "world_pre_1848", prompt: "Mikor zárult le a függetlenségi háború a párizsi békével?", options: ["1775", "1776", "1783", "1787"], correctOptionIndex: 2 },
  { id: "mcq_1313", category: "world_pre_1848", prompt: "Kihez kötik a Függetlenségi nyilatkozatot?", options: ["George Washington", "Thomas Jefferson", "Benjamin Franklin", "John Adams"], correctOptionIndex: 1 },
  { id: "mcq_1314", category: "world_pre_1848", prompt: "Mi a Függetlenségi nyilatkozat?", options: ["az Egyesült Államok első költségvetése", "írott alkotmány", "politikai-jogi indokolás az elszakadásra", "békeszerződés Angliával"], correctOptionIndex: 2 },
  { id: "mcq_1315", category: "world_pre_1848", prompt: "Melyik évből származik az amerikai alkotmány?", options: ["1776", "1783", "1787", "1789"], correctOptionIndex: 2 },
  { id: "mcq_1316", category: "world_pre_1848", prompt: "Ki áll az amerikai végrehajtó hatalom élén?", options: ["a miniszterelnök", "a király", "az elnök", "a szenátus elnöke"], correctOptionIndex: 2 },
  { id: "mcq_1317", category: "world_pre_1848", prompt: "Milyen a törvényhozás az Egyesült Államokban?", options: ["egy kamarás", "három kamarás", "kétkamarás", "nincs törvényhozás"], correctOptionIndex: 2 },
  { id: "mcq_1318", category: "world_pre_1848", prompt: "Mit jelent a protestáns kifejezés?", options: ["A katolikus papok gyűjtőneve", "Az új hitújító irányzatok követőinek gyűjtőneve", "A keleti egyházak összefoglaló neve", "Csak a reformátusok megnevezése"], correctOptionIndex: 1 },
  { id: "mcq_1319", category: "world_pre_1848", prompt: "Kinek a tanításait követik az evangélikusok?", options: ["Kálvin Jánosét", "Loyolai Szent Ignácét", "Luther Mártonét", "Pázmány Péterét"], correctOptionIndex: 2 },
  { id: "mcq_1320", category: "world_pre_1848", prompt: "Mi a predesztináció?", options: ["A pápaválasztás rendje", "Az, hogy az ember sorsa előre el van döntve Isten által", "A papok nőtlensége", "A búcsúcédulák árusítása"], correctOptionIndex: 1 },
  { id: "mcq_1321", category: "world_pre_1848", prompt: "Hol terjedt el leginkább az unitárius irányzat Magyarországon?", options: ["Dunántúlon", "Felvidéken", "Erdélyben", "Délvidéken"], correctOptionIndex: 2 },
  { id: "mcq_1322", category: "world_pre_1848", prompt: "Melyik város volt a kálvini irányzat legfontosabb központja?", options: ["Pozsony", "Debrecen", "Kolozsvár", "Esztergom"], correctOptionIndex: 1 },
  { id: "mcq_1323", category: "world_pre_1848", prompt: "Mi váltott ki tömeges igényt a változásra a reformáció előtt?", options: ["A keresztes hadjáratok kudarca", "A búcsúcédulák árusítása és az egyházi visszaélések", "A jobbágyfelszabadítás", "A török hódítás megszűnése"], correctOptionIndex: 1 },
  { id: "mcq_1324", category: "world_pre_1848", prompt: "Mit tekintett Luther a vallási tanítás legfőbb alapjának?", options: ["A pápai bullákat", "A zsinati határozatokat", "A Szentírást", "A szentek legendáit"], correctOptionIndex: 2 },
  { id: "mcq_1325", category: "world_pre_1848", prompt: "Luther szerint mi üdvözíti az embert?", options: ["A jócselekedetek és az adományok", "A hit", "A szerzetesi élet", "A búcsúcédula"], correctOptionIndex: 1 },
  { id: "mcq_1326", category: "world_pre_1848", prompt: "Melyik állítás igaz Luther tanítására?", options: ["Kötelezőnek tartotta a papi nőtlenséget", "Mind a hét szentséget elfogadta", "A papok is házasodhatnak", "Csak latin nyelvű istentiszteletet támogatott"], correctOptionIndex: 2 },
  { id: "mcq_1327", category: "world_pre_1848", prompt: "Ki bontakoztatta ki Genfben a reformáció második nagy irányzatát?", options: ["Luther Márton", "VIII. Henrik", "Loyolai Szent Ignác", "Kálvin János"], correctOptionIndex: 3 },
  { id: "mcq_1328", category: "world_pre_1848", prompt: "Kálvin tanítása szerint ki irányítsa az egyházat?", options: ["Csak a pápa", "Lelkészek és presbiterek együtt", "Kizárólag világi uralkodók", "Szerzetesrendek"], correctOptionIndex: 1 },
  { id: "mcq_1329", category: "world_pre_1848", prompt: "Mivel kapcsolódott össze szorosan a reformáció terjedése a kulturális hatások között?", options: ["A könyvnyomtatással", "A gőzgéppel", "A tengeri hajózással", "A céhrendszerrel"], correctOptionIndex: 0 },
  { id: "mcq_1330", category: "world_pre_1848", prompt: "Mi volt a magyar reformáció egyik nagy kulturális eredménye?", options: ["A Halotti beszéd", "A Vizsolyi Biblia", "A Pragmatica Sanctio", "Az Aranybulla"], correctOptionIndex: 1 },
  { id: "mcq_1331", category: "world_pre_1848", prompt: "Ki alapította a jezsuita rendet?", options: ["Luther Márton", "Pázmány Péter", "Loyolai Szent Ignác", "Kálvin János"], correctOptionIndex: 2 },
  { id: "mcq_1332", category: "world_pre_1848", prompt: "Mi volt a jezsuiták egyik legfontosabb feladata a reformáció korában?", options: ["Jobbágytelkek felmérése", "Iskolák és kollégiumok alapítása", "Városfalak építése", "Tengeri kereskedelem szervezése"], correctOptionIndex: 1 },
  { id: "mcq_1333", category: "world_pre_1848", prompt: "Mi volt a tridenti zsinat legfontosabb szerepe?", options: ["A protestáns egyházak egyesítése", "A katolikus tanok megerősítése és reformok bevezetése", "Az anglikán egyház elismerése", "A keresztes hadjáratok újraindítása"], correctOptionIndex: 1 },
  { id: "mcq_1334", category: "world_pre_1848", prompt: "Melyik országban zajlottak a hugenottákkal kapcsolatos vallásháborúk?", options: ["Németalföldön", "Spanyolországban", "Franciaországban", "Angliában"], correctOptionIndex: 2 },
  { id: "mcq_1335", category: "world_pre_1848", prompt: "Mit rendezett átmenetileg az 1555-ös augsburgi vallásbéke?", options: ["A katolikusok és a lutheránusok viszonyát", "A pápák és császárok vitáját", "Az ortodoxok és katolikusok ellentétét", "A magyar rendek jogait"], correctOptionIndex: 0 },
  { id: "mcq_1336", category: "world_pre_1848", prompt: "Melyik háború tört ki 1618-ban?", options: ["A spanyol örökösödési háború", "A harmincéves háború", "A hétéves háború", "A nagy északi háború"], correctOptionIndex: 1 },
  { id: "mcq_1337", category: "world_pre_1848", prompt: "Mi zárta le Franciaországban a vallásháborúkat?", options: ["Az augsburgi vallásbéke", "A wormsi ediktum", "A nantes-i ediktum", "A vesztfáliai béke"], correctOptionIndex: 2 },
  { id: "mcq_1338", category: "world_pre_1848", prompt: "Melyik békét tekintik a korszak nagy európai lezárásának?", options: ["Augsburgi vallásbéke", "Nantes-i ediktum", "Vesztfáliai béke", "Tordesillasi szerződés"], correctOptionIndex: 2 },
  { id: "mcq_1339", category: "world_pre_1848", prompt: "Hol tudott főleg előrehaladni a magyar rekatolizáció?", options: ["Erdélyben", "Királyi Magyarországon", "A hódoltság területén", "A Székelyföldön"], correctOptionIndex: 1 },
  { id: "mcq_1340", category: "world_pre_1848", prompt: "Ki volt a magyar rekatolizáció legfontosabb alakja?", options: ["Bocskai István", "Bethlen Gábor", "Pázmány Péter", "Apáczai Csere János"], correctOptionIndex: 2 },
  { id: "mcq_1341", category: "world_pre_1848", prompt: "Mi Pázmány Péter leghíresebb műve?", options: ["Institutio Christianae Religionis", "Isteni igazságra vezérlő kalauz", "95 pont", "Szigeti veszedelem"], correctOptionIndex: 1 },
  { id: "mcq_1342", category: "world_pre_1848", prompt: "Hol alapított Pázmány Péter szemináriumot 1619-ben?", options: ["Kassán", "Pozsonyban", "Nagyszombaton", "Egerben"], correctOptionIndex: 2 },
  { id: "mcq_1343", category: "world_pre_1848", prompt: "Mit alapított Pázmány Péter 1635-ben?", options: ["A debreceni kollégiumot", "A nagyszombati egyetemet", "A pozsonyi országgyűlést", "A református zsinatot"], correctOptionIndex: 1 },
  { id: "mcq_1344", category: "world_pre_1848", prompt: "Melyik uralkodó türelmi rendelete könnyítette meg 1781-ben a protestánsok helyzetét?", options: ["Mária Terézia", "II. József", "I. Lipót", "III. Károly"], correctOptionIndex: 1 },
  { id: "mcq_1345", category: "world_pre_1848", prompt: "Melyik művészeti stílus kapcsolódik a katolikus megújuláshoz?", options: ["Román", "Gótikus", "Barokk", "Reneszánsz"], correctOptionIndex: 2 },
  { id: "mcq_1346", category: "world_pre_1848", prompt: "Melyik NEM jellemző a barokkra?", options: ["Monumentalitás", "Gazdag díszítettség", "Illúziókeltés", "Szigorú puritán egyszerűség"], correctOptionIndex: 3 },
  { id: "mcq_1347", category: "world_pre_1848", prompt: "Melyik magyarországi épület szerepel a barokk példái között?", options: ["Jáki templom", "Nagyszombati székesegyház", "Lébényi templom", "Pécsi székesegyház román kori formában"], correctOptionIndex: 1 },
  { id: "mcq_1348", category: "world_pre_1848", prompt: "Mi volt a földrajzi felfedezések egyik legfontosabb gazdasági célja?", options: ["Új európai fővárosok alapítása", "Olcsóbb tengeri út keresése Ázsiába", "Afrika teljes meghódítása", "Az amerikai indián birodalmak szövetségbe kényszerítése"], correctOptionIndex: 1 },
  { id: "mcq_1349", category: "world_pre_1848", prompt: "Ki támogatta Afrika nyugati partvidékének rendszeres feltárását?", options: ["Kolumbusz Kristóf", "Tengerész Henrik", "Vasco da Gama", "Magellán"], correctOptionIndex: 1 },
  { id: "mcq_1350", category: "world_pre_1848", prompt: "Melyik hajótípus segítette különösen a hosszú tengeri utakat?", options: ["Gálya", "Karakk", "Karavella", "Trirém"], correctOptionIndex: 2 },
  { id: "mcq_1351", category: "world_pre_1848", prompt: "Melyik eszköz tette megbízhatóbbá a nyílt tengeri tájékozódást?", options: ["Asztrolábium", "Vízimalom", "Nehézeke", "Nyomdagép"], correctOptionIndex: 0 },
  { id: "mcq_1352", category: "world_pre_1848", prompt: "Ki indult nyugat felé Ázsia elérése céljából, de Amerikát érte el?", options: ["Bartolomeu Dias", "Kolumbusz Kristóf", "Cabral", "Balboa"], correctOptionIndex: 1 },
  { id: "mcq_1353", category: "world_pre_1848", prompt: "Melyik szerződés osztotta fel a felfedezésre váró Európán kívüli területeket Spanyolország és Portugália között?", options: ["Westfáliai béke", "Tordesillasi szerződés", "Verduni szerződés", "Zaragozai szerződés"], correctOptionIndex: 1 },
  { id: "mcq_1354", category: "world_pre_1848", prompt: "Miért volt fontos a zaragozai szerződés?", options: ["Rögzítette a keleti határvonalat a Csendes-óceán térségében", "Felosztotta Európát a Habsburgok és a franciák között", "Lezárta a százéves háborút", "Engedélyezte a rabszolgaság eltörlését"], correctOptionIndex: 0 },
  { id: "mcq_1355", category: "world_pre_1848", prompt: "Mi a tőke a korai kapitalizmusban?", options: ["Csak földbirtok", "Felhalmozott vagyon, amit profit reményében újra befektetnek", "Kizárólag készpénz", "Csak állami adóbevétel"], correctOptionIndex: 1 },
  { id: "mcq_1356", category: "world_pre_1848", prompt: "Miért volt szükség bankokra a távolsági kereskedelemben?", options: ["Mert a céhek megtiltották a készpénz használatát", "Mert a hajóutak költségeit előre kellett finanszírozni", "Mert a parasztok nem használhattak pénzt", "Mert csak a bankok építhettek hajókat"], correctOptionIndex: 1 },
  { id: "mcq_1357", category: "world_pre_1848", prompt: "Mit adtak-vettek a tőzsdén a korai kapitalizmusban?", options: ["Csak gabonát", "Csak nemesfémeket", "Jogokat és ígéreteket is, például részvényeket", "Kizárólag földbirtokokat"], correctOptionIndex: 2 },
  { id: "mcq_1358", category: "world_pre_1848", prompt: "Melyik város vált a korai kapitalizmus egyik legfontosabb központjává?", options: ["Athén", "Amszterdam", "Moszkva", "Konstantinápoly"], correctOptionIndex: 1 },
  { id: "mcq_1359", category: "world_pre_1848", prompt: "Mi jött létre a céhek helyett a korai kapitalizmus időszakában?", options: ["Kolostorok", "Manufaktúrák", "Vármegyék", "Lovagrendek"], correctOptionIndex: 1 },
  { id: "mcq_1360", category: "world_pre_1848", prompt: "Milyen társadalmi réteg erősödött meg a korai kapitalizmusban?", options: ["Jobbágyság", "Polgárság", "Rabszolgák", "Papság"], correctOptionIndex: 1 },
  { id: "mcq_1361", category: "world_pre_1848", prompt: "Kit tekint a zsidó vallási hagyomány az egyik ősatyának?", options: ["Mózes", "Ábrahám", "Salamon", "Józsue"], correctOptionIndex: 1 },
  { id: "mcq_1362", category: "world_pre_1848", prompt: "Ki vezette ki a zsidókat Egyiptomból a bibliai hagyomány szerint?", options: ["Ábrahám", "Dávid", "Mózes", "Saul"], correctOptionIndex: 2 },
  { id: "mcq_1363", category: "world_pre_1848", prompt: "Hol kapta Mózes a hagyomány szerint a Tízparancsolatot?", options: ["Olümposz hegyén", "Sínai-hegynél", "Capitoliumon", "Golgotán"], correctOptionIndex: 1 },
  { id: "mcq_1364", category: "world_pre_1848", prompt: "Mit jelent a diaszpóra kifejezés a zsidóság történetében?", options: ["Az egyiptomi rabszolgaságot", "A nép szétszóródását idegen területeken", "A római polgárjog megszerzését", "A papi tisztség öröklését"], correctOptionIndex: 1 },
  { id: "mcq_1365", category: "world_pre_1848", prompt: "Melyik vallási szöveg áll a zsidó vallás tanításainak középpontjában?", options: ["Tóra", "Iliász", "Korán", "Újszövetség"], correctOptionIndex: 0 },
  { id: "mcq_1366", category: "world_pre_1848", prompt: "Melyik a zsidó vallás legismertebb jelképe?", options: ["Menóra", "Tfilin", "Kereszt", "Dávid-csillag"], correctOptionIndex: 3 },
  { id: "mcq_1367", category: "world_pre_1848", prompt: "Melyik tárgy a hétágú gyertyatartó a zsidó vallásban?", options: ["Mezüzé", "Tálesz", "Hanukai gyertyatartó", "Menóra"], correctOptionIndex: 3 },
  { id: "mcq_1368", category: "world_pre_1848", prompt: "Mit erősítenek az ajtófélfára a zsidó vallásban Isten parancsaira emlékeztető tárgyként?", options: ["Mezüzét", "Kariatidát", "Fórumot", "Kupolát"], correctOptionIndex: 0 },
  { id: "mcq_1369", category: "world_pre_1848", prompt: "Mit fejez ki a kipa viselése a zsidó vallásban?", options: ["A császár iránti hűséget", "Az Isten iránti tiszteletet", "A katonai rangot", "A papi adófizetést"], correctOptionIndex: 1 },
  { id: "mcq_1370", category: "world_pre_1848", prompt: "Melyik állítás fejezi ki a zsidó monoteizmus lényegét?", options: ["Több isten uralja a világot", "Az istenek közül Jahve a legerősebb", "Egyetlen Isten létezik", "Az uralkodó is isten"], correctOptionIndex: 2 },
  { id: "mcq_1371", category: "world_pre_1848", prompt: "Melyik nap a zsidó vallás szent pihenőnapja?", options: ["Vasárnap", "Hétfő", "Péntek", "Szombat, vagyis a sabbat"], correctOptionIndex: 3 },
  { id: "mcq_1372", category: "world_pre_1848", prompt: "Hol jelent meg a kereszténység az I. században?", options: ["Itáliában", "Júdeában", "Hispániában", "Egyiptomban"], correctOptionIndex: 1 },
  { id: "mcq_1373", category: "world_pre_1848", prompt: "A kereszténység eredetileg minek indult?", options: ["Római államvallásnak", "Görög filozófiai iskolának", "Perzsa misztériumvallásnak", "A zsidóságon belüli mozgalomnak"], correctOptionIndex: 3 },
  { id: "mcq_1374", category: "world_pre_1848", prompt: "Kinek az életéből és tanításaiból született meg az első keresztény közösség?", options: ["Jézusnak", "Augustusnak", "Pálnak", "Theodosiusnak"], correctOptionIndex: 0 },
  { id: "mcq_1375", category: "world_pre_1848", prompt: "Hol született Jézus a keresztény hagyomány szerint?", options: ["Betlehemben", "Rómában", "Názáretben", "Jeruzsálemben"], correctOptionIndex: 0 },
  { id: "mcq_1376", category: "world_pre_1848", prompt: "Ki volt Jézus anyja a keresztény hagyomány szerint?", options: ["Mária Magdolna", "Szűz Mária", "Erzsébet", "Lea"], correctOptionIndex: 1 },
  { id: "mcq_1377", category: "world_pre_1848", prompt: "Körülbelül hány éves korában kezdte meg Jézus nyilvános tanítói tevékenységét?", options: ["Tizenkét évesen", "Húszévesen", "Negyvenévesen", "Harmincéves kora körül"], correctOptionIndex: 3 },
  { id: "mcq_1378", category: "world_pre_1848", prompt: "Hány apostolt választott maga mellé Jézus az eredeti tanítványi körben?", options: ["Hetet", "Tízet", "Tizenkettőt", "Hetvenkettőt"], correctOptionIndex: 2 },
  { id: "mcq_1379", category: "world_pre_1848", prompt: "Melyik személyt nevezték később apostolnak, bár nem tartozott az eredeti tizenkettőhöz?", options: ["Pétert", "Pált", "Andrást", "Jánost"], correctOptionIndex: 1 },
  { id: "mcq_1380", category: "world_pre_1848", prompt: "Melyik tanítás tartozik Jézus fő tanításai közé?", options: ["A gazdagság mindenekfelettisége", "A bosszú kötelessége", "Az ellenség szeretete és a megbocsátás", "A császár isteni mivolta"], correctOptionIndex: 2 },
  { id: "mcq_1381", category: "world_pre_1848", prompt: "Melyik városból indult el először a kereszténység terjedése?", options: ["Alexandria", "Róma", "Antiochia", "Jeruzsálem"], correctOptionIndex: 3 },
  { id: "mcq_1382", category: "world_pre_1848", prompt: "Melyik tényező segítette a kereszténység terjedését a Római Birodalomban?", options: ["A kötelező állami térítés", "A birodalom útjai és a viszonylagos biztonság", "A görög templomok bezárása", "A zsidó állam katonai ereje"], correctOptionIndex: 1 },
  { id: "mcq_1383", category: "world_pre_1848", prompt: "Mi volt a páli fordulat egyik legfontosabb eleme?", options: ["A kereszténység visszatérése a római istenekhez", "A császárkultusz elfogadása", "A pogányoknak nem kellett előbb zsidóvá válniuk", "A kereszténység kizárólag a zsidóknak szólt"], correctOptionIndex: 2 },
  { id: "mcq_1384", category: "world_pre_1848", prompt: "Melyik kijelentés fejezi ki legjobban a kereszténység egyik központi hittételét?", options: ["Jézus kereszthalálával megváltotta az emberiséget a bűntől", "A lélek nem él tovább a halál után", "Csak a papi rend üdvözülhet", "Az üdvösség feltétele a római polgárjog"], correctOptionIndex: 0 },
  { id: "mcq_1385", category: "world_pre_1848", prompt: "Miben hisznek a keresztények Jézussal kapcsolatban?", options: ["Hogy csak bölcs uralkodó volt", "Hogy kizárólag próféta volt", "Hogy Isten fia és az emberiség megváltója", "Hogy a római szenátus tagja volt"], correctOptionIndex: 2 },
  { id: "mcq_1386", category: "world_pre_1848", prompt: "Hol jegyezték le Jézus tanításait a jegyzet szerint?", options: ["A Tórában", "A Hammurapi-törvényoszlopon", "A Koránban", "Az Újszövetségben"], correctOptionIndex: 3 },
  { id: "mcq_1387", category: "world_pre_1848", prompt: "Miért tartották veszélyesnek a keresztényeket sok római szemében?", options: ["Nem áldoztak a római isteneknek és a császárkultusznak", "Nem fizettek adót a zsinagógának", "Le akarták bontani az aquaeductusokat", "Megtiltották a hadsereg működését"], correctOptionIndex: 0 },
  { id: "mcq_1388", category: "world_pre_1848", prompt: "Ki használta bűnbakként a keresztényeket a Kr. u. 64-es római tűzvész után?", options: ["Augustus", "Theodosius", "Nero", "Hadrianus"], correctOptionIndex: 2 },
  { id: "mcq_1389", category: "world_pre_1848", prompt: "Melyik császár követelt birodalomszerte áldozatbemutatást a keresztényüldözések idején?", options: ["Constantinus", "Decius", "Traianus", "Titus"], correctOptionIndex: 1 },
  { id: "mcq_1390", category: "world_pre_1848", prompt: "Melyik uralkodópároshoz köthető a 303-ban induló legsúlyosabb keresztényüldözés?", options: ["Nero és Augustus", "Constantinus és Licinius", "Szolón és Kleiszthenész", "Diocletianus és Galerius"], correctOptionIndex: 3 },
  { id: "mcq_1391", category: "world_pre_1848", prompt: "Melyik állítás igaz a keresztényüldözésekre a Római Birodalomban?", options: ["Folyamatosan, megszakítás nélkül zajlottak", "Csak a birodalom nyugati felében történtek", "Hullámzóak voltak, békésebb időszakokkal", "Kizárólag Jeruzsálemre korlátozódtak"], correctOptionIndex: 2 },
  { id: "mcq_1392", category: "world_pre_1848", prompt: "Ki adott ki 311-ben türelmi rendeletet, amely leállította az üldözést a birodalom keleti részén?", options: ["Licinius", "Theodosius", "Galerius", "Péter apostol"], correctOptionIndex: 2 },
  { id: "mcq_1393", category: "world_pre_1848", prompt: "Melyik rendelethez kapcsolódik a 313-as vallási türelem és az egyházi javak visszaadása?", options: ["A milánói ediktumhoz", "A wormsi konkordátumhoz", "Az aranybullához", "A tübingeni szerződéshez"], correctOptionIndex: 0 },
  { id: "mcq_1394", category: "world_pre_1848", prompt: "Kivel együtt adta ki Nagy Konstantin a milánói ediktumot?", options: ["Diocletianusszal", "Liciniusszal", "Neróval", "Deciusszal"], correctOptionIndex: 1 },
  { id: "mcq_1395", category: "world_pre_1848", prompt: "Melyik uralkodó idején lett 380-ban a kereszténység a birodalom vallása?", options: ["I. Theodosius", "Julius Caesar", "Augustus", "Marcus Aurelius"], correctOptionIndex: 0 },
  { id: "mcq_1396", category: "world_pre_1848", prompt: "Mit hangsúlyozott leginkább a páli fordulat?", options: ["A mózesi törvény minden pontjának kötelező betartását", "A római istenek tiszteletét", "A zsidó származás elsőbbségét", "A Krisztusba vetett hit elsődlegességét"], correctOptionIndex: 3 },
  { id: "mcq_1397", category: "world_pre_1848", prompt: "Melyik város volt a kereszténység egyik későbbi erős központja?", options: ["Karthágó", "Spárta", "Alexandria", "Babilon"], correctOptionIndex: 2 },
  { id: "mcq_1398", category: "world_pre_1848", prompt: "Melyik tisztség nem szerepel a korai keresztény közösségek vezetői között a jegyzetben?", options: ["Püspök", "Presbiter", "Archón", "Diakónus"], correctOptionIndex: 2 },
  { id: "mcq_1399", category: "world_pre_1848", prompt: "Mi tette sok ember szemében hitelessé a kereszténységet a terjedése idején?", options: ["A vértanúk kitartása", "A gladiátorjátékok támogatása", "A császári hadsereg védelme", "A szenátus kötelező tagsága"], correctOptionIndex: 0 },
  { id: "mcq_1400", category: "world_pre_1848", prompt: "Melyik állítás írja le helyesen a páli fordulat egyik következményét?", options: ["A kereszténység visszaolvadt a zsidó vallásba", "A kereszténység kizárólag Júdeában maradt", "A kereszténység önálló világvallássá vált", "A kereszténység elvesztette egyistenhitét"], correctOptionIndex: 2 },
  { id: "mcq_1401", category: "world_pre_1848", prompt: "Kik uralkodtak Athénban az államszervezet fejlődésének elején?", options: ["Metoikoszok", "Rabszolgák", "Arisztokraták", "Sztratégoszok"], correctOptionIndex: 2 },
  { id: "mcq_1402", category: "world_pre_1848", prompt: "Mi történhetett Athénban azzal, aki nem tudta visszafizetni az adósságát?", options: ["Azonnal polgárjogot kapott", "Adósrabszolgává válhatott", "Püspökké választották", "Kötelezően katonának állt"], correctOptionIndex: 1 },
  { id: "mcq_1403", category: "world_pre_1848", prompt: "Mi Drakón történelmi jelentősége Athénban?", options: ["Megalapította a déloszi szövetséget", "Bevezette a napidíjat", "Eltörölte a türanniszt", "Leírt, nyilvános törvényeket adott"], correctOptionIndex: 3 },
  { id: "mcq_1404", category: "world_pre_1848", prompt: "Milyen híres kifejezés kapcsolódik Drakón nevéhez?", options: ["Homéroszi eposzok", "Drákói szigor", "Pax Romana", "Hegyi beszéd"], correctOptionIndex: 1 },
  { id: "mcq_1405", category: "world_pre_1848", prompt: "Ki hajtotta végre Athénban a fontos reformokat a Kr. e. 6. század elején?", options: ["Periklész", "Kleiszthenész", "Peiszisztratosz", "Szolón"], correctOptionIndex: 3 },
  { id: "mcq_1406", category: "world_pre_1848", prompt: "Melyik intézkedés tartozik Szolón reformjai közé?", options: ["A cserépszavazás bevezetése", "Az adósrabszolgaság eltörlése", "A császárkultusz bevezetése", "A kupola feltalálása"], correctOptionIndex: 1 },
  { id: "mcq_1407", category: "world_pre_1848", prompt: "Mi alapján osztotta csoportokba Szolón az athéni polgárokat?", options: ["Vallási hovatartozás alapján", "Katonai rang alapján", "Születési hely alapján", "Vagyon alapján"], correctOptionIndex: 3 },
  { id: "mcq_1408", category: "world_pre_1848", prompt: "Ki ragadta magához türannoszként a hatalmat Szolón után Athénban?", options: ["Drakón", "Periklész", "Peiszisztratosz", "Pál apostol"], correctOptionIndex: 2 },
  { id: "mcq_1409", category: "world_pre_1848", prompt: "Melyik állítás igaz Peiszisztratosz uralmára?", options: ["Sok szolóni reformot meghagyott, de rendszere nem volt demokrácia", "Eltörölte Athénban az összes vallási ünnepet", "Megszüntette az építkezéseket", "Felszabadította a metoikoszokat"], correctOptionIndex: 0 },
  { id: "mcq_1410", category: "world_pre_1848", prompt: "Kit tekintenek az athéni demokrácia igazi megalapozójának?", options: ["Kleiszthenészt", "Nerót", "Theodosiust", "Józsefet"], correctOptionIndex: 0 },
  { id: "mcq_1411", category: "world_pre_1848", prompt: "Körülbelül mikor hajtotta végre Kleiszthenész a nagy reformjait?", options: ["Kr. e. 64-ben", "Kr. e. 508–507 körül", "Kr. u. 313-ban", "Kr. u. 380-ban"], correctOptionIndex: 1 },
  { id: "mcq_1412", category: "world_pre_1848", prompt: "Hány új phülét hozott létre Kleiszthenész?", options: ["Hármat", "Ötöt", "Hetet", "Tízet"], correctOptionIndex: 3 },
  { id: "mcq_1413", category: "world_pre_1848", prompt: "Mi volt az ötszázak tanácsának másik neve Athénban?", options: ["Szenátus", "Ekklészia", "Bulé", "Areopágosz-hegy"], correctOptionIndex: 2 },
  { id: "mcq_1414", category: "world_pre_1848", prompt: "Hogyan választották ki sok athéni tisztségviselő esetében a hivatal betöltőit?", options: ["Örökléssel", "Császári kinevezéssel", "Csak vagyon alapján", "Sorsolással"], correctOptionIndex: 3 },
  { id: "mcq_1415", category: "world_pre_1848", prompt: "Mi volt az osztrakiszmosz, vagyis a cserépszavazás célja?", options: ["A templomok építésének finanszírozása", "A túl nagy hatalomra törő személy tíz évre való száműzése", "A hadvezérek élethosszig tartó megválasztása", "A polgárjog kiterjesztése a nőkre"], correctOptionIndex: 1 },
  { id: "mcq_1416", category: "world_pre_1848", prompt: "Mire írták az osztrakiszmosz során leadott szavazatokat?", options: ["Papirusztekercsre", "Érmekre", "Viasztáblára", "Cserépdarabra"], correctOptionIndex: 3 },
  { id: "mcq_1417", category: "world_pre_1848", prompt: "Melyik csoport alkotta Athén lakosságának legnagyobb részét a jegyzet szerint?", options: ["A rabszolgák", "A teljes jogú polgárok", "A metoikoszok", "A papok"], correctOptionIndex: 0 },
  { id: "mcq_1418", category: "world_pre_1848", prompt: "Kik voltak a metoikoszok Athénban?", options: ["Harcedzett hadvezérek", "Bevándorlók, akik gazdaságilag fontosak voltak, de nem kaptak polgárjogot", "Papnők", "Az ötszázak tanácsának tagjai"], correctOptionIndex: 1 },
  { id: "mcq_1419", category: "world_pre_1848", prompt: "Kik számítottak teljes jogú athéni polgárnak?", options: ["A felnőtt férfiak", "Az összes Athénban élő szabad ember", "A nők és férfiak együtt", "Kizárólag a kereskedők"], correctOptionIndex: 0 },
  { id: "mcq_1420", category: "world_pre_1848", prompt: "Körülbelül mekkora részét tették ki a teljes jogú athéni polgárok Athén lakosságának?", options: ["A felét", "Körülbelül egytizedét", "A kétharmadát", "Szinte az egészet"], correctOptionIndex: 1 },
  { id: "mcq_1421", category: "world_pre_1848", prompt: "Mi volt az athéni demokrácia legfontosabb intézménye?", options: ["Bulé", "Népgyűlés, az ekklészia", "Szenátus", "Konklávé"], correctOptionIndex: 1 },
  { id: "mcq_1422", category: "world_pre_1848", prompt: "Milyen típusú demokrácia működött Athénban?", options: ["Képviseleti demokrácia", "Császári demokrácia", "Közvetlen demokrácia", "Papi demokrácia"], correctOptionIndex: 2 },
  { id: "mcq_1423", category: "world_pre_1848", prompt: "Melyik ügyekről döntött a népgyűlés Athénban?", options: ["Csak vallási szertartásokról", "Háborúról, békéről, törvényekről és pénzügyekről is", "Kizárólag építészeti kérdésekről", "Csak a rabszolgák ügyeiről"], correctOptionIndex: 1 },
  { id: "mcq_1424", category: "world_pre_1848", prompt: "Miért választották a hadvezéreket, a sztratégoszokat inkább választással, nem sorsolással?", options: ["Mert katonai ügyekben fontos volt a hozzáértés", "Mert csak arisztokraták lehettek hadvezérek", "Mert a nők jelöltek róluk", "Mert a császár nevezte ki őket"], correctOptionIndex: 0 },
  { id: "mcq_1425", category: "world_pre_1848", prompt: "Ki volt az a befolyásos athéni politikus és hadvezér, akinek idején a demokrácia elérte csúcspontját?", options: ["Periklész", "Drakón", "Galerius", "Ábrahám"], correctOptionIndex: 0 },
  { id: "mcq_1426", category: "world_pre_1848", prompt: "Milyen intézkedés segítette Periklész korában a szegényebb polgárok közéleti részvételét?", options: ["A rabszolgaság teljes eltörlése", "A phülék megszüntetése", "A napidíj bevezetése a hivatalviselésért és bírósági munkáért", "A nők polgárjogának megadása"], correctOptionIndex: 2 },
  { id: "mcq_1427", category: "world_pre_1848", prompt: "Melyik szövetség élén került Athén vezető szerepbe a perzsa háborúk után?", options: ["A déloszi szövetség élén", "A peloponnészoszi szövetség élén", "A latin szövetség élén", "A hanza élén"], correctOptionIndex: 0 },
  { id: "mcq_1428", category: "world_pre_1848", prompt: "Milyen híres építkezést finanszírozott Athén a szövetséges városok pénzéből Periklész korában?", options: ["A Parthenónt", "A Colosseumot", "A Pantheont", "A Pont du Gard-ot"], correctOptionIndex: 0 },
  { id: "mcq_1429", category: "world_pre_1848", prompt: "Melyik csoport volt kizárva az athéni politikai életből?", options: ["A nők, a rabszolgák és az idegenek", "Csak a hadvezérek", "Csak a kézművesek", "Csak a papok"], correctOptionIndex: 0 },
  { id: "mcq_1430", category: "world_pre_1848", prompt: "Periklész polgárjogi szigorítása szerint ki lehetett teljes jogú athéni polgár?", options: ["Bárki, aki Athénban lakott", "Minden szabad férfi a birodalomban", "Csak az, aki katonai szolgálatot teljesített", "Az, akinek mindkét szülője athéni volt"], correctOptionIndex: 3 },
  { id: "mcq_1431", category: "world_pre_1848", prompt: "Melyik szerkezeti megoldás volt a görög építészet alapja?", options: ["Ív és kupola", "Oszlop–gerenda rendszer", "Vasbeton vázas szerkezet", "Üvegfüggönyfal"], correctOptionIndex: 1 },
  { id: "mcq_1432", category: "world_pre_1848", prompt: "Melyik jellemző volt különösen meghatározó a római építészetben?", options: ["Kizárólag a külső arányok számítottak", "Csak templomokat emeltek", "Kerülték a nagy belső tereket", "Bátran alkalmazták az ívet, a boltozatot és a kupolát"], correctOptionIndex: 3 },
  { id: "mcq_1433", category: "world_pre_1848", prompt: "Melyik görög oszloprend a legegyszerűbb és zömökebb hatású?", options: ["Jón", "Korinthoszi", "Dór", "Kompozit"], correctOptionIndex: 2 },
  { id: "mcq_1434", category: "world_pre_1848", prompt: "Melyik görög oszloprend fejezetén láthatók csigavonalak?", options: ["Jón", "Dór", "Toszkán", "Kompozit"], correctOptionIndex: 0 },
  { id: "mcq_1435", category: "world_pre_1848", prompt: "Melyik görög oszloprend a leggazdagabban díszített, akantuszleveles fejezettel?", options: ["Dór", "Jón", "Toszkán", "Korinthoszi"], correctOptionIndex: 3 },
  { id: "mcq_1436", category: "world_pre_1848", prompt: "Melyik építmény a római mérnöki tudás látványos vízvezetékes példája Franciaországban?", options: ["Erekhtheion", "Parthenón", "Pont du Gard", "Hephaiszteion"], correctOptionIndex: 2 },
  { id: "mcq_1437", category: "world_pre_1848", prompt: "Melyik római épület volt a legnagyobb és legismertebb amphitheatrum?", options: ["Pantheon", "Artemisz-templom", "Bulé", "Colosseum"], correctOptionIndex: 3 },
  { id: "mcq_1438", category: "world_pre_1848", prompt: "Nagyjából hány néző számára készült a Colosseum?", options: ["5 000", "10 000", "20 000", "50 000"], correctOptionIndex: 3 },
  { id: "mcq_1439", category: "world_pre_1848", prompt: "Melyik tér volt a római politikai és közéleti élet központja?", options: ["A római fórum", "A déloszi szövetség", "Az osztrakiszmosz", "A menóra"], correctOptionIndex: 0 },
  { id: "mcq_1440", category: "world_pre_1848", prompt: "Melyik római épületet jellemzi egyszerre klasszikus templomhomlokzat és hatalmas belső kupola?", options: ["Colosseum", "Pont du Gard", "Pantheon", "Erekhtheion"], correctOptionIndex: 2 },




  { id: "mcq_1055", category: "world_post_1848", prompt: "Mi volt az európai integráció egyik alapvető célja a második világháború után?", options: ["A gyarmatrendszer helyreállítása", "Az újabb háborúk megelőzése gazdasági összekapcsolással", "A nemzeti valuták megszüntetése minden országban", "Egy közös európai hadsereg azonnali létrehozása"], correctOptionIndex: 1 },
  { id: "mcq_1056", category: "world_post_1848", prompt: "Melyik szervezet számít az integráció első nagy állomásának?", options: ["Európai Parlament", "Európai Szén- és Acélközösség", "Európai Központi Bank", "Schengeni övezet"], correctOptionIndex: 1 },
  { id: "mcq_1057", category: "world_post_1848", prompt: "Melyik szerződés hozta létre hivatalosan a ma ismert Európai Uniót?", options: ["Római Szerződés", "Maastrichti Szerződés", "Lisszaboni Szerződés", "Schengeni Egyezmény"], correctOptionIndex: 1 },
  { id: "mcq_1058", category: "world_post_1848", prompt: "Mi a schengeni rendszer legfontosabb lényege?", options: ["Közös hadsereget hozott létre", "Egységes adórendszert vezetett be", "Eltörölte a belső határellenőrzést a csatlakozott országok között", "Kötelezővé tette az euró használatát"], correctOptionIndex: 2 },
  { id: "mcq_1059", category: "world_post_1848", prompt: "Melyik országcsoport csatlakozott 1995-ben?", options: ["Bulgária, Románia", "Dánia, Írország, Egyesült Királyság", "Ausztria, Finnország, Svédország", "Spanyolország, Portugália"], correctOptionIndex: 2 },
  { id: "mcq_1060", category: "world_post_1848", prompt: "Melyik évben csatlakozott Magyarország az Európai Unióhoz?", options: ["1995", "2004", "2007", "2013"], correctOptionIndex: 1 },
  { id: "mcq_1061", category: "world_post_1848", prompt: "Jelenleg hány tagja van az Európai Uniónak a tananyag szerint?", options: ["25", "26", "27", "28"], correctOptionIndex: 2 },
  { id: "mcq_1062", category: "world_post_1848", prompt: "Mi az EU költségvetésének legnagyobb bevételi forrása?", options: ["Külső vámok", "ÁFA-alapú befizetések", "GNI-alapú befizetések", "Műanyag-befizetések"], correctOptionIndex: 2 },
  { id: "mcq_1063", category: "world_post_1848", prompt: "Melyik tartozik az EU fő kiadásai közé?", options: ["Felzárkóztatás és regionális fejlesztés", "Állandó hadsereg fenntartása", "Kizárólag diplomáciai kiadások", "Tagállami nyugdíjrendszerek finanszírozása"], correctOptionIndex: 0 },
  { id: "mcq_1064", category: "world_post_1848", prompt: "Hogyan indul a legtöbb uniós jogalkotási folyamat?", options: ["Az Európai Parlament önálló törvényjavaslatával", "Az Európai Bizottság javaslatával", "Az Európai Tanács népszavazásával", "Az Európai Központi Bank rendeletével"], correctOptionIndex: 1 },
  { id: "mcq_1065", category: "world_post_1848", prompt: "Mi jellemzi az Európai Tanácsot?", options: ["Tagjai közvetlenül választott EP-képviselők", "A tagállami állam- vagy kormányfők fórumaként a nagy politikai irányt jelöli ki", "Az uniós bírósági ügyekben ítélkezik", "Az euró kamatpolitikájáról dönt"], correctOptionIndex: 1 },
  { id: "mcq_1066", category: "world_post_1848", prompt: "Melyik állítás igaz az Európai Unió Tanácsára?", options: ["Állandó személyi elnöke van 5 évre", "Mindig ugyanazok a miniszterek ülnek benne", "A témától függően a tagállamok illetékes miniszterei vesznek részt benne", "Kizárólag tanácsadó szerepet tölt be"], correctOptionIndex: 2 },
  { id: "mcq_1067", category: "world_post_1848", prompt: "Mit jelent normál esetben a minősített többség az EU Tanácsában?", options: ["A tagállamok fele és a népesség 50%-a", "A tagállamok 55%-a és az EU népességének legalább 65%-a", "Minden tagállam egyhangú támogatása", "Az Európai Parlament abszolút többsége"], correctOptionIndex: 1 },
  { id: "mcq_1068", category: "world_post_1848", prompt: "Mi jellemzi az Európai Parlamentet?", options: ["Tagjait a tagállami kormányok delegálják", "720 képviselőből áll, akiket közvetlenül választanak", "Kizárólag Strasbourgban működik, másutt nem", "Nem vesz részt a jogalkotásban"], correctOptionIndex: 1 },
  { id: "mcq_1069", category: "world_post_1848", prompt: "Mi az Európai Bizottság egyik alapvető feladata?", options: ["A tagállamok miniszterelnökeinek összehívása", "Az uniós jog egységes értelmezése", "Jogszabályok javaslata és az uniós jog betartásának ellenőrzése", "Kizárólag az euró árfolyamának meghatározása"], correctOptionIndex: 2 },
  { id: "mcq_1070", category: "world_post_1848", prompt: "Melyik intézmény mondja ki a jogi végszót, ha vita van egy uniós szabály alkalmazásáról?", options: ["Európai Tanács", "Európai Parlament", "Európai Unió Bírósága", "Európai Bizottság"], correctOptionIndex: 2 },
  { id: "mcq_1071", category: "world_post_1848", prompt: "Hol van az Európai Unió Bíróságának székhelye?", options: ["Brüsszel", "Strasbourg", "Frankfurt", "Luxembourg"], correctOptionIndex: 3 },
  { id: "mcq_1072", category: "world_post_1848", prompt: "Mi az Európai Központi Bank legfontosabb feladata?", options: ["A közös külpolitika irányítása", "A pénzpolitika alakítása az euróövezetben", "Az uniós jogszabályok megalkotása", "A schengeni határok ellenőrzése"], correctOptionIndex: 1 },
  { id: "mcq_1073", category: "world_post_1848", prompt: "Mi a demográfiai átmenet leegyszerűsített lényege?", options: ["Először a születések nőnek, utána a halálozás", "Először a halálozás csökken, utána a születésszám is", "A népesség mindenütt egyenletesen nő", "A migráció teljesen megszűnik"], correctOptionIndex: 1 },
  { id: "mcq_1074", category: "world_post_1848", prompt: "Miért nőtt meg gyorsan a világ népessége a 20. század második felében?", options: ["Először a születések ugrottak meg drasztikusan", "A halálozás nagyot esett az egészségügyi és életkörülmény-javulás miatt", "A migráció megsokszorozta a Föld népességét", "A háborúk csökkentették a népességet, majd gyorsan pótlódott"], correctOptionIndex: 1 },
  { id: "mcq_1075", category: "world_post_1848", prompt: "Mi számít a migráció egyik leggyakoribb okának?", options: ["Csak vallási szempontok", "Munka és magasabb bér", "Kizárólag politikai kampányok", "Csak a határok megnyitása"], correctOptionIndex: 1 },
  { id: "mcq_1076", category: "world_post_1848", prompt: "Mi jellemzi Magyarország népességét 1981 óta?", options: ["Folyamatos növekedés", "Változatlan szint", "Folyamatos csökkenés", "Csak bevándorlásból növekszik"], correctOptionIndex: 2 },
  { id: "mcq_1077", category: "world_post_1848", prompt: "Mi volt a Ratkó-korszak egyik demográfiai következménye?", options: ["Nagyobb születési hullám az 1950-es évek közepén", "A születésszám teljes megszűnése", "Az időskorú népesség azonnali többsége", "Tömeges kivándorlás"], correctOptionIndex: 0 },
  { id: "mcq_1078", category: "world_post_1848", prompt: "Mi jellemezte a magyarországi belső vándorlást az elmúlt évtizedekben?", options: ["A népesség főként a főváros belseje felé áramlott", "Főként Budapestről az agglomeráció és néhány erősebb térség felé mozgott", "Minden vármegye egyformán nőtt", "Pest megye folyamatosan veszteséget mutatott"], correctOptionIndex: 1 },
  { id: "mcq_1079", category: "world_post_1848", prompt: "Mi Magyarország legfelső jogszabálya?", options: ["A Polgári Törvénykönyv", "Az Alaptörvény", "A költségvetési törvény", "Az önkormányzati törvény"], correctOptionIndex: 1 },
  { id: "mcq_1080", category: "world_post_1848", prompt: "Milyen többség kell az Alaptörvény módosításához?", options: ["Egyszerű többség", "Abszolút többség", "Kétharmados országgyűlési többség", "Népszavazási többség"], correctOptionIndex: 2 },
  { id: "mcq_1081", category: "world_post_1848", prompt: "Mi jellemzi az országgyűlési választási rendszert?", options: ["Kétfordulós, tisztán listás rendszer", "Egyfordulós, 199 képviselővel", "Csak egyéni körzetekből áll", "A választók csak egy szavazatot adhatnak le"], correctOptionIndex: 1 },
  { id: "mcq_1082", category: "world_post_1848", prompt: "Hogyan oszlik meg a 199 országgyűlési mandátum?", options: ["100 egyéni, 99 listás", "106 egyéni, 93 listás", "120 egyéni, 79 listás", "93 egyéni, 106 listás"], correctOptionIndex: 1 },
  { id: "mcq_1083", category: "world_post_1848", prompt: "Ki vezeti a végrehajtó hatalmat napi szinten?", options: ["A köztársasági elnök", "Az Alkotmánybíróság elnöke", "A Kormány", "Az Országgyűlés elnöke"], correctOptionIndex: 2 },
  { id: "mcq_1084", category: "world_post_1848", prompt: "Melyik állítás igaz a köztársasági elnökre?", options: ["Közvetlenül választják a választópolgárok", "Az Országgyűlés választja 5 évre, titkos szavazással", "A Kormány nevezi ki", "9 évre választják kétharmaddal"], correctOptionIndex: 1 },
  { id: "mcq_1085", category: "world_post_1848", prompt: "Mi tette különösen instabillá Európát az első világháború után Németország szempontjából?", options: ["A versailles-i béke megalázó és korlátozó jellege", "A német gyarmatok megerősödése", "A gyors német demokratizálódás", "A teljes gazdasági fellendülés"], correctOptionIndex: 0 },
  { id: "mcq_1086", category: "world_post_1848", prompt: "Mi volt a „békéltetés” politikájának csúcspontja?", options: ["A Rajna-vidék remilitarizálása", "Az Anschluss", "A müncheni egyezmény", "A Molotov–Ribbentrop-paktum"], correctOptionIndex: 2 },
  { id: "mcq_1087", category: "world_post_1848", prompt: "Mi mutatta meg 1939 márciusában, hogy Hitler már nem csak revíziót akar?", options: ["A Szudéta-vidék megszerzése", "Csehország elfoglalása", "Ausztria bekebelezése", "A sorkatonaság visszaállítása"], correctOptionIndex: 1 },
  { id: "mcq_1088", category: "world_post_1848", prompt: "Mi volt a Molotov–Ribbentrop-paktum lényege?", options: ["Német–olasz katonai szövetség", "Német–szovjet megnemtámadási szerződés, titkos területi felosztással", "Brit–francia garancia Lengyelországnak", "Japán és Németország közös haditerve"], correctOptionIndex: 1 },
  { id: "mcq_1089", category: "world_post_1848", prompt: "Mi jellemezte leginkább a villámháborút?", options: ["Elhúzódó lövészárokháború", "Gyors, gépesített támadás rádiós koordinációval és légierővel", "Kizárólag tengeri hadviselés", "Csak védelmi célú hadműveletek"], correctOptionIndex: 1 },
  { id: "mcq_1090", category: "world_post_1848", prompt: "Mi indította el az európai háborút?", options: ["Franciaország megtámadása", "A Szovjetunió lerohanása", "Lengyelország német megtámadása", "Pearl Harbor"], correctOptionIndex: 2 },
  { id: "mcq_1091", category: "world_post_1848", prompt: "Mi történt a „furcsa háború” időszakában?", options: ["A nyugati fronton azonnal eldőltek a fő csaták", "Papíron háború volt, de nyugaton kevés nagy hadművelet zajlott", "A britek elfoglalták Berlint", "Franciaország megtámadta Olaszországot"], correctOptionIndex: 1 },
  { id: "mcq_1092", category: "world_post_1848", prompt: "Mi volt a brit csata jelentősége?", options: ["Németország elfoglalta Angliát", "A németek megtörték a brit légvédelmet", "Németország nem tudta térdre kényszeríteni Nagy-Britanniát", "A brit flotta elsüllyedt"], correctOptionIndex: 2 },
  { id: "mcq_1093", category: "world_post_1848", prompt: "Miért számított Hitler egyik legnagyobb hibájának a Barbarossa hadművelet?", options: ["Mert ezzel elvesztette Japán támogatását", "Mert kétfrontos háborút indított", "Mert feladta Franciaországot", "Mert lemondott a légierőről"], correctOptionIndex: 1 },
  { id: "mcq_1094", category: "world_post_1848", prompt: "Melyik ütközet volt fordulópont a csendes-óceáni háborúban?", options: ["El-Alamein", "Midway", "Kurszk", "Dunkerque"], correctOptionIndex: 1 },
  { id: "mcq_1095", category: "world_post_1848", prompt: "Mi törte meg a német lendületet keleten?", options: ["A brit csata", "Sztálingrád", "Ardennek", "Szicília"], correctOptionIndex: 1 },
  { id: "mcq_1096", category: "world_post_1848", prompt: "Mi lett Kurszk legfontosabb következménye?", options: ["A németek újra támadó fölénybe kerültek", "A stratégiai kezdeményezés végleg a szovjetekhez került keleten", "A Szovjetunió kilépett a háborúból", "Megnyílt a nyugati front"], correctOptionIndex: 1 },
  { id: "mcq_1097", category: "world_post_1848", prompt: "Mi volt a D-nap jelentősége?", options: ["Japán kapitulációja", "A nyugati front megnyitásának döntő lépése", "Olaszország hadba lépése", "Berlin elfoglalása"], correctOptionIndex: 1 },
  { id: "mcq_1098", category: "world_post_1848", prompt: "Mi jellemezte a második világháborút az elsőhöz képest?", options: ["Lassabb és kevésbé technikai jellegű volt", "A civilek kevésbé voltak célpontok", "Mozgékonyabb, gyorsabb és technológiailag fejlettebb volt", "Kizárólag Európában zajlott"], correctOptionIndex: 2 },
  { id: "mcq_1099", category: "world_post_1848", prompt: "Mi volt a wannsee-i konferencia történelmi szerepe?", options: ["A német kapituláció aláírása", "A végső megoldás előterjesztése", "A normandiai partraszállás megszervezése", "A Népszövetség megalapítása"], correctOptionIndex: 1 },
  { id: "mcq_1100", category: "world_post_1848", prompt: "Miért vált a versailles-i békerendszer politikai radikalizációs üzemanyaggá Németországban?", options: ["Mert teljes gazdasági önállóságot adott Németországnak", "Mert Németországot egyszerre katonailag, területileg és gazdaságilag is korlátozta", "Mert visszaállította a császárságot", "Mert megszüntette a jóvátételt"], correctOptionIndex: 1 },
  { id: "mcq_1101", category: "world_post_1848", prompt: "Mi jellemezte a Weimari Köztársaság választási rendszerét?", options: ["Többségi választási rendszer működött", "Csak két párt indulhatott", "Arányos választási rendszer működött", "A köztársasági elnök nevezte ki a parlamentet"], correctOptionIndex: 2 },
  { id: "mcq_1102", category: "world_post_1848", prompt: "Miért volt gyakran instabil a Weimari Köztársaság kormányzása?", options: ["Mert nem létezett parlament", "Mert az arányos választási rendszer miatt sok párt került be, és állandó koalíciók kellettek", "Mert a hadsereg közvetlenül irányította az államot", "Mert tilos volt pártokat alapítani"], correctOptionIndex: 1 },
  { id: "mcq_1103", category: "world_post_1848", prompt: "Mit tett lehetővé a híres 48. cikk?", options: ["A császárság visszaállítását", "Rendkívüli állapot és szükségrendeleti kormányzás elrendelését", "A választójog eltörlését minden német számára", "A hadkötelezettség automatikus visszaállítását"], correctOptionIndex: 1 },
  { id: "mcq_1104", category: "world_post_1848", prompt: "Miért vált 1923 különösen súlyos válságévvé?", options: ["Mert Németország győztesen zárta a háborút", "Mert egyszerre jelentkezett a Ruhr-vidék megszállása és a hiperinfláció", "Mert ekkor vezették be a stabil valutát", "Mert Franciaország lemondott a jóvátételről"], correctOptionIndex: 1 },
  { id: "mcq_1105", category: "world_post_1848", prompt: "Mi váltotta ki a Ruhr-vidék francia megszállását?", options: ["A német hadsereg támadása Franciaország ellen", "A jóvátétel fizetésének elmaradása", "A német választások eredménye", "A Népszövetség döntése a Saar-vidékről"], correctOptionIndex: 1 },
  { id: "mcq_1106", category: "world_post_1848", prompt: "Mi volt a sörpuccs lényege?", options: ["Hitler demokratikus választáson győzött Münchenben", "Hitler fegyveres nyomással próbált forradalmat indítani Bajorországban", "A kommunisták átvették a hatalmat Berlinben", "A hadsereg letartóztatta Hindenburgot"], correctOptionIndex: 1 },
  { id: "mcq_1107", category: "world_post_1848", prompt: "Mi történt Hitlerrel a sörpuccs után?", options: ["Azonnal kancellár lett", "Külföldre menekült", "Börtönbe került, ahol megírta a Mein Kampfot", "A Reichstag elnökévé választották"], correctOptionIndex: 2 },
  { id: "mcq_1108", category: "world_post_1848", prompt: "Miért erősödtek meg a szélsőradikálisok a világgazdasági válság idején?", options: ["Mert megszűnt a munkanélküliség", "Mert a német társadalom rendet, munkát és stabilitást keresett a válság közepén", "Mert minden külföldi hitel megmaradt", "Mert a köztársaság politikai rendszere egyre stabilabb lett"], correctOptionIndex: 1 },
  { id: "mcq_1109", category: "world_post_1848", prompt: "Melyik állítás írja le helyesen az NSDAP-t?", options: ["Mérsékelt liberális reformpárt volt", "Radikálisan jobboldali, antidemokratikus, antikommunista és antiszemita párt volt", "Kizárólag gazdasági kérdésekkel foglalkozott", "A monarchia visszaállításáért küzdő legitimista párt volt"], correctOptionIndex: 1 },
  { id: "mcq_1110", category: "world_post_1848", prompt: "Mit jelentett a Führerprinzip?", options: ["A törvények elsőbbségét a vezetővel szemben", "A parlament teljes önállóságát", "A vezető akaratának legfőbb legitimációját", "A tartományok függetlenségét"], correctOptionIndex: 2 },
  { id: "mcq_1111", category: "world_post_1848", prompt: "Hogyan jutott Hitler kancellári pozícióba 1933-ban?", options: ["Katonai puccsal", "Népszavazással közvetlenül államfővé választották", "Jogi-alkotmányos úton nevezték ki kancellárnak", "Forradalmi munkástanácsok emelték hatalomra"], correctOptionIndex: 2 },
  { id: "mcq_1112", category: "world_post_1848", prompt: "Mi volt a Felhatalmazási törvény lényege?", options: ["A parlament feloszlathatta a kormányt", "A kormány parlamenti hozzájárulás nélkül alkothatott törvényeket, akár alkotmánymódosítást is", "Visszaállították a császárságot", "Megszüntették a kancellári tisztséget"], correctOptionIndex: 1 },
  { id: "mcq_1113", category: "world_post_1848", prompt: "Mi lett a Reichstag felgyújtása utáni rendelet következménye?", options: ["Kiterjesztették a politikai jogokat", "Felfüggesztették az alapjogokat, és megindult az ellenfelek letartóztatása", "Megerősítették a sajtószabadságot", "Visszaállították a többpártrendszert"], correctOptionIndex: 1 },
  { id: "mcq_1114", category: "world_post_1848", prompt: "Mi volt a Hosszú kések éjszakájának egyik fő célja?", options: ["A kommunista párt legalizálása", "Az SA vezetőinek félreállítása és a hadsereg támogatásának megszerzése", "A weimari alkotmány helyreállítása", "A nürnbergi törvények kihirdetése"], correctOptionIndex: 1 },
  { id: "mcq_1115", category: "world_post_1848", prompt: "Mit mondtak ki a nürnbergi törvények?", options: ["A zsidók teljes jogegyenlőségét", "A zsidók birodalmi állampolgárságát", "A zsidók jogfosztását és a zsidók, illetve „német/rokon vérűek” közötti házasság tiltását", "A vallásszabadság kiterjesztését"], correctOptionIndex: 2 },
  { id: "mcq_1116", category: "world_post_1848", prompt: "Mi jellemezte a kristályéjszakát?", options: ["Demokratikus tüntetések hulláma Berlinben", "Zsinagógák és zsidó üzletek elleni szervezett erőszak, valamint tömeges letartóztatások", "A hadsereg fellázadt Hitler ellen", "A köztársasági elnök lemondott"], correctOptionIndex: 1 },
  { id: "mcq_1117", category: "world_post_1848", prompt: "Mi volt a náci propaganda egyik legfontosabb tömegeszköze?", options: ["A telefonközpont", "A rádió", "A távíró", "A népgyűlések teljes tilalma"], correctOptionIndex: 1 },
  { id: "mcq_1118", category: "world_post_1848", prompt: "Mi volt az orosz birodalmi válság egyik legfontosabb közvetlen oka 1917-ben?", options: ["A gyarmatok elvesztése", "Az első világháború elhúzódása, az ellátási zavarok és az infláció", "A gyors ipari fellendülés", "A mezőgazdasági túltermelés"], correctOptionIndex: 1 },
  { id: "mcq_1119", category: "world_post_1848", prompt: "Mi jellemezte a „kettős hatalom” helyzetét 1917-ben?", options: ["A cár és a parlament közös kormányzása", "Az Ideiglenes Kormány és a szovjetek párhuzamos hatalmi jelenléte", "A hadsereg és a nemesség szövetsége", "A bolsevikok és a mensevikek közös diktatúrája"], correctOptionIndex: 1 },
  { id: "mcq_1120", category: "world_post_1848", prompt: "Miért volt instabil a kettős hatalom rendszere?", options: ["Mert nem volt elég hivatalnok", "Mert két eltérő politikai logika működött egymás mellett, egységes döntési központ nélkül", "Mert a cár visszatért a trónra", "Mert a parasztság teljesen kimaradt a politikából"], correctOptionIndex: 1 },
  { id: "mcq_1121", category: "world_post_1848", prompt: "Mi volt a bolsevik hatalomátvétel egyik legfontosabb következménye?", options: ["A parlamentáris kompromisszumos politika megerősödése", "A rendeleti, forradalmi legitimációra épülő kormányzás kezdete", "Az alkotmányos monarchia helyreállítása", "A többpártrendszer megszilárdulása"], correctOptionIndex: 1 },
  { id: "mcq_1122", category: "world_post_1848", prompt: "Mi volt a központi célja a különbéke megkötésének 1918-ban?", options: ["Új front nyitása Nyugat-Európában", "Az azonnali kilépés az első világháborúból a belső hatalom megőrzése érdekében", "A cári rendszer visszaállítása", "A szovjetek felszámolása"], correctOptionIndex: 1 },
  { id: "mcq_1123", category: "world_post_1848", prompt: "Miért hozták létre a Vörös Hadsereget?", options: ["Mert Oroszország tengeri nagyhatalommá akart válni", "Mert a bolsevik hatalom szervezett, központosított fegyveres erő nélkül nem volt fenntartható", "Mert a földreform végrehajtásához erre volt szükség", "Mert az Ideiglenes Kormány ezt rendelte el"], correctOptionIndex: 1 },
  { id: "mcq_1124", category: "world_post_1848", prompt: "Mi volt az első szovjet alkotmány jelentősége?", options: ["Megszüntette a szovjeteket", "Intézményes, állami formát adott a forradalmi hatalomgyakorlásnak", "Visszaállította a cári önkényt", "Bevezette az általános többpártrendszert"], correctOptionIndex: 1 },
  { id: "mcq_1125", category: "world_post_1848", prompt: "Mi volt a hadikommunizmus lényege?", options: ["Szabad piacgazdaság kiépítése", "Kényszer-beszolgáltatás és a városok, valamint a Vörös Hadsereg ellátásának erőltetése", "A külkereskedelem bővítése", "A magántulajdon teljes védelme"], correctOptionIndex: 1 },
  { id: "mcq_1126", category: "world_post_1848", prompt: "Miért vezették be a NEP-et?", options: ["Mert a bolsevikok vissza akarták állítani a kapitalizmust", "Mert a termelés és ellátás stabilizálása nélkül a rendszer fenntarthatatlanná vált", "Mert a Vörös Hadsereg feloszlott", "Mert a földesúri rendszer megerősödött"], correctOptionIndex: 1 },
  { id: "mcq_1127", category: "world_post_1848", prompt: "Mit engedett vissza korlátozottan a NEP?", options: ["A cári önkényt", "A világpiacot és a világkereskedelmet", "A kötelező jobbágymunkát", "A többpárti választásokat"], correctOptionIndex: 1 },
  { id: "mcq_1128", category: "world_post_1848", prompt: "Mi segítette elő, hogy Sztálin Lenin halála után fokozatosan megszerezze a hatalmat?", options: ["Közvetlen népszavazás", "Az, hogy főtitkárként a fontos pártkinevezések az ő kezében voltak", "A cári család támogatása", "Az alkotmányos királyság bevezetése"], correctOptionIndex: 1 },
  { id: "mcq_1129", category: "world_post_1848", prompt: "Mit jelentett a demokratikus centralizmus a gyakorlatban?", options: ["Alsó szintről épülő teljes önkormányzatiságot", "A vezetés dönt, alul pedig végrehajtanak", "Szabad pártversenyt", "A hadsereg politikai semlegességét"], correctOptionIndex: 1 },
  { id: "mcq_1130", category: "world_post_1848", prompt: "Mi volt a személyi kultusz szerepe?", options: ["A helyi önkormányzatok megerősítése", "Egy vezető tévedhetetlenként való bemutatása propaganda és szimbólumok révén", "A vallási pluralizmus támogatása", "A piaci verseny fokozása"], correctOptionIndex: 1 },
  { id: "mcq_1131", category: "world_post_1848", prompt: "Mi volt a Gulag?", options: ["A szovjet parlament felsőháza", "A szovjet munkatábor-rendszer összefoglaló neve", "A szovjet pénzügyminisztérium", "A kollektivizálás önkéntes szervezete"], correctOptionIndex: 1 },
  { id: "mcq_1132", category: "world_post_1848", prompt: "Mi volt a Goszplan feladata?", options: ["A külpolitika irányítása", "A központi gazdasági tervezés", "A Vörös Hadsereg megszervezése", "A szovjet alkotmánybíráskodás"], correctOptionIndex: 1 },
  { id: "mcq_1133", category: "world_post_1848", prompt: "Mit helyezett előtérbe az első nagy ötéves terv?", options: ["A fogyasztási cikkek és luxusipar fejlesztését", "A gyors iparosítást és a magángazdaság visszaszorítását", "A paraszti magántulajdon megerősítését", "A szabad külkereskedelmet"], correctOptionIndex: 1 },
  { id: "mcq_1134", category: "world_post_1848", prompt: "Mi jellemezte a kollektivizálást?", options: ["Az egyéni parasztgazdaságok tudatos erősítése", "A parasztok rákényszerítése a közös gazdaságokba való belépésre", "A föld teljes privatizációja", "A kulákok politikai hatalmának növelése"], correctOptionIndex: 1 },
  { id: "mcq_1135", category: "world_post_1848", prompt: "Mi volt a propaganda egyik fontos funkciója a sztálini rendszerben?", options: ["A hiánygazdaság és a terror nyílt bemutatása", "A valós félelem, hiány és elnyomás elfedése idealizált képekkel", "A szabad sajtó működtetése", "A többpártrendszer népszerűsítése"], correctOptionIndex: 1 },
  { id: "mcq_1136", category: "world_post_1848", prompt: "Mi tette lehetővé, hogy sok befektető kis összegekből egyetlen nagy ipari projektet finanszírozzon?", options: ["A céhes rendszer", "A korlátolt felelősségű részvénytársasági forma", "A földesúri birtokrendszer", "A robotmunka"], correctOptionIndex: 1 },
  { id: "mcq_1137", category: "world_post_1848", prompt: "Mit jelent az urbanizáció?", options: ["A mezőgazdasági termelés gépesítését", "A népesség városokba áramlását és a városi életforma térnyerését", "Az ipari munkásság kivándorlását", "A falvak önellátásának megerősödését"], correctOptionIndex: 1 },
  { id: "mcq_1138", category: "world_post_1848", prompt: "Melyik várospár számított a világ két legnagyobb tőkepiacának?", options: ["Berlin és Párizs", "Bécs és Budapest", "London és New York", "Róma és Madrid"], correctOptionIndex: 2 },
  { id: "mcq_1139", category: "world_post_1848", prompt: "Melyik iparág volt különösen erős Németországban?", options: ["Vegyipar", "Hajóépítés", "Textilipar", "Élelmiszeripar"], correctOptionIndex: 0 },
  { id: "mcq_1140", category: "world_post_1848", prompt: "Miért vált tőkevonzóvá az elektrotechnika és a vegyipar?", options: ["Mert nem igényelt szakképzett munkaerőt", "Mert a kutatás skálázható versenyelőnyt és szabadalmi profitot adott", "Mert ezekben az ágazatokban nem volt verseny", "Mert kizárólag állami támogatásból működtek"], correctOptionIndex: 1 },
  { id: "mcq_1141", category: "world_post_1848", prompt: "Melyik elsődleges energiahordozó megjelenése fontos a 2. ipari forradalomnál?", options: ["Tűzifa", "Kőolaj", "Vízikerék", "Tőzeg"], correctOptionIndex: 1 },
  { id: "mcq_1142", category: "world_post_1848", prompt: "Melyik tartozik a másodlagos energiahordozók közé?", options: ["Szén", "Földgáz", "Villamos energia", "Urán"], correctOptionIndex: 2 },
  { id: "mcq_1143", category: "world_post_1848", prompt: "Ki találta fel a négyütemű, Otto-ciklusú belső égésű motort?", options: ["Rudolf Diesel", "Karl Benz", "Nikolaus Otto", "Nikola Tesla"], correctOptionIndex: 2 },
  { id: "mcq_1144", category: "world_post_1848", prompt: "Melyik évhez kötődik a négyütemű belső égésű motor feltalálása?", options: ["1856", "1876", "1886", "1897"], correctOptionIndex: 1 },
  { id: "mcq_1145", category: "world_post_1848", prompt: "Mi volt a benzines modern autó jelentősége?", options: ["A vasúti közlekedés végét jelentette", "A közúti gépjármű tömegtermelésének és iparágának kezdetét adta", "Kizárólag katonai célokat szolgált", "Csak a luxusközlekedést fejlesztette"], correctOptionIndex: 1 },
  { id: "mcq_1146", category: "world_post_1848", prompt: "Kihez köthető a Patent-Motorwagen?", options: ["Karl Benz", "Henry Ford", "Rudolf Diesel", "Orville Wright"], correctOptionIndex: 0 },
  { id: "mcq_1147", category: "world_post_1848", prompt: "Melyik jármű szerepel futószalagon gyártott, legeladottabb autóként?", options: ["Benz Patent-Motorwagen", "Ford T-modell", "Wright Flyer", "Diesel teherautó"], correctOptionIndex: 1 },
  { id: "mcq_1148", category: "world_post_1848", prompt: "Mi volt a dízelmotor fő jelentősége?", options: ["A háztartási világítás elterjesztése", "A nagy terhelésű hajtás hatékony megoldása", "A vezeték nélküli kommunikáció megteremtése", "A műtrágyagyártás fejlesztése"], correctOptionIndex: 1 },
  { id: "mcq_1149", category: "world_post_1848", prompt: "Kik hajtották végre az első sikeres, irányított motoros repülést?", options: ["Fritz Haber és Carl Bosch", "Orville Wright és Wilbur Wright", "Ottó Bláthy és Miksa Déri", "Bell és Edison"], correctOptionIndex: 1 },
  { id: "mcq_1150", category: "world_post_1848", prompt: "Mi nyitotta meg a modern szerves vegyipar és a szintetikus festékek tömegpiacát?", options: ["Aszpirin", "Dinamit", "Mauvein", "Ammóniaszintézis"], correctOptionIndex: 2 },
  { id: "mcq_1151", category: "world_post_1848", prompt: "Ki találta fel a dinamitet?", options: ["Alfred Nobel", "William Henry Perkin", "Felix Hoffmann", "Guglielmo Marconi"], correctOptionIndex: 0 },
  { id: "mcq_1152", category: "world_post_1848", prompt: "Mi volt a dinamit jelentősége?", options: ["A rádiózás elindítása", "A bányászat és az építőipar felpörgetése", "A gyógyszeripar tömegtermelésének megalapozása", "A váltóáram elterjesztése"], correctOptionIndex: 1 },
  { id: "mcq_1153", category: "world_post_1848", prompt: "Melyik találmányhoz kapcsolódik a modern, tömeggyártott gyógyszeripari „blockbuster” kifejezés?", options: ["Mauvein", "Aszpirin", "Telefon", "Indukciós motor"], correctOptionIndex: 1 },
  { id: "mcq_1154", category: "world_post_1848", prompt: "Kikhez köthető az ipari ammóniaszintézis?", options: ["Otto és Benz", "Haber és Bosch", "Déri és Zipernowsky", "Bell és Marconi"], correctOptionIndex: 1 },
  { id: "mcq_1155", category: "world_post_1848", prompt: "Mi volt az ammóniaszintézis legfontosabb következménye?", options: ["A villamosítás kezdete", "A közúti közlekedés elterjedése", "A műtrágyagyártás skálázása és a mezőgazdasági hozamok növekedése", "A tőzsdék kialakulása"], correctOptionIndex: 2 },
  { id: "mcq_1156", category: "world_post_1848", prompt: "Ki találta fel a telefont?", options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Karl Benz"], correctOptionIndex: 1 },
  { id: "mcq_1157", category: "world_post_1848", prompt: "Mi volt a telefon jelentősége?", options: ["A valós idejű hangkommunikáció és a piaci koordináció felgyorsítása", "A közvilágítás elektromos alapra helyezése", "A hajómotorok fejlesztése", "A nitrogénkötés ipari megoldása"], correctOptionIndex: 0 },
  { id: "mcq_1158", category: "world_post_1848", prompt: "Kihez szokták kötni a praktikus izzólámpát?", options: ["Thomas Edison", "Alfred Nobel", "Rudolf Diesel", "William Perkin"], correctOptionIndex: 0 },
  { id: "mcq_1159", category: "world_post_1848", prompt: "Mi tette gazdaságossá a hosszútávú váltóáramú elosztást?", options: ["A dízelmotor", "A ZBD transzformátor", "A telefon", "A dinamó"], correctOptionIndex: 1 },
  { id: "mcq_1160", category: "world_post_1848", prompt: "Kik alkották meg a ZBD transzformátort?", options: ["Haber, Bosch, Nobel", "Wright, Bell, Edison", "Bláthy, Déri, Zipernowsky", "Otto, Benz, Diesel"], correctOptionIndex: 2 },
  { id: "mcq_1161", category: "world_post_1848", prompt: "Melyik magyar cég mérnökei voltak a ZBD transzformátor feltalálói?", options: ["MÁVAG", "Ganz", "Csepel Művek", "Tungsram"], correctOptionIndex: 1 },
  { id: "mcq_1162", category: "world_post_1848", prompt: "Kihez köthetők az AC indukciós motor kulcs-szabadalmai?", options: ["Nikola Tesla", "Thomas Edison", "Guglielmo Marconi", "Alexander Graham Bell"], correctOptionIndex: 0 },
  { id: "mcq_1163", category: "world_post_1848", prompt: "Mi volt az AC indukciós motor jelentősége?", options: ["A bányarobbantások korszerűsítése", "Az ipari elektromos hajtás szabvánnyá válása és a gyárak villamosítása", "A repülés iparággá válása", "Az autógyártás futószalagosítása"], correctOptionIndex: 1 },
  { id: "mcq_1164", category: "world_post_1848", prompt: "Kihez szokták kötni a rádiós vezeték nélküli jelátvitel első eredményeit?", options: ["Rudolf Diesel", "Guglielmo Marconi", "Carl Bosch", "Karl Benz"], correctOptionIndex: 1 },
  { id: "mcq_1165", category: "world_post_1848", prompt: "Melyik iparág példája szerepel úgy, mint kitermelés + finomítás + szállítás integrációja?", options: ["Textilipar", "Vegyipar", "Olajipar", "Élelmiszeripar"], correctOptionIndex: 2 },
  { id: "mcq_1166", category: "world_post_1848", prompt: "Mi tette különösen instabillá Európát az első világháború után Németország szempontjából?", options: ["A versailles-i béke megalázó és korlátozó jellege", "A német gyarmatok megerősödése", "A gyors német demokratizálódás", "A teljes gazdasági fellendülés"], correctOptionIndex: 0 },
  { id: "mcq_1167", category: "world_post_1848", prompt: "Mi volt a „békéltetés” politikájának csúcspontja?", options: ["A Rajna-vidék remilitarizálása", "Az Anschluss", "A müncheni egyezmény", "A Molotov–Ribbentrop-paktum"], correctOptionIndex: 2 },
  { id: "mcq_1168", category: "world_post_1848", prompt: "Mi mutatta meg 1939 márciusában, hogy Hitler már nem csak revíziót akar?", options: ["A Szudéta-vidék megszerzése", "Csehország elfoglalása", "Ausztria bekebelezése", "A sorkatonaság visszaállítása"], correctOptionIndex: 1 },
  { id: "mcq_1169", category: "world_post_1848", prompt: "Mi volt a Molotov–Ribbentrop-paktum lényege?", options: ["Német–olasz katonai szövetség", "Német–szovjet megnemtámadási szerződés, titkos területi felosztással", "Brit–francia garancia Lengyelországnak", "Japán és Németország közös haditerve"], correctOptionIndex: 1 },
  { id: "mcq_1170", category: "world_post_1848", prompt: "Mi jellemezte leginkább a villámháborút?", options: ["Elhúzódó lövészárokháború", "Gyors, gépesített támadás rádiós koordinációval és légierővel", "Kizárólag tengeri hadviselés", "Csak védelmi célú hadműveletek"], correctOptionIndex: 1 },
  { id: "mcq_1171", category: "world_post_1848", prompt: "Mi indította el az európai háborút?", options: ["Franciaország megtámadása", "A Szovjetunió lerohanása", "Lengyelország német megtámadása", "Pearl Harbor"], correctOptionIndex: 2 },
  { id: "mcq_1172", category: "world_post_1848", prompt: "Mi történt a „furcsa háború” időszakában?", options: ["A nyugati fronton azonnal eldőltek a fő csaták", "Papíron háború volt, de nyugaton kevés nagy hadművelet zajlott", "A britek elfoglalták Berlint", "Franciaország megtámadta Olaszországot"], correctOptionIndex: 1 },
  { id: "mcq_1173", category: "world_post_1848", prompt: "Mi volt a brit csata jelentősége?", options: ["Németország elfoglalta Angliát", "A németek megtörték a brit légvédelmet", "Németország nem tudta térdre kényszeríteni Nagy-Britanniát", "A brit flotta elsüllyedt"], correctOptionIndex: 2 },
  { id: "mcq_1174", category: "world_post_1848", prompt: "Miért számított Hitler egyik legnagyobb hibájának a Barbarossa hadművelet?", options: ["Mert ezzel elvesztette Japán támogatását", "Mert kétfrontos háborút indított", "Mert feladta Franciaországot", "Mert lemondott a légierőről"], correctOptionIndex: 1 },
  { id: "mcq_1175", category: "world_post_1848", prompt: "Melyik ütközet volt fordulópont a csendes-óceáni háborúban?", options: ["El-Alamein", "Midway", "Kurszk", "Dunkerque"], correctOptionIndex: 1 },
  { id: "mcq_1176", category: "world_post_1848", prompt: "Mi törte meg a német lendületet keleten?", options: ["A brit csata", "Sztálingrád", "Ardennek", "Szicília"], correctOptionIndex: 1 },
  { id: "mcq_1177", category: "world_post_1848", prompt: "Mi lett Kurszk legfontosabb következménye?", options: ["A németek újra támadó fölénybe kerültek", "A stratégiai kezdeményezés végleg a szovjetekhez került keleten", "A Szovjetunió kilépett a háborúból", "Megnyílt a nyugati front"], correctOptionIndex: 1 },
  { id: "mcq_1178", category: "world_post_1848", prompt: "Mi volt a D-nap jelentősége?", options: ["Japán kapitulációja", "A nyugati front megnyitásának döntő lépése", "Olaszország hadba lépése", "Berlin elfoglalása"], correctOptionIndex: 1 },
  { id: "mcq_1179", category: "world_post_1848", prompt: "Mi jellemezte a második világháborút az elsőhöz képest?", options: ["Lassabb és kevésbé technikai jellegű volt", "A civilek kevésbé voltak célpontok", "Mozgékonyabb, gyorsabb és technológiailag fejlettebb volt", "Kizárólag Európában zajlott"], correctOptionIndex: 2 },
  { id: "mcq_1180", category: "world_post_1848", prompt: "Mi volt a wannsee-i konferencia történelmi szerepe?", options: ["A német kapituláció aláírása", "A végső megoldás előterjesztése", "A normandiai partraszállás megszervezése", "A Népszövetség megalapítása"], correctOptionIndex: 1 },
  { id: "mcq_1181", category: "world_post_1848", prompt: "Melyik jogszabálycsoport teremtette meg Németországban a zsidók rendszerszintű jogfosztásának jogi alapját 1935-ben?", options: ["A nürnbergi faji törvények", "A weimari alkotmány", "A locarnói szerződések", "A versailles-i békerendszer"], correctOptionIndex: 0 },
  { id: "mcq_1182", category: "world_post_1848", prompt: "Mit tiltott a német vér és német becsület védelméről szóló törvény?", options: ["A zsidók külföldre utazását", "A zsidók és nem zsidók közötti házasságot és szexuális kapcsolatot", "A zsidó vallási ünnepek megtartását", "A zsidók katonai szolgálatát"], correctOptionIndex: 1 },
  { id: "mcq_1183", category: "world_post_1848", prompt: "Mikor zajlott a kristályéjszaka, vagyis a pogromok?", options: ["1933. január 30–31-én", "1935. szeptember 15–16-án", "1938. november 9–10-én", "1942. január 20–21-én"], correctOptionIndex: 2 },
  { id: "mcq_1184", category: "world_post_1848", prompt: "Melyik konferencián terjesztették elő 1942-ben a „végső megoldást” (Endlösung)?", options: ["A müncheni konferencián", "A jaltai konferencián", "A potsdami konferencián", "A wannsee-i konferencián"], correctOptionIndex: 3 },
  { id: "mcq_1185", category: "world_post_1848", prompt: "Ki hívta össze a wannsee-i konferenciát?", options: ["Reinhard Heydrich", "Hermann Göring", "Adolf Eichmann", "Heinrich Himmler"], correctOptionIndex: 0 },
  { id: "mcq_1186", category: "world_post_1848", prompt: "Ki volt a deportálások és szállítások egyik kulcs-adminisztrátora a holokauszt során?", options: ["Joseph Goebbels", "Adolf Eichmann", "Erwin Rommel", "Albert Speer"], correctOptionIndex: 1 },
  { id: "mcq_1187", category: "world_post_1848", prompt: "Melyik náci alakulat hajtott végre tömeges agyonlövéseket a Szovjetunió megtámadása után?", options: ["A Wehrmacht páncélosai", "A Luftwaffe bombázói", "Az Einsatzgruppék", "A Volkssturm egységei"], correctOptionIndex: 2 },
  { id: "mcq_1188", category: "world_post_1848", prompt: "Melyik helyszín kapcsolódik a kelet-európai tömeges náci agyonlövésekhez?", options: ["Dachau", "Bergen-Belsen", "Mauthausen", "Babij Jar"], correctOptionIndex: 3 },
  { id: "mcq_1189", category: "world_post_1848", prompt: "Melyik megnevezés utal a roma népirtásra a náci fajpolitika összefüggésében?", options: ["Porajmos", "Lebensraum", "Anschluss", "Kristallnacht"], correctOptionIndex: 0 },
  { id: "mcq_1190", category: "world_post_1848", prompt: "Melyik ország vezetőjének rendszeréhez kapcsolódik az Iași-i pogrom (holokauszt)?", options: ["Horvátország usztasa rezsimje", "Ion Antonescu Romániája", "Szlovákia Tiso-rendszere", "Olaszország Mussolini-rendszere"], correctOptionIndex: 1 },

  {
    "id": "mcq_1441",
    "category": "literature",
    "prompt": "Mi jellemzi legpontosabban a Bibliát?",
    "options": [
      "Egyetlen szerző által írt mű",
      "Egyetlen korszakban keletkezett vallási szöveg",
      "Különböző korokból és műfajokból álló gyűjtemény",
      "Kizárólag törvényeket tartalmazó könyv"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1442",
    "category": "literature",
    "prompt": "Melyik állítás igaz az Ószövetség és az Újszövetség nyelvére?",
    "options": [
      "Az Ószövetség főként latinul, az Újszövetség görögül íródott",
      "Az Ószövetség főként héberül, részben arámul, az Újszövetség görögül íródott",
      "Mindkettő kizárólag héber nyelvű",
      "Az Ószövetség görögül, az Újszövetség latinul íródott"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1443",
    "category": "literature",
    "prompt": "Melyik könyv számít apokaliptikus irodalomnak?",
    "options": [
      "Teremtés könyve",
      "Kivonulás könyve",
      "Jelenések könyve",
      "Zsoltárok könyve"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1444",
    "category": "literature",
    "prompt": "Mi a bűnbeesés közvetlen következménye?",
    "options": [
      "Ádám és Éva királlyá válnak",
      "Az ember halhatatlanná lesz",
      "Kiűzetés a paradicsomból",
      "A kígyó megkapja az örök életet"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1445",
    "category": "literature",
    "prompt": "Miért sújtja Isten özönvízzel az emberiséget?",
    "options": [
      "Mert Noé engedetlen volt",
      "Mert az emberiség megromlott",
      "Mert az emberek nem akartak tornyot építeni",
      "Mert Káin megölte Ábelt"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1446",
    "category": "literature",
    "prompt": "Mi lett az özönvíz utáni szövetség jele?",
    "options": [
      "A galamb",
      "Az olajág",
      "A szivárvány",
      "A bárka"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1447",
    "category": "literature",
    "prompt": "Mi a Bábel tornyának történetében az isteni büntetés lényege?",
    "options": [
      "Az emberek elveszítik földjeiket",
      "Isten összezavarja nyelvüket",
      "Tűz pusztítja el a várost",
      "Az emberek kővé válnak"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1448",
    "category": "literature",
    "prompt": "Miért fontos Ábrahám története?",
    "options": [
      "Mert ő írta a Tízparancsolatot",
      "Mert ő vezeti ki a népet Egyiptomból",
      "Mert Isten vele köt szövetséget, és nagy népet ígér neki",
      "Mert ő győzi le Góliátot"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1449",
    "category": "literature",
    "prompt": "Mi menti meg Izsák életét a próbatétel történetében?",
    "options": [
      "Sára közbelépése",
      "Mózes figyelmeztetése",
      "Isten az utolsó pillanatban megállítja Ábrahámot",
      "Egy angyal elrejti Izsákot"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1450",
    "category": "literature",
    "prompt": "Mi emeli fel Józsefet Egyiptomban?",
    "options": [
      "Harci sikerei",
      "Álmainak megfejtése",
      "Királyi származása",
      "Saul támogatása"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1451",
    "category": "literature",
    "prompt": "Milyen jelben szólítja meg Isten Mózest?",
    "options": [
      "Villámlásban",
      "Égő csipkebokorban",
      "Szivárványban",
      "Galamb képében"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1452",
    "category": "literature",
    "prompt": "Mi történik a kivonulás történetében?",
    "options": [
      "A zsidók elfoglalják Jeruzsálemet",
      "Mózes legyőzi a fáraót párviadalban",
      "A nép átkel a kettéváló tengeren",
      "Saul vezeti ki a népet Egyiptomból"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1453",
    "category": "literature",
    "prompt": "Melyik evangéliumban szerepel hangsúlyosan az angyali üdvözlet és a tékozló fiú példázata?",
    "options": [
      "Máté evangéliuma",
      "Márk evangéliuma",
      "Lukács evangéliuma",
      "János evangéliuma"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1454",
    "category": "literature",
    "prompt": "Mi a magvető példázatának fő tanítása?",
    "options": [
      "A gazdagság mindig boldoggá tesz",
      "Az ige befogadása az ember hozzáállásától függ",
      "A szegénység a legnagyobb erény",
      "A termés csak a szerencsén múlik"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1455",
    "category": "literature",
    "prompt": "Mi jellemzi a Zsoltárok könyvét?",
    "options": [
      "Kizárólag történeti elbeszélésekből áll",
      "150 imádság- és énekvers gyűjteménye",
      "Csak királyokról szóló próféciákat tartalmaz",
      "Az Újszövetség legrövidebb könyve"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1456",
    "category": "literature",
    "prompt": "Mi jellemzi legpontosabban a reneszánszot?",
    "options": [
      "Kizárólag vallási reformmozgalom",
      "A 14–16. század európai művelődéstörténeti korszaka és stílusirányzata",
      "Csak az angol dráma megújulása",
      "A középkori lovagi költészet összefoglaló neve"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1457",
    "category": "literature",
    "prompt": "Mi került a reneszánsz világkép középpontjába?",
    "options": [
      "A szerzetesi önmegtagadás",
      "Az ember, az egyén kibontakozása és a földi élet szépsége",
      "A kizárólagos egyházi tekintély",
      "A feudális engedelmesség"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1458",
    "category": "literature",
    "prompt": "Mi segítette elő a reneszánsz kialakulását?",
    "options": [
      "Az egyház szellemi monopóliumának megerősödése",
      "Az egyház szellemi monopóliumának gyengülése",
      "A kereskedelem teljes megszűnése",
      "Az antik kultúra tiltása"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1459",
    "category": "literature",
    "prompt": "Hol bontakozott ki először a reneszánsz?",
    "options": [
      "Dél-Franciaországban",
      "Észak-Itáliában",
      "Németalföldön",
      "Angliában"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1460",
    "category": "literature",
    "prompt": "Melyik tényező teremtette meg a reneszánsz művészet anyagi hátterét Észak-Itáliában?",
    "options": [
      "A jobbágyrendszer megerősödése",
      "A korai kapitalizmus, a kereskedelem és a bankélet fejlődése",
      "A paraszti önellátás",
      "Az egyházi tized emelése"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1461",
    "category": "literature",
    "prompt": "Hogyan viszonyultak a humanisták az antikvitáshoz?",
    "options": [
      "Elutasították mint pogány hagyományt",
      "Tisztelték és utánozták",
      "Csak történeti forrásként kezelték",
      "Kizárólag a római jogot vették át belőle"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1462",
    "category": "literature",
    "prompt": "Mit tekintett a reneszánsz boldogságforrásnak?",
    "options": [
      "Kizárólag a túlvilági üdvösséget",
      "Az egyén földi cselekvéseit, a szerelmet és a tudást",
      "Csak a katonai hősiességet",
      "A teljes világtól való elfordulást"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1463",
    "category": "literature",
    "prompt": "Melyik műfaj vált vezetővé az Erzsébet-kori Angliában?",
    "options": [
      "Az eposz",
      "A dráma",
      "Az elégia",
      "Az óda"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1464",
    "category": "literature",
    "prompt": "Hol született William Shakespeare?",
    "options": [
      "Veronában",
      "Londonban",
      "Stratfordban",
      "Firenzében"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1465",
    "category": "literature",
    "prompt": "Mi történt 1599-ben Shakespeare életében?",
    "options": [
      "Meghalt",
      "Saját társulatával felépíttette a Globe Színházat",
      "Megírta a Hamletet",
      "Kikiáltották udvari költőnek"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1466",
    "category": "literature",
    "prompt": "Mi jellemezte az angol reneszánsz drámát?",
    "options": [
      "Kötelező volt a három egység szigorú betartása",
      "Kevés szereplő és egyetlen helyszín volt jellemző",
      "Pörgős, több helyszínt felvonultató cselekmény és árnyalt jellemrajz",
      "Kizárólag vallásos témákat dolgozott fel"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1467",
    "category": "literature",
    "prompt": "Mi volt igaz az Erzsébet-kori színházi szereposztásra?",
    "options": [
      "Csak nők játszhattak női szerepeket",
      "Nők és férfiak egyaránt felléphettek",
      "Kizárólag férfi színészek játszhattak, a női szerepeket is fiúk alakították",
      "Csak nemesek léphettek színpadra"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1468",
    "category": "literature",
    "prompt": "Mit jelzett a fehér zászló a Globe Színházban?",
    "options": [
      "Tragédiát",
      "Történelmi drámát",
      "Komédiát",
      "A zárt előadást"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1469",
    "category": "literature",
    "prompt": "Hol játszódik a Rómeó és Júlia?",
    "options": [
      "Londonban",
      "Veronában",
      "Párizsban",
      "Rómában"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1470",
    "category": "literature",
    "prompt": "Kik állnak egymással ősi gyűlöletben a tragédiában?",
    "options": [
      "A Montague és a Capulet család",
      "A herceg és a nemesség",
      "Rómeó és Mercutio",
      "Páris és Lőrinc barát"
    ],
    "correctOptionIndex": 0
  },
  {
    "id": "mcq_1471",
    "category": "literature",
    "prompt": "Ki segíti elő a titkos házasságot abban a reményben, hogy ezzel véget ér a viszály?",
    "options": [
      "Tybalt",
      "Verona hercege",
      "Lőrinc barát",
      "Benvolio"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1472",
    "category": "literature",
    "prompt": "Kit öl meg Tybalt?",
    "options": [
      "Párist",
      "Mercutiót",
      "Balthasart",
      "Capuletet"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1473",
    "category": "literature",
    "prompt": "Mi lesz Rómeó büntetése Tybalt megölése után?",
    "options": [
      "Börtönbe zárják",
      "Halálra ítélik",
      "Száműzik Veronából",
      "Kolostorba küldik"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1474",
    "category": "literature",
    "prompt": "Miért issza meg Júlia a főzetet?",
    "options": [
      "Mert valóban meg akar halni",
      "Mert így akarja elkerülni a Párisszal kötendő házasságot",
      "Mert Lőrinc barát megbünteti",
      "Mert Tybalt erre kényszeríti"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1475",
    "category": "literature",
    "prompt": "Mi okozza a végső tragédiát?",
    "options": [
      "Júlia levele elkallódik Benvoliónál",
      "Lőrinc barát elárulja a titkot",
      "Rómeóhoz nem jut el Lőrinc barát levele",
      "Páris megmérgezi Rómeót"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1476",
    "category": "literature",
    "prompt": "Ki segítette különösen a reneszánsz műveltség meghonosodását Magyarországon?",
    "options": [
      "Hunyadi János",
      "Beatrix királyné",
      "Dobó István",
      "Zrínyi Miklós"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1477",
    "category": "literature",
    "prompt": "Melyik állítás igaz Jannus Pannoniusra?",
    "options": [
      "Magyar nyelven írt szerelmi dalokat",
      "Latin nyelven alkotott, és Mátyás udvarának humanista költője volt",
      "Csak vallásos himnuszokat írt",
      "Angliában tanult és ott is maradt"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1478",
    "category": "literature",
    "prompt": "Melyik műfaj tartozik Jannus Pannoniushoz?",
    "options": [
      "Regény",
      "Epigramma",
      "Ballada",
      "Misztériumjáték"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1479",
    "category": "literature",
    "prompt": "Mi jellemzi az epigrammát?",
    "options": [
      "Hosszú elbeszélő költemény",
      "Rövid, tömör, gyakran szellemes műfaj",
      "Kizárólag vallásos tárgyú vers",
      "Csak rímtelen formában létezhet"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1480",
    "category": "literature",
    "prompt": "Mi emelkedik ideállá Balassi Bálint Egy katonaének című versében?",
    "options": [
      "A szerzetes",
      "A királyi udvaronc",
      "A végvári vitéz",
      "A kereskedő"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1481",
    "category": "literature",
    "prompt": "Mi jellemzi legpontosabban a barokkot?",
    "options": [
      "A 15. század lovagi stílusirányzata",
      "A 17–18. század európai művelődéstörténeti korszaka és stílusirányzata",
      "Kizárólag protestáns egyházi mozgalom",
      "Csak az angol dráma stílusa"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1482",
    "category": "literature",
    "prompt": "Mit akart a barokk művészet elsősorban kifejezni?",
    "options": [
      "Az emberi értelem elsőbbségét",
      "A hit erejét és Isten hatalmasságát",
      "A természet tudományos rendjét",
      "A hétköznapi élet egyszerűségét"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1483",
    "category": "literature",
    "prompt": "Mi került a barokk középpontjába?",
    "options": [
      "A mértéktartás és az egyszerűség",
      "A monumentalitás, a mozgalmasság és a túláradó díszítettség",
      "A szigorú tárgyilagosság",
      "A rövid, tömör formák"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1484",
    "category": "literature",
    "prompt": "Mi határozta meg döntően a barokk kialakulását?",
    "options": [
      "A felvilágosodás",
      "A reformáció és az ellenreformáció",
      "Az ipari forradalom",
      "A romantika"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1485",
    "category": "literature",
    "prompt": "Mi volt a tridenti zsinat utáni katolikus művészet egyik célja?",
    "options": [
      "A hívők racionális oktatása kizárólag tankönyvekkel",
      "A szemlélő érzelmi megrázása és meggyőzése",
      "A vallási témák háttérbe szorítása",
      "A díszítés teljes elutasítása"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1486",
    "category": "literature",
    "prompt": "Miért fordult el a barokk a reneszánsz harmóniájától?",
    "options": [
      "Mert a reneszánsz vallásellenes volt",
      "Mert sokan már nem érezték elég kifejezőnek a reneszánsz mértéktartó embereszményét",
      "Mert a reneszánsz kizárólag latin nyelvű volt",
      "Mert a reneszánsz csak az építészetben létezett"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1487",
    "category": "literature",
    "prompt": "Hol volt a barokk bölcsője?",
    "options": [
      "London és Párizs",
      "Róma és a katolikus itáliai fejedelemségek",
      "Bécs és Berlin",
      "Athén és Spárta"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1488",
    "category": "literature",
    "prompt": "Kik terjesztették látványosan a barokk pompáját a világi térben is?",
    "options": [
      "A polgári céhek",
      "Az abszolutista uralkodók",
      "A protestáns prédikátorok",
      "A paraszti közösségek"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1489",
    "category": "literature",
    "prompt": "Mi jellemzi a barokk irodalmi nyelvet?",
    "options": [
      "Rövid, egyszerű mondatok",
      "Díszített, körülíró nyelv, körmondatok, halmozás, pátosz",
      "Kizárólag párbeszédes forma",
      "Tárgyilagos jogi stílus"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1490",
    "category": "literature",
    "prompt": "Mi áll a reformáció hátterében?",
    "options": [
      "A katolikus egyház teljes megerősödése",
      "Az egyház visszaélései és a hit eltorzulása elleni fellépés",
      "A reneszánsz művészet elutasítása",
      "A török terjeszkedés megállítása"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1491",
    "category": "literature",
    "prompt": "Ki szegezte ki 95 tételét 1517-ben?",
    "options": [
      "Kálvin János",
      "Luther Márton",
      "Pázmány Péter",
      "Károli Gáspár"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1492",
    "category": "literature",
    "prompt": "Mi lett a reformáció egyik legfontosabb következménye?",
    "options": [
      "A latin nyelv kizárólagossága",
      "Az anyanyelvűség előretörése",
      "A könyvnyomtatás betiltása",
      "A barokk megszűnése"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1493",
    "category": "literature",
    "prompt": "Mi segítette különösen a reformáció eszméinek gyors terjedését?",
    "options": [
      "A tengeri hajózás",
      "A könyvnyomtatás",
      "A színház",
      "A kőnyomatos sajtó"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1494",
    "category": "literature",
    "prompt": "Ki volt a magyarországi ellenreformáció legfontosabb alakja?",
    "options": [
      "Zrínyi Miklós",
      "Mikes Kelemen",
      "Pázmány Péter",
      "Balassi Bálint"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1495",
    "category": "literature",
    "prompt": "Mi segítette a barokk meghonosodását Magyarországon?",
    "options": [
      "A református kollégiumok kizárólagos szerepe",
      "A Habsburg-udvar és a jezsuita rend",
      "A paraszti önkormányzatok",
      "Az angol királyi udvar"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1496",
    "category": "literature",
    "prompt": "Melyik műfaj tartozik a barokk kedvelt műfajai közé?",
    "options": [
      "Hősi eposz",
      "Antik tragédia",
      "Modern regény",
      "Tudományos esszé"
    ],
    "correctOptionIndex": 0
  },
  {
    "id": "mcq_1497",
    "category": "literature",
    "prompt": "Mi Pázmány Péter Imádságos könyvének legfőbb jellemzője?",
    "options": [
      "Világi szerelmi költészet",
      "Vallásos, elmélkedő, barokkosan díszített próza",
      "Történelmi dráma",
      "Politikai röpirat"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1498",
    "category": "literature",
    "prompt": "Mi jellemzi Mikes Kelemen Törökországi levelek című művét?",
    "options": [
      "Történelmi eposz",
      "Levélformába írt emlékirat finom iróniával és személyes hanggal",
      "Drámai költemény",
      "Kizárólag vallási prédikáció"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1499",
    "category": "literature",
    "prompt": "Kihez írja Mikes a leveleket irodalmi játék formájában?",
    "options": [
      "II. Rákóczi Ferenchez",
      "Egy P. E. nevű „édes nénémhez”",
      "A török szultánhoz",
      "Pázmány Péterhez"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1500",
    "category": "literature",
    "prompt": "Miért kiemelkedő a Törökországi levelek?",
    "options": [
      "Mert az első magyar nyelvű eposz",
      "Mert a magyar széppróza megteremtője",
      "Mert az első magyar tragédia",
      "Mert latin nyelven íródott"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1501",
    "category": "literature",
    "prompt": "Ki a magyar barokk irodalom legnagyobb alakja ?",
    "options": [
      "Jannus Pannonius",
      "Pázmány Péter",
      "Zrínyi Miklós",
      "Csokonai Vitéz Mihály"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1502",
    "category": "literature",
    "prompt": "Mi Zrínyi Miklós legfontosabb műve?",
    "options": [
      "Törökországi levelek",
      "Imádságos könyv",
      "Szigeti veszedelem",
      "Halotti beszéd"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1503",
    "category": "literature",
    "prompt": "Mit beszél el a Szigeti veszedelem?",
    "options": [
      "Mohács csatáját",
      "Szigetvár 1566-os ostromát és Zrínyi dédapjának hősi halálát",
      "Buda visszafoglalását",
      "A Rákóczi-szabadságharcot"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1504",
    "category": "literature",
    "prompt": "Miért különösen jelentős a Szigeti veszedelem?",
    "options": [
      "Mert ez az első magyar nyelvű szonettciklus",
      "Mert ez az első igazi eposz magyar nyelven",
      "Mert ez az első magyar regény",
      "Mert kizárólag mitológiai témát dolgoz fel"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1505",
    "category": "literature",
    "prompt": "Mi jellemzi a Szigeti veszedelem barokk stílusát?",
    "options": [
      "Tömör, szikár, dísztelen nyelv",
      "Hosszú körmondatok, patetikus hangnem, ellentétek és vallásos-mitologikus elemek keveredése",
      "Csak humoros hangvétel",
      "Kizárólag realista leírás"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1506",
    "category": "literature",
    "prompt": "Mi állt a felvilágosodás gondolkodásának középpontjában?",
    "options": [
      "A feudális kiváltságok megőrzése",
      "Az ész, a tudomány és a társadalmi fejlődés",
      "A lovagi eszmény újjáélesztése",
      "A vallási misztika kizárólagossága"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1507",
    "category": "literature",
    "prompt": "Melyik társadalmi réteg megerősödése segítette leginkább a felvilágosodás elterjedését?",
    "options": [
      "A jobbágyságé",
      "A polgárságé",
      "A papságé",
      "A lovagságé"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1508",
    "category": "literature",
    "prompt": "Melyik jelszó kapcsolódik legszorosabban a felvilágosodás politikai eszméinek történelmi áttöréséhez?",
    "options": [
      "Haza és haladás",
      "Szabadság, egyenlőség, testvériség",
      "Hit, remény, szeretet",
      "Rend és béke"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1509",
    "category": "literature",
    "prompt": "Mi gyengítette meg az egyház kizárólagos magyarázó szerepét a világ működéséről?",
    "options": [
      "A lovagi költészet",
      "Newton és Galilei tudományos eredményei",
      "Az eposzok újjáéledése",
      "A barokk festészet"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1510",
    "category": "literature",
    "prompt": "Miért honosodott meg később a felvilágosodás Magyarországon, mint Nyugat-Európában?",
    "options": [
      "Mert tilos volt magyarul írni",
      "Mert lassú volt a polgárosodás, és sokáig fennmaradtak a rendi–feudális viszonyok",
      "Mert nem létezett nyomtatás",
      "Mert nem voltak iskolák"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1511",
    "category": "literature",
    "prompt": "Mi volt hosszú ideig a hivatalos nyelv Magyarországon?",
    "options": [
      "Német",
      "Latin",
      "Görög",
      "Francia"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1512",
    "category": "literature",
    "prompt": "Mit vall a racionalizmus?",
    "options": [
      "A biztos tudás végső forrása a tapasztalat",
      "A biztos tudás végső forrása az emberi értelem",
      "A biztos tudás végső forrása a hagyomány",
      "A biztos tudás végső forrása a vallási tekintély"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1513",
    "category": "literature",
    "prompt": "Ki a racionalizmus legismertebb képviselője?",
    "options": [
      "John Locke",
      "Jean-Jacques Rousseau",
      "René Descartes",
      "Jonathan Swift"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1514",
    "category": "literature",
    "prompt": "Melyik híres mondat kapcsolódik René Descartes-hoz?",
    "options": [
      "Az ember szabadnak született",
      "Gondolkodom, tehát vagyok",
      "Minden tudás tapasztalatból ered",
      "Az ember farkasa az embernek"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1515",
    "category": "literature",
    "prompt": "Mit vall az empirizmus?",
    "options": [
      "Az igazság csak a hitből ismerhető meg",
      "A tudás alapja a tapasztalat és az érzékelés",
      "A tudás alapja a velünk született eszmék világa",
      "A tudás alapja az ókori szerzők utánzása"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1516",
    "category": "literature",
    "prompt": "Kihez kötődik a „tabula rasa” gondolata?",
    "options": [
      "Voltaire",
      "Rousseau",
      "John Locke",
      "Descartes"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1517",
    "category": "literature",
    "prompt": "Mi jellemzi leginkább a klasszicizmust?",
    "options": [
      "Szabálytudat, mértéktartás, logikus szerkezet",
      "Erős vallásos látomásosság",
      "Játékosság és szalonhangulat",
      "Borongós, befelé forduló önvizsgálat"
    ],
    "correctOptionIndex": 0
  },
  {
    "id": "mcq_1518",
    "category": "literature",
    "prompt": "Mi jellemzi leginkább a szentimentalizmust?",
    "options": [
      "A közéleti szatíra uralma",
      "Az érzelemközpontúság, a melankólia és a belső vívódás",
      "A mitológiai hősök világának utánzása",
      "A tudományos pontosság és objektivitás"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1519",
    "category": "literature",
    "prompt": "Mi jellemzi leginkább a rokokót?",
    "options": [
      "Monumentalitás és pátosz",
      "Közéleti harciasság",
      "Könnyedség, játékosság, finom udvari hangulat",
      "Komor történelmi látásmód"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1520",
    "category": "literature",
    "prompt": "Miért alakulhatott ki a felvilágosodás korában több párhuzamos stílusirányzat?",
    "options": [
      "Mert megszűnt az irodalom társadalmi szerepe",
      "Mert kiszélesedett a művelt társadalom köre",
      "Mert minden író ugyanazt a mintát követte",
      "Mert csak vallásos művek születtek"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1521",
    "category": "literature",
    "prompt": "Mi Jonathan Swift Gulliver utazásai című művének alapvető sajátossága?",
    "options": [
      "Idilli szerelmi regény",
      "Szatirikus regény, amely torzítótükörben mutatja az emberi társadalmat",
      "Klasszicista dráma",
      "Levélregény"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1522",
    "category": "literature",
    "prompt": "Mi a lilliputiak és Blefuscu konfliktusának egyik ironikus jelképe?",
    "options": [
      "A hajózás szabályai",
      "A tojás feltörésének módja",
      "A pénzverés rendje",
      "A katonai egyenruhák színe"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1523",
    "category": "literature",
    "prompt": "Mit leplez le a Brobdingnagban játszódó rész?",
    "options": [
      "A gyermeknevelés hibáit",
      "Az ember jelentéktelenségét és az európai civilizáció visszásságait",
      "A természet szépségét",
      "A vallási élet tisztaságát"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1524",
    "category": "literature",
    "prompt": "Mit gúnyol ki Laputa és a lagadói Akadémia világa?",
    "options": [
      "A népköltészetet",
      "Az öncélú, a gyakorlati élettől elszakadt tudóskodást",
      "A családi életet",
      "A színház világát"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1525",
    "category": "literature",
    "prompt": "Kik a nyihahák Gulliver negyedik utazásában?",
    "options": [
      "Vad tengeri rablók",
      "Értelmes, erkölcsös lovak",
      "Óriás termetű emberek",
      "Törpe udvaroncok"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1526",
    "category": "literature",
    "prompt": "Miért fontos Bessenyei György Ágis tragédiája?",
    "options": [
      "Mert az első magyar regény",
      "Mert a magyar felvilágosodás irodalmi nyitányának tekintik",
      "Mert az első magyar vígeposz",
      "Mert a nyelvújítás záróműve"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1527",
    "category": "literature",
    "prompt": "Mi áll Ágis tragédiája középpontjában?",
    "options": [
      "Egy szerelmi háromszög",
      "A zsarnokság, az önzés és a közérdek konfliktusa",
      "Egy mitológiai istenharc",
      "Egy családi örökségvita"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1528",
    "category": "literature",
    "prompt": "Ki a magyar nyelvújítás vezéralakja?",
    "options": [
      "Bessenyei György",
      "Kazinczy Ferenc",
      "Csokonai Vitéz Mihály",
      "Pázmány Péter"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1529",
    "category": "literature",
    "prompt": "Melyik táborhoz tartozott Kazinczy Ferenc a nyelvújítás vitájában?",
    "options": [
      "Ortológusok",
      "Neológusok",
      "Puristák",
      "Misztikusok"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1530",
    "category": "literature",
    "prompt": "Mi volt a nyelvújítás egyik fő célja?",
    "options": [
      "A latin nyelv teljes visszaállítása",
      "A magyar nyelv alkalmassá tétele tudományra, irodalomra és közéletre",
      "A német nyelv kötelezővé tétele",
      "A tájnyelvek megszüntetése"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1531",
    "category": "literature",
    "prompt": "Mi történt Csokonai Vitéz Mihállyal 1795-ben?",
    "options": [
      "Megházasodott",
      "A Debreceni Református Kollégiumból fegyelmi okok miatt kizárták",
      "Külföldre költözött",
      "Megjelent első regénye"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1532",
    "category": "literature",
    "prompt": "Ki volt „Lilla” Csokonai életében?",
    "options": [
      "Tanára",
      "Testvére",
      "Nagy szerelme, Vajda Julianna",
      "Kiadója lánya"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1533",
    "category": "literature",
    "prompt": "Melyik műfajba tartozik Csokonai Az estve című verse?",
    "options": [
      "Elégia",
      "Óda",
      "Szonett",
      "Ballada"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1534",
    "category": "literature",
    "prompt": "Mi Az estve központi gondolata?",
    "options": [
      "A városi élet szépsége",
      "A magántulajdon és a társadalmi különbségek megrontják az emberi együttélést",
      "A hősi szerelem mindent legyőz",
      "A tudomány minden problémát megold"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1535",
    "category": "literature",
    "prompt": "Mi jellemzi legerősebben A Reményhez zárlatát?",
    "options": [
      "Diadalmas bizakodás",
      "Játékos irónia",
      "Rezignáció, kiábrándultság és búcsú",
      "Tárgyilagos filozófiai érvelés"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1536",
    "category": "literature",
    "prompt": "Mi jellemzi legpontosabban a romantikát?",
    "options": [
      "A 16. század vallásos stílusirányzata",
      "A 18. század vége és a 19. század közepe között kibontakozó európai korstílus",
      "Kizárólag filozófiai iskola",
      "Csak a regény műfajának megújulása"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1537",
    "category": "literature",
    "prompt": "Mi a romantika egyik fő jellemzője?",
    "options": [
      "A szabályosság és mértéktartás elsőbbsége",
      "Az idealizálás",
      "A tárgyilagos tudományosság",
      "A szigorú klasszikus formafegyelem kizárólagossága"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1538",
    "category": "literature",
    "prompt": "Mit állít középpontba a romantika a racionalitással szemben?",
    "options": [
      "Az érzelmeket, a belső élményt és a szenvedélyt",
      "A politikai intézményrendszert",
      "Az udvari etikettet",
      "A vallási dogmát"
    ],
    "correctOptionIndex": 0
  },
  {
    "id": "mcq_1539",
    "category": "literature",
    "prompt": "Mit jelent a természetkultusz a romantikában?",
    "options": [
      "A mezőgazdasági munka dicséretét",
      "A természetbe való visszavágyást és a természet jelképes felértékelését",
      "A természet tudományos rendszerezését",
      "A tájképfestészet kizárólagos uralmát"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1540",
    "category": "literature",
    "prompt": "Mi ellenreakciójaként született meg a romantika?",
    "options": [
      "A realizmus társadalomkritikája ellen",
      "A felvilágosodás racionalizmusa és a klasszicizmus szabálykövetése ellen",
      "A barokk vallásossága ellen",
      "A reneszánsz humanizmusa ellen"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1541",
    "category": "literature",
    "prompt": "Miért fordult el a romantika az „ész mindent megold” szemlélettől?",
    "options": [
      "Mert a tudomány megszűnt fejlődni",
      "Mert a romantika szerint az ember és a világ nem írható le pusztán józan elvekkel",
      "Mert az írók csak történelmi témákat akartak feldolgozni",
      "Mert a klasszicizmus tiltottá vált"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1542",
    "category": "literature",
    "prompt": "Milyen szerepet kap a művészet a romantikában?",
    "options": [
      "Az önkifejezés és a szabadság eszközévé válik",
      "Csak erkölcsi példázatok illusztrációja lesz",
      "Kizárólag a vallásos nevelés eszköze marad",
      "Csak a társadalmi rend fenntartását szolgálja"
    ],
    "correctOptionIndex": 0
  },
  {
    "id": "mcq_1543",
    "category": "literature",
    "prompt": "Mi gyorsította különösen a romantika kialakulását a 18–19. század fordulóján?",
    "options": [
      "A reformáció",
      "A forradalmak",
      "A keresztes háborúk",
      "A tridenti zsinat"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1544",
    "category": "literature",
    "prompt": "Mit erősített fel a nemzeti ébredés a romantika korában?",
    "options": [
      "A latin nyelv kizárólagosságát",
      "A népek múltjuk, nyelvük és hagyományaik iránti érdeklődését",
      "A vallási közönyt",
      "A feudális rend szilárdságát"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1545",
    "category": "literature",
    "prompt": "Miért értékelődött fel a népköltészet és a népi kultúra a romantikában?",
    "options": [
      "Mert könnyebben tanítható volt az iskolákban",
      "Mert a nemzeti identitás fontos forrásává vált",
      "Mert minden romantikus mű népköltészeti alkotás volt",
      "Mert a történelmi témák háttérbe szorultak"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1546",
    "category": "literature",
    "prompt": "Hogyan hatott az első ipari forradalom a romantika szemléletére?",
    "options": [
      "A technikai fejlődés feltétlen dicséretét hozta",
      "A természetbe való visszavágyást és a gépiesedő világgal szembeni ellenérzést erősítette",
      "Megszüntette a természetábrázolást",
      "Csak a városi élet idealizálását ösztönözte"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1547",
    "category": "literature",
    "prompt": "Mit jelképez a természet a romantikában?",
    "options": [
      "Csak díszletet",
      "A lélek tükrét, a szabadságot és a teljességet",
      "Az állami rendet",
      "A tudományos gondolkodást"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1548",
    "category": "literature",
    "prompt": "Ki a magyar líra első preromantikus vonásokkal alkotó klasszicista költője?",
    "options": [
      "Kölcsey Ferenc",
      "Csokonai Vitéz Mihály",
      "Berzsenyi Dániel",
      "Kazinczy Ferenc"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1549",
    "category": "literature",
    "prompt": "Miért nevezték Berzsenyi Dánielt „niklai remetének”?",
    "options": [
      "Mert szerzetesi fogadalmat tett",
      "Mert Niklán, visszavonultan élt birtokos gazdálkodóként",
      "Mert száműzetésben élt",
      "Mert remeteházban tanított"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1550",
    "category": "literature",
    "prompt": "Mi indította el leginkább Berzsenyi Dániel irodalmi pályáját?",
    "options": [
      "A színházi szereplései",
      "A Kazinczy Ferenccel folytatott levelezése",
      "A katonai szolgálata",
      "A külföldi tanulmányútja"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1551",
    "category": "literature",
    "prompt": "Miért kereste meg Berzsenyi Dániel Kazinczy Ferencet?",
    "options": [
      "Hogy együtt írjanak drámát",
      "Hogy versei eljussanak a nyilvánossághoz és szakmai visszajelzést kapjon",
      "Hogy politikai támogatást kérjen",
      "Hogy kiadót alapítsanak"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1552",
    "category": "literature",
    "prompt": "Ki bírálta Berzsenyi Dániel kötetét olyan kritikában, amely mélyen érintette a költőt?",
    "options": [
      "Vörösmarty Mihály",
      "Arany János",
      "Kölcsey Ferenc",
      "Jókai Mór"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1553",
    "category": "literature",
    "prompt": "Melyik művel válaszolt Berzsenyi Dániel a róla szóló kritikára?",
    "options": [
      "Fohászkodás",
      "Antirecensio",
      "A közelítő tél",
      "A magyarokhoz II."
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1554",
    "category": "literature",
    "prompt": "Miért irodalomtörténetileg fontos a Kölcsey–Berzsenyi-vita?",
    "options": [
      "Mert ez zárta le a reformkort",
      "Mert jól mutatja az ízlésváltást és a magyar irodalmi kritika megszületését",
      "Mert ezzel kezdődött a nyelvújítás",
      "Mert ekkor alakult meg a Magyar Tudományos Akadémia"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1555",
    "category": "literature",
    "prompt": "Mely műfajok a legjellemzőbbek Berzsenyi Dániel költészetére?",
    "options": [
      "Regény és dráma",
      "Óda és elégia",
      "Ballada és eposz",
      "Levél és emlékirat"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1556",
    "category": "literature",
    "prompt": "Miért nevezik Berzsenyi Dánielt „a magyar Horatiusnak”?",
    "options": [
      "Mert Rómában élt",
      "Mert költészete tudatosan épít az antik mintákra és az ódai formakultúrára",
      "Mert latin nyelven alkotott",
      "Mert csak bölcseleti verseket írt"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1557",
    "category": "literature",
    "prompt": "Mely korszak szemlélete felé vezet át Berzsenyi Dániel költészete?",
    "options": [
      "A középkor felé",
      "A reformkor felé",
      "A realizmus felé",
      "A szimbolizmus felé"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1558",
    "category": "literature",
    "prompt": "Milyen műfajú Berzsenyi Dániel A magyarokhoz I. című költeménye?",
    "options": [
      "Elégia",
      "Óda",
      "Ballada",
      "Dal"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1559",
    "category": "literature",
    "prompt": "Mi Berzsenyi Dániel A magyarokhoz I. című versének központi témája?",
    "options": [
      "A szerelem dicsérete",
      "A magyar nemzet hanyatlása az erkölcsök megromlása miatt",
      "A természet szépsége",
      "A vallásos megváltás"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1560",
    "category": "literature",
    "prompt": "Mi Berzsenyi Dániel célja A magyarokhoz I. című versben?",
    "options": [
      "A történelmi múlt tárgyilagos leírása",
      "A nemzet figyelmeztetése és erkölcsi felrázása",
      "Egy csata részletes elbeszélése",
      "A nemzeti dicsőség múltba zárása"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1561",
    "category": "literature",
    "prompt": "Melyik szerkezeti elv határozza meg legerősebben Berzsenyi Dániel A magyarokhoz I. című versét?",
    "options": [
      "Tér és idő feloldása",
      "Múlt és jelen szembeállítása",
      "Párbeszédes szerkezet",
      "Körkörös ismétlődés"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1562",
    "category": "literature",
    "prompt": "Melyik megszólítás jelzi közvetlenül, hogy Berzsenyi Dániel A magyarokhoz I. című versében a lírai én a nemzethez fordul?",
    "options": [
      "„Hazám”",
      "„Nemzetem”",
      "„Magyar!”",
      "„Barátim!”"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1563",
    "category": "literature",
    "prompt": "Mit tesz Berzsenyi Dániel A magyarokhoz I. című versének első három versszaka?",
    "options": [
      "A jövő reményeit vázolja",
      "A jelen bűneit és hibáit sorolja",
      "A múlt dicsőségét idézi fel",
      "A természetet írja le"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1564",
    "category": "literature",
    "prompt": "Kik jelennek meg Berzsenyi Dániel A magyarokhoz I. című versének múltidéző részében dicső példaként?",
    "options": [
      "Rákóczi, Kossuth és Széchenyi",
      "Attila, Árpád és Hunyadi János",
      "Mátyás király, Zrínyi Miklós és Arany János",
      "Caesar, Augustus és Titus"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1565",
    "category": "literature",
    "prompt": "Mit jelképez a viharvert tölgyfa képe Berzsenyi Dániel A magyarokhoz I. című versében?",
    "options": [
      "A természet örök rendjét",
      "A nemzet belső erkölcsi romlását",
      "A külső ellenségek erejét",
      "A történelmi dicsőség állandóságát"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1566",
    "category": "literature",
    "prompt": "Mit jelent a „Rút sybarita váz” kifejezés Berzsenyi Dániel A magyarokhoz I. című versében?",
    "options": [
      "A hősies, harcra kész magyarságot",
      "Az elpuhult, élvhajhász, erkölcsileg meggyengült magyarságot",
      "A klasszikus műveltség eszményét",
      "A múlt dicső harcosait"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1567",
    "category": "literature",
    "prompt": "Milyen hangnemi változás következik be Berzsenyi Dániel A magyarokhoz I. című versének 13–14. versszakára?",
    "options": [
      "Gúnyos szatírává válik",
      "Elégikussá, fájdalmasan lemondóvá válik",
      "Harsányan diadalittassá válik",
      "Tárgyilagos krónikává válik"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1568",
    "category": "literature",
    "prompt": "Mi Berzsenyi Dániel A magyarokhoz I. című versének végső figyelmeztetése?",
    "options": [
      "A külső ellenség minden baj oka",
      "Ha a tiszta erkölcs elvész, a nemzet is elpusztulhat",
      "A múlt dicsősége önmagában megmenti a hazát",
      "A szerencse mindig igazságot tesz"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1569",
    "category": "literature",
    "prompt": "Milyen műfajú Berzsenyi Dániel A magyarokhoz II. című költeménye?",
    "options": [
      "Himnusz",
      "Óda",
      "Ballada",
      "Episztola"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1570",
    "category": "literature",
    "prompt": "Mi jellemzi Berzsenyi Dániel A magyarokhoz II. című versének alaphangulatát az első részhez képest?",
    "options": [
      "Sokkal pesszimistább",
      "Jóval optimistább és lelkesítőbb",
      "Teljesen ironikus",
      "Kizárólag gyászos"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1571",
    "category": "literature",
    "prompt": "Milyen történelmi háttérre reagál Berzsenyi Dániel A magyarokhoz II. című verse?",
    "options": [
      "Az 1848-as forradalomra",
      "A napóleoni háborúk korára",
      "A Rákóczi-szabadságharcra",
      "A török kiűzésére"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1572",
    "category": "literature",
    "prompt": "Mit jelképez a viharzó tenger képe Berzsenyi Dániel A magyarokhoz II. című versében?",
    "options": [
      "A természet szépségét",
      "A napóleoni háborúk világszintű zűrzavarát",
      "A magyar nép belső békéjét",
      "A vallásos megújulást"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1573",
    "category": "literature",
    "prompt": "Melyik felszólítás hangzik el Berzsenyi Dániel A magyarokhoz II. című versében?",
    "options": [
      "„Ne nézz hátra, magyar!”",
      "„Ébreszd fel alvó nemzeti lelkedet!”",
      "„Térj vissza őseid földjére!”",
      "„Feledd el a múltad!”"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1574",
    "category": "literature",
    "prompt": "Mi a két legfontosabb pillére Berzsenyi Dániel A magyarokhoz II. című versében a nemzeti helytállásnak?",
    "options": [
      "A gazdagság és a hadsereg",
      "A jó uralkodó és a nép tiszta erkölcse, szabadságszeretete",
      "A múlt dicsősége és a külső segítség",
      "A vallási fanatizmus és a bosszú"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1575",
    "category": "literature",
    "prompt": "Milyen beszédhelyzet-változás történik Berzsenyi Dániel A magyarokhoz II. című versének végén?",
    "options": [
      "A lírai én E/1.-ből E/3.-ba vált",
      "A lírai én E/2.-ből E/1.-be vált, és azonosul a közösséggel",
      "A lírai én teljesen eltűnik a versből",
      "A lírai én párbeszédet kezd az ellenséggel"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1576",
    "category": "literature",
    "prompt": "Mi tette különösen jelentőssé Petőfi Sándor költői megszólalását a reformkor Magyarországán?",
    "options": [
      "Kizárólag latinul írt",
      "A líra nyelvét széles tömegek számára is közvetlenül hozzáférhetővé tette",
      "Csak főnemesi köröknek írt",
      "Tudatosan kerülte a nemzeti témákat"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1577",
    "category": "literature",
    "prompt": "Miben különbözött Petőfi Sándor költői nyelve sok korábbi költő megszólalásától?",
    "options": [
      "Sokkal bonyolultabb és körmondatosabb volt",
      "Kizárólag német mintákat követett",
      "Közérthetőbb és megszólítóbb volt",
      "Csak tudományos nyelvet használt"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1578",
    "category": "literature",
    "prompt": "Miért volt különösen fontos Petőfi Sándor fellépése az 1840-es évek Magyarországán?",
    "options": [
      "Mert ekkor már megszűnt minden társadalmi feszültség",
      "Mert az ország éppen a nemzeti önazonosságát és közösségi nyelvét kereste",
      "Mert az irodalom ekkor háttérbe szorult",
      "Mert csak a történetírásnak volt szerepe"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1579",
    "category": "literature",
    "prompt": "Mi segítette Petőfi Sándor verseinek erős közösségi hatását?",
    "options": [
      "Az, hogy kizárólag mitológiai tárgyakat választott",
      "Az, hogy népies hangon, ismerős magyar képekkel és ritmusokkal írt",
      "Az, hogy mindig latin idézetekre épített",
      "Az, hogy elutasította a magyar tájat"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1580",
    "category": "literature",
    "prompt": "Melyik állítás foglalja össze legpontosabban Petőfi Sándor irodalmi jelentőségét?",
    "options": [
      "A magyar dráma egyetlen megújítója volt",
      "A magyar lírát közösségteremtő erővé emelte",
      "Csak szerelmes versei miatt lett ismert",
      "Csak politikai röpiratokat írt"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1581",
    "category": "literature",
    "prompt": "Mi volt Petőfi Sándor születési neve?",
    "options": [
      "Petres Sándor",
      "Petrovics Sándor",
      "Pálfi Sándor",
      "Pethő Sándor"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1582",
    "category": "literature",
    "prompt": "Hol született Petőfi Sándor?",
    "options": [
      "Kiskunfélegyházán",
      "Pesten",
      "Kiskőrösön",
      "Aszódon"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1583",
    "category": "literature",
    "prompt": "Melyik várost tekintette Petőfi Sándor igazi szülőföldjének?",
    "options": [
      "Kiskőröst",
      "Kiskunfélegyházát",
      "Sopront",
      "Debrecent"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1584",
    "category": "literature",
    "prompt": "Hol dolgozott Petőfi Sándor, amikor 1839-ben Pestre került?",
    "options": [
      "A Pesti Hírlapnál",
      "A Nemzeti Színháznál statisztaként",
      "A Kisfaludy Társaságnál",
      "A Pesti Divatlap főszerkesztőjeként"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1585",
    "category": "literature",
    "prompt": "Kivel kötött barátságot Petőfi Sándor pápai tanulmányai idején?",
    "options": [
      "Arany Jánossal",
      "Jókai Mórral",
      "Vörösmarty Mihállyal",
      "Madách Imrével"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1586",
    "category": "literature",
    "prompt": "Melyik folyóiratban jelent meg Petőfi Sándor első nyomtatásban közölt verse, A borozó?",
    "options": [
      "Koszorú",
      "Athenaeum",
      "Nyugat",
      "Figyelő"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1587",
    "category": "literature",
    "prompt": "Ki segítette Petőfi Sándort első verseskötetének kiadásában?",
    "options": [
      "Kazinczy Ferenc",
      "Arany János",
      "Vörösmarty Mihály",
      "Gyulai Pál"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1588",
    "category": "literature",
    "prompt": "Melyik műfajú alkotás Petőfi Sándor A helység kalapácsa című műve?",
    "options": [
      "Történelmi ballada",
      "Vígeposz",
      "Elégia",
      "Drámai költemény"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1589",
    "category": "literature",
    "prompt": "Melyik Petőfi-mű mesés elbeszélő költemény, amely a nép egyszerű fiának hőssé válását mutatja be?",
    "options": [
      "Az apostol",
      "A helység kalapácsa",
      "János vitéz",
      "A nép nevében"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1590",
    "category": "literature",
    "prompt": "Mi jellemzi Petőfi Sándor korai, 1842–1844 közötti alkotói korszakát?",
    "options": [
      "A balladák túlsúlya",
      "A népdalszerű hang, az önéletrajzi ihletettség és a dallamosság",
      "A tudományos értekezések dominanciája",
      "A történelmi drámák uralma"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1591",
    "category": "literature",
    "prompt": "Melyik versciklus tartozik Petőfi Sándor válságkorszakához?",
    "options": [
      "Őszikék",
      "Felhők",
      "Szerelem gyöngyei",
      "Toldi estéje"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1592",
    "category": "literature",
    "prompt": "Mi jellemzi Petőfi Sándor érett, 1846 utáni korszakát?",
    "options": [
      "A teljes hallgatás",
      "A forradalmi és hitvesi líra megerősödése",
      "A klasszicista szabálykövetés kizárólagossága",
      "Az epika teljes elutasítása"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1593",
    "category": "literature",
    "prompt": "Ki volt Petőfi Sándor felesége?",
    "options": [
      "Mednyánszky Berta",
      "Csapó Etelka",
      "Szendrey Júlia",
      "Ercsey Julianna"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1594",
    "category": "literature",
    "prompt": "Melyik versben fogalmazta meg Petőfi Sándor a hitvesi szerelem egyik legismertebb költeményét?",
    "options": [
      "A nép nevében",
      "Szeptember végén",
      "Föltámadott a tenger",
      "A puszta, télen"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1595",
    "category": "literature",
    "prompt": "Melyik eseményhez kapcsolódik közvetlenül Petőfi Sándor Nemzeti dal című verse?",
    "options": [
      "Az 1838-as árvízhez",
      "Az 1848. március 15-i pesti forradalomhoz",
      "A segesvári csatához",
      "A kiegyezéshez"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1596",
    "category": "literature",
    "prompt": "Hogyan tűnt el Petőfi Sándor?",
    "options": [
      "A budai ostromban veszett nyoma",
      "A segesvári csatában tűnt el",
      "Bujdosás közben halt meg",
      "Párizsban hunyt el emigrációban"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1597",
    "category": "literature",
    "prompt": "Ki Petőfi Sándor János vitéz című elbeszélő költeményének főhőse?",
    "options": [
      "Toldi Miklós",
      "Kukorica Jancsi",
      "Laczfi Endre",
      "Bence"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1598",
    "category": "literature",
    "prompt": "Miért nevezik a János vitéz főhősét kezdetben Kukorica Jancsinak?",
    "options": [
      "Mert kukoricát árult a piacon",
      "Mert kukoricaföldön találták",
      "Mert kukoricát termesztett",
      "Mert ez volt a családneve"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1599",
    "category": "literature",
    "prompt": "Ki Iluska a János vitéz történetében?",
    "options": [
      "A francia király leánya",
      "Jancsi mostohatestvére",
      "Jancsi szerelme",
      "A boszorkányok királynője"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1600",
    "category": "literature",
    "prompt": "Miért űzik el Kukorica Jancsit a faluból a János vitéz elején?",
    "options": [
      "Mert megtagadja a katonai szolgálatot",
      "Mert ellopja a gazda pénzét",
      "Mert a juhai szétszélednek, és elveszíti a nyájat",
      "Mert megsérti a bírót"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1601",
    "category": "literature",
    "prompt": "Mit tesz Kukorica Jancsi a rablóbandával a János vitézben?",
    "options": [
      "Vezérük lesz",
      "Elszökik előlük",
      "Felgyújtja a házat a lerészegedett rablókkal együtt",
      "Csatlakozik hozzájuk hosszabb időre"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1602",
    "category": "literature",
    "prompt": "Miért indulnak a magyar huszárok Franciaország megsegítésére a János vitézben?",
    "options": [
      "Mert a franciák meghívták őket ünnepségre",
      "Mert a törökök betörtek a francia király országába és elrabolták a királylányt",
      "Mert Jancsi ott akarta keresni Iluskát",
      "Mert a francia király pénzt ígért nekik"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1603",
    "category": "literature",
    "prompt": "Mit ajánl fel a francia király János vitéznek a győzelem után?",
    "options": [
      "Egy vármegyét és hadsereget",
      "Leánya kezét és a trónt",
      "Egy kolostort és birtokot",
      "Csak egy kardot"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1604",
    "category": "literature",
    "prompt": "Miért utasítja vissza János vitéz a francia király ajánlatát?",
    "options": [
      "Mert fél a francia udvartól",
      "Mert vissza akar térni Iluskához",
      "Mert gyűlöli a gazdagságot",
      "Mert meg akarja bosszulni a mostohát"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1605",
    "category": "literature",
    "prompt": "Mi pusztítja el János vitéz hajóját a hazafelé úton?",
    "options": [
      "Kalóztámadás",
      "Jéghegy",
      "Egy villámcsapás nyomán kitörő vihar",
      "Tengeri szörny"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1606",
    "category": "literature",
    "prompt": "Melyik különös lény segíti János vitézt hazatérni Magyarországra?",
    "options": [
      "Sárkány",
      "Griffmadár",
      "Főnixmadár",
      "Kentaur"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1607",
    "category": "literature",
    "prompt": "Mi történik Iluskával, mire János vitéz hazatér?",
    "options": [
      "Férjhez megy a gazdához",
      "Franciaországba költözik",
      "Meghal",
      "Tündérré változik"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1608",
    "category": "literature",
    "prompt": "Milyen jutalmat kér János vitéz az óriásoktól?",
    "options": [
      "Aranyhegyet",
      "Egy varázssípot",
      "Egy tündérlovat",
      "Egy kardot"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1609",
    "category": "literature",
    "prompt": "Ki az utolsó menekülő boszorkány a János vitézben, akit végül elpusztítanak?",
    "options": [
      "A francia királylány",
      "Iluska mostohája",
      "Iluska dajkája",
      "Jancsi nevelőanyja"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1610",
    "category": "literature",
    "prompt": "Milyen próbatételek várják János vitézt Tündérország előtt?",
    "options": [
      "Három folyón kell átkelnie",
      "Három vad medvével, három oroszlánnal és egy sárkánykígyóval kell megküzdenie",
      "Három király kérdéseire kell válaszolnia",
      "Három évig kell bujdosnia"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1611",
    "category": "literature",
    "prompt": "Melyik műfajba tartozik Petőfi Sándor A XIX. század költői című verse?",
    "options": [
      "Ballada",
      "Ars poetica",
      "Elbeszélő költemény",
      "Elégia"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1612",
    "category": "literature",
    "prompt": "Mit követel Petőfi Sándor A XIX. század költői című versében a költőktől?",
    "options": [
      "Csak saját érzéseiket énekeljék meg",
      "A nép szolgálatába álljanak és vezessék a közösséget",
      "Maradjanak távol a közélettől",
      "Kizárólag vallásos költészetet műveljenek"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1613",
    "category": "literature",
    "prompt": "Milyen bibliai képpel írja le Petőfi Sándor a költők hivatását A XIX. század költői című versben?",
    "options": [
      "Az özönvíz bárkájával",
      "A lángoszloppal, amely Mózes népét vezette",
      "Dávid parittyájával",
      "Jákob lajtorjájával"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1614",
    "category": "literature",
    "prompt": "Mit jelképez a Kánaán Petőfi Sándor A XIX. század költői című versében?",
    "options": [
      "A költői dicsőséget",
      "A boldog, igazságos jövőt",
      "A múlt dicsőségét",
      "A halált"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1615",
    "category": "literature",
    "prompt": "Melyik három feltételt sorolja fel Petőfi Sándor A XIX. század költői című versében a vágyott jövő részeként?",
    "options": [
      "Hit, remény, szeretet",
      "Bőség, jogegyenlőség, a tudás eljutása mindenkihez",
      "Katonai erő, vallási egység, királyhűség",
      "Gazdagság, hódítás, dicsőség"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1616",
    "category": "literature",
    "prompt": "Miben hozott újat Petőfi Sándor a magyar tájköltészetben?",
    "options": [
      "Kizárólag képzeletbeli hegyvidéket ábrázolt",
      "Konkrét, felismerhető tájakat ábrázolt realisztikusan",
      "Teljesen mellőzte a magyar tájat",
      "Csak allegorikus természetleírásokat írt"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1617",
    "category": "literature",
    "prompt": "Melyik tájegységet emelte Petőfi Sándor a magyar líra új eszményévé?",
    "options": [
      "A Felvidék hegyeit",
      "A Dunántúl erdeit",
      "A magyar Alföldet",
      "Erdély szikláit"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1618",
    "category": "literature",
    "prompt": "Melyik állítás igaz Petőfi Sándor A puszta, télen című versére?",
    "options": [
      "A téli tájat idilli, mozgalmas ünnepként mutatja be",
      "A hiányok és az elnémult élet képeivel építi fel a téli puszta hangulatát",
      "A városi élet nyüzsgését állítja középpontba",
      "Kizárólag szerelmi versként értelmezhető"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1619",
    "category": "literature",
    "prompt": "Melyik hasonlattal érzékelteti Petőfi Sándor A puszta, télen című versében a sík határ végtelenségét?",
    "options": [
      "Mint elhagyott templom",
      "Mint befagyott tenger",
      "Mint csatatér ütközet után",
      "Mint sötét erdő"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1620",
    "category": "literature",
    "prompt": "Mit jelképez a lenyugvó nap „véres koronája” Petőfi Sándor A puszta, télen című versének záróképében?",
    "options": [
      "A szerelem beteljesülését",
      "Az elnyomó hatalom bukását",
      "A természet örök körforgását",
      "A falu ünnepét"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1621",
    "category": "literature",
    "prompt": "Hol született Arany János?",
    "options": [
      "Nagykőrösön",
      "Nagyszalontán",
      "Debrecenben",
      "Pesten"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1622",
    "category": "literature",
    "prompt": "Melyik állítás igaz Arany János családi hátterére?",
    "options": [
      "Főnemesi családból származott",
      "Polgári kereskedőcsalád gyermeke volt",
      "Szegény református család késői gyermeke volt",
      "Katonacsaládban nevelkedett"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1623",
    "category": "literature",
    "prompt": "Hány évesen lett Arany János segédtanító?",
    "options": [
      "12 évesen",
      "14 évesen",
      "16 évesen",
      "18 évesen"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1624",
    "category": "literature",
    "prompt": "Melyik állítás igaz Arany János műveltségére?",
    "options": [
      "Csak magyarul és latinul olvasott",
      "Fiatalon több idegen nyelv irodalmát is eredetiben olvasta",
      "Kizárólag népköltészeti szövegeket ismert",
      "Csak színészi képzést kapott"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1625",
    "category": "literature",
    "prompt": "Mi történt Arany Jánossal 1836-ban?",
    "options": [
      "Megnősült",
      "Megírta a Toldit",
      "Otthagyta a debreceni kollégiumot és rövid ideig vándorszínésznek állt",
      "A Kisfaludy Társaság igazgatója lett"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1626",
    "category": "literature",
    "prompt": "Miért hagyott fel Arany János a színészi pályával?",
    "options": [
      "Mert külföldre költözött",
      "Mert a társulat feloszlott, és hazatérve súlyos családi tragédiákkal szembesült",
      "Mert katonának sorozták be",
      "Mert Petőfi lebeszélte róla"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1627",
    "category": "literature",
    "prompt": "Mi volt Arany János hivatali pályájának egyik korai állomása?",
    "options": [
      "Vármegyei főjegyző lett",
      "Szülővárosában aljegyző lett",
      "Miniszteri titkár lett",
      "Országgyűlési képviselő lett"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1628",
    "category": "literature",
    "prompt": "Ki volt Arany János felesége?",
    "options": [
      "Szendrey Júlia",
      "Ercsey Julianna",
      "Mednyánszky Berta",
      "Csapó Etelka"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1629",
    "category": "literature",
    "prompt": "Melyik mű hozta Arany János első jelentős sikerét 1845-ben?",
    "options": [
      "Toldi estéje",
      "Letészem a lantot",
      "Az elveszett alkotmány",
      "Ágnes asszony"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1630",
    "category": "literature",
    "prompt": "Milyen műfajú Arany János Az elveszett alkotmány című alkotása?",
    "options": [
      "Elégia",
      "Komikus eposz",
      "Ballada",
      "Ars poetica"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1631",
    "category": "literature",
    "prompt": "Melyik mű hozta meg Arany János igazi áttörését 1846-ban?",
    "options": [
      "Buda halála",
      "Toldi",
      "Tetemre hívás",
      "Epilógus"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1632",
    "category": "literature",
    "prompt": "Milyen műfajú Arany János Toldi című alkotása?",
    "options": [
      "Történelmi dráma",
      "Lélektani ballada",
      "Elbeszélő költemény",
      "Regény"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1633",
    "category": "literature",
    "prompt": "Melyik esemény indította el Petőfi Sándor és Arany János barátságát?",
    "options": [
      "Egy közös színésztársulat",
      "Petőfi elismerő levele a Toldi sikerével kapcsolatban",
      "Egy akadémiai ülés",
      "Közös nagykőrösi tanári munka"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1634",
    "category": "literature",
    "prompt": "Milyen szerepet vállalt Arany János az 1848–49-es szabadságharc idején?",
    "options": [
      "Honvéd tábornok lett",
      "Diplomáciai követ lett",
      "Nemzetőrként szolgált",
      "Újságíróként tudósított a frontról"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1635",
    "category": "literature",
    "prompt": "Hová költözött Arany János 1851-ben?",
    "options": [
      "Kolozsvárra",
      "Nagykőrösre",
      "Bécsbe",
      "Szegedre"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1636",
    "category": "literature",
    "prompt": "Mit tanított Arany János a nagykőrösi református gimnáziumban?",
    "options": [
      "Történelmet és földrajzot",
      "Magyar–latin szakos tanár volt",
      "Filozófiát és görögöt",
      "Csak irodalomtörténetet"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1637",
    "category": "literature",
    "prompt": "Melyik korszak kapcsolódik Arany János nagykőrösi éveihez?",
    "options": [
      "Szerelmi lírájának korszaka",
      "Balladakorszaka",
      "Nyelvújító korszaka",
      "Avantgárd korszaka"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1638",
    "category": "literature",
    "prompt": "Mi jellemzi Arany János balladáit?",
    "options": [
      "Főként idilli szerelmi történeteket mondanak el",
      "Történelmi vagy népi témákon keresztül erkölcsi és nemzeti kérdéseket szólaltatnak meg",
      "Csak humoros jelenetekből állnak",
      "Kizárólag mitológiai tárgyúak"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1639",
    "category": "literature",
    "prompt": "Melyik megnevezés kapcsolódik Arany Jánoshoz a balladaműfajban?",
    "options": [
      "A magyar óda mestere",
      "A magyar regény atyja",
      "A ballada Shakespeare-je",
      "A magyar szonett megteremtője"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1640",
    "category": "literature",
    "prompt": "Melyik mű NEM tartozik Arany János ismert balladái közé?",
    "options": [
      "Ágnes asszony",
      "Szondi két apródja",
      "V. László",
      "János vitéz"
    ],
    "correctOptionIndex": 3
  },
  {
    "id": "mcq_1641",
    "category": "literature",
    "prompt": "Melyik mű fejezi ki Arany Jánosnál a szabadságharc bukása utáni nemzedéki csalódottságot?",
    "options": [
      "Letészem a lantot",
      "Buda halála",
      "Toldi szerelme",
      "Tetemre hívás"
    ],
    "correctOptionIndex": 0
  },
  {
    "id": "mcq_1642",
    "category": "literature",
    "prompt": "Mi a „balladai homály” lényege?",
    "options": [
      "A ballada mindig sötétben játszódik",
      "A történet fontos részletei kimondatlanok maradnak, és az olvasónak kell következtetnie",
      "A balladában nincs cselekmény",
      "A balladában csak párbeszéd szerepel"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1643",
    "category": "literature",
    "prompt": "Melyik meghatározás fejezi ki legpontosabban a ballada műfaji sajátosságát?",
    "options": [
      "Tiszta lírai műfaj",
      "Tiszta epikus műfaj",
      "Tragédia dalban elbeszélve",
      "Prózai hősköltemény"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1644",
    "category": "literature",
    "prompt": "Mi történik Arany János Ágnes asszony című balladájában?",
    "options": [
      "Egy királylány menekülése kerül a középpontba",
      "Egy asszony bűne és annak lélektani következményei bomlanak ki",
      "Egy csata történetét meséli el a költő",
      "Egy szerelmespár tragikus halála jelenik meg"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1645",
    "category": "literature",
    "prompt": "Mi Ágnes asszony rögeszméje Arany János balladájában?",
    "options": [
      "A férje visszahívása",
      "A ház felgyújtása",
      "A véres lepel kimosása",
      "A bíróság megvesztegetése"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1646",
    "category": "literature",
    "prompt": "Mi történt Arany János életében 1860-ban?",
    "options": [
      "Meghalt a felesége",
      "A Kisfaludy Társaság igazgatójává választották",
      "Megírta a Toldit",
      "Külföldre emigrált"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1647",
    "category": "literature",
    "prompt": "Melyik két folyóiratot szerkesztette Arany János a pesti években?",
    "options": [
      "Nyugat és Koszorú",
      "Pesti Divatlap és Athenaeum",
      "Szépirodalmi Figyelő és Koszorú",
      "Honderű és Auróra"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1648",
    "category": "literature",
    "prompt": "Milyen tisztséget töltött be Arany János a Magyar Tudományos Akadémián?",
    "options": [
      "Előbb titkár, majd főtitkár lett",
      "Csak tiszteletbeli tag volt",
      "Könyvtárőrként dolgozott",
      "Elnöke volt az Akadémiának"
    ],
    "correctOptionIndex": 0
  },
  {
    "id": "mcq_1649",
    "category": "literature",
    "prompt": "Melyik személyes tragédia hallgattatta el hosszú időre Arany János költői hangját?",
    "options": [
      "Felesége halála",
      "Édesapja halála",
      "Leánya, Juliska halála",
      "Petőfi eltűnése"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1650",
    "category": "literature",
    "prompt": "Mi jellemzi Arany János Őszikék-korszakát?",
    "options": [
      "Harcias forradalmi költészet uralja",
      "Melankolikus, bölcs számvető versek születnek benne",
      "Csak műfordításokat készít",
      "Kizárólag balladákat ír"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1651",
    "category": "literature",
    "prompt": "Hol él Arany János Toldi című művének elején Toldi Miklós?",
    "options": [
      "Budán, Lajos király udvarában",
      "Nagyfaluban, édesanyjával",
      "Visegrádon, bátyjánál",
      "Pesten, egy mészárosnál"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1652",
    "category": "literature",
    "prompt": "Ki az a szereplő Arany János Toldi című művében, aki Budán él fényűző körülmények között, és lenézően bánik Miklóssal?",
    "options": [
      "Bence",
      "Laczfi Endre",
      "Toldi György",
      "Lajos király"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1653",
    "category": "literature",
    "prompt": "Mi váltja ki Arany János Toldi című művében a testvérkonfliktus nyílt kirobbanását?",
    "options": [
      "Miklós el akarja hagyni az országot",
      "György visszautasítja Miklós közeledését, majd arcul is üti",
      "Miklós ellopja György fegyverét",
      "Az özvegy Toldiné elűzi Györgyöt a házból"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1654",
    "category": "literature",
    "prompt": "Miért kényszerül menekülésre Toldi Miklós Arany János Toldi című művében?",
    "options": [
      "Mert megtagadja a király parancsát",
      "Mert megöl egy vitézt a közéjük hajított malomkővel",
      "Mert ellopja a családi örökséget",
      "Mert megszökik a hadseregből"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1655",
    "category": "literature",
    "prompt": "Ki visz ennivalót a nádasban bujkáló Toldi Miklósnak?",
    "options": [
      "Lajos király",
      "Laczfi Endre",
      "Bence",
      "A cseh bajnok"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1656",
    "category": "literature",
    "prompt": "Mi történik Arany János Toldi című művében, amikor Miklós titokban hazatér elbúcsúzni az édesanyjától?",
    "options": [
      "György kibékül vele",
      "Miklós puszta kézzel megöl két rátámadó farkast",
      "A király emberei elfogják",
      "Bence helyette vállalja a bujdosást"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1657",
    "category": "literature",
    "prompt": "Kihez fordul segítségért Toldi György, hogy öccsét rossz színben tüntesse fel?",
    "options": [
      "Bencéhez",
      "Laczfi Endréhez",
      "Lajos királyhoz",
      "A cseh lovaghoz"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1658",
    "category": "literature",
    "prompt": "Miért fogadja meg Toldi Miklós, hogy megküzd a cseh bajnokkal?",
    "options": [
      "Mert Lajos király erre kényszeríti",
      "Mert az özvegyasszony két fiát is a cseh vitéz ölte meg",
      "Mert György megígéri neki az örökséget",
      "Mert a cseh bajnok megsérti az édesanyját"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1659",
    "category": "literature",
    "prompt": "Mi történik Arany János Toldi című művében a párviadal során, miután a cseh bajnok hátulról próbál lesújtani Miklósra?",
    "options": [
      "Miklós megsebesül, de elmenekül",
      "Lajos király állítja meg a támadást",
      "Miklós a Duna tükrében észreveszi a mozdulatot, és megöli a cseh bajnokot",
      "Bence lefegyverzi a cseh lovagot"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1660",
    "category": "literature",
    "prompt": "Mi lesz Arany János Toldi című művének végén Toldi Miklós jutalma?",
    "options": [
      "Megkapja György örökségét, és visszavonul falusi birtokára",
      "A király neki adja György örökségét, de Miklós lemond róla, hogy vitéz lehessen",
      "Franciaország királya feleségül adja hozzá a lányát",
      "A király száműzi, de megkegyelmez neki"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1661",
    "category": "literature",
    "prompt": "Miért tartóztatták le Madách Imrét 1852-ben?",
    "options": [
      "Mert részt vett egy fegyveres felkelésben",
      "Mert Rákóczy Jánost, Kossuth titkárát rejtegette",
      "Mert betiltották Az ember tragédiáját",
      "Mert nyíltan megtagadta a katonai szolgálatot"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1662",
    "category": "literature",
    "prompt": "Hol raboskodott Madách Imre letartóztatása után?",
    "options": [
      "Aradon",
      "Pozsonyban",
      "Budán",
      "Bécsben"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1663",
    "category": "literature",
    "prompt": "Mikorra datálja a szakirodalom Az ember tragédiája megírását?",
    "options": [
      "1848 márciusától 1849 augusztusáig",
      "1852 tavaszától 1853 őszéig",
      "1859 februárjától 1860 márciusáig",
      "1861 januárjától 1862 decemberéig"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1664",
    "category": "literature",
    "prompt": "Ki volt Madách Imre felesége?",
    "options": [
      "Laborfalvi Róza",
      "Szendrey Júlia",
      "Fráter Erzsébet",
      "Ercsey Julianna"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1665",
    "category": "literature",
    "prompt": "Kinek a bíztatására adták ki Az ember tragédiáját?",
    "options": [
      "Petőfi Sándor",
      "Vörösmarty Mihály",
      "Arany János",
      "Gyulai Pál"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1666",
    "category": "literature",
    "prompt": "Mi Az ember tragédiája műfaja?",
    "options": [
      "Történelmi regény",
      "Drámai költemény, filozófiai dráma",
      "Hősi eposz",
      "Lélektani ballada"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1667",
    "category": "literature",
    "prompt": "Melyik világirodalmi művel szokták leggyakrabban párhuzamba állítani Az ember tragédiáját?",
    "options": [
      "Dante: Isteni színjáték",
      "Goethe: Faust",
      "Shakespeare: Hamlet",
      "Milton: Elveszett paradicsom"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1668",
    "category": "literature",
    "prompt": "Mi Az ember tragédiája egyik központi kérdése?",
    "options": [
      "A királyhatalom jogi eredete",
      "A szabad akarat és a végzet viszonya",
      "A magyar történelem dicsősége",
      "A nyelvújítás szükségessége"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1669",
    "category": "literature",
    "prompt": "Mi Az ember tragédiája központi toposza?",
    "options": [
      "A tengeri utazás mint hódítás",
      "Az ember útja mint vándorlás és próbatétel",
      "A lovagi szerelem mint megváltás",
      "A háború mint dicsőség"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1670",
    "category": "literature",
    "prompt": "Mit állít Lucifer magáról a mennyei jelenetben?",
    "options": [
      "Ő a szeretet angyala",
      "Ő a rend őrzője",
      "Ő a tagadás és a kételkedés szelleme",
      "Ő a teremtés beteljesítője"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1671",
    "category": "literature",
    "prompt": "Melyik két különleges fát kapja meg Lucifer az Úrtól Az ember tragédiája elején?",
    "options": [
      "A hatalom és a dicsőség fáját",
      "A tudás és a halhatatlanság fáját",
      "A hit és a remény fáját",
      "A bűn és a vezeklés fáját"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1672",
    "category": "literature",
    "prompt": "Kik azok a főangyalok, akik gyönyörködnek a teremtésben Az ember tragédiája elején?",
    "options": [
      "Gábor, Mihály és Ráfael",
      "Péter, Pál és János",
      "Ábel, Noé és Ábrahám",
      "Leonidász, Brutus és Luther"
    ],
    "correctOptionIndex": 0
  },
  {
    "id": "mcq_1673",
    "category": "literature",
    "prompt": "Miért kezdi ki Lucifer Ádámot és Évát a Paradicsomban?",
    "options": [
      "Mert meg akarja őket védeni az Úrtól",
      "Mert tudáséhséget és kételyt akar ébreszteni bennük",
      "Mert azonnal el akarja pusztítani őket",
      "Mert rá akarja venni őket a mennybe való visszatérésre"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1674",
    "category": "literature",
    "prompt": "Melyik tiltott gyümölcsből eszik először Éva, majd Ádám?",
    "options": [
      "Az élet fájának gyümölcséből",
      "A jó és rossz tudásának fájáról",
      "A halhatatlanság fájáról",
      "A megváltás fájáról"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1675",
    "category": "literature",
    "prompt": "Miért bocsát Lucifer álmot Ádámra a 3. színben?",
    "options": [
      "Hogy Ádám elfelejtse Évát",
      "Hogy Ádám lássa a jövőt, és megértse a tudás következményeit",
      "Hogy az Úr parancsát teljesítse",
      "Hogy Ádám örökre a Paradicsomban maradjon"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1676",
    "category": "literature",
    "prompt": "Milyen szerepben jelenik meg Ádám az egyiptomi színben?",
    "options": [
      "Rabszolgaként",
      "Fáraóként",
      "Papként",
      "Kereskedőként"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1677",
    "category": "literature",
    "prompt": "Mi az egyiptomi színben Ádám fő célja fáraóként?",
    "options": [
      "A demokrácia megteremtése",
      "A nép felszabadítása",
      "Halhatatlanság és dicsőség piramisépítéssel",
      "A kereskedelem fellendítése"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1678",
    "category": "literature",
    "prompt": "Melyik mondat rendíti meg különösen Ádámot az egyiptomi színben?",
    "options": [
      "„A tudás mindenekfelett.”",
      "„Milliók egy miatt.”",
      "„A nép szava Isten szava.”",
      "„A győzelem mindennél fontosabb.”"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1679",
    "category": "literature",
    "prompt": "Milyen felismerésre jut Ádám az egyiptomi szín végére?",
    "options": [
      "Az igazi halhatatlanság a zsarnoki dicsőségben rejlik",
      "Az igazi halhatatlanság a szabadság eszméjének szolgálata",
      "Az ember csak erőszakkal uralkodhat",
      "A piramis valóban legyőzi az időt"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1680",
    "category": "literature",
    "prompt": "Milyen történelmi szerepben jelenik meg Ádám az athéni színben?",
    "options": [
      "Periklészként",
      "Miltiadészként",
      "Szókratészként",
      "Leónidászként"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1681",
    "category": "literature",
    "prompt": "Mi döbbenti meg Ádámot az athéni színben a demokrácia működésében?",
    "options": [
      "A nép túlzott tudományos érdeklődése",
      "A demagógok érzelmi manipulációja felülírja a racionalitást",
      "A hadsereg mindenáron engedelmes marad",
      "A városállam túlzott vallásossága"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1682",
    "category": "literature",
    "prompt": "Mi lesz Ádám sorsa az athéni szín végén?",
    "options": [
      "Száműzik",
      "Felmentik",
      "Megölik",
      "Királlyá választják"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1683",
    "category": "literature",
    "prompt": "Milyen új világba vágyik Ádám az athéni csalódás után?",
    "options": [
      "A hit világába",
      "Az élvezetek világába",
      "A tudomány világába",
      "A falanszter világába"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1684",
    "category": "literature",
    "prompt": "Milyen néven jelenik meg Ádám a római színben?",
    "options": [
      "Catulus",
      "Tankréd",
      "Sergiolus",
      "Danton"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1685",
    "category": "literature",
    "prompt": "Mi a római szín alapélménye?",
    "options": [
      "A tudomány diadala",
      "A féktelen hedonizmus és erkölcsi üresség",
      "A katonai becsület helyreállítása",
      "A családi szeretet ereje"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1686",
    "category": "literature",
    "prompt": "Ki lép be a római színben, és kínál fel új reményt a keresztény szeretet eszméjével?",
    "options": [
      "Pál apostol",
      "Szent Péter apostol",
      "Mihály arkangyal",
      "Izóra apja"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1687",
    "category": "literature",
    "prompt": "Milyen szerepben jelenik meg Ádám a konstantinápolyi színben?",
    "options": [
      "Papként",
      "Tankréd lovagként",
      "Tudósként",
      "Kereskedőként"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1688",
    "category": "literature",
    "prompt": "Mit jelképez a homousion–homoiusion vita a konstantinápolyi színben?",
    "options": [
      "A tudomány fejlődését",
      "A vallási közösség széthullását jelentéktelen dogmakülönbségeken",
      "A politikai szabadság győzelmét",
      "A lovagi becsület megerősödését"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1689",
    "category": "literature",
    "prompt": "Mi lesz Izóra sorsa Az ember tragédiája konstantinápolyi színében?",
    "options": [
      "Feleségül megy Ádámhoz",
      "Meghal a csatában",
      "Fogadalom miatt zárdába kényszerül",
      "Franciaországba menekül"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1690",
    "category": "literature",
    "prompt": "Milyen történelmi alak szerepében jelenik meg Ádám a prágai színben?",
    "options": [
      "Galileiként",
      "Kopernikuszként",
      "Keplerként",
      "Newtonként"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1691",
    "category": "literature",
    "prompt": "Mi a prágai szín egyik központi ellentmondása?",
    "options": [
      "A vallás túl erős, a politika túl gyenge",
      "A tudomány emberét babona és udvari önérdek kényszeríti megalkuvásra",
      "A nép elutasítja a tudást",
      "A szerelem teljesen hiányzik a világból"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1692",
    "category": "literature",
    "prompt": "Mit kér Rudolftól Kepler a prágai színben?",
    "options": [
      "Hadsereget",
      "Jóslat helyett tudományos szabadságot",
      "Menlevelet Franciaországba",
      "A börtönből szabadult anyjától való elszakadást"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1693",
    "category": "literature",
    "prompt": "Milyen történelmi szerepben jelenik meg Ádám a párizsi színben?",
    "options": [
      "Robespierre-ként",
      "Marat-ként",
      "Dantonként",
      "Napóleonként"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1694",
    "category": "literature",
    "prompt": "Mit mutat meg a párizsi, francia forradalmi szín Az ember tragédiájában?",
    "options": [
      "A forradalom mindig tisztán megvalósítja eszméit",
      "A szabadság, egyenlőség és testvériség jelszava terrorrá torzulhat",
      "A nép mindig hű marad vezetőihez",
      "Az arisztokrácia erkölcsileg fölényesebb minden helyzetben"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1695",
    "category": "literature",
    "prompt": "Milyen szerepben jelenik meg Ádám a londoni színben?",
    "options": [
      "Szegény tudósként",
      "A vásárt figyelő, majd benne csalódó szemlélőként",
      "Királyként",
      "Ipari feltalálóként"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1696",
    "category": "literature",
    "prompt": "Mit leplez le a londoni szín Az ember tragédiájában?",
    "options": [
      "A középkori vallási fanatizmust",
      "A modern polgári szabadság látszatát, amely mögött pénz és haszonelv uralkodik",
      "A falanszter embertelenségét",
      "A paraszti világ tisztaságát"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1697",
    "category": "literature",
    "prompt": "Mi jellemzi a falanszter színt Az ember tragédiájában?",
    "options": [
      "A személyes szabadság kiteljesedése",
      "A hasznosságelvű, túlzottan racionális társadalom, amely funkcióvá silányítja az embert",
      "A nemzeti hagyományok újjászületése",
      "A vallási megújulás győzelme"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1698",
    "category": "literature",
    "prompt": "Mi történik Évával és gyermekével a falanszter színben?",
    "options": [
      "Szabadon választhatják meg jövőjüket",
      "A közösség el akarja szakítani a gyermeket az anyjától",
      "Királyi védelem alá kerülnek",
      "Franciaországba szöknek"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1699",
    "category": "literature",
    "prompt": "Mi állítja meg Ádám öngyilkossági szándékát Az ember tragédiája utolsó színében?",
    "options": [
      "Lucifer fenyegetése",
      "A Földszellem figyelmeztetése",
      "Éva bejelentése, hogy anyának érzi magát",
      "A kerub lángpallosa"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1700",
    "category": "literature",
    "prompt": "Melyik mondattal zárja le az Úr Madách Imre Az ember tragédiája című művét?",
    "options": [
      "„Az ember csak álom a földön.”",
      "„Küzdöttél, most már pihenj.”",
      "„Mondottam, ember: küzdj és bízva bízzál!”",
      "„A végzet útját senki el nem hagyja.”"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1701",
    "category": "literature",
    "prompt": "Melyik állítás igaz Jókai Mór 1848–49-es szerepére?",
    "options": [
      "Teljesen távol maradt a politikától",
      "A márciusi ifjak körében aktív közéleti szerepet vállalt",
      "Csak külföldről figyelte az eseményeket",
      "Csak a szabadságharc bukása után lett ismert"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1702",
    "category": "literature",
    "prompt": "Melyik Jókai-mű jelent meg 1846-ban első jelentős regényeként?",
    "options": [
      "Az arany ember",
      "Egy magyar nábob",
      "Hétköznapok",
      "Fekete gyémántok"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1703",
    "category": "literature",
    "prompt": "Melyik folyóirat szerkesztője lett Jókai Mór 1847-ben?",
    "options": [
      "Pesti Divatlap",
      "Életképek",
      "Athenaeum",
      "Koszorú"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1704",
    "category": "literature",
    "prompt": "Kit vett feleségül Jókai Mór 1848. augusztus 29-én?",
    "options": [
      "Szendrey Júliát",
      "Fráter Erzsébetet",
      "Laborfalvi Rózát",
      "Ercsey Juliannát"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1705",
    "category": "literature",
    "prompt": "Melyik állítás igaz Jókai Mór akadémiai elismerésére?",
    "options": [
      "1848-ban lett rendes tag",
      "1858-ban levelező, 1861-ben rendes tag lett",
      "Egyszer sem választották be az Akadémiába",
      "Csak halála után ismerték el"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1706",
    "category": "literature",
    "prompt": "Melyik kitüntetést kapta meg Jókai Mór 1876-ban?",
    "options": [
      "Vaskorona-rend kiskeresztje",
      "Szent István-rend kiskeresztje",
      "Ferenc József-rend",
      "Magyar Corvin-lánc"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1707",
    "category": "literature",
    "prompt": "Melyik évben jelent meg Jókai Mór Az arany ember című regénye?",
    "options": [
      "1867-ben",
      "1872-ben",
      "1848-ban",
      "1882-ben"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1708",
    "category": "literature",
    "prompt": "Hol jelent meg először folytatásokban Az arany ember?",
    "options": [
      "Vasárnapi Újság",
      "Pesti Napló",
      "A Hon",
      "Budapesti Szemle"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1709",
    "category": "literature",
    "prompt": "Melyik állítás igaz Az arany ember keletkezésére?",
    "options": [
      "Jókai börtönben írta meg",
      "A források szerint 1870 és 1872 között keletkezett",
      "Közvetlenül 1849 után írta meg",
      "Csak halála után adták ki"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1710",
    "category": "literature",
    "prompt": "Melyik megállapítás jellemzi legjobban Jókai Mór és Az arany ember kapcsolatát?",
    "options": [
      "Jókai kevésre tartotta ezt a regényt",
      "Jókai kedvenc alkotásaként hivatkozott rá",
      "A regényt nem is tekintette kész műnek",
      "A művet valójában nem Jókai írta végig"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1711",
    "category": "literature",
    "prompt": "Kinek a megbízásából visz árut a Szent Borbála a regény elején?",
    "options": [
      "Kacsuka őrnagy",
      "Brazovics Athanáz",
      "Krisztyán Tódor",
      "Teréza mama"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1712",
    "category": "literature",
    "prompt": "Milyen álnevet használ a regény elején Ali Csorbadzsi?",
    "options": [
      "Sergiolus",
      "Trikalisz Euthym",
      "Catulus",
      "Levetinczy Mihály"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1713",
    "category": "literature",
    "prompt": "Ki Tímár Mihály Az arany ember elején?",
    "options": [
      "Komárom polgármestere",
      "A hajó kapitánya és legmegbízhatóbb embere",
      "Török katonatiszt",
      "Brazovics könyvelője"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1714",
    "category": "literature",
    "prompt": "Milyen veszélyt hárít el Tímár Mihály a Duna vad szakaszán?",
    "options": [
      "Egy tengeri vihart",
      "Egy feléjük sodródó vízimalmot",
      "Egy kalóztámadást",
      "Egy tűzesetet a fedélzeten"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1715",
    "category": "literature",
    "prompt": "Hol nevezik először „arany embernek” Tímár Mihályt?",
    "options": [
      "Komáromban, Brazovics házában",
      "A Senki szigetén",
      "Az orsovai ellenőrzés után, egy levélben",
      "A királyi udvarban"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1716",
    "category": "literature",
    "prompt": "Kik élnek a Senki szigetén, amikor a Szent Borbála ott kiköt?",
    "options": [
      "Timéa és Athalie",
      "Teréza mama és Noémi",
      "Kacsuka és Brazovics",
      "Zófia asszony és Athalie"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1717",
    "category": "literature",
    "prompt": "Ki az a szereplő, aki a Senki szigetén erőszakos jogcímekkel pénzt és tárgyakat akar kicsikarni?",
    "options": [
      "Brazovics Athanáz",
      "Kacsuka főhadnagy",
      "Krisztyán Tódor",
      "Ali Csorbadzsi"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1718",
    "category": "literature",
    "prompt": "Mi történik a Szent Borbálával a regény első nagy fordulópontjánál?",
    "options": [
      "A törökök elfoglalják",
      "Tűzvészben elég",
      "Víz alatti fatörzsnek ütközik és elsüllyed",
      "Franciaországba sodródik"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1719",
    "category": "literature",
    "prompt": "Hová jut Tímár Mihály és Timéa a Szent Borbála elsüllyedése után?",
    "options": [
      "Rögtön a Senki szigetére",
      "Brazovics Athanáz komáromi házához",
      "Bécsbe",
      "Isztambulba"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1720",
    "category": "literature",
    "prompt": "Miért fogadja Brazovics Athanáz eleinte látványos szeretettel Timéát?",
    "options": [
      "Mert tudja, hogy Kacsuka szereti",
      "Mert Ali Csorbadzsi vagyonát reméli a lány mögött",
      "Mert régi barátja Teréza mamának",
      "Mert Tímár erre kéri"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1721",
    "category": "literature",
    "prompt": "Mi történik Athalie „leánytréfája” során Timéával?",
    "options": [
      "Elhitetik vele, hogy Tímár meghalt",
      "Elhitetik vele, hogy ő lesz Kacsuka menyasszonya, de valójában Athalie megy hozzá",
      "Elhitetik vele, hogy visszakapja apja vagyonát",
      "Elhitetik vele, hogy Noémi meghalt"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1722",
    "category": "literature",
    "prompt": "Mit talál meg Tímár Mihály az ázott búzából kiemelt rakományban?",
    "options": [
      "Egy királyi koronát",
      "Egy vörös félholddal jelölt zsákban Ali Csorbadzsi kincsét",
      "Timéa elveszett levelét",
      "Kacsuka hadi tervét"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1723",
    "category": "literature",
    "prompt": "Milyen néven és milyen társadalmi státusszal lép előre Tímár Mihály a megtartott kincs révén?",
    "options": [
      "Levetinczy néven nemességet kap",
      "Brazovics néven kereskedő lesz",
      "Kacsuka néven katonatiszt lesz",
      "Csorbadzsi néven török követ lesz"
    ],
    "correctOptionIndex": 0
  },
  {
    "id": "mcq_1724",
    "category": "literature",
    "prompt": "Miért indul el Tímár Mihály Bajáról újra a Senki szigetére?",
    "options": [
      "Mert Timéa elküldi onnan",
      "Mert két levél érkezik hozzá, és ezek után dönt így",
      "Mert Brazovics száműzi",
      "Mert a király odarendeli"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1725",
    "category": "literature",
    "prompt": "Mit intéz el Tímár Mihály előrelátóan a Senki szigetén élő Teréza mama és Noémi számára?",
    "options": [
      "A sziget eladását",
      "A sziget hosszú időre szóló bérletét az ő nevükre",
      "A sziget katonai védelmét",
      "A sziget csatornázását"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1726",
    "category": "literature",
    "prompt": "Miért érzi úgy Tímár Mihály, hogy kettős életet él?",
    "options": [
      "Mert egyszerre szolgál két hadseregben",
      "Mert Komáromban Timéa, a Senki szigetén Noémi várja",
      "Mert egyszerre magyar és török alattvaló",
      "Mert nappal kereskedő, éjjel hivatalnok"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1727",
    "category": "literature",
    "prompt": "Mi történik Noémi és Teréza mama házánál, amikor Tímár visszatér a Senki szigetére?",
    "options": [
      "Tódor kifosztja őket",
      "Tímár megtudja, hogy Noémi férjhez ment",
      "Egy csecsemő várja őket, akit Dódinak neveznek",
      "A házat elmosta az árvíz"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1728",
    "category": "literature",
    "prompt": "Miért ijed meg Tímár Mihály, amikor levelet kap Timéától az íróasztal kulcsáról?",
    "options": [
      "Azt hiszi, Timéa meg akarja ölni",
      "Azt hiszi, Timéa rájött a kincsek titkára",
      "Azt hiszi, Kacsuka kihívja párbajra",
      "Azt hiszi, Brazovics visszatért"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1729",
    "category": "literature",
    "prompt": "Miért utazik Tímár Mihályhoz egy rejtélyes öregember Meránba, ahol Timéa telel?",
    "options": [
      "Mert orvosként kezeli Timéát",
      "Mert Tímár így látogatja meg a beteg Timéát",
      "Mert a rendőrség küldte",
      "Mert Athalie titkos szeretője"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1730",
    "category": "literature",
    "prompt": "Mi történik a regény végkifejletében Krisztyán Tódorral?",
    "options": [
      "Tímár Mihály párbajban megöli",
      "Timéa feljelentése miatt börtönbe kerül",
      "Tímár ruháiban belefullad a Balatonba",
      "Noémi száműzi a szigetről"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1731",
    "category": "literature",
    "prompt": "Mi teszi lehetővé, hogy Tímár Mihály végleg eltűnjön a régi életéből?",
    "options": [
      "A király kegyelme",
      "Krisztyán Tódor halála Tímár ruháiban",
      "Timéa válólevele",
      "Brazovics vagyonának öröklése"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1732",
    "category": "literature",
    "prompt": "Mi történik Athalie-val Az arany ember végén?",
    "options": [
      "Feleségül megy Kacsukához",
      "Megpróbálja megölni Timéát",
      "A Senki szigetére költözik",
      "Apácának áll"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1733",
    "category": "literature",
    "prompt": "Ki a regény epilógusában a dunai sziget közösségének feje?",
    "options": [
      "Kacsuka",
      "Tímár Mihály",
      "Deodát",
      "Brazovics Athanáz"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1734",
    "category": "literature",
    "prompt": "Milyen életforma jelenik meg a regény epilógusában a dunai szigeten?",
    "options": [
      "Katonai fegyelemre épülő közösség",
      "Önellátó, békés, világtól kivonult közösség",
      "Kereskedőváros",
      "Főúri udvar"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1735",
    "category": "literature",
    "prompt": "Melyik szereplőhöz kapcsolódik az a felismerés, hogy Timéa nem kutatott a rejtett kincsek után?",
    "options": [
      "Brazovicshoz",
      "Kacsukához",
      "Tímárhoz",
      "Noémihez"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1736",
    "category": "literature",
    "prompt": "Melyik állítás jellemzi legpontosabban Jókai Mór Az arany ember című regényének stílusát?",
    "options": [
      "Tisztán klasszicista mű",
      "Tisztán realista mű",
      "Romantikus és realista vonásokat egyszerre hordozó, korszakhatáron álló mű",
      "Kizárólag naturalista regény"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1737",
    "category": "literature",
    "prompt": "Mi különbözteti meg Tímár Mihály alakját Jókai Mór korábbi hőseitől?",
    "options": [
      "Ő is változatlan, eszményi hős marad végig",
      "Árnyaltabb, összetettebb, erkölcsi vívódásokkal teli főhős",
      "Egyértelműen gonosz figura",
      "Kizárólag komikus szereplő"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1738",
    "category": "literature",
    "prompt": "Melyik társadalmi probléma válik jellempróbává Tímár Mihály számára Az arany emberben?",
    "options": [
      "A feudális hűbéri kötelezettség",
      "A pénzszerzés, az anyagiasodás és a gyors felemelkedés kérdése",
      "A jobbágyfelszabadítás",
      "A vallásháború"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1739",
    "category": "literature",
    "prompt": "Miért közelít Az arany ember a realizmushoz?",
    "options": [
      "Mert teljesen eltűnnek belőle a jelképek",
      "Mert a hangsúly egyre inkább a belső lelki folyamatokra és erkölcsi következményekre kerül",
      "Mert csak hétköznapi párbeszédekből áll",
      "Mert a szerző megszünteti a romantikus helyszíneket"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1740",
    "category": "literature",
    "prompt": "Mit jelképez a Senki szigete Jókai Mór Az arany ember című regényében?",
    "options": [
      "A modern kapitalizmus központját",
      "A tisztaság, a menedék és az újrakezdés álomszerű terét",
      "A katonai rend diadalát",
      "A társadalmi felemelkedés hivatalos útját"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1741",
    "category": "literature",
    "prompt": "Milyen szerepet tölt be a víz motívuma Az arany emberben?",
    "options": [
      "Csak díszlet, nincs mélyebb jelentése",
      "Ismétlődő motívumként előreviszi a cselekményt, és a végkifejletben megoldó szerepet kap",
      "Kizárólag a hajózás technikai hátterét szolgálja",
      "Csak a Senki szigetén jelenik meg"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1742",
    "category": "literature",
    "prompt": "Mi kapcsolódik a víz motívumához Az arany ember értelmezésében?",
    "options": [
      "A lovagi szerelem toposza",
      "A hajós ember toposza",
      "A szent király toposza",
      "A pusztai bujdosó toposza"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1743",
    "category": "literature",
    "prompt": "Mit kísér végig Tímár Mihály külső útja mellett Az arany emberben a vörös félhold visszatérő jele?",
    "options": [
      "A szerelmi beteljesülést",
      "A lelkiismereti, belső erkölcsi utat",
      "A történelmi bosszút",
      "A vallási megtérést"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1744",
    "category": "literature",
    "prompt": "Miért fontos a Szent Borbála név Az arany ember motívumrendszerében?",
    "options": [
      "Mert véletlenszerű névválasztás",
      "Mert már előrevetítő, szimbolikus szerepe van",
      "Mert Brazovics feleségéről nevezték el",
      "Mert Timéa új keresztneve ez"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1745",
    "category": "literature",
    "prompt": "Hogyan indul Tímár Mihály pályája Az arany emberben a hőstípus szempontjából?",
    "options": [
      "Kezdettől realista, kisszerű figura",
      "Kezdetben romantikus, népmesei hőst idéz",
      "Kezdetben tragikus antihős",
      "Kezdetben kizárólag komikus szereplő"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1746",
    "category": "literature",
    "prompt": "Melyik tett mutatja meg leginkább Tímár Mihály kezdeti „népmesei hősiességét”?",
    "options": [
      "Megír egy szerelmes levelet",
      "Megfékezi az elszabadult malmot és megmenti a hajót",
      "Megverekszik Kacsukával",
      "Ellopja a vörös félholdas zsákot"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1747",
    "category": "literature",
    "prompt": "Miért vet fel erkölcsi kérdéseket Tímár Mihály meggazdagodása?",
    "options": [
      "Mert kizárólag örökségből jut vagyonhoz",
      "Mert gyors vagyonszerzése tisztességtelen kompromisszumokkal és eltitkolt kinccsel kapcsolódik össze",
      "Mert állami hivatalból lop",
      "Mert a Senki szigetét eladja"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1748",
    "category": "literature",
    "prompt": "Mi jellemzi Tímár Mihály és Timéa kapcsolatát Az arany ember elemzése szerint?",
    "options": [
      "Kölcsönös, szenvedélyes szerelem",
      "Timéa rideg, hűséges, de érzelmileg zárt marad",
      "Timéa nyíltan gyűlöli Tímárt",
      "Timéa végig csak Noémit szereti"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1749",
    "category": "literature",
    "prompt": "Mi jellemzi Tímár Mihály és Noémi kapcsolatát Az arany ember elemzése szerint?",
    "options": [
      "Noémi Tímár rangjába szeret bele",
      "Noémi Tímárt önmagáért szereti, nem pénzéért vagy státuszáért",
      "Noémi csak bosszúból fogadja be Tímárt",
      "Noémi végig tud Tímár kettős életéről"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1750",
    "category": "literature",
    "prompt": "Milyen kettősségre épül Tímár Mihály élete Az arany emberben?",
    "options": [
      "Katonai és papi élet kettősségére",
      "A komáromi társadalmi lét és a Senki szigetének természetes világa közötti kettősségre",
      "Magyar és török identitás kettősségére",
      "Városi és falusi hivatalnoki élet kettősségére"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1751",
    "category": "literature",
    "prompt": "Miért tekinthető a Senki szigete utópikus térnek Az arany emberben?",
    "options": [
      "Mert ott működik a legerősebb kereskedelmi központ",
      "Mert bibliai paradicsomhoz hasonló, természetközeli menedékhelyként jelenik meg",
      "Mert ott uralkodik a leggazdagabb földbirtokos",
      "Mert ott található Ali Csorbadzsi palotája"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1752",
    "category": "literature",
    "prompt": "Melyik állítás foglalja össze legjobban Athalie szerepét Az arany emberben?",
    "options": [
      "Megértő, önfeláldozó mellékszereplő",
      "Féltékeny, bosszúálló és megszállott alak",
      "Kizárólag komikus figura",
      "A Senki szigetének őrzője"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1753",
    "category": "literature",
    "prompt": "Melyik nőalakhoz kapcsolódik legerősebben az „alabástromszobor” jelképe Az arany emberben?",
    "options": [
      "Noémihez",
      "Timéához",
      "Athalie-hoz",
      "Teréza mamához"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1754",
    "category": "literature",
    "prompt": "Milyen irányban árnyalja Az arany ember Jókai korábbi regényvilágát?",
    "options": [
      "A fekete-fehér erkölcsi sémák felől az összetettebb lélektani ábrázolás felé",
      "A realista részletek felől a mítosz felé",
      "A társadalmi kérdések felől a puszta kaland felé",
      "A regényforma felől a drámai költemény felé"
    ],
    "correctOptionIndex": 0
  },
  {
    "id": "mcq_1755",
    "category": "literature",
    "prompt": "Miért tekinthető Az arany ember egyik fő kérdésének a bűn és bűnhődés belső tere?",
    "options": [
      "Mert a regény főként bírósági tárgyalásokból áll",
      "Mert Tímár Mihály sorsfordulatai egyre inkább lelkiismereti válságként jelennek meg",
      "Mert minden szereplő börtönbe kerül",
      "Mert a narrátor bírói szerepben beszél"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1756",
    "category": "literature",
    "prompt": "Mi jellemzi legpontosabban a klasszikus modernséget?",
    "options": [
      "Egyetlen, egységes stílusirányzat",
      "A modern irodalom első nagy szakasza, több irányzattal",
      "Kizárólag a 20. század közepének irodalma",
      "Csak a magyar lírára vonatkozó korszakfogalom"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1757",
    "category": "literature",
    "prompt": "Melyik irányzat tekinti az embert biológiailag meghatározott lénynek, és gyakran a nyomor, betegség, halál világát ábrázolja?",
    "options": [
      "Impresszionizmus",
      "Naturalizmus",
      "Szimbolizmus",
      "Szecesszió"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1758",
    "category": "literature",
    "prompt": "Melyik irányzat törekszik az elfutó pillanat benyomásainak és hangulatainak megragadására?",
    "options": [
      "Naturalizmus",
      "Impresszionizmus",
      "Szimbolizmus",
      "Klasszicizmus"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1759",
    "category": "literature",
    "prompt": "Melyik irányzat központi kifejezőeszköze a többjelentésű, értelmezésre nyitott szimbólum?",
    "options": [
      "Szimbolizmus",
      "Naturalizmus",
      "Realizmus",
      "Futurizmus"
    ],
    "correctOptionIndex": 0
  },
  {
    "id": "mcq_1760",
    "category": "literature",
    "prompt": "Mi jellemzi leginkább a szecesszió irodalmi megjelenését?",
    "options": [
      "A nyers társadalmi valóság fényképszerű rögzítése",
      "A szubjektív élmények, dekorativitás és hangulati képiség",
      "A klasszikus formafegyelem kizárólagossága",
      "A történelmi hősiesség középpontba állítása"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1761",
    "category": "literature",
    "prompt": "Miért tekintik Charles Baudelaire-t a modern európai líra egyik kiindulópontjának?",
    "options": [
      "Mert ő alapította a Nyugatot",
      "Mert nála jelenik meg nagy erővel a modern szimbolikus képrendszer",
      "Mert ő írta az első impresszionista regényt",
      "Mert kizárólag naturalista verseket írt"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1762",
    "category": "literature",
    "prompt": "Mit jelent Baudelaire költészetében a spleen?",
    "options": [
      "Vallásos eksztázist",
      "Életuntságot, világfájdalmat és nyomasztó ürességérzést",
      "Tiszta szerelmi boldogságot",
      "Politikai lázadást"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1763",
    "category": "literature",
    "prompt": "Mi A romlás virágai legfontosabb ciklusa a jegyzet szerint?",
    "options": [
      "A daloló Páris",
      "Spleen és Ideál",
      "Szűz ormok vándora",
      "Őszi sirályok"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1764",
    "category": "literature",
    "prompt": "Mi Anton Pavlovics Csehov egyik legfontosabb újítása a drámatörténetben?",
    "options": [
      "A hősi eposz megteremtése",
      "A drámaiatlan dráma megalkotása",
      "A klasszikus tragédia visszaállítása",
      "A verses dráma kizárólagossá tétele"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1765",
    "category": "literature",
    "prompt": "Mit jelent a drámaiatlan dráma Csehov művészetében?",
    "options": [
      "A drámában semmilyen konfliktus nincs",
      "A konfliktus nem látványos összecsapásokban, hanem a belső világban zajlik",
      "A szereplők végig hallgatnak",
      "A darab mindig boldog véget ér"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1766",
    "category": "literature",
    "prompt": "Mi indítja el Csehov Sirály című drámájában Trepljov első nagy kudarcát?",
    "options": [
      "Nyina azonnal elhagyja a várost",
      "Arkagyina kigúnyolja és leállítja Trepljov újfajta színdarabját",
      "Trigorin párbajra hívja",
      "Trepljov elveszíti az örökségét"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1767",
    "category": "literature",
    "prompt": "Miért fontos a lelőtt sirály motívuma Csehov Sirály című drámájában?",
    "options": [
      "A vadászat szépségét hangsúlyozza",
      "Előre jelzi Nyina összetörését is",
      "A családi béke helyreállítását szimbolizálja",
      "A művészi siker biztos jelképe"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1768",
    "category": "literature",
    "prompt": "Mit mond Nyina Csehov Sirály című drámájának végén a művészetről?",
    "options": [
      "A művészetben csak a hírnév számít",
      "A művészetben a legfontosabb a kitartás és a teherbírás",
      "A művészet csak a gazdagok játéka",
      "A művészet értelmetlen"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1769",
    "category": "literature",
    "prompt": "Mi lesz Trepljov sorsa Csehov Sirály című drámájának végén?",
    "options": [
      "Külföldre költözik",
      "Megnősül",
      "Öngyilkos lesz",
      "Ünnepelt íróvá válik és boldog lesz"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1770",
    "category": "literature",
    "prompt": "Mi Franz Kafka prózájának egyik legfontosabb alapélménye?",
    "options": [
      "A társadalmi harmónia",
      "Az elidegenedés és a létbizonytalanság",
      "A történelmi dicsőség",
      "A romantikus szerelem"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1771",
    "category": "literature",
    "prompt": "Mi történik Franz Kafka Az átváltozás című elbeszélésének elején Gregor Samsával?",
    "options": [
      "Letartóztatják",
      "Elveszíti az állását",
      "Óriási bogárrá változik",
      "Megörököl egy vagyont"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1772",
    "category": "literature",
    "prompt": "Miért aggódik először Gregor Samsa Franz Kafka Az átváltozás című művében?",
    "options": [
      "Mert félti a húgát",
      "Mert elkésik a munkából",
      "Mert elfelejti a nevét",
      "Mert üldözi a rendőrség"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1773",
    "category": "literature",
    "prompt": "Ki gondoskodik eleinte Gregor Samsáról Franz Kafka Az átváltozás című művében?",
    "options": [
      "Az édesapja",
      "A főnöke",
      "Grete, a húga",
      "Az egyik albérlő"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1774",
    "category": "literature",
    "prompt": "Milyen módon sebesíti meg Gregort az apja Franz Kafka Az átváltozás című elbeszélésében?",
    "options": [
      "Bottal veri meg",
      "Almával dobja meg",
      "Bezárja a pincébe",
      "Megégeti"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1775",
    "category": "literature",
    "prompt": "Mi Franz Kafka Az átváltozás című művének egyik fő értelmezési gondolata?",
    "options": [
      "Az ember mindig családja nélkül boldogabb",
      "Az embert addig fogadják el, amíg hasznos",
      "A család minden körülmények között összetart",
      "A bogárrá változás felszabadulást hoz"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1776",
    "category": "literature",
    "prompt": "Mi Franz Kafka A per című regényének alaphelyzete?",
    "options": [
      "A főhős tudja, mivel vádolják, és védekezik",
      "A főhőst anélkül vonják felelősségre, hogy tudná, mivel vádolják",
      "A főhős önként börtönbe vonul",
      "A főhős bíróként dolgozik"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1777",
    "category": "literature",
    "prompt": "Miért tartják Dosztojevszkijt a lélektani regény egyik legnagyobb alakjának?",
    "options": [
      "Mert regényeiben a külső kaland a legfontosabb",
      "Mert a lelki drámát állítja a középpontba",
      "Mert kizárólag történelmi regényeket írt",
      "Mert csak vallási példázatokat alkotott"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1778",
    "category": "literature",
    "prompt": "Mit jelent Dosztojevszkij művészetében az eszmeregény vagy polifonikus regény?",
    "options": [
      "Egyetlen szereplő egyetlen igazságot képvisel",
      "Több nézőpont ütközik, és az olvasónak is állást kell foglalnia",
      "A cselekmény helyett csak tájleírás van",
      "A regény mindig levélformában íródik"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1779",
    "category": "literature",
    "prompt": "Mi Raszkolnyikov elméletének lényege a Bűn és bűnhődésben?",
    "options": [
      "Minden ember teljesen egyenlő erkölcsileg",
      "A rendkívüli embereknek joguk lehet áthágni a törvényt",
      "A bűn mindig megbocsáthatatlan",
      "A szegénység minden bűnt felment"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1780",
    "category": "literature",
    "prompt": "Kit öl meg Raszkolnyikov először a Bűn és bűnhődésben?",
    "options": [
      "Szonyát",
      "Dunyát",
      "Aljona Ivanovnát",
      "Porfirijt"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1781",
    "category": "literature",
    "prompt": "Miért követ el Raszkolnyikov második gyilkosságot is a Bűn és bűnhődésben?",
    "options": [
      "Mert előre eltervezte",
      "Mert Lizaveta váratlanul megjelenik a helyszínen",
      "Mert Porfirij rákényszeríti",
      "Mert így akar bosszút állni"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1782",
    "category": "literature",
    "prompt": "Ki próbálja pszichológiai nyomással sarokba szorítani Raszkolnyikovot?",
    "options": [
      "Razumihin",
      "Porfirij",
      "Marmeladov",
      "Szvidrigajlov"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1783",
    "category": "literature",
    "prompt": "Kinek vallja be először Raszkolnyikov a bűnét?",
    "options": [
      "Anyjának",
      "Porfirijnek",
      "Szonyának",
      "Dunyának"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1784",
    "category": "literature",
    "prompt": "Mi lesz Raszkolnyikov büntetése a Bűn és bűnhődés végén?",
    "options": [
      "Halálbüntetés",
      "Nyolc év kényszermunka Szibériában",
      "Életfogytiglan Párizsban",
      "Száműzetés Amerikába"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1785",
    "category": "literature",
    "prompt": "Mi volt a Nyugat folyóirat egyik legfontosabb célja?",
    "options": [
      "A régi irodalmi normák változatlan megőrzése",
      "Egy új, szabadabb, európaibb magyar irodalmi élet megteremtése",
      "Kizárólag politikai publicisztika közlése",
      "Csak vidéki szerzők támogatása"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1786",
    "category": "literature",
    "prompt": "Mi alapján választották ki a Nyugat szerkesztői a folyóiratban megjelenő szerzőket?",
    "options": [
      "Származás alapján",
      "Politikai hovatartozás alapján",
      "Tehetség alapján",
      "Vallási hovatartozás alapján"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1787",
    "category": "literature",
    "prompt": "Ki volt a Nyugat első nagy korszakának meghatározó főszerkesztője?",
    "options": [
      "Babits Mihály",
      "Osvát Ernő",
      "Móricz Zsigmond",
      "Ady Endre"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1788",
    "category": "literature",
    "prompt": "Miért tekinthető Ady Endre a modern magyar líra egyik legnagyobb megújítójának?",
    "options": [
      "Mert visszatért a 18. századi formákhoz",
      "Mert új témákat, új hangot és merész szimbolikus képeket hozott",
      "Mert csak népies dalokat írt",
      "Mert kizárólag politikai verseket közölt"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1789",
    "category": "literature",
    "prompt": "Melyik város volt különösen fontos Ady Endre fejlődésében, mert itt bontakozott ki igazán modern látásmódja?",
    "options": [
      "Szekszárd",
      "Nagyvárad",
      "Kecskemét",
      "Kolozsvár"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1790",
    "category": "literature",
    "prompt": "Melyik kötet hozta meg Ady Endre igazi áttörését?",
    "options": [
      "Versek",
      "Még egyszer",
      "Új versek",
      "Az Illés szekerén"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1791",
    "category": "literature",
    "prompt": "Ki volt Ady Endre első nagy múzsája, akit verseiben Lédaként örökített meg?",
    "options": [
      "Boncza Berta",
      "Brüll Adél",
      "Laborfalvi Róza",
      "Török Sophie"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1792",
    "category": "literature",
    "prompt": "Mi jellemzi a Csinszkához írt verseket a Léda-versekhez képest?",
    "options": [
      "Általában nyugodtabb, bensőségesebb hangúak",
      "Sokkal vadabbak és pusztítóbbak",
      "Kizárólag politikai témájúak",
      "Teljesen humorosak"
    ],
    "correctOptionIndex": 0
  },
  {
    "id": "mcq_1793",
    "category": "literature",
    "prompt": "Mi jellemzi Ady Endre Új versek című kötetének szerkezetét?",
    "options": [
      "Véletlenszerűen egymás mellé rakott versekből áll",
      "Tudatosan megszerkesztett kötetkompozíció",
      "Csak szerelmi verseket tartalmaz",
      "Kizárólag szonettekből áll"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1794",
    "category": "literature",
    "prompt": "Melyik két vers alkotja Ady Endre Új versek című kötetének keretét?",
    "options": [
      "A magyar Ugaron és A Sion-hegy alatt",
      "Góg és Magóg fia vagyok én... és Új vizeken járok",
      "Párisban járt az Ősz és Őrizem a szemed",
      "A Tisza-parton és Harc a Nagyúrral"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1795",
    "category": "literature",
    "prompt": "Melyik ciklus NEM tartozik Ady Endre Új versek című kötetének négy nagy ciklusa közé?",
    "options": [
      "Léda asszony zsoltárai",
      "A magyar Ugaron",
      "Szűz ormok vándora",
      "Vér és arany"
    ],
    "correctOptionIndex": 3
  },
  {
    "id": "mcq_1796",
    "category": "literature",
    "prompt": "Mit fejez ki legerősebben Ady Endre A magyar Ugaron című verse?",
    "options": [
      "Idilli hazaszeretetet",
      "Kritikai nemzeti önvizsgálatot",
      "Kizárólag tájleíró örömöt",
      "Vallásos megnyugvást"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1797",
    "category": "literature",
    "prompt": "Mit jelképez a „magyar ugar” Ady Endre A magyar Ugaron című versében?",
    "options": [
      "A magyar társadalom és szellemi élet elmaradottságát",
      "A magyar történelem katonai sikereit",
      "A természet örök termékenységét",
      "A modern nagyvárosi életet"
    ],
    "correctOptionIndex": 0
  },
  {
    "id": "mcq_1798",
    "category": "literature",
    "prompt": "Miért fontos Ady Endre Harc a Nagyúrral című versében a „disznófejű Nagyúr” alakja?",
    "options": [
      "A szerelem beteljesülését jelképezi",
      "A pénz démoni, pusztító hatalmát testesíti meg",
      "A nemzeti hagyományt képviseli",
      "Az isteni irgalom jelképe"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1799",
    "category": "literature",
    "prompt": "Milyen műfaji sajátosságot emel ki a jegyzet Ady Endre Harc a Nagyúrral című versénél?",
    "options": [
      "Históriás ének",
      "Drámai párbeszéd",
      "Hősi eposz",
      "Mesejáték"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1800",
    "category": "literature",
    "prompt": "Mi Ady Endre A Sion-hegy alatt című versének központi élménye?",
    "options": [
      "A biztos, megingathatatlan hit",
      "A tragikus istenkeresés és a gyermeki hit elvesztése",
      "A történelmi forradalom dicsérete",
      "A szerelmi boldogság"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1801",
    "category": "literature",
    "prompt": "Melyik állítás jellemzi legpontosabban Babits Mihály irodalmi alkatát?",
    "options": [
      "Ösztönköltő, aki kerülte a formát",
      "Klasszicizáló-modernizáló, tudatos formaművész",
      "Kizárólag népies költő",
      "Csak prózaíróként jelentős"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1802",
    "category": "literature",
    "prompt": "Miért volt Babits Mihály meghatározó a Nyugat történetében?",
    "options": [
      "Mert csak egyszer publikált benne",
      "Mert központi szerzőként és szerkesztőként is alakította a lapot",
      "Mert teljesen elutasította a folyóiratot",
      "Mert csak fordítóként működött benne"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1803",
    "category": "literature",
    "prompt": "Melyik világirodalmi főmű magyar fordítása fűződik jelképesen Babits Mihály nevéhez?",
    "options": [
      "Faust",
      "Don Quijote",
      "Isteni színjáték",
      "Hamlet"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1804",
    "category": "literature",
    "prompt": "Mi Babits Mihály Húsvét előtt című versének alaphelyzete?",
    "options": [
      "A tavasz idilli ünneplése",
      "Erkölcsi tiltakozás az első világháború pusztítása ellen",
      "Szerelmi vallomás húsvétkor",
      "A falusi élet idealizálása"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1805",
    "category": "literature",
    "prompt": "Mi Babits Mihály Jónás könyve című művének egyik legfontosabb újítása a bibliai történethez képest?",
    "options": [
      "A cselekményt teljesen elhagyja",
      "Jónás alakját esendő, vonakodó, „anti-próféta” figurává árnyalja",
      "Jónást diadalmas hőssé emeli",
      "Csak politikai szatírát ír belőle"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1806",
    "category": "literature",
    "prompt": "Mikor született József Attila?",
    "options": [
      "1905-ben",
      "1919-ben",
      "1925-ben",
      "1937-ben"
    ],
    "correctOptionIndex": 0
  },
  {
    "id": "mcq_1807",
    "category": "literature",
    "prompt": "Hol született József Attila?",
    "options": [
      "Makón",
      "Ferencvárosban",
      "Szegeden",
      "Balatonszárszón"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1808",
    "category": "literature",
    "prompt": "Miért bízta József Attilát és testvérét édesanyjuk a Gyermekvédő Ligára?",
    "options": [
      "Mert külföldre költözött",
      "Mert nem tudta eltartani őket",
      "Mert taníttatni akarta őket Bécsben",
      "Mert apjuk ezt kérte"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1809",
    "category": "literature",
    "prompt": "Ki ismerte fel József Attila tehetségét, és bátorította őt pályája elején?",
    "options": [
      "Illyés Gyula",
      "Horger Antal",
      "Juhász Gyula",
      "Szántó Judit"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1810",
    "category": "literature",
    "prompt": "Melyik versének megjelenése miatt támadták erősen József Attilát 1925-ben?",
    "options": [
      "Tiszta szívvel",
      "Karóval jöttél",
      "Mama",
      "Óda"
    ],
    "correctOptionIndex": 0
  },
  {
    "id": "mcq_1811",
    "category": "literature",
    "prompt": "Melyik két külföldi városban tanult József Attila a szegedi évek után?",
    "options": [
      "Berlinben és Rómában",
      "Londonban és Párizsban",
      "Bécsben és Párizsban",
      "Prágában és Bécsben"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1812",
    "category": "literature",
    "prompt": "Mi volt annak a folyóiratnak a címe, amelyhez József Attila utolsó éveiben tartozott?",
    "options": [
      "Nyugat",
      "Szép Szó",
      "Kelet Népe",
      "Híd"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1813",
    "category": "literature",
    "prompt": "Melyik évben születtek József Attila legismertebb létösszegző búcsúversei?",
    "options": [
      "1920-ban",
      "1925-ben",
      "1933-ban",
      "1937-ben"
    ],
    "correctOptionIndex": 3
  },
  {
    "id": "mcq_1814",
    "category": "literature",
    "prompt": "Mit jelképez a „Karóval jöttél” című vers első sorában a virág?",
    "options": [
      "Az életet",
      "A társadalmi kirekesztést",
      "A gyermekkort",
      "A szegénységet"
    ],
    "correctOptionIndex": 0
  },
  {
    "id": "mcq_1815",
    "category": "literature",
    "prompt": "Melyik állítás igaz a „Talán eltűnök hirtelen” című versre?",
    "options": [
      "Kizárólag szerelmi vers",
      "A jelen és a múlt teljesen független benne egymástól",
      "Létösszegző, idő- és értékszembesítő vers",
      "Csak a jövő örömteli lehetőségeit mutatja be"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1816",
    "category": "literature",
    "prompt": "Mikor született Kosztolányi Dezső?",
    "options": [
      "1885-ben",
      "1905-ben",
      "1870-ben",
      "1895-ben"
    ],
    "correctOptionIndex": 0
  },
  {
    "id": "mcq_1817",
    "category": "literature",
    "prompt": "Hol született Kosztolányi Dezső?",
    "options": [
      "Budapesten",
      "Szegeden",
      "Szabadkán",
      "Bécsben"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1818",
    "category": "literature",
    "prompt": "Milyen családból származott Kosztolányi Dezső?",
    "options": [
      "Paraszti családból",
      "Értelmiségi családból",
      "Nemesi családból",
      "Kereskedőcsaládból"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1819",
    "category": "literature",
    "prompt": "Mely tartalmazza Kosztolányi 4 regényét?",
    "options": [
      "Néró, Szöcske, Édes Anna, Family guy",
      "Az alábbiak közül egyik sem",
      "Egy ropi naplója, Harry Potter, KRESZ, Matek tankönyv",
      "Néró, Pacsirta, Édes Anna, Aranysárkány"
    ],
    "correctOptionIndex": 3
  },
  {
    "id": "mcq_1820",
    "category": "literature",
    "prompt": "Melyik folyóirat egyik első és legfontosabb szerzője lett Kosztolányi Dezső?",
    "options": [
      "Nyugat",
      "Szép Szó",
      "Híd",
      "Kelet Népe"
    ],
    "correctOptionIndex": 0
  },
  {
    "id": "mcq_1821",
    "category": "literature",
    "prompt": "Melyik műfaj tette Kosztolányi Dezsőt igazán meghatározóvá?",
    "options": [
      "Líra",
      "Dráma",
      "Próza",
      "Esszé"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1822",
    "category": "literature",
    "prompt": "Az alábbiak közül melyik Kosztolányi Dezső egyik hivatalos regénye?",
    "options": [
      "Az ember tragédiája",
      "Édes Anna",
      "Légy jó mindhalálig",
      "Abigél"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1823",
    "category": "literature",
    "prompt": "Melyik szerző inspirálta Kosztolányi Dezsőt a megadott szöveg szerint?",
    "options": [
      "Dosztojevkij",
      "Shakespeare",
      "Mollywood",
      "Jókai Mór"
    ],
    "correctOptionIndex": 3
  },
  {
    "id": "mcq_1824",
    "category": "literature",
    "prompt": "Mi áll a lélektani, pszichológiai írásmód középpontjában?",
    "options": [
      "A történelmi hitelesség",
      "A külső tájleírások",
      "A belső tudatfolyamatok",
      "A verses forma szabályai"
    ],
    "correctOptionIndex": 2
  },
  {
    "id": "mcq_1825",
    "category": "literature",
    "prompt": "Melyik állítás igaz a gyermekkor irodalmi megjelenítésére Kosztolányi műveiben?",
    "options": [
      "A gyermekkor csak mellékes szerepet játszik a személyiség alakulásában",
      "A gyermekkori hatások formálják a felnőtt karaktert",
      "A gyermekkor ábrázolása kizárólag párbeszédekre épül",
      "A gyermekkor témája csak a romantikában jelent meg"
    ],
    "correctOptionIndex": 1
  },
  {
    "id": "mcq_1826",
    "category": "literature",
    "prompt": "Melyik volt Kosztolányi legmeghatározóbb VERSES kötete?",
    "options": [
      "A szegény kisgyermek panaszai",
      "Édes anna",
      "Esti Kornél",
      "Az Isten lábánál"
    ],
    "correctOptionIndex": 0
  }
];

const GUESS_QUESTIONS = [
  { id: "guess_1", prompt: "Melyik évben találták fel a négyütemű belső égésű motort?", exactAnswer: 1876, unit: "év" },
  { id: "guess_2", prompt: "Melyik évben jelent meg a modern benzines autó?", exactAnswer: 1886, unit: "év" },
  { id: "guess_3", prompt: "Melyik évben találták fel a dízelmotort?", exactAnswer: 1897, unit: "év" },
  { id: "guess_4", prompt: "Melyik évben történt az első sikeres, irányított motoros repülés?", exactAnswer: 1903, unit: "év" },
  { id: "guess_5", prompt: "Melyik évben jelent meg a mauvein, az első kereskedelmileg sikeres szintetikus festék?", exactAnswer: 1856, unit: "év" },
  { id: "guess_6", prompt: "Melyik évben találták fel a dinamitet?", exactAnswer: 1867, unit: "év" },
  { id: "guess_7", prompt: "Melyik évben jelent meg az aszpirin stabil, tiszta formában?", exactAnswer: 1897, unit: "év" },
  { id: "guess_8", prompt: "Melyik évben találták fel a telefont?", exactAnswer: 1876, unit: "év" },
  { id: "guess_9", prompt: "Melyik évben jelent meg a ZBD transzformátor?", exactAnswer: 1885, unit: "év" },
  { id: "guess_10", prompt: "Hány magyar mérnök neve szerepel a ZBD transzformátor feltalálóiként?", exactAnswer: 3, unit: "darab" },
  { id: "guess_11", prompt: "Melyik évben verték le a szabadságharcot?", exactAnswer: 1849, unit: "év" },
  { id: "guess_12", prompt: "Melyik évben szenvedett Ausztria vereséget Franciaországtól?", exactAnswer: 1859, unit: "év" },
  { id: "guess_13", prompt: "Melyik évben adták ki az Októberi Diplomát?", exactAnswer: 1860, unit: "év" },
  { id: "guess_14", prompt: "Melyik évben adták ki a Februári Pátenset?", exactAnswer: 1861, unit: "év" },
  { id: "guess_15", prompt: "Melyik évben jelent meg Deák Ferenc Húsvéti cikke?", exactAnswer: 1865, unit: "év" },
  { id: "guess_16", prompt: "Melyik évben jött létre a kiegyezés?", exactAnswer: 1867, unit: "év" },
  { id: "guess_17", prompt: "Hány százalékot vállalt kezdetben Ciszlajtánia a közös kiadásokból?", exactAnswer: 70, unit: "%" },
  { id: "guess_18", prompt: "Hány százalékot vállalt kezdetben Magyarország a közös kiadásokból?", exactAnswer: 30, unit: "%" },
  { id: "guess_19", prompt: "Hány évente tárgyalták újra a kvótát?", exactAnswer: 10, unit: "év" },
  { id: "guess_20", prompt: "Hány főt küldött a magyar törvényhozás a delegációba?", exactAnswer: 60, unit: "fő" },
  { id: "guess_21", prompt: "Hány főből állt összesen a két delegáció együtt?", exactAnswer: 120, unit: "fő" },
  { id: "guess_22", prompt: "Melyik évben kezdődött Tisza Kálmán miniszterelnöksége?", exactAnswer: 1875, unit: "év" },
  { id: "guess_23", prompt: "Melyik évben vezették be Baross Gábor zónatarifáját?", exactAnswer: 1889, unit: "év" },
  { id: "guess_24", prompt: "Melyik évben vezették be az aranyalapú koronát?", exactAnswer: 1892, unit: "év" },
  { id: "guess_25", prompt: "Hány százalékra nőtt 1907-re a magyar kvóta?", exactAnswer: 36.4, unit: "%" },
  { id: "guess_26", prompt: "Melyik évben történt a szarajevói merénylet?", exactAnswer: 1914, unit: "év" },
  { id: "guess_27", prompt: "Hány millió katonát mozgósított nagyjából Németország a háború során?", exactAnswer: 11, unit: "millió" },
  { id: "guess_28", prompt: "Hány millió katonát mozgósított nagyjából Franciaország a háború során?", exactAnswer: 7.5, unit: "millió" },
  { id: "guess_29", prompt: "Hány millió katonát mozgósított nagyjából az Osztrák–Magyar Monarchia a háború során?", exactAnswer: 6.5, unit: "millió" },
  { id: "guess_30", prompt: "Hány millió katonát mozgósított nagyjából Oroszország a háború során?", exactAnswer: 12, unit: "millió" },
  { id: "guess_31", prompt: "Melyik évben történt a Gorlice–Tarnów-i áttörés?", exactAnswer: 1915, unit: "év" },
  { id: "guess_32", prompt: "Melyik évben zajlott a Bruszilov-offenzíva?", exactAnswer: 1916, unit: "év" },
  { id: "guess_33", prompt: "Melyik évben volt a caporettói áttörés?", exactAnswer: 1917, unit: "év" },
  { id: "guess_34", prompt: "Melyik évben tört be Románia Erdélybe?", exactAnswer: 1916, unit: "év" },
  { id: "guess_35", prompt: "Melyik évben halt meg Ferenc József?", exactAnswer: 1916, unit: "év" },
  { id: "guess_36", prompt: "Melyik évben történt az őszirózsás forradalom?", exactAnswer: 1918, unit: "év" },
  { id: "guess_37", prompt: "Melyik napon nevezték ki Károlyi Mihályt miniszterelnökké?", exactAnswer: 31, unit: "nap" },
  { id: "guess_38", prompt: "Melyik napon kiáltották ki a Magyar Népköztársaságot novemberben?", exactAnswer: 16, unit: "nap" },
  { id: "guess_39", prompt: "Melyik napon kiáltották ki a Tanácsköztársaságot 1919 márciusában?", exactAnswer: 21, unit: "nap" },
  { id: "guess_40", prompt: "Melyik napon mondott le a Tanácsköztársaság 1919 augusztusában?", exactAnswer: 1, unit: "nap" },
  { id: "guess_41", prompt: "Melyik évben hirdette meg Wilson a Tizennégy pontot?", exactAnswer: 1918, unit: "év" },
  { id: "guess_42", prompt: "Hány százalék volt a magyar anyanyelvűek aránya az 1910-es népszámlálás szerint?", exactAnswer: 54.5, unit: "%" },
  { id: "guess_43", prompt: "Hány főből állt a magyar békedelegáció?", exactAnswer: 66, unit: "fő" },
  { id: "guess_44", prompt: "Melyik napon indult el a magyar békedelegáció 1920 januárjában?", exactAnswer: 5, unit: "nap" },
  { id: "guess_45", prompt: "Melyik napon adták át a végleges békeszöveget a magyar félnek 1920 májusában?", exactAnswer: 6, unit: "nap" },
  { id: "guess_46", prompt: "Melyik napon írták alá a békeszerződést 1920 júniusában?", exactAnswer: 4, unit: "nap" },
  { id: "guess_47", prompt: "Hány aranykorona jóvátételi kötelezettség elvét rögzítette a szerződés?", exactAnswer: 200000000, unit: "aranykorona" },
  { id: "guess_48", prompt: "Hány főben maximálták a hadsereg létszámát?", exactAnswer: 35000, unit: "fő" },
  { id: "guess_49", prompt: "Hány százalékát veszítette el Magyarország a nyersvasnak?", exactAnswer: 83, unit: "%" },
  { id: "guess_50", prompt: "Hány százalék volt a magyar anyanyelvűek aránya a trianoni Magyarországon?", exactAnswer: 88.4, unit: "%" },
  { id: "guess_51", prompt: "Melyik évben alakult ki Németországban a háború elvesztése után a forradalmi helyzet?", exactAnswer: 1918, unit: "év" },
  { id: "guess_52", prompt: "Hány főre korlátozta a versailles-i béke a német hadsereg létszámát?", exactAnswer: 100000, unit: "fő" },
  { id: "guess_53", prompt: "Hány milliárd aranymárka jóvátételt róttak Németországra?", exactAnswer: 132, unit: "milliárd aranymárka" },
  { id: "guess_54", prompt: "Melyik év volt a hiperinfláció és a sörpuccs kríziséve?", exactAnswer: 1923, unit: "év" },
  { id: "guess_55", prompt: "Körülbelül hány millió munkanélküli volt Németországban 1932-re?", exactAnswer: 6, unit: "millió" },
  { id: "guess_56", prompt: "Melyik napon nevezték ki Hitlert kancellárrá 1933 januárjában?", exactAnswer: 30, unit: "nap" },
  { id: "guess_57", prompt: "Melyik napon fogadták el a Felhatalmazási törvényt 1933 márciusában?", exactAnswer: 23, unit: "nap" },
  { id: "guess_58", prompt: "Melyik napon volt a Hosszú kések éjszakája 1934 júniusában?", exactAnswer: 30, unit: "nap" },
  { id: "guess_59", prompt: "Melyik évben hirdették ki a nürnbergi törvényeket?", exactAnswer: 1935, unit: "év" },
  { id: "guess_60", prompt: "Körülbelül hány zsidó férfit hurcoltak el a kristályéjszaka után koncentrációs táborokba?", exactAnswer: 30000, unit: "" },
  { id: "guess_61", prompt: "Melyik évben robbantak ki a petrográdi forradalmak?", exactAnswer: 1917, unit: "év" },
  { id: "guess_62", prompt: "Hányadik hónapban kötöttek különbékét a központi hatalmakkal 1918-ban?", exactAnswer: 3, unit: "hónap" },
  { id: "guess_63", prompt: "Hányadik napon tört ki a bolsevik fegyveres felkelés Petrográdban novemberben?", exactAnswer: 7, unit: "nap" },
  { id: "guess_64", prompt: "Hányadik napon döntöttek a Vörös Hadsereg megalapításáról 1918 januárjában?", exactAnswer: 28, unit: "nap" },
  { id: "guess_65", prompt: "Melyik évben született meg az első szovjet alkotmány?", exactAnswer: 1918, unit: "év" },
  { id: "guess_66", prompt: "Hányadik pártkongresszuson kapott politikai keretet a NEP?", exactAnswer: 10, unit: "darab" },
  { id: "guess_67", prompt: "Melyik évben indult el rendeleti lépésekkel a NEP gyakorlati átállása?", exactAnswer: 1921, unit: "év" },
  { id: "guess_68", prompt: "Melyik évben lett Sztálin főtitkár?", exactAnswer: 1922, unit: "év" },
  { id: "guess_69", prompt: "Melyik évben indult az első nagy ötéves terv?", exactAnswer: 1928, unit: "év" },
  { id: "guess_70", prompt: "Melyik évben hajtották végre az erőszakos kolhozba lépési programot?", exactAnswer: 1929, unit: "év" },
  { id: "guess_71", prompt: "Melyik évben választották Horthy Miklóst kormányzóvá?", exactAnswer: 1920, unit: "év" },
  { id: "guess_72", prompt: "Hányadik napon választották Horthyt kormányzóvá 1920 márciusában?", exactAnswer: 1, unit: "nap" },
  { id: "guess_73", prompt: "Melyik évben született meg a numerus clausus?", exactAnswer: 1920, unit: "év" },
  { id: "guess_74", prompt: "Melyik évben kezdődött Bethlen István miniszterelnöksége?", exactAnswer: 1921, unit: "év" },
  { id: "guess_75", prompt: "Melyik évben lépett be Magyarország a Népszövetségbe?", exactAnswer: 1922, unit: "év" },
  { id: "guess_76", prompt: "Melyik évben kapott Magyarország népszövetségi kölcsönt?", exactAnswer: 1924, unit: "év" },
  { id: "guess_77", prompt: "Körülbelül hány millió aranykorona volt a népszövetségi kölcsön?", exactAnswer: 250, unit: "millió aranykorona" },
  { id: "guess_78", prompt: "Melyik évben kezdte meg működését a Magyar Nemzeti Bank?", exactAnswer: 1924, unit: "év" },
  { id: "guess_79", prompt: "Melyik évben vezették be a pengőt?", exactAnswer: 1927, unit: "év" },
  { id: "guess_80", prompt: "Hány papírkoronát ért 1 pengő?", exactAnswer: 12500, unit: "papírkorona" },
  { id: "guess_81", prompt: "Hány objektumot tartalmazott a népiskolaépítési program összesen?", exactAnswer: 5000, unit: "darab" },
  { id: "guess_82", prompt: "Hány tanterem épült a program keretében?", exactAnswer: 3475, unit: "darab" },
  { id: "guess_83", prompt: "Hány tanítói lakás épült a program keretében?", exactAnswer: 1525, unit: "darab" },
  { id: "guess_84", prompt: "Hány százalékról csökkent az analfabetizmus?", exactAnswer: 15, unit: "%" },
  { id: "guess_85", prompt: "Hány százalékát kapta Klebelsberg az 1928/1929-es állami költségvetésnek oktatási és kulturális fejlesztésekre?", exactAnswer: 10, unit: "%" },
  { id: "guess_86", prompt: "Melyik évben született az első bécsi döntés?", exactAnswer: 1938, unit: "év" },
  { id: "guess_87", prompt: "Hány százalék volt magyar az első bécsi döntéssel visszakerült területen?", exactAnswer: 86.6, unit: "%" },
  { id: "guess_88", prompt: "Melyik évben csatolták vissza Kárpátalját?", exactAnswer: 1939, unit: "év" },
  { id: "guess_89", prompt: "Hány százalék volt magyar a Kárpátalja visszacsatolásával megszerzett lakosságból?", exactAnswer: 15, unit: "%" },
  { id: "guess_90", prompt: "Melyik évben született a második bécsi döntés?", exactAnswer: 1940, unit: "év" },
  { id: "guess_91", prompt: "Hány százalék volt magyar a második bécsi döntéssel visszakerült területen?", exactAnswer: 50.9, unit: "%" },
  { id: "guess_92", prompt: "Melyik napon bombázták Kassát 1941 júniusában?", exactAnswer: 26, unit: "nap" },
  { id: "guess_93", prompt: "Melyik napon szállta meg Németország Magyarországot 1944 márciusában?", exactAnswer: 19, unit: "nap" },
  { id: "guess_94", prompt: "Melyik napon jelentette be Horthy a fegyverszünetet 1944 októberében?", exactAnswer: 15, unit: "nap" },
  { id: "guess_95", prompt: "Körülbelül hány ezer zsidót deportáltak 1944. május 15. és július 9. között?", exactAnswer: 440, unit: "ezer" },
  { id: "guess_96", prompt: "Melyik évben állította vissza Hitler a sorkatonaságot?", exactAnswer: 1935, unit: "év" },
  { id: "guess_97", prompt: "Melyik napon vonult be Hitler a Rajna-vidék demilitarizált övezetébe 1936 márciusában?", exactAnswer: 7, unit: "nap" },
  { id: "guess_98", prompt: "Melyik évben történt az Anschluss?", exactAnswer: 1938, unit: "év" },
  { id: "guess_99", prompt: "Melyik napon támadta meg Németország Lengyelországot 1939 szeptemberében?", exactAnswer: 1, unit: "nap" },
  { id: "guess_100", prompt: "Melyik napon támadta meg Németország a Szovjetuniót 1941 júniusában?", exactAnswer: 22, unit: "nap" },
  { id: "guess_101", prompt: "Melyik napon támadta meg Japán Pearl Harbort 1941 decemberében?", exactAnswer: 7, unit: "nap" },
  { id: "guess_102", prompt: "Melyik évben volt a sztálingrádi csata vége?", exactAnswer: 1943, unit: "év" },
  { id: "guess_103", prompt: "Melyik napon történt a normandiai partraszállás 1944 júniusában?", exactAnswer: 6, unit: "nap" },
  { id: "guess_104", prompt: "Körülbelül hány millió zsidót gyilkoltak meg a holokauszt során?", exactAnswer: 6, unit: "millió" },
  { id: "guess_105", prompt: "Melyik évben alakult meg hivatalosan az ENSZ?", exactAnswer: 1945, unit: "év" },
  { id: "guess_106", prompt: "Melyik évben halt meg Sztálin?", exactAnswer: 1953, unit: "év" },
  { id: "guess_107", prompt: "Hányadik napon hangzott el Nagy Imre rádiós beszéde 1953 júliusában?", exactAnswer: 4, unit: "nap" },
  { id: "guess_108", prompt: "Melyik évben hangzott el Hruscsov desztalinizációs fordulatot jelző kongresszusi beszéde?", exactAnswer: 1956, unit: "év" },
  { id: "guess_109", prompt: "Hányadik napon döntöttek Rákosi leváltásáról 1956 júliusában?", exactAnswer: 14, unit: "nap" },
  { id: "guess_110", prompt: "Hányadik napon temették újra Rajk Lászlót 1956 októberében?", exactAnswer: 6, unit: "nap" },
  { id: "guess_111", prompt: "Hányadik napon alakult meg a MEFESZ Szegeden?", exactAnswer: 16, unit: "nap" },
  { id: "guess_112", prompt: "Hány pontból állt a budapesti műegyetemisták programja?", exactAnswer: 16, unit: "pont" },
  { id: "guess_113", prompt: "Hányadik napon kezdődött a budapesti tüntetés 1956 októberében?", exactAnswer: 23, unit: "nap" },
  { id: "guess_114", prompt: "Hányadik napon lett újra miniszterelnök Nagy Imre?", exactAnswer: 24, unit: "nap" },
  { id: "guess_115", prompt: "Hányadik napon történt a Kossuth téri sortűz?", exactAnswer: 25, unit: "nap" },
  { id: "guess_116", prompt: "Hányadik napon kezdődött meg a szovjet csapatok kivonulása Budapestről?", exactAnswer: 29, unit: "nap" },
  { id: "guess_117", prompt: "Hányadik napon jelentette be Nagy Imre a semlegességet és a Varsói Szerződésből való kilépést?", exactAnswer: 1, unit: "nap" },
  { id: "guess_118", prompt: "Hányadik napon fogták le Tökölön a magyar küldöttséget?", exactAnswer: 3, unit: "nap" },
  { id: "guess_119", prompt: "Hányadik napon indult el a „Forgószél” hadművelet?", exactAnswer: 4, unit: "nap" },
  { id: "guess_120", prompt: "Melyik évben végezték ki Nagy Imrét és Maléter Pált?", exactAnswer: 1958, unit: "év" },
  { id: "guess_121", prompt: "Hányadik napon lett Kádár az MDP első titkára 1956 októberében?", exactAnswer: 25, unit: "nap" },
  { id: "guess_122", prompt: "Hányadik napon lett államminiszter Nagy Imre kormányában 1956 októberében?", exactAnswer: 30, unit: "nap" },
  { id: "guess_123", prompt: "Hányadik napon jelentette be az MSZMP megalakulását 1956 novemberében?", exactAnswer: 1, unit: "nap" },
  { id: "guess_124", prompt: "Hányadik napon volt a salgótarjáni sortűz 1956 decemberében?", exactAnswer: 8, unit: "nap" },
  { id: "guess_125", prompt: "Melyik évben végezték ki Nagy Imrét, Maléter Pált és Gimes Miklóst?", exactAnswer: 1958, unit: "év" },
  { id: "guess_126", prompt: "Melyik évben került le a „magyar kérdés” az ENSZ napirendjéről?", exactAnswer: 1962, unit: "év" },
  { id: "guess_127", prompt: "Hány százaléka volt 1980-ban az aktív keresőknek fizikai foglalkozású?", exactAnswer: 69.4, unit: "%" },
  { id: "guess_128", prompt: "Hány százalék volt a mezőgazdasági és erdőgazdálkodási foglalkozásúak aránya?", exactAnswer: 5.4, unit: "%" },
  { id: "guess_129", prompt: "Melyik évben vezették be az új gazdasági mechanizmust?", exactAnswer: 1968, unit: "év" },
  { id: "guess_130", prompt: "Hány milliárd dollár volt a bruttó államadósság 1973-ban?", exactAnswer: 2.1, unit: "milliárd dollár" },
  { id: "guess_131", prompt: "Hány milliárd dollárra nőtt a bruttó államadósság 1989-re?", exactAnswer: 20.4, unit: "milliárd dollár" },
  { id: "guess_132", prompt: "Hány ezer ember volt jelen körülbelül Nagy Imre és mártírtársai újratemetésén?", exactAnswer: 250, unit: "ezer" },
  { id: "guess_133", prompt: "Hányadik napon alakult meg a Fidesz 1988 márciusában?", exactAnswer: 30, unit: "nap" },
  { id: "guess_134", prompt: "Hányadik napon jött létre az Ellenzéki Kerekasztal 1989 márciusában?", exactAnswer: 22, unit: "nap" },
  { id: "guess_135", prompt: "Hány százalékos benzináremelésből lett taxisblokád 1990 őszén?", exactAnswer: 65, unit: "%" },
  { id: "guess_136", prompt: "Melyik évben állt vissza a kétszintű bankrendszer?", exactAnswer: 1987, unit: "év" },
  { id: "guess_137", prompt: "Melyik évben született meg a gazdasági társaságokról szóló törvény?", exactAnswer: 1988, unit: "év" },
  { id: "guess_138", prompt: "Melyik évben született meg az átalakulási törvény?", exactAnswer: 1989, unit: "év" },
  { id: "guess_139", prompt: "Hány milliárd dollár volt a külső adósság 1989-ben?", exactAnswer: 20.4, unit: "milliárd dollár" },
  { id: "guess_140", prompt: "Melyik évben szűnt meg a KGST?", exactAnswer: 1991, unit: "év" },
  { id: "guess_141", prompt: "Melyik évben volt a transzformációs válság mélypontja?", exactAnswer: 1993, unit: "év" },
  { id: "guess_142", prompt: "Körülbelül hány százalékkal esett vissza összesen a GDP 1989 és 1993 között?", exactAnswer: 18.5, unit: "%" },
  { id: "guess_143", prompt: "Hány százalékos egyszeri forintleértékelés tartozott a Bokros-csomaghoz?", exactAnswer: 9, unit: "%" },
  { id: "guess_144", prompt: "Hány százalékos vámpótlékot vezettek be a Bokros-csomag részeként?", exactAnswer: 8, unit: "%" },
  { id: "guess_145", prompt: "Melyik évben csatlakozott Magyarország az Európai Unióhoz?", exactAnswer: 2004, unit: "év" },
  { id: "guess_146", prompt: "Melyik évben jött létre az Európai Szén- és Acélközösség?", exactAnswer: 1951, unit: "év" },
  { id: "guess_147", prompt: "Melyik évben írták alá a Római Szerződést?", exactAnswer: 1957, unit: "év" },
  { id: "guess_148", prompt: "Melyik évben lépett hatályba a Maastrichti Szerződés?", exactAnswer: 1993, unit: "év" },
  { id: "guess_149", prompt: "Melyik évben lépett hatályba a schengeni rendszer a tananyag szerint?", exactAnswer: 1995, unit: "év" },
  { id: "guess_150", prompt: "Hány ország csatlakozott az EU-hoz 2004-ben?", exactAnswer: 10, unit: "darab" },
  { id: "guess_151", prompt: "Hány százalékot tett ki a GNI-alapú befizetés a 2025-ös bontásban?", exactAnswer: 65, unit: "%" },
  { id: "guess_152", prompt: "Hány képviselőből áll jelenleg az Európai Parlament a tananyag szerint?", exactAnswer: 720, unit: "fő" },
  { id: "guess_153", prompt: "Hány évre választják az Európai Parlament képviselőit?", exactAnswer: 5, unit: "év" },
  { id: "guess_154", prompt: "Hány millió nemzetközi migráns élt a világon 2024-ben?", exactAnswer: 304, unit: "millió" },
  { id: "guess_155", prompt: "Körülbelül hány milliárd ember élt a Földön 2020 közepén?", exactAnswer: 7.8, unit: "milliárd" },
  { id: "guess_156", prompt: "Melyik év óta csökken folyamatosan Magyarország népessége?", exactAnswer: 1981, unit: "év" },
  { id: "guess_157", prompt: "Hány képviselője van az Országgyűlésnek?", exactAnswer: 199, unit: "fő" },
  { id: "guess_158", prompt: "Melyik évben fogadta el az Országgyűlés az Alaptörvényt?", exactAnswer: 2011, unit: "év" },
  { id: "guess_159", prompt: "Hány éves korig tart a kötelező tankötelezettség a tananyag szerint?", exactAnswer: 16, unit: "év" },
  { id: "guess_160", prompt: "Hány nap alatt teremtette meg Isten a világot?", exactAnswer: 6, unit: "darab" },
  { id: "guess_161", prompt: "Hányadik napon pihent meg Isten a teremtés után?", exactAnswer: 7, unit: "nap" },
  { id: "guess_162", prompt: "Hány nap sodródás után küldött Noé galambot, hogy talál-e szárazföldet?", exactAnswer: 40, unit: "darab" },
  { id: "guess_163", prompt: "Hány testvére volt Józsefnek?", exactAnswer: 11, unit: "darab" },
  { id: "guess_164", prompt: "Hány zsoltárból áll a Zsoltárok könyve?", exactAnswer: 150, unit: "darab" },
  { id: "guess_165", prompt: "Melyik században kezd kibontakozni a reneszánsz?", exactAnswer: 14, unit: "század" },
  { id: "guess_166", prompt: "Hány észak-itáliai városállamot nevez meg a tananyag a reneszánsz bölcsőjeként?", exactAnswer: 3, unit: "darab" },
  { id: "guess_167", prompt: "Melyik évben született William Shakespeare?", exactAnswer: 1564, unit: "év" },
  { id: "guess_168", prompt: "Melyik évben halt meg William Shakespeare?", exactAnswer: 1616, unit: "év" },
  { id: "guess_169", prompt: "Melyik évben épült fel a Globe Színház?", exactAnswer: 1599, unit: "év" },
  { id: "guess_170", prompt: "Hány drámát írt Shakespeare a tananyag szerint?", exactAnswer: 37, unit: "darab" },
  { id: "guess_171", prompt: "Körülbelül minimum hány ember fért el egyszerre a Globe Színházban?", exactAnswer: 2000, unit: "fő" },
  { id: "guess_172", prompt: "Hány részből állt a Globe színpada?", exactAnswer: 3, unit: "rész" },
  { id: "guess_173", prompt: "Hány órakor kezdődtek az előadások a Globe-ban?", exactAnswer: 14, unit: "óra" },
  { id: "guess_174", prompt: "Hány éves Júlia a történet szerint?", exactAnswer: 14, unit: "év" },
  { id: "guess_175", prompt: "Melyik évben született Jannus Pannonius?", exactAnswer: 1434, unit: "év" },
  { id: "guess_176", prompt: "Melyik évben halt meg Jannus Pannonius?", exactAnswer: 1472, unit: "év" },
  { id: "guess_177", prompt: "Hány részre bomlik az epigramma?", exactAnswer: 2, unit: "rész" },
  { id: "guess_178", prompt: "Melyik évben született Balassi Bálint?", exactAnswer: 1554, unit: "év" },
  { id: "guess_179", prompt: "Hány fő témakörbe sorolható Balassi költészete ?", exactAnswer: 3, unit: "fő" },
  { id: "guess_180", prompt: "Hányadik században kezdődött a reformáció?", exactAnswer: 16, unit: "század" },
  { id: "guess_181", prompt: "Melyik évben szegezte ki Luther Márton a 95 tételt?", exactAnswer: 1517, unit: "év" },
  { id: "guess_182", prompt: "Hány tételt szegezett ki Luther Márton?", exactAnswer: 95, unit: "tétel" },
  { id: "guess_183", prompt: "Melyik év körül találták fel a könyvnyomtatást?", exactAnswer: 1450, unit: "év" },
  { id: "guess_184", prompt: "Melyik évben jelent meg a Vizsolyi Biblia?", exactAnswer: 1590, unit: "év" },
  { id: "guess_185", prompt: "Melyik évben kezdődött a tridenti zsinat?", exactAnswer: 1545, unit: "év" },
  { id: "guess_186", prompt: "Melyik évben ért véget a tridenti zsinat?", exactAnswer: 1563, unit: "év" },
  { id: "guess_187", prompt: "Hányadik században jelent meg Magyarországon a barokk?", exactAnswer: 17, unit: "század" },
  { id: "guess_188", prompt: "Hány levélből áll a Törökországi levelek?", exactAnswer: 207, unit: "darab" },
  { id: "guess_189", prompt: "Melyik évben született Zrínyi Miklós?", exactAnswer: 1620, unit: "év" },
  { id: "guess_190", prompt: "Melyik évben halt meg Zrínyi Miklós?", exactAnswer: 1664, unit: "év" },
  { id: "guess_191", prompt: "Melyik évben jelent meg az Adriai tengernek Syrenája?", exactAnswer: 1651, unit: "év" },
  { id: "guess_192", prompt: "Melyik év ostromát beszéli el a Szigeti veszedelem?", exactAnswer: 1566, unit: "év" },
  { id: "guess_193", prompt: "Hány énekre tagolódik a Szigeti veszedelem?", exactAnswer: 15, unit: "ének" },
  { id: "guess_194", prompt: "Melyik évben tört ki a francia forradalom?", exactAnswer: 1789, unit: "év" },
  { id: "guess_195", prompt: "Melyik évhez szokás kötni a magyar felvilágosodás kezdetét?", exactAnswer: 1772, unit: "év" },
  { id: "guess_196", prompt: "Melyik évhez szokás kötni a magyar felvilágosodás végét?", exactAnswer: 1825, unit: "év" },
  { id: "guess_197", prompt: "Melyik évben született René Descartes?", exactAnswer: 1596, unit: "év" },
  { id: "guess_198", prompt: "Melyik évben született John Locke?", exactAnswer: 1632, unit: "év" },
  { id: "guess_199", prompt: "Hány fantasztikus utazást mutat be a Gulliver utazásai?", exactAnswer: 4, unit: "darab" },
  { id: "guess_200", prompt: "Hány felvonásból áll az Ágis tragédiája?", exactAnswer: 5, unit: "felvonás" },
  { id: "guess_201", prompt: "Melyik évben született Bessenyei György?", exactAnswer: 1746, unit: "év" },
  { id: "guess_202", prompt: "Melyik évben született Kazinczy Ferenc?", exactAnswer: 1759, unit: "év" },
  { id: "guess_203", prompt: "Melyik évben született Csokonai Vitéz Mihály?", exactAnswer: 1773, unit: "év" },
  { id: "guess_204", prompt: "Melyik évben zárták ki Csokonait a kollégiumból?", exactAnswer: 1795, unit: "év" },
  { id: "guess_205", prompt: "Melyik évben írta Csokonai Az estve című versét?", exactAnswer: 1794, unit: "év" },
  { id: "guess_206", prompt: "Hány egymást követő anaforikus sor erősíti Az estve érvelését?", exactAnswer: 7, unit: "darab" },
  { id: "guess_207", prompt: "Melyik évben született A Reményhez?", exactAnswer: 1803, unit: "év" },
  { id: "guess_208", prompt: "Hány éves volt Csokonai Vitéz Mihály halálakor?", exactAnswer: 31, unit: "év" },
  { id: "guess_209", prompt: "Melyik század végén bontakozott ki a romantika?", exactAnswer: 18, unit: "század" },
  { id: "guess_210", prompt: "Melyik század közepéig tartott a romantika korszaka?", exactAnswer: 19, unit: "század" },
  { id: "guess_211", prompt: "Melyik évben kezdődött az első ipari forradalom?", exactAnswer: 1760, unit: "év" },
  { id: "guess_212", prompt: "Melyik évben ért véget az első ipari forradalom?", exactAnswer: 1840, unit: "év" },
  { id: "guess_213", prompt: "Melyik évben született Berzsenyi Dániel?", exactAnswer: 1776, unit: "év" },
  { id: "guess_214", prompt: "Melyik évben halt meg Berzsenyi Dániel?", exactAnswer: 1836, unit: "év" },
  { id: "guess_215", prompt: "Hány fő műfajt emel ki a lap Berzsenyi Dániel költészetében?", exactAnswer: 2, unit: "fő" },
  { id: "guess_216", prompt: "Hány legfontosabb alkotást sorol fel a lap Berzsenyi Dánieltől?", exactAnswer: 4, unit: "" },
  { id: "guess_217", prompt: "Melyik évben kezdődött a reformkor?", exactAnswer: 1825, unit: "év" },
  { id: "guess_218", prompt: "Melyik évben ért véget a reformkor?", exactAnswer: 1848, unit: "év" },
  { id: "guess_219", prompt: "Hány versszak sorolja Berzsenyi Dániel A magyarokhoz I. című versében a jelen bűneit?", exactAnswer: 3, unit: "versszak" },
  { id: "guess_220", prompt: "Hány versszak idézi fel Berzsenyi Dániel A magyarokhoz I. című versében a múlt dicső példáit?", exactAnswer: 5, unit: "versszak" },
  { id: "guess_221", prompt: "Hányadik versszakokra válik elégikussá Berzsenyi Dániel A magyarokhoz I. című versének hangneme?", exactAnswer: 13, unit: "versszak" },
  { id: "guess_222", prompt: "Melyik évben keletkezett Berzsenyi Dániel A magyarokhoz II. című verse?", exactAnswer: 1807, unit: "év" },
  { id: "guess_223", prompt: "Melyik év veresége áll Berzsenyi Dániel A magyarokhoz II. című versének történelmi hátterében az osztrák császárság esetében?", exactAnswer: 1805, unit: "év" },
  { id: "guess_224", prompt: "Hány versszakból áll Berzsenyi Dániel A magyarokhoz II. című verse?", exactAnswer: 6, unit: "versszak" },
  { id: "guess_225", prompt: "Hány nagy egységre osztható Berzsenyi Dániel A magyarokhoz II. című verse?", exactAnswer: 2, unit: "rész" },
  { id: "guess_226", prompt: "Hány világtájat nevez meg az „északtól délig, kelettől nyugatig” szerkezet?", exactAnswer: 4, unit: "darab" },
  { id: "guess_227", prompt: "Hány földrajzi nevet sorol fel az elemzés Berzsenyi Dániel A magyarokhoz II. című versének világméretű viharképében?", exactAnswer: 4, unit: "darab" },
  { id: "guess_228", prompt: "Hányadik személybe vált át a lírai én Berzsenyi Dániel A magyarokhoz II. című versének utolsó versszakában?", exactAnswer: 1, unit: "darab" },
  { id: "guess_229", prompt: "Melyik évben született Petőfi Sándor?", exactAnswer: 1823, unit: "év" },
  { id: "guess_230", prompt: "Hányadik napon született Petőfi Sándor januárban?", exactAnswer: 1, unit: "nap" },
  { id: "guess_231", prompt: "Melyik évben jelent meg Petőfi Sándor első nyomtatott verse, A borozó?", exactAnswer: 1842, unit: "év" },
  { id: "guess_232", prompt: "Melyik évben adták ki Petőfi Sándor első verseskötetét, a Versek című könyvet?", exactAnswer: 1844, unit: "év" },
  { id: "guess_233", prompt: "Melyik évben jelent meg Petőfi Sándor A helység kalapácsa című vígeposza?", exactAnswer: 1844, unit: "év" },
  { id: "guess_234", prompt: "Melyik évben jelent meg Petőfi Sándor János vitéz című elbeszélő költeménye?", exactAnswer: 1845, unit: "év" },
  { id: "guess_235", prompt: "Hány rövid, epigrammaszerű darabból áll Petőfi Sándor Felhők című ciklusa?", exactAnswer: 66, unit: "darab" },
  { id: "guess_236", prompt: "Melyik évben ismerkedett meg Petőfi Sándor Szendrey Júliával?", exactAnswer: 1846, unit: "év" },
  { id: "guess_237", prompt: "Melyik évben házasodott össze Petőfi Sándor és Szendrey Júlia?", exactAnswer: 1847, unit: "év" },
  { id: "guess_238", prompt: "Melyik év januárjában keletkezett Petőfi Sándor A XIX. század költői című verse?", exactAnswer: 1847, unit: "század" },
  { id: "guess_239", prompt: "Hányadik napon szavalta el Petőfi Sándor a Nemzeti dalt márciusban?", exactAnswer: 15, unit: "nap" },
  { id: "guess_240", prompt: "Melyik évben tűnt el Petőfi Sándor a segesvári csatában?", exactAnswer: 1849, unit: "év" },
  { id: "guess_241", prompt: "Hányadik napon tűnt el Petőfi Sándor júliusban?", exactAnswer: 31, unit: "nap" },
  { id: "guess_242", prompt: "Hány éves volt Petőfi Sándor eltűnésekor?", exactAnswer: 26, unit: "év" },
  { id: "guess_243", prompt: "Körülbelül hány verset alkotott Petőfi Sándor élete során?", exactAnswer: 1000, unit: "darab" },
  { id: "guess_244", prompt: "Melyik évben született Arany János?", exactAnswer: 1817, unit: "év" },
  { id: "guess_245", prompt: "Melyik évben jelent meg Arany János Toldi című műve?", exactAnswer: 1846, unit: "év" },
  { id: "guess_246", prompt: "Melyik évben költözött Arany János Nagykőrösre?", exactAnswer: 1851, unit: "év" },
  { id: "guess_247", prompt: "Melyik évben kezdődött Arany János Őszikék korszaka?", exactAnswer: 1877, unit: "év" },
  { id: "guess_248", prompt: "Hány éves volt Arany János halálakor?", exactAnswer: 65, unit: "év" },
  { id: "guess_249", prompt: "Hány fő stílusirányzatot sorol a jegyzet a klasszikus modernséghez?", exactAnswer: 4, unit: "fő" },
  { id: "guess_250", prompt: "Hány nagy részre tagolódik Baudelaire A romlás virágai című kötete?", exactAnswer: 6, unit: "rész" },
  { id: "guess_251", prompt: "Hány felvonásos Csehov Sirály című drámája?", exactAnswer: 4, unit: "felvonás" },
  { id: "guess_252", prompt: "Legalább hány év a Sirály belső cselekményideje?", exactAnswer: 2, unit: "év" },
  { id: "guess_253", prompt: "Hány év kényszermunkára ítélik Raszkolnyikovot a Bűn és bűnhődés végén?", exactAnswer: 8, unit: "év" },
  { id: "guess_254", prompt: "Melyik évben jelent meg a Nyugat első száma?", exactAnswer: 1908, unit: "év" },
  { id: "guess_255", prompt: "Melyik évben jelent meg Ady Endre Új versek című kötete?", exactAnswer: 1906, unit: "év" },
  { id: "guess_256", prompt: "Hány nagy ciklus helyezkedik el az Új versek két keretverse között?", exactAnswer: 4, unit: "darab" },
  { id: "guess_257", prompt: "Melyik évben született Ady Endre?", exactAnswer: 1877, unit: "év" },
  { id: "guess_258", prompt: "Melyik évben vette feleségül Ady Endre Csinszkát?", exactAnswer: 1915, unit: "év" },
  { id: "guess_259", prompt: "Melyik évben született Babits Mihály?", exactAnswer: 1883, unit: "év" },
  { id: "guess_260", prompt: "Melyik évben jelent meg Babits Mihály Levelek Iris koszorújából című kötete?", exactAnswer: 1909, unit: "év" },
  { id: "guess_261", prompt: "Melyik évben született Babits Mihály Húsvét előtt című verse?", exactAnswer: 1916, unit: "év" },
  { id: "guess_262", prompt: "Melyik évben lett Babits Mihály a Baumgarten-alapítvány kurátora?", exactAnswer: 1927, unit: "év" },
  { id: "guess_263", prompt: "Melyik évben tudta meg Babits Mihály, hogy daganat van a gégéjében?", exactAnswer: 1937, unit: "év" },
  { id: "guess_264", prompt: "Melyik évben veszítette el Babits Mihály a hangját a műtét során?", exactAnswer: 1938, unit: "év" },
  { id: "guess_265", prompt: "Melyik évben jelent meg a Jónás könyve a Nyugatban?", exactAnswer: 1938, unit: "év" },
  { id: "guess_266", prompt: "Hány napon át prédikál Jónás Ninivében Babits parafrázisában?", exactAnswer: 3, unit: "nap" },
  { id: "guess_267", prompt: "Melyik évben jelent meg könyv alakban a Jónás könyve?", exactAnswer: 1939, unit: "év" },
  { id: "guess_268", prompt: "Melyik évben jelent meg Babits Mihály utolsó verseskötete Jónás könyve címmel?", exactAnswer: 1940, unit: "év" },
];

const ULTRAHARD_QUESTIONS = [
  {
    id: "uhq_1",
    prompt: "Egy 2,5 tonnás autó 4 m/s² gyorsulással indul el. Mekkora erő szükséges ehhez?",
    options: ["2500 N", "4000 N", "10 000 N", "625 N"],
    correctOptionIndex: 2
  },
  {
    id: "uhq_2",
    prompt: "Egy 10 kg tömegű testet vízszintes felületen húznak 50 N nagyságú erővel. A súrlódási erő 20 N, és a mozgással ellentétes irányba hat. Mekkora lesz a test gyorsulása?",
    options: ["3 m/s²", "5 m/s²", "2 m/s²", "7 m/s²"],
    correctOptionIndex: 0
  },
  {
    id: "uhq_3",
    prompt: "Egy autó egy kör alakú úton halad 12 m/s sebességgel. A körpálya sugara 18 m. Mekkora az autó centripetális gyorsulása?",
    options: ["6 m/s²", "12 m/s²", "18 m/s²", "8 m/s²"],
    correctOptionIndex: 3
  },
  {
    id: "uhq_4",
    prompt: "Egy 80 kg tömegű ember az Egyenlítőn áll. Tekintsük a Föld sugarát 6,4 · 10⁶ m-nek, a Föld forgási idejét pedig 24 órának. Mekkora centrifugális erő hat az emberre?",
    options: ["8 N", "2,7 N", "0,27 N", "27 N"],
    correctOptionIndex: 1
  },
  {
    id: "uhq_5",
    prompt: "Egy kerékpáros nyugalomból indul, és 6 másodperc alatt egyenletesen gyorsulva eléri a 12 m/s sebességet. Mekkora a gyorsulása, és mekkora utat tesz meg ezalatt?",
    options: ["3 m/s² és 18 m", "2 m/s² és 24 m", "2 m/s² és 36 m", "12 m/s² és 6 m"],
    correctOptionIndex: 2
  },
  {
    id: "uhq_6",
    prompt: "300 g 18,0 tömeg%-os réz(II)-szulfát-oldatból lehűtéskor 40,0 g CuSO₄·5H₂O kristály válik ki. Mekkora lesz a visszamaradó oldat réz(II)-szulfát-tömegszázaléka?",
    options: ["9,8%", "10,9%", "12,5%", "14,2%"],
    correctOptionIndex: 1
  },
  {
    id: "uhq_7",
    prompt: "Hány darab ion keletkezik összesen 13,68 g Al₂(SO₄)₃ teljes disszociációja során? (Avogadro-állandó: 6,02 · 10²³ mol⁻¹)",
    options: ["2,41 · 10²²", "6,02 · 10²²", "9,63 · 10²²", "1,20 · 10²³"],
    correctOptionIndex: 3
  },
  {
    id: "uhq_8",
    prompt: "Azonos hőmérsékleten és nyomáson 11,2 dm³ térfogatú CO–CH₄ gázelegyet teljesen elégetünk. Az égéshez 16,8 dm³ oxigén szükséges. Mennyi a metán térfogatszázaléka az elegyben?",
    options: ["66,7%", "50,0%", "33,3%", "75,0%"],
    correctOptionIndex: 0
  },
  {
    id: "uhq_9",
    prompt: "Rendezd a következő reakcióegyenletet, majd válaszd ki a helyes együtthatósort: K₂Cr₂O₇ + HCl → KCl + CrCl₃ + Cl₂ + H₂O",
    options: [
      "1 : 12 : 2 : 2 : 3 : 6",
      "2 : 14 : 2 : 2 : 3 : 7",
      "1 : 14 : 2 : 2 : 3 : 7",
      "1 : 14 : 1 : 2 : 3 : 7"
    ],
    correctOptionIndex: 2
  },
  {
    id: "uhq_10",
    prompt: "Mi a KAl(SO₄)₂·12H₂O vegyület szabályos neve?",
    options: [
      "kálium-alumínium-diszulfát-dodekahidrát",
      "kálium-alumínium-szulfát-dodekahidrát",
      "alumínium-kálium-szulfit-dodekahidrát",
      "kálium-aluminát-szulfát-dodekahidrát"
    ],
    correctOptionIndex: 1
  },
  {
    id: "uhq_11",
    prompt: "Hányféleképpen választható ki 3 ember 8 ember közül?",
    options: ["24", "28", "56", "64"],
    correctOptionIndex: 2
  },
  {
    id: "uhq_12",
    prompt: "Egy szabályos dobókockával kétszer dobunk. Mennyi annak a valószínűsége, hogy legalább egyszer 6-ost dobunk?",
    options: ["11/36", "1/6", "5/12", "25/36"],
    correctOptionIndex: 0
  },
  {
    id: "uhq_13",
    prompt: "Az lg(x − 2) + lg(5 − x) = 0 egyenletnél melyik szám NEM lehet megoldás a kikötés miatt?",
    options: ["3", "4", "4,5", "1"],
    correctOptionIndex: 3
  },
  {
    id: "uhq_14",
    prompt: "Mennyi az ∫ e^(2x) dx határozatlan integrál?",
    options: ["2e^(2x) + C", "1/2 · e^(2x) + C", "e^x + C", "e^(2x) + C"],
    correctOptionIndex: 1
  },
  {
    id: "uhq_15",
    prompt: "Egy gömb sugara 3 cm. Mennyi a térfogata?",
    options: ["9π cm³", "27π cm³", "36π cm³", "54π cm³"],
    correctOptionIndex: 2
  },
  {
    id: "uhq_16",
    prompt: "Melyik sejtszervecske feladata elsődlegesen az ATP-termelés az eukarióta sejtekben?",
    options: ["lizoszóma", "Golgi-készülék", "mitokondrium", "sejtközpont"],
    correctOptionIndex: 2
  },
  {
    id: "uhq_17",
    prompt: "Melyik mirigy választja ki az emberi szervezetben az inzulint?",
    options: ["pajzsmirigy", "hasnyálmirigy", "mellékvese", "agyalapi mirigy"],
    correctOptionIndex: 1
  },
  {
    id: "uhq_18",
    prompt: "Egy heterozigóta barna szemű anya (Bb) és egy kék szemű apa (bb) gyermekei esetén mekkora a valószínűsége a kék szemű utódnak, ha a barna domináns?",
    options: ["25%", "100%", "75%", "50%"],
    correctOptionIndex: 3
  },
  {
    id: "uhq_19",
    prompt: "Mi történik legnagyobb valószínűséggel, ha egy táplálékhálózatból eltűnik egy csúcsragadozó?",
    options: [
      "minden populáció egyedszáma egyszerre csökken",
      "a termelők azonnal kipusztulnak",
      "a zsákmányállatok állománya megnőhet",
      "megszűnik az energiaáramlás az ökoszisztémában"
    ],
    correctOptionIndex: 2
  },
  {
    id: "uhq_20",
    prompt: "Hol zajlik az emberi szervezetben a gázcsere döntő része?",
    options: ["a hörgőkben", "a légcsőben", "a gége üregében", "a léghólyagocskák falánál"],
    correctOptionIndex: 3
  }
];

module.exports = {
  MULTIPLE_CHOICE_QUESTIONS,
  GUESS_QUESTIONS,
  ULTRAHARD_QUESTIONS
};
