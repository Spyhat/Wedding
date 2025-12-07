import fetch from "node-fetch";

const TOKEN = process.env.GITHUB_TOKEN;
const REPO = process.env.GITHUB_REPOSITORY; // 自动获取 owner/repo
const ISSUE_NUMBER = process.env.ISSUE_NUMBER;

// 示例：获取 Issue 评论列表
async function getComments() {
  const res = await fetch(`https://api.github.com/repos/${REPO}/issues/${ISSUE_NUMBER}/comments`, {
    headers: { Authorization: `token ${TOKEN}`, 'Accept':'application/vnd.github.v3+json' }
  });
  return await res.json();
}

// 示例：新增评论
async function addComment(body) {
  await fetch(`https://api.github.com/repos/${REPO}/issues/${ISSUE_NUMBER}/comments`, {
    method: 'POST',
    headers: { Authorization: `token ${TOKEN}`, 'Accept':'application/vnd.github.v3+json', 'Content-Type':'application/json' },
    body: JSON.stringify({ body })
  });
}

// 示例调用
(async ()=>{
  const comments = await getComments();
  console.log("现有留言数:", comments.length);
  await addComment(`测试留言 —— 来自 Actions`);
})();
