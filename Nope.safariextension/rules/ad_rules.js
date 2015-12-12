var googleRules = [
{"trigger": {"url-filter": "https?://ads\\.youtube\\.com", "resource-type": ["image", "style-sheet", "script", "font", "raw", "svg-document", "media", "popup"], "load-type": ["third-party"]}, "action": {"type": "block"}},
{"trigger": {"url-filter": "https?://cse\\.google\\.com/adsense/", "resource-type": ["image", "style-sheet", "script", "font", "raw", "svg-document", "media", "popup"], "load-type": ["third-party"]}, "action": {"type": "block"}},
{"trigger": {"url-filter": "https?://feedads\\.googleadservices\\.com", "resource-type": ["image", "style-sheet", "script", "font", "raw", "svg-document", "media", "popup"], "load-type": ["third-party"]}, "action": {"type": "block"}},
{"trigger": {"url-filter": "https?://google\\.com/adsense/", "resource-type": ["image", "style-sheet", "script", "font", "raw", "svg-document", "media", "popup"], "load-type": ["third-party"]}, "action": {"type": "block"}},
{"trigger": {"url-filter": "https?://googleads\\.g\\.doubleclick\\.net", "resource-type": ["image", "style-sheet", "script", "font", "raw", "svg-document", "media", "popup"], "load-type": ["third-party"]}, "action": {"type": "block"}},
{"trigger": {"url-filter": "https?://googleadservices\\.com", "resource-type": ["image", "style-sheet", "script", "font", "raw", "svg-document", "media", "popup"], "load-type": ["third-party"]}, "action": {"type": "block"}},
{"trigger": {"url-filter": "https?://googlesyndication\\.com", "resource-type": ["image", "style-sheet", "script", "font", "raw", "svg-document", "media", "popup"], "load-type": ["third-party"]}, "action": {"type": "block"}},
{"trigger": {"url-filter": "https?://pagead1\\.googlesyndication\\.com", "resource-type": ["image", "style-sheet", "script", "font", "raw", "svg-document", "media", "popup"], "load-type": ["third-party"]}, "action": {"type": "block"}},
{"trigger": {"url-filter": "https?://pagead2\\.googleadservices\\.com", "resource-type": ["image", "style-sheet", "script", "font", "raw", "svg-document", "media", "popup"], "load-type": ["third-party"]}, "action": {"type": "block"}},
{"trigger": {"url-filter": "https?://pagead2\\.googlesyndication\\.com", "resource-type": ["image", "style-sheet", "script", "font", "raw", "svg-document", "media", "popup"], "load-type": ["third-party"]}, "action": {"type": "block"}},
{"trigger": {"url-filter": "https?://pagead3\\.googlesyndication\\.com", "resource-type": ["image", "style-sheet", "script", "font", "raw", "svg-document", "media", "popup"], "load-type": ["third-party"]}, "action": {"type": "block"}},
{"trigger": {"url-filter": "https?://pagead\\.googlesyndication\\.com", "resource-type": ["image", "style-sheet", "script", "font", "raw", "svg-document", "media", "popup"], "load-type": ["third-party"]}, "action": {"type": "block"}},
{"trigger": {"url-filter": "https?://pagead\\.l\\.google\\.com", "resource-type": ["image", "style-sheet", "script", "font", "raw", "svg-document", "media", "popup"], "load-type": ["third-party"]}, "action": {"type": "block"}},
{"trigger": {"url-filter": "https?://partner\\.googleadservices\\.com", "resource-type": ["image", "style-sheet", "script", "font", "raw", "svg-document", "media", "popup"], "load-type": ["third-party"]}, "action": {"type": "block"}},
{"trigger": {"url-filter": "https?://partnerad\\.l\\.googleadservices\\.com", "resource-type": ["image", "style-sheet", "script", "font", "raw", "svg-document", "media", "popup"], "load-type": ["third-party"]}, "action": {"type": "block"}},
{"trigger": {"url-filter": "https?://video-stats\\.video\\.google\\.com", "resource-type": ["image", "style-sheet", "script", "font", "raw", "svg-document", "media", "popup"], "load-type": ["third-party"]}, "action": {"type": "block"}},
{"trigger": {"url-filter": "https?://wintricksbanner\\.googlepages\\.com", "resource-type": ["image", "style-sheet", "script", "font", "raw", "svg-document", "media", "popup"], "load-type": ["third-party"]}, "action": {"type": "block"}},
];

var adRules = googleRules;

var adRulesCSS = [
{"trigger": {"url-filter": ".*"}, "action": {"type": "css-display-none", "selector":
  "[id$='-ad' i],\
  [id$='-ads' i],\
  [id$='_ad' i],\
  [id$='_ads' i],\
  [id*=' ad-' i],\
  [id*=' ad_' i],\
  [id*=' ads-' i],\
  [id*=' ads_' i],\
  [id*='-ad ' i],\
  [id*='-ad-' i],\
  [id*='-ad_' i],\
  [id*='-ads ' i],\
  [id*='-ads-' i],\
  [id*='-ads_' i],\
  [id*='_ad ' i],\
  [id*='_ad-' i],\
  [id*='_ad_' i],\
  [id*='_ads ' i],\
  [id*='_ads-' i],\
  [id*='_ads_' i],\
  [id*='adarea' i],\
  [id*='adauth' i],\
  [id*='adbanner' i],\
  [id*='adbar' i],\
  [id*='adblock' i],\
  [id*='adbottom' i],\
  [id*='adbox' i],\
  [id*='adcontainer' i],\
  [id*='adcontent' i],\
  [id*='adcontrol' i],\
  [id*='addetails' i],\
  [id*='addisplay' i],\
  [id*='adexpert' i],\
  [id*='adframe' i],\
  [id*='adinterest' i],\
  [id*='adlarge' i],\
  [id*='adlayer' i],\
  [id*='adleft' i],\
  [id*='adpanel' i],\
  [id*='adpopUp' i],\
  [id*='adrectangle' i],\
  [id*='adright' i],\
  [id*='adsense' i],\
  [id*='adsky' i],\
  [id*='adslot' i],\
  [id*='adsmall' i],\
  [id*='adspac' i],\
  [id*='adtop' i],\
  [id*='advert' i],\
  [id*='adwidget' i],\
  [id*='adzone' i],\
  [id*='bannerad' i],\
  [id*='barad' i],\
  [id*='cornerad' i],\
  [id*='divad' i],\
  [id*='footerad' i],\
  [id*='googlead' i],\
  [id*='googlesearchads' i],\
  [id*='googleshopping' i],\
  [id*='googlesponsored' i],\
  [id*='headerad' i],\
  [id*='heroad' i],\
  [id*='searchad' i],\
  [id*='searchsponsor' i],\
  [id*='sidead' i],\
  [id*='sidebarad' i],\
  [id*='skyad' i],\
  [id*='spnslink' i],\
  [id*='sponbox' i],\
  [id*='sponlink' i],\
  [id*='sponsorad' i],\
  [id*='sponsorbanner' i],\
  [id*='sponsored-' i],\
  [id*='sponsored_' i],\
  [id*='sponsoredlink' i],\
  [id*='textad' i],\
  [id*='videoad' i],\
  [id*='yahooad' i],\
  [id*='yahoosponsored' i],\
  [id*='zergnet' i],\
  [id^='ad_' i],\
  [id|='ad' i]"
}}
];
