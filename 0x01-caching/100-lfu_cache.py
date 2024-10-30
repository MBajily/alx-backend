#!/usr/bin/env python3
""" LFUCache module
"""
BaseCaching = __import__('base_caching').BaseCaching


class LFUCache(BaseCaching):
    """ LFUCache defines:
      - Caching system that inherits from BaseCaching
      - Least Frequently Used caching system
    """

    def __init__(self):
        """ Initialize LFUCache
        """
        super().__init__()
        self.frequency = {}
        self.usage_order = []

    def put(self, key, item):
        """ Add an item in the cache
        """
        if key is not None and item is not None:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                if key not in self.cache_data:
                    # Find minimum frequency
                    min_freq = min(self.frequency.values())
                    # Get all keys with minimum frequency
                    min_freq_keys = []
                    for k, v in self.frequency.items():
                        if v == min_freq:
                            min_freq_keys.append(k)

                    if len(min_freq_keys) == 1:
                        discard_key = min_freq_keys[0]
                    else:
                        # If multiple items have same frequency, use LRU
                        for k in self.usage_order:
                            if k in min_freq_keys:
                                discard_key = k
                                break

                    del self.cache_data[discard_key]
                    del self.frequency[discard_key]
                    self.usage_order.remove(discard_key)
                    print(f"DISCARD: {discard_key}")

            self.cache_data[key] = item
            self.frequency[key] = self.frequency.get(key, 0) + 1

            if key in self.usage_order:
                self.usage_order.remove(key)
            self.usage_order.append(key)

    def get(self, key):
        """ Get an item by key
        """
        if key is not None and key in self.cache_data:
            self.frequency[key] = self.frequency.get(key, 0) + 1
            self.usage_order.remove(key)
            self.usage_order.append(key)
            return self.cache_data[key]
        return None
