async function getRepositoryFile(repo, path) {
  const encodedPath = path.split("/").map(encodeURIComponent).join("/");

  const response = await fetch(
    `https://raw.githubusercontent.com/DevonFG/${repo}/main/${encodedPath}`,
    {
      next: {revalidate: 300},
      signal: AbortSignal.timeout(10000)
    }
  );

  if (!response.ok) {
    throw new Error(
      `Unable to load ${repo}/${path}: HTTP ${response.status}`
    );
  }

  return response.text();
}

export function getBargazBotFile(path) {
  return getRepositoryFile("BargazBot", path);
}

export function getBargazLiveFile(path) {
  return getRepositoryFile("BargazLive", path);
}