import { headers } from "next/headers";

const Page = () => {
  const headersList = headers();

  return (
    <>
      <ul>
        {Array.from(headersList.entries()).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value || "{BLANK}"}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Page;
