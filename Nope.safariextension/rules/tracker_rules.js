var analyticsRules = [
{"trigger": {"url-filter": "https?://analytics\\.yahoo\\.com", "resource-type": ["image", "style-sheet", "script", "font", "raw", "svg-document", "media", "popup"], "load-type": ["third-party"]}, "action": {"type": "block"}},
{"trigger": {"url-filter": "https?://data\\.gosquared\\.com", "resource-type": ["image", "style-sheet", "script", "font", "raw", "svg-document", "media", "popup"], "load-type": ["third-party"]}, "action": {"type": "block"}},
{"trigger": {"url-filter": "https?://getclicky\\.com", "resource-type": ["image", "style-sheet", "script", "font", "raw", "svg-document", "media", "popup"], "load-type": ["third-party"]}, "action": {"type": "block"}},
{"trigger": {"url-filter": "https?://google-analytics\\.com", "resource-type": ["image", "style-sheet", "script", "font", "raw", "svg-document", "media", "popup"], "load-type": ["third-party"]}, "action": {"type": "block"}},
{"trigger": {"url-filter": "https?://heapanalytics\\.com", "resource-type": ["image", "style-sheet", "script", "font", "raw", "svg-document", "media", "popup"], "load-type": ["third-party"]}, "action": {"type": "block"}},
{"trigger": {"url-filter": "https?://hs-analytics\\.net", "resource-type": ["image", "style-sheet", "script", "font", "raw", "svg-document", "media", "popup"], "load-type": ["third-party"]}, "action": {"type": "block"}},
{"trigger": {"url-filter": "https?://lytics\\.io", "resource-type": ["image", "style-sheet", "script", "font", "raw", "svg-document", "media", "popup"], "load-type": ["third-party"]}, "action": {"type": "block"}},
{"trigger": {"url-filter": "https?://segment-analytics\\.com", "resource-type": ["image", "style-sheet", "script", "font", "raw", "svg-document", "media", "popup"], "load-type": ["third-party"]}, "action": {"type": "block"}},
{"trigger": {"url-filter": "https?://segment\\.com", "resource-type": ["image", "style-sheet", "script", "font", "raw", "svg-document", "media", "popup"], "load-type": ["third-party"]}, "action": {"type": "block"}},
{"trigger": {"url-filter": "https?://segment\\.io", "resource-type": ["image", "style-sheet", "script", "font", "raw", "svg-document", "media", "popup"], "load-type": ["third-party"]}, "action": {"type": "block"}},
];

var trackerRules = analyticsRules;

