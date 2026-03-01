/* js/demoStore.js
 * Demo-only store for facility stats and session requests.
 * Uses localStorage so data persists across page loads within the same browser.
 * Exposed as window.DemoStore — no build step required.
 */
(function (global) {
  'use strict';

  var STATS_KEY    = 'sc_facility_stats';
  var REQUESTS_KEY = 'sc_session_requests';

  function _readJSON(key) {
    try { return JSON.parse(localStorage.getItem(key)) || {}; } catch (e) { return {}; }
  }

  function _readArray(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; } catch (e) { return []; }
  }

  function _write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage unavailable */ }
  }

  /**
   * Return stats for a facility: { familiesServedCount, sessionsCompletedCount }
   * Defaults to zero counts if no data exists yet.
   */
  function getFacilityStats(facilityId) {
    var stats = _readJSON(STATS_KEY);
    return stats[facilityId] || { familiesServedCount: 0, sessionsCompletedCount: 0 };
  }

  /**
   * Increment the familiesServedCount for a facility when a new session is requested.
   */
  function incrementFacilityRequest(facilityId) {
    var stats = _readJSON(STATS_KEY);
    if (!stats[facilityId]) {
      stats[facilityId] = { familiesServedCount: 0, sessionsCompletedCount: 0 };
    }
    stats[facilityId].familiesServedCount += 1;
    _write(STATS_KEY, stats);
  }

  /**
   * Persist a session request object (for future admin review).
   * A submittedAt ISO timestamp is added automatically.
   */
  function saveSessionRequest(request) {
    var requests = _readArray(REQUESTS_KEY);
    var entry = {};
    for (var k in request) { if (Object.prototype.hasOwnProperty.call(request, k)) entry[k] = request[k]; }
    entry.submittedAt = new Date().toISOString();
    requests.push(entry);
    _write(REQUESTS_KEY, requests);
  }

  /** Return all stored session requests. */
  function getSessionRequests() {
    return _readArray(REQUESTS_KEY);
  }

  global.DemoStore = {
    getFacilityStats:        getFacilityStats,
    incrementFacilityRequest: incrementFacilityRequest,
    saveSessionRequest:      saveSessionRequest,
    getSessionRequests:      getSessionRequests
  };
})(window);
