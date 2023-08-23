import ContentLoader from 'react-content-loader';

export function ListOfFilterLoading() {
  return (
    <ContentLoader
      className="animate-pulse"
      width={250}
      height={40}
      viewBox="0 0 250 40"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="4" ry="4" width="250" height="40" />
    </ContentLoader>
  );
}

const cols = 3;
let stepCols = 0,
  stepRows = 0;
let x = 0,
  y = 0;

export default function Loading() {
  return (
    <ContentLoader
      className="animate-pulse"
      width={925}
      height={1040}
      viewBox="0 0 925 1040"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => {
        x = 314 * stepCols;
        y = 404 * stepRows; // Corrected y calculation

        stepCols++;
        if (stepCols === cols) {
          stepCols = 0;
          stepRows++;
        }

        if (x >= 925) {
          x = 0;
        } else if (y >= 1040) {
          y = 0;
        }

        return (
          <rect key={i} x={x} y={y} rx="8" ry="8" width="290" height="380" />
        );
      })}
    </ContentLoader>
  );
}

Loading.ListOfFilter = ListOfFilterLoading;
