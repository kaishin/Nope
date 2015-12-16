safari.extension.settings.addEventListener("change", settingsChangeHandler, false)
safari.application.addEventListener("command", commandHandler, false)
safari.application.addEventListener("validate", validateHandler, false)

var yepDomains = safari.extension.settings.whiteListedDomains
var yepArray = _getWhiteListedDomains()

var megaNopeDomains = safari.extension.settings.blackListedDomains
var megaNopeArray = _getBlackListedDomains()

function _getWhiteListedDomains() {
  if (yepDomains && yepDomains !== "") {
    return yepDomains.split(",").map(function(string) { return string.replace(/ /, "") })
  } else {
    return []
  }
}

function _getAllRules() {
  var blockAds = safari.extension.settings.blockAdvertising
  var blockAnalytics = safari.extension.settings.blockAnalytics
  var blockSocial = safari.extension.settings.blockSocial

  var rules = []

  if (blockAnalytics) {
    rules = rules.concat(analyticsRules)
  }

  if (blockSocial) {
    rules = rules.concat(socialRules)
  }

  if (blockAds) {
    rules = rules.concat(advertisingRules, advertisingCSSRules)
  }

  return rules
}

function _getBlackListedDomains() {
  if (megaNopeDomains && megaNopeDomains !== "") {
    return megaNopeDomains.split(",").map(function(string) { return string.replace(/ /, "") })
  } else {
    return []
  }
}

function _currentTabURL() {
  return safari.application.activeBrowserWindow.activeTab.url
}

function settingsChangeHandler(event) {
  loadRules()
}

function commandHandler(event) {
  if (event.command == "whiteListSite") {
    whiteListSite(_currentTabURL())
  } else if (event.command == "grayListSite") {
    grayListSite(_currentTabURL())
  } else if (event.command == "blackListSite") {
    blackListSite(_currentTabURL())
  } else if (event.command == "pause") {
    safari.extension.settings.isPaused = !safari.extension.settings.isPaused
    updateMenuButtonIcon(safari.extension.toolbarItems[0])
  }
}

function validateHandler(event) {
  var currentURL = _currentTabURL()
  var domain = extractDomain(currentURL)

  if (event.target.identifier == "menuButton") {
    event.target.disabled = (typeof currentURL === "undefined")
    updateMenuButtonIcon(event.target)
  } else if (event.target.identifier == "currentPageURL") {
    event.target.title = "Rules for " + domain
  } else if (event.target.identifier == "whiteListSite") {
    event.target.checkedState = arrayContains(yepArray, domain)
  } else if (event.target.identifier == "grayListSite") {
    event.target.checkedState = !arrayContains(yepArray, domain) && !arrayContains(megaNopeArray, domain)
  } else if (event.target.identifier == "blackListSite") {
    event.target.checkedState = arrayContains(megaNopeArray, domain)
  } else if (event.target.identifier == "pause") {
    event.target.checkedState = safari.extension.settings.isPaused
  }
}

function updateMenuButtonIcon(target) {
  var imageName = safari.extension.settings.isPaused ? "icon-paused.png" : "icon.png"
  target.image = safari.extension.baseURI + "assets/" + imageName
}

function loadRules() {
  var userRules = _getAllRules()
  console.log("Loading " + userRules.length + " rules...")

  if (safari.extension.settings.isPaused) {
    userRules = [{
      "action": {"type": "ignore-previous-rules"},
      "trigger": {"url-filter": ".*"}
    }]
    setContentBlocker(userRules)
    return
  }

  if (yepArray.length > 0) {
    var ignoreRule = {
      "action": {"type": "ignore-previous-rules"},
      "trigger": {
        "url-filter": ".*",
        "if-domain": yepArray
      }
    }

    userRules = userRules.concat([ignoreRule])
  }

  if (megaNopeArray.length > 0) {
    var veryNopeRules = [
      {"action": {"type": "block-cookies"},
      "trigger": {
        "url-filter": ".*",
        "if-domain": megaNopeArray}
      },
      {"action": {"type": "block"},
      "trigger": {
        "url-filter": ".*",
        "if-domain": megaNopeArray,
        "resource-type": ["script", "raw", "popup"],
        "load-type": ["third-party"]}
      }
    ]

    userRules = veryNopeRules.concat(userRules)
  }

  setContentBlocker(userRules)
}

function setContentBlocker(customRules) {
  safari.extension.setContentBlocker(customRules)
}

function whiteListSite(siteURL) {
  var domain = extractDomain(siteURL)

  if (!arrayContains(yepArray, domain)) {
    yepArray.push(domain)
  }

  if (arrayContains(megaNopeArray, domain)) {
    arrayRemove(megaNopeArray, domain)
    safari.extension.settings.blackListedDomains = megaNopeArray.join(", ")
  }

  safari.extension.settings.whiteListedDomains = yepArray.join(", ")
}

function grayListSite(siteURL) {
  var domain = extractDomain(siteURL)

  if (arrayContains(yepArray, domain)) {
    arrayRemove(yepArray, domain)
    safari.extension.settings.whiteListedDomains = yepArray.join(", ")
  }

  if (arrayContains(megaNopeArray, domain)) {
    arrayRemove(megaNopeArray, domain)
    safari.extension.settings.blackListedDomains = megaNopeArray.join(", ")
  }
}

function blackListSite(siteURL) {
  var domain = extractDomain(siteURL)

  if (!arrayContains(megaNopeArray, domain)) {
    megaNopeArray.push(domain)
  }

  if (arrayContains(yepArray, domain)) {
    arrayRemove(yepArray, domain)
    safari.extension.settings.whiteListedDomains = yepArray.join(", ")
  }

  safari.extension.settings.blackListedDomains = megaNopeArray.join(", ")
}

function extractDomain(url) {
  if (typeof url === "undefined") { return }

  var domain

  if (url.indexOf("://") > -1) {
    domain = url.split('/')[2]
  } else {
    domain = url.split('/')[0]
  }

  domain = domain.split(':')[0]
  return domain
}

function arrayContains(array, element) {
  return (array.indexOf(element) > -1)
}

function arrayRemove(array, element) {
  var index = array.indexOf(element)

  if (index > -1) {
    array.splice(index, 1)
  }
}

function initSettings() {
  if (typeof safari.extension.settings.isPaused === "undefined") {
    safari.extension.settings.isPaused = false
  }
}

loadRules()
initSettings()
