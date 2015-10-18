var rules = [
  {
    "trigger": { "url-filter": ".*" },
    "action": {
      "type": "css-display-none",
      "selector": "header"
    }
  },
  {
    "action": {"type": "ignore-previous-rules"},
    "trigger": {
      "url-filter": ".*"
    }
  }
];
