/* Find Partner - Frontend-only demo logic
   - stores posts in localStorage (key: shu_feed_posts)
   - highlights posts that match user's saved location (localStorage key: shu_profile_location)
   - has filters, sample posts, toast notifications
*/

// ===== helpers =====
const STORAGE_KEY = "shu_feed_posts";
const PROFILE_KEY = "shu_profile"; // { name, email, location }

function nowISO() {
  return new Date().toISOString();
}

function readPosts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("readPosts parse error", e);
    return [];
  }
}

function savePosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

function getProfile() {
  // try real saved profile first (profile page)
  const p = localStorage.getItem(PROFILE_KEY);
  if (p) return JSON.parse(p);
  // fallback to userEmail & userName stored during login
  const email = localStorage.getItem("userEmail");
  const name = localStorage.getItem("userName") || "";
  return { email: email || "", name: name || "", location: "" };
}

function toast(msg, timeout = 3000) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), timeout);
}

// ===== boot sample data if empty =====
function ensureSamplePosts() {
  const posts = readPosts();
  if (posts.length === 0) {
    const sample = [
      {
        id: "s1",
        name: "Sara Ahmed",
        email: "sara@shu.edu.pk",
        role: "driver",
        pickup: "Gulshan-e-Iqbal",
        destination: "SHU Campus",
        date: null,
        time: "08:30",
        seats: 2,
        genderPref: "female",
        contact: "0300-1111111",
        note: "Can pick near NIPA. Morning rides daily.",
        createdAt: nowISO()
      },
      {
        id: "s2",
        name: "Ali Raza",
        email: "ali@shu.edu.pk",
        role: "passenger",
        pickup: "Clifton",
        destination: "SHU Campus",
        date: null,
        time: "09:00",
        seats: 1,
        genderPref: "any",
        contact: "0300-2222222",
        note: "Need ride Mon-Fri.",
        createdAt: nowISO()
      }
    ];
    savePosts(sample);
  }
}

// ===== render feed =====
function createCard(post, userLocation) {
  const card = document.createElement("article");
  card.className = "feed-card";
  if (userLocation && userLocation.trim() !== "" && post.pickup.toLowerCase().includes(userLocation.toLowerCase())) {
    card.classList.add("highlight");
  }

  const roleBadge = document.createElement("div");
  roleBadge.className = "role-badge";
  roleBadge.innerHTML = `<span class="badge">${post.role === "driver" ? "Driver" : "Passenger"}</span>`;
  card.appendChild(roleBadge);

  const h = document.createElement("h4");
  h.textContent = `${post.pickup} → ${post.destination}`;
  card.appendChild(h);

  const who = document.createElement("p");
  who.innerHTML = `<strong>${post.name}</strong> · ${post.email}`;
  card.appendChild(who);

  const meta = document.createElement("div");
  meta.className = "feed-meta";
  if (post.time) meta.appendChild(Object.assign(document.createElement("div"), { textContent: `⏰ ${post.time}` }));
  if (post.date) meta.appendChild(Object.assign(document.createElement("div"), { textContent: `📅 ${post.date}` }));
  if (post.seats) meta.appendChild(Object.assign(document.createElement("div"), { textContent: `Seats: ${post.seats}` }));
  meta.appendChild(Object.assign(document.createElement("div"), { textContent: `Gender: ${post.genderPref}` }));
  card.appendChild(meta);

  const p = document.createElement("p");
  p.textContent = post.note || "";
  card.appendChild(p);

  const actions = document.createElement("div");
  actions.className = "feed-actions";

  const joinBtn = document.createElement("button");
  joinBtn.className = "join-btn";
  joinBtn.textContent = post.role === "driver" ? "Request Seat" : "Offer Seat";
  joinBtn.addEventListener("click", () => {
    // simple client-side "request" demo
    alert(`Request sent to ${post.name} (${post.contact || post.email}).\n\nNote: backend not connected yet.`);
  });

  const contactBtn = document.createElement("button");
  contactBtn.className = "contact-btn";
  contactBtn.textContent = post.contact ? `Call ${post.contact}` : "Contact";
  contactBtn.addEventListener("click", () => {
    // show contact info
    const msg = `${post.name} · ${post.email}` + (post.contact ? ` · ${post.contact}` : "");
    alert(msg);
  });

  actions.appendChild(joinBtn);
  actions.appendChild(contactBtn);
  card.appendChild(actions);

  return card;
}

function renderFeed(posts) {
  const container = document.getElementById("feedContainer");
  container.innerHTML = "";
  const profile = getProfile();
  const userLocation = profile.location || localStorage.getItem("userLocation") || "";

  if (!posts || posts.length === 0) {
    container.innerHTML = `<p style="padding:12px;color:#555">No posts yet. Create the first one!</p>`;
    return;
  }

  // show newest first
  posts.slice().reverse().forEach(p => {
    const card = createCard(p, userLocation);
    container.appendChild(card);
  });
}

// ===== filters =====
function applyFilters() {
  const role = document.getElementById("filterRole").value;
  const loc = document.getElementById("filterLocation").value.trim().toLowerCase();
  const gender = document.getElementById("filterGender").value;

  let posts = readPosts();
  if (role !== "all") posts = posts.filter(p => p.role === role);
  if (loc) posts = posts.filter(p => (p.pickup + " " + p.destination).toLowerCase().includes(loc));
  if (gender !== "any") posts = posts.filter(p => p.genderPref === gender);
  renderFeed(posts);
}

// ===== form handling =====
function clearForm() {
  document.getElementById("postForm").reset();
  const profile = getProfile();
  document.getElementById("posterName").value = profile.name || "";
  document.getElementById("posterEmail").value = profile.email || "";
}

function submitForm(e) {
  e.preventDefault();
  const profile = getProfile();

  const post = {
    id: "p_" + Date.now(),
    name: (document.getElementById("posterName").value || profile.name || "Anonymous").trim(),
    email: (document.getElementById("posterEmail").value || profile.email || "").trim(),
    role: document.getElementById("postRole").value,
    pickup: document.getElementById("pickup").value.trim(),
    destination: document.getElementById("destination").value.trim(),
    time: document.getElementById("time").value || null,
    date: document.getElementById("date").value || null,
    seats: Number(document.getElementById("seats").value) || null,
    genderPref: document.getElementById("genderPref").value || "any",
    contact: document.getElementById("contact").value.trim() || null,
    note: document.getElementById("note").value.trim() || "",
    createdAt: nowISO()
  };

  if (!post.pickup || !post.destination) {
    const fm = document.getElementById("formMsg");
    fm.textContent = "Please provide both pickup and destination.";
    fm.style.color = "crimson";
    return;
  }

  // save
  const posts = readPosts();
  posts.push(post);
  savePosts(posts);

  document.getElementById("formMsg").textContent = "Posted to feed!";
  document.getElementById("formMsg").style.color = "green";
  clearForm();
  renderFeed(posts);

  // highlight & notify users in same area
  const userLocation = profile.location || localStorage.getItem("userLocation");
  if (userLocation && post.pickup.toLowerCase().includes(userLocation.toLowerCase())) {
    toast(`New post near you: ${post.pickup} → ${post.destination}`);
  }
}

// ===== UI wiring =====
document.addEventListener("DOMContentLoaded", () => {
  // wire choices to form
  document.getElementById("chooseDriver").addEventListener("click", () => {
    document.getElementById("postRole").value = "driver";
    document.getElementById("formTitle").textContent = "Offer a Ride — Driver Post";
    document.getElementById("postForm").scrollIntoView({behavior:"smooth"});
  });
  document.getElementById("choosePassenger").addEventListener("click", () => {
    document.getElementById("postRole").value = "passenger";
    document.getElementById("formTitle").textContent = "Request a Ride — Passenger Post";
    document.getElementById("postForm").scrollIntoView({behavior:"smooth"});
  });

  // profile prefill from login/profile
  const profile = getProfile();
  document.getElementById("posterName").value = profile.name || "";
  document.getElementById("posterEmail").value = profile.email || "";

  // form events
  document.getElementById("postForm").addEventListener("submit", submitForm);
  document.getElementById("clearForm").addEventListener("click", clearForm);

  // filters
  document.getElementById("applyFilters").addEventListener("click", applyFilters);
  document.getElementById("resetFilters").addEventListener("click", () => {
    document.getElementById("filterRole").value = "all";
    document.getElementById("filterLocation").value = "";
    document.getElementById("filterGender").value = "any";
    renderFeed(readPosts());
  });

  // refresh & sample
  document.getElementById("refreshFeed").addEventListener("click", () => renderFeed(readPosts()));
  document.getElementById("newSample").addEventListener("click", () => {
    const posts = readPosts();
    posts.push({
      id: "s" + Date.now(),
      name: "Sample User",
      email: "sample@shu.edu.pk",
      role: Math.random()>0.5 ? "driver":"passenger",
      pickup: ["Gulshan","Clifton","North Nazimabad","DHA"][Math.floor(Math.random()*4)],
      destination: "SHU Campus",
      time: "08:00",
      seats: 2,
      genderPref: "any",
      contact: "0300-3333333",
      note: "Auto-generated sample",
      createdAt: nowISO()
    });
    savePosts(posts);
    renderFeed(posts);
  });

  // boot sample + render
  ensureSamplePosts();
  renderFeed(readPosts());
});
