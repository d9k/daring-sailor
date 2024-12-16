t# Daring Sailor: tasks

## See also

- [done tasks](./ds-done-tasks.md)
- [README](../README.md)


## :black_square_button: Demo with compression

- [ ] huffman alone may be enough for JSON compression

### EWRAM

- [ ] :speaking_head_in_silhouette: [Documentation: EWRAM macro | issue #79 | butano](https://github.com/GValiente/butano/issues/79), 2024.12.16

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

### SAX-style parser: parsing to class

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

#### Using std:string

- _Why store it as a `std::string`? It could mess with the heap_ / [GValiente](https://discord.com/channels/768759024270704641/771045950709694474/1293508271080214598)

- _You can use most of the std lib. like std::string, std::vector, etc. it's slower than using something like etl, but it's there / [GValiente](https://discord.com/channels/768759024270704641/829850171151876127/1174087767689539600)_


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

## C++

- :newspaper: [Different ways to instantiate an object in C++ with Examples - GeeksforGeeks](https://www.geeksforgeeks.org/different-ways-to-instantiate-an-object-in-c-with-examples/)

- :speech_balloon: [performance - Fastest C++ map? | SO](https://stackoverflow.com/questions/3198112/fastest-c-map)

- :newspaper: [String enum — строковые enum | Хабр](https://habr.com/ru/articles/236403/)

- [Enum-Klassen in C++ und ihr Vorteil gegenüber Enum-Datentypen - GeeksforGeeks](https://www.geeksforgeeks.org/enum-classes-in-c-and-their-advantage-over-enum-datatype/)

- strings concatenation?
	- `const char welcome[] = "print('-= " LUA_PROGNAME " " LUA_PROGVER " =-')";`