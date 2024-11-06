# Daring sailor

- Project stage: planning

## Description

Game about sailor merchant.

## #similar too

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
- [ ] temples
	- [ ] blessing: missing word to Bible verse / Bible quiz
- [ ] collectables
- [ ] possessions: cart, shi
	- 5 - forest
	- 6 - wood
	- 7 - road/bridge (speed bonus)
	- 8 - hill
	- 9 - rocks

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


## Random number generator

- is slow on gba and system time is not available on GBA, only on some cartridges
- ? array of shuffled integers 1..100 byte size integers
	- `= 100 * 8 / 1024 = < 1 kb`
- ? array of shifts 1..255 filled based on timing of first buttnons keypresses after game loaded
	- `= 100 * 8 / 1024 = < 1 kb`
	- timing is frame number. Button is multiplier
