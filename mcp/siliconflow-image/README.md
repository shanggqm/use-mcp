# SiliconFlow Image MCP Server

硅基流动文生图 MCP Server，支持通过 MCP 协议调用硅基流动的图片生成 API。

## 功能特性

- 🎨 **文生图**: 支持根据文本提示词生成高质量图片
- 🤖 **多模型支持**: 包括 Kolors、Stable Diffusion 3.5、FLUX.1 等多种先进模型
- 🔧 **丰富参数**: 支持负面提示词、图片尺寸、推理步数、引导系数等自定义参数
- 📋 **模型列表**: 查看所有可用模型及其详细信息

## 支持的模型

| 模型 ID                                  | 名称           | 描述                                 |
| ---------------------------------------- | -------------- | ------------------------------------ |
| `Kwai-Kolors/Kolors`                     | Kolors         | 快手可图文生图模型，支持中英文提示词 |
| `stabilityai/stable-diffusion-3-5-large` | SD 3.5 Large   | Stability AI 最新大型模型            |
| `stabilityai/stable-diffusion-3-medium`  | SD 3 Medium    | SD3 中等规模模型                     |
| `black-forest-labs/FLUX.1-schnell`       | FLUX.1 Schnell | FLUX 快速版本                        |
| `black-forest-labs/FLUX.1-dev`           | FLUX.1 Dev     | FLUX 开发版本                        |

## 安装

```bash
cd mcp/siliconflow-image
npm install
npm run build
```

## 配置

### 1. 获取 API Key

1. 访问 [硅基流动控制台](https://cloud.siliconflow.cn/)
2. 注册/登录账号
3. 在 [API 密钥页面](https://cloud.siliconflow.cn/account/ak) 创建 API Key

### 2. 设置环境变量

```bash
export SILICONFLOW_API_KEY="your-api-key-here"
```

### 3. 配置 MCP 客户端

#### Cursor 配置

在 `~/.cursor/mcp.json` 中添加:

```json
{
  "mcpServers": {
    "siliconflow-image": {
      "command": "node",
      "args": ["/path/to/mcp/siliconflow-image/dist/index.js"],
      "env": {
        "SILICONFLOW_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

#### Claude Desktop 配置

在 `~/Library/Application Support/Claude/claude_desktop_config.json` 中添加:

```json
{
  "mcpServers": {
    "siliconflow-image": {
      "command": "node",
      "args": ["/path/to/mcp/siliconflow-image/dist/index.js"],
      "env": {
        "SILICONFLOW_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

## 使用示例

### 生成图片

```
使用 generate_image 工具，提示词: "一只可爱的橘猫在阳光下打盹"
```

### 带参数生成

```
使用 generate_image 工具:
- prompt: "赛博朋克风格的未来城市夜景"
- model: "black-forest-labs/FLUX.1-schnell"
- image_size: "1024x768"
- num_inference_steps: 30
- guidance_scale: 8.0
```

### 查看可用模型

```
使用 list_image_models 工具查看所有支持的模型
```

## 工具说明

### generate_image

生成图片的主要工具。

**参数:**

| 参数                | 类型    | 必填 | 默认值             | 说明             |
| ------------------- | ------- | ---- | ------------------ | ---------------- |
| prompt              | string  | ✅   | -                  | 图片描述提示词   |
| model               | string  | ❌   | Kwai-Kolors/Kolors | 模型 ID          |
| negative_prompt     | string  | ❌   | -                  | 负面提示词       |
| image_size          | string  | ❌   | 1024x1024          | 图片尺寸         |
| batch_size          | integer | ❌   | 1                  | 生成数量 (1-4)   |
| seed                | integer | ❌   | -                  | 随机种子         |
| num_inference_steps | integer | ❌   | 20                 | 推理步数 (1-100) |
| guidance_scale      | number  | ❌   | 7.5                | 引导系数 (0-20)  |

### list_image_models

列出所有支持的文生图模型。

## 注意事项

- 生成的图片 URL 有效期为 **1 小时**，请及时下载保存
- 不同模型的计费标准不同，请参考 [硅基流动定价](https://siliconflow.cn/pricing)
- Kolors 模型对中文提示词支持较好

## 许可证

MIT
