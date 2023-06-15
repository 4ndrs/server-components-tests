const AsyncFetch = async () => {
  await new Promise((resolve) => setTimeout(resolve, 4000));

  const data = await (
    await fetch("https://api.github.com/repos/tanstack/react-query")
  ).json();

  return (
    <>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
    </>
  );
};

export default AsyncFetch;
