# Daring sailor: tasks: done

## See also

- [tasks](./ds-tasks.md)
- [README](../README.md)

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