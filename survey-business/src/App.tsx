import { useState } from 'react';

const questions = [
  {
    id: 1,
    module: '内容获客',
    text: '你们公司是否已经明确内容定位、目标客户和核心表达方向？',
    options: [
      { value: 1, label: '没有明确定位，内容方向经常变' },
      { value: 2, label: '大概知道做给谁看，但表达很散' },
      { value: 3, label: '已有基本定位，但执行时常跑偏' },
      { value: 4, label: '定位清晰，团队大多数时候按统一方向输出' },
      { value: 5, label: '定位、客群、卖点都非常清楚，团队可稳定围绕同一方向持续输出' }
    ]
  },
  {
    id: 2,
    module: '内容获客',
    text: '团队是否能够稳定产出选题，而不是临时找题、靠感觉更新？',
    options: [
      { value: 1, label: '基本靠临时想题，常常断更' },
      { value: 2, label: '偶尔会提前列题，但不稳定' },
      { value: 3, label: '有选题池，但更新和筛选机制一般' },
      { value: 4, label: '有稳定选题来源和筛选标准' },
      { value: 5, label: '选题系统成熟，能持续产出并根据数据优化' }
    ]
  },
  {
    id: 3,
    module: '内容获客',
    text: '团队在脚本、素材、制作、发布这些环节上，是否已有相对清晰的分工和流程？',
    options: [
      { value: 1, label: '没有流程，谁有空谁做' },
      { value: 2, label: '有分工但混乱，经常卡住' },
      { value: 3, label: '主要环节有分工，但衔接不顺' },
      { value: 4, label: '流程较顺畅，交接基本稳定' },
      { value: 5, label: '职责、流程、交付标准都清楚，内容生产可持续运转' }
    ]
  },
  {
    id: 4,
    module: '内容获客',
    text: '内容发布后，团队是否会系统复盘数据，并据此调整内容策略？',
    options: [
      { value: 1, label: '发完就结束，几乎不复盘' },
      { value: 2, label: '偶尔看数据，但没有结论' },
      { value: 3, label: '会做简单复盘，但优化动作不稳定' },
      { value: 4, label: '能定期复盘并指导后续选题或表达' },
      { value: 5, label: '复盘机制成熟，能持续驱动内容迭代和增长' }
    ]
  },
  {
    id: 5,
    module: '内容获客',
    text: '公司当前的内容获客是否能比较稳定地带来咨询、加微信或潜在线索？',
    options: [
      { value: 1, label: '内容基本带不来线索' },
      { value: 2, label: '偶尔带来咨询，但不稳定' },
      { value: 3, label: '能带来一些线索，但数量或质量一般' },
      { value: 4, label: '线索获取较稳定，转化价值可见' },
      { value: 5, label: '内容已成为稳定的线索来源，对业务贡献明确' }
    ]
  },
  {
    id: 6,
    module: '线索转化',
    text: '当客户在公域私信、评论或咨询时，团队能否及时承接并推进到下一步？',
    options: [
      { value: 1, label: '回复慢，经常漏掉' },
      { value: 2, label: '能回复，但不及时也不规范' },
      { value: 3, label: '基本能承接，但推进动作弱' },
      { value: 4, label: '回复及时，有明确引导动作' },
      { value: 5, label: '承接效率高、标准统一，能稳定把公域咨询导入下一步' }
    ]
  },
  {
    id: 7,
    module: '线索转化',
    text: '团队是否有一套比较清晰的私域筛选方式，能判断客户值不值得重点跟进？',
    options: [
      { value: 1, label: '没有筛选标准，谁来都聊' },
      { value: 2, label: '有感觉判断，但没有统一标准' },
      { value: 3, label: '有基础筛选问题，但执行不稳定' },
      { value: 4, label: '有明确筛选逻辑，能区分客户层级' },
      { value: 5, label: '筛选标准成熟，能高效判断需求、预算、匹配度和优先级' }
    ]
  },
  {
    id: 8,
    module: '线索转化',
    text: '团队能否根据不同客户状态，采取不同推进方式，而不是一套话术打天下？',
    options: [
      { value: 1, label: '基本不会区分客户状态' },
      { value: 2, label: '知道不同客户不一样，但推进很随意' },
      { value: 3, label: '会做初步区分，但缺少标准动作' },
      { value: 4, label: '能按客户阶段推进，有较清晰节奏' },
      { value: 5, label: '客户分层和推进策略成熟，不同状态都有对应动作' }
    ]
  },
  {
    id: 9,
    module: '线索转化',
    text: '成交是否严重依赖某一个员工、老板本人，还是团队已经能相对稳定完成转化？',
    options: [
      { value: 1, label: '几乎只能靠老板或个别人' },
      { value: 2, label: '大多还得靠老板兜底' },
      { value: 3, label: '部分环节团队能做，但关键点仍依赖核心人物' },
      { value: 4, label: '团队已能承担大部分转化动作' },
      { value: 5, label: '转化流程成熟，不高度依赖单点个人' }
    ]
  },
  {
    id: 10,
    module: '线索转化',
    text: '对于未成交或流失的客户，团队是否会总结原因并优化承接与跟进方式？',
    options: [
      { value: 1, label: '几乎不复盘，丢了就丢了' },
      { value: 2, label: '偶尔讨论，但没有沉淀' },
      { value: 3, label: '能总结一些原因，但难转化成动作' },
      { value: 4, label: '会定期复盘并优化话术或流程' },
      { value: 5, label: '复盘机制成熟，能持续提升转化效率和客户匹配度' }
    ]
  },
  {
    id: 11,
    module: '交付服务',
    text: '客户成交后，团队是否有比较清晰的交付流程、责任分工和时间节点？',
    options: [
      { value: 1, label: '交付常靠临时协调' },
      { value: 2, label: '有大致流程，但经常混乱' },
      { value: 3, label: '关键节点清楚，但执行不稳定' },
      { value: 4, label: '交付流程较清晰，团队知道各自职责' },
      { value: 5, label: '流程、节点、责任人和标准都很明确，交付可控' }
    ]
  },
  {
    id: 12,
    module: '交付服务',
    text: '公司不同员工在交付质量上是否相对稳定，而不是客户体验波动很大？',
    options: [
      { value: 1, label: '谁做差异都很大' },
      { value: 2, label: '部分人能做好，整体不稳定' },
      { value: 3, label: '质量有基本标准，但执行不一致' },
      { value: 4, label: '大多数情况下交付体验稳定' },
      { value: 5, label: '交付标准明确，团队整体质量可控且稳定' }
    ]
  },
  {
    id: 13,
    module: '交付服务',
    text: '客户在交付过程中的问题、反馈和卡点，团队能否被及时响应并形成闭环？',
    options: [
      { value: 1, label: '常常响应不及时，问题拖着' },
      { value: 2, label: '能处理但比较被动' },
      { value: 3, label: '基本能跟进，但闭环不够稳' },
      { value: 4, label: '能较及时处理并推动解决' },
      { value: 5, label: '问题响应机制成熟，客户反馈能快速闭环' }
    ]
  },
  {
    id: 14,
    module: '交付服务',
    text: '团队是否会跟踪客户结果，并通过复购、升级、转介绍等方式延续客户价值？',
    options: [
      { value: 1, label: '交付结束后基本不再跟进' },
      { value: 2, label: '偶尔联系，但没有体系' },
      { value: 3, label: '会做基础回访，但延续动作弱' },
      { value: 4, label: '能跟踪结果并推动部分复购或转介绍' },
      { value: 5, label: '客户经营意识强，续费、升级、转介绍机制较成熟' }
    ]
  },
  {
    id: 15,
    module: '交付服务',
    text: '作为老板，你是否能比较清楚地看到项目进度、风险点和团队当前交付状态？',
    options: [
      { value: 1, label: '很多情况看不见，只能出事后才知道' },
      { value: 2, label: '能看到部分，但很零散' },
      { value: 3, label: '关键项目大致可见，但细节不稳定' },
      { value: 4, label: '大部分交付进度和风险能及时掌握' },
      { value: 5, label: '交付状态透明，老板能及时发现问题并做决策' }
    ]
  },
  {
    id: 16,
    module: 'AI应用',
    text: '团队对AI工具的认知和使用层次，目前大概处于什么水平？',
    options: [
      { value: 1, label: '大多数人几乎不用AI' },
      { value: 2, label: '少数人会用简单问答工具' },
      { value: 3, label: '团队已普遍接触AI，但使用还偏浅' },
      { value: 4, label: '多数岗位已能把AI用于实际工作' },
      { value: 5, label: '团队对不同模型和工具有明确理解，能按场景选择使用' }
    ]
  },
  {
    id: 17,
    module: 'AI应用',
    text: '在内容相关工作里，团队是否已经把AI用于选题、脚本、改写、素材整理等实际环节？',
    options: [
      { value: 1, label: '几乎没用' },
      { value: 2, label: '偶尔拿AI写几句文案' },
      { value: 3, label: '已用于部分内容环节，但不稳定' },
      { value: 4, label: '多个内容环节已在使用AI提效' },
      { value: 5, label: 'AI已成为内容生产中的常规能力，并能明显提升效率' }
    ]
  },
  {
    id: 18,
    module: 'AI应用',
    text: '在销售、客服、私域运营、线索整理等环节，团队是否已经实际使用AI辅助？',
    options: [
      { value: 1, label: '基本没有' },
      { value: 2, label: '偶尔试用，但没形成习惯' },
      { value: 3, label: '部分岗位开始使用' },
      { value: 4, label: '多个转化环节已在使用AI' },
      { value: 5, label: 'AI已嵌入线索承接、分析、跟进等日常流程' }
    ]
  },
  {
    id: 19,
    module: 'AI应用',
    text: '团队是否具备更进一步的AI能力，比如AI编程、工作流自动化、批量处理、系统连接？',
    options: [
      { value: 1, label: '完全没有' },
      { value: 2, label: '听说过但基本不会' },
      { value: 3, label: '有人能做一点简单自动化' },
      { value: 4, label: '已能在部分业务里做自动化或工作流' },
      { value: 5, label: '具备较成熟的AI自动化/工作流能力，能解决实际业务问题' }
    ]
  },
  {
    id: 20,
    module: 'AI应用',
    text: '从老板视角看，AI目前在公司里更像“偶尔用的工具”，还是已经真正进入业务流程并产生结果？',
    options: [
      { value: 1, label: '只是零散尝试' },
      { value: 2, label: '有一些使用，但和业务结果关系不大' },
      { value: 3, label: '部分流程开始接入AI' },
      { value: 4, label: 'AI已在多个业务环节产生可见效果' },
      { value: 5, label: 'AI已与业务流程深度结合，成为组织效率的一部分' }
    ]
  }
];

export default function App() {
  const apiBaseUrl = (import.meta as any).env?.VITE_API_BASE_URL || '';
  const apiUrl = (p: string) => `${apiBaseUrl}`.replace(/\/+$/, '') + p;

  const [started, setStarted] = useState(false);
  const [userInfo, setUserInfo] = useState({ nickname: '', phone: '' });
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(20).fill(0));
  const [result, setResult] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInfo.nickname && userInfo.phone) {
      setStarted(true);
    }
  };

  const handleSelect = async (score: number) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = score;
    setAnswers(newAnswers);

    if (currentStep < 19) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
    } else {
      setSubmitting(true);
      try {
        const res = await fetch(apiUrl('/api/submit'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nickname: userInfo.nickname,
            phone: userInfo.phone,
            type: 'management',
            answers: newAnswers
          })
        });
        const data = await res.json();
        if (data.success) {
          setResult(data.result);
        } else {
          alert('提交失败，请重试');
        }
      } catch (error) {
        console.error('Submit error:', error);
        alert('网络错误，请重试');
      } finally {
        setSubmitting(false);
      }
    }
  };

  const getScoreColorClass = (score: number) => {
    if (score >= 4.3) return 'emerald';
    if (score >= 3.5) return 'emerald';
    if (score >= 2.7) return 'amber';
    return 'rose';
  };

  const renderResult = () => {
    if (!result) return null;

    return (
      <div className="max-w-4xl mx-auto space-y-12 pb-12 animate-fade-in">
        {/* Header */}
        <div className="text-center pt-8">
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 tracking-tight">
            你的AI提效现状诊断结果
          </h2>
          <p className="text-emerald-400 font-bold mt-4 text-lg">老板管理版</p>
        </div>

        {/* Section 1: Business Flow */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xl border border-emerald-500/30">1</div>
            <h3 className="text-2xl font-bold text-white">业务流程评估</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: '内容获客', avg: result.content_avg, stage: result.content_label, desc: result.content_desc },
              { label: '线索转化', avg: result.conversion_avg, stage: result.conversion_label, desc: result.conversion_desc },
              { label: '交付服务', avg: result.delivery_avg, stage: result.delivery_label, desc: result.delivery_desc }
            ].map((m, idx) => {
              const c = getScoreColorClass(m.avg);
              
              let borderClass = 'border-slate-800';
              let ringClass = '';
              let valueColorClass = 'text-white';
              let stageBgClass = 'bg-slate-800';
              let stageTextClass = 'text-slate-400';
              
              if (m.label === result.priority_module_label) {
                borderClass = 'border-rose-500/50';
                ringClass = 'ring-1 ring-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.15)]';
              }
              
              if (c === 'emerald') {
                valueColorClass = 'text-emerald-400';
                stageBgClass = 'bg-emerald-500/10';
                stageTextClass = 'text-emerald-400';
              } else if (c === 'amber') {
                valueColorClass = 'text-amber-400';
                stageBgClass = 'bg-amber-500/10';
                stageTextClass = 'text-amber-400';
              } else if (c === 'rose') {
                valueColorClass = 'text-rose-400';
                stageBgClass = 'bg-rose-500/10';
                stageTextClass = 'text-rose-400';
              }

              return (
                <div key={idx} className={`relative p-6 rounded-2xl bg-slate-900 border-2 transition-all ${borderClass} ${ringClass}`}>
                  {m.label === result.priority_module_label && (
                    <div className="absolute -top-3 right-4 bg-rose-500 text-white text-[10px] font-black px-2 py-1 rounded-md tracking-wider">
                      优先优化
                    </div>
                  )}
                  <div className="flex justify-between items-end mb-4">
                    <div className="text-slate-300 font-bold text-lg">{m.label}</div>
                    <div className={`text-4xl font-black ${valueColorClass}`}>
                      {m.avg.toFixed(1)}
                    </div>
                  </div>
                  <div className={`inline-block px-3 py-1 rounded-md text-xs font-bold mb-4 ${stageBgClass} ${stageTextClass}`}>
                    {m.stage}
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* 低分题展示 */}
          {result.priority_questions && result.priority_questions.length > 0 && (
            <div className="mt-6 p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
              <h4 className="text-lg font-bold text-rose-400 mb-2">当前最需要优先处理的细节</h4>
              <p className="text-slate-400 text-sm mb-6">以下问题是你这次问卷里得分最低的关键项，通常也是老板最容易感受到“团队看起来很忙，但结果不稳定”的原因所在。建议优先从这1-3个点入手，而不是同时大改所有流程。</p>
              <div className="space-y-4">
                {result.priority_questions.map((q: any, idx: number) => {
                  const qData = questions.find(item => item.id === q.qId);
                  const selectedOption = qData?.options.find(opt => opt.value === q.score);
                  return (
                    <div key={idx} className="p-5 bg-slate-900 rounded-xl border border-slate-800 flex flex-col md:flex-row gap-6 justify-between items-start">
                      <div className="flex-1">
                        <div className="text-slate-300 font-medium mb-3">{qData?.text}</div>
                        <div className="flex items-start gap-2 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                          <span className="text-rose-400 font-black mt-0.5">·</span>
                          <span className="text-slate-400 text-sm leading-relaxed">{selectedOption?.label}</span>
                        </div>
                      </div>
                      <div className="shrink-0 flex flex-col items-center justify-center bg-rose-500/10 px-4 py-3 rounded-xl border border-rose-500/20 min-w-[80px]">
                        <div className="text-rose-400 font-black text-2xl leading-none">{q.score}</div>
                        <div className="text-rose-500/60 text-[10px] font-bold mt-1">得分</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Section 2: AI Application */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-xl border border-cyan-500/30">2</div>
            <h3 className="text-2xl font-bold text-white">AI应用评估</h3>
          </div>
          
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row gap-8 items-center">
            <div className="shrink-0 text-center md:border-r border-slate-800 md:pr-8">
              <div className="text-slate-500 text-sm font-bold mb-2">综合得分</div>
              <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-500">
                {result.ai_avg.toFixed(1)}
              </div>
            </div>
            <div className="flex-1">
              <div className="inline-block px-3 py-1 rounded-md text-xs font-bold mb-4 bg-cyan-500/10 text-cyan-400">
                {result.ai_stage_label}
              </div>
              <p className="text-slate-300 text-lg leading-relaxed">
                {result.ai_stage_desc}
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Overall Suggestion */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-xl border border-purple-500/30">3</div>
            <h3 className="text-2xl font-bold text-white">整体建议</h3>
          </div>
          
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-500"></div>
            
            <div className="p-8 border-b border-slate-800">
              <h4 className="text-xl font-bold text-white mb-6">业务流程总述</h4>
              <p className="text-slate-300 leading-relaxed">
                从老板视角看，你的公司当前最需要优先优化的，是<span className="text-rose-400 font-bold mx-1">【{result.priority_module_label}】</span>。这说明问题不一定出在员工不努力，而更可能出在流程、标准、分工或管理可见性不够稳定。
              </p>
            </div>

            <div className="p-8 border-b border-slate-800">
              <h4 className="text-xl font-bold text-white mb-6">AI应用总述</h4>
              <p className="text-slate-300 leading-relaxed">
                目前你公司的AI应用状态属于<span className="text-cyan-400 font-bold mx-1">【{result.ai_stage_label}】</span>。重点不在于是否接触过AI，而在于AI是否已经真正进入业务流程，并带来可持续的效率提升。
              </p>
            </div>

            <div className="p-8 bg-purple-500/5">
              <h4 className="text-xl font-bold text-purple-400 mb-6">{result.quadrant_title}</h4>
              <ul className="space-y-4">
                {result.quadrant_desc.map((desc: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2"></span>
                    <span className="leading-relaxed">{desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (result) return <div className="min-h-screen bg-slate-950 py-12 px-4">{renderResult()}</div>;

  if (!started) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-4">
              AI提效现状自测
            </h1>
            <p className="text-emerald-400 font-bold mb-4 text-sm">老板管理版</p>
            <p className="text-slate-400 text-sm">
              填写基本信息开启你的 20 题专业诊断
            </p>
          </div>
          
          <form onSubmit={handleStart} className="space-y-6">
            <div>
              <label className="block text-slate-300 text-sm font-bold mb-2">你的昵称</label>
              <input 
                type="text" 
                required
                value={userInfo.nickname}
                onChange={e => setUserInfo({...userInfo, nickname: e.target.value})}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                placeholder="怎么称呼你？"
              />
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-bold mb-2">手机号码</label>
              <input 
                type="tel" 
                required
                value={userInfo.phone}
                onChange={e => setUserInfo({...userInfo, phone: e.target.value})}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                placeholder="仅用于确认唯一身份"
              />
              <p className="text-slate-500 text-xs mt-2">* 无需验证码，仅用于后续诊断报告匹配唯一身份</p>
            </div>
            
            <button 
              type="submit"
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-lg rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] mt-4"
            >
              开始诊断 (共20题)
            </button>
          </form>
        </div>
      </div>
    );
  }

  const q = questions[currentStep];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Progress Bar */}
        <div className="mb-8 flex items-center gap-4">
          <div className="text-sm font-bold text-emerald-500 w-12">{currentStep + 1} / 20</div>
          <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-emerald-500 transition-all duration-500 ease-out`}
              style={{ width: `${((currentStep + 1) / 20) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-800">
          <div className="inline-block px-4 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold text-sm mb-6 border border-emerald-500/20">
            [{q.module}]
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 leading-tight">
            {q.text}
          </h2>

          <div className="space-y-3">
            {q.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                disabled={submitting}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  answers[currentStep] === opt.value 
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' 
                    : 'border-slate-800 bg-slate-800/40 text-slate-300 hover:border-slate-600 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-lg leading-relaxed">{opt.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
