const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Initialize SQLite Database
const dbPath = path.join(__dirname, 'survey.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    
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
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )`);
  }
});

// Helper functions for scoring logic
function getBusinessStageLabel(score) {
  if (score >= 4.3) return { label: '系统成熟', desc: '这一模块已经比较稳定，继续加油' };
  if (score >= 3.5) return { label: '基本成型', desc: '这一模块已有较清晰流程，但仍有局部可优化空间' };
  if (score >= 2.7) return { label: '明显卡点', desc: '这一模块已经开始拖慢效率，建议尽快梳理关键问题' };
  return { label: '主要瓶颈', desc: '这一模块成熟度偏低，已经明显影响业务效率和结果，建议优先优化' };
}

function getAiStageLabel(score) {
  if (score >= 4.3) return { label: '系统化应用期', desc: '你已经把AI较稳定地接入业务流程，重点不再是“会不会用”，而是怎么放大结果' };
  if (score >= 3.5) return { label: '流程接入期', desc: '你已经开始在多个业务环节中稳定使用AI，接下来重点是把单点用法进一步变成系统' };
  if (score >= 2.7) return { label: '单点应用期', desc: '你已经在部分工作中使用AI，但更多还是局部提效，尚未真正形成完整工作流' };
  if (score >= 1.9) return { label: '工具使用期', desc: '你已经开始接触并使用AI工具，但应用仍偏零散，离业务系统提效还有明显距离' };
  return { label: '起步体验期', desc: '你现在对AI更多还是体验和零散试用，距离真正进入业务还有明显距离' };
}

function computeResultDataFromAnswers(answers) {
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

  const contentStage = getBusinessStageLabel(content_avg);
  const conversionStage = getBusinessStageLabel(conversion_avg);
  const deliveryStage = getBusinessStageLabel(delivery_avg);
  const aiStage = getAiStageLabel(ai_avg);

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
  const { nickname, phone, answers } = req.body;
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
    const { content_avg, conversion_avg, delivery_avg, business_avg, ai_avg, resultData } = computeResultDataFromAnswers(answers);

    const stmt = db.prepare(`INSERT INTO responses (
      user_id,
      q1, q2, q3, q4, q5, q6, q7, q8, q9, q10,
      q11, q12, q13, q14, q15, q16, q17, q18, q19, q20,
      content_avg, conversion_avg, delivery_avg, business_avg, ai_avg, result_data
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

    stmt.run([
      userId,
      ...answers,
      content_avg, conversion_avg, delivery_avg, business_avg, ai_avg,
      JSON.stringify(resultData)
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
      const computed = computeResultDataFromAnswers(answers);
      return {
        ...r,
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

app.listen(port, () => {
  console.log(`Survey backend running at http://localhost:${port}`);
});
