"use client";

import {
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type SlideSpec = {
  section: string;
  title: string;
  body: ReactNode;
  className?: string;
  cover?: boolean;
};

const Accent = ({ children }: { children: ReactNode }) => (
  <span className="accent">{children}</span>
);

const PaperKeyword = ({
  children,
  tone,
}: {
  children: ReactNode;
  tone: "blue" | "orange" | "green";
}) => <mark className={`paper-keyword ${tone}`}>{children}</mark>;

const Arrow = () => (
  <span className="flow-arrow" aria-hidden="true">→</span>
);

const slides: SlideSpec[] = [
  {
    section: "计算机系硕士新生导引",
    title: "如何读懂一篇计算机论文",
    cover: true,
    body: (
      <div className="cover-copy">
        <h1>
          如何读懂一篇
          <br />
          <Accent>计算机论文</Accent>
        </h1>
        <p>面向计算机系硕士新生的论文阅读方法</p>
        <div className="cover-meta">Summer School · 2026</div>
      </div>
    ),
  },
  {
    section: "课程结构",
    title: "今天只回答三个问题",
    body: (
      <div className="agenda-grid">
        <div className="agenda-card">
          <span>1</span>
          <h2>为什么读论文？</h2>
          <p>论文阅读在硕士阶段解决什么问题？</p>
        </div>
        <div className="agenda-card">
          <span>2</span>
          <h2>不同需求，怎么读？</h2>
          <p>先确定任务，再选择阅读范围和深度。</p>
        </div>
        <div className="agenda-card">
          <span>3</span>
          <h2>如何精读一篇论文？</h2>
          <p>重建问题、方法、证据和边界。</p>
        </div>
      </div>
    ),
  },
  {
    section: "第一部分｜为什么读论文",
    title: "硕士阶段，知识不再只来自教材",
    body: (
      <div className="contrast-layout">
        <div className="contrast-panel textbook">
          <h2>教材</h2>
          <ul>
            <li>整理过的成熟知识</li>
            <li>定义和结论相对稳定</li>
            <li>问题通常有标准答案</li>
          </ul>
        </div>
        <div className="contrast-arrow"><Arrow /></div>
        <div className="contrast-panel paper">
          <h2>论文</h2>
          <ul>
            <li>正在发生的研究进展</li>
            <li>结论依赖假设和证据</li>
            <li>问题、方法和答案都可被质疑</li>
          </ul>
        </div>
        <div className="contrast-conclusion">
          你的任务从“记住结论”变为“判断结论是怎样得到的”。
        </div>
      </div>
    ),
  },
  {
    section: "第一部分｜为什么读论文",
    title: "读论文的五个常见出发点",
    body: (
      <div className="reason-grid">
        <div>
          <span>01</span>
          <h2>认识方向</h2>
          <p>建立领域地图：重要问题、技术路线与代表工作。</p>
        </div>
        <div>
          <span>02</span>
          <h2>寻找问题</h2>
          <p>从已有工作的不足、假设和失败条件中发现新问题。</p>
        </div>
        <div>
          <span>03</span>
          <h2>写作引用 / Baseline</h2>
          <p>为自己的论述提供依据，或选择可信的比较对象。</p>
        </div>
        <div>
          <span>04</span>
          <h2>学习科研与写作</h2>
          <p>学习如何定义问题、组织论证、设计实验和表达结论。</p>
        </div>
        <div>
          <span>05</span>
          <h2>审稿与评价</h2>
          <p>判断创新性、正确性、证据充分性与适用边界。</p>
        </div>
      </div>
    ),
  },
  {
    section: "第二部分｜不同需求，不同读法",
    title: "先定义阅读任务，再打开 PDF",
    body: (
      <div className="task-definition">
        <div>
          <span>1</span>
          <h2>我要回答什么问题？</h2>
          <p>了解研究方向、寻找科研问题、复现论文 Baseline，还是审稿？</p>
        </div>
        <div>
          <span>2</span>
          <h2>我能投入多少时间？</h2>
          <p>20 分钟、1 小时，还是几天？</p>
        </div>
        <div>
          <span>3</span>
          <h2>读完要留下什么？</h2>
          <p>研究方向进展、takeaways、复现方案，或者审稿意见。</p>
        </div>
        <div className="task-example">
          <b>把阅读目的写成一句可执行的问题，例如：</b>
          “这篇论文能否作为我的 Baseline？我需要比较哪些设定和指标？”
        </div>
      </div>
    ),
  },
  {
    section: "第二部分｜需求一",
    title: "了解研究方向：先建立领域地图",
    body: (
      <div className="need-layout">
        <div className="need-purpose">
          <h2>目标</h2>
          <p>快速回答这个方向在研究什么、发展到哪里、主要路线是什么。</p>
        </div>
        <ol className="need-steps">
          <li><span>1</span><p>从综述、经典工作和近年顶会论文得到代表性列表。</p></li>
          <li><span>2</span><p>快速阅读标题、摘要、引言、结论和主要图表。</p></li>
          <li><span>3</span><p>按“问题—方法—场景”分组，并梳理时间与技术脉络。</p></li>
        </ol>
        <div className="need-output">
          <b>阅读产物</b>
          <p>方向进展总结：核心问题、代表方法、最新趋势与主要空白。</p>
        </div>
      </div>
    ),
  },
  {
    section: "第二部分｜需求一示例",
    title: "领域地图示例：人工智能赋能数据库",
    className: "field-map-slide",
    body: (
      <div
        className="field-map-frame"
        aria-label="人工智能赋能数据库领域地图"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="field-map-ai4db.png"
          alt="人工智能赋能数据库领域地图，包含内核组件智能化替代、数据库自动化治理和交互方式智能化优化等分支"
        />
      </div>
    ),
  },
  {
    section: "第二部分｜需求二",
    title: "寻找科研问题：从差异和边界中找空白",
    body: (
      <div className="need-layout">
        <div className="need-purpose">
          <h2>目标</h2>
          <p>找到重要、尚未充分解决，并且有可能开展的研究问题。</p>
        </div>
        <ol className="need-steps">
          <li><span>1</span><p>围绕同一主题比较代表工作的场景（LLM推理、Agent）、假设（单机、分布式）、方法（启发式方法、学习型方法）和指标（精度、成本、效率）。</p></li>
          <li><span>2</span><p>重点阅读局限、未来工作、失败案例和相互矛盾的结果，找空白场景、空白假设、新的方法、新的指标。</p></li>
          <li><span>3</span><p>区分真正的研究缺口与单纯缺少实验，并评估可行性。</p></li>
        </ol>
        <div className="need-output">
          <b>阅读产物</b>
          <p>候选问题清单：重要性、现有缺口、初步证据与可行路径。</p>
        </div>
      </div>
    ),
  },
  {
    section: "第二部分｜需求三",
    title: "复现论文 Baseline：围绕可复现性阅读",
    body: (
      <div className="need-layout">
        <div className="need-purpose">
          <h2>目标</h2>
          <p>在一致设定下复现可信结果，为自己的实验提供参照。</p>
        </div>
        <ol className="need-steps">
          <li><span>1</span><p>锁定论文、官方代码、数据版本、评价脚本和目标结果。</p></li>
          <li><span>2</span><p>对齐预处理、模型配置、超参数、随机种子和运行流程。</p></li>
          <li><span>3</span><p>记录环境与资源，对比复现值和论文值并分析差异。</p></li>
        </ol>
        <div className="need-output">
          <b>阅读产物</b>
          <p>复现记录：代码版本、环境、配置、预期结果、实际结果与偏差。</p>
        </div>
      </div>
    ),
  },
  {
    section: "第二部分｜需求四",
    title: "审稿：按评审问题系统阅读",
    body: (
      <div className="need-layout">
        <div className="need-purpose">
          <h2>目标</h2>
          <p>判断论文的创新性、正确性、清晰度和实验证据是否充分。</p>
        </div>
        <ol className="need-steps">
          <li><span>1</span><p>用自己的话概括问题、贡献和核心主张，并定位相关工作。</p></li>
          <li><span>2</span><p>检查方法、实验设计、Baseline、指标、统计和消融。</p></li>
          <li><span>3</span><p>区分致命问题、可修正问题和表达问题，整理作者疑问。</p></li>
        </ol>
        <div className="need-output">
          <b>阅读产物</b>
          <p>结构化审稿意见：摘要、优点、缺点、问题与总体评价。</p>
        </div>
      </div>
    ),
  },
  {
    section: "第二部分｜选择阅读深度",
    title: "同一篇论文，可以有三种阅读深度",
    body: (
      <div className="mode-grid">
        <div className="mode-card">
          <h2>快速浏览</h2>
          <div className="mode-time">10–20 分钟</div>
          <p>判断是否相关、核心主张是什么。</p>
          <b>产物：三句话摘要</b>
        </div>
        <div className="mode-card featured">
          <h2>定向阅读</h2>
          <div className="mode-time">30–90 分钟</div>
          <p>围绕一个具体问题阅读相关章节。</p>
          <b>产物：问题的答案与证据</b>
        </div>
        <div className="mode-card">
          <h2>完整精读</h2>
          <div className="mode-time">数小时到数天</div>
          <p>重建论证、检查证据、理解边界。</p>
          <b>产物：一页精读总结与独立判断</b>
        </div>
      </div>
    ),
  },
  {
    section: "第二部分｜快速浏览",
    title: "第一遍：20 分钟建立全局地图",
    body: (
      <div className="first-pass">
        <div className="reading-route">
          <div><span>1</span><b>标题</b></div><Arrow />
          <div><span>2</span><b>摘要</b></div><Arrow />
          <div><span>3</span><b>引言</b></div><Arrow />
          <div><span>4</span><b>结论</b></div><Arrow />
          <div><span>5</span><b>图表</b></div>
        </div>
        <div className="first-pass-bottom">
          <div>
            <h2>读完必须能说清</h2>
            <p>问题是什么？核心想法是什么？主要结果与边界是什么？</p>
          </div>
          <div>
            <h2>继续精读的条件</h2>
            <p>与任务高度相关，或结论重要但仍有关键疑问。</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    section: "第二部分｜第一遍阅读示例：AlayaDB",
    title: "1. 标题：拆出研究对象、目标与定位",
    body: (
      <div className="alaya-title-reading">
        <div className="alaya-paper-title" lang="en">
          <b>AlayaDB:</b> The <PaperKeyword tone="blue">Data Foundation</PaperKeyword>
          <br />
          for <PaperKeyword tone="orange">Efficient and Effective</PaperKeyword>
          <br />
          <PaperKeyword tone="green">Long-context LLM Inference</PaperKeyword>
        </div>
        <div className="alaya-title-decoding">
          <div>
            <span>研究对象</span>
            <p>长上下文 LLM 推理</p>
          </div>
          <div>
            <span>作者目标</span>
            <p>同时追求效率与效果</p>
          </div>
          <div>
            <span>可能定位</span>
            <p>用数据系统承载推理基础设施</p>
          </div>
        </div>
        <div className="alaya-first-verdict">
          此时只形成一个待验证的假设：它可能用数据库方法同时优化长上下文推理的效率与效果。
        </div>
      </div>
    ),
  },
  {
    section: "第二部分｜第一遍阅读示例：AlayaDB",
    title: "2. 摘要：填出“问题—方法—证据”",
    body: (
      <div className="alaya-abstract-reading">
        <div className="alaya-abstract-grid">
          <div>
            <span>问题 / 目标</span>
            <p className="paper-clue" lang="en">“fewer hardware resources” + “higher generation quality”</p>
            <p>面对不同 SLO，希望同时减少硬件开销并保持生成质量。</p>
          </div>
          <div>
            <span>核心方法</span>
            <p className="paper-clue" lang="en">“decouples the KV cache and attention computation”</p>
            <p>把 KV cache 与 attention 从推理系统中解耦，变成数据库查询处理。</p>
          </div>
          <div>
            <span>证据类型</span>
            <p className="paper-clue" lang="en">“two use cases” + “extensive experimental results”</p>
            <p>用产业场景和基准实验说明系统有效。</p>
          </div>
        </div>
        <div className="alaya-first-verdict">
          <b>摘要后的一句话：</b>AlayaDB 把长上下文推理中的缓存与 attention，重写成一个数据库查询优化问题。
        </div>
      </div>
    ),
  },
  {
    section: "第二部分｜第一遍阅读示例：AlayaDB",
    title: "3. 引言：定位“背景—路线—缺口—方案”",
    body: (
      <div className="alaya-intro-reading">
        <div className="alaya-intro-chain">
          <div>
            <span>背景</span>
            <p>长上下文推理同时关注延迟、生成质量和 GPU 显存。</p>
          </div>
          <Arrow />
          <div>
            <span>已有路线</span>
            <p>耦合架构、KV cache 解耦、检索式稀疏 attention。</p>
          </div>
          <Arrow />
          <div className="gap">
            <span>关键缺口</span>
            <p>已有系统难以同时优化三个指标。</p>
          </div>
          <Arrow />
          <div>
            <span>论文方案</span>
            <p>新的解耦层次 + DIPR 查询 + 原生查询优化器。</p>
          </div>
        </div>
        <div className="alaya-research-question">
          <b>核心研究问题：</b>如何在满足不同工作负载 SLO 的同时，减少 GPU 显存并保持高生成质量？
        </div>
      </div>
    ),
  },
  {
    section: "第二部分｜第一遍阅读示例：AlayaDB",
    title: "4. 结论：核对作者最终声称了什么",
    body: (
      <div className="alaya-conclusion-reading">
        <div className="alaya-conclusion-grid">
          <div>
            <h2>作者最终声称</h2>
            <ul>
              <li>同时解耦 KV cache 与 attention 计算</li>
              <li>在一个向量数据库中联合优化二者</li>
              <li>满足 SLO，并兼顾资源消耗与生成质量</li>
            </ul>
          </div>
          <div>
            <h2>作者明确留下</h2>
            <ul>
              <li>分布式推理与更多并行策略</li>
              <li>支持 vLLM、SGLang 等更多推理引擎</li>
              <li>更多查询、存储层次与异构硬件优化</li>
            </ul>
          </div>
        </div>
        <div className="alaya-first-verdict">
          <b>第一遍后的边界判断：</b>论文完成了当前架构与实验验证，但分布式能力、引擎适配和硬件泛化仍待后续工作。
        </div>
      </div>
    ),
  },
  {
    section: "第二部分｜第一遍阅读示例：AlayaDB",
    title: "5. 图表：检查“系统结构—核心结果”",
    body: (
      <div className="alaya-figure-reading">
        <div className="alaya-figure-grid">
          <figure>
            <div className="alaya-figure-frame architecture">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="alayadb-system-overview.png"
                alt="AlayaDB 系统总览图，由用户接口、查询处理引擎和向量存储引擎三层组成"
              />
            </div>
            <figcaption>
              <b>Figure 3 · 系统结构</b>
              <span>三层架构与摘要中的“查询处理”主张一致。</span>
            </figcaption>
          </figure>
          <figure>
            <div className="alaya-figure-frame result">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="alayadb-quality-memory.png"
                alt="AlayaDB 论文 Figure 9，比较 DIPRS 与多种方法的生成质量和 GPU 显存使用量"
              />
            </div>
            <figcaption>
              <b>Figure 9 · 核心结果</b>
              <span>DIPRS 在示例任务中处于更高质量、较低显存区域。</span>
            </figcaption>
          </figure>
        </div>
        <div className="alaya-figure-note">
          第一遍只检查图是否支持摘要与结论；实验是否公平、结论是否充分，留到精读时再判断。
        </div>
      </div>
    ),
  },
  {
    section: "第二部分｜按论文类型调整重点",
    title: "不同类型的计算机论文，精读重点不同",
    body: (
      <div className="paper-type-grid">
        <div>
          <h2>系统 / 数据库</h2>
          <p>关键路径、瓶颈、资源开销、扩展性和真实负载。</p>
        </div>
        <div>
          <h2>机器学习 / 数据挖掘</h2>
          <p>数据、目标函数、基线、消融、方差和泛化。</p>
        </div>
        <div>
          <h2>算法 / 理论</h2>
          <p>问题定义、假设、证明骨架、复杂度和适用边界。</p>
        </div>
        <div>
          <h2>安全 / HCI</h2>
          <p>威胁模型或研究设计、现实性、偏差、伦理和外部效度。</p>
        </div>
      </div>
    ),
  },
  {
    section: "第三部分｜如何精读一篇论文",
    title: "精读的核心：重建完整论证",
    body: (
      <div className="argument-overview">
        <div><span>1</span><h2>问题</h2><p>为什么值得解决？</p></div>
        <Arrow />
        <div><span>2</span><h2>缺口</h2><p>已有方法哪里不够？</p></div>
        <Arrow />
        <div><span>3</span><h2>方法</h2><p>作者改变了什么？</p></div>
        <Arrow />
        <div><span>4</span><h2>证据</h2><p>结果支持哪些主张？</p></div>
        <Arrow />
        <div><span>5</span><h2>边界</h2><p>结论何时不成立？</p></div>
        <div className="argument-note">
          精读时可以反复回跳章节；目标是让这五部分彼此对应。
        </div>
      </div>
    ),
  },
  {
    section: "第三部分｜步骤一",
    title: "先用三句话固定论文主线",
    body: (
      <div className="summary-grid">
        <div>
          <span>问题</span>
          <p>在 ______ 场景中，______ 问题很重要，因为 ______。</p>
        </div>
        <div>
          <span>想法</span>
          <p>论文通过 ______ 解决问题，关键变化是 ______。</p>
        </div>
        <div>
          <span>结果</span>
          <p>在 ______ 条件下，相比 ______ 得到 ______，代价或限制是 ______。</p>
        </div>
        <div className="summary-check">
          写不出来时，先回到引言、结论和关键图表，不要立刻钻进公式。
        </div>
      </div>
    ),
  },
  {
    section: "第三部分｜步骤二",
    title: "确认贡献到底新在哪里",
    body: (
      <div className="contribution-layout">
        <div className="contribution-chain">
          <div><b>已有方法</b><p>当前最强做法是什么？</p></div>
          <Arrow />
          <div><b>关键不足</b><p>它在哪些条件下失败？</p></div>
          <Arrow />
          <div className="highlight"><b>论文变化</b><p>作者具体改了哪一处？</p></div>
          <Arrow />
          <div><b>带来结果</b><p>能力、效率或保证如何变化？</p></div>
        </div>
        <div className="contribution-questions">
          <p>这个变化以前真的没有吗？</p>
          <p>它是核心思想，还是大量工程细节的组合？</p>
          <p>实验是否证明这个变化确实必要？</p>
        </div>
      </div>
    ),
  },
  {
    section: "第三部分｜步骤三",
    title: "把方法读成一条可执行流程",
    body: (
      <div className="method-reading">
        <div className="method-flow">
          <div><span>输入</span><p>数据、状态、约束</p></div>
          <Arrow />
          <div className="highlight"><span>关键操作</span><p>新增信息或机制</p></div>
          <Arrow />
          <div><span>输出</span><p>预测、决策、系统结果</p></div>
          <div className="method-questions">
            <p><b>为什么：</b>为什么选择这种设计？</p>
            <p><b>代价：</b>时间、空间、计算和工程成本是多少？</p>
            <p><b>失效：</b>输入或假设变化时会发生什么？</p>
          </div>
        </div>
        <div className="artifact-list">
          <div><h2>架构图</h2><p>追踪信息流和新增模块。</p></div>
          <div><h2>伪代码</h2><p>确认输入、循环、终止和最贵步骤。</p></div>
          <div><h2>公式</h2><p>解释符号、目标和真正改变行为的项。</p></div>
        </div>
      </div>
    ),
  },
  {
    section: "第三部分｜步骤四",
    title: "让每个主张都找到对应证据",
    body: (
      <div className="evidence-table">
        <div className="evidence-row evidence-head">
          <span>论文主张</span><span>需要的证据</span><span>重点检查</span>
        </div>
        <div className="evidence-row">
          <span>效果更好</span><span>主结果与强基线</span><span>公平调参、误差和显著性</span>
        </div>
        <div className="evidence-row">
          <span>运行更快</span><span>延迟、吞吐和资源曲线</span><span>硬件、批量和精度一致</span>
        </div>
        <div className="evidence-row">
          <span>设计是必要的</span><span>消融与组件交互</span><span>是否真正隔离该因素</span>
        </div>
        <div className="evidence-row">
          <span>可以泛化</span><span>跨数据、规模或分布</span><span>是否只选择有利场景</span>
        </div>
      </div>
    ),
  },
  {
    section: "第三部分｜读实验图",
    title: "读一张实验图，只回答四个问题",
    body: (
      <div className="figure-steps">
        <div><span>1</span><h2>问题</h2><p>这张图要验证哪个主张？</p></div>
        <div><span>2</span><h2>设定</h2><p>横纵轴、基线和控制变量是什么？</p></div>
        <div><span>3</span><h2>结果</h2><p>最重要趋势、差异和异常是什么？</p></div>
        <div><span>4</span><h2>解释</h2><p>证据支持多强的结论？还有别的解释吗？</p></div>
        <div className="figure-rule">
          不要只摘录最好的数字；同时查看误差、长尾、失败案例和不显著结果。
        </div>
      </div>
    ),
  },
  {
    section: "第三部分｜步骤五",
    title: "主动寻找论文的边界",
    body: (
      <div className="boundary-grid">
        <div><h2>假设</h2><p>数据、硬件、用户或威胁模型是否现实？</p></div>
        <div><h2>评价范围</h2><p>数据集、规模、指标和基线覆盖是否充分？</p></div>
        <div><h2>成本</h2><p>收益是否值得额外的计算、存储和工程复杂度？</p></div>
        <div><h2>复现与失败</h2><p>代码和配置是否完整？哪些场景表现明显变差？</p></div>
        <div className="boundary-verdict">
          <b>把判断写完整：</b>在 ______ 条件下，证据支持 ______；对 ______ 尚不能说明。
        </div>
      </div>
    ),
  },
  {
    section: "第三部分｜步骤六",
    title: "完成一页精读总结",
    body: (
      <div className="paper-card">
        <div><span>问题</span><p>论文解决什么重要问题？</p></div>
        <div><span>贡献</span><p>相对已有工作，新在哪里？</p></div>
        <div><span>方法</span><p>输入、关键机制和输出是什么？</p></div>
        <div><span>证据</span><p>最关键的两三项结果是什么？</p></div>
        <div><span>边界</span><p>假设、成本和失败条件是什么？</p></div>
        <div><span>问题</span><p>我仍然不理解或不相信什么？</p></div>
      </div>
    ),
  },
  {
    section: "常见问题",
    title: "四种低效阅读方式，以及修正方法",
    body: (
      <div className="trap-grid">
        <div><h2>从第一页顺读到底</h2><p>先快速建立地图，再按问题跳读。</p></div>
        <div><h2>被公式或术语卡住</h2><p>先确认它在论证中的作用，再决定是否深挖。</p></div>
        <div><h2>只改写作者的摘要</h2><p>用自己的话写主张、证据和反例。</p></div>
        <div><h2>收集很多细节却没有主线</h2><p>每条笔记都应归入问题、方法、证据或边界。</p></div>
      </div>
    ),
  },
  {
    section: "建议实践",
    title: "一次完整精读，可以分成三轮",
    body: (
      <div className="workflow-grid">
        <div>
          <span>第一轮 · 20 分钟</span>
          <h2>建立地图</h2>
          <p>快速浏览全文，写三句话摘要，决定是否继续。</p>
        </div>
        <div>
          <span>第二轮 · 1–2 小时</span>
          <h2>重建论证</h2>
          <p>读懂问题、贡献、方法和关键实验，画出论证链。</p>
        </div>
        <div>
          <span>第三轮 · 1–2 小时或更久</span>
          <h2>形成判断</h2>
          <p>核查相关工作、边界与复现信息，完成一页精读总结。</p>
        </div>
        <div className="workflow-note">
          时间不是硬指标。理论证明、复杂系统和陌生方向通常需要多次回读。
        </div>
      </div>
    ),
  },
  {
    section: "总结与后续",
    title: "读完一篇论文，至少留下这些成果",
    body: (
      <div className="closing-layout">
        <ul className="closing-checklist">
          <li>三句话摘要</li>
          <li>问题—方法—证据—边界的论证图</li>
          <li>两三项关键证据及其解释</li>
          <li>论文的适用条件与主要不足</li>
          <li>一个值得继续追问的问题</li>
        </ul>
        <div className="follow-up">
          <h2>后续安排</h2>
          <p>每位同学精读一篇计算机领域顶会 Best Paper。</p>
          <p>之后的 50 分钟分享，是对阅读结果的应用；具体讲法另行说明。</p>
        </div>
      </div>
    ),
  },
];

function Slide({ spec, index }: { spec: SlideSpec; index: number }) {
  if (spec.cover) {
    return (
      <article className="slide cover-slide" aria-label={"第 " + (index + 1) + " 页：" + spec.title}>
        <div className="cover-rule"><span /><i /></div>
        {spec.body}
        <div className="cover-page">{String(index + 1).padStart(2, "0")}</div>
      </article>
    );
  }

  return (
    <article
      className={"slide content-slide " + (spec.className ?? "")}
      aria-label={"第 " + (index + 1) + " 页：" + spec.title}
    >
      <header className="slide-header">
        <p>{spec.section}</p>
        <h1>{spec.title}</h1>
      </header>
      <div className="signature-rule"><span /><i /></div>
      <div className="slide-body">{spec.body}</div>
      <footer className="slide-footer">
        <span>{String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
      </footer>
    </article>
  );
}

export function PaperReadingPresentation() {
  const [current, setCurrent] = useState(0);
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const deckRef = useRef<HTMLDivElement>(null);
  const pointerStart = useRef<number | null>(null);

  const goTo = useCallback((target: number) => {
    const bounded = Math.max(0, Math.min(slides.length - 1, target));
    setCurrent(bounded);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", "#slide-" + (bounded + 1));
    }
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const previous = useCallback(() => goTo(current - 1), [current, goTo]);

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await deckRef.current?.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const onHash = () => {
      const result = window.location.hash.match(/slide-(\d+)/);
      if (result) {
        setCurrent(Math.max(0, Math.min(slides.length - 1, Number(result[1]) - 1)));
      }
    };
    queueMicrotask(onHash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, select, button")) return;
      if (["ArrowRight", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        next();
      } else if (["ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        previous();
      } else if (event.key === "Home") {
        event.preventDefault();
        goTo(0);
      } else if (event.key === "End") {
        event.preventDefault();
        goTo(slides.length - 1);
      } else if (event.key.toLowerCase() === "o") {
        setOverviewOpen((open) => !open);
      } else if (event.key.toLowerCase() === "f") {
        void toggleFullscreen();
      } else if (event.key === "Escape") {
        setOverviewOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, next, previous, toggleFullscreen]);

  useEffect(() => {
    const update = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", update);
    return () => document.removeEventListener("fullscreenchange", update);
  }, []);

  const onPointerDown = (event: ReactPointerEvent) => {
    pointerStart.current = event.clientX;
  };

  const onPointerUp = (event: ReactPointerEvent) => {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(distance) < 45) return;
    if (distance < 0) next();
    else previous();
  };

  const progress = ((current + 1) / slides.length) * 100;

  return (
    <main className="presentation-shell" ref={deckRef}>
      <div className="presentation-topbar">
        <div className="deck-identity">
          <span className="deck-mark">CS</span>
          <div><b>计算机论文阅读方法</b><small>网页演示版</small></div>
        </div>
        <div className="keyboard-hint">← → 翻页 · O 总览 · F 全屏</div>
      </div>

      <section
        className="slide-stage"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        aria-live="polite"
      >
        <div className="slide-animation" key={current}>
          <Slide spec={slides[current]} index={current} />
        </div>
        <button className="stage-hit stage-hit-left" onClick={previous} disabled={current === 0} aria-label="上一页" />
        <button className="stage-hit stage-hit-right" onClick={next} disabled={current === slides.length - 1} aria-label="下一页" />
      </section>

      <nav className="presentation-controls" aria-label="演示文稿控制">
        <button onClick={previous} disabled={current === 0} aria-label="上一页"><span aria-hidden="true">←</span><small>上一页</small></button>
        <button className="overview-button" onClick={() => setOverviewOpen(true)}>
          <span>{String(current + 1).padStart(2, "0")}</span>
          <small>/ {String(slides.length).padStart(2, "0")} · 总览</small>
        </button>
        <button onClick={next} disabled={current === slides.length - 1} aria-label="下一页"><small>下一页</small><span aria-hidden="true">→</span></button>
        <button className="fullscreen-button" onClick={() => void toggleFullscreen()} aria-label={isFullscreen ? "退出全屏" : "进入全屏"}>
          <span aria-hidden="true">{isFullscreen ? "⊡" : "⛶"}</span>
          <small>{isFullscreen ? "退出" : "全屏"}</small>
        </button>
      </nav>
      <div className="progress-track" aria-hidden="true"><i style={{ width: progress + "%" }} /></div>

      {overviewOpen && (
        <div className="overview" role="dialog" aria-modal="true" aria-label="幻灯片总览">
          <div className="overview-head">
            <div><p>幻灯片总览</p><h2>选择要跳转的页面</h2></div>
            <button onClick={() => setOverviewOpen(false)} aria-label="关闭总览">×</button>
          </div>
          <div className="overview-grid">
            {slides.map((slide, index) => (
              <button
                className={index === current ? "active" : ""}
                key={slide.title + "-" + index}
                onClick={() => { goTo(index); setOverviewOpen(false); }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <small>{slide.section}</small>
                <b>{slide.title}</b>
              </button>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
