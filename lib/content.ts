import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "@/lib/i18n";

export type CaseStudyFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  role: string;
  context: string;
  goal_metrics: string;
  discovery: string;
  options_tradeoffs: string;
  execution: string;
  results: string;
  learnings: string;
};

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags: string[];
};

export type ParsedContent<T> = {
  slug: string;
  frontmatter: T;
  body: string;
};

const root = process.cwd();

function readDirSafe(target: string): string[] {
  if (!fs.existsSync(target)) return [];
  return fs.readdirSync(target).filter((file) => file.endsWith(".mdx"));
}

function parseMdxFile<T>(filePath: string): { frontmatter: T; body: string } {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { frontmatter: data as T, body: content };
}

function byDateDesc<T extends { frontmatter: { date: string } }>(a: T, b: T): number {
  return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
}

function contentDir(locale: Locale, section: "case-studies" | "posts"): string {
  return path.join(root, "content", locale, section);
}

export function getAllCaseStudies(locale: Locale): ParsedContent<CaseStudyFrontmatter>[] {
  const dir = contentDir(locale, "case-studies");

  return readDirSafe(dir)
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const parsed = parseMdxFile<CaseStudyFrontmatter>(path.join(dir, file));
      return { slug, ...parsed };
    })
    .sort(byDateDesc);
}

export function getCaseStudyBySlug(
  locale: Locale,
  slug: string
): ParsedContent<CaseStudyFrontmatter> | null {
  const filePath = path.join(contentDir(locale, "case-studies"), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const parsed = parseMdxFile<CaseStudyFrontmatter>(filePath);
  return { slug, ...parsed };
}

export function getAllPosts(locale: Locale): ParsedContent<PostFrontmatter>[] {
  const dir = contentDir(locale, "posts");

  return readDirSafe(dir)
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const parsed = parseMdxFile<PostFrontmatter>(path.join(dir, file));
      return { slug, ...parsed };
    })
    .sort(byDateDesc);
}
