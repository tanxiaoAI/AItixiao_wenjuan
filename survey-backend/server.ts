const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const path = require('path');
const fs = require('fs');

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

const frontendDistDir = path.join(__dirname, 'public', 'frontend');
const adminDistDir = path.join(__dirname, 'public', 'admin');
const businessDistDir = path.join(__dirname, 'public', 'business');
const frontendIndexHtml = path.join(frontendDistDir, 'index.html');
const adminIndexHtml = path.join(adminDistDir, 'index.html');
const businessIndexHtml = path.join(businessDistDir, 'index.html');

const hasFrontend = fs.existsSync(frontendIndexHtml);
const hasAdmin = fs.existsSync(adminIndexHtml);
const hasBusiness = fs.existsSync(businessIndexHtml);

if (hasAdmin) {
  app.use('/admin', express.static(adminDistDir));
}

app.get(/^\/admin(\/.*)?$/, (req, res) => {
  if (fs.existsSync(adminIndexHtml)) {
    return res.sendFile(adminIndexHtml);
  }
  res.status(503).json({ ok: false, error: 'admin bundle not found' });
});

if (hasBusiness) {
  app.use('/business', express.static(businessDistDir));
}

app.get(/^\/business(\/.*)?$/, (req, res) => {
  if (fs.existsSync(businessIndexHtml)) {
    return res.sendFile(businessIndexHtml);
  }
  res.status(503).json({ ok: false, error: 'business bundle not found' });
});

if (hasFrontend) {
  app.use(express.static(frontendDistDir));
}

app.get('/', (req, res) => {
  if (hasFrontend) {
    return res.sendFile(frontendIndexHtml);
  }
  res.type('text/plain').send(
    [
      'AI提效问卷后端 API 已运行',
      '',
      '可用接口：',
      '- GET  /api/users',
      '- POST /api/submit',
      '- GET  /health'
    ].join('\n')
  );
});

app.get('/health', (req, res) => {
  res.json({
    ok: true,
    hasFrontend: fs.existsSync(frontendIndexHtml),
    hasAdmin: fs.existsSync(adminIndexHtml),
    hasBusiness: fs.existsSync(businessIndexHtml),
    dbPath
  });
});

// Initialize SQLite Database
const configuredDbPath = process.env.SQLITE_DB_PATH;
const defaultDbDir = fs.existsSync('/data') ? '/data' : __dirname;
const dbPath = configuredDbPath
  ? path.resolve(configuredDbPath)
  : path.join(defaultDbDir, 'survey.db');

fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    console.log(`Using SQLite database at: ${dbPath}`);
    
    // Create Users Table
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nickname TEXT NOT NULL,
      phone TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(nickname, phone)
    )`);

    // Create Responses Table linked to users
    db.run(`CREATE TABLE IF NOT EXISTS responses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      q1 INTEGER, q2 INTEGER, q3 INTEGER, q4 INTEGER, q5 INTEGER,
      q6 INTEGER, q7 INTEGER, q8 INTEGER, q9 INTEGER, q10 INTEGER,
      q11 INTEGER, q12 INTEGER, q13 INTEGER, q14 INTEGER, q15 INTEGER,
      q16 INTEGER, q17 INTEGER, q18 INTEGER, q19 INTEGER, q20 INTEGER,
      content_avg REAL,
      conversion_avg REAL,
      delivery_avg REAL,
      business_avg REAL,
      ai_avg REAL,
      result_data TEXT,
      type TEXT DEFAULT 'execution',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )`, (err) => {
      if (!err) {
        db.run(`ALTER TABLE responses ADD COLUMN type TEXT DEFAULT 'execution'`, () => {});
      }
    });
  }
});

// Helper functions for scoring logic
function getBusinessStageLabel(score, type = 'execution') {
  if (type === 'management') {
    if (score >= 4.3) return { label: '系统成熟', desc: '这一模块已经比较稳定，继续加油' };
    if (score >= 3.5) return { label: '基本成型', desc: '这一模块已有较清晰流程，但仍有局部可优化空间' };
    if (score >= 2.7) return { label: '明显卡点', desc: '这一模块已经开始拖慢效率，建议尽快梳理关键问题' };
    return { label: '主要瓶颈', desc: '这一模块成熟度偏低，已经明显影响业务效率和结果，建议优先优化' };
  } else {
    if (score >= 4.3) return { label: '系统成熟', desc: '这一模块已经比较稳定，继续加油' };
    if (score >= 3.5) return { label: '基本成型', desc: '这一模块已有较清晰流程，但仍有局部可优化空间' };
    if (score >= 2.7) return { label: '明显卡点', desc: '这一模块已经开始拖慢效率，建议尽快梳理关键问题' };
    return { label: '主要瓶颈', desc: '这一模块成熟度偏低，已经明显影响业务效率和结果，建议优先优化' };
  }
}

function getAiStageLabel(score, type = 'execution') {
  if (type === 'management') {
    if (score >= 4.3) return { label: '系统融入型', desc: '你的公司不是简单在试AI工具，而是已经把AI逐步接进业务流程里。团队在内容、销售、运营或自动化方面，已经形成比较明确的使用方式。下一步重点是做得更深，而不是再去尝试更多零散工具。' };
    if (score >= 3.5) return { label: '场景应用型', desc: '你的公司已经在多个场景里使用AI，也能看到一定效果，但整体还没有完全组织化。当前适合做的是梳理高频场景、统一方法和标准，让AI从“有人会用”变成“团队普遍会用”。' };
    if (score >= 2.5) return { label: '尝试试用型', desc: '你的公司已经接触并试用了AI，但大多数使用还停留在零散层面。工具可能用过不少，但和业务结果之间还没有形成稳定关系。当前重点不是继续加工具，而是先明确哪些环节最值得真正接入。' };
    return { label: '旁观观望型', desc: '你的公司在AI应用上整体还比较初级，更多是了解过、听说过，或者只有少数人偶尔使用。现阶段最重要的不是追热点，而是先找到1-2个高频业务场景，让团队真实体验到AI带来的效率提升。' };
  } else {
    if (score >= 4.3) return { label: '系统化应用期', desc: '你已经把AI较稳定地接入业务流程，重点不再是“会不会用”，而是怎么放大结果' };
    if (score >= 3.5) return { label: '流程接入期', desc: '你已经开始在多个业务环节中稳定使用AI，接下来重点是把单点用法进一步变成系统' };
    if (score >= 2.7) return { label: '单点应用期', desc: '你已经在部分工作中使用AI，但更多还是局部提效，尚未真正形成完整工作流' };
    if (score >= 1.9) return { label: '工具使用期', desc: '你已经开始接触并使用AI工具，但应用仍偏零散，离业务系统提效还有明显距离' };
    return { label: '起步体验期', desc: '你现在对AI更多还是体验和零散试用，距离真正进入业务还有明显距离' };
  }
}

function computeResultDataFromAnswers(answers, type = 'execution') {
  const businessScores = answers.slice(0, 15);
  const content_avg = businessScores.slice(0, 5).reduce((a, b) => a + b, 0) / 5;
  const conversion_avg = businessScores.slice(5, 10).reduce((a, b) => a + b, 0) / 5;
  const delivery_avg = businessScores.slice(10, 15).reduce((a, b) => a + b, 0) / 5;
  const business_avg = (content_avg + conversion_avg + delivery_avg) / 3;

  const aiScores = answers.slice(15, 20);
  const ai_avg = aiScores.reduce((a, b) => a + b, 0) / 5;

  const modules = [
    { name: '内容获客', avg: content_avg, order: 1 },
    { name: '线索转化', avg: conversion_avg, order: 2 },
    { name: '交付服务', avg: delivery_avg, order: 3 }
  ];
  modules.sort((a, b) => {
    if (a.avg === b.avg) return a.order - b.order;
    return a.avg - b.avg;
  });
  const priority_module_label = modules[0].name;

  const allBusinessScores = businessScores.map((score, idx) => ({ qId: idx + 1, score }));
  const filteredQuestions = allBusinessScores.filter(q => q.score <= 3);
  filteredQuestions.sort((a, b) => a.score - b.score);
  const priority_questions = filteredQuestions.slice(0, 3);

  let quadrant_label = '';
  let quadrant_title = '';
  let quadrant_desc = [];

  if (type === 'management') {
    if (business_avg < 3.5 && ai_avg < 3.5) {
      quadrant_label = '流程弱，AI弱';
      quadrant_title = '流程弱，AI弱';
      quadrant_desc = [
        '你的公司当前更大的问题不是“AI没用起来”，而是很多基础业务流程本身就还不够稳定。对于这种情况，最有效的方式不是先追求复杂AI方案，而是先补齐内容、转化或交付里的核心短板，再把AI接入关键环节。',
        '建议优先处理最低业务模块，再选择1-2个高频场景做AI辅助。'
      ];
    } else if (business_avg >= 3.5 && ai_avg < 3.5) {
      quadrant_label = '流程强，AI弱';
      quadrant_title = '流程强，AI弱';
      quadrant_desc = [
        '你的公司业务基础其实已经具备，团队也不是完全没有能力，真正的机会点在于通过AI把现有流程做得更快、更省、更标准。你现在缺的不是从0搭系统，而是给已有系统做效率升级。',
        '建议先选最耗时、最重复、最容易标准化的环节做AI落地。'
      ];
    } else if (business_avg < 3.5 && ai_avg >= 3.5) {
      quadrant_label = '流程弱，AI强';
      quadrant_title = '流程弱，AI强';
      quadrant_desc = [
        '你的公司并不是不会用AI，甚至可能已经用了不少工具，但问题在于业务基础不够稳，导致AI只能局部提效，难以真正放大结果。这类情况常见表现就是：工具很多、动作很多，但整体经营体感没有明显变轻。',
        '建议先收缩工具和动作，把AI重新接回到最核心的业务流程里。'
      ];
    } else if (business_avg >= 3.5 && ai_avg >= 3.5) {
      quadrant_label = '流程强，AI强';
      quadrant_title = '流程强，AI强';
      quadrant_desc = [
        '你的公司已经具备比较好的组织基础，也开始把AI真正用于业务。当前更适合做的，不是零碎优化，而是系统升级，比如统一标准、打通流程、增强自动化、降低对个别员工的依赖。',
        '建议从“局部提效”转向“组织级提效”，重点提升复制能力和管理透明度。'
      ];
    }
  } else {
    if (business_avg < 3.5 && ai_avg < 3.5) {
      quadrant_label = '流程弱，AI弱';
      quadrant_title = '流程弱，AI弱';
      quadrant_desc = [
        '你当前的主要问题，不只是AI没用好，而是业务流程本身还不够稳定。',
        '在这种情况下，最适合的不是追更多工具，而是先把最关键的业务模块梳理清楚，再选一个高ROI环节做AI提效。',
        '更适合先做局部诊断，从一个模块开始建立闭环。'
      ];
    } else if (business_avg >= 3.5 && ai_avg < 3.5) {
      quadrant_label = '流程强，AI弱';
      quadrant_title = '流程强，AI弱';
      quadrant_desc = [
        '你的业务流程已经有一定基础，当前更大的空间不在“补流程”，而在于把AI真正接进已有系统。',
        '这类情况下，最有价值的动作通常不是再理流程，而是把内容、转化或交付中的关键环节做成AI工作流。',
        '更适合重点讨论AI提效方案，而不是从零做流程梳理。'
      ];
    } else if (business_avg < 3.5 && ai_avg >= 3.5) {
      quadrant_label = '流程弱，AI强';
      quadrant_title = '流程弱，AI强';
      quadrant_desc = [
        '你已经用了不少AI，但业务流程本身没有形成稳定闭环，所以很容易出现“工具很多、效果一般”的情况。',
        '这类情况下，问题不在于再加更多AI，而在于先做减法，把AI和关键业务流程重新对齐。',
        '更适合先做优先级诊断，把最值得先做的局部场景跑顺。'
      ];
    } else if (business_avg >= 3.5 && ai_avg >= 3.5) {
      quadrant_label = '流程强，AI强';
      quadrant_title = '流程强，AI强';
      quadrant_desc = [
        '你的业务流程和AI基础都已经不错，当前更适合做的是系统升级，而不是零散优化。',
        '这类情况下，重点不是“有没有问题”，而是“如何把已有基础做成更完整、更高效、更可放大的系统”。',
        '更适合进一步讨论整体业务的AI提效路线，而不只是某个局部问题。'
      ];
    }
  }

  const contentStage = getBusinessStageLabel(content_avg, type);
  const conversionStage = getBusinessStageLabel(conversion_avg, type);
  const deliveryStage = getBusinessStageLabel(delivery_avg, type);
  const aiStage = getAiStageLabel(ai_avg, type);

  const resultData = {
    content_avg, conversion_avg, delivery_avg, business_avg, ai_avg,
    content_label: contentStage.label,
    content_desc: contentStage.desc,
    conversion_label: conversionStage.label,
    conversion_desc: conversionStage.desc,
    delivery_label: deliveryStage.label,
    delivery_desc: deliveryStage.desc,
    priority_module_label,
    priority_questions,
    ai_stage_label: aiStage.label,
    ai_stage_desc: aiStage.desc,
    quadrant_label,
    quadrant_title,
    quadrant_desc
  };

  return { content_avg, conversion_avg, delivery_avg, business_avg, ai_avg, resultData };
}

// Map old scores to new inverted scores (1->5, 2->4, 3->3, 4->2, 5->1)
// Removed: Frontend now sends 1-5 correctly directly from user input

// Submit a survey response
app.post('/api/submit', (req, res) => {
  const { nickname, phone, answers, type = 'execution' } = req.body;
  if (!answers || answers.length !== 20 || !nickname || !phone) {
    return res.status(400).json({ error: 'Invalid data provided.' });
  }

  // Insert or get user
  db.get('SELECT id FROM users WHERE nickname = ? AND phone = ?', [nickname, phone], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    
    if (row) {
      insertResponse(row.id);
    } else {
      const stmt = db.prepare('INSERT INTO users (nickname, phone) VALUES (?, ?)');
      stmt.run([nickname, phone], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        insertResponse(this.lastID);
      });
      stmt.finalize();
    }
  });

  function insertResponse(userId) {
    const { content_avg, conversion_avg, delivery_avg, business_avg, ai_avg, resultData } = computeResultDataFromAnswers(answers, type);

    const stmt = db.prepare(`INSERT INTO responses (
      user_id,
      q1, q2, q3, q4, q5, q6, q7, q8, q9, q10,
      q11, q12, q13, q14, q15, q16, q17, q18, q19, q20,
      content_avg, conversion_avg, delivery_avg, business_avg, ai_avg, result_data, type
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

    stmt.run([
      userId,
      ...answers,
      content_avg, conversion_avg, delivery_avg, business_avg, ai_avg,
      JSON.stringify(resultData),
      type
    ], function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({
        success: true,
        id: this.lastID,
        result: resultData
      });
    });
    stmt.finalize();
  }
});

// Fetch all users and their latest response (for admin user management)
app.get('/api/users', (req, res) => {
  const query = `
    SELECT 
      u.id as user_id, u.nickname, u.phone, u.created_at as user_created_at,
      r.*
    FROM users u
    LEFT JOIN responses r ON r.id = (
      SELECT id FROM responses WHERE user_id = u.id ORDER BY created_at DESC LIMIT 1
    )
    ORDER BY u.created_at DESC
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows.map(r => {
      if (!r.id) {
        return { ...r, result_data: null };
      }
      const answers = Array.from({ length: 20 }).map((_, i) => r[`q${i + 1}`]);
      if (answers.some(v => typeof v !== 'number')) {
        return { ...r, result_data: r.result_data ? JSON.parse(r.result_data) : null };
      }
      const type = r.type || 'execution';
      const computed = computeResultDataFromAnswers(answers, type);
      return {
        ...r,
        type,
        content_avg: computed.content_avg,
        conversion_avg: computed.conversion_avg,
        delivery_avg: computed.delivery_avg,
        business_avg: computed.business_avg,
        ai_avg: computed.ai_avg,
        result_data: computed.resultData
      };
    }));
  });
});

app.get(/^(?!\/api\/|\/health$).*/, (req, res) => {
  if (hasFrontend) {
    return res.sendFile(frontendIndexHtml);
  }
  res.status(404).type('text/plain').send('Not Found');
});

app.listen(port, () => {
  console.log(`Survey backend running at http://localhost:${port}`);
});
