# ROS 2 知识图谱演示 · Design System

沿用 `../总纲_知识图谱演示/DESIGN_SYSTEM.md` 的 Minimal / Academic / Technical / Cinematic 视觉系统。主背景仍为暖黄 `#D6BF88`，纸面节点 `#DED7CA`，深蓝正文 `#13254F`。视觉变化服务于概念关系，不作装饰。

| Token | 色值 | 此演示的语义 |
|---|---|---|
| `--bg` | `#D6BF88` | 演示背景 |
| `--paper` | `#DED7CA` | 节点与详情 |
| `--paper-soft` | `#E9E2D3` | 当前焦点 |
| `--ink` | `#13254F` | 主标题与强调 |
| `--blue` | `#163F6F` | Node / Process |
| `--teal` | `#396D80` | Callback / Composition |
| `--sky` | `#74A0BA` | Topic / Wait Set |
| `--plum` | `#624F6B` | Service / Callback Group |
| `--ochre` | `#B5855F` | 通信匹配 / Executor |
| `--sage` | `#7D8981` | 接口类型 / 优先级 |
| `--brown` | `#7D665C` | 名称 / Launch / 页角 |
| `--cyan` | `#83D0E3` | 封面环线 |

其余基础 Token（`--green`、`--wine`、`--tan`、`--gold`、`--lavender`）保留参考项目的值，仅供原有样式兼容，不添加新的颜色。边型仍以实线表示层级、虚线表示横向依赖或约束；标签文字说明语义。

字体沿用 Microsoft YaHei / Noto Sans CJK SC，标题 66 px、场景标题 31 px、详情标题 33 px、节点标题 24 px。节点只放短标题，长解释在右侧详情面板。

镜头使用 `node`、`subtree`、`all` 三种 framing。Detail 时图谱左移，给右侧 482 px 面板留空间。Camera 900 ms，卡片扩展 520 ms，出现 320 ms，边绘制 520 ms，图谱过渡 1200 ms；easing 沿用 `cubic-bezier(.16,1,.3,1)`。过渡只移动四个有明确映射的锚点；最后重写标签，随后切到独立的运行时图谱。
