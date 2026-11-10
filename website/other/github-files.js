import { App }      from "octokit";
import { readFile } from "node:fs/promises";

const privateKey = await readFile("/home/devon/.config/bargazlive/github-app.pem","utf8");
const app        = new App({appId:process.env.GITHUB_APP_ID,privateKey,});

async function getRepositoryFile(repo, path) {
  const installation = await app.octokit.request("GET /repos/{owner}/{repo}/installation", {owner: "DevonFG", repo,});
  const octokit      = await app.getInstallationOctokit(installation.data.id);
  const response     = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}",{owner: "DevonFG", repo, path,});
  if (response.data.type !== "file")       {throw new Error("Requested path is not a file");}
  if (response.data.encoding !== "base64") {throw new Error("Unsupported file encoding");}
  return Buffer.from(response.data.content, "base64").toString("utf8");
}
export async function getBargazBotFile(path)  {return getRepositoryFile("BargazBot", path);}
export async function getBargazLiveFile(path) {return getRepositoryFile("BargazLive", path);}
