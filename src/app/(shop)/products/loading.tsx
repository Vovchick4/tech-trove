import ContentLoader from 'react-content-loader';

export function ListOfFilterLoading() {
  return (
    <ContentLoader
      className="animate-pulse"
      width={800}
      height={575}
      viewBox="0 0 800 575"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="2" ry="2" width="270" height="40" />
    </ContentLoader>
  );
}

export default function Loading() {
  return (
    <ContentLoader
      className="animate-pulse"
      width={800}
      height={575}
      viewBox="0 0 800 575"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="2" ry="2" width="321" height="403" />
      <rect x="345" y="0" rx="2" ry="2" width="321" height="403" />
      <rect x="369" y="0" rx="2" ry="2" width="321" height="403" />
    </ContentLoader>
  );
}

Loading.ListOfFilter = ListOfFilterLoading;
