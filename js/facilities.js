/* js/facilities.js
 * Loads and provides lookup/filter utilities for the Pinellas County
 * assisted living facility list (data/facilities.pinellas.json).
 * Exposed as window.FacilitiesLoader — no build step required.
 */
(function (global) {
  'use strict';

  var _facilities = null;
  var _loadPromise = null;

  /**
   * Fetch and cache the facility list.
   * Returns a Promise that resolves to the facilities array.
   */
  function load() {
    if (_loadPromise) return _loadPromise;
    _loadPromise = fetch('data/facilities.pinellas.json')
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (data) {
        _facilities = data.facilities || [];
        return _facilities;
      });
    return _loadPromise;
  }

  /** Return a facility object by its stable slug ID, or null if not found. */
  function getById(id) {
    if (!_facilities) return null;
    for (var i = 0; i < _facilities.length; i++) {
      if (_facilities[i].id === id) return _facilities[i];
    }
    return null;
  }

  /** Return all facilities whose zip matches the given string. */
  function getByZip(zip) {
    if (!_facilities) return [];
    return _facilities.filter(function (f) { return f.zip === zip; });
  }

  /** Return a sorted array of unique ZIP codes across all facilities. */
  function allZips() {
    if (!_facilities) return [];
    var seen = {};
    _facilities.forEach(function (f) { seen[f.zip] = true; });
    return Object.keys(seen).sort();
  }

  global.FacilitiesLoader = { load: load, getById: getById, getByZip: getByZip, allZips: allZips };
})(window);
