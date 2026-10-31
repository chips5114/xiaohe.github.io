# 我的书房 · A Room of My Own

一个温暖的数字书房个人网站。点击手账、校园照片、奖杯、工牌、研究手稿、黑胶唱片、明信片、笔记本和相机，进入九个内容分区。

这是独立的纯静态网页，可直接部署到 GitHub Pages。访问者无需登录 GitHub 或 ChatGPT；没有后端服务、平台 SDK、外部字体或构建依赖。

## 本项目的仓库与地址

- 源码仓库：[chips5114/xiaohe.github.io](https://github.com/chips5114/xiaohe.github.io)
- 部署成功后的网站地址：<https://chips5114.github.io/xiaohe.github.io/>
- 首次启用入口：[GitHub Pages 设置](https://github.com/chips5114/xiaohe.github.io/settings/pages)，将 Source 设为 **GitHub Actions**。

当前仓库属于 `chips5114`，因此 `xiaohe.github.io` 是网址中的项目路径。

## 发布到 GitHub Pages

1. 在 GitHub 创建一个 **Public** 仓库，例如 `personal-study`。
2. 将本目录中的全部文件上传到仓库的 `main` 分支。确保 `index.html` 在仓库根目录，并保留 `assets/` 和 `.github/workflows/pages.yml`。不要把整个网站再套进一个同名文件夹。
3. 打开仓库的 **Settings → Pages → Build and deployment → Source**，选择 **GitHub Actions**。
4. 打开 **Actions → Deploy personal study → Run workflow**，选择 `main` 并运行。以后每次更新 `main`，都会自动发布。
5. 等待工作流成功，在 Pages 设置或部署记录中打开网站。

GitHub.com 的普通项目仓库通常对应：

```text
https://你的GitHub用户名.github.io/仓库名/
```

如果将仓库命名为 `你的GitHub用户名.github.io`，个人主页地址为：

```text
https://你的GitHub用户名.github.io/
```

本项目使用相对资源路径，两种地址均可使用。栏目地址形如 `/仓库名/#research`，刷新不会依赖服务端路由。

首次上传时，如果 Pages 尚未启用，第一次自动运行可能失败；完成第 3 步后重新运行即可。

如果上传界面没有保留隐藏目录 `.github`，可在仓库内用 **Add file → Create new file** 创建 `.github/workflows/pages.yml`，将本项目中的同名文件内容粘贴进去。macOS Finder 中按 `Command + Shift + .` 可以显示隐藏文件。

部署配置依据 [GitHub 官方自动发布文档](https://docs.github.com/en/get-started/start-your-journey/deploying-your-website-automatically)。无需创建或填写个人访问令牌。

## 通过 Git 上传（可选）

先在 GitHub 创建一个空的公开仓库，然后在本目录运行，替换下面的仓库地址：

```sh
git init -b main
git add .
git commit -m "Add personal study website"
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

完成后按照上面的第 3 步启用 Pages。若已有其他内容的仓库，请先克隆仓库，再复制网站文件进去；不要使用强制推送。

## 更新个人内容

编辑根目录的 `content.js`。九个分区的键名为：

| 键名 | 栏目 |
| --- | --- |
| `about` | 关于我 |
| `education` | 求学时光／本科院校 |
| `awards` | 竞赛经历 |
| `experience` | 实习经历 |
| `research` | 科研成果 |
| `interests` | 兴趣角落 |
| `highlights` | 高光时刻 |
| `notes` | 随笔手记 |
| `travel` | 旅途记录 |

目前各栏目没有填写真实个人资料。在对应栏目的 `entries: []` 中添加内容即可：

```js
entries: [
  {
    title: '替换为你的标题',
    subtitle: '替换为补充介绍',
    date: '替换为日期',
    body: ['替换为正文第一段', '替换为正文第二段'],
    tags: ['替换为标签'],
    links: [
      { label: '论文或项目链接', url: 'https://example.com' }
    ]
  }
]
```

保持现有 JavaScript 引号、方括号和逗号格式。修改 `index.html` 可以调整首页文字；修改 `style.css` 可以调整颜色、字号与布局；插画位于 `assets/`。

页面当前提供内容展示，新增随笔或游记通过修改 `content.js` 后提交到 GitHub 完成。

## 本地查看

可直接双击 `index.html` 查看。也可以在本目录启动本地预览：

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

然后访问 `http://127.0.0.1:4173/`。

## 文件结构

```text
.
├── index.html
├── style.css
├── app.js
├── content.js
├── assets/                  # 八张物件插画
├── .github/workflows/pages.yml
├── .nojekyll
├── .gitignore
└── README.md
```

支持手机布局、键盘操作、浏览器前进后退、九个栏目直达链接和午后／夜晚配色。字体使用访客设备上的宋体或衬线字体，无需访问外部字体服务。
