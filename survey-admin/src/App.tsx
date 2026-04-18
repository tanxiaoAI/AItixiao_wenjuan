import { useState, useEffect } from 'react';

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
  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [selectedAdvice, setSelectedAdvice] = useState<{title: string, desc: string[] | string} | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/users')
      .then(res => res.json())
      .then(data => {
        setResponses(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">用户管理与问卷数据</h1>
            <p className="text-slate-500 mt-2">共收集到 {responses.length} 份有效数据</p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            刷新数据
          </button>
        </header>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 font-semibold text-slate-600 text-sm">ID</th>
                  <th className="p-4 font-semibold text-slate-600 text-sm">用户昵称</th>
                  <th className="p-4 font-semibold text-slate-600 text-sm">手机号</th>
                  <th className="p-4 font-semibold text-slate-600 text-sm">提交时间</th>
                  <th className="p-4 font-semibold text-slate-600 text-sm">整体建议</th>
                  <th className="p-4 font-semibold text-slate-600 text-sm">业务流程评估</th>
                  <th className="p-4 font-semibold text-slate-600 text-sm">AI应用评估</th>
                  <th className="p-4 font-semibold text-slate-600 text-sm">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {responses.map((r) => (
                  <tr key={r.user_id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-slate-500 font-mono">#{r.user_id}</td>
                    <td className="p-4 text-slate-900 font-medium">{r.nickname}</td>
                    <td className="p-4 text-slate-600">{r.phone}</td>
                    <td className="p-4 text-slate-600">{new Date(r.user_created_at).toLocaleString('zh-CN')}</td>
                    <td className="p-4">
                      {r.result_data ? (
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                            {r.result_data.quadrant_title || r.result_data.user_type_label}
                          </span>
                          <button 
                            onClick={() => setSelectedAdvice({
                              title: r.result_data.quadrant_title || r.result_data.user_type_label, 
                              desc: r.result_data.quadrant_desc || r.result_data.user_type_desc
                            })}
                            className="text-xs text-indigo-600 hover:text-indigo-800 underline"
                          >
                            查看建议
                          </button>
                        </div>
                      ) : <span className="text-slate-400 text-sm">未完成问卷</span>}
                    </td>
                    <td className="p-4">
                      {r.result_data && (
                        <div className="flex flex-col gap-1 text-xs">
                          <div><span className="text-slate-500 w-16 inline-block">平均总分:</span> <span className="font-black text-slate-900">{r.result_data.business_avg.toFixed(1)}</span></div>
                          <div><span className="text-slate-500 w-16 inline-block">内容获客:</span> <span className="font-bold text-slate-700">{r.result_data.content_avg.toFixed(1)}</span></div>
                          <div><span className="text-slate-500 w-16 inline-block">线索转化:</span> <span className="font-bold text-slate-700">{r.result_data.conversion_avg.toFixed(1)}</span></div>
                          <div><span className="text-slate-500 w-16 inline-block">交付服务:</span> <span className="font-bold text-slate-700">{r.result_data.delivery_avg.toFixed(1)}</span></div>
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      {r.result_data && (
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-cyan-700">{r.result_data.ai_avg.toFixed(1)} 分</span>
                          <button 
                            onClick={() => setSelectedAdvice({
                              title: 'AI应用评估建议', 
                              desc: r.result_data.ai_stage_desc
                            })}
                            className="text-xs text-indigo-600 hover:text-indigo-800 underline"
                          >
                            查看文案
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      {r.result_data && (
                        <button 
                          onClick={() => setSelectedUser(r)}
                          className="text-emerald-600 hover:text-emerald-700 font-medium text-sm border border-emerald-600 px-3 py-1 rounded"
                        >
                          查看详情
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {responses.length === 0 && (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-500">
                      暂无数据
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for details */}
      {selectedUser && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50 animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col my-8">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center shrink-0">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{selectedUser.nickname} 的诊断报告</h2>
                <p className="text-slate-500 text-sm mt-1">{selectedUser.phone} · {new Date(selectedUser.created_at).toLocaleString('zh-CN')}</p>
              </div>
              <button 
                onClick={() => setSelectedUser(null)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 space-y-8">
              {/* 所有题目明细 */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 border-b pb-2">详细答卷记录</h3>
                <div className="space-y-4">
                  {Array.from({ length: 20 }).map((_, i) => {
                    const qId = i + 1;
                    const score = selectedUser[`q${qId}`];
                    let moduleName = '';
                    if (qId <= 5) moduleName = '内容获客';
                    else if (qId <= 10) moduleName = '线索转化';
                    else if (qId <= 15) moduleName = '交付服务';
                    else moduleName = 'AI应用情况';

                    const qData = questions.find(q => q.id === qId);
                    const selectedOption = qData?.options.find(opt => opt.value === score);

                    return (
                      <div key={qId} className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex flex-col gap-2">
                        <div className="flex items-start justify-between gap-4">
                          <div className="text-sm font-bold text-slate-700">
                            <span className="text-indigo-600 mr-2">[{moduleName}]</span>
                            Q{qId}. {qData?.text}
                          </div>
                          <div className={`shrink-0 font-black text-lg ${score <= 3 ? 'text-rose-500' : 'text-emerald-500'}`}>
                            {score} 分
                          </div>
                        </div>
                        <div className="text-sm text-slate-600 bg-white p-3 rounded border border-slate-100">
                          答：{selectedOption?.label || '未知选项'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Advice */}
      {selectedAdvice && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center shrink-0">
              <h2 className="text-xl font-bold text-slate-900">{selectedAdvice.title}</h2>
              <button 
                onClick={() => setSelectedAdvice(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-3">
              {Array.isArray(selectedAdvice.desc) ? (
                <ul className="space-y-3">
                  {selectedAdvice.desc.map((d, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700">
                      <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2"></span>
                      <span className="leading-relaxed">{d}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-700 leading-relaxed">{selectedAdvice.desc}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
