import { useState } from 'react';

const questions = [
  {
    id: 1,
    module: '内容获客',
    text: '你现在的内容选题，更多是靠稳定的选题系统，还是靠临时灵感和当天状态？',
    options: [
      { value: 1, label: '几乎完全靠灵感和当天状态决定发什么' },
      { value: 2, label: '多数内容要临时想，选题系统不稳定' },
      { value: 3, label: '有一些选题积累，但经常还是要临时补题' },
      { value: 4, label: '大部分时候有选题储备，偶尔需要临时想' },
      { value: 5, label: '我有稳定的选题来源和选题池，基本不会临时想题' }
    ]
  },
  {
    id: 2,
    module: '内容获客',
    text: '你过去的评论、私信、客户问题、案例和脚本，是否已经沉淀成可复用的内容资产？',
    options: [
      { value: 1, label: '几乎没有沉淀，很多内容都在重复从零开始' },
      { value: 2, label: '很多内容和素材散落各处，复用困难' },
      { value: 3, label: '沉淀比较零散，能找但效率一般' },
      { value: 4, label: '大部分有沉淀，但偶尔找起来不方便' },
      { value: 5, label: '已系统沉淀，随时能检索和复用' }
    ]
  },
  {
    id: 3,
    module: '内容获客',
    text: '你是否感觉写脚本、整理结构、提炼标题和开头这件事，持续消耗你大量脑力和时间？',
    options: [
      { value: 1, label: '脚本生产高度依赖状态，常常想得多写得少' },
      { value: 2, label: '经常卡在结构、表达或开头，出稿很慢' },
      { value: 3, label: '需要反复修改，效率一般' },
      { value: 4, label: '大多数内容能较快写完，偶尔卡壳' },
      { value: 5, label: '有稳定模板和流程，出稿效率高' }
    ]
  },
  {
    id: 4,
    module: '内容获客',
    text: '你发布内容后，是否能比较清楚地知道：哪些内容带来高质量咨询，哪些只是有流量没转化？',
    options: [
      { value: 1, label: '基本不清楚哪些内容真正带来客户' },
      { value: 2, label: '更多只看流量，对转化质量判断模糊' },
      { value: 3, label: '会看数据，但和线索质量关联不够清楚' },
      { value: 4, label: '大体能判断，偶尔有偏差' },
      { value: 5, label: '非常清楚，能稳定识别高质量内容' }
    ]
  },
  {
    id: 5,
    module: '内容获客',
    text: '你现在的内容生产，更像“持续稳定的系统”，还是“靠你本人硬顶”？',
    options: [
      { value: 1, label: '几乎全靠我自己硬撑，一停就容易断' },
      { value: 2, label: '很多环节都离不开我亲自盯' },
      { value: 3, label: '能运转，但明显受我个人状态影响' },
      { value: 4, label: '整体还算稳定，但部分环节仍依赖我' },
      { value: 5, label: '已经比较系统，离开我的临场状态也能稳定运转' }
    ]
  },
  {
    id: 6,
    module: '线索转化',
    text: '当用户在公域平台私信你时，你是否已经有一套比较稳定的承接逻辑？',
    options: [
      { value: 1, label: '几乎没有承接逻辑，私信来了就随手回' },
      { value: 2, label: '多数时候靠临场发挥' },
      { value: 3, label: '有一些经验，但不够稳定' },
      { value: 4, label: '大体有逻辑，偶尔会随机应对' },
      { value: 5, label: '有清晰承接逻辑，知道该怎么回、怎么导私域' }
    ]
  },
  {
    id: 7,
    module: '线索转化',
    text: '客户加到微信后，你是否能快速判断：谁值得重点推进，谁只适合继续观察？',
    options: [
      { value: 1, label: '基本分不清，私域时间被大量低质量客户占用' },
      { value: 2, label: '经常聊了很多才发现不匹配' },
      { value: 3, label: '需要聊一阵才能分清' },
      { value: 4, label: '大多数能判断，偶尔误判' },
      { value: 5, label: '能很快分层，推进路径清晰' }
    ]
  },
  {
    id: 8,
    module: '线索转化',
    text: '你是否已经有比较清晰的诊断推进逻辑，比如谁先做信息了解、谁直接推进、谁继续培育？',
    options: [
      { value: 1, label: '几乎没有分流，靠临场感觉推进' },
      { value: 2, label: '很多客户都走成一个流程，效率不高' },
      { value: 3, label: '有初步想法，但执行时常常混乱' },
      { value: 4, label: '大体有思路，但还不够稳定' },
      { value: 5, label: '分流机制清晰，不同客户走不同路径' }
    ]
  },
  {
    id: 9,
    module: '线索转化',
    text: '当客户犹豫要不要继续做诊断或付费时，你是否有成熟的回应方式和案例支撑？',
    options: [
      { value: 1, label: '推进高度随缘，异议处理很弱' },
      { value: 2, label: '经常不知道客户为什么卡住' },
      { value: 3, label: '能推进，但很多时候还是靠经验发挥' },
      { value: 4, label: '大多数问题能接住，偶尔需要临时想' },
      { value: 5, label: '有稳定的异议回应逻辑和案例，推进比较顺' }
    ]
  },
  {
    id: 10,
    module: '线索转化',
    text: '你是否会系统复盘：哪类私信最容易加V、哪类客户最容易成交、哪种话术最有效？',
    options: [
      { value: 1, label: '几乎不复盘，承接和推进逻辑一直靠个人经验' },
      { value: 2, label: '大多靠感觉，复盘很少' },
      { value: 3, label: '知道应该复盘，但做得不系统' },
      { value: 4, label: '偶尔会回看并调整' },
      { value: 5, label: '会持续复盘，承接和推进逻辑在不断优化' }
    ]
  },
  {
    id: 11,
    module: '交付服务',
    text: '客户成交后，你是否已经有一套清晰的开案与交付准备流程？',
    options: [
      { value: 1, label: '几乎没有标准流程，每个客户都重新开始' },
      { value: 2, label: '经常边开案边补资料' },
      { value: 3, label: '有一些固定动作，但还不够系统' },
      { value: 4, label: '基本有流程，偶尔需要补充' },
      { value: 5, label: '有固定开案流程、资料和启动模板' }
    ]
  },
  {
    id: 12,
    module: '交付服务',
    text: '在服务过程中，你是否经常要重复回答相似问题、反复找资料、重复做相似解释？',
    options: [
      { value: 1, label: '大量时间耗在重复劳动上，交付明显变重' },
      { value: 2, label: '经常反复答疑、找资料、解释相似问题' },
      { value: 3, label: '重复问题不少，已开始影响效率' },
      { value: 4, label: '偶尔有重复劳动，但整体可控' },
      { value: 5, label: '重复问题很少，大多已沉淀可复用' }
    ]
  },
  {
    id: 13,
    module: '交付服务',
    text: '你的交付资料、FAQ、案例和处理经验，是否已经沉淀成团队或自己可复用的知识资产？',
    options: [
      { value: 1, label: '几乎没有沉淀，每个客户都像重新做一遍' },
      { value: 2, label: '很多经验和资料还在脑子里或聊天记录里' },
      { value: 3, label: '有沉淀，但比较零散' },
      { value: 4, label: '大部分已沉淀，偶尔不够方便' },
      { value: 5, label: '沉淀清晰，随时能调用' }
    ]
  },
  {
    id: 14,
    module: '交付服务',
    text: '你是否能清楚跟踪客户的推进状态、风险、续费机会和可沉淀案例？',
    options: [
      { value: 1, label: '基本靠事后回想，容易错过风险和机会' },
      { value: 2, label: '经常不清楚谁在掉队、谁适合续费' },
      { value: 3, label: '对部分客户有感觉，但整体跟踪不系统' },
      { value: 4, label: '大部分客户状态清楚，偶尔有遗漏' },
      { value: 5, label: '很清楚，客户状态和机会都能及时把握' }
    ]
  },
  {
    id: 15,
    module: '交付服务',
    text: '你的服务交付，目前更像“可复制的系统”，还是“依赖你个人经验和临场处理”？',
    options: [
      { value: 1, label: '几乎完全依赖我本人，客户一多就容易乱' },
      { value: 2, label: '很多交付质量仍然靠我个人兜底' },
      { value: 3, label: '能交付，但系统化程度一般' },
      { value: 4, label: '整体可运行，但关键处还依赖我' },
      { value: 5, label: '已有较清晰的交付系统，不强依赖我本人' }
    ]
  },
  {
    id: 16,
    module: 'AI应用情况',
    text: '你目前日常使用AI模型的深度，更接近哪一种？',
    options: [
      { value: 1, label: '几乎不用AI，或者只偶尔用豆包/DeepSeek随便问问' },
      { value: 2, label: '会固定用1个国内模型处理简单内容问题' },
      { value: 3, label: '会用2个以上模型，对不同任务做区分（如写作、搜索、分析）' },
      { value: 4, label: '会根据任务切换国内外模型，知道不同模型的优劣' },
      { value: 5, label: '已经形成稳定的多模型协同习惯，会根据业务场景主动选模型' }
    ]
  },
  {
    id: 17,
    module: 'AI应用情况',
    text: '你目前使用AI，更多停留在哪种层级？',
    options: [
      { value: 1, label: '主要就是对话问答、写几句文案' },
      { value: 2, label: '会固定用提示词做内容、总结、翻译等轻任务' },
      { value: 3, label: '会用AI辅助写代码、搭表格、做简单自动化或Agent' },
      { value: 4, label: '会用AI搭工作流、连接多个工具处理一段流程' },
      { value: 5, label: '已经能用AI完成较完整的业务自动化、轻开发或系统级搭建' }
    ]
  },
  {
    id: 18,
    module: 'AI应用情况',
    text: '你对AIGC（图文、图片、视频、音频等）的应用程度，更接近哪一种？',
    options: [
      { value: 1, label: '基本没有用过AIGC' },
      { value: 2, label: '偶尔用来生成图片、配图或简单短视频' },
      { value: 3, label: '会比较稳定地用AIGC做内容辅助，但更多是单点工具使用' },
      { value: 4, label: '已经把AIGC接入内容生产流程，比如脚本、画面、视频、封面等多个环节' },
      { value: 5, label: 'AIGC已经成为内容生产中的稳定能力，能明显提升产能和效率' }
    ]
  },
  {
    id: 19,
    module: 'AI应用情况',
    text: '你有没有把“自己的业务知识”接入AI，而不是只用通用模型？',
    options: [
      { value: 1, label: '完全没有，AI只用通用聊天能力' },
      { value: 2, label: '有这个想法，但还没开始整理自己的业务知识' },
      { value: 3, label: '已经开始整理FAQ、案例、资料，但还没有真正接入AI' },
      { value: 4, label: '已经把部分业务资料、FAQ、案例接入AI做辅助使用' },
      { value: 5, label: '已经形成较稳定的业务知识库/私有语料体系，AI回答明显更贴近自己的业务' }
    ]
  },
  {
    id: 20,
    module: 'AI应用情况',
    text: '你现在的AI使用，和你的真实业务流程结合到什么程度？',
    options: [
      { value: 1, label: '几乎没有结合真实业务，只是偶尔体验' },
      { value: 2, label: '会在某些零散环节用AI，但没有固定流程' },
      { value: 3, label: '已经在1-2个固定业务环节中稳定使用AI' },
      { value: 4, label: '已经把AI接入内容获客、线索转化或交付服务中的多个环节' },
      { value: 5, label: 'AI已经成为业务流程的一部分，团队或自己会长期按固定方式使用' }
    ]
  }
];

export default function App() {
  const [started, setStarted] = useState(false);
  const [userInfo, setUserInfo] = useState({ nickname: '', phone: '' });
  const [answers, setAnswers] = useState<number[]>(Array(20).fill(0));
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInfo.nickname.trim()) {
      alert("请输入昵称");
      return;
    }
    
    // Validate phone number (Chinese mobile format: 11 digits starting with 1)
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(userInfo.phone.trim())) {
      alert("请输入正确的11位手机号码");
      return;
    }
    
    setStarted(true);
  };

  const handleSelect = (val: number) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = val;
    setAnswers(newAnswers);
    if (currentStep < 19) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
    }
  };

  const handleSubmit = async () => {
    if (answers.includes(0)) {
      alert("请回答所有问题！");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nickname: userInfo.nickname,
          phone: userInfo.phone,
          answers 
        })
      });
      const data = await res.json();
      setResult(data.result);
    } catch (error) {
      console.error(error);
      alert("提交失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  const renderResult = () => {
    if (!result) return null;
    
    return (
      <div className="max-w-4xl mx-auto p-8 bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 animate-fade-in">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-4">
            你的AI提效现状诊断结果
          </h2>
        </div>

        {/* 模块1：业务流程 */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/20 text-rose-400">1</span>
            业务流程评估
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { name: '内容获客', label: result.content_label, desc: result.content_desc, score: result.content_avg },
              { name: '线索转化', label: result.conversion_label, desc: result.conversion_desc, score: result.conversion_avg },
              { name: '交付服务', label: result.delivery_label, desc: result.delivery_desc, score: result.delivery_avg }
            ].map(m => {
              const isLowest = m.name === result.priority_module_label;
              const colorClass = m.score >= 4.3 ? 'emerald' : m.score >= 3.5 ? 'blue' : m.score >= 2.7 ? 'amber' : 'rose';
              
              return (
                <div key={m.name} className={`p-5 rounded-2xl border-2 transition-all relative overflow-hidden bg-slate-800/50 ${isLowest ? `border-${colorClass}-500 shadow-[0_0_20px_rgba(var(--color-${colorClass}-500),0.1)]` : 'border-slate-800'}`}>
                  {isLowest && <div className={`absolute top-0 right-0 px-2 py-1 bg-${colorClass}-500 text-slate-950 text-[10px] font-black rounded-bl-lg`}>优先优化</div>}
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-slate-300 font-bold">{m.name}</div>
                    <div className={`text-2xl font-black text-${colorClass}-400`}>{m.score.toFixed(1)}</div>
                  </div>
                  <div className={`inline-block px-2 py-1 rounded text-xs font-bold mb-3 bg-${colorClass}-500/20 text-${colorClass}-400`}>
                    {m.label}
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{m.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 模块2：AI应用 */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400">2</span>
            AI应用评估
          </h3>
          <div className="p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 flex flex-col md:flex-row items-center gap-8">
            <div className="shrink-0 text-center md:border-r border-slate-700 md:pr-8">
              <div className="text-slate-400 text-sm mb-2">综合得分</div>
              <div className="text-5xl font-black text-cyan-400 mb-2">{result.ai_avg.toFixed(1)}</div>
            </div>
            <div className="flex-1">
              <p className="text-slate-300 text-lg leading-relaxed">{result.ai_stage_desc}</p>
            </div>
          </div>
        </div>

        {/* 模块3：整体建议 */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400">3</span>
            整体建议
          </h3>
          
          <div className="p-8 bg-slate-950 rounded-2xl border border-slate-800 mb-6 relative overflow-hidden">
            {/* 四象限图 */}
            <div className="relative w-full max-w-md mx-auto aspect-square mb-8">
              {/* 背景和轴 */}
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                <div className={`border-r border-b border-slate-700/50 flex items-center justify-center p-4 transition-all ${result.quadrant_title === '流程弱，AI强' ? 'bg-emerald-500/10' : ''}`}>
                  <span className={`text-sm font-bold ${result.quadrant_title === '流程弱，AI强' ? 'text-emerald-400' : 'text-slate-600'}`}>流程弱，AI强</span>
                </div>
                <div className={`border-b border-slate-700/50 flex items-center justify-center p-4 transition-all ${result.quadrant_title === '流程强，AI强' ? 'bg-emerald-500/10' : ''}`}>
                  <span className={`text-sm font-bold ${result.quadrant_title === '流程强，AI强' ? 'text-emerald-400' : 'text-slate-600'}`}>流程强，AI强</span>
                </div>
                <div className={`border-r border-slate-700/50 flex items-center justify-center p-4 transition-all ${result.quadrant_title === '流程弱，AI弱' ? 'bg-emerald-500/10' : ''}`}>
                  <span className={`text-sm font-bold ${result.quadrant_title === '流程弱，AI弱' ? 'text-emerald-400' : 'text-slate-600'}`}>流程弱，AI弱</span>
                </div>
                <div className={`flex items-center justify-center p-4 transition-all ${result.quadrant_title === '流程强，AI弱' ? 'bg-emerald-500/10' : ''}`}>
                  <span className={`text-sm font-bold ${result.quadrant_title === '流程强，AI弱' ? 'text-emerald-400' : 'text-slate-600'}`}>流程强，AI弱</span>
                </div>
              </div>
              
              {/* 坐标轴标签 */}
              <div className="absolute top-1/2 -left-8 -translate-y-1/2 -rotate-90 text-xs text-slate-500 font-bold tracking-widest">AI应用</div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-slate-500 font-bold tracking-widest">业务流程</div>
              
              {/* 刻度线 */}
              {[1, 5].map(tick => {
                const pos = tick <= 3.5 ? ((tick - 1) / 2.5) * 50 : 50 + ((tick - 3.5) / 1.5) * 50;
                return (
                  <div key={tick}>
                    {/* X轴刻度 */}
                    <div className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center z-0" style={{ left: `${pos}%` }}>
                      <div className="w-0.5 h-2 bg-slate-600"></div>
                      {tick !== 3.5 && <div className="absolute top-2 text-[10px] text-slate-500 font-medium">{tick}</div>}
                    </div>
                    {/* Y轴刻度 */}
                    <div className="absolute left-1/2 -translate-x-1/2 flex items-center z-0" style={{ top: `${100 - pos}%` }}>
                      <div className="w-2 h-0.5 bg-slate-600"></div>
                      {tick !== 3.5 && <div className="absolute left-2 text-[10px] text-slate-500 font-medium">{tick}</div>}
                    </div>
                  </div>
                );
              })}

              {/* 中心点标尺 */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] text-slate-400 bg-slate-950 px-1 font-bold z-0">3.5</div>

              {/* 用户位置点 */}
              <div 
                className="absolute w-4 h-4 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.8)] -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-1000"
                style={{ 
                  left: `${result.business_avg <= 3.5 ? ((result.business_avg - 1) / 2.5) * 50 : 50 + ((result.business_avg - 3.5) / 1.5) * 50}%`, 
                  top: `${100 - (result.ai_avg <= 3.5 ? ((result.ai_avg - 1) / 2.5) * 50 : 50 + ((result.ai_avg - 3.5) / 1.5) * 50)}%` 
                }}
              >
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold text-emerald-300 bg-slate-900 px-2 py-0.5 rounded border border-emerald-500/30">
                  你在这里
                </div>
                <div className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-emerald-400 bg-slate-900/80 px-1.5 py-0.5 rounded">
                  ({result.business_avg.toFixed(1)}, {result.ai_avg.toFixed(1)})
                </div>
              </div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl">
              <h4 className="text-xl font-bold text-emerald-400 mb-4">{result.quadrant_title}</h4>
              <ul className="space-y-3">
                {result.quadrant_desc.map((desc: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2"></span>
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
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500" />
          <div className="inline-block px-3 py-1 bg-slate-800 text-slate-400 text-xs font-bold rounded-full mb-6 uppercase tracking-wider">
            {q.module}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-100 leading-snug mb-8">
            {q.text}
          </h2>
          
          <div className="space-y-3">
            {q.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
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

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button 
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="px-6 py-3 text-slate-400 font-medium hover:text-white disabled:opacity-30 transition-colors"
          >
            上一题
          </button>
          
          {currentStep === 19 && (
            <button 
              onClick={handleSubmit}
              disabled={answers.includes(0) || loading}
              className="px-8 py-3 bg-emerald-500 text-slate-950 font-bold rounded-full hover:bg-emerald-400 disabled:opacity-50 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]"
            >
              {loading ? '分析中...' : (answers.includes(0) ? '请回答完所有问题' : '提交并生成报告')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
