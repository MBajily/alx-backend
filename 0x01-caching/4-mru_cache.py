#!/usr/bin/env python3
""" MRUCache module
"""
BaseCaching = __import__('base_caching').BaseCaching


class MRUCache(BaseCaching):
    """ MRUCache defines:
      - Caching system that inherits from BaseCaching
      - Most Recently Used caching system
    """

    def __init__(self):
        """ Initialize MRUCache
        """
        super().__init__()
        self.usage_order = []

    def put(self, key, item):
        """ Add an item in the cache
        """
        if key is not None and item is not None:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                if key not in self.cache_data:
                    mru_key = self.usage_order.pop()
                    del self.cache_data[mru_key]
                    print(f"DISCARD: {mru_key}")

            if key in self.usage_order:
                self.usage_order.remove(key)
            self.usage_order.append(key)
            self.cache_data[key] = item

    def get(self, key):
        """ Get an item by key
        """
        if key is not None and key in self.cache_data:
            self.usage_order.remove(key)
            self.usage_order.append(key)
            return self.cache_data[key]
        return None
