t# Daring Sailor: tasks

## See also

- [done tasks](./ds-done-tasks.md)
- [README](../README.md)

## Save game

- (and generated map)

- I don't like the rigidness of plain C `struct`. You add one field and deserialization of existing savegame file is broken.

- :speaking_head_in_silhouette: I want to store not `{ value1, value2, value3 }` but `{ key1: value1, key2: value2, key3: value3  }` (types of values can be arbitrary, they must be handled manually on deserialization) / [d9k](https://discord.com/channels/768759024270704641/831589248239009832/1309704497001529464)

- [easy Serialization library ? : r/cpp](https://www.reddit.com/r/cpp/comments/p9ftmk/easy_serialization_library/)

-  [schemaless-benchmarks](https://github.com/ludocode/schemaless-benchmarks?tab=readme-ov-file) by [ludocode](https://github.com/ludocode)
	- _Benchmarks for Schemaless Data Serialization Libraries_

- Embedded Synonyms: MCU, Arduino, low memory

- :newspaper: [Store multiple types in a single std::map in C++ with std::any, just like a python dict - Raymii.org](https://raymii.org/s/articles/Store_multiple_types_in_a_single_stdmap_in_cpp_just_like_a_python_dict.html)

### Serialize c++ structures

#### :black_square_button: C++ 11 serializer

- [c-plus-plus-serializer](https://github.com/goblinhack/c-plus-plus-serializer?tab=readme-ov-file#user-defined-class-serialization) by [goblinhack](https://github.com/goblinhack)
	- _A minimal C++11 header only serializer. Can serialize basic types, strings, containers, maps and custom classes. No suppprt yet for pointer types._
	- [ ] I have simple probably genius idea: https://github.com/goblinhack/c-plus-plus-serializer + [custom class](https://github.com/goblinhack/c-plus-plus-serializer?tab=readme-ov-file#user-defined-class-serialization) with fields `std::map<string, int> ints`, `std::map<string, strings> strings` etc for each data type required by the game
		- [ ] Also  game version will be saved to `strings.version`  to apply migrations to savegame data.
		- [ ] Also `#define`s can be used to balance code readability, savegame binary readability and savegame size, for example `#define INTS_KEY_HEALTH 'h'`

#### :black_square_button: palimpsest

- [palimpsest](https://github.com/stephane-caron/palimpsest) by [stephane-caron](https://github.com/stephane-caron)

- Serialize to and deserialize from [MessagePack](https://msgpack.org/)
- _Fast serializable C++ dictionaries_
- can be used at runtime
- New type must be declared at :open_file_folder: `src/mpack/Writer.cpp`
- smth. like Redux store
- `sudo apt install libeigen3-dev libfmt-dev libspdlog-dev`
- :speaking_head_in_silhouette: [How to remove single item from Dictionary? | issue #10 | palimpsest](https://github.com/stephane-caron/palimpsest/issues/10)
	- Seems to be fixed at [TRUEPIC/cborg](https://github.com/TRUEPIC/cborg):
- serialize vector?
- need to cut out Eigen support
- need to add for every new type code in `include/palimpsest/{json,pack}/riter.h`

#### Others

- [-] [Zmeya](https://github.com/SergeyMakeev/Zmeya) by [SergeyMakeev](https://github.com/SergeyMakeev)
	- _Zmeya is a header-only C++11 binary serialization library designed for games and performance-critical applications_
	- Stores consequently in memory. Is not the case for GBC where some data goes to EWRAM
- Boost
	- [A practical guide to C++ serialization- CodeProject](https://www.codeproject.com/Articles/225988/A-practical-guide-to-Cplusplus-serialization)

### Common serialization schemaless standards

- :speech_balloon: [I was looking at MessagePack for communicating to and from my STM32F1-based micr... | Hacker News](https://news.ycombinator.com/item?id=22538710)

#### :no_entry_sign: BSON

- [bson-cxx](https://github.com/dwight/bson-cxx) by [dwight](https://github.com/dwight)
	- _C++ BSON Library_
	- [Explaining BSON With Examples | MongoDB](https://www.mongodb.com/resources/languages/bson)
		- :microbe: JSON data is slightly smaller in byte size. BSON data is slightly larger in byte size.
	- [ardubson](https://github.com/argandas/ardubson) by [argandas](https://github.com/argandas)
		- _Lightweight BSON Library for Arduino_

#### :black_square_button: MessagePack

- [mpack](https://github.com/ludocode/mpack)
	- _Lightweight, suitable for embedded_
- [msgpack-mcu](https://github.com/hasegaw/msgpack-mcu) by [hasegaw](https://github.com/hasegaw)
	- _MessagePack serializer for MCUs_

#### CBOR

- [CBOR](https://cbor.io/) - _Concise Binary Object Representation_

- :speech_balloon: [c++ - Converting `vector<char>` that contains cbor data to const char \* | SO](https://stackoverflow.com/questions/63027107/converting-vectorchar-that-contains-cbor-data-to-const-char)
- :newspaper: [SurrealDB | Understanding CBOR](https://surrealdb.com/blog/understanding-cbor)
- :scroll: [Implementations | CBOR](https://cbor.io/impls.html)
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
- [platform/system/libcppbor - Git at Google](https://android.googlesource.com/platform/system/libcppbor/)
	- :collision: still updated at 2024
	- :alembic: awesome test coverage
	- [old libcppbor](https://github.com/google/libcppbor) by [google](https://github.com/google)
- [cn-cbor](https://github.com/cabo/cn-cbor) by [cabo](https://github.com/cabo)
	- _A constrained node implementation of CBOR in C_
- [QCBOR](https://github.com/laurencelundblade/QCBOR) by [laurencelundblade](https://github.com/laurencelundblade)
	- _Comprehensive, powerful, commercial-quality CBOR encoder/ decoder that is still suited for small devices._
- [libcbor](https://github.com/PJK/libcbor) by [PJK](https://github.com/PJK)
	- _CBOR protocol implementation for #C_
	- byte strings
		- [Type 2 – Byte strings — libcbor 0.8.0 documentation](https://libcbor.readthedocs.io/en/v0.8.0/api/type_2.html)
- [isode / cbor-lite — Bitbucket](https://bitbucket.org/isode/cbor-lite/src/master/)
	- 2022

#### :no_entry_sign: YAML

- :sparkles: very human-readable
- :microbe: to verbose for small memory
- [Binary Data Language-Independent Type for YAML™ Version 1.1](https://yaml.org/type/binary.html)
	- just BASE64
		- [yEnc - Wikipedia](https://en.wikipedia.org/wiki/YEnc)
			- The yEnc homepage states that "_all major newsreaders have been extended to yEnc support_"
			- yEnc assumes that binary data mostly can be transmitted through Usenet and email. Therefore, 252 of the 256 possible bytes are passed through unencoded as a single byte. Only NUL, LF, CR, and = are escaped.

#### JSON

- :sparkles: very widespread
- :microbe: large size overhead
- :sparkles: human-readable
- encode binary string
	- :speech_balloon: [Binary Data in JSON String. Something better than Base64 | SO](https://stackoverflow.com/questions/1443158/binary-data-in-json-string-something-better-than-base64)
		- For download, you might be surprised how well base64 compresses under gzip (http://davidbcalhoun.com/2011/when-to-base64-encode-images-and-when-not-to)
		- [ ] multipart/form-data
		- Base91, Base93, Base122
		- Intel HEX
			- readability
	- [yEnc - Wikipedia](https://en.m.wikipedia.org/wiki/YEnc)
		- yEnc's overhead is often (if each byte value appears approximately with the same frequency on average) as little as 1–2%, (https://en.wikipedia.org/wiki/YEnc#cite_note-1) compared to 33–40% overhead for 6-bit encoding methods like uuencode (https://en.wikipedia.org/wiki/Uuencode) and Base64 (https://en.wikipedia.org/wiki/Base64).
		- [python3-yenc](https://github.com/oe-mirrors/python3-yenc) by [oe-mirrors](https://github.com/oe-mirrors)
		- [simple-yenc](https://github.com/eshaz/simple-yenc) by [eshaz](https://github.com/eshaz)
			- _Minimalist JavaScript binary string encoder / decoder with 1-2% overhead, compared to 33%-40% overhead for 6-bit encoding methods like Base64._
	- [smile-format-specification](https://github.com/FasterXML/smile-format-specification) by [FasterXML](https://github.com/FasterXML)
		- _is a binary data format that defines a binary equivalent of standard_
	- [ArduinoJson](https://github.com/bblanchon/ArduinoJson) by [bblanchon](https://github.com/bblanchon)
		- _📟 JSON library for Arduino and embedded C++. Simple and efficient._

#### :black_square_button: bitsery

- [bitsery](https://github.com/fraillt/bitsery) by [fraillt](https://github.com/fraillt)

- _Your binary serialization library_
- x3 faster then messagepack
- [Motivation](https://github.com/fraillt/bitsery/blob/master/doc/design/README.md)
	- I wanted serializer that is easy to use as [cereal](http://uscilab.github.io/cereal/), is cross-platform compatible, and has support for forward/backward compatibility like [flatbuffers](https://google.github.io/flatbuffers/), is safe to use with untrusted (malicious) data, and most importantly is fast and has a small binary footprint.
	- Furthermore, I wanted full serialization control and the ability to work on a bit level, so I can further reduce data size.

#### :black_square_button: binn

- [binn](https://github.com/liteserver/binn) by [liteserver](https://github.com/liteserver), #C

- _Binary Serialization_
- bytes array?
	- list of `BINN_INT8`
	- binn_list_int8
- simple

#### NoProto


- [10x Faster Than BSON: NoProto : r/rust](https://www.reddit.com/r/rust/comments/kdxenz/10x_faster_than_bson_noproto/)
- [NoProto](https://github.com/only-cliches/NoProto) by [only-cliches](https://github.com/only-cliches)
	- _Flexible, Fast & Compact Serialization with RPC_
	- NoProto combines the **performance** of compiled formats with the **flexibilty** of dynamic formats
	- NoProto is a **key-value database focused format**:
	- Schemas are dynamic at runtime, no compilation step

### Database/key-value store?

- [A Glimpse into the World of Embedded Database Feat. RocksDB | by Kartik Khare | Walmart Global Tech Blog | Medium](https://medium.com/walmartglobaltech/https-medium-com-kharekartik-rocksdb-and-embedded-databases-1a0f8e6ea74f)
- :newspaper: [Picking a Database for Embedded Systems | dev.to](https://dev.to/objectbox/embedded-databases-what-is-an-embedded-database-and-how-to-choose-one-27m8)
- :speech_balloon: [A Key Value Store for Embedded Devices ? - Any recommendations ? : r/embedded](https://www.reddit.com/r/embedded/comments/jo3wmz/a_key_value_store_for_embedded_devices_any/)

#### BerkleyDB

- :speech_balloon: [For anyone thinking Berkeley DB, because it has transactions and logging, is a g... | Hacker News](https://news.ycombinator.com/item?id=10150394)
	- Its tools are crap: it can't tell you how big a database is without traversing every single entry, they hold locks while writing to the terminal (meaning you can't pipe them into a pager without freezing the whole DB), and if one of them crashes (due to e.g. a dropped SSH connection) they'll bring down the whole DB due to stale locks.
	- [Berkeley DB - Wikipedia](https://en.m.wikipedia.org/wiki/Berkeley_DB)
		- embedded database software library for key/value data

#### SQLite

- :speech_balloon: [For anyone thinking Berkeley DB, because it has transactions and logging, is a g... | Hacker News](https://news.ycombinator.com/item?id=10150394)
	- And my sympathy to anyone who tries to run SQLite on this bad boy… combined with SQLite's shoddy track record interpreting any query more complicated than a key-value lookup, it would be a wonder if you're able to get any data in and out intact.
- :speech_balloon: [database - Sqlite on an embedded system | SO](https://stackoverflow.com/questions/178264/sqlite-on-an-embedded-system), 2008
	- _The smallest sqlite3 I came up with was 327 KBytes (for PowerPC), which was sufficient for the system so I stopped trying to make it smaller. This was the full sqlite3 CLI binary, the C APIs alone would have been somewhat smaller. I had set `SQLITE_OMIT_AUTHORIZATION`, `SQLITE_OMIT_EXPLAIN`, `SQLITE_OMIT_PROGRESS_CALLBACK`, and `SQLITE_OMIT_TCL_VARIABLE` to trim the size of the binary, and used `-Os`to get it to that size._
- [SQLite Library Footprint](https://www.sqlite.org/footprint.html)

#### Others

- [sophia](https://github.com/pmwkaa/sophia) by [pmwkaa](https://github.com/pmwkaa)
	- _Modern transactional key-value/row storage library._

- [ostore](https://github.com/woodsmc/ostore) by [woodsmc](https://github.com/woodsmc)
	- _Simple Object Storage_

- [RocksDB | A persistent key-value store | RocksDB](https://rocksdb.org/)

### Common standarts with schema?

- FlatBuffers?
	- [FlatBuffers: Tutorial](https://flatbuffers.dev/flatbuffers_guide_tutorial.html)

- Protocol Buffers?
	- [nanopb](https://github.com/nanopb/nanopb) by [nanopb](https://github.com/nanopb)
		- _Protocol Buffers with small code size_

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

- :speech_balloon: [performance - Fastest C++ map? | SO](https://stackoverflow.com/questions/3198112/fastest-c-map)

- :newspaper: [String enum — строковые enum | Хабр](https://habr.com/ru/articles/236403/)