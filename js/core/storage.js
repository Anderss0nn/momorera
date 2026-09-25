const Storage = {
  load(key, fallback) {
    try {
      const data = localStorage.getItem(`mt_${key}`);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  },
  save(key, val) {
    try {
      localStorage.setItem(`mt_${key}`, JSON.stringify(val));
    } catch (e) {
      console.warn("Storage quota exceeded", e);
    }
  }
};