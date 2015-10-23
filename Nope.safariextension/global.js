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
  if (event.key === "whitleListedDomains" || event.key === "isPaused") {
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
  } else if (event.command === "pause") {
    safari.extension.settings.isPaused = !safari.extension.settings.isPaused;
  }
}

function validateHandler(event) {
  var currentURL = _currentTabURL();
  var domain = extractDomain(currentURL);

  console.log(event.target.identifier);

  if (event.target.identifier == "menuButton") {
    event.target.disabled = (typeof currentURL === "undefined");
  } else if (event.target.identifier == "whiteListSite") {
    event.target.checkedState = arrayContains(yepArray, domain);
    event.target.title = "Yep for " + domain;
  } else if (event.target.identifier == "pause") {
    event.target.checkedState = safari.extension.settings.isPaused;
  }
}

function loadRules() {
  console.log("Loading rules...");

  if (safari.extension.settings.isPaused) {
    emptyRules = [{
      "action": {"type": "ignore-previous-rules"},
      "trigger": {"url-filter": ".*"}
    }];
    setContentBlocker(emptyRules);
    return;
  }

  if (yepArray.count < 1) {
    setContentBlocker(rules);
  }

  var ignoreRule = {
    "action": {"type": "ignore-previous-rules"},
    "trigger": {
      "url-filter": ".*",
      "if-domain": yepArray
    }
  };

  var userRules = rules.concat([ignoreRule])
  setContentBlocker(userRules);
}

function setContentBlocker(customRules) {
  safari.extension.setContentBlocker(customRules);
}

function extractDomain(url) {
  if (typeof url === "undefined") { return }

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

function initSettings() {
  if (typeof safari.extension.settings.isPaused === "undefined") {
    safari.extension.settings.isPaused = false;
  }
}

loadRules();
initSettings();
