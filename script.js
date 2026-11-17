const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

// localStorage can throw (private mode), so every call goes through here
const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
};

// English lives in the HTML. Only Arabic and the form messages are kept here.
const ar = {
  n1: "العلاج", n2: "النتائج", n3: "الأطباء", n4: "أسئلة", book: "احجز زيارة",
  h1: "ابتسامة من القلب.",
  hp: "فحوصات وتبييض وتقويم وزراعة أسنان لكل العائلة، كل ذلك تحت سقف واحد.",
  hb2: "شاهد الأسعار", badge: "مواعيد في نفس اليوم، من السبت إلى الخميس",
  s_t: "العلاجات وأسعار البداية", s_p: "تحصل على السعر الدقيق بعد الفحص، مكتوبًا، وقبل بدء أي علاج.",
  s1t: "تبييض الأسنان", s1d: "زيارة واحدة تستغرق نحو ساعة. لطيف على المينا.", s1p: "من 1,500 جنيه",
  s2t: "التقويم والمصففات الشفافة", s2d: "مصففات شفافة أو تقويم معدني، نخطط له معك.", s2p: "من 15,000 جنيه",
  s3t: "زراعة الأسنان", s3d: "بديل طبيعي المظهر للسن المفقود.", s3p: "من 12,000 جنيه للسن",
  r_t: "هكذا تبدو ابتسامة بعد التجميل", r_p: "اسحب المقبض أو استخدم أسهم لوحة المفاتيح.", bef: "قبل", aft: "بعد",
  t_t: "أطباؤك",
  d1: "د. سارة أحمد", d1r: "تجميل الأسنان", d2: "د. عمر حسن", d2r: "تقويم الأسنان", d3: "د. ليلى مصطفى", d3r: "أسنان الأطفال",
  v_t: "ماذا يقول المرضى",
  v1: "\"تجنبت أطباء الأسنان لسنوات. شرحت لي د. سارة كل خطوة ولم أشعر بشيء.\"", v1n: "منى أ.، تبييض",
  v2: "\"السعر المكتوب في خطتي هو ما دفعته. لا بنود إضافية في الفاتورة.\"", v2n: "كريم ح.، زراعة",
  v3: "\"حجزت صباحًا وجلست على الكرسي بعد الظهر.\"", v3n: "نور س.، فحص",
  f_t: "قبل أن تحجز",
  q1: "هل سيؤلمني العلاج؟", a1: "نستخدم تخديرًا موضعيًا ونسير بالسرعة التي تناسبك. قل لنا توقف فنتوقف.",
  q2: "كم تكلفة الفحص الأول؟", a2: "لا شيء. الفحص الأول والاستشارة مجانيان للمرضى الجدد.",
  q3: "هل تقبلون التأمين؟", a3: "نعم، معظم الشركات الكبرى. اتصل بنا بخطتك وسنتحقق منها قبل زيارتك.",
  c_t: "اختر يومًا ووقتًا", c_p: "نؤكد الموعد بالهاتف خلال ساعة.",
  l1: "الاسم الكامل", l2: "الهاتف", l3: "العلاج", l4: "اليوم", l5: "الوقت",
  s0: "فحص (مجاني)", send: "اطلب الموعد",
  fd: "رعاية أسنان للعائلة في الإسكندرية.", fa: "زيارتنا", fad: "الإسكندرية، مصر",
  fh: "من السبت إلى الخميس، 10 صباحًا حتى 9 مساءً", fc: "التواصل",
  rights: "© 2026 أسترا لطب الأسنان. مشروع تجريبي وليست عيادة حقيقية.",
  cr: "تريد موقعًا مثل هذا؟ راسل المطور",
  mapbtn: "اعرض الخريطة", g_t: "داخل العيادة", fv_t: "زيارتك الأولى",
  fv1b: "نتحدث قبل أي شيء.", fv1: "أخبرنا بما يزعجك وبما يقلقك. عشر دقائق، ولا كرسي بعد.",
  fv2b: "ثم فحص لطيف.", fv2: "أشعة فقط إذا احتجنا إليها. لا يبدأ شيء دون موافقتك.",
  fv3b: "تغادر ومعك خطة.", fv3: "مكتوبة مع الأسعار. قرر في البيت، لا استعجال.",
  vi_t: "زرنا", hr1: "من السبت إلى الخميس", hr2: "الجمعة", closed: "مغلق",
  callb: "اتصل بالعيادة", call: "اتصل", wa: "واتساب",
  o_open: "مفتوح الآن حتى 9 مساءً", o_today: "مغلق الآن. نفتح اليوم 10 صباحًا",
  o_tom: "مغلق الآن. نفتح غدًا 10 صباحًا", o_sat: "مغلق الآن. نفتح السبت 10 صباحًا",
  m_name: "اكتب اسمك الكامل.", m_phone: "اكتب رقم هاتف صحيحًا.", m_date: "اختر اليوم من اليوم فصاعدًا.",
  consent: "أوافق على التواصل معي بخصوص هذا الطلب. <a href=\"privacy.html\">الخصوصية وملفات الارتباط</a>", privlink: "الخصوصية وملفات الارتباط", m_consent: "ضع علامة في المربع للموافقة.",
  m_slot: "اختر وقتًا.", m_ok: "نموذج تجريبي: لم يُرسل شيء. في الموقع الحقيقي يصل الطلب إلى العيادة."
};
const en = {
  o_open: "Open now, until 9 pm", o_today: "Closed now. Opens today at 10 am",
  o_tom: "Closed now. Opens tomorrow at 10 am", o_sat: "Closed now. Opens Saturday at 10 am",
  m_name: "Enter your full name.", m_phone: "Enter a valid phone number.", m_date: "Pick today or a later day.",
  m_consent: "Please tick the box to agree.",
  m_slot: "Pick a time.", m_ok: "Demo form: nothing was sent. On the live site this reaches the clinic."
};

let lang = store.get("lang") === "ar" ? "ar" : "en";
const t = k => (lang === "ar" ? ar : en)[k];

// remember the English text from the HTML so we can switch back
$$("[data-i18n]").forEach(el => { el.dataset.en = el.innerHTML; });

function setLang(l) {
  lang = l;
  document.documentElement.lang = l;
  document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
  $$("[data-i18n]").forEach(el => { el.innerHTML = l === "ar" ? ar[el.dataset.i18n] : el.dataset.en; });
  $("#langBtn").textContent = l === "ar" ? "EN" : "ع";
  updateOpen();
  store.set("lang", l);
}
$("#langBtn").addEventListener("click", () => setLang(lang === "ar" ? "en" : "ar"));
setLang(lang);

// theme: saved choice first, then the visitor's system setting
const saved = store.get("theme");
document.body.classList.toggle("dark", saved ? saved === "dark" : matchMedia("(prefers-color-scheme: dark)").matches);
$("#themeBtn").addEventListener("click", () => {
  const dark = document.body.classList.toggle("dark");
  store.set("theme", dark ? "dark" : "light");
});

$("#burger").addEventListener("click", () => $("#nav").classList.toggle("open"));
$$("#nav a").forEach(a => a.addEventListener("click", () => $("#nav").classList.remove("open")));

// before/after: the range input sits invisibly on top, so touch, mouse and keyboard all work
const range = $("#baRange");
function moveSlider() {
  const v = range.value;
  $("#beforeImg").style.clipPath = `inset(0 ${100 - v}% 0 0)`;
  $("#baLine").style.left = v + "%";
}
range.addEventListener("input", moveSlider);

const today = new Date().toISOString().slice(0, 10);
$("#dt").min = today;

$("#form").addEventListener("submit", e => {
  e.preventDefault();
  const msg = $("#msg");
  const name = $("#nm").value.trim();
  const phone = $("#ph").value.replace(/[\s()-]/g, "");
  const day = $("#dt").value;
  let err = "";
  if (name.length < 3) err = "m_name";
  else if (!/^\+?\d{10,14}$/.test(phone)) err = "m_phone";
  else if (!day || day < today) err = "m_date";
  else if (!$("input[name=slot]:checked")) err = "m_slot";
  else if (!$("#ok").checked) err = "m_consent";
  msg.classList.toggle("bad", !!err);
  msg.textContent = t(err || "m_ok");
  if (!err) e.target.reset();
});

// "open now" uses Cairo time, not the visitor's clock. Clinic is closed on Fridays.
function updateOpen() {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "Africa/Cairo", weekday: "short", hour: "numeric", hour12: false }).formatToParts(new Date());
  const get = type => parts.find(p => p.type === type).value;
  const day = get("weekday"), hour = +get("hour") % 24;
  const openDay = day !== "Fri";
  let key;
  if (openDay && hour >= 10 && hour < 21) key = "o_open";
  else if (openDay && hour < 10) key = "o_today";
  else key = day === "Thu" ? "o_sat" : "o_tom";
  $("#openTxt").textContent = t(key);
  $("#openNow").classList.toggle("on", key === "o_open");
}

// if a gallery photo fails to load, drop it instead of showing a broken icon
$$(".gal img").forEach(img => {
  const drop = () => img.remove();
  img.addEventListener("error", drop);
  if (img.complete && img.naturalWidth === 0) drop();
});

// the map loads only on click, so Google's scripts and cookies stay off the first page load
$("#mapBtn").addEventListener("click", () => {
  const f = document.createElement("iframe");
  f.title = "Map of Alexandria";
  f.src = "https://www.google.com/maps?q=Alexandria,Egypt&output=embed";
  $("#mapBox").replaceChildren(f);
});