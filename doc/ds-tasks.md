t# Daring Sailor: tasks

## See also

- [done tasks](./ds-done-tasks.md)
- [README](../README.md)

## :black_square_button: Demo with compression

- [ ] huffman alone may be enough for JSON compression

### EWRAM

- [x] :speaking_head_in_silhouette: [Documentation: EWRAM macro | issue #79 | butano](https://github.com/GValiente/butano/issues/79), 2024.12.16
	 - heap `int *numbers = new int[c]`
		 - _Yes, it should be stored in EWRAM. You can log the numbers pointer and check if the address is in the on-board work RAM (EWRAM) range:[GBA Memory Map | GBATEK](https://problemkaputt.de/gbatek.htm#gbamemorymap_) / [GValiente](https://github.com/GValiente/butano/issues/79#issuecomment-2545174773)
	- what about `BN_EWRAM_BSS_SECTION`?
		- [.bss - Wikipedia](https://en.wikipedia.org/wiki/.bss)
	- :speech_balloon: [How to initialize an empty integer array in C++ - Quora](https://www.quora.com/How-do-I-initialize-an-empty-integer-array-in-C)
	- :newspaper: [How to dynamically allocate, initialize, and delete arrays in C++](https://www.educative.io/answers/how-to-dynamically-allocate-initialize-and-delete-arrays-in-cpp)
		 - `delete[] arr`
	 - :speech_balloon: [c++ - Deleting a char array | SO](https://stackoverflow.com/questions/763520/deleting-a-char-array)

- EWRAM_DATA
- EWRAM_BSS
- BN_DATA_EWRAM_BSS

- dynamic allocation
	- works?

 - [x] :warning: `ISO C++ forbids converting a string constant to 'char*'`
	 - (Σ) forced type conversion with prefix `= (char *)`
	 - [warning: ISO C++ forbids converting a string constant to 'char\*' \[-Wwrite-strings\] - Stack Overflow](https://stackoverflow.com/questions/56524609/warning-iso-c-forbids-converting-a-string-constant-to-char-wwrite-string)

- [x] string copy
	- [std::strncpy - cppreference.com](https://en.cppreference.com/w/cpp/string/byte/strncpy)

- [x] accept any argument type
	- (Σ) `template<typename T>`
	- :speech_balloon: [c++ - Accept all types as argument in function | SO](https://stackoverflow.com/questions/28096863/accept-all-types-as-argument-in-function)

- [x] `bn::log` + `std::string`
	- :speech_balloon: [c++ - std::string to char\* | SO](https://stackoverflow.com/questions/7352099/stdstring-to-char)
		- `stdStr.c_str()`

- [x] sprintf
	- [sprintf в C/C++: форматирование строк](https://codelessons.dev/ru/sprintf-in-c-cplusplus/)

- [-] string concat
	- concat doesn't work: no operator overload avail.
	- :speech_balloon: [Concatenate char arrays in C++ | SO](https://stackoverflow.com/questions/24255051/concatenate-char-arrays-in-c)

### Free memory `char *`

- :speech_balloon: [c++ how to free memory \*char? | SO](https://stackoverflow.com/questions/14927243/c-how-to-free-memory-char)

## Demo: SAX-style parser: parsing to class

- `ParsersStack`
	- `parsers`
	- `add`
	- `pop`
	- `parseTocken()`
		- :beginner: [Token-by-Token Parsing | RapidJSON: SAX](https://rapidjson.org/md_doc_sax.html)
	- `std::vector`
	- [-] `std::list`
		- :rotating_light: :point_right: [[gd-garbage#^d9k-gba-std-list-fail-2024-12-23|garbage: GBA std list fail]]
	- base class methods calls base class fields
		- :rotating_light: `member function declared with 'override' does not override a base class member`
	- :rotating_light: `undefined reference to std::__throw_length_error`
		- [x] [Arduino Due warning: std::\_\_throw\_length\_error(char const\*) - Mega / Due - Arduino Forum](https://forum.arduino.cc/t/arduino-due-warning-std-__throw_length_error-char-const/308515)

- [ ] `char*` from `const char*?`
	- [ ] :speech_balloon: [c++ - How to store a const char\* to a char\*? | SO](https://stackoverflow.com/questions/36789380/how-to-store-a-const-char-to-a-char)

- [ ] `lastParseEvent:`
	- :beginner: [C++ | Перечисления](https://metanit.com/cpp/tutorial/5.9.php)
	- `PARSE_EVENT_WAIT_NEXT_TOKEN = 0`
	- `PARSE_EVENT_IMMERSE_TO_SUBPARSER = 1`
	- `PARSE_EVENT_PARSE_FINISHED = 2`

- `currentFieldName: string`
- `currentFieldSubparser: Parser`
- `result: any`

- `parserFinished`

- `onSubparserFinished(subparser)`

- `parsingHandlersStack std::list`

- `.nextParsingHandler` - if not null, add handler to stack
- `.parseEnd: true`
- `.parseResult: any`

### Movie class declaration

#### string field in #Cpp class

- :tv: [Optimizing A String Class for Computer Graphics in Cpp - Zander Majercik, Morgan McGuire CppCon 22 | YT](https://www.youtube.com/watch?v=fglXeSWGVDc)

- :speech_balloon: [pointers - C++ char\* as a class member | SO](https://stackoverflow.com/questions/41416226/c-char-as-a-class-member/41416259#41416259)
	- _You aren't using pointers for `a1` and `a2`. `a2 = a1;` creates a copy of `a1` and assigns it to `a2`, they don't refer to the same object_
- :speech_balloon: [C++ pointer to objects | SO](https://stackoverflow.com/questions/2988273/c-pointer-to-objects)
	- `MyClass myClass` - allocate on stack. The memory allocated for the object is automatically released when myClass variable goes out of scope.
	- `MyClass* p = new MyClass();` In that case, you have to take care of releasing the memory by doing delete yourself.
	- _I always prefer to use the stack allocated objects whenever possible as I don't have to be bothered about the memory management._
	- `MyClass* myclassptr = &myclass;`


### :white_check_mark:  include resources file

- :speech_balloon: ["#include" a text file in a C program as a char\[\] | SO](https://stackoverflow.com/questions/410980/include-a-text-file-in-a-c-program-as-a-char/25021520#25021520)
- :speech_balloon: [c++ - Include a file as a string | SO](https://stackoverflow.com/questions/43256465/include-a-file-as-a-string)

- `palestinian_movies.json`
	- 41kb в JSON
	- 39kb в JSON5: -4.8%

- `palestinian_movies_cut.json`
	- cut to 29549 bytes
	- validated with :toolbox: [JSON Online Validator and Formatter - JSON Lint](https://jsonlint.com/)

- :speech_balloon: [Substring of char\[\] in c++ | SO](https://stackoverflow.com/questions/15586586/substring-of-char-in-c)
	- cut part

- :speech_balloon: [строки - ISO C++ forbids converting a string constant to 'char\*' | SO на русском](https://ru.stackoverflow.com/questions/919457/iso-c-forbids-converting-a-string-constant-to-char)

- [ ] :beginner: [RapidJSON: SAX](https://rapidjson.org/md_doc_sax.html)
	- :rotating_light: :point_right: [[gd-garbage#^d9k-gba-radidjson-error-2024-12-03|garbage: GBA RapidJSON]]
		 - [ ] :rotating_light: `undefined reference to std::basic_ostream`
			 - :speaking_head_in_silhouette: [at butano Discord](https://discord.com/channels/768759024270704641/831589248239009832/1313492009431994428)
				 - [ ] [bn::ostringstream class | Butano Docs](https://gvaliente.github.io/butano/classbn_1_1ostringstream.html)

- [Frequently asked questions (FAQ) | Butano Docs](https://gvaliente.github.io/butano/faq.html#faq_stack_trace)
	- :toolbox: [GCC and MSVC C++ Demangler](https://demangler.com/)

### :black_square_button: Choosing serialization library

- :point_right: [[serialize-data-for-embedded]] [(weblink)](https://github.com/d9k/d9k-public-notes/blob/main/pr-data/serialize-data-for-embedded.md)
- :beginner: [RapidJSON: SAX](https://rapidjson.org/md_doc_sax.html)
- JSON5
	- no SAX JSON5 library?

### :hand: Generate 64 kb JSON

- (Σ) Just downladed dataset from kaggle for now

- :beginner: [Unique Values | Faker.js](https://fakerjs.dev/guide/unique)

- [faker-cxx](https://github.com/cieslarmichal/faker-cxx) by [cieslarmichal](https://github.com/cieslarmichal)
	- #Cpp _faker library for generating fake (but realistic) data_
	 - Compiler support
		- :microbe: GCC➚ version `12` or newer
			- having `11.4`
			- :speech_balloon: [add gcc 11 support | issue #596 | faker-cxx](https://github.com/cieslarmichal/faker-cxx/issues/596)
	- generate array of unique words?
		- GTest (set `BUILD_TESTING=OFF` CMake flag to disable this dependency)

- `src/modules/food_data.h`

- [JSON Generator – tool for generating random JSON data](https://app.json-generator.com/signin)

- example JSON files
	- https://microsoftedge.github.io/Demos/json-dummy-data/
		- just persons. need more numbers and nested objects
	- [Sample users JSON file to import](https://gist.github.com/saltukalakus/124bba04327d8e5eab605d4fb66c53b8)
		- not nested. short
	- [awesome-json-datasets](https://github.com/jdorfman/awesome-json-datasets) by [jdorfman](https://github.com/jdorfman)
		- :fallen_leaf: 2019
		- _A curated list of awesome JSON datasets that don't require authentication._
	- [Wikidata jsons](https://www.kaggle.com/datasets/timoboz/wikidata-jsons?resource=download)
		- `wikida_type_dict.json`
			- `~2gb`
	- [Palestinian Movies JSON Dataset](https://www.kaggle.com/datasets/sondosaabed/palestinian-movies-json-dataset)
		- `35.57kb`
	- [JSON datasets | Search | Kaggle](https://www.kaggle.com/search?q=json+in%3Adatasets)
	- [json files of datasets | kaggle](https://www.kaggle.com/datasets/karthikrathod/json-files-of-datasets)

## Save game

- (and generated map)

### Choosing #save_game format

- :point_right: [[serialize-data-for-embedded]] [(weblink)](https://github.com/d9k/d9k-public-notes/blob/main/pr-data/serialize-data-for-embedded.md)

### Compress savegame

- to fit in 32kb SRAM

- :point_right: [[compress-data-for-embedded]] [(weblink)](https://github.com/d9k/d9k-public-notes/blob/main/pr-data/compress-data-for-embedded.md)

## :black_square_button: Generate map

- vector
	- :open_file_folder: `butano/include/bn_vector.h`
		- `erase(const_iterator position)`
			- _Erases an element_

- c++ max integer
	- [Fundamental types - cppreference.com](https://en.cppreference.com/w/cpp/language/types)
	- 16 bit: `32767`
	- 32 bit: `2'147'483'647`
	- :open_file_folder: `butano/hw/3rd_party/maxmod/include/mm_types.h`
		- `typedef unsigned int	mm_word;	// 32 bits`
		- `typedef unsigned short	mm_hword;	// 16 bits`
		- `typedef unsigned char	mm_byte;	// 8 bits`

- memory
	- :open_file_folder: `games/butano-fighter/src/bf_stats.cpp`
	- [Frequently asked questions (FAQ) | Butano Docs](https://gvaliente.github.io/butano/faq.html)
		- `BN_DATA_EWRAM`

## #Cpp

- C++ `override` / `virtual`
	- [Virtual Function in C++ - GeeksforGeeks](https://www.geeksforgeeks.org/virtual-function-cpp/)
	- :speech_balloon: [Why doesn't C++ have virtual variables? | SO](https://stackoverflow.com/questions/3248255/why-doesnt-c-have-virtual-variables)
	- [Virtual inheritance - Wikipedia](https://en.wikipedia.org/wiki/Virtual_inheritance)

- C++ abstract
	- [Abstract class - cppreference.com](https://en.cppreference.com/w/cpp/language/abstract_class)

- :speech_balloon: [c++ - STL List to hold structure pointers | SO](https://stackoverflow.com/questions/1085489/stl-list-to-hold-structure-pointers)

- :speech_balloon: [c - Why structs cannot be assigned directly? | SO](https://stackoverflow.com/questions/12189480/why-structs-cannot-be-assigned-directly)

- :newspaper: [Different ways to instantiate an object in C++ with Examples - GeeksforGeeks](https://www.geeksforgeeks.org/different-ways-to-instantiate-an-object-in-c-with-examples/)

- :speech_balloon: [performance - Fastest C++ map? | SO](https://stackoverflow.com/questions/3198112/fastest-c-map)

- [Enum-Klassen in C++ und ihr Vorteil gegenüber Enum-Datentypen - GeeksforGeeks](https://www.geeksforgeeks.org/enum-classes-in-c-and-their-advantage-over-enum-datatype/)

- strings concatenation?
	- `const char welcome[] = "print('-= " LUA_PROGNAME " " LUA_PROGVER " =-')";`


### #Butano Using `bn::string`

- :speaking_head_in_silhouette: How to compare `bn::string`?
	- `bn::string` is a `std::string` copycat. Comparing works the same / [GValiente](https://discord.com/channels/768759024270704641/831589248239009832/1320842067424972940)

- :speaking_head_in_silhouette: Why trying to use  `std::string` with "wonderful toolchain" and butano is a mess? / [2024.12.25](https://discord.com/channels/768759024270704641/831589248239009832/1321345763091021845)

- how max size is used?

- :beginner: [bn::string class | Butano Docs](https://gvaliente.github.io/butano/classbn_1_1string.html)
	- `std::string` like container with a fixed size buffer.

- _Storing a `bn::string` in rom seems a bit wasteful, when you can store a `bn::string_view` [GValiente](https://discord.com/channels/768759024270704641/831589248239009832/1277140156742242376)

### C++ using `* char`

[c - How to Compare 2 Character Arrays - Stack Overflow](https://stackoverflow.com/questions/40605075/how-to-compare-2-character-arrays)

### C++ std::string_view

- :speech_balloon: [Why can I mutate a std::string\_view? : r/cpp\_questions](https://www.reddit.com/r/cpp_questions/comments/1aqu722/why_can_i_mutate_a_stdstring_view/?rdt=46916)
	- _You can pretty much think of `std::string_view` as a `const char*`, except that it is aware of its size and has member functions. Importantly it has constructors form a bunch of "string like" types._ / [IyeOnline](https://www.reddit.com/r/cpp_questions/comments/1aqu722/comment/kqg60wy/)

- :newspaper: [C++ | Тип std:string\_view](https://metanit.com/cpp/tutorial/12.10.php)

- :newspaper: [C++17 — std::string\_view и никакого копирования / Хабр](https://habr.com/ru/companies/otus/articles/715608/)

 - :newspaper: [Three reasons to pass \`std::string\_view\` by value – Arthur O'Dwyer – Stuff mostly about C++](https://quuxplusone.github.io/blog/2021/11/09/pass-string-view-by-value/)

### C++ Using std:string

- :beginner: [std::to\_string - cppreference.com](https://en.cppreference.com/w/cpp/string/basic_string/to_string)

- :beginner: [cplusplus.com/reference/sstream/ostringstream/](https://cplusplus.com/reference/sstream/ostringstream/)

- :newspaper: [C++17 — std::string\_view и никакого копирования | Хабр](https://habr.com/ru/companies/otus/articles/715608/)

- :speech_balloon: [How do I convert from stringstream to string in C++? | SO](https://stackoverflow.com/questions/662976/how-do-i-convert-from-stringstream-to-string-in-c)
	- `ss.str();`

- :speech_balloon: [c++ - How to convert a std::string to const char\* or char\* | SO](https://stackoverflow.com/questions/347949/how-to-convert-a-stdstring-to-const-char-or-char?rq=1)
	- `const char * c = str.c_str();`
	- `char * c = str.data();`

- :speech_balloon: [c++ - convert a char\* to std::string | SO](https://stackoverflow.com/questions/1195675/convert-a-char-to-stdstring)

- :rotating_light: `undefined reference to std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >::_M_replace_cold`
	- :speech_balloon: [Build errors with GCC 13 | issue #3292 | sonic-pi](https://github.com/sonic-pi-net/sonic-pi/issues/3292)

- _Why store it as a `std::string`? It could mess with the heap_ / [GValiente](https://discord.com/channels/768759024270704641/771045950709694474/1293508271080214598)

- _You can use most of the std lib. like std::string, std::vector, etc. it's slower than using something like etl, but it's there / [GValiente](https://discord.com/channels/768759024270704641/829850171151876127/1174087767689539600)_

### C++ using enum

- [magic\_enum](https://github.com/Neargye/magic_enum) by [Neargye](https://github.com/Neargye)
	- _Static reflection for enums (to string, from string, iteration) for modern C++, work with any enum type without any macro or boilerplate code_

- :newspaper: [String enum — строковые enum | Хабр](https://habr.com/ru/articles/236403/)

- :beginner: [C++ | Перечисления](https://metanit.com/cpp/tutorial/5.9.php)

### C++ template class

- :speech_balloon: [c++ - How to avoid specifying arguments for a class template with default template arguments | SO](https://stackoverflow.com/questions/15373823/how-to-avoid-specifying-arguments-for-a-class-template-with-default-template-arg)
- :speech_balloon: [Inheriting from a template class in c++ | SO](https://stackoverflow.com/questions/8810224/inheriting-from-a-template-class-in-c)
- :beginner: [Шаблоны классов | Microsoft Learn](https://learn.microsoft.com/ru-ru/cpp/cpp/class-templates?view=msvc-170)

### C++ multiple inheritance

- [Multiple Inheritance in C++ - GeeksforGeeks](https://www.geeksforgeeks.org/multiple-inheritance-in-c/)

### C++ abstract class

### :no_entry_sign: C++ set field by name

- [-] :speech_balloon: [c++ - How can I access a struct property by string name? | SO](https://stackoverflow.com/questions/36506588/how-can-i-access-a-struct-property-by-string-name)
	- requires macro

### C++ standards

- :newspaper: [C++17 — std::string\_view и никакого копирования / Хабр](https://habr.com/ru/companies/otus/articles/715608/)

### C++ string alternatives

- [panda-lib](https://github.com/CrazyPandaLimited/panda-lib) by [CrazyPandaLimited](https://github.com/CrazyPandaLimited)
	- _Basic C++ library_

### C++ code analysis

- :newspaper: [“Why doesn’t my code work?” — to anyone learning the art of programming and writing to the Stack Overflow community | by Andrey Karpov | Medium](https://medium.com/@Code_Analysis/why-doesnt-my-code-work-62a8b92956a)

### C++ destructors

- :speech_balloon: [c++ - Destructor for char arrays Error | SO](https://stackoverflow.com/questions/24685133/destructor-for-char-arrays-error)
	- There is no need to check for `NULL` when issuing a `delete`

- https://stackoverflow.com/questions/36020149/how-to-design-class-that-has-char-pointer-as-class-member-variable

### C++ attributes

- :speech_balloon: [c++ - Атрибут nodiscard - Stack Overflow на русском](https://ru.stackoverflow.com/questions/1251814/%D0%90%D1%82%D1%80%D0%B8%D0%B1%D1%83%D1%82-nodiscard)

### C++ std::any

- :speech_balloon: [c++ - std::any without RTTI, how does it work? | SO](https://stackoverflow.com/questions/51361606/stdany-without-rtti-how-does-it-work)
	- Basically, `std::any` holds two things:
		- A pointer to a (dynamically) allocated storage
			- A pointer to a "storage manager function"

 - :newspaper: [C++ | std::any - comparison with void\* and motivating examples - nextptr](https://www.nextptr.com/tutorial/ta1571648512/stdany-comparison-with-void-and-motivating-examples)

 - :beginner: [std::any\_cast - cppreference.com](https://en.cppreference.com/w/cpp/utility/any/any_cast)

### C++ call super constructor

- :speech_balloon: [c++ - What are the rules for calling the base class constructor? | SO](https://stackoverflow.com/questions/120876/what-are-the-rules-for-calling-the-base-class-constructor)

- :speech_balloon: [c++ - Why is my override method not being called? | SO](https://stackoverflow.com/questions/42149093/why-is-my-override-method-not-being-called)
	- While you're inside a constructor, the derived class hasn't been constructed yet, so it effectively doesn't exist - constructors are executed base first, derived second. Any member calls you make from the base class constructor will be to the base class members.
	- If you would call `Show` in derived class from the ctor of the base class, `Child::Show` would use data fields of `Child` but the ctor of the derived class has not been called yet.

- [How can I call overridden function from constructor? - Development / Programming & Scripting - Epic Developer Community Forums](https://forums.unrealengine.com/t/how-can-i-call-overridden-function-from-constructor/287695)
	- In Unreal Engine there are special init functions, like `OnConstruction` and `PostSpawn`, they are called automatically by the engine on every actors’ construction.

- :speech_balloon: [c++ - Do I need to explicitly call the base virtual destructor? | SO](https://stackoverflow.com/questions/677620/do-i-need-to-explicitly-call-the-base-virtual-destructor)
	- Destructors are called automatically in the reverse order of construction. (Base classes last). Do not call base class destructors.