t# Daring Sailor: tasks

## See also

- [done tasks](./ds-done-tasks.md)
- [README](../README.md)

## Save game

- (and generated map)

### Serialize c++ structures

- [c-plus-plus-serializer](https://github.com/goblinhack/c-plus-plus-serializer?tab=readme-ov-file#user-defined-class-serialization) by [goblinhack](https://github.com/goblinhack)
	- _A minimal C++11 header only serializer. Can serialize basic types, strings, containers, maps and custom classes. No suppprt yet for pointer types._
	- [ ] I have simple probably genius idea: https://github.com/goblinhack/c-plus-plus-serializer + [custom class](https://github.com/goblinhack/c-plus-plus-serializer?tab=readme-ov-file#user-defined-class-serialization) with fields `std::map<string, int> ints`, `std::map<string, strings> strings` etc for each data type required by the game
	- [ ] Also  game version will be saved to `strings.version`  to apply migrations to savegame data.
	- [ ] Also `#define`s can be used to balance code readability, savegame binary readability and savegame size, for example `#define INTS_KEY_HEALTH 'h'`
- [palimpsest](https://github.com/stephane-caron/palimpsest) by [stephane-caron](https://github.com/stephane-caron)
	- _Fast serializable C++ dictionaries_
- [Zmeya](https://github.com/SergeyMakeev/Zmeya) by [SergeyMakeev](https://github.com/SergeyMakeev)
	- _Zmeya is a header-only C++11 binary serialization library designed for games and performance-critical applications_
- [Store multiple types in a single std::map in C++ with std::any, just like a python dict - Raymii.org](https://raymii.org/s/articles/Store_multiple_types_in_a_single_stdmap_in_cpp_just_like_a_python_dict.html)

### Common serialization standards

- :speech_balloon: [I was looking at MessagePack for communicating to and from my STM32F1-based micr... | Hacker News](https://news.ycombinator.com/item?id=22538710)

- [-] BSON
	- [bson-cxx](https://github.com/dwight/bson-cxx) by [dwight](https://github.com/dwight)
		- _C++ BSON Library_
		- [Explaining BSON With Examples | MongoDB](https://www.mongodb.com/resources/languages/bson)
			- :microbe: JSON data is slightly smaller in byte size. BSON data is slightly larger in byte size.

- MessagePack
	- [mpack](https://github.com/ludocode/mpack)
		- _Lightweight, suitable for embedded_

- [CBOR](https://cbor.io/) - _Concise Binary Object Representation_
	- No Schema needed
	- _CBOR was originally part of the MsgPack project, by the way, before its designer forked it and renamed it after himself_
	- :newspaper: [Understanding CBOR Encoded Data | dev.to](https://dev.to/mnelsonwhite/deserialising-cbor-encoded-data-in-net-5cgo)
	- :newspaper: [CBOR — новый бинарный формат представления данных | Хабр](https://habr.com/ru/articles/208690/)
	- :balloon: [CBOR/web (plain)](https://hildjj.github.io/node-cbor/example/index-plain.html)
	- :balloon: [CBOR playground](https://cbor.me/)
	- [cb0r](https://github.com/quartzjer/cb0r) by [quartzjer](https://github.com/quartzjer)
		- _Minimal Zero-Footprint CBOR Decoder in #C_
	- [simple\_cbor\_stream\_parse](https://github.com/vi/simple_cbor_stream_parse) by [vi](https://github.com/vi)
		- _Simple low-level streamed callback-based CBOR push parser in C and C++_
	- [cppbor](https://github.com/RantyDave/cppbor) by [RantyDave](https://github.com/RantyDave)
		- :scroll: [Implementations](https://cbor.io/impls.html)
		- _An implementation of cbor using C++ 17 variants_
		- _Being unit tested_
		- Omissions and shortcuts:
			- Maps can only use strings as keys.
			- 64 bit integers are not supported for either read or write.
			- Incoming floats can be of any width but will be coerced to a 32 bit float. Only 32 bit floats will be written.
			- Tagging is not supported (and ignored on ingestion).
		- [isode / cbor-lite — Bitbucket](https://bitbucket.org/isode/cbor-lite/src/master/)
		- [cborg](https://github.com/PelionIoT/cborg) by [PelionIoT](https://github.com/PelionIoT)
			- _Resistance is voltage divided by current._
			- :symbols: `Cbore& value(const uint8_t* unit, std::size_t length);`
			- :speaking_head_in_silhouette: [How to get keys of map? | issue #8 | cborg](https://github.com/PelionIoT/cborg/issues/8)
	- [platform/system/libcppbor - Git at Google](https://android.googlesource.com/platform/system/libcppbor/), 2024
		- [old libcppbor](https://github.com/google/libcppbor) by [google](https://github.com/google)

	- [cn-cbor](https://github.com/cabo/cn-cbor) by [cabo](https://github.com/cabo)
		- _A constrained node implementation of CBOR in C_
	- [QCBOR](https://github.com/laurencelundblade/QCBOR) by [laurencelundblade](https://github.com/laurencelundblade)
		- _Comprehensive, powerful, commercial-quality CBOR encoder/ decoder that is still suited for small devices._

- [isode / cbor-lite — Bitbucket](https://bitbucket.org/isode/cbor-lite/src/master/)

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

- :newspaper: [Different ways to instantiate an object in C++ with Examples - GeeksforGeeks](https://www.geeksforgeeks.org/different-ways-to-instantiate-an-object-in-c-with-examples/)
