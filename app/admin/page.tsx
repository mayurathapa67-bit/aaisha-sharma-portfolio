"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SiteContent, Work, BlogPost } from "@/lib/content";
import ImageField from "@/components/admin/ImageField";
import { TextField, TextArea, ArrayField } from "@/components/admin/Fields";

const STORAGE_KEY = "aaisha_admin_token";
const TABS = ["Overview", "Site & Profile", "Portfolio", "Blog", "Submissions"] as const;
type Tab = (typeof TABS)[number];

interface Submission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function AdminPanel() {
  const [token, setToken] = useState(
    typeof window !== "undefined"
      ? window.sessionStorage.getItem(STORAGE_KEY) ?? ""
      : ""
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("Overview");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");
  const [dirty, setDirty] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [live, setLive] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (res.ok && json.token) {
        window.sessionStorage.setItem(STORAGE_KEY, json.token);
        setToken(json.token);
        await loadContent(json.token);
      } else {
        setError("Incorrect password.");
      }
    } catch {
      setError("Network error.");
    }
  }

  async function loadContent(authToken: string = token) {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/content", {
        headers: { Authorization: `Bearer ${authToken}` },
        cache: "no-store",
      });
      if (res.ok) setContent((await res.json()) as SiteContent);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) void loadContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // submissions live feed
  useEffect(() => {
    if (!token || tab !== "Submissions" || !live) return;
    let active = true;
    const load = async () => {
      try {
        const res = await fetch("/api/submissions", { cache: "no-store" });
        if (res.ok && active) setSubmissions(await res.json());
      } catch {
        /* ignore */
      }
    };
    load();
    const t = setInterval(load, 8000);
    return () => {
      active = false;
      clearInterval(t);
    };
  }, [token, tab, live]);

  function update(fn: (c: SiteContent) => void) {
    setContent((prev) => {
      if (!prev) return prev;
      const next = structuredClone(prev);
      fn(next);
      return next;
    });
    setDirty(true);
    setSavedMsg("");
  }

  async function save() {
    if (!content) return;
    setSaving(true);
    setSavedMsg("");
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setDirty(false);
        setSavedMsg("✓ Saved & published live");
      } else {
        const j = await res.json().catch(() => ({}));
        setSavedMsg("✗ " + (j.error ?? "Save failed"));
      }
    } catch {
      setSavedMsg("✗ Network error");
    } finally {
      setSaving(false);
    }
  }

  async function removeSubmission(id: string) {
    setDeleting(id);
    try {
      await fetch(`/api/submissions?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
    } finally {
      setDeleting(null);
    }
  }

  if (!token) {
    return (
      <div className="grid min-h-[80vh] place-items-center px-6">
        <form
          onSubmit={login}
          className="w-full max-w-sm rounded-3xl border border-charcoal/10 bg-cream p-8 shadow-lg"
        >
          <h1 className="font-display text-3xl text-charcoal">Admin Access</h1>
          <p className="mt-2 text-sm text-soft">
            Enter the password to manage content.
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            aria-label="Admin password"
            className="mt-5 w-full rounded-2xl border border-charcoal/15 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-coral/30"
          />
          {error && <p className="mt-3 text-sm text-coral">{error}</p>}
          <button
            type="submit"
            className="creative-gradient mt-5 w-full rounded-full px-6 py-3 text-sm font-semibold text-charcoal"
          >
            Unlock
          </button>
        </form>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <p className="font-accent text-2xl italic text-soft">
          {loading ? "Loading your content…" : "No content available."}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-28">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-charcoal">Content Studio</h1>
          <p className="mt-1 text-sm text-soft">
            Edit text & images — changes publish live.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {dirty && (
            <span className="rounded-full bg-gold/20 px-3 py-1.5 text-xs font-medium text-charcoal">
              Unsaved changes
            </span>
          )}
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="creative-gradient rounded-full px-6 py-3 text-sm font-semibold text-charcoal transition-opacity disabled:opacity-60"
          >
            {saving ? "Publishing…" : "Save & Publish"}
          </button>
        </div>
      </div>
      {savedMsg && (
        <p
          className={`mt-3 text-sm ${
            savedMsg.startsWith("✓") ? "text-teal" : "text-coral"
          }`}
        >
          {savedMsg}
        </p>
      )}

      <div className="mt-8 flex flex-wrap gap-2 border-b border-charcoal/10 pb-4">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              tab === t
                ? "bg-charcoal text-cream"
                : "border border-charcoal/15 text-soft hover:text-charcoal"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tab === "Overview" && (
          <OverviewTab content={content} setTab={setTab} />
        )}
        {tab === "Site & Profile" && (
          <SiteProfileTab
            content={content}
            token={token}
            update={update}
          />
        )}
        {tab === "Portfolio" && (
          <PortfolioTab content={content} token={token} update={update} />
        )}
        {tab === "Blog" && (
          <BlogTab content={content} token={token} update={update} />
        )}
        {tab === "Submissions" && (
          <SubmissionsTab
            submissions={submissions}
            live={live}
            setLive={setLive}
            deleting={deleting}
            onDelete={removeSubmission}
          />
        )}
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-10 rounded-3xl border border-charcoal/10 bg-cream p-6 shadow-sm">
      <h2 className="mb-5 font-display text-2xl text-charcoal">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function OverviewTab({
  content,
  setTab,
}: {
  content: SiteContent;
  setTab: (t: Tab) => void;
}) {
  const stats = [
    { label: "Portfolio works", value: content.portfolio.length },
    { label: "Blog posts", value: content.blog.length },
    { label: "Services", value: content.services.length },
    { label: "Testimonials", value: content.testimonials.length },
  ];
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-3xl border border-charcoal/10 bg-cream p-6 text-center shadow-sm"
          >
            <p className="font-display text-4xl text-charcoal">{s.value}</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-soft">
              {s.label}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <button
          onClick={() => setTab("Site & Profile")}
          className="rounded-3xl border border-charcoal/10 bg-cream-deep p-6 text-left transition hover:shadow-lg"
        >
          <h3 className="font-display text-xl text-charcoal">
            Edit Site & Profile
          </h3>
          <p className="mt-1 text-sm text-soft">
            Logo text, hero copy, profile photo, bio, contact details.
          </p>
        </button>
        <button
          onClick={() => setTab("Portfolio")}
          className="rounded-3xl border border-charcoal/10 bg-cream-deep p-6 text-left transition hover:shadow-lg"
        >
          <h3 className="font-display text-xl text-charcoal">
            Manage Portfolio
          </h3>
          <p className="mt-1 text-sm text-soft">
            Add, edit or remove stories and their cover images.
          </p>
        </button>
        <button
          onClick={() => setTab("Blog")}
          className="rounded-3xl border border-charcoal/10 bg-cream-deep p-6 text-left transition hover:shadow-lg"
        >
          <h3 className="font-display text-xl text-charcoal">Manage Blog</h3>
          <p className="mt-1 text-sm text-soft">
            Add, edit or remove blog posts and images.
          </p>
        </button>
        <button
          onClick={() => setTab("Submissions")}
          className="rounded-3xl border border-charcoal/10 bg-cream-deep p-6 text-left transition hover:shadow-lg"
        >
          <h3 className="font-display text-xl text-charcoal">
            View Submissions
          </h3>
          <p className="mt-1 text-sm text-soft">
            Contact form messages, live updating.
          </p>
        </button>
      </div>
    </div>
  );
}

function SiteProfileTab({
  content,
  token,
  update,
}: {
  content: SiteContent;
  token: string;
  update: (fn: (c: SiteContent) => void) => void;
}) {
  const { hero, about, contact, nav } = content;
  return (
    <div>
      <Section title="Brand & Logo">
        <TextField
          label="Logo text (navbar + footer)"
          value={nav.logo}
          onChange={(v) => update((c) => (c.nav.logo = v))}
        />
      </Section>

      <Section title="Hero">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Name / Title"
            value={hero.title}
            onChange={(v) => update((c) => (c.hero.title = v))}
          />
          <TextField
            label="Role"
            value={hero.role}
            onChange={(v) => update((c) => (c.hero.role = v))}
          />
        </div>
        <TextField
          label="Tagline (kinetic headline)"
          value={hero.tagline}
          onChange={(v) => update((c) => (c.hero.tagline = v))}
        />
        <TextArea
          label="Subtitle"
          value={hero.subtitle}
          onChange={(v) => update((c) => (c.hero.subtitle = v))}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Primary CTA"
            value={hero.cta_primary}
            onChange={(v) => update((c) => (c.hero.cta_primary = v))}
          />
          <TextField
            label="Secondary CTA"
            value={hero.cta_secondary}
            onChange={(v) => update((c) => (c.hero.cta_secondary = v))}
          />
        </div>
        <ImageField
          label="Hero portrait image"
          value={hero.image}
          token={token}
          folder="aaisha-portfolio/hero"
          onChange={(url) => update((c) => (c.hero.image = url))}
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {hero.stats.map((s, i) => (
            <div key={i} className="space-y-2 rounded-xl border border-charcoal/10 p-3">
              <TextField
                label="Stat label"
                value={s.label}
                onChange={(v) =>
                  update((c) => (c.hero.stats[i].label = v))
                }
              />
              <TextField
                label="Stat value (e.g. 150+)"
                value={s.value}
                onChange={(v) => update((c) => (c.hero.stats[i].value = v))}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section title="About">
        <TextField
          label="About headline"
          value={about.headline}
          onChange={(v) => update((c) => (c.about.headline = v))}
        />
        <TextArea
          label="Bio"
          value={about.bio}
          rows={5}
          onChange={(v) => update((c) => (c.about.bio = v))}
        />
        <TextArea
          label="Philosophy / quote"
          value={about.philosophy}
          rows={3}
          onChange={(v) => update((c) => (c.about.philosophy = v))}
        />
        <ImageField
          label="About / profile photo"
          value={about.image}
          token={token}
          folder="aaisha-portfolio/about"
          onChange={(url) => update((c) => (c.about.image = url))}
        />
        <ArrayField
          label="Interests"
          value={about.interests}
          onChange={(v) => update((c) => (c.about.interests = v))}
        />
      </Section>

      <Section title="Contact">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Email"
            value={contact.email}
            onChange={(v) => update((c) => (c.contact.email = v))}
          />
          <TextField
            label="Phone"
            value={contact.phone}
            onChange={(v) => update((c) => (c.contact.phone = v))}
          />
          <TextField
            label="Location (primary)"
            value={contact.location_primary}
            onChange={(v) => update((c) => (c.contact.location_primary = v))}
          />
          <TextField
            label="Location (secondary)"
            value={contact.location_secondary}
            onChange={(v) =>
              update((c) => (c.contact.location_secondary = v))
            }
          />
          <TextField
            label="Availability"
            value={contact.availability}
            onChange={(v) => update((c) => (c.contact.availability = v))}
          />
          <TextField
            label="Response time"
            value={contact.response_time}
            onChange={(v) => update((c) => (c.contact.response_time = v))}
          />
        </div>
        <p className="text-xs font-semibold uppercase tracking-wide text-soft">
          Social links
        </p>
        {contact.socials.map((s, i) => (
          <div key={s.platform} className="grid gap-3 sm:grid-cols-2">
            <TextField
              label="Platform"
              value={s.platform}
              onChange={(v) =>
                update((c) => (c.contact.socials[i].platform = v))
              }
            />
            <TextField
              label="URL"
              value={s.url}
              onChange={(v) => update((c) => (c.contact.socials[i].url = v))}
            />
          </div>
        ))}
      </Section>
    </div>
  );
}

const CATEGORY_OPTIONS = [
  "Fiction",
  "Poetry",
  "Travel",
  "Lifestyle",
  "Essay",
  "Article",
];
const BLOG_CATEGORY_OPTIONS = [
  "Travel",
  "Lifestyle",
  "Culture",
  "Books",
  "Writing Tips",
];

function PortfolioTab({
  content,
  token,
  update,
}: {
  content: SiteContent;
  token: string;
  update: (fn: (c: SiteContent) => void) => void;
}) {
  const [editing, setEditing] = useState<Work | null>(null);

  function newWork(): Work {
    const slug = `new-story-${Date.now()}`;
    return {
      slug,
      title: "Untitled Story",
      category: "Fiction",
      excerpt: "",
      content: "",
      featured_image: "",
      published_date: new Date().toISOString().slice(0, 10),
      read_time: "5 min read",
      tags: [],
      is_published: false,
    };
  }

  function addWork() {
    const w = newWork();
    update((c) => c.portfolio.unshift(w));
    setEditing(w);
  }

  return (
    <div>
      <div className="mb-5 flex justify-end">
        <button
          type="button"
          onClick={addWork}
          className="creative-gradient rounded-full px-5 py-2.5 text-sm font-semibold text-charcoal"
        >
          + Add Story
        </button>
      </div>
      <div className="space-y-3">
        {content.portfolio.map((w) => (
          <div
            key={w.slug}
            className="flex items-center justify-between gap-4 rounded-2xl border border-charcoal/10 bg-cream p-4"
          >
            <div className="min-w-0">
              <p className="truncate font-display text-lg text-charcoal">
                {w.title}
              </p>
              <p className="text-xs text-soft">
                {w.category} · {w.published_date} ·{" "}
                {w.is_published ? "Published" : "Draft"}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setEditing(w)}
                className="rounded-full border border-charcoal/15 px-4 py-2 text-sm"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() =>
                  update((c) =>
                    c.portfolio.splice(
                      c.portfolio.findIndex((x) => x.slug === w.slug),
                      1
                    )
                  )
                }
                className="rounded-full border border-coral/30 px-4 py-2 text-sm text-coral"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {editing && (
          <EditorModal
            title="Edit Story"
            onClose={() => setEditing(null)}
          >
            <div className="space-y-4">
              <TextField
                label="Title"
                value={editing.title}
                onChange={(v) =>
                  setEditing({ ...editing, title: v })
                }
              />
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-charcoal">
                  Category
                </span>
                <select
                  value={editing.category}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      category: e.target.value as Work["category"],
                    })
                  }
                  className="w-full rounded-lg border border-charcoal/15 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-coral/30"
                >
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              <TextField
                label="Slug (URL)"
                value={editing.slug}
                onChange={(v) =>
                  setEditing({ ...editing, slug: v.replace(/\s+/g, "-") })
                }
              />
              <TextArea
                label="Excerpt"
                value={editing.excerpt}
                onChange={(v) => setEditing({ ...editing, excerpt: v })}
              />
              <TextArea
                label="Content (use blank lines for paragraphs, > for quotes, ## for headings)"
                value={editing.content}
                rows={8}
                onChange={(v) => setEditing({ ...editing, content: v })}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField
                  label="Published date"
                  value={editing.published_date}
                  onChange={(v) =>
                    setEditing({ ...editing, published_date: v })
                  }
                />
                <TextField
                  label="Read time"
                  value={editing.read_time}
                  onChange={(v) => setEditing({ ...editing, read_time: v })}
                />
              </div>
              <ArrayField
                label="Tags"
                value={editing.tags}
                onChange={(v) => setEditing({ ...editing, tags: v })}
              />
              <TextField
                label="Publication name (optional)"
                value={editing.publication_name ?? ""}
                onChange={(v) =>
                  setEditing({ ...editing, publication_name: v })
                }
              />
              <label className="flex items-center gap-2 text-sm text-charcoal">
                <input
                  type="checkbox"
                  checked={editing.is_published}
                  onChange={(e) =>
                    setEditing({ ...editing, is_published: e.target.checked })
                  }
                />
                Published (visible on site)
              </label>
              <ImageField
                label="Cover image"
                value={editing.featured_image}
                token={token}
                folder="aaisha-portfolio/works"
                onChange={(url) =>
                  setEditing({ ...editing, featured_image: url })
                }
              />
              <button
                type="button"
                onClick={() => {
                  update((c) => {
                    const i = c.portfolio.findIndex(
                      (x) => x.slug === editing.slug
                    );
                    if (i >= 0) c.portfolio[i] = editing;
                    else c.portfolio.unshift(editing);
                  });
                  setEditing(null);
                }}
                className="creative-gradient w-full rounded-full px-6 py-3 text-sm font-semibold text-charcoal"
              >
                Done
              </button>
            </div>
          </EditorModal>
        )}
      </AnimatePresence>
    </div>
  );
}

function BlogTab({
  content,
  token,
  update,
}: {
  content: SiteContent;
  token: string;
  update: (fn: (c: SiteContent) => void) => void;
}) {
  const [editing, setEditing] = useState<BlogPost | null>(null);

  function newPost(): BlogPost {
    const slug = `new-post-${Date.now()}`;
    return {
      slug,
      title: "Untitled Post",
      excerpt: "",
      content: "",
      category: "Writing Tips",
      featured_image: "",
      published_date: new Date().toISOString().slice(0, 10),
      read_time: "5 min read",
      tags: [],
    };
  }

  function addPost() {
    const p = newPost();
    update((c) => c.blog.unshift(p));
    setEditing(p);
  }

  return (
    <div>
      <div className="mb-5 flex justify-end">
        <button
          type="button"
          onClick={addPost}
          className="creative-gradient rounded-full px-5 py-2.5 text-sm font-semibold text-charcoal"
        >
          + Add Post
        </button>
      </div>
      <div className="space-y-3">
        {content.blog.map((p) => (
          <div
            key={p.slug}
            className="flex items-center justify-between gap-4 rounded-2xl border border-charcoal/10 bg-cream p-4"
          >
            <div className="min-w-0">
              <p className="truncate font-display text-lg text-charcoal">
                {p.title}
              </p>
              <p className="text-xs text-soft">
                {p.category} · {p.published_date}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setEditing(p)}
                className="rounded-full border border-charcoal/15 px-4 py-2 text-sm"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() =>
                  update((c) =>
                    c.blog.splice(
                      c.blog.findIndex((x) => x.slug === p.slug),
                      1
                    )
                  )
                }
                className="rounded-full border border-coral/30 px-4 py-2 text-sm text-coral"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {editing && (
          <EditorModal title="Edit Post" onClose={() => setEditing(null)}>
            <div className="space-y-4">
              <TextField
                label="Title"
                value={editing.title}
                onChange={(v) => setEditing({ ...editing, title: v })}
              />
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-charcoal">
                  Category
                </span>
                <select
                  value={editing.category}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      category: e.target.value as BlogPost["category"],
                    })
                  }
                  className="w-full rounded-lg border border-charcoal/15 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-coral/30"
                >
                  {BLOG_CATEGORY_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              <TextField
                label="Slug (URL)"
                value={editing.slug}
                onChange={(v) =>
                  setEditing({ ...editing, slug: v.replace(/\s+/g, "-") })
                }
              />
              <TextArea
                label="Excerpt"
                value={editing.excerpt}
                onChange={(v) => setEditing({ ...editing, excerpt: v })}
              />
              <TextArea
                label="Content"
                value={editing.content}
                rows={8}
                onChange={(v) => setEditing({ ...editing, content: v })}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField
                  label="Published date"
                  value={editing.published_date}
                  onChange={(v) =>
                    setEditing({ ...editing, published_date: v })
                  }
                />
                <TextField
                  label="Read time"
                  value={editing.read_time}
                  onChange={(v) => setEditing({ ...editing, read_time: v })}
                />
              </div>
              <ArrayField
                label="Tags"
                value={editing.tags}
                onChange={(v) => setEditing({ ...editing, tags: v })}
              />
              <ImageField
                label="Featured image"
                value={editing.featured_image}
                token={token}
                folder="aaisha-portfolio/blog"
                onChange={(url) =>
                  setEditing({ ...editing, featured_image: url })
                }
              />
              <button
                type="button"
                onClick={() => {
                  update((c) => {
                    const i = c.blog.findIndex(
                      (x) => x.slug === editing.slug
                    );
                    if (i >= 0) c.blog[i] = editing;
                    else c.blog.unshift(editing);
                  });
                  setEditing(null);
                }}
                className="creative-gradient w-full rounded-full px-6 py-3 text-sm font-semibold text-charcoal"
              >
                Done
              </button>
            </div>
          </EditorModal>
        )}
      </AnimatePresence>
    </div>
  );
}

function EditorModal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-charcoal/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="my-10 w-full max-w-2xl rounded-3xl bg-cream p-6 shadow-2xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-display text-2xl text-charcoal">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full border border-charcoal/15"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}

function SubmissionsTab({
  submissions,
  live,
  setLive,
  deleting,
  onDelete,
}: {
  submissions: Submission[];
  live: boolean;
  setLive: (v: boolean) => void;
  deleting: string | null;
  onDelete: (id: string) => void;
}) {
  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <span className="text-sm text-soft">
          {submissions.length} total · auto-refresh 8s
        </span>
        <button
          type="button"
          onClick={() => setLive(!live)}
          className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 px-4 py-2 text-sm"
        >
          <span
            className={`h-2 w-2 rounded-full ${
              live ? "animate-pulse bg-teal" : "bg-soft"
            }`}
          />
          {live ? "Live" : "Paused"}
        </button>
      </div>
      <div className="space-y-4">
        <AnimatePresence initial={false}>
          {submissions.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl border border-dashed border-charcoal/15 p-10 text-center font-accent text-xl italic text-soft"
            >
              No submissions yet.
            </motion.p>
          )}
          {submissions.map((s) => (
            <motion.div
              key={s.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="rounded-3xl border border-charcoal/10 bg-cream p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg text-charcoal">{s.name}</p>
                  <a href={`mailto:${s.email}`} className="text-sm text-coral">
                    {s.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <time className="text-xs text-soft">
                    {new Date(s.createdAt).toLocaleString()}
                  </time>
                  <button
                    type="button"
                    onClick={() => onDelete(s.id)}
                    disabled={deleting === s.id}
                    className="rounded-full border border-coral/30 px-3 py-1.5 text-xs font-medium text-coral transition hover:bg-coral hover:text-white disabled:opacity-50"
                  >
                    {deleting === s.id ? "Deleting…" : "Delete"}
                  </button>
                </div>
              </div>
              {s.subject && (
                <p className="mt-3 text-sm font-medium text-charcoal">
                  {s.subject}
                </p>
              )}
              <p className="mt-2 whitespace-pre-wrap font-body text-sm leading-relaxed text-soft">
                {s.message}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
