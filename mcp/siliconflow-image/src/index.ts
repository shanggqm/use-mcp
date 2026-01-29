#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";

// 硅基流动 API 配置
const SILICONFLOW_API_BASE = "https://api.siliconflow.cn/v1";

// 支持的文生图模型列表
const TEXT_TO_IMAGE_MODELS = [
  {
    id: "Kwai-Kolors/Kolors",
    name: "Kolors",
    description: "快手可图文生图模型，支持中英文提示词，生成质量高",
    recommended_sizes: [
      "1024x1024",
      "960x1280",
      "768x1024",
      "720x1440",
      "720x1280",
    ],
  },
  {
    id: "stabilityai/stable-diffusion-3-5-large",
    name: "Stable Diffusion 3.5 Large",
    description: "Stability AI 最新的大型文生图模型",
    recommended_sizes: ["1024x1024", "1024x768", "768x1024"],
  },
  {
    id: "stabilityai/stable-diffusion-3-medium",
    name: "Stable Diffusion 3 Medium",
    description: "SD3 中等规模模型，平衡质量与速度",
    recommended_sizes: ["1024x1024", "1024x768", "768x1024"],
  },
  {
    id: "black-forest-labs/FLUX.1-schnell",
    name: "FLUX.1 Schnell",
    description: "FLUX 快速版本，生成速度极快",
    recommended_sizes: ["1024x1024", "1024x768", "768x1024"],
  },
  {
    id: "black-forest-labs/FLUX.1-dev",
    name: "FLUX.1 Dev",
    description: "FLUX 开发版本，质量更高",
    recommended_sizes: ["1024x1024", "1024x768", "768x1024"],
  },
];

// 定义 MCP 工具
const tools: Tool[] = [
  {
    name: "generate_image",
    description: `使用硅基流动 API 生成图片。支持多种先进的文生图模型，包括 Kolors、Stable Diffusion 3.5、FLUX.1 等。

使用前请确保已设置 SILICONFLOW_API_KEY 环境变量。

支持的模型:
${TEXT_TO_IMAGE_MODELS.map((m) => `- ${m.id}: ${m.description}`).join("\n")}`,
    inputSchema: {
      type: "object",
      properties: {
        prompt: {
          type: "string",
          description:
            "图片生成的提示词，描述你想要生成的图片内容。支持中英文。",
        },
        model: {
          type: "string",
          description: `使用的模型名称。可选值: ${TEXT_TO_IMAGE_MODELS.map((m) => m.id).join(", ")}`,
          default: "Kwai-Kolors/Kolors",
        },
        negative_prompt: {
          type: "string",
          description: "负面提示词，描述不希望出现在图片中的内容",
        },
        image_size: {
          type: "string",
          description:
            '图片尺寸，格式为 "宽x高"。推荐值: 1024x1024, 960x1280, 768x1024, 720x1440, 720x1280',
          default: "1024x1024",
        },
        batch_size: {
          type: "integer",
          description: "生成图片数量，1-4 张。仅 Kolors 模型支持",
          default: 1,
          minimum: 1,
          maximum: 4,
        },
        seed: {
          type: "integer",
          description: "随机种子，用于复现生成结果。范围: 0-9999999999",
          minimum: 0,
          maximum: 9999999999,
        },
        num_inference_steps: {
          type: "integer",
          description: "推理步数，步数越多质量越好但速度越慢。范围: 1-100",
          default: 20,
          minimum: 1,
          maximum: 100,
        },
        guidance_scale: {
          type: "number",
          description:
            "引导系数，控制生成图片与提示词的匹配程度。值越高越接近提示词，越低越有创意。范围: 0-20",
          default: 7.5,
          minimum: 0,
          maximum: 20,
        },
      },
      required: ["prompt"],
    },
  },
  {
    name: "list_image_models",
    description:
      "列出硅基流动支持的所有文生图模型及其详细信息，包括推荐的图片尺寸。",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
];

// API 调用函数
async function generateImage(params: {
  prompt: string;
  model?: string;
  negative_prompt?: string;
  image_size?: string;
  batch_size?: number;
  seed?: number;
  num_inference_steps?: number;
  guidance_scale?: number;
}): Promise<{
  success: boolean;
  images?: Array<{ url: string }>;
  seed?: number;
  inference_time?: number;
  error?: string;
}> {
  const apiKey = process.env.SILICONFLOW_API_KEY;

  if (!apiKey) {
    return {
      success: false,
      error:
        "未设置 SILICONFLOW_API_KEY 环境变量。请在环境变量中设置你的硅基流动 API Key。",
    };
  }

  const requestBody: Record<string, unknown> = {
    model: params.model || "Kwai-Kolors/Kolors",
    prompt: params.prompt,
    image_size: params.image_size || "1024x1024",
    batch_size: params.batch_size || 1,
    num_inference_steps: params.num_inference_steps || 20,
    guidance_scale: params.guidance_scale || 7.5,
  };

  if (params.negative_prompt) {
    requestBody.negative_prompt = params.negative_prompt;
  }

  if (params.seed !== undefined) {
    requestBody.seed = params.seed;
  }

  try {
    const response = await fetch(`${SILICONFLOW_API_BASE}/images/generations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage: string;

      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorJson.error || errorText;
      } catch {
        errorMessage = errorText;
      }

      return {
        success: false,
        error: `API 请求失败 (${response.status}): ${errorMessage}`,
      };
    }

    const result = (await response.json()) as {
      images: Array<{ url: string }>;
      seed?: number;
      timings?: { inference?: number };
    };

    return {
      success: true,
      images: result.images,
      seed: result.seed,
      inference_time: result.timings?.inference,
    };
  } catch (error) {
    return {
      success: false,
      error: `请求异常: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

// 创建 MCP 服务器
const server = new Server(
  {
    name: "siliconflow-image",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// 处理工具列表请求
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// 处理工具调用请求
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "generate_image": {
      const params = args as {
        prompt: string;
        model?: string;
        negative_prompt?: string;
        image_size?: string;
        batch_size?: number;
        seed?: number;
        num_inference_steps?: number;
        guidance_scale?: number;
      };

      const result = await generateImage(params);

      if (!result.success) {
        return {
          content: [
            {
              type: "text",
              text: `❌ 图片生成失败\n\n错误信息: ${result.error}`,
            },
          ],
          isError: true,
        };
      }

      const imageUrls = result.images?.map((img) => img.url).join("\n") || "";
      const responseText = `✅ 图片生成成功！

📷 生成的图片 (共 ${result.images?.length || 0} 张):
${imageUrls}

📊 生成信息:
- 随机种子: ${result.seed || "未返回"}
- 推理耗时: ${result.inference_time ? `${result.inference_time}ms` : "未返回"}

⚠️ 注意: 图片 URL 有效期为 1 小时，请及时下载保存。`;

      return {
        content: [
          {
            type: "text",
            text: responseText,
          },
        ],
      };
    }

    case "list_image_models": {
      const modelList = TEXT_TO_IMAGE_MODELS.map(
        (m) => `### ${m.name}
- **模型 ID**: \`${m.id}\`
- **描述**: ${m.description}
- **推荐尺寸**: ${m.recommended_sizes.join(", ")}`
      ).join("\n\n");

      return {
        content: [
          {
            type: "text",
            text: `# 硅基流动文生图模型列表\n\n${modelList}\n\n---\n💡 使用 \`generate_image\` 工具时，通过 \`model\` 参数指定模型 ID。`,
          },
        ],
      };
    }

    default:
      return {
        content: [
          {
            type: "text",
            text: `未知工具: ${name}`,
          },
        ],
        isError: true,
      };
  }
});

// 启动服务器
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("SiliconFlow Image MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
