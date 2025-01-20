# Daring sailor: tasks: done

## See also

- [tasks](./ds-tasks.md)
- [README](../README.md)


## :white_check_mark: Demo: Savegame JSON: GUI

- [gba/cpp-butano/savegame-json | d9k-gamedev-examples](https://github.com/d9k/d9k-gamedev-examples/tree/main/gba/cpp-butano/savegame-json) by [d9k-gamedev-examples](https://github.com/d9k-gamedev-examples)
- 128/16 = 8 rows

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

- [x] array last member is skipped if no log!
	- (Σ) members must be initialized manually, there was `false`/`true` randomly
		- :speech_balloon: [constructor - C++ Why the members are not default initialized? | SO](https://stackoverflow.com/questions/66646883/c-why-the-members-are-not-default-initialized)
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


## :white_check_mark: Fast pseudo-random number generator

- (Σ) [pseudo-random | d9k-gamedev-examples](https://github.com/d9k/d9k-gamedev-examples/tree/main/gba/cpp-butano/pseudo-random)

### :white_check_mark: PRN generator

- (Σ) `prn256::Generator`

- max int?
	- [Tonc: Fixed-Point Numbers and LUTs](https://www.coranac.com/tonc/text/fixed.htm)

- [x] text sprite regenerate
	- :open_file_folder: `butano/src/bn_sprite_text_generator.cpp`
	- [Examples | Butano Docs](https://gvaliente.github.io/butano/examples.html)
		- [x] Core example: CPU usage
		- [x] Timers example: Ticks

- :speech_balloon: [c++ - How to declare constexpr extern? | SO](https://stackoverflow.com/questions/30208685/how-to-declare-constexpr-extern)

- [x] convert num to binary
	- :speech_balloon: [c++ - How to print (using cout) a number in binary form? | SO](https://stackoverflow.com/questions/7349689/how-to-print-using-cout-a-number-in-binary-form)
	- [x] :speaking_head_in_silhouette: How to convert `int` to `bn::bitset` and back? `bitset` constructor doesn't accept `int` /[d9k](https://discord.com/channels/768759024270704641/831589248239009832/1309509987432796333)
		- (Σ) used `std::bitset`
		- `bitset.set(i, num & (1 << i));`
		- _Maybe bitset_ref is faster: [https://gvaliente.github.io/butano/classbn_1_1bitset__ref.html](https://gvaliente.github.io/butano/classbn_1_1bitset__ref.html "https://gvaliente.github.io/butano/classbn_1_1bitset__ref.html")_
		- _You could try to seach for bit get and set macros online_
			- :newspaper: [C/C++ Macro & Bit Operations | Codementor](https://www.codementor.io/@hbendali/c-c-macro-bit-operations-ztrat0et6)
			- :newspaper: [Macros for Bit Manipulation in C/C++ - Aticleworld](https://aticleworld.com/macros-for-bit-manipulation-c-cpp/)

- [-] extern structure
	- :speech_balloon: [usage of extern with struct](https://forum.microchip.com/s/topic/a5C3l000000LwyHEAS/t218417)
		- Put the definition of the structure in a header file
	- :speech_balloon: [c - typedef struct vs struct definitions | SO](https://stackoverflow.com/questions/1675351/typedef-struct-vs-struct-definitions)

- [x] [`std::bitset<N>::bitset` - cppreference.com](https://en.cppreference.com/w/cpp/utility/bitset/bitset)
- [x] forward declare array in header file
	- :speech_balloon: [c++ - Is it possible to forward declare a static array | SO](https://stackoverflow.com/questions/936446/is-it-possible-to-forward-declare-a-static-array)

- [x] pass array by reference
	- (Σ) arrays are always passed by ref
	- :speech_balloon: [Passing an array of structs by reference in C++ | SO](https://stackoverflow.com/questions/8798448/passing-an-array-of-structs-by-reference-in-c)
		- It's actually impossible to pass an array by value, unless it is a sub-object of another object.
		- Arrays are represented and passed as pointers, so you are not copying anything here. In contrast, if you were passing a _single_ `struct`, it would be passed by value.
			- `void passByRef (GoldenHelmet & ofMambrino) {`
			- `GoldenHelmet h; passByVal(h);`
	- [Are array members deeply copied? - GeeksforGeeks](https://www.geeksforgeeks.org/are-array-members-deeply-copied/)
		- the array members are not shallow copied, compiler automatically performs [Deep Copy](http://en.wikipedia.org/wiki/Object_copy#Deep_copy) for array members.

- [x] `*`, `&` differences
	- (Σ) use `&` when `null` not needed. `&` forces passing value by reference
	- :speech_balloon: [C++ functions: ampersand vs asterisk | SO](https://stackoverflow.com/questions/670101/c-functions-ampersand-vs-asterisk)
		- pointers (ie. the `*`) should be used where the passing `NULL` is meaningful.
		- when passing by reference, you can't change the reference to refer to another value. Once the reference is set, it can't be changed.

- :speech_balloon: [c++ - Expression must be Modifiable lvalue (char array) | SO](https://stackoverflow.com/questions/37016819/expression-must-be-modifiable-lvalue-char-array)

- :speech_balloon: [c++ - Why can't I make a vector of references? | SO](https://stackoverflow.com/questions/922360/why-cant-i-make-a-vector-of-references)

### :dart: PRN generator plan

prn - pseudo-random numbers

random num seed:

`init_pos`: 8 bit `0..255` initial array position
delta_multiplier: 7 bit `0..127` next position shift delta multiplier

`2^7*2^8=2^15=32768`

seed `0..32767`

alternating bits : even - start pos. uneven - delta multiplier
..or at first lower bits as delta multiplier

1st random number:

delta must be uneven

```
delta = 1 + delta_multiplier*2
delta_min: 1
delta_max: 1+127*2 =1+254=255
```

### :white_check_mark: Build pre-defined pseudo-random numbers array
- (Σ) :zap: `make generate-pseudo-random-array`

- array generator

- env variables are better?

- gcc
	- min number, max number, repeat times
	- parsing CLI args
		- :speech_balloon: [Parsing Command Line Arguments in C++? | SO](https://stackoverflow.com/questions/865668/parsing-command-line-arguments-in-c)
		- tclap
			- _I've used getopt, google's gflags, program_options from Boost and tclap is fantastic_ / [Sean](https://stackoverflow.com/a/12082352/1760643)
			- [tclap -- Templatized C++ Command Line Parser Library (v1.4)](https://tclap.sourceforge.net/)
			- sophisticated
		- Boost
			- [Chapter 29. Boost.Program\_options - 1.86.0](https://www.boost.org/doc/libs/1_86_0/doc/html/program_options.html)
		- AnyOption
			- [demo.cpp](https://github.com/hackorama/AnyOption/blob/master/demo.cpp)
			- doesn't generate help
		- GNU getopt
			- [Example of Getopt (The GNU C Library)](https://www.gnu.org/software/libc/manual/html_node/Example-of-Getopt.html)
			- [www.ПЕРВЫЕ ШАГИ.ru :: Шаг 10 - Передача опций в программу - getopt](https://firststeps.ru/linux/r.php?10)
		- glags
			- [How To Use Gflags (formerly Google Commandline Flags)](https://gflags.github.io/gflags/)
		- ezOptionParser
			- :fallen_leaf: 2014
			- [ezoptionparser.sourceforge.net](https://ezoptionparser.sourceforge.net/)
			- is another command-line parser class for C++ that has features not available in alternative solutions (getopt, boost, argtable, argstream, gflags) and doesn't require a steep learning curve.
		- Qt

- :speech_balloon: [c - How to compile and run in one line on linux terminal? | SO](https://stackoverflow.com/questions/41860377/how-to-compile-and-run-in-one-line-on-linux-terminal)
	- `gcc main.c -o main && ./main`

- C++ delete item from array
	- :beginner: [How to Remove an Element from Array in C++? - GeeksforGeeks](https://www.geeksforgeeks.org/how-to-remove-an-element-from-array-in-cpp/)
	- :speech_balloon: [c++ - Remove an array element and shift the remaining ones | SO](https://stackoverflow.com/questions/879603/remove-an-array-element-and-shift-the-remaining-ones)

- C++ random numbers
	- :speech_balloon: [How to generate a random number in C++? | SO](https://stackoverflow.com/questions/13445688/how-to-generate-a-random-number-in-c)

## :white_check_mark: Demo: pixel edit

- (Σ) [sprite-edit-pixels](https://github.com/d9k/d9k-gamedev-examples/tree/main/gba/cpp-butano/sprite-edit-pixels)

- [x] _I wonder why is it filled in checker pattern? (only top-left and bottom-right qadrants are filled)_
	- (Σ) fixed with introduction `x_in_tile`, `y_in_tile`

## :white_check_mark: Demo: project init

- (Σ) [sprites-example-copy | d9k-gamedev-examples](https://github.com/d9k/d9k-gamedev-examples/tree/main/gba/cpp-butano/sprites-example-copy)

- [-] [gba-butano-starter-template](https://github.com/quentin-dev/gba-butano-starter-template/tree/acceptance) by [quentin-dev](https://github.com/quentin-dev)
	- `LIBBUTANO   :=  ./vendor/butano/butano`
		- [ ] synmlnk `butano/` to `vendor/`

- VS Code: include file not found
	- :speech_balloon: [c - VS code: include file not found in browse. path.? | SO](https://stackoverflow.com/questions/45640471/vs-code-include-file-not-found-in-browse-path)