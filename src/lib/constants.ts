export interface PartMeta {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: string;
  lessons: number;
}

export interface LessonMeta {
  title: string;
  slug: string;
  description: string;
  part: string;
  order: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedMinutes: number;
  objectives: string[];
  prerequisites: string[];
  keywords: string[];
  colabUrl?: string;
}

export const COURSE_PARTS: PartMeta[] = [
  {
    id: "00-prerequisites",
    number: 0,
    title: "先修知识",
    description: "Python 编程、NumPy、线性代数、微积分和概率统计基础",
    icon: "BookOpen",
    lessons: 5,
  },
  {
    id: "01-ml-fundamentals",
    number: 1,
    title: "机器学习基础",
    description: "理解什么是机器学习、类型、工作流程与核心概念",
    icon: "Brain",
    lessons: 6,
  },
  {
    id: "02-pytorch-basics",
    number: 2,
    title: "PyTorch 基础",
    description: "张量操作、自动微分、神经网络模块和数据加载",
    icon: "Cpu",
    lessons: 7,
  },
  {
    id: "03-supervised-learning",
    number: 3,
    title: "监督学习",
    description: "从线性回归到 Transformer 的核心算法全解析",
    icon: "Target",
    lessons: 15,
  },
  {
    id: "04-unsupervised-learning",
    number: 4,
    title: "无监督学习",
    description: "聚类、降维、自编码器与生成对抗网络",
    icon: "Network",
    lessons: 6,
  },
  {
    id: "05-advanced-topics",
    number: 5,
    title: "进阶主题",
    description: "迁移学习、注意力机制、LLM 架构与强化学习",
    icon: "Zap",
    lessons: 7,
  },
  {
    id: "06-practical-skills",
    number: 6,
    title: "实践技能",
    description: "模型部署、MLOps、超参数调优与综合项目",
    icon: "Rocket",
    lessons: 8,
  },
];

export const DIFFICULTY_CONFIG: Record<
  LessonMeta["difficulty"],
  { label: string; color: string }
> = {
  beginner: {
    label: "入门",
    color:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  intermediate: {
    label: "中级",
    color:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  advanced: {
    label: "高级",
    color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
};
