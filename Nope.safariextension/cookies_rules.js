var cookiesRules = [
{"trigger": {"url-filter": ".*"}, "action": {"type": "css-display-none", "selector":
  "[class$='accept_cookie' i],\
  [class$='acceptCookie' i]"
}},
{"trigger": {"url-filter": ".*"}, "action": {"type": "css-display-none", "selector":
  "[id*='accept_cookie' i],\
  [id$='acceptCookie' i]"
}}
];
