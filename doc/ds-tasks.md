t# Daring Sailor: tasks

## See also

- [done tasks](./ds-done-tasks.md)
- [README](../README.md)

## :black_square_button: Demo with compression

- [ ] huffman alone may be good enough for JSON compression

### C++ semantic versioning lib

- [ ] [semver](https://github.com/Neargye/semver) by [Neargye](https://github.com/Neargye)
	- _Semantic Versioning for modern C++_
	- 900+ строк
	- C++11 support (from code)

- [cpp-semver](https://github.com/z4kn4fein/cpp-semver) by [z4kn4fein](https://github.com/z4kn4fein)
	- C++ 11
	- _Semantic Versioning library for modern C++._
	- 400+ строк

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

## :white_check_mark: Demo: Savegame JSON: GUI

- [gba/cpp-butano/savegame-json | d9k-gamedev-examples](https://github.com/d9k/d9k-gamedev-examples/tree/main/gba/cpp-butano/savegame-json) by [d9k-gamedev-examples](https://github.com/d9k-gamedev-examples)
- 128/16=8 lines

- [x] 1st screen:
	- lines
		- num / total
		- id (* if differs from SRAM)
		- year
		- name (2 lines)
	- right/down - next, left/up - previous
	- start/select -

- [x] 2nd screen:
	- lines
		- name
		- num. name
		- at right: description scroll position / total
		- 5 lines of desription. If not beginning, first glyph is up arrow. If not end, last glyph is down arrow.
	- right/down - next, left/up - previous
	- start/select -

- [x] change toolkit to DevKitARM from WonderfullToolchain
	- [x] :rotating_light: :point_right: [[gd-garbage#^d9k-butano-savegame-json-devkitarm-error-2025-01-18|garbage: Butano savegame JSON DevkitARM error]]
		- (Σ) The reason was in `%f` usage in `sprintf()`
		- [x] Compare preprocessor output of toolchains
		- :speech_balloon: [gcc - How to view C preprocessor output? | SO](https://stackoverflow.com/questions/3742822/how-to-view-c-preprocessor-output)
			- [ ] :speaking_head_in_silhouette: _How can I compare result output after preprocessesor (but before compiler) of C++ code generated both with Wonderful Toolchain & DevKitARM?_ / [2025.01.18](https://discord.com/channels/768759024270704641/831589248239009832/1330210796034195486)
		- [x] temporary prohibit compilation with DevKitARM
			- [x] :speech_balloon: [Is it possible to "unset" an environment variable in a Makefile? | SO](https://stackoverflow.com/questions/2188313/is-it-possible-to-unset-an-environment-variable-in-a-makefile)
				- (Σ) `undefine DEVKITARM`…

## :white_check_mark: Demo: screen text classes

- [screen-text-classes | d9k-gamedev-examples](https://github.com/d9k/d9k-gamedev-examples/tree/main/gba/cpp-butano/screen-text-classes)

- [x] `screen_text::ScrollableBlock`
	- get_rows_num()
	- render()
	- set_text()
	- get_scroll_row_max()
	- set_scroll_row_position()

- [x] `screen_text::CaptionValuePair`
	- `constructor(*staticSprites, *dynamicSprites)`
	- static_caption
	- dynamic_value
	- static_to_sprites() - 1
	- dynamic_to_sprites() - 2
	- rerender() - 2 or 1+2
	- reset() - forces 1 next time
	- static_rendered: bool
	- cy_shift
	- cx_shift

- [x] `screen_text::RowsComposer`
	- add_text_block(b)
	- set_rows_starting_from(b, first_row_n)
	- delete_all_rows()
	- first_row_cy_shift
	- cx_shift
	- row_height
	- clear_static()
	- clear_dynamic()
%% 	- `_static_rows_nums: list (array)` %%
%% 	- add_row(r)
	- set_row(n) %%


- Choosing fonts
	- [gba-free-fonts](https://github.com/laqieer/gba-free-fonts?tab=readme-ov-file) by [laqieer](https://github.com/laqieer)
		- _Free font resources for GBA game development_
		- [ ] Unifont
		- [x] :rotating_light: `AttributeError: module 'PIL.Image' has no attribute 'Palette'` on :zap: `make`
			- (Σ) `pip install Pillow==11`
			- `pip show Pillow`
				- Version: 9.0.1
			- :speaking_head_in_silhouette: [Error: module 'PIL.Image' has no attribute 'Palette' | issue #6 | gba-free-fonts](https://github.com/laqieer/gba-free-fonts/issues/6)

- [ ] BN_CONCAT?

- [ ] array last member is skipped if no log!
	- :speech_balloon: [c++ - Check array position for null/empty | SO](https://stackoverflow.com/questions/19132411/check-array-position-for-null-empty)
	- [x] [No$gba exception setup guide | Butano Docs](https://gvaliente.github.io/butano/nocashgba_exception.html)
		- If you load an *.elf file instead of a *.gba file, it also shows the high level code that has triggered the exception. Please remember that *.elf support only works with devkitARM, it doesn't work if you're using Wonderful Toolchain.
	- [ ] [Bug in gcc: null pointer check removed : r/cpp](https://www.reddit.com/r/cpp/comments/cwt29t/bug_in_gcc_null_pointer_check_removed/)
	- [-] :beginner: [Common Function Attributes (Using the GNU Compiler Collection (GCC))](https://gcc.gnu.org/onlinedocs/gcc/Common-Function-Attributes.html)
		- [-] `cold`
	- [90949 – [9 Regression] null pointer check removed](https://gcc.gnu.org/bugzilla/show_bug.cgi?id=90949)
	- :speech_balloon: [How can I prevent GCC optimizing some statements in C? | SO](https://stackoverflow.com/questions/2219829/how-can-i-prevent-gcc-optimizing-some-statements-in-c)

- [ ] `has no member` (135) VS Code error for `bn::sprite_text_generator::alignment_type`
	- :speech_balloon: [Incorrect IntelliSense error "class has no member" | issue #6699 | vscode-cpptools](https://github.com/microsoft/vscode-cpptools/issues/6699)

### :black_square_button: SceneSelector

- _selectedScene: SelectedScene
- _next_manually_selected_scene()
- _auto_select_order: SelectedScene[]
- showInfo: boolean
- select_scene_manually()
- show_scene()

```
while() {
  SceneSelector.show_scene();
}
```

## :white_check_mark: Demo: SAX-style parser: parsing to class

- [gba/cpp-butano/savegame-json | d9k-gamedev-examples](https://github.com/d9k/d9k-gamedev-examples/tree/main/gba/cpp-butano/savegame-json) by [d9k-gamedev-examples](https://github.com/d9k-gamedev-examples)

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

- [x] :beginner: [RapidJSON: SAX](https://rapidjson.org/md_doc_sax.html)
	- :rotating_light: :point_right: [[gd-garbage#^d9k-gba-radidjson-error-2024-12-03|garbage: GBA RapidJSON]]
		 - [x] :rotating_light: `undefined reference to std::basic_ostream`
			 - (Σ) `USERLDFLAGS    := -lstdc++` in `Makefile`
			 - :speaking_head_in_silhouette: [at butano Discord](https://discord.com/channels/768759024270704641/831589248239009832/1313492009431994428)
				 - [bn::ostringstream class | Butano Docs](https://gvaliente.github.io/butano/classbn_1_1ostringstream.html)

- [Frequently asked questions (FAQ) | Butano Docs](https://gvaliente.github.io/butano/faq.html#faq_stack_trace)
	- :toolbox: [GCC and MSVC C++ Demangler](https://demangler.com/)

### :white_check_mark: Choosing serialization library

- :point_right: [[serialize-data-for-embedded]] [(weblink)](https://github.com/d9k/d9k-public-notes/blob/main/pr-data/serialize-data-for-embedded.md)
- :beginner: [RapidJSON: SAX](https://rapidjson.org/md_doc_sax.html)
- JSON5
	- no SAX JSON5 library?

### :hand: Generate 64 kb JSON

- (Σ) Just downloaded dataset from kaggle for now

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

- :speech_balloon: [c++ - How to disable warnings for particular include files? | SO](https://stackoverflow.com/questions/6321839/how-to-disable-warnings-for-particular-include-files)
	- `gcc -isystem path/to/dir`

- [Rule of three (C++ programming) - Wikipedia](https://en.wikipedia.org/wiki/Rule_of_three_(C%2B%2B_programming))
	:speech_balloon: [c++ - What is The Rule of Three? | SO](https://stackoverflow.com/questions/4172722/what-is-the-rule-of-three)

- :speech_balloon: [c++ - STL List to hold structure pointers | SO](https://stackoverflow.com/questions/1085489/stl-list-to-hold-structure-pointers)

- :speech_balloon: [c - Why structs cannot be assigned directly? | SO](https://stackoverflow.com/questions/12189480/why-structs-cannot-be-assigned-directly)

- :newspaper: [Different ways to instantiate an object in C++ with Examples - GeeksforGeeks](https://www.geeksforgeeks.org/different-ways-to-instantiate-an-object-in-c-with-examples/)

- :speech_balloon: [performance - Fastest C++ map? | SO](https://stackoverflow.com/questions/3198112/fastest-c-map)

- [Enum-Klassen in C++ und ihr Vorteil gegenüber Enum-Datentypen - GeeksforGeeks](https://www.geeksforgeeks.org/enum-classes-in-c-and-their-advantage-over-enum-datatype/)

- strings concatenation?
	- `const char welcome[] = "print('-= " LUA_PROGNAME " " LUA_PROGVER " =-')";`

- [x] `std::string::assign()` error
	- `USERLDFLAGS    := -lstdc++`
	- :rotating_light: `_M_replace_cold undefined reference`
		- :speech_balloon: [Build errors with GCC 13 | issue #3292 | sonic-pi · GitHub](https://github.com/sonic-pi-net/sonic-pi/issues/3292)
		- :speech_balloon: [Почему возникает проблема? — Хабр Q&A](https://qna.habr.com/q/1221810)
			- _Сообщение **undefined reference to** значит, что компилятор функцию знает, но линкер не догадывается, где она валяется. Для исправления надо включить в проект файлы с телами всех используемых версий всех функций. Если функции библиотечные, то это делается подключением lib файлов, или со статическими библиотеками, или с библиотеками импорта в зависимости от того, валяются ли функции в lib, или в dll. В том числе это относится к своим библиотекам. В остальных случаях добавить в проект файлы с исходниками тел функций._
		- :speech_balloon: [Wonderful toolchain: std::string::assign linker error | issue #80 | butano](https://github.com/GValiente/butano/issues/80)

- :newspaper: [std::stringstream и форматирование строк | Хабр](https://habr.com/ru/articles/131977/)

- `rvalue`
	- :newspaper: [Понимание lvalue и rvalue в C и С++ | Хабр](https://habr.com/ru/articles/348198/)
	- :speech_balloon: [c++ - Why is it illegal to take the address of an rvalue temporary? | SO](https://stackoverflow.com/questions/8763398/why-is-it-illegal-to-take-the-address-of-an-rvalue-temporary)
	- :speech_balloon: [c++ - Taking the address of a temporary object | SO](https://stackoverflow.com/questions/2280688/taking-the-address-of-a-temporary-object/2281928#2281928)

### C++ links

- :point_right: [[cpp-any|any / C++ / d9k-textbook]] [\[url\]](https://github.com/d9k/d9k-textbook/blob/master/cpp/cpp-any.md)
- :point_right: [[cpp-class|class / C++ / d9k-textbook]] [\[url\]](https://github.com/d9k/d9k-textbook/blob/master/cpp/cpp-class.md)
- :point_right: [[cpp-string|string / C++ / d9k-textbook]] [\[url\]](https://github.com/d9k/d9k-textbook/blob/master/cpp/cpp-string.md)

### #Butano Using `bn::string`

- :speaking_head_in_silhouette: How to compare `bn::string`?
	- `bn::string` is a `std::string` copycat. Comparing works the same / [GValiente](https://discord.com/channels/768759024270704641/831589248239009832/1320842067424972940)

- :speaking_head_in_silhouette: Why trying to use  `std::string` with "wonderful toolchain" and butano is a mess? / [2024.12.25](https://discord.com/channels/768759024270704641/831589248239009832/1321345763091021845)

- how max size is used?

- :beginner: [bn::string class | Butano Docs](https://gvaliente.github.io/butano/classbn_1_1string.html)
	- `std::string` like container with a fixed size buffer.

- _Storing a `bn::string` in rom seems a bit wasteful, when you can store a `bn::string_view` [GValiente](https://discord.com/channels/768759024270704641/831589248239009832/1277140156742242376)

### Butano exceptions

- :speaking_head_in_silhouette: `exception handling disabled, use '-fexceptions' to enable` - Any stong reason for this? Many third-part c++ libraries use exceptions. / [2025.01.01](https://discord.com/channels/768759024270704641/831589248239009832/1323747184407216170)
	- _Saves space and you can turn it back on. Exceptions are a much slower path than checking for conditions ahead of time and many you’ll encounter on an embedded system are not necessarily recoverable_ / Luigi
	- The safe (and naive) way would be compiling third-party libraries seperately with exceptions enabled, while compiling your code with exceptions disabled (edited). And link them afterwards. This way, if exceptions are passed to the user code side, `std::terminate()` should be called, which at least shows abort error screen on Butano / [yeon](https://discord.com/channels/768759024270704641/831589248239009832/1323879117644370061)

### C++ arrays

- :speech_balloon: [eclipse - c++ error: expected unqualified-id before '\[' token | SO](https://stackoverflow.com/questions/5575095/c-error-expected-unqualified-id-before-token)

### C++ using enum

- [magic\_enum](https://github.com/Neargye/magic_enum) by [Neargye](https://github.com/Neargye)
	- _Static reflection for enums (to string, from string, iteration) for modern C++, work with any enum type without any macro or boilerplate code_

- :newspaper: [String enum — строковые enum | Хабр](https://habr.com/ru/articles/236403/)

- :beginner: [C++ | Перечисления](https://metanit.com/cpp/tutorial/5.9.php)

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

### C++ attributes

- :speech_balloon: [c++ - Атрибут nodiscard - Stack Overflow на русском](https://ru.stackoverflow.com/questions/1251814/%D0%90%D1%82%D1%80%D0%B8%D0%B1%D1%83%D1%82-nodiscard)

### C++ circular deps

- :speech_balloon: [c++ - Resolve build errors due to circular dependency amongst classes | SO](https://stackoverflow.com/questions/625799/resolve-build-errors-due-to-circular-dependency-amongst-classes)
	- You can avoid compilation errors if you remove the method definitions from the header files and let the classes contain only the method declarations and variable declarations/definitions.
	- Best practice: forward declaration headers

### C++ code style

- my code style
	- class name: `MyClass`
	- method name: `my_method`
	- method param name: `importantParam1`

- from butano source?
	- method name: `set_show_always`
	- class field `free_items`
	- method params: `text_lines`
	- class name: `best_fit_allocator`
	- macro name: `BN_LOG`
	- macro const: `BN_CFG_BEST_FIT_ALLOCATOR_FREE_CHECK_ENABLED`
	- variable inside method: `int_destination`
	- template argument name: `MaxSize`

### C++ libs

- [hedley](https://github.com/nemequ/hedley) by [nemequ](https://github.com/nemequ)
	- _A C/C++ header to help move #ifdefs out of your code_