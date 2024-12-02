
// Record Schema - 訓練記錄模型
const recordSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, '請提供用戶ID']
    },
    exercise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise',
      required: [true, '請提供運動ID']
    },
    date: {
      type: Date,
      required: [true, '請提供訓練日期'],
      default: Date.now
    },
    sets: [{
      weight: {
        type: Number,
        required: [true, '請提供重量'],
        min: [0, '重量不能為負數']
      },
      reps: {
        type: Number,
        required: [true, '請提供次數'],
        min: [1, '次數至少為1']
      }
    }],
    note: {
      type: String,
      trim: true
    }
}, {
timestamps: true
});
