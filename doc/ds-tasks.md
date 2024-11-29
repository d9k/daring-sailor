t# Daring Sailor: tasks

## See also

- [done tasks](./ds-done-tasks.md)
- [README](../README.md)


## :black_square_button: Demo with compression

- include resources file
	- :speech_balloon: ["#include" a text file in a C program as a char\[\] | SO](https://stackoverflow.com/questions/410980/include-a-text-file-in-a-c-program-as-a-char/25021520#25021520)
	- :speech_balloon: [c++ - Include a file as a string | SO](https://stackoverflow.com/questions/43256465/include-a-file-as-a-string)

- huffman alone may be enough for JSON compression

### :black_square_button: Generate 64 kb JSON

- :beginner: [Unique Values | Faker.js](https://fakerjs.dev/guide/unique)

- [faker-cxx](https://github.com/cieslarmichal/faker-cxx) by [cieslarmichal](https://github.com/cieslarmichal)
	- #Cpp _faker library for generating fake (but realistic) data_
	 - Compiler support
		- :microbe: GCC➚ version `12` or newer
			- having `11.4`
			- :speech_balloon: [add gcc 11 support | issue #596 | faker-cxx](https://github.com/cieslarmichal/faker-cxx/issues/596)

- [JSON Generator – tool for generating random JSON data](https://app.json-generator.com/signin)

## Save game

- (and generated map)

### Choosing #save_game format

- :point_right: [[serialize-data-for-embedded]] [(weblink)](https://github.com/d9k/d9k-public-notes/blob/main/pr-data/serialize-data-for-embedded.md)

### Compress savegame

- to fit in 32kb SRAM

- :speech_balloon: [Lightweight (de)compression algorithm for embedded use | SO](https://stackoverflow.com/questions/45900206/lightweight-decompression-algorithm-for-embedded-use)

- :newspaper: :thumbsup: [JSON Compression: Alternative Binary Formats and Compression Methods | Lucid](https://lucid.co/techblog/2019/12/06/json-compression-alternative-binary-formats-and-compression-methods)
	- _Compressing the serialized data seems to level-the-playing-field and ‘negates’ any wins by using the binary format._
	- _Our best bet is using JSON serialization and level 10 **Brotli** compression (its second highest setting). This represents an expected 16% cost savings over our baseline of JSON and gzip_
	- _For data with shorter lifespans, Zstandard (around level 9) offers much better compression than gzip but at roughly the same CPU cost._

#### Huffman coding

- [Huffman coding - Wikipedia](https://en.wikipedia.org/wiki/Huffman_coding)

- :speech_balloon: [java - Huffman Coding - Dealing with unicode | SO](https://stackoverflow.com/questions/13173223/huffman-coding-dealing-with-unicode)

- at `grit` code
	- [Fix Huffman encoding by WinterMute · Pull Request #8 · devkitPro/grit](https://github.com/devkitPro/grit/pull/8/files)
	- [-] [Huffman compression fixed thanks to gba-huff by GValiente · Pull Request #7 · devkitPro/grit](https://github.com/devkitPro/grit/pull/7)
		- Huffman compression is replaced with gba-huff (https://github.com/GValiente/gba-huff) compressor. The important part is that the input data is uniformly distributed. The huffman tree encoding breaks when one of the subtrees has more than 63 child nodes.
		- ...appears to fix #4 (https://github.com/devkitPro/grit/issues/4) for me. Seems that GBA requires the tree to occupy 0x200 bytes? NDS doesn't, so that'd be wasted space there.
	- [\*\_huff.cpp | grit src](https://github.com/devkitPro/grit/blob/master/libgrit/cprs_huff.cpp)

- [mp3/huffman.c at master · FrankBoesing/Arduino-Teensy-Codec-lib](https://github.com/FrankBoesing/Arduino-Teensy-Codec-lib/blob/master/mp3/huffman.c) by [Arduino-Teensy-Codec-lib](https://github.com/Arduino-Teensy-Codec-lib)

- [huffman\_compressor](https://github.com/shizde/huffman_compressor) by [shizde](https://github.com/shizde)
	- _Huffman Compression Method_
	- :symbols: [huffman\_compression.h](https://github.com/shizde/huffman_compressor/blob/main/huffman_compression.h)
	- :speech_balloon: [write\_huffman\_dictionary(): defined but not implemented | issue #1 | huffman\_compressor](https://github.com/shizde/huffman_compressor/issues/1)
	- :speaking_head_in_silhouette: [write\_huffman\_dictionary(): defined but not implemented | issue #1 | huffman\_compressor](https://github.com/shizde/huffman_compressor/issues/1)

#### Other compression algos

- [Romhacking.net - Utilities - Nintendo DS/GBA Compressors](https://www.romhacking.net/utilities/826/)

- :speech_balloon: [gzip - Which algorithm is used in standard ZIP? | SO](https://stackoverflow.com/questions/10214374/which-algorithm-is-used-in-standard-zip)

- :speech_balloon: [asp.net - What is the advantage of GZIP vs DEFLATE compression? | SO](https://stackoverflow.com/questions/7243705/what-is-the-advantage-of-gzip-vs-deflate-compression)
	- Gzip is the more reliable because it is deflate plus a few headers and a check sum. In other words gzip is deflate, and extra headers and check sum. Deflate is checked with adler32, which is also part of gzip. Because the gzip payload is a DEFLATE-compressed payload.
	- Deflate is very slightly faster because Adler-32 is typically faster to compute than CRC32, but the majority of the time is spent actually compressing data and not calculating the checksum.

- :speech_balloon: [compression - Why to combine Huffman and lz77? | SO](https://stackoverflow.com/questions/55547113/why-to-combine-huffman-and-lz77)
	- _I'm doing a reverse engineering in #GBA game, and I noticed that the originals developers wrote a code that has two system calls to uncompress a level using Huffman and lz77 (in this order). But why to use Huffman + lzZ7? Whats the advantage to this approach?_
	- Because these 2 algorithms detect and remove 2 different kinds of redundancy in common to many data files (video game levels, English and other natural-language text, etc.), and they can be combined to get better net compression than either one alone. (Unfortunately, most data compression algorithms cannot be combined like this).
	- The [DEFLATE](http://en.wikipedia.org/wiki/DEFLATE) algorithm uses both Huffman and LZ77. Is it possible that the developers are actually using DEFLATE, simply to be able to re-use tested and debugged software rather than writing something new from scratch
	- In English, the 2 most common letters are (usually) 'e' and then 't'. So what is the most common pair? You might guess "ee", "et", or "te" -- nope, it's "th".
	- In general, most data compression software is made up of these 2 parts. First they run the original data through a "[transformation](https://en.wikipedia.org/wiki/transform_coding)" or [multiple transformations](https://en.wikibooks.org/wiki/Data_Compression/Multiple_transformations), also called "decorrelators", typically highly tuned to the particular kind of redundancy in the particular kind of data being compressed.

- :speech_balloon: [javascript - When using the YUI compressor, should I combine then minify, or minify then combine? | SO](https://stackoverflow.com/questions/19746313/when-using-the-yui-compressor-should-i-combine-then-minify-or-minify-then-comb/19799494#19799494)

- :speech_balloon: [compression - Why to combine Huffman and lz77? | SO](https://stackoverflow.com/questions/55547113/why-to-combine-huffman-and-lz77)
- :speech_balloon: [asp.net - What is the advantage of GZIP vs DEFLATE compression? | SO](https://stackoverflow.com/questions/7243705/what-is-the-advantage-of-gzip-vs-deflate-compression)

LZ77 is good at detecting and compressing these kinds of common words and syllables.


In English, the 2 most common letters are (usually) 'e' and then 't'. So what is the most common pair? You might guess "ee", "et", or "te" -- nope, it's "th".

LZ77 is good at detecting and compressing these kinds of common words and syllables.

In general, most data compression software is made up of these 2 parts. First they run the original data through a "transformation (https://en.wikipedia.org/wiki/transform_coding)" or multiple transformations (https://en.wikibooks.org/wiki/Data_Compression/Multiple_transformations), also called "decorrelators", typically highly tuned to the particular kind of redundancy in the particular kind of data being compressed.

- [zlib\_turbo](https://github.com/bitbank2/zlib_turbo) by [bitbank2](https://github.com/bitbank2)
	- _Optimized zlib inflate (+gzip) library for embedded_

- [ ] [heatshrink](https://github.com/atomicobject/heatshrink) by [atomicobject](https://github.com/atomicobject)
	- _data compression library for embedded/real-time systems_

- [ ] [gzip-hpp](https://github.com/mapbox/gzip-hpp) by [mapbox](https://github.com/mapbox)
	- _Gzip header-only C++ library_

- [elz4](https://github.com/P-i-N/elz4) by [P-i-N](https://github.com/P-i-N)
	- _Embeddable LZ4 decompressor_

- [ECL](https://github.com/Nonoum/ECL) by [Nonoum](https://github.com/Nonoum)
	- _Embedded Compression Library for low-memory systems_

- [-] [quicklz](https://github.com/RT-Thread-packages/quicklz) by [RT-Thread-packages](https://github.com/RT-Thread-packages)
	- _the world's fastest compression library_
	- QuickLZ is known as the fastest compression library in the world, with a speed of 308 Mbyte/s per core, simple to use and easy to integrate.
	- :microbe: Need much memory:
		- _The memory space required for quicklz library compression is relatively large, and the device memory space is insufficient Solution: Modify the size of `QLZ_HASH_VALUES` under the current level in the `quicklz.h` file_

- [BIOS Functions | GBATEK - GBA/NDS Technical Info](https://problemkaputt.de/gbatek.htm#biosfunctions)
	- `vpk_decompress(src,dest)`
	- `load_huffman_tree()`
	- :open_file_folder: `butano/hw/3rd_party/libugba/include/ugba/bios.h`
		- `SWI_HuffUnComp()`
			- Decompresses Huffman-encoded data from the source and writes the result to the destination using 32-bit writes. VRAM can be used as destination.

- [JSONC](https://github.com/tcorral/JSONC) by [tcorral](https://github.com/tcorral)
	- _JSON compressor and decompressor_
	- Compress a JSON object as a Gzipped string
	- Optional compress with a map
	- not connected to JSONC format used by VS Code configs

- [Deflate - Wikipedia](https://en.m.wikipedia.org/wiki/Deflate)

- [brotli](https://github.com/google/brotli) by [google](https://github.com/google)
	- _Brotli compression format_
	- _is a generic-purpose lossless compression algorithm that compresses data using a combination of a modern variant of the LZ77 algorithm, Huffman coding and 2nd order context modeling, with a compression ratio comparable to the best currently available general-purpose compression methods. It is similar in speed with deflate but offers more dense compression_

- [zstd - Wikipedia](https://en.wikipedia.org/wiki/Zstd)
	- Zstandard (.zst) was designed to give a compression ratio comparable to that of the [DEFLATE](https://en.wikipedia.org/wiki/DEFLATE) algorithm (developed in 1991 and used in the original [ZIP](https://en.wikipedia.org/wiki/Zip_(file_format)) and [gzip](https://en.wikipedia.org/wiki/Gzip) programs), but faster, especially for decompression.
	- Compression speed can vary by a factor of 20 or more between the fastest and slowest levels, while decompression is uniformly fast, varying by less than 20% between the fastest and slowest levels.
	 - Zstandard reaches the current [Pareto frontier](https://en.wikipedia.org/wiki/Pareto_frontier), as it decompresses faster than any other currently available algorithm with similar or better compression ratio.
	- Zstandard combines a dictionary-matching stage ([LZ77](https://en.wikipedia.org/wiki/LZ77)) with a large search window and a fast [entropy-coding](https://en.wikipedia.org/wiki/Entropy_encoding) stage. It uses both [Huffman coding](https://en.wikipedia.org/wiki/Huffman_coding) (used for entries in the Literals section) and finite-state entropy (FSE) - a fast tabled version of ANS, [tANS](https://en.wikipedia.org/wiki/Asymmetric_numeral_systems#Tabled_variant_(tANS)), used for entries in the Sequences section.

- [bzip2 - Wikipedia](https://en.wikipedia.org/wiki/Bzip2)
	- bzip2 was initially released in 1996 by Julian Seward. It compresses most files more effectively than older [LZW](https://en.wikipedia.org/wiki/LZW) and [Deflate](https://en.wikipedia.org/wiki/Deflate) [compression algorithms](https://en.wikipedia.org/wiki/Compression_algorithms) but is slower. bzip2 is particularly efficient for text data, and decompression is relatively fast. The algorithm uses several layers of compression techniques, such as [run-length encoding](https://en.wikipedia.org/wiki/Run-length_encoding) (RLE), [Burrows–Wheeler transform](https://en.wikipedia.org/wiki/Burrows%E2%80%93Wheeler_transform) (BWT), [move-to-front transform](https://en.wikipedia.org/wiki/Move-to-front_transform) (MTF), and Huffman coding.
	- bzip2 is suitable for use in big data applications with cluster computing frameworks like Hadoop and Apache Spark, as a compressed block can be decompressed without having to process earlier blocks.
	- Zstandard was designed to give a compression ratio comparable to that of the [DEFLATE](https://en.wikipedia.org/wiki/DEFLATE) algorithm (developed in 1991 and used in the original [ZIP](https://en.wikipedia.org/wiki/Zip_(file_format)) and [gzip](https://en.wikipedia.org/wiki/Gzip) programs), but faster, especially for decompression.

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