safari.extension.settings.addEventListener("change", settingsChangeHandler, false);
safari.application.addEventListener("command", commandHandler, false);
safari.application.addEventListener("validate", validateHandler, false);

var allRules = advertisingRules.concat(analyticsRules, socialRules)
var yepDomains = safari.extension.settings.whiteListedDomains;
var yepArray = _getWhiteListedDomains();

var veryNopeDomains = safari.extension.settings.blackListedDomains;
var veryNopeArray = _getBlackListedDomains();

function _getWhiteListedDomains() {
  if (yepDomains && yepDomains != "") {
    return yepDomains.split(",").map(function(string) { return string.replace(/ /, "") })
  } else {
    return []
  }
}

function _getBlackListedDomains() {
  if (veryNopeDomains && veryNopeDomains != "") {
    return veryNopeDomains.split(",").map(function(string) { return string.replace(/ /, "") })
  } else {
    return []
  }
}

function _currentTabURL() {
  return safari.application.activeBrowserWindow.activeTab.url;
}

function settingsChangeHandler(event) {
  if (event.key === "whiteListedDomains" || event.key === "isPaused" || event.key === "blackListedDomains") {
    loadRules();
  }
}

function commandHandler(event) {
  if (event.command === "whiteListSite") {
    toggleWhiteListForSite(_currentTabURL());
  } else if (event.command === "blackListSite") {
    toggleBlackListForSite(_currentTabURL());
  } else if (event.command === "pause") {
    safari.extension.settings.isPaused = !safari.extension.settings.isPaused;
    updateMenuButtonIcon(safari.extension.toolbarItems[0])
  }
}

function validateHandler(event) {
  var currentURL = _currentTabURL();
  var domain = extractDomain(currentURL);

  if (event.target.identifier == "menuButton") {
    event.target.disabled = (typeof currentURL === "undefined");
    updateMenuButtonIcon(event.target);
  } else if (event.target.identifier == "whiteListSite") {
    event.target.checkedState = arrayContains(yepArray, domain);
    event.target.title = "Yep to " + domain;
  } else if (event.target.identifier == "blackListSite") {
    event.target.checkedState = arrayContains(veryNopeArray, domain);
    event.target.title = "Very Nope to " + domain;
  } else if (event.target.identifier == "pause") {
    event.target.checkedState = safari.extension.settings.isPaused;
  }
}

function updateMenuButtonIcon(target) {
  var imageName = safari.extension.settings.isPaused ? "icon-paused.png" : "icon.png";
  target.image = safari.extension.baseURI + "assets/" + imageName;
}

function loadRules() {
  console.log("Loading rules...");
  var userRules = allRules;

  if (safari.extension.settings.isPaused) {
    userRules = [{
      "action": {"type": "ignore-previous-rules"},
      "trigger": {"url-filter": ".*"}
    }];
    setContentBlocker(userRules);
    return;
  }

  if (yepArray.length > 0) {
    var ignoreRule = {
      "action": {"type": "ignore-previous-rules"},
      "trigger": {
        "url-filter": ".*",
        "if-domain": yepArray
      }
    };

    userRules = userRules.concat([ignoreRule]);
  }

  if (veryNopeArray.length > 0) {
    var veryNopeRules = [
      {"action": {"type": "block-cookies"},
      "trigger": {
        "url-filter": ".*",
        "if-domain": veryNopeArray}
      },
      {"action": {"type": "block"},
      "trigger": {
        "url-filter": ".*",
        "if-domain": veryNopeArray,
        "resource-type": ["script", "raw", "popup"],
        "load-type": ["third-party"]}
      }
    ];

    userRules = veryNopeRules.concat(userRules)
  }

  setContentBlocker(userRules);
}

function setContentBlocker(customRules) {
  safari.extension.setContentBlocker(customRules);
}

function toggleWhiteListForSite(siteURL) {
  var domain = extractDomain(siteURL);

  if (arrayContains(yepArray, domain)) {
    arrayRemove(yepArray, domain)
  } else {
    yepArray.push(domain)

    if (arrayContains(veryNopeArray, domain)) {
      arrayRemove(veryNopeArray, domain)
      safari.extension.settings.blackListedDomains = veryNopeArray.join(", ");
    }
  }

  safari.extension.settings.whiteListedDomains = yepArray.join(", ");
}

function toggleBlackListForSite(siteURL) {
  var domain = extractDomain(siteURL);

  if (arrayContains(veryNopeArray, domain)) {
    arrayRemove(veryNopeArray, domain)
  } else {
    veryNopeArray.push(domain)

    if (arrayContains(yepArray, domain)) {
      arrayRemove(yepArray, domain)
      safari.extension.settings.whiteListedDomains = yepArray.join(", ");
    }
  }

  safari.extension.settings.blackListedDomains = veryNopeArray.join(", ");
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
