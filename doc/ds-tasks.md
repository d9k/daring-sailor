# Daring Sailor: tasks

## See also

- [done tasks](./ds-done-tasks.md)
- [README](../README.md)

## Generate map

- vector
	- :open_file_folder: `butano/include/bn_vector.h`
		- `erase(const_iterator position)`
			- _Erases an element_


## :black_square_button: Fast pseudo-random number generator

### :black_square_button: PRN generator

- max int?
	- [Tonc: Fixed-Point Numbers and LUTs](https://www.coranac.com/tonc/text/fixed.htm)

- text sprite regenerate
	- :open_file_folder: `butano/src/bn_sprite_text_generator.cpp`
	- [Examples | Butano Docs](https://gvaliente.github.io/butano/examples.html)
		- Core example: CPU usage
		- Timers example: Ticks

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

### :black_square_button: Build pre-defined pseudo-random numbers array

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