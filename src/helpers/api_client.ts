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
  } else {
    throw new Error(`Error (status code: ${response.status}): There was an issue fetching this endpoint: ${url}, please make sure the endpoint is available`);
  }
}

const apiClient = { makeAPICall, makeMultipleAPICalls };

export default apiClient;