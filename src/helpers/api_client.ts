async function makeMultipleAPICalls(endpoints: Array<{url: string, options: RequestInit}>) {
  const promises = endpoints.map((endpoint) => makeAPICall(endpoint.url, endpoint.options));
  const responses = await Promise.all(promises);
  return responses;
}

async function makeAPICall(url: string, options: RequestInit) {
  const response = await fetch(url, options);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
}

const apiClient = { makeAPICall, makeMultipleAPICalls };

export default apiClient;