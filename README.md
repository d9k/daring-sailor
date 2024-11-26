# Daring sailor

- Project stage: planning, [following GBA tutorials](https://github.com/d9k/d9k-gamedev-examples/tree/main/gba/cpp-butano)

## See also

- [tasks](./doc/ds-tasks.md)
- [done tasks](./doc/ds-done-tasks.md)

## Description

Game about sailor merchant.

## #similar to:

- Faster Than Light: events
- Legend of Zelda: Minish Cap, Ragnarok Online: graphics look
- Skyrim: fast travel
+ Animal Crossing + A Short Hike: speaking, quests, inventory

## Features

- characters
	- farmer, blacksmith, monk, pirate leader
- [ ] procedurally generated global islands map & local maps
	- [ ] perlin noice?
- tools
- [ ] upgrades: speed, durability
- [ ] items
	- [ ] treasure maps, shovels
- [ ] localStorage?
- [ ] random events: pirates, food, poison
- [ ] pirate fight
	- arcade
	- dodging, selecting & throwing items at them
		- different items have different effects
		- item has durability, it loses 0-2 on throw
	- auto-target (with select another target button)
	- enemies
		- health bars
		- different abilities
- [ ] collectables
- [ ] possessions: cart, ship

## Map

- size
	- `128*128*4/8/1024=8 kb` map
	- `x2` side map (`256` cells) => `x4` size => `32kb` map
	- 8x8 tiles per map cell
	- 16px tile
	- GBA screen 160x128 = 10x8 tiles
	- 256x8=2048 tiles map side
	- move speed: 2 tiles/s
	- `2048/2=1024` seconds
	- `1024` seconds `/ 60 = 17` minutes from side to side

- ground tiles:
	- 0 - deep water
	- 1 - water
	- 2 - sand
	- 3 - swamp
	- 4 - grass
	- 5 - forest
	- 6 - wood
	- 7 - road/bridge (speed bonus)
	- 8 - hill
	- 9 - rocks
	- 16 => 2^4 => 4 bits

- buildings
	- port
	- monastery
	- military outpost
	- pirate bay?
	- blacksmith
	- herbalist

- map objects
	- mushrooms, herbals
	- rare herbals respawn randomly on map on pick up. one rare herbal per land type

- [ ] temples
	- [ ] blessing: missing word to Bible verse / Bible quiz

### Map generation

- (not stored, generated from random seed to save memory)

- +-2 tiles shift on cells vertices
- +-2 cell borders tiles shift

- random objects are from seed) trees, decorations)

- Also store random basis:

- horizontal: `[0..255] 1..255` random numbers (no zero)
- vertical: `256 1..255` random numbers
- random seed basis: `0..555000`?

- `random_seed_for_cell(x,y) = (random_seed_basis + random_seed_for_cell_addition(x, y) % max_seed`

- `random_seed_for_cell_addition(x, y) = random_seed_horizontal_multiplier[x] * random_seed_vertical_multiplier[y]`

- random seed for `[2, 1]` vertex: same as random seed for `[2, 1] `cell (as for cell at right and below of this vertex)

- `random seed for (x, y, x2, y2) border = (random_seed_basis + random_seed_vertical_multiplier[y] * random_seed_horizontal_multiplier[x]) % max_seed`

- road: drawn on 4-5 columns 4-5 rows of cell always (?)

## Random number generator

- is slow on gba and system time is not available on GBA, only on some cartridges
- ? array of shuffled integers 1..100 byte size integers
	- `= 100 * 8 / 1024 = < 1 kb`
- ? array of shifts 1..255 filled based on timing of first buttnons keypresses after game loaded
	- `= 100 * 8 / 1024 = < 1 kb`
	- timing is frame number. Button is multiplier
