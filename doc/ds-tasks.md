t# Daring Sailor: tasks

## See also

- [done tasks](./ds-done-tasks.md)
- [README](../README.md)

## Save game

- (and generated map)

### Choosing #save_game format

- :point_right: [[serialize-data-for-embedded]] [(weblink)](https://github.com/d9k/d9k-public-notes/blob/main/pr-data/serialize-data-for-embedded.md)

### Compress savegame

- to fit in 32kb SRAM

- :speech_balloon: [Lightweight (de)compression algorithm for embedded use | SO](https://stackoverflow.com/questions/45900206/lightweight-decompression-algorithm-for-embedded-use)

- :newspaper: :thumbsup: [JSON Compression: Alternative Binary Formats and Compression Methods | Lucid](https://lucid.co/techblog/2019/12/06/json-compression-alternative-binary-formats-and-compression-methods)

- [zlib\_turbo](https://github.com/bitbank2/zlib_turbo) by [bitbank2](https://github.com/bitbank2)
	- _Optimized zlib inflate (+gzip) library for embedded_
- [Romhacking.net - Utilities - Nintendo DS/GBA Compressors](https://www.romhacking.net/utilities/826/)

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

- [Huffman coding - Wikipedia](https://en.wikipedia.org/wiki/Huffman_coding)
	- :speech_balloon: [compression - Why to combine Huffman and lz77? | SO](https://stackoverflow.com/questions/55547113/why-to-combine-huffman-and-lz77)
		- :speech_balloon: [asp.net - What is the advantage of GZIP vs DEFLATE compression? | SO](https://stackoverflow.com/questions/7243705/what-is-the-advantage-of-gzip-vs-deflate-compression)

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