import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

type Props = {
  source: string;
};

export function MdxContent({ source }: Props) {
  return (
    <article className="content">
      <MDXRemote source={source} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
    </article>
  );
}
