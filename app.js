/* ============================================================
   app.js  —  renders the data from content.js into the page and
   wires up interactions. You normally don't need to edit this;
   edit content.js instead.
   ============================================================ */

/* Set this to your API Gateway endpoint once the Lambda + SES backend
   is deployed, and enable a project's `demo:` block in content.js.
   Left empty, the request form falls back to the visitor's mail client. */
var REQUEST_ENDPOINT = "";

/* ---------- tiny helpers ---------- */
function el(id) { return document.getElementById(id); }

// Render a tag, which is either "Name" or { text, neutral }.
function tagHtml(t) {
  if (typeof t === "string") return '<span class="tag">' + t + "</span>";
  return '<span class="tag' + (t.neutral ? " neutral" : "") + '">' + t.text + "</span>";
}

/* ---------- hero ---------- */
function renderHero() {
  el("hero-avail").textContent = PROFILE.availability;
  el("hero-name").textContent = PROFILE.name;
  el("hero-headline").innerHTML = PROFILE.headlineHtml;
  el("hero-roles").innerHTML = PROFILE.roles.map(function (r) { return "<span>" + r + "</span>"; }).join("");

  el("hero-contacts").innerHTML = PROFILE.contacts.map(function (c) {
    if (c.type === "copy") {
      return '<a href="' + c.href + '" data-copy="' + c.value + '" onclick="return copyContact(event, this)">' + c.label + "</a>";
    }
    if (c.type === "loc") return '<span class="loc">' + c.label + "</span>";
    return '<a href="' + c.href + '" target="_blank" rel="noopener">' + c.label + "</a>";
  }).join("") + '<span class="loc">' + PROFILE.location + "</span>";

  var sc = PROFILE.serviceCard;
  el("svc-head-text").innerHTML = sc.heading;
  el("svc-body").innerHTML = sc.rows.map(function (row) {
    return '<div class="svc-row"><span class="svc-key">' + row[0] +
           '</span><span class="svc-val">' + row[1] + "</span></div>";
  }).join("");
}

/* ---------- summary / interests ---------- */
function renderText() {
  el("summary-text").innerHTML = SUMMARY_HTML;
  el("interests-text").innerHTML = INTERESTS_HTML;
}

/* ---------- skills ---------- */
function renderSkills() {
  el("skills-wrap").innerHTML = SKILLS.map(function (g) {
    return '<div class="skill-group"><div class="sg-grid">' +
             '<div class="sg-label">' + g.label + "</div>" +
             '<div class="sg-tags">' + g.tags.map(tagHtml).join("") + "</div>" +
           "</div></div>";
  }).join("");
}

/* ---------- projects ---------- */
function detailBlockHtml(b) {
  var cls = "d-list" + (b.aws ? " aws" : "");
  var items = b.items.map(function (i) { return "<li>" + i + "</li>"; }).join("");
  return '<div class="d-block"><div class="d-title">' + b.title + "</div>" +
         "<ul class=\"" + cls + "\">" + items + "</ul></div>";
}

function demoHtml(p, idx) {
  var vid = "vid-" + idx;
  var chapters = (p.demo.chapters || []).map(function (ch) {
    return '<button onclick="seek(\'' + vid + "'," + ch[1] + ')">' + ch[0] + "</button>";
  }).join("");
  return (
    '<div class="demo">' +
      '<video id="' + vid + '" controls preload="metadata" playsinline poster="assets/ecochess-poster.jpg">' +
        '<source src="assets/ecochess-demo.mp4" type="video/mp4">' +
        "Your browser can't play this video." +
      "</video>" +
      '<div class="demo-cap"><span class="lead">Walkthrough of the running platform</span>' +
        '<span class="chapters">' + chapters + "</span>" +
      "</div>" +
    "</div>" +
    '<div class="req-note">' + p.demo.videoNote + "</div>" +
    '<div class="btn-row">' +
      '<button class="req-btn" onclick="openReq(\'' + (p.name) + '\')">Request access</button>' +
      '<button class="details-btn" aria-expanded="false" onclick="toggle(this,\'d-' + idx + '\')"><span class="chev">&#9656;</span>' + p.detailsLabel + "</button>" +
    "</div>"
  );
}

function projectHtml(p, idx) {
  var did = "d-" + idx;

  var sub = "";
  if (p.domain || p.status) {
    var domain = p.domain
      ? (p.domainHref
          ? '<a class="p-domain" href="' + p.domainHref + '" target="_blank" rel="noopener">' + p.domain + "</a>"
          : '<span class="p-domain" style="color: var(--faint);">' + p.domain + "</span>")
      : "";
    var status = p.status
      ? '<span class="status ' + p.status.kind + '"><span class="d"></span>' + p.status.label + "</span>"
      : "";
    sub = '<div class="p-sub">' + domain + status + "</div>";
  }

  var bullets = '<ul class="p-bullets">' + p.bullets.map(function (b) { return "<li>" + b + "</li>"; }).join("") + "</ul>";
  var tags = '<div class="tags">' + p.tags.map(tagHtml).join("") + "</div>";

  var links = (p.detailLinks && p.detailLinks.length)
    ? '<div class="d-links">' + p.detailLinks.map(function (l) {
        return '<a href="' + l.href + '" target="_blank" rel="noopener">' + l.text + "</a>";
      }).join("") + "</div>"
    : "";
  var blocks = (p.detailBlocks || []).map(detailBlockHtml).join("");
  var details = '<div class="details" id="' + did + '">' + links + blocks + "</div>";

  // On-demand projects show the video + request block; others a plain expand button.
  var actions = p.demo
    ? demoHtml(p, idx)
    : '<button class="details-btn" aria-expanded="false" onclick="toggle(this,\'' + did + '\')"><span class="chev">▸</span>' + p.detailsLabel + "</button>";

  return (
    '<article class="project">' +
      '<div class="p-head"><span class="p-name">' + p.name + '</span><span class="p-tag">' + p.tag + "</span></div>" +
      sub + bullets + tags + actions + details +
    "</article>"
  );
}

function renderProjects() {
  el("projects-wrap").innerHTML = PROJECTS.map(projectHtml).join("");
}

/* ---------- experience ---------- */
function renderExperience() {
  el("experience-wrap").innerHTML = EXPERIENCE.map(function (x) {
    var lines = x.bullets.map(function (b) { return '<span class="li">' + b + "</span>"; }).join("");
    return '<div class="xp"><div class="xp-when">' + x.when + "</div><div>" +
             '<div class="xp-role">' + x.role + "</div>" +
             '<div class="xp-org">' + x.org + "</div>" +
             '<div class="xp-note">' + lines + "</div>" +
           "</div></div>";
  }).join("");
}

/* ---------- education ---------- */
function renderEducation() {
  el("education-wrap").innerHTML = EDUCATION.map(function (e) {
    return '<div class="edu"><div class="edu-when">' + e.when + "</div><div>" +
             '<div class="edu-deg">' + e.degree + "</div>" +
             '<div class="edu-school">' + e.school + "</div></div>" +
             '<div class="edu-score">' + e.score + "</div></div>";
  }).join("");
}

/* ---------- interactions ---------- */
function toggle(btn, id) {
  var panel = el(id);
  var open = panel.classList.toggle("open");
  btn.setAttribute("aria-expanded", open ? "true" : "false");
}

var _toastTimer;
function showToast(text) {
  var t = el("copy-toast");
  if (!t) { t = document.createElement("div"); t.id = "copy-toast"; t.className = "copy-toast"; document.body.appendChild(t); }
  t.textContent = text;
  t.classList.add("show");
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(function () { t.classList.remove("show"); }, 1600);
}

// Click email/phone to copy. Returns false to suppress mailto:/tel: navigation.
function copyContact(e, link) {
  var value = link.getAttribute("data-copy");
  var done = function () { showToast("Copied " + value); };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(value).then(done).catch(function () { fallbackCopy(value, done); });
  } else {
    fallbackCopy(value, done);
  }
  e.preventDefault();
  return false;
}
function fallbackCopy(value, done) {
  var ta = document.createElement("textarea");
  ta.value = value; ta.style.position = "fixed"; ta.style.opacity = "0";
  document.body.appendChild(ta); ta.select();
  try { document.execCommand("copy"); done(); } catch (err) {}
  document.body.removeChild(ta);
}

function seek(id, seconds) {
  var v = el(id);
  if (!v) return;
  v.currentTime = seconds;
  v.play();
}

/* ---------- request-access dialog (only used in on-demand mode) ---------- */
function buildReqDialog() {
  if (el("req-ov")) return;
  var ov = document.createElement("div");
  ov.className = "ov"; ov.id = "req-ov"; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true");
  ov.innerHTML =
    '<div class="dlg">' +
      '<button class="dlg-close" onclick="closeReq()" aria-label="Close">✕</button>' +
      '<h3 id="req-title">Request access</h3>' +
      '<p class="sub">I\'ll start the environment and email you the URL, role logins, and what\'s fully live vs. scaled down. Usually within a few hours.</p>' +
      '<div class="fld"><label for="rq-name">Your name</label><input id="rq-name" type="text" autocomplete="name" placeholder="Jane Sharma"></div>' +
      '<div class="fld"><label for="rq-email">Email to reply to</label><input id="rq-email" type="email" autocomplete="email" placeholder="jane@company.com"></div>' +
      '<div class="fld"><label for="rq-org">Company / role (optional)</label><input id="rq-org" type="text" placeholder="Recruiter, Acme Cloud"></div>' +
      '<div class="fld"><label for="rq-msg">Anything specific to see? (optional)</label><textarea id="rq-msg" rows="2"></textarea></div>' +
      '<button class="dlg-send" id="rq-send" onclick="sendReq()">Send request</button>' +
      '<div class="dlg-msg" id="rq-msg-out" role="status" aria-live="polite"></div>' +
      '<div class="dlg-alt">Prefer email? <a href="mailto:gaurav.kanere@gmail.com?subject=Access%20request">gaurav.kanere@gmail.com</a></div>' +
    "</div>";
  document.body.appendChild(ov);
  ov.addEventListener("click", function (e) { if (e.target === ov) closeReq(); });
}
function openReq() {
  buildReqDialog();
  el("req-ov").classList.add("open");
  document.body.style.overflow = "hidden";
  setTimeout(function () { el("rq-name").focus(); }, 40);
}
function closeReq() {
  var ov = el("req-ov");
  if (ov) ov.classList.remove("open");
  document.body.style.overflow = "";
}
function sendReq() {
  var name = el("rq-name").value.trim();
  var email = el("rq-email").value.trim();
  var org = el("rq-org").value.trim();
  var msg = el("rq-msg").value.trim();
  var out = el("rq-msg-out");
  var btn = el("rq-send");

  if (!name || !email) { out.className = "dlg-msg err"; out.textContent = "Add your name and email so I know where to send the details."; return; }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { out.className = "dlg-msg err"; out.textContent = "That email address looks incomplete - check it and try again."; return; }

  if (!REQUEST_ENDPOINT) {
    var body = "Name: " + name + "\nEmail: " + email + "\nCompany/role: " + (org || "-") + "\nNotes: " + (msg || "-");
    window.location.href = "mailto:gaurav.kanere@gmail.com?subject=" +
      encodeURIComponent("Access request - " + name) + "&body=" + encodeURIComponent(body);
    out.className = "dlg-msg ok"; out.textContent = "Opening your mail app to send the request.";
    return;
  }

  btn.disabled = true; btn.textContent = "Sending..."; out.className = "dlg-msg"; out.textContent = "";
  fetch(REQUEST_ENDPOINT, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: name, email: email, org: org, message: msg }),
  })
    .then(function (r) { if (!r.ok) throw new Error("bad status"); out.className = "dlg-msg ok"; out.textContent = "Request sent. I will start the environment and email " + email + " shortly."; btn.textContent = "Request sent"; })
    .catch(function () { out.className = "dlg-msg err"; out.innerHTML = 'That did not go through. Email me directly at <a href="mailto:gaurav.kanere@gmail.com">gaurav.kanere@gmail.com</a>.'; btn.disabled = false; btn.textContent = "Send request"; });
}

document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeReq(); });

/* ---------- boot ---------- */
function init() {
  renderHero();
  renderText();
  renderSkills();
  renderProjects();
  renderExperience();
  renderEducation();
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
