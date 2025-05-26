import { useRouter } from 'next/router';
import Link from 'next/link';

const Breadcrumb = () => {
  const router = useRouter();
  const pathSegments = router.asPath.split('/').filter((segment) => segment);

  return (
    <nav className="breadcrumb">
      <ul>
        <li>
          <Link href="/">
            Strona główna
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const formattedSegment = segment.replace(/-/g, ' ');
          const url = `/${pathSegments.slice(0, index + 1).join('/')}`;

          return (
            <li key={url}>
              <span> / </span>
              <Link href={url}>
                {formattedSegment}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
