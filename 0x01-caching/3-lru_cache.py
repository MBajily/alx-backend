#!/usr/bin/env python3
""" LRUCache module
"""
BaseCaching = __import__('base_caching').BaseCaching


class LRUCache(BaseCaching):
    """ LRUCache defines:
      - Caching system that inherits from BaseCaching
      - Least Recently Used caching system
    """

    def __init__(self):
        """ Initialize LRUCache
        """
        super().__init__()
        self.usage_order = []

    def put(self, key, item):
        """ Add an item in the cache
        """
        if key is not None and item is not None:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                if key not in self.cache_data:
                    lru_key = self.usage_order.pop(0)
                    del self.cache_data[lru_key]
                    print(f"DISCARD: {lru_key}")

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
