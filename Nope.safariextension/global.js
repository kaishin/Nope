safari.extension.settings.addEventListener("change", settingsChangeHandler, false);
safari.application.addEventListener("command", commandHandler, false);
safari.application.addEventListener("validate", validateHandler, false);

var yepDomains = safari.extension.settings.whitleListedDomains;
var yepArray = _getWhiteListedDomains();

function _getWhiteListedDomains() {
  if (yepDomains && yepDomains != "") {
    return yepDomains.split(",").map(function(string) { return string.replace(/ /, "") })
  } else {
    return []
  }
}

function _currentTabURL() {
  return safari.application.activeBrowserWindow.activeTab.url;
}

function settingsChangeHandler(event) {
  if (event.key === "whitleListedDomains") {
    loadRules();
  }
}

function commandHandler(event) {
  if (event.command === "whiteListSite") {
    var currentURL = _currentTabURL();
    var domain = extractDomain(currentURL);

    if (arrayContains(yepArray, domain)) {
      arrayRemove(yepArray, domain)
    } else {
      yepArray.push(domain)
    }

    safari.extension.settings.whitleListedDomains = yepArray.join(", ");
    console.log(safari.extension.settings.whitleListedDomains)
  }
}

function validateHandler(event) {
  var currentURL = _currentTabURL();
  var domain = extractDomain(currentURL);

  if (event.target.identifier == "whiteListSite") {
    event.target.checkedState = arrayContains(yepArray, domain)
    event.target.title = "Yep for " + domain
  }
}

function loadRules() {
  if (yepArray.count < 1) {
    safari.extension.setContentBlocker(rules);
    return;
  }

  var ignoreRule = {
    "action": {"type": "ignore-previous-rules"},
    "trigger": {
      "url-filter": ".*",
      "if-domain": yepArray
    }
  };

  var userRules = rules.concat([ignoreRule])
  safari.extension.setContentBlocker(userRules);
}

function extractDomain(url) {
  var domain;

  if (url.indexOf("://") > -1) {
    domain = url.split('/')[2];
  } else {
    domain = url.split('/')[0];
  }

  domain = domain.split(':')[0];
  return domain;
}

function arrayContains(array, element) {
  return (array.indexOf(element) > -1);
}

function arrayRemove(array, element) {
  var index = array.indexOf(element);

  if (index > -1) {
    array.splice(index, 1);
  }
}

loadRules();
