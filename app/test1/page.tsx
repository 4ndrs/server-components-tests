import { Suspense } from "react";

import AsyncFetch from "./components/async-fetch";
import Loading from "./components/loading";

const Test1 = () => {
  return (
    <Suspense fallback={<Loading />}>
      <AsyncFetch />
    </Suspense>
  );
};

export default Test1;
