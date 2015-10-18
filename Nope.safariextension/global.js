safari.extension.settings.addEventListener("change", settingsChangeHandler, false);

function _getWhiteListedDomains() {
  var userList = safari.extension.settings.whitleListedDomains;
  return userList.split(",").map(function(string) { return string.replace(/ /, "") })
}

function settingsChangeHandler(event) {
  if (event.key === "whitleListedDomains") {
    loadRules();
  }
}

function loadRules() {
  var ignoreRule = {
    "action": {"type": "ignore-previous-rules"},
    "trigger": {
      "url-filter": ".*",
      "if-domain": _getWhiteListedDomains()
    }
  };

  var userRules = rules.concat([ignoreRule])
  safari.extension.setContentBlocker(userRules);
}

loadRules();
