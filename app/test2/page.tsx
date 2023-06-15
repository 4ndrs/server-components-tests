import { headers, cookies } from "next/headers";

const Page = () => {
  const headersList = headers();
  const cookieStore = cookies();

  return (
    <>
      <h1 className="mb-2 text-xl font-bold">Headers</h1>
      <ul>
        {Array.from(headersList.entries()).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value || "{BLANK}"}
          </li>
        ))}
      </ul>

      <h1 className="mb-2 mt-6 text-xl font-bold">Cookies</h1>
      <ul>
        {cookieStore.getAll().map((cookie) => (
          <li key={cookie.name}>
            <strong>{cookie.name}:</strong> {cookie.value}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Page;
