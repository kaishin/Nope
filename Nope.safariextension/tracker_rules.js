var analyticsRules = [
{"trigger": {"url-filter": "analytics\\.yahoo\\.com", "resource-type": ["image", "style-sheet", "script", "font", "raw", "svg-document", "media", "popup"], "load-type": ["third-party"]}, "action": {"type": "block"}},
{"trigger": {"url-filter": "data\\.gosquared\\.com", "resource-type": ["image", "style-sheet", "script", "font", "raw", "svg-document", "media", "popup"], "load-type": ["third-party"]}, "action": {"type": "block"}},
{"trigger": {"url-filter": "getclicky\\.com", "resource-type": ["image", "style-sheet", "script", "font", "raw", "svg-document", "media", "popup"], "load-type": ["third-party"]}, "action": {"type": "block"}},
{"trigger": {"url-filter": "google-analytics\\.com", "resource-type": ["image", "style-sheet", "script", "font", "raw", "svg-document", "media", "popup"], "load-type": ["third-party"]}, "action": {"type": "block"}},
{"trigger": {"url-filter": "heapanalytics\\.com", "resource-type": ["image", "style-sheet", "script", "font", "raw", "svg-document", "media", "popup"], "load-type": ["third-party"]}, "action": {"type": "block"}},
{"trigger": {"url-filter": "hs-analytics\\.net", "resource-type": ["image", "style-sheet", "script", "font", "raw", "svg-document", "media", "popup"], "load-type": ["third-party"]}, "action": {"type": "block"}},
{"trigger": {"url-filter": "segment-analytics\\.com", "resource-type": ["image", "style-sheet", "script", "font", "raw", "svg-document", "media", "popup"], "load-type": ["third-party"]}, "action": {"type": "block"}},
{"trigger": {"url-filter": "segment\\.com", "resource-type": ["image", "style-sheet", "script", "font", "raw", "svg-document", "media", "popup"], "load-type": ["third-party"]}, "action": {"type": "block"}},
{"trigger": {"url-filter": "segment\\.io", "resource-type": ["image", "style-sheet", "script", "font", "raw", "svg-document", "media", "popup"], "load-type": ["third-party"]}, "action": {"type": "block"}},
];

var trackerRules = analyticsRules;

