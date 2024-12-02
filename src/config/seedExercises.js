// seedExercises.js
require('dotenv').config(); // 確保可以讀取 .env 檔案
const mongoose = require('mongoose');
const connectDB = require('./database'); // 引入你的資料庫連線功能
const Exercise = require('../models/Exercise');


const exercises = [
    // 胸部訓練 (Chest - categoryId: 1)
    {
        name: "傳統臥推",
        categoryId: 1,
        description: "躺在平板凳上，雙手握住槓鈴，從胸前往上推舉的複合式運動。",
        targetMuscles: ["胸大肌", "前三角肌", "肱三頭肌"]
    },
    {
        name: "啞鈴飛鳥",
        categoryId: 1,
        description: "躺在平板凳上，雙手握啞鈴，以大弧度向外展開再收回的動作。",
        targetMuscles: ["胸大肌", "前三角肌"]
    },
    {
        name: "上斜臥推",
        categoryId: 1,
        description: "在上斜板凳上進行推舉，著重上胸肌群的訓練。",
        targetMuscles: ["上胸肌", "前三角肌", "肱三頭肌"]
    },
    {
        name: "下斜臥推",
        categoryId: 1,
        description: "在下斜板凳上進行推舉，著重下胸肌群的訓練。",
        targetMuscles: ["下胸肌", "前三角肌", "肱三頭肌"]
    },
    {
        name: "槓鈴普拉提",
        categoryId: 1,
        description: "躺臥握槓，將槓鈴放置胸前位置，保持手臂微彎向頭部方向延伸。",
        targetMuscles: ["胸大肌", "前鋸肌"]
    },

    // 背部訓練 (Back - categoryId: 2)
    {
        name: "引體向上",
        categoryId: 2,
        description: "抓握單槓，利用背部肌群的力量將身體向上拉起的徒手運動。",
        targetMuscles: ["背闊肌", "菱形肌", "肱二頭肌"]
    },
    {
        name: "坐姿划船",
        categoryId: 2,
        description: "坐姿用划船器材將重物向後拉，強化背部肌群。",
        targetMuscles: ["背闊肌", "菱形肌", "斜方肌"]
    },
    {
        name: "單臂啞鈴划船",
        categoryId: 2,
        description: "單手扶凳，另一手握啞鈴做划船動作。",
        targetMuscles: ["背闊肌", "菱形肌", "後三角肌"]
    },
    {
        name: "直臂下拉",
        categoryId: 2,
        description: "站姿面對滑輪機，雙手伸直向下拉動。",
        targetMuscles: ["背闊肌", "三角肌後束"]
    },
    {
        name: "正握划船",
        categoryId: 2,
        description: "站姿握槓，彎腰挺胸，將槓鈴往腹部拉起。",
        targetMuscles: ["背闊肌", "菱形肌", "斜方肌"]
    },

    // 肩部訓練 (Shoulder - categoryId: 3)
    {
        name: "肩推舉",
        categoryId: 3,
        description: "站姿或坐姿將重物從肩部向上推舉的動作，鍛鍊三角肌。",
        targetMuscles: ["三角肌", "斜方肌", "肱三頭肌"]
    },
    {
        name: "側平舉",
        categoryId: 3,
        description: "雙手握啞鈴，向側邊平舉至與肩同高。",
        targetMuscles: ["三角肌中束", "斜方肌"]
    },
    {
        name: "前平舉",
        categoryId: 3,
        description: "雙手握啞鈴，向前平舉至與肩同高。",
        targetMuscles: ["前三角肌", "上胸肌"]
    },
    {
        name: "俯身飛鳥",
        categoryId: 3,
        description: "俯身握啞鈴，雙手向外側抬起。",
        targetMuscles: ["後三角肌", "斜方肌"]
    },
    {
        name: "槓鈴上拉",
        categoryId: 3,
        description: "站姿握槓，將槓鈴由大腿前方向上拉至下巴位置。",
        targetMuscles: ["三角肌", "斜方肌", "肱二頭肌"]
    },

    // 手臂訓練 (Arms - categoryId: 4)
    {
        name: "二頭彎舉",
        categoryId: 4,
        description: "彎曲手肘，使啞鈴或槓鈴從大腿前方向上舉的單一關節動作。",
        targetMuscles: ["肱二頭肌", "肱肌"]
    },
    {
        name: "三頭下壓",
        categoryId: 4,
        description: "使用滑輪機，將把手從頭頂向下壓至髖部。",
        targetMuscles: ["肱三頭肌"]
    },
    {
        name: "錘式彎舉",
        categoryId: 4,
        description: "手心相對握啞鈴，彎曲手肘向上舉起。",
        targetMuscles: ["肱二頭肌", "肱橈肌"]
    },
    {
        name: "仰臥三頭伸展",
        categoryId: 4,
        description: "仰臥握啞鈴，雙手伸展過頭再彎曲。",
        targetMuscles: ["肱三頭肌"]
    },
    {
        name: "反向彎舉",
        categoryId: 4,
        description: "手心向下握槓鈴，彎曲手肘向上舉起。",
        targetMuscles: ["肱二頭肌", "肱橈肌"]
    },

    // 腿部訓練 (Legs - categoryId: 5)
    {
        name: "深蹲",
        categoryId: 5,
        description: "彎曲髖關節和膝關節，將臀部往下壓的基礎複合式運動。",
        targetMuscles: ["股四頭肌", "腿後肌群", "臀大肌"]
    },
    {
        name: "硬舉",
        categoryId: 5,
        description: "彎腰握槓，挺胸收腹將槓鈴從地面拉起。",
        targetMuscles: ["腿後肌群", "臀大肌", "豎脊肌"]
    },
    {
        name: "腿伸展",
        categoryId: 5,
        description: "坐姿使用器材，將小腿向前伸直。",
        targetMuscles: ["股四頭肌"]
    },
    {
        name: "腿彎曲",
        categoryId: 5,
        description: "俯臥使用器材，將小腿向後彎曲。",
        targetMuscles: ["腿後肌群"]
    },
    {
        name: "分腿蹲",
        categoryId: 5,
        description: "一腳向前跨步，軀幹下沉進行蹲姿。",
        targetMuscles: ["股四頭肌", "臀大肌", "腿後肌群"]
    },

    // 核心訓練 (Core - categoryId: 6)
    {
        name: "捲腹",
        categoryId: 6,
        description: "躺臥捲起上半身，強化腹部核心肌群的基礎動作。",
        targetMuscles: ["腹直肌", "腹外斜肌"]
    },
    {
        name: "平板支撐",
        categoryId: 6,
        description: "全身撐起呈平板狀，維持姿勢一段時間。",
        targetMuscles: ["腹直肌", "豎脊肌", "臀大肌"]
    },
    {
        name: "俄羅斯轉體",
        categoryId: 6,
        description: "坐姿提起雙腳，轉動軀幹碰觸兩側地面。",
        targetMuscles: ["腹外斜肌", "腹直肌"]
    },
    {
        name: "死蟲式",
        categoryId: 6,
        description: "仰臥，雙手雙腳抬起，交替伸展對角手腳。",
        targetMuscles: ["腹直肌", "腹內外斜肌"]
    },
    {
        name: "側平板",
        categoryId: 6,
        description: "側身撐起，維持姿勢訓練側腹肌群。",
        targetMuscles: ["腹外斜肌", "腹橫肌"]
    },

    // 其他訓練 (Others - categoryId: 7)
    {
        name: "划船機",
        categoryId: 7,
        description: "使用划船機進行全身性的有氧運動。",
        targetMuscles: ["背部肌群", "腿部肌群", "手臂肌群"]
    },
    {
        name: "壺鈴擺盪",
        categoryId: 7,
        description: "雙手握壺鈴，利用髖部力量帶動擺盪。",
        targetMuscles: ["臀大肌", "豎脊肌", "腿後肌群"]
    },
    {
        name: "波比跳",
        categoryId: 7,
        description: "結合伏地挺身和跳躍的複合式動作。",
        targetMuscles: ["全身肌群"]
    },
    {
        name: "負重行走",
        categoryId: 7,
        description: "手提啞鈴或其他重物進行行走。",
        targetMuscles: ["核心肌群", "前臂肌群", "斜方肌"]
    },
    {
        name: "戰繩",
        categoryId: 7,
        description: "甩動粗繩進行高強度間歇訓練。",
        targetMuscles: ["全身肌群"]
    }
];

const seedDatabase = async () => {
    try {
        // 清空現有資料
        await connectDB()
        await Exercise.deleteMany({});
        
        // 插入新資料
        await Exercise.insertMany(exercises);
        
        console.log('資料庫種子資料建立成功！');
    } catch (error) {
        console.error('資料庫種子資料建立失敗：', error);
    }
};

module.exports = seedDatabase;
// 執行 seeder
seedDatabase();