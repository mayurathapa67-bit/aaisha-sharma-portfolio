export type CategoryFilter =
  | "Fiction"
  | "Poetry"
  | "Travel"
  | "Lifestyle"
  | "Essay"
  | "Article";

export type BlogCategory =
  | "Travel"
  | "Lifestyle"
  | "Culture"
  | "Books"
  | "Writing Tips";

export interface NavLink {
  name: string;
  href: string;
}

export interface NavData {
  logo: string;
  links: NavLink[];
}

export interface Stat {
  label: string;
  value: string;
  numeric: number;
  suffix: string;
}

export interface HeroData {
  title: string;
  role: string;
  tagline: string;
  subtitle: string;
  cta_primary: string;
  cta_secondary: string;
  image: string;
  stats: Stat[];
}

export interface Milestone {
  year: string;
  milestone: string;
  story: string;
}

export interface Publication {
  title: string;
  platform: string;
  year: string;
  link: string;
}

export interface Award {
  title: string;
  year: string;
  description: string;
}

export interface AboutData {
  headline: string;
  bio: string;
  philosophy: string;
  journey: Milestone[];
  expertise: { name: string; level: number }[];
  publications: Publication[];
  awards: Award[];
  interests: string[];
  image: string;
}

export interface Work {
  slug: string;
  title: string;
  category: CategoryFilter;
  excerpt: string;
  content: string;
  featured_image: string;
  published_date: string;
  read_time: string;
  tags: string[];
  is_published: boolean;
  publication_name?: string;
  popular?: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  featured_image: string;
  published_date: string;
  read_time: string;
  tags: string[];
}

export interface Service {
  title: string;
  description: string;
  icon: string;
  price: string;
  deliverables: string[];
  timeline: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company?: string;
  avatar: string;
  rating: number;
}

export interface Social {
  platform: string;
  url: string;
}

export interface ContactData {
  email: string;
  phone: string;
  location_primary: string;
  location_secondary: string;
  socials: Social[];
  availability: string;
  response_time: string;
}

export interface SiteContent {
  nav: NavData;
  hero: HeroData;
  about: AboutData;
  portfolio: Work[];
  blog: BlogPost[];
  services: Service[];
  testimonials: Testimonial[];
  contact: ContactData;
}

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80";
const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=1000&q=80";

function buildContent(): SiteContent {
  return {
    nav: {
      logo: "Aaisha Sharma",
      links: [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Portfolio", href: "/portfolio" },
        { name: "Blog", href: "/blog" },
        { name: "Services", href: "/services" },
        { name: "Contact", href: "/contact" },
      ],
    },
    hero: {
      title: "Aaisha Sharma",
      role: "Creative Writer and Blogger",
      tagline: "Words That Breathe Life",
      subtitle:
        "Crafting stories that linger in the mind and touch the heart. From fiction to travelogues, I weave words into worlds.",
      cta_primary: "Explore My World",
      cta_secondary: "Read My Stories",
      image: HERO_IMAGE,
      stats: [
        { label: "Stories Published", value: "150+", numeric: 150, suffix: "+" },
        { label: "Words Written", value: "500K+", numeric: 500, suffix: "K+" },
        { label: "Readers Worldwide", value: "50K+", numeric: 50, suffix: "K+" },
      ],
    },
    about: {
      headline: "The Story Behind the Writer",
      bio: "I am Aaisha Sharma — a creative writer and blogger currently weaving between the salt-air coast of Manly, Sydney and the terracotta lanes of Bhaktapur, Nepal. My words are shaped by two homes: one of oceans, one of ancient courtyards. I write fiction, poetry, travelogues and quiet personal essays that try to make sense of the beautiful mess of being alive.",
      philosophy:
        "I write to make sense of the world, one story at a time. Words are not decoration — they are the breath between people, the bridge across distance, the lantern in the dark.",
      image: ABOUT_IMAGE,
      journey: [
        {
          year: "2014",
          milestone: "The First Notebook",
          story:
            "A battered school notebook filled with teenage poetry. The first time I realised a sentence could hold a whole feeling.",
        },
        {
          year: "2017",
          milestone: "First Published Story",
          story:
            "My short fiction 'Monsoon Letters' was published in a regional literary magazine. I framed the contributor copy.",
        },
        {
          year: "2019",
          milestone: "The Blog Begins",
          story:
            "I launched my blog as a quiet corner of the internet — a place to publish travel writing and essays from Nepal and beyond.",
        },
        {
          year: "2021",
          milestone: "Across the Ocean",
          story:
            "I moved to Sydney, trading Kathmandu's hills for Manly's waves. My writing grew bilingual in feeling — rooted, restless, alive.",
        },
        {
          year: "2023",
          milestone: "Full-Time Wordsmith",
          story:
            "I began writing professionally: fiction, branded storytelling, and essays for publications across two continents.",
        },
        {
          year: "2025",
          milestone: "The Masterpiece",
          story:
            "This portfolio — a living, breathing archive of everything I have written and everything I am still becoming.",
        },
      ],
      expertise: [
        { name: "Fiction Writing", level: 95 },
        { name: "Poetry & Prose", level: 92 },
        { name: "Blogging", level: 98 },
        { name: "Content Strategy", level: 88 },
        { name: "Editing & Proofreading", level: 90 },
      ],
      publications: [
        {
          title: "Monsoon Letters",
          platform: "Himal Literary Magazine",
          year: "2017",
          link: "#",
        },
        {
          title: "Salt & Sand: Travel Essays",
          platform: "The Sydney Review",
          year: "2022",
          link: "#",
        },
        {
          title: "Letters to a Quieter Self",
          platform: "Independent Chapbook",
          year: "2023",
          link: "#",
        },
        {
          title: "The Ocean Remembers",
          platform: "Cordip Blog Anthology",
          year: "2024",
          link: "#",
        },
      ],
      awards: [
        {
          title: "Best Emerging Voice",
          year: "2018",
          description:
            "Awarded by the Himalayan Writers' Collective for debut fiction.",
        },
        {
          title: "Travel Writing Finalist",
          year: "2022",
          description:
            "Shortlisted for the Oceania Travel Writing Prize for 'Salt & Sand'.",
        },
        {
          title: "Readers' Choice Blogger",
          year: "2024",
          description:
            "Voted top creative blog by readers across the APAC region.",
        },
      ],
      interests: [
        "Travel",
        "Coffee",
        "Books",
        "Nature",
        "Photography",
        "Tea Ceremonies",
        "Long Walks",
      ],
    },
    portfolio: [
      {
        slug: "the-ocean-remembers",
        title: "The Ocean Remembers",
        category: "Fiction",
        excerpt:
          "A grandmother and a granddaughter sit by the Manly shore, trading silences that say more than words ever could.",
        content:
          "The ocean does not forget. Every wave that folds against the rocks of Manly carries a name it once heard.\n\nAma sat with her knees drawn up, the salt wind lifting the grey of her hair. Behind her, the house was quiet — too quiet since Dadu left. Beside her, little Riya traced patterns in the wet sand, unaware that she was learning a language older than speech.\n\n'The sea,' Ama said at last, 'keeps our secrets so we don't have to.'\n\nAnd for the first time in months, Riya understood that grief, too, could be a kind of tide — leaving shells behind when it withdrew.",
        featured_image:
          "https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&w=1000&q=80",
        published_date: "2025-05-12",
        read_time: "6 min read",
        tags: ["fiction", "family", "ocean"],
        is_published: true,
        publication_name: "Cordip Blog Anthology",
        popular: true,
      },
      {
        slug: "monsoon-letters",
        title: "Monsoon Letters",
        category: "Poetry",
        excerpt:
          "A sequence of poems written to the rain — letters we never send but the clouds always read.",
        content:
          "Dear monsoon,\n\nYou arrived like an old lover, all thunder and forgiveness. The bougainvillea you knocked loose now floats in the courtyard like small purple confessions.\n\nI have been writing to you for years in a script the wind refuses to translate. Still, I send them —\n\none for the frog at the step,\none for the child with the paper boat,\none for the widow who listens at her window and remembers.",
        featured_image:
          "https://images.unsplash.com/photo-1428592953211-077101b2021b?auto=format&fit=crop&w=1000&q=80",
        published_date: "2025-04-02",
        read_time: "4 min read",
        tags: ["poetry", "rain", "nepal"],
        is_published: true,
        popular: true,
      },
      {
        slug: "salt-and-sand",
        title: "Salt & Sand: A Sydney Travelogue",
        category: "Travel",
        excerpt:
          "Walking the coastline from Manly to Shelly Beach, and finding a home in the rhythm of unfamiliar waves.",
        content:
          "There is a particular blue that only exists between Manly and Shelly Beach, a blue that makes you forgive the homesickness you didn't know you carried.\n\nI walked it on a Tuesday with no plan and a notebook that smelled of sunscreen. The path hugged the cliff; below, the Pacific argued gently with the rocks. A pod of surfers waited, patient as monks, for a wave worth their reverence.\n\nBy the time I reached the beach, I understood: travel is not escape. It is arrival — again and again — at the self you left behind.",
        featured_image:
          "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=1000&q=80",
        published_date: "2025-03-18",
        read_time: "8 min read",
        tags: ["travel", "sydney", "essay"],
        is_published: true,
        publication_name: "The Sydney Review",
      },
      {
        slug: "the-quiet-hour",
        title: "The Quiet Hour",
        category: "Essay",
        excerpt:
          "On the sacredness of 5am, before the world wakes, when the page is the only witness.",
        content:
          "I write at 5am. Not for productivity, but for privacy — the kind the world grants you only when it is still asleep.\n\nThe kettle sings. The streetlamp outside my window goes dim against the first grey of dawn. And in that hour, before emails and expectations, I am just a person and a sentence, negotiating the shape of a feeling.\n\nThe quiet hour is not about discipline. It is about permission — to be soft, to be unfinished, to begin again.",
        featured_image:
          "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1000&q=80",
        published_date: "2025-02-09",
        read_time: "5 min read",
        tags: ["essay", "routine", "writing"],
        is_published: true,
      },
      {
        slug: "recipes-for-grief",
        title: "Recipes for Grief",
        category: "Fiction",
        excerpt:
          "A widow teaches her neighbour to cook the dishes her husband loved, and together they reheato a life.",
        content:
          "Grief, Mrs. Kapoor said, is best cooked slow. 'You cannot rush the onion. You cannot rush the remembering.'\n\nThe neighbour came every Thursday with empty tiffins and fuller hearts. They fried cumin until the kitchen remembered what happiness smelled like. They laughed, sometimes, around the edges of the silence.\n\nBy winter, the tiffins were full and so, in a small way, were they.",
        featured_image:
          "https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=1000&q=80",
        published_date: "2025-01-22",
        read_time: "7 min read",
        tags: ["fiction", "love", "food"],
        is_published: true,
      },
      {
        slug: "a-field-guide-to-staying",
        title: "A Field Guide to Staying",
        category: "Article",
        excerpt:
          "Published thoughts on why the act of remaining — in a place, a relationship, a craft — is the bravest plot we write.",
        content:
          "We romanticise leaving. The plane, the leap, the new city. But staying — staying through the boring Tuesdays and the grey months — is its own kind of courage.\n\nThis piece is a field guide: how to notice, how to tend, how to let a place become a home instead of a sentence you are waiting to finish.",
        featured_image:
          "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1000&q=80",
        published_date: "2024-11-30",
        read_time: "6 min read",
        tags: ["article", "reflection"],
        is_published: true,
        publication_name: "The Slow Journal",
      },
      {
        slug: "poem-for-the-commute",
        title: "Poem for the Commute",
        category: "Poetry",
        excerpt:
          "For everyone who has fallen in love with a stranger's book cover on the 7:14 train.",
        content:
          "The woman opposite me reads Rilke\nand the train becomes a cathedral.\n\nI pretend to look at my phone\nbut I am praying at the altar of her page.\n\nSomewhere between Central and the coast\nshe laughs — a small, private miracle —\nand for one stop, the whole carriage\nis in love with the same invisible thing.",
        featured_image:
          "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=1000&q=80",
        published_date: "2024-10-14",
        read_time: "3 min read",
        tags: ["poetry", "daily life"],
        is_published: true,
      },
      {
        slug: "the-art-of-the-unfinished",
        title: "The Art of the Unfinished",
        category: "Essay",
        excerpt:
          "Why the drafts we abandon are not failures but compost for the work that finally blooms.",
        content:
          "My drawer is full of beginnings. Opening lines with no middle. Characters who never learned to want anything.\n\nBut the unfinished is not the opposite of the finished. It is the soil. Every abandoned page feeds the next one that, against the odds, decides to live.\n\nWrite badly. Write onward. The art was never in the perfect sentence. It was in the refusal to stop.",
        featured_image:
          "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=80",
        published_date: "2024-09-03",
        read_time: "5 min read",
        tags: ["essay", "craft"],
        is_published: true,
      },
    ],
    blog: [
      {
        slug: "why-i-write-at-5am",
        title: "Why I Write at 5am (and You Might Too)",
        excerpt:
          "The case for the quiet hour — and a few practical rituals that make the blank page less terrifying.",
        content:
          "People ask me constantly: how do you find time to write? The honest answer is that I steal it, gently, before the world is awake.\n\nHere is the ritual that works for me: a kettle, a single candle, and a rule that the first sentence is allowed to be bad. The page is not a stage. It is a friend.\n\nIf you are starting out, begin smaller than you think. Ten minutes. One true sentence. The rest will follow like a tide.",
        category: "Writing Tips",
        featured_image:
          "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=80",
        published_date: "2025-06-01",
        read_time: "5 min read",
        tags: ["writing", "routine", "habits"],
      },
      {
        slug: "manly-to-bhaktapur",
        title: "Manly to Bhaktapur: Two Homes, One Heart",
        excerpt:
          "What living on two opposite sides of the world taught me about belonging.",
        content:
          "One morning I wake to the cry of gulls; another, to temple bells. Both are home. Both are mine.\n\nLiving between Sydney and Nepal is a lesson in contradiction — and a gift. The ocean teaches me breadth; the courtyards teach me depth. I carry both in every paragraph I write.",
        category: "Lifestyle",
        featured_image:
          "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80",
        published_date: "2025-05-20",
        read_time: "7 min read",
        tags: ["life", "travel", "identity"],
      },
      {
        slug: "coffee-as-a-love-language",
        title: "Coffee as a Love Language",
        excerpt:
          "A short, warm meditation on the cafés that became chapters in my life.",
        content:
          "There is a café in Manly where the barista knows my order by heart, and one in Thimi where the chai comes in a clay cup that warms your palms like an apology.\n\nCoffee, for me, is never really about caffeine. It is about the pause — the small ceremony of being cared for by a stranger for the length of a cup.",
        category: "Culture",
        featured_image:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80",
        published_date: "2025-04-28",
        read_time: "4 min read",
        tags: ["coffee", "culture", "ritual"],
      },
      {
        slug: "books-that-raised-me",
        title: "The Books That Raised Me",
        excerpt:
          "Five books that did the parenting my parents couldn't, and what each one gave me.",
        content:
          "We talk about role models as if they must be people. Half of mine were paper.\n\nFrom Woolf I learned the sentence could think. From Murakami I learned the sentence could dream. From my grandmother's dog-eared copy of the Ramayana I learned a story could hold a whole cosmology.\n\nHere are the five that raised me, and the lines I still carry.",
        category: "Books",
        featured_image:
          "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1000&q=80",
        published_date: "2025-03-15",
        read_time: "6 min read",
        tags: ["books", "reading", "influence"],
      },
      {
        slug: "a-weekend-in-thimi",
        title: "A Weekend in Thimi",
        excerpt:
          "Pottery, prayer flags, and the slow art of doing almost nothing beautifully.",
        content:
          "Thimi moves at the speed of clay. On a weekend visit, I watched a potter's wheel turn for an hour and called it productivity.\n\nThere is a lesson in that wheel — that some things are made by staying, not by rushing. The bowls he shaped will outlast the afternoon. So, maybe, will the calm.",
        category: "Travel",
        featured_image:
          "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=80",
        published_date: "2025-02-26",
        read_time: "5 min read",
        tags: ["nepal", "travel", "slow living"],
      },
      {
        slug: "overcoming-blank-page",
        title: "Overcoming the Blank Page (Without Magic)",
        excerpt:
          "Practical, unpretentious advice for the days the words simply will not come.",
        content:
          "The blank page is not your enemy; it is just empty. Here is what I do when it mocks me:\n\n1. Lower the stakes. Write the worst sentence you can.\n2. Change the medium. Pen instead of laptop.\n3. Walk. Let the problem simmer in the subconscious.\n\nNone of it is magic. All of it works, eventually, because showing up is most of the craft.",
        category: "Writing Tips",
        featured_image:
          "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=80",
        published_date: "2025-01-30",
        read_time: "4 min read",
        tags: ["writing", "block", "tips"],
      },
    ],
    services: [
      {
        title: "Creative Writing",
        description:
          "Original fiction, short stories, and poetry crafted to your brief — voice, tone, and world, built from scratch.",
        icon: "pen",
        price: "From $120 / piece",
        deliverables: [
          "Original fiction or poetry",
          "1–2 rounds of revisions",
          "Full commercial rights",
          "Formatted manuscript",
        ],
        timeline: "1–2 weeks",
      },
      {
        title: "Blog & Content Creation",
        description:
          "Engaging blog posts and articles that sound like a human, not a robot — researched, warm, and shareable.",
        icon: "blog",
        price: "From $90 / post",
        deliverables: [
          "SEO-aware long-form post",
          "Custom tone of voice",
          "Source research",
          "Meta description + title",
        ],
        timeline: "3–5 days",
      },
      {
        title: "Copywriting & Brand Story",
        description:
          "Brand narratives, about pages, and campaigns that turn businesses into stories people remember.",
        icon: "sparkle",
        price: "From $200 / project",
        deliverables: [
          "Brand voice guide",
          "About & story copy",
          "Campaign taglines",
          "Landing page copy",
        ],
        timeline: "1–2 weeks",
      },
      {
        title: "Editing & Proofreading",
        description:
          "Line editing, structural feedback, and a final polish so your words land exactly as intended.",
        icon: "edit",
        price: "From $45 / 1k words",
        deliverables: [
          "Line & copy edit",
          "Tracked changes",
          "Style consistency pass",
          "Final proofread",
        ],
        timeline: "2–4 days",
      },
      {
        title: "Ghostwriting",
        description:
          "Your ideas, your name, my pen. Memoirs, thought-leadership, and long-form books written in your voice.",
        icon: "ghost",
        price: "From $2,500 / book",
        deliverables: [
          "Interview-based drafting",
          "Chapter outlines",
          "Unlimited quiet revisions",
          "Full confidentiality",
        ],
        timeline: "4–8 weeks",
      },
      {
        title: "Content Strategy",
        description:
          "Editorial calendars, audience research, and a sustainable publishing plan that grows a loyal readership.",
        icon: "chart",
        price: "From $300 / month",
        deliverables: [
          "Editorial calendar",
          "Audience personas",
          "Content audit",
          "Monthly performance notes",
        ],
        timeline: "Ongoing",
      },
    ],
    testimonials: [
      {
        quote:
          "Aaisha turned our bland 'about' page into a story our customers actually read aloud. Magic, honestly.",
        name: "Priya N.",
        role: "Founder",
        company: "Loom & Co.",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
        rating: 5,
      },
      {
        quote:
          "Her travel writing made me book a ticket to Nepal the same night. That is the power of her sentences.",
        name: "James O.",
        role: "Reader",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
        rating: 5,
      },
      {
        quote:
          "Working with Aaisha on my memoir was the easiest creative decision I ever made. She heard me.",
        name: "Marguerite L.",
        role: "Author",
        company: "Indie Press",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
        rating: 5,
      },
      {
        quote:
          "The most reliable, most poetic freelancer we have worked with. Our blog finally has a soul.",
        name: "Daniel K.",
        role: "Editor",
        company: "The Sydney Review",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
        rating: 5,
      },
    ],
    contact: {
      email: "aaisha.sharma055@gmail.com",
      phone: "+61 482 075 123",
      location_primary: "Sydney, Manly",
      location_secondary: "Bhaktapur, Thimi, Nepal",
      socials: [
        { platform: "Instagram", url: "https://instagram.com/" },
        { platform: "Twitter", url: "https://twitter.com/" },
        { platform: "LinkedIn", url: "https://linkedin.com/" },
        { platform: "Goodreads", url: "https://goodreads.com/" },
      ],
      availability: "Available for projects",
      response_time: "I typically respond within 24–48 hours",
    },
  };
}

const CONTENT: SiteContent = buildContent();

export async function getContent(): Promise<SiteContent> {
  try {
    const { getContentFromStore } = await import("./content-store");
    return await getContentFromStore();
  } catch {
    return CONTENT;
  }
}

export function getContentSync(): SiteContent {
  return CONTENT;
}

export function getWork(slug: string, source?: SiteContent): Work | undefined {
  const data = source ?? CONTENT;
  return data.portfolio.find((w) => w.slug === slug && w.is_published);
}

export function getBlogPost(slug: string, source?: SiteContent): BlogPost | undefined {
  const data = source ?? CONTENT;
  return data.blog.find((b) => b.slug === slug);
}

export function getPublishedWorks(source?: SiteContent): Work[] {
  const data = source ?? CONTENT;
  return Array.isArray(data.portfolio)
    ? data.portfolio.filter((w) => w.is_published)
    : [];
}

export function getBlogPosts(source?: SiteContent): BlogPost[] {
  const data = source ?? CONTENT;
  return Array.isArray(data.blog) ? data.blog : [];
}
