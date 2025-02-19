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

## :black_square_button: Save game

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

## Raw coding ideas

- [ ] `BN_CONCAT` macro

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