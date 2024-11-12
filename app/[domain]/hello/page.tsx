export default async function SiteHomePage({
  params,
}: {
  params: { domain: string };
}) {
  return <div>Hello, {params.domain}</div>;
}
