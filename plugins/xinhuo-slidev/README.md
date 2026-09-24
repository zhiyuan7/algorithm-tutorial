# 薪火 Slidev 插件

`xinhuo-slidev` 把两项可复用 skill 和一个 Slidev MCP 连接打包在一起：

- `markdown-to-cinematic-slidev`：把一篇 Markdown 文章制作成可运行的电影式 Slidev 知识图谱演示；
- `slidev`：Slidev 的语法、布局、动画、代码展示、导出与演讲者模式参考；
- `slidev-outline`：连接正在运行的 Slidev 开发服务器，对幻灯片进行读取、修改、插入、删除、移动和导航。

## 从 GitHub marketplace 安装

先把本仓库添加为插件 marketplace：

```powershell
codex plugin marketplace add zhiyuan7/algorithm-tutorial
```

然后在 ChatGPT 桌面应用的插件目录中选择 `Algorithm Tutorial Plugins`，安装 `薪火 Slidev`。如果更新了仓库，可运行：

```powershell
codex plugin marketplace upgrade
```

如果当前 Codex CLI 还没有 `plugin marketplace` 子命令，请更新 Codex，或者使用下面的本地兼容安装脚本。

## 本地兼容安装

克隆仓库后，在仓库根目录运行：

```powershell
powershell -ExecutionPolicy Bypass -File .\plugins\xinhuo-slidev\scripts\install-local.ps1
```

脚本会把两个 skill 安装到当前用户的 `.agents/skills`，并通过 Codex CLI 注册 `slidev-outline` MCP。若同名 skill 已存在，脚本默认停止；确认需要替换时追加 `-Force`。

## 使用 MCP

`slidev-outline` 使用 Slidev 开发服务器自带的 Streamable HTTP MCP 端点。先启动需要编辑的演示：

```powershell
cd .\course-overview-slidev
pnpm install --frozen-lockfile
pnpm dev
```

保持开发服务器运行，再开启一个新的 Codex 任务。默认地址为：

```text
http://localhost:3030/__mcp
```

如果使用其他端口，需要相应调整 MCP 配置。也可以在运行中的演示里直接使用 `slidev mcp <slides.md>` 启动 STDIO MCP。

## 验证

在插件仓库中运行：

```powershell
$validator = Join-Path $env:USERPROFILE '.codex\skills\.system\plugin-creator\scripts\validate_plugin.py'
py -3.11 $validator .\plugins\xinhuo-slidev
```

插件清单、marketplace、skill 结构和 MCP 配置均应通过验证。

## 许可

插件自身采用 MIT License。随附的 `slidev` skill 来源于 `slidevjs/slidev`，其版权与 MIT 许可信息见 `THIRD_PARTY_NOTICES.md`。
