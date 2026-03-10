// Firefox Hardened Profile — user.js
// https://github.com/ifinkelstein/firefox-profile
//
// Privacy & security preferences for Firefox 148+.
// Drop this file into your Firefox profile directory.
// Firefox reads user.js on every startup and applies the values to prefs.js.
//
// Sources:
//   - arkenfox/user.js
//   - equk/ffox_profile_tools
//   - PrivacyGuides
//
// Last updated: 2026-03-10

// ============================================================================
// STARTUP / NEW TAB
// ============================================================================

// Disable about:config warning
user_pref("browser.aboutConfig.showWarning", false);

// Blank new tab
user_pref("browser.newtabpage.enabled", false);

// Disable Activity Stream sponsored content & clutter
user_pref("browser.newtabpage.activity-stream.feeds.section.topstories", false);
user_pref("browser.newtabpage.activity-stream.feeds.topsites", false);
user_pref("browser.newtabpage.activity-stream.showSponsored", false);
user_pref("browser.newtabpage.activity-stream.showSponsoredTopSites", false);
user_pref("browser.newtabpage.activity-stream.showWeather", false);
user_pref("browser.newtabpage.activity-stream.default.sites", "");
user_pref("browser.newtabpage.activity-stream.section.highlights.includeDownloads", false);
user_pref("browser.newtabpage.activity-stream.section.highlights.includeVisited", false);
user_pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.addons", false);
user_pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.features", false);

// ============================================================================
// TELEMETRY / DATA COLLECTION
// ============================================================================

user_pref("toolkit.telemetry.unified", false);
user_pref("toolkit.telemetry.enabled", false);
user_pref("toolkit.telemetry.server", "data:,");
user_pref("toolkit.telemetry.server_owner", "");
user_pref("toolkit.telemetry.archive.enabled", false);
user_pref("toolkit.telemetry.newProfilePing.enabled", false);
user_pref("toolkit.telemetry.shutdownPingSender.enabled", false);
user_pref("toolkit.telemetry.updatePing.enabled", false);
user_pref("toolkit.telemetry.bhrPing.enabled", false);
user_pref("toolkit.telemetry.firstShutdownPing.enabled", false);
user_pref("toolkit.telemetry.cachedClientID", "");
user_pref("toolkit.telemetry.previousBuildID", "");
user_pref("toolkit.coverage.opt-out", true);
user_pref("toolkit.coverage.enabled", false);
user_pref("toolkit.coverage.endpoint.base", "");

// Health reports
user_pref("datareporting.healthreport.uploadEnabled", false);
user_pref("datareporting.policy.dataSubmissionEnabled", false);

// Crash reporting
user_pref("browser.tabs.crashReporting.sendReport", false);
user_pref("breakpad.reportURL", "");

// Normandy / studies
user_pref("app.normandy.enabled", false);
user_pref("app.normandy.api_url", "");
user_pref("app.shield.optoutstudies.enabled", false);

// ============================================================================
// TRACKING PROTECTION
// ============================================================================

// Enable Enhanced Tracking Protection
user_pref("privacy.trackingprotection.enabled", true);

// Global Privacy Control (GPC)
user_pref("privacy.globalprivacycontrol.enabled", true);
user_pref("privacy.globalprivacycontrol.functionality.enabled", true);
user_pref("privacy.globalprivacycontrol.pbmode.enabled", true);

// Container tabs
user_pref("privacy.userContext.enabled", true);
user_pref("privacy.userContext.ui.enabled", true);

// Disable private attribution (ad measurement)
user_pref("dom.private-attribution.submission.enabled", false);

// ============================================================================
// COOKIES & NETWORK
// ============================================================================

// Total Cookie Protection (dFPI) — better than just blocking 3rd-party cookies
user_pref("network.cookie.cookieBehavior", 5);

// HTTPS-first mode
user_pref("dom.security.https_first", true);
user_pref("dom.security.https_first_pbm", true);

// Disable prefetching / speculative connections
user_pref("network.prefetch-next", false);
user_pref("network.dns.disablePrefetch", true);
user_pref("network.http.speculative-parallel-limit", 0);
user_pref("browser.places.speculativeConnect.enabled", false);

// Disable captive portal & connectivity checks
user_pref("network.captive-portal-service.enabled", false);
user_pref("captivedetect.canonicalURL", "");
user_pref("network.connectivity-service.enabled", false);

// Show punycode (anti-phishing)
user_pref("network.IDN_show_punycode", true);

// ============================================================================
// FINGERPRINTING
// ============================================================================

// Disable WebRTC IP leak (breaks video calls — set to true if needed)
user_pref("media.peerconnection.enabled", false);

// Standardize locale
user_pref("intl.accept_languages", "en-US, en");

// ============================================================================
// SECURITY
// ============================================================================

// Disable saved passwords / autofill
user_pref("signon.rememberSignons", false);
user_pref("signon.autofillForms", false);
user_pref("signon.formlessCapture.enabled", false);
user_pref("extensions.formautofill.addresses.enabled", false);
user_pref("extensions.formautofill.creditCards.enabled", false);

// Strict certificate pinning
user_pref("security.cert_pinning.enforcement_level", 2);
user_pref("security.OCSP.require", true);

// CRLite
user_pref("security.remote_settings.crlite_filters.enabled", true);
user_pref("security.pki.crlite_mode", 2);

// TLS hardening
user_pref("security.ssl.require_safe_negotiation", true);
user_pref("security.ssl.treat_unsafe_negotiation_as_broken", true);
user_pref("security.tls.enable_0rtt_data", false);
user_pref("security.tls.version.enable-deprecated", false);

// Expert bad cert pages
user_pref("browser.xul.error_pages.expert_bad_cert", true);

// ============================================================================
// DISABLE UNWANTED FEATURES
// ============================================================================

// Pocket
user_pref("browser.pocket.enabled", false);
user_pref("extensions.pocket.enabled", false);

// PDF viewer scripting
user_pref("pdfjs.enableScripting", false);

// AI features
user_pref("browser.ml.chat.enabled", false);
user_pref("browser.ml.enable", false);
user_pref("browser.ml.chat.page", false);
user_pref("browser.ml.chat.page.footerBadge", false);
user_pref("browser.ml.chat.page.menuBadge", false);
user_pref("browser.ml.chat.menu", false);
user_pref("browser.ml.linkPreview.enabled", false);
user_pref("browser.ml.pageAssist.enabled", false);
user_pref("extensions.ml.enabled", false);

// Smart tab grouping
user_pref("browser.tabs.groups.smart.enabled", false);
user_pref("browser.tabs.groups.smart.userEnabled", false);

// Picture-in-Picture toggle
user_pref("media.videocontrols.picture-in-picture.video-toggle.enabled", false);

// Search suggestions & sponsored suggestions
user_pref("browser.search.suggest.enabled", false);
user_pref("browser.urlbar.suggest.searches", false);
user_pref("browser.urlbar.suggest.quicksuggest.nonsponsored", false);
user_pref("browser.urlbar.suggest.quicksuggest.sponsored", false);
user_pref("browser.urlbar.groupLabels.enabled", false);
user_pref("browser.urlbar.speculativeConnect.enabled", false);

// Geolocation
user_pref("geo.enabled", false);
user_pref("geo.provider.use_corelocation", false);

// Discovery / recommendations
user_pref("browser.discovery.enabled", false);
user_pref("extensions.htmlaboutaddons.recommendations.enabled", false);

// System add-on updates
user_pref("extensions.systemAddon.update.enabled", false);
user_pref("extensions.systemAddon.update.url", "");

// Webcompat reporter
user_pref("extensions.webcompat-reporter.enabled", false);
user_pref("extensions.webcompat-reporter.newIssueEndpoint", "");

// Region-specific updates
user_pref("browser.region.network.url", "");
user_pref("browser.region.update.enabled", false);

// Safe Browsing remote lookups (local lists still work)
user_pref("browser.safebrowsing.downloads.remote.enabled", false);
user_pref("browser.safebrowsing.downloads.remote.url", "");

// ============================================================================
// PERFORMANCE
// ============================================================================

// RAM cache instead of disk
user_pref("browser.cache.disk.enable", false);
user_pref("browser.cache.memory.enable", true);

// ============================================================================
// UI / UX
// ============================================================================

// Enable userChrome.css support
user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);

// Show full URLs
user_pref("browser.urlbar.trimURLs", false);

// Separate search engine in private tabs
user_pref("browser.search.separatePrivateDefault.ui.enabled", true);

// Keep address bar search enabled
user_pref("keyword.enabled", true);

// Disable auto-update (manage manually)
user_pref("app.update.auto", false);

// ============================================================================
// DOWNLOADS — always save to disk, no dialogs
// ============================================================================

user_pref("browser.download.useDownloadDir", true);
user_pref("browser.download.always_ask_before_handling_new_types", false);
user_pref("browser.download.manager.addToRecentDocs", false);

// Download PDFs instead of opening in-browser
user_pref("pdfjs.disabled", true);

// Auto-save common file types
user_pref("browser.helperApps.neverAsk.saveToDisk", "application/pdf,application/octet-stream,application/x-pdf,application/vnd.pdf,text/pdf,application/zip,application/x-zip-compressed,application/x-gzip,application/x-tar,application/x-bzip2,application/x-7z-compressed,application/x-rar-compressed,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,text/csv,application/json,application/xml,text/xml,image/svg+xml");

// ============================================================================
// OPTIONAL — uncomment if wanted
// ============================================================================

// Resist fingerprinting (aggressive: forces GMT timezone, light theme, canvas
// prompts). Modern alternative is fingerprintingProtection (FPP) which is
// less disruptive and enabled by default in ETP Strict.
// user_pref("privacy.resistFingerprinting", true);

// Force HTTPS-only (breaks HTTP sites completely)
// user_pref("dom.security.https_only_mode", true);

// Dark mode
// user_pref("ui.systemUsesDarkTheme", 1);
// user_pref("devtools.theme", "dark");

// DNS-over-HTTPS (mode 3 = DoH only, no fallback)
// user_pref("network.trr.mode", 3);
// user_pref("network.trr.uri", "https://dns.quad9.net/dns-query");

// Disable WebGL (extra fingerprinting surface)
// user_pref("webgl.disabled", true);

// Clear everything on shutdown
// user_pref("privacy.sanitize.sanitizeOnShutdown", true);
// user_pref("privacy.clearOnShutdown.cache", true);
// user_pref("privacy.clearOnShutdown.cookies", true);
// user_pref("privacy.clearOnShutdown.downloads", true);
// user_pref("privacy.clearOnShutdown.formdata", true);
// user_pref("privacy.clearOnShutdown.history", true);
// user_pref("privacy.clearOnShutdown.sessions", true);
