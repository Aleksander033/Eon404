(async function () {
  const key = localStorage.getItem("tm_key");

  if (!key) {
    document.documentElement.innerHTML = `
      <h1 style="text-align:center;margin-top:100px;font-family:sans-serif;">
        Access denied
      </h1>
    `;
    throw new Error("No key found");
  }

  try {
    const response = await fetch("https://morning-math-bdd6.aleksanderlleshaj33.workers.dev/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ key })
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      document.documentElement.innerHTML = `
        <h1 style="text-align:center;margin-top:100px;font-family:sans-serif;">
          Invalid key
        </h1>
      `;
      throw new Error(data.error || "Invalid key");
    }

    const script = document.createElement("script");
    script.src = "bundle.js"; // ndrshoje nese scripti kryesor ka emer tjeter
    script.defer = true;

    script.onerror = function () {
      document.documentElement.innerHTML = `
        <h1 style="text-align:center;margin-top:100px;font-family:sans-serif;">
          Script failed to load
        </h1>
      `;
    };

    document.head.appendChild(script);
  } catch (error) {
    console.error("Verification error:", error);
    document.documentElement.innerHTML = `
      <h1 style="text-align:center;margin-top:100px;font-family:sans-serif;">
        Verification failed
      </h1>
    `;
    throw error;
  }
})();
