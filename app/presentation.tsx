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

const Tag = ({ children, tone = "teal" }: { children: ReactNode; tone?: string }) => (
  <span className={`tag tag-${tone}`}>{children}</span>
);

const Arrow = () => <span className="flow-arrow" aria-hidden="true">→</span>;

const slides: SlideSpec[] = [
  {
    section: "COMPUTER SCIENCE · BEST PAPER",
    title: "如何读懂并讲清一篇计算机论文",
    cover: true,
    body: (
      <>
        <div className="cover-copy">
          <p className="cover-kicker">COMPUTER SCIENCE · BEST PAPER</p>
          <h1>
            如何<Accent>读懂</Accent>并<Accent>讲清</Accent>
            <br />一篇计算机论文
          </h1>
          <p className="cover-subtitle">顶会 Best Paper 阅读方法与 50 分钟报告设计</p>
          <div className="cover-meta">
            <span>面向计算机专业学生</span>
            <span>Summer School · 2026</span>
          </div>
        </div>
        <div className="cover-model" aria-label="阅读到表达的三步流程">
          <div><b>READ</b><small>找到关键证据</small></div>
          <Arrow />
          <div><b>REBUILD</b><small>重建论证链</small></div>
          <Arrow />
          <div><b>EXPLAIN</b><small>按听众认知重组</small></div>
        </div>
      </>
    ),
  },
  {
    section: "00 · 任务定义",
    title: "这次任务：每人讲清一篇计算机顶会 Best Paper",
    body: (
      <div className="task-grid">
        <div className="task-panel task-input">
          <Tag tone="blue">INPUT</Tag>
          <h2>你拿到的</h2>
          <div className="paper-sheet">
            <span>PDF</span>
            <i /><i /><i /><i /><i />
          </div>
          <p>一篇高密度论文、有限时间、不同背景的听众</p>
        </div>
        <div className="task-transform">
          <div className="gear-ring">?</div>
          <b>阅读不是终点</b>
          <span>需要重建、取舍、解释</span>
        </div>
        <div className="task-panel task-output">
          <Tag tone="orange">OUTPUT</Tag>
          <h2>听众带走的</h2>
          <ul className="clean-list">
            <li>论文解决了什么重要问题</li>
            <li>核心机制为什么有效</li>
            <li>证据是否足够可信</li>
            <li>方法在哪些条件下失效</li>
          </ul>
        </div>
        <div className="wide-callout">
          <b>成功标准：</b> 不是“我讲完了 30 页”，而是“听众能复述论文的论证链”。
        </div>
      </div>
    ),
  },
  {
    section: "01 · 先建立骨架",
    title: "计算机论文的骨架：问题—机制—证据—边界",
    body: (
      <div className="argument-flow">
        <div className="argument-node soft-blue">
          <span>01</span><h2>问题</h2><p>谁遇到痛点？规模多大？为什么旧方法不够？</p>
        </div>
        <Arrow />
        <div className="argument-node soft-orange">
          <span>02</span><h2>机制</h2><p>作者改了哪一个关键环节？新信息从哪里来？</p>
        </div>
        <Arrow />
        <div className="argument-node soft-green">
          <span>03</span><h2>证据</h2><p>哪些实验真正支撑 claim？基线、公平性、显著性如何？</p>
        </div>
        <Arrow />
        <div className="argument-node soft-red">
          <span>04</span><h2>边界</h2><p>假设、成本、失败案例与可迁移条件是什么？</p>
        </div>
        <div className="argument-note">
          <b>阅读时不断问：</b> 这段内容在骨架中承担什么角色？如果删掉，哪条论证会断？
        </div>
      </div>
    ),
  },
  {
    section: "01 · 先建立骨架",
    title: "先识别论文类型，才知道哪里必须读深",
    body: (
      <div className="type-grid">
        <div className="type-card"><Tag tone="teal">系统 / 数据库</Tag><h2>系统是否真的可用？</h2><p><b>深读：</b>架构、关键路径、资源开销、端到端与微基准。</p><small>常见 venue：SOSP / OSDI / SIGMOD / VLDB</small></div>
        <div className="type-card"><Tag tone="orange">算法 / 理论</Tag><h2>保证从哪里来？</h2><p><b>深读：</b>问题定义、假设、核心 lemma、复杂度与反例。</p><small>关注：正确性、上界、下界、适用条件</small></div>
        <div className="type-card"><Tag tone="blue">AI / 数据挖掘</Tag><h2>增益来自哪里？</h2><p><b>深读：</b>任务设定、数据、损失函数、消融、泛化与方差。</p><small>常见 venue：NeurIPS / ICML / ICLR / KDD</small></div>
        <div className="type-card"><Tag tone="red">安全 / HCI</Tag><h2>威胁或用户是否真实？</h2><p><b>深读：</b>威胁模型、攻击面、研究设计、伦理与外部效度。</p><small>关注：可复现性、受试偏差、真实部署</small></div>
      </div>
    ),
  },
  {
    section: "02 · 三遍阅读法",
    title: "三遍阅读：每一遍回答不同层次的问题",
    body: (
      <div className="passes">
        <div className="pass-card pass-one"><span className="pass-number">1</span><div><Tag tone="blue">15–30 min</Tag><h2>定位</h2><p>论文是否值得读？它声称解决什么？证据入口在哪里？</p><b>产物：5C + 三句话摘要</b></div></div>
        <div className="pass-line" />
        <div className="pass-card pass-two"><span className="pass-number">2</span><div><Tag tone="orange">2–4 h</Tag><h2>重建</h2><p>机制如何工作？每个 claim 由哪项证据支撑？</p><b>产物：论证链 + 图表解读</b></div></div>
        <div className="pass-line" />
        <div className="pass-card pass-three"><span className="pass-number">3</span><div><Tag tone="teal">按需投入</Tag><h2>压力测试</h2><p>能否复现？换数据、规模或假设后还成立吗？</p><b>产物：边界、质疑与迁移判断</b></div></div>
        <div className="pass-bottom"><b>关键原则：</b> 不要在第一遍被公式或实现细节卡住；先决定“为什么读”，再决定“读多深”。</div>
      </div>
    ),
  },
  {
    section: "02 · 第一遍",
    title: "第一遍用 5C 快速建立全局地图",
    body: (
      <div className="five-c">
        {[
          ["Context", "问题处在什么研究脉络？"],
          ["Claim", "作者最核心的可检验主张是什么？"],
          ["Contribution", "相对已有工作，新东西到底在哪里？"],
          ["Comparison", "最强竞争者是谁？作者如何赢？"],
          ["Conclusion", "结果说明了什么，又没有说明什么？"],
        ].map(([name, text], i) => (
          <div className="c-card" key={name}><span>{i + 1}</span><h2>{name}</h2><p>{text}</p></div>
        ))}
        <div className="five-c-output">
          <Tag tone="red">STOP RULE</Tag>
          <p>如果 5C 仍然写不出来，先回到标题、摘要、引言、结论和所有图表标题；不要立刻钻进方法章节。</p>
        </div>
      </div>
    ),
  },
  {
    section: "02 · 第二遍",
    title: "第二遍的目标：把作者的论证链重新画出来",
    body: (
      <div className="claim-chain">
        <div className="chain-row">
          <div className="chain-node">研究问题<small>Problem</small></div><Arrow />
          <div className="chain-node">关键假设<small>Assumption</small></div><Arrow />
          <div className="chain-node">机制设计<small>Mechanism</small></div><Arrow />
          <div className="chain-node">可验证预测<small>Prediction</small></div><Arrow />
          <div className="chain-node">实验与结果<small>Evidence</small></div><Arrow />
          <div className="chain-node">最终主张<small>Claim</small></div>
        </div>
        <div className="chain-audit">
          <div><Tag tone="red">断点 A</Tag><b>假设是否现实？</b><p>如果假设不成立，机制是否仍有价值？</p></div>
          <div><Tag tone="red">断点 B</Tag><b>预测是否唯一？</b><p>有没有别的解释也能产生相同结果？</p></div>
          <div><Tag tone="red">断点 C</Tag><b>证据是否对应？</b><p>实验测到的是 claim，还是一个方便测的 proxy？</p></div>
        </div>
        <p className="chain-footer">把每个重要段落放回这条链上；无法归位的细节，多半不该进入主讲。</p>
      </div>
    ),
  },
  {
    section: "02 · 第二遍",
    title: "图表是证据现场，不是论文的装饰",
    body: (
      <div className="figure-audit">
        <div className="mock-chart" aria-label="示意性能曲线图">
          <div className="axis-y">质量 / 吞吐</div>
          <div className="chart-area">
            <i className="grid-line g1" /><i className="grid-line g2" /><i className="grid-line g3" />
            <div className="bar baseline b1" /><div className="bar proposed p1" />
            <div className="bar baseline b2" /><div className="bar proposed p2" />
            <div className="bar baseline b3" /><div className="bar proposed p3" />
            <div className="bar baseline b4" /><div className="bar proposed p4" />
          </div>
          <div className="chart-labels"><span>Small</span><span>Medium</span><span>Large</span><span>OOD</span></div>
          <div className="chart-legend"><span><i className="legend-base" /> strongest baseline</span><span><i className="legend-proposed" /> proposed</span></div>
        </div>
        <div className="audit-questions">
          <div><span>01</span><b>这张图回答哪个研究问题？</b></div>
          <div><span>02</span><b>横纵轴、尺度、误差线分别意味着什么？</b></div>
          <div><span>03</span><b>最强基线是否真的被公平比较？</b></div>
          <div><span>04</span><b>平均值是否掩盖长尾或失败案例？</b></div>
          <div><span>05</span><b>结果是否跨数据集、规模与随机种子成立？</b></div>
        </div>
        <div className="figure-verdict"><b>讲图时按“问题 → 读轴 → 看趋势 → 找异常 → 下结论”走一遍。</b></div>
      </div>
    ),
  },
  {
    section: "02 · 第二遍",
    title: "架构、伪代码、公式：都要翻译成可执行的因果故事",
    body: (
      <div className="method-triad">
        <div className="method-panel">
          <Tag tone="blue">ARCHITECTURE</Tag><h2>信息怎么流？</h2>
          <div className="mini-architecture"><span>Input</span><Arrow /><span className="hot">New module</span><Arrow /><span>Output</span></div>
          <p>标出新增模块、状态、反馈回路、训练/推理差异。</p>
        </div>
        <div className="method-panel">
          <Tag tone="orange">PSEUDOCODE</Tag><h2>每一步做什么？</h2>
          <pre><code><em>for</em> batch in data:{"\n"}  state ← encode(batch){"\n"}  action ← <b>select(state)</b>{"\n"}  update(memory, action)</code></pre>
          <p>说清输入、输出、循环终止、最贵步骤与不变量。</p>
        </div>
        <div className="method-panel">
          <Tag tone="teal">FORMULA</Tag><h2>哪一项改变了行为？</h2>
          <div className="formula">L = L<sub>task</sub> + <Accent>λ · L<sub>new</sub></Accent></div>
          <p>先解释符号和优化目标，再说明新增项改变了什么权衡。</p>
        </div>
        <div className="method-bottom">听众不需要背公式；他们需要能预测：<b>当输入或参数变化时，系统行为会怎样变化。</b></div>
      </div>
    ),
  },
  {
    section: "02 · 第三遍",
    title: "第三遍：复现、压力测试、迁移判断",
    body: (
      <div className="stress-grid">
        <div className="stress-card"><span className="stress-index">A</span><h2>复现检查</h2><ul><li>代码、配置、数据是否可获得？</li><li>关键超参数是否完整？</li><li>资源与运行时间是否现实？</li></ul><Tag tone="blue">Can I rebuild it?</Tag></div>
        <div className="stress-card"><span className="stress-index">B</span><h2>压力测试</h2><ul><li>更大规模 / 更长尾数据</li><li>更强或更公平的基线</li><li>移除关键假设与组件</li></ul><Tag tone="red">Where does it break?</Tag></div>
        <div className="stress-card"><span className="stress-index">C</span><h2>迁移判断</h2><ul><li>换任务、硬件、数据分布</li><li>收益是否覆盖工程成本？</li><li>哪部分思想可独立复用？</li></ul><Tag tone="teal">What survives?</Tag></div>
        <div className="stress-callout"><b>Best Paper 也不是“正确答案”。</b> 高质量阅读的标志，是你能指出它在哪些条件下不再成立。</div>
      </div>
    ),
  },
  {
    section: "03 · 建立文献链",
    title: "不要只读一篇：用最小文献链定位真正贡献",
    body: (
      <div className="literature-map">
        <div className="lit-column"><Tag tone="blue">BEFORE</Tag><h2>它继承了什么？</h2><div className="citation-stack"><span>奠基工作</span><span>当前最强基线</span><span>同问题另一条路线</span></div></div>
        <div className="lit-center"><div className="focus-paper">BEST<br />PAPER</div><p>贡献不是“作者说新”，而是相对坐标系中的位移。</p></div>
        <div className="lit-column"><Tag tone="orange">AFTER</Tag><h2>社区如何评价？</h2><div className="citation-stack"><span>后续复现 / 反例</span><span>扩展到新场景</span><span>替代方案与综述</span></div></div>
        <div className="lit-rule"><b>最小集合：</b> 1 篇奠基工作 + 1–2 篇最强竞争者 + 1 篇后续评价。其余只做定位，不做平均用力。</div>
      </div>
    ),
  },
  {
    section: "03 · 固化理解",
    title: "读完后压缩成一页“论文卡”",
    body: (
      <div className="paper-card-layout">
        <div className="paper-card">
          <div className="paper-card-head"><b>PAPER CARD</b><span>1 PAGE ONLY</span></div>
          <div className="paper-card-grid">
            <div><small>PROBLEM</small><p>一句话描述真实痛点</p></div>
            <div><small>CLAIM</small><p>一句可被证伪的主张</p></div>
            <div className="wide"><small>MECHANISM</small><p>三步说明核心机制：输入 → 关键变化 → 输出</p></div>
            <div><small>EVIDENCE</small><p>最关键的 2–3 项证据</p></div>
            <div><small>BASELINE</small><p>真正需要击败的竞争者</p></div>
            <div><small>BOUNDARY</small><p>假设、成本、失败案例</p></div>
            <div><small>QUESTION</small><p>你仍不相信或不理解什么</p></div>
          </div>
        </div>
        <div className="paper-card-notes">
          <div><span>1</span><p>强迫自己做取舍：一页放不下，说明主线还没抓住。</p></div>
          <div><span>2</span><p>所有主讲页面都应能回指到卡片中的一个格子。</p></div>
          <div><span>3</span><p>报告结束后，把听众问题补进 QUESTION 与 BOUNDARY。</p></div>
        </div>
      </div>
    ),
  },
  {
    section: "03 · 常见陷阱",
    title: "四种“看起来读了，其实没读懂”的状态",
    body: (
      <div className="trap-grid">
        <div className="trap"><span>01</span><h2>术语收集</h2><p>记住一堆名词，却说不出它们在论证链中的角色。</p><b>修正：每个术语后补“所以呢？”</b></div>
        <div className="trap"><span>02</span><h2>摘要改写</h2><p>把作者的话换一种中文复述，没有独立判断。</p><b>修正：写出可证伪预测与反例。</b></div>
        <div className="trap"><span>03</span><h2>方法崇拜</h2><p>花 30 分钟讲模块，没讲问题为何重要、证据是否可信。</p><b>修正：机制时间不能挤掉问题与证据。</b></div>
        <div className="trap"><span>04</span><h2>实验观光</h2><p>逐图念数字，没有回答每张图支撑哪个 claim。</p><b>修正：一图一结论，一结论一边界。</b></div>
      </div>
    ),
  },
  {
    section: "04 · 从读懂到讲清",
    title: "读懂是输入；讲清需要按听众认知重新组织",
    body: (
      <div className="reorder">
        <div className="reorder-column">
          <Tag tone="blue">PAPER ORDER</Tag><h2>作者写作顺序</h2>
          <div className="vertical-flow"><span>Abstract</span><span>Introduction</span><span>Related Work</span><span>Method</span><span>Experiments</span><span>Conclusion</span></div>
        </div>
        <div className="reorder-engine"><div className="gear-ring">↻</div><b>删、并、移、补</b><p>围绕一个核心 claim 重组</p></div>
        <div className="reorder-column preferred">
          <Tag tone="orange">TALK ORDER</Tag><h2>听众理解顺序</h2>
          <div className="vertical-flow"><span>为什么值得听</span><span>旧方法卡在哪里</span><span>核心机制怎么解</span><span>证据是否站得住</span><span>边界与启发</span></div>
        </div>
        <div className="reorder-bottom"><b>报告不是论文的“有声朗读版”。</b> 主线由听众的疑问驱动，而不是由 PDF 的章节编号驱动。</div>
      </div>
    ),
  },
  {
    section: "05 · 50 分钟报告",
    title: "50 分钟 = 47 分钟主讲 + 3 分钟机动",
    body: (
      <div className="talk-timeline">
        <div className="timeline-axis"><span>0</span><span>5</span><span>12</span><span>27</span><span>40</span><span>47</span><span>50 min</span></div>
        <div className="timeline-bar">
          <div className="seg s1" style={{ flex: 5 }}><b>5</b><span>动机</span></div>
          <div className="seg s2" style={{ flex: 7 }}><b>7</b><span>背景 / 旧方法</span></div>
          <div className="seg s3" style={{ flex: 15 }}><b>15</b><span>核心方法</span></div>
          <div className="seg s4" style={{ flex: 13 }}><b>13</b><span>实验与证据</span></div>
          <div className="seg s5" style={{ flex: 7 }}><b>7</b><span>边界 / 启发 / 总结</span></div>
          <div className="seg s6" style={{ flex: 3 }}><b>3</b><span>机动</span></div>
        </div>
        <div className="timeline-notes">
          <div><Tag tone="red">不要平均分</Tag><p>新意集中在哪里，时间就集中在哪里。</p></div>
          <div><Tag tone="teal">3 分钟机动</Tag><p>用于追问、设备切换、临时澄清；不是预设的“超时额度”。</p></div>
          <div><Tag tone="orange">每 10 分钟复位</Tag><p>用一句话告诉听众：刚刚证明了什么，接下来要回答什么。</p></div>
        </div>
      </div>
    ),
  },
  {
    section: "05 · 50 分钟报告",
    title: "报告结束时，听众应该能回答 6 个问题",
    body: (
      <div className="six-questions">
        {[
          ["01", "WHY", "为什么这个问题重要？"],
          ["02", "GAP", "已有方法究竟卡在哪里？"],
          ["03", "IDEA", "论文最核心的新想法是什么？"],
          ["04", "HOW", "机制如何一步步工作？"],
          ["05", "EVIDENCE", "哪些证据最能支撑主张？"],
          ["06", "BOUNDARY", "何时失效，我们能学到什么？"],
        ].map(([n, en, zh]) => <div className="question-card" key={n}><span>{n}</span><small>{en}</small><p>{zh}</p></div>)}
        <div className="six-check">如果其中一个问题在主讲中没有明确答案，就要么补一页，要么删掉与它无关的细节。</div>
      </div>
    ),
  },
  {
    section: "05 · 50 分钟报告",
    title: "主讲与 Backup：按“认知必需”而不是“我做过”来分",
    body: (
      <div className="main-backup">
        <div className="main-column">
          <div className="column-head"><Tag tone="orange">MAIN · 25–35 PAGES</Tag><h2>没有它，听众就无法跟上</h2></div>
          <ul className="check-list"><li>问题、场景与强动机</li><li>最小必要背景与术语</li><li>核心机制与关键设计选择</li><li>支撑主 claim 的代表性实验</li><li>限制、失败案例与 takeaways</li></ul>
        </div>
        <div className="backup-divider"><span>?</span></div>
        <div className="backup-column">
          <div className="column-head"><Tag tone="blue">BACKUP · 5–15 PAGES</Tag><h2>可能被问到，但不阻断主线</h2></div>
          <ul className="check-list"><li>完整参数表与实现细节</li><li>更多数据集、基线与消融</li><li>证明细节、复杂度推导</li><li>失败案例与额外可视化</li><li>你预判的尖锐问题答案</li></ul>
        </div>
        <div className="main-backup-rule"><b>判断题：</b> 删掉这页后，听众是否仍能回答前一页的 6 个问题？能 → Backup；不能 → 主讲。</div>
      </div>
    ),
  },
  {
    section: "05 · 方法讲解深度",
    title: "方法应该讲多细：细到听众能预测行为",
    body: (
      <div className="depth-slide">
        <div className="depth-ladder">
          <div className="depth-step d1"><span>1</span><b>定义</b><small>它是什么</small></div>
          <div className="depth-step d2"><span>2</span><b>输入 / 输出</b><small>接收与产生什么</small></div>
          <div className="depth-step d3"><span>3</span><b>核心机制</b><small>信息如何变化</small></div>
          <div className="depth-step d4"><span>4</span><b>设计理由</b><small>为什么这样而不是那样</small></div>
          <div className="depth-step d5"><span>5</span><b>代价与边界</b><small>成本、假设、失败条件</small></div>
        </div>
        <div className="depth-test">
          <Tag tone="red">DEPTH TEST</Tag><h2>听众能否回答：</h2>
          <div className="predict-box">如果把 <b>关键模块移除</b>、把 <b>规模扩大 10×</b>、或把 <b>数据分布换掉</b>，结果会怎样？为什么？</div>
          <p>能回答 → 深度足够。只能复述模块名 → 还停在结构描述。</p>
          <small>公式只保留改变行为的项；伪代码只保留决定输出的步骤；架构图只保留信息依赖。</small>
        </div>
      </div>
    ),
  },
  {
    section: "05 · 实验讲解深度",
    title: "实验不要逐图念：先把 claim 与证据对齐",
    body: (
      <div className="experiment-slide">
        <div className="claim-table">
          <div className="tr head"><span>Claim</span><span>最合适的证据</span><span>必须检查</span></div>
          <div className="tr"><span>更有效</span><span>主结果 + 最强基线</span><span>公平调参、误差、显著性</span></div>
          <div className="tr"><span>更高效</span><span>吞吐 / 延迟 / 资源曲线</span><span>硬件、批量、精度一致</span></div>
          <div className="tr"><span>设计必要</span><span>消融 + 组件交互</span><span>不是只删弱组件</span></div>
          <div className="tr"><span>可泛化</span><span>跨数据 / 规模 / OOD</span><span>是否只挑了有利场景</span></div>
        </div>
        <div className="experiment-script">
          <Tag tone="teal">每张图 4 句话</Tag>
          <ol><li><b>问题：</b>这张图要验证什么？</li><li><b>设定：</b>比较对象与控制变量是什么？</li><li><b>发现：</b>最重要趋势与异常是什么？</li><li><b>结论：</b>它支持了多强的 claim？</li></ol>
        </div>
        <div className="experiment-bottom"><b>克制：</b> 只展示能改变听众判断的图；“作者做了”不是进入主讲的理由。</div>
      </div>
    ),
  },
  {
    section: "05 · 页数与节奏",
    title: "25–35 页主讲，平均 1.5–2 分钟 / 页",
    body: (
      <div className="pace-slide">
        <div className="pace-curve">
          <div className="curve-label">讲解密度</div>
          <div className="curve-row"><span>动机</span><i style={{ width: "42%" }} /></div>
          <div className="curve-row"><span>背景</span><i style={{ width: "35%" }} /></div>
          <div className="curve-row"><span>方法</span><i style={{ width: "100%" }} /></div>
          <div className="curve-row"><span>实验</span><i style={{ width: "82%" }} /></div>
          <div className="curve-row"><span>总结</span><i style={{ width: "30%" }} /></div>
        </div>
        <div className="pace-metrics">
          <div><b>25–35</b><span>主讲页</span></div><div><b>5–15</b><span>Backup 页</span></div><div><b>1.5–2</b><span>分钟 / 页</span></div>
        </div>
        <div className="pace-rules">
          <div><span>01</span><p>一页只服务一个明确结论；标题直接写结论或问题。</p></div>
          <div><span>02</span><p>复杂图先给全景，再用连续页面高亮局部；不要让听众自己找重点。</p></div>
          <div><span>03</span><p>每 8–10 分钟设置一个“小结页”或口头复位句。</p></div>
          <div><span>04</span><p>彩排超过 47 分钟，优先删支线和重复证据，不要靠加速说话。</p></div>
        </div>
      </div>
    ),
  },
  {
    section: "06 · 技术审稿",
    title: "上台前做一次“技术审稿”",
    body: (
      <div className="review-grid">
        {[
          ["问题", "问题规模与现实性被量化了吗？", "旧方法的 gap 是事实还是稻草人？"],
          ["方法", "输入输出、状态与关键步骤清楚吗？", "复杂度、资源、训练/推理差异明确吗？"],
          ["实验", "基线够强且公平吗？", "误差、消融、失败案例与多种子齐全吗？"],
          ["论证", "每个主 claim 都能指向证据吗？", "相关性有没有被说成因果性？"],
          ["表达", "每页标题是否传达结论？", "图中文字、颜色和讲解顺序可跟随吗？"],
        ].map(([name, q1, q2], i) => <div className="review-card" key={name}><span>{String(i + 1).padStart(2, "0")}</span><h2>{name}</h2><p>□ {q1}</p><p>□ {q2}</p></div>)}
        <div className="review-gate"><Tag tone="red">FINAL GATE</Tag><p>让一位<b>没读过论文</b>的同学听 15 分钟：若他无法复述问题、核心机制和一项关键证据，继续改主线。</p></div>
      </div>
    ),
  },
  {
    section: "07 · 两周准备节奏",
    title: "两周准备：每个阶段都交付一个可检查的产物",
    body: (
      <div className="schedule-slide">
        <div className="schedule-line">
          <div className="schedule-item"><span>D−14</span><b>选题与第一遍</b><p>5C + 三句话摘要</p></div>
          <div className="schedule-item"><span>D−11</span><b>第二遍阅读</b><p>论证链 + 关键图表</p></div>
          <div className="schedule-item"><span>D−8</span><b>第三遍 / 文献链</b><p>边界 + 竞争者坐标</p></div>
          <div className="schedule-item"><span>D−6</span><b>故事板</b><p>只写标题，不做美化</p></div>
          <div className="schedule-item"><span>D−4</span><b>首轮彩排</b><p>目标 55 分钟，收问题</p></div>
          <div className="schedule-item"><span>D−2</span><b>删改与 Backup</b><p>压到 47 分钟</p></div>
          <div className="schedule-item final"><span>D−0</span><b>正式报告</b><p>提前检查字体、视频、链接</p></div>
        </div>
        <div className="schedule-gates">
          <div><Tag tone="blue">GATE 1</Tag><p>D−8 前：能不用 PPT 讲清 3 分钟。</p></div>
          <div><Tag tone="orange">GATE 2</Tag><p>D−4 前：每张主讲页都能写出一句结论。</p></div>
          <div><Tag tone="teal">GATE 3</Tag><p>D−2 前：两次彩排都稳定在 45–47 分钟。</p></div>
        </div>
      </div>
    ),
  },
  {
    section: "08 · 现在开始",
    title: "今晚先完成 3 个动作",
    className: "closing-slide",
    body: (
      <div className="closing-content">
        <div className="closing-actions">
          <div><span>01</span><h2>选定论文</h2><p>写下为什么它值得占用大家 50 分钟。</p></div>
          <div><span>02</span><h2>做完第一遍</h2><p>提交 5C、三句话摘要和一张最关键图。</p></div>
          <div><span>03</span><h2>预约质疑者</h2><p>找一位同学专门挑战假设、证据和边界。</p></div>
        </div>
        <div className="closing-statement">
          <p>读论文，不是把作者的话装进脑子。</p>
          <h2>而是重建一个你能<Accent>验证、质疑、迁移</Accent>的模型。</h2>
        </div>
        <div className="closing-qa">Q &amp; A</div>
      </div>
    ),
  },
];

function Slide({ spec, index }: { spec: SlideSpec; index: number }) {
  if (spec.cover) {
    return (
      <article className="slide cover-slide" aria-label={`第 ${index + 1} 页：${spec.title}`}>
        <div className="cover-rule"><span /><i /></div>
        {spec.body}
        <div className="cover-footer"><span>READ · REBUILD · EXPLAIN</span><span>{String(index + 1).padStart(2, "0")}</span></div>
      </article>
    );
  }

  return (
    <article className={`slide content-slide ${spec.className ?? ""}`} aria-label={`第 ${index + 1} 页：${spec.title}`}>
      <header className="slide-header">
        <p>{spec.section}</p>
        <h1>{spec.title}</h1>
      </header>
      <div className="signature-rule"><span /><i /></div>
      <div className="slide-body">{spec.body}</div>
      <footer className="slide-footer"><span>CS BEST PAPER · READING &amp; PRESENTATION</span><span>{String(index + 1).padStart(2, "0")}</span></footer>
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
      window.history.replaceState(null, "", `#slide-${bounded + 1}`);
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
      if (result) setCurrent(Math.max(0, Math.min(slides.length - 1, Number(result[1]) - 1)));
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
    if (distance < 0) next(); else previous();
  };

  const progress = ((current + 1) / slides.length) * 100;

  return (
    <main className="presentation-shell" ref={deckRef}>
      <div className="presentation-topbar">
        <div className="deck-identity"><span className="deck-mark">CS</span><div><b>Best Paper 阅读与报告</b><small>网页演示版</small></div></div>
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
        <button className="overview-button" onClick={() => setOverviewOpen(true)}><span>{String(current + 1).padStart(2, "0")}</span><small>/ {String(slides.length).padStart(2, "0")} · 总览</small></button>
        <button onClick={next} disabled={current === slides.length - 1} aria-label="下一页"><small>下一页</small><span aria-hidden="true">→</span></button>
        <button className="fullscreen-button" onClick={() => void toggleFullscreen()} aria-label={isFullscreen ? "退出全屏" : "进入全屏"}><span aria-hidden="true">{isFullscreen ? "⊡" : "⛶"}</span><small>{isFullscreen ? "退出" : "全屏"}</small></button>
      </nav>
      <div className="progress-track" aria-hidden="true"><i style={{ width: `${progress}%` }} /></div>

      {overviewOpen && (
        <div className="overview" role="dialog" aria-modal="true" aria-label="幻灯片总览">
          <div className="overview-head"><div><p>SLIDE OVERVIEW</p><h2>选择要跳转的页面</h2></div><button onClick={() => setOverviewOpen(false)} aria-label="关闭总览">×</button></div>
          <div className="overview-grid">
            {slides.map((slide, index) => (
              <button
                className={index === current ? "active" : ""}
                key={`${slide.title}-${index}`}
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
