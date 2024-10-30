# Caching Project

## Overview
This project implements different caching systems/algorithms including Basic, FIFO (First-In-First-Out), LIFO (Last-In-First-Out), LRU (Least Recently Used), MRU (Most Recently Used), and LFU (Least Frequently Used) caching. Each implementation inherits from a base caching class and provides different strategies for cache replacement.

## Project Requirements
- Python 3.7
- Ubuntu 18.04 LTS
- pycodestyle 2.5

## Files
- `base_caching.py`: Base class for all caching systems
- `0-basic_cache.py`: Basic caching system
- `1-fifo_cache.py`: FIFO caching system
- `2-lifo_cache.py`: LIFO caching system
- `3-lru_cache.py`: LRU caching system
- `4-mru_cache.py`: MRU caching system
- `100-lfu_cache.py`: LFU caching system

## Class Descriptions

### BaseCaching
Base class that defines:
- Constants of the caching system
- Dictionary where cached data is stored
- Maximum number of items that can be stored (MAX_ITEMS = 4)

### BasicCache
- Inherits from BaseCaching
- Unlimited storage
- No cache replacement policies

### FIFOCache
- Inherits from BaseCaching
- Uses FIFO (First-In-First-Out) algorithm for cache replacement
- Discards the first item stored when cache is full

### LIFOCache
- Inherits from BaseCaching
- Uses LIFO (Last-In-First-Out) algorithm for cache replacement
- Discards the last item stored when cache is full

### LRUCache
- Inherits from BaseCaching
- Uses LRU (Least Recently Used) algorithm for cache replacement
- Discards the least recently used item when cache is full

### MRUCache
- Inherits from BaseCaching
- Uses MRU (Most Recently Used) algorithm for cache replacement
- Discards the most recently used item when cache is full

### LFUCache
- Inherits from BaseCaching
- Uses LFU (Least Frequently Used) algorithm for cache replacement
- If multiple items have the same frequency, uses LRU algorithm as a tiebreaker
- Discards the least frequently used item when cache is full

## Methods
Each caching class implements two main methods:

### put(self, key, item)
- Adds an item to the cache
- Args:
  - key: Key to identify the item
  - item: Value to store
- Returns: None
- Behavior:
  - If key or item is None, method does nothing
  - If cache is full, triggers appropriate replacement policy
  - Prints "DISCARD: {key}" when an item is discarded (except BasicCache)

### get(self, key)
- Retrieves an item from the cache
- Args:
  - key: Key to look up
- Returns:
  - Value associated with key if found
  - None if key is None or not found

## Usage Examples

### Basic Cache
```python
my_cache = BasicCache()
my_cache.put("A", "Hello")
my_cache.put("B", "World")
print(my_cache.get("A"))  # Output: Hello
print(my_cache.get("B"))  # Output: World
print(my_cache.get("C"))  # Output: None
```

### FIFO Cache
```python
my_cache = FIFOCache()
my_cache.put("A", "Hello")
my_cache.put("B", "World")
my_cache.put("C", "Holberton")
my_cache.put("D", "School")
my_cache.print_cache()
my_cache.put("E", "Battery")  # Will discard A
```

## Setup and Testing
1. Clone the repository:
```bash
git clone [repository-url]
```

2. Navigate to the project directory:
```bash
cd 0x01-caching
```

3. Run test files:
```bash
./0-main.py  # For testing BasicCache
./1-main.py  # For testing FIFOCache
./2-main.py  # For testing LIFOCache
./3-main.py  # For testing LRUCache
./4-main.py  # For testing MRUCache
./100-main.py  # For testing LFUCache
```

## Style Guide
- All files must conform to pycodestyle version 2.5
- All files must be executable
- All modules, classes, and functions must have documentation
- Documentation should be complete sentences explaining the purpose of the module, class, or method

## Author
Mohammed Elgaily
