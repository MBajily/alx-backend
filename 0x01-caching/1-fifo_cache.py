#!/usr/bin/env python3
""" FIFOCache module
"""
BaseCaching = __import__('base_caching').BaseCaching


class FIFOCache(BaseCaching):
    """ FIFOCache defines:
      - Caching system that inherits from BaseCaching
      - First In First Out caching system
    """

    def __init__(self):
        """ Initialize FIFOCache
        """
        super().__init__()
        self.queue = []

    def put(self, key, item):
        """ Add an item in the cache
        """
        if key is not None and item is not None:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                if key not in self.cache_data:
                    oldest_key = self.queue.pop(0)
                    del self.cache_data[oldest_key]
                    print(f"DISCARD: {oldest_key}")

            if key not in self.cache_data:
                self.queue.append(key)
            self.cache_data[key] = item

    def get(self, key):
        """ Get an item by key
        """
        if key is not None:
            return self.cache_data.get(key)
        return None
