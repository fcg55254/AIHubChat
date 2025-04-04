# AI聊天聚合平台

## 项目简介

这是一个纯前端的AI聊天聚合平台，允许用户同时与多个AI助手对话，创建自定义智能体，提升AI使用效率。

## 主要功能

1. **聚合多个AI聊天机器人**：支持Claude、Grok、Gemini、Perplexity、Poe、ChatGPT、GenSpark、豆包、Kimi、问小白、GitHub Copilot、文心一言、通义千问等多个AI平台。

2. **多AI同时对话**：可以将同一问题同时发送给多个AI助手，比较不同AI的回答。

3. **单独使用**：可以选择单独使用任一AI聊天机器人。

4. **创建智能体**：可以创建自定义智能体，选择使用的AI模型，设置系统提示词。

5. **新标签页聊天**：聊天可以在新标签页中展开，方便用户操作。

6. **主题切换**：支持浅色、深色和跟随系统三种主题模式。

## 技术特点

- 纯前端实现，无需后端服务
- 响应式设计，适配各种设备
- 本地存储用户设置和智能体配置
- Claude风格的渐变背景和形状效果

## 本地开发

由于这是一个纯前端项目，你可以直接在浏览器中打开HTML文件进行开发和测试。

```
# 克隆仓库
git clone <仓库地址>

# 进入项目目录
cd ai-chat-aggregator

# 使用浏览器打开index.html
```

## 部署到Cloudflare Pages

1. 将代码推送到GitHub、GitLab或Bitbucket仓库

2. 登录Cloudflare账户，进入Pages部分

3. 点击"创建项目"按钮

4. 选择你的代码仓库提供商，并授权Cloudflare访问

5. 选择包含网站代码的仓库

6. 配置部署设置：
   - 构建命令：留空（静态网站无需构建）
   - 输出目录：留空（使用根目录）

7. 点击"保存并部署"

8. 部署完成后，你将获得一个`*.pages.dev`的URL

9. 可选：在Cloudflare Pages设置中绑定自定义域名

## 注意事项

- 当前版本使用模拟数据演示功能，没有实际调用AI API
- 智能体配置保存在浏览器的localStorage中
- 要实现真实AI调用，需要添加后端服务和相应API密钥

## 未来计划

- 添加真实AI API集成
- 支持更多AI模型
- 添加对话历史管理
- 支持多模态输入（图像、音频等）

## 许可证

MIT