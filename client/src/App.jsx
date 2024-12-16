import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="h-screen border flex justify-center items-center">
      <h1 className="text-3xl font-bold">Loomin</h1>
    </div>
  );
}

export default App;
