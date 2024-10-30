#!/usr/bin/env python3
""" LIFOCache module
"""
BaseCaching = __import__('base_caching').BaseCaching


class LIFOCache(BaseCaching):
    """ LIFOCache defines:
      - Caching system that inherits from BaseCaching
      - Last In First Out caching system
    """

    def __init__(self):
        """ Initialize LIFOCache
        """
        super().__init__()
        self.stack = []

    def put(self, key, item):
        """ Add an item in the cache
        """
        if key is not None and item is not None:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                if key not in self.cache_data:
                    last_key = self.stack.pop()
                    del self.cache_data[last_key]
                    print(f"DISCARD: {last_key}")

            if key in self.cache_data:
                self.stack.remove(key)
            self.stack.append(key)
            self.cache_data[key] = item

    def get(self, key):
        """ Get an item by key
        """
        if key is not None:
            return self.cache_data.get(key)
        return None
