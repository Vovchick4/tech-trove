import dynamic from 'next/dynamic';

const DynamicScriptComponent = dynamic(
  () => import('./dynamic-script'),
  {
    loading: () => <p>Loading...</p>,
    ssr: false, // Prevents the component from being server-side rendered
  }
);

export default DynamicScriptComponent;