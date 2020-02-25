// 根据id获得当前对象的id
function getId (db, id) {
  return db[id]
}

// 根据id获得所有父级
function getAllParents (db, id) {
  let data = []
  const current = db[id]
  if (current) {
    data.push(current)
    data = getAllParents(db, current.pId).concat(data)
  }
  return data
}

// 根据id获得所有子级
function getChildrenById (db, id) {
  const data = []
  for (const key in db) {
    const item = db[key]
    if (item.pId === id) {
      data.push(item)
    }
  }
  return data
}

// 按时间排序函数
function rankTime (data) {
  data.sort(function (a, b) {
    const aTime = toArr(a.time)
    const bTime = toArr(b.time)
    for (let i = 0; i < aTime.length; i++) {
      if (aTime[i] !== bTime[i]) {
        return bTime[i] - aTime[i]
      }
    }
  })
  return data
}

// 格式化时间函数
function toArr (str) {
  const data = str.split(' ')[0].split('-').concat(str.split(' ')[1].split(':'))
  for (let i = 0; i < data.length; i++) {
    data[i] = data[i] * 1
  }
  return data
}

// 判断名字是否可用
function nameCanUse (db, id, text) {
  const currentData = getChildrenById(db, id)
  return currentData.every(item => item.name !== text)
}

// 根据id删除指定数据和其子集
function deleteItemById (db, id) {
  if (!id) return false
  delete db[id]
  const children = getChildrenById(db, id * 1)
  if (children.length) {
    for (let i = 0; i < children.length; i++) {
      deleteItemById(db, children[i].id)
    }
  }
  return true
}

// 将选中的元素缓存转成数组
function getCheckedFileFromBuffer (checkedBuffer) {
  const data = []
  for (const key in checkedBuffer) {
    if (key !== 'length') {
      const currentItem = checkedBuffer[key]
      data.push({
        id: key,
        fileData: currentItem
      })
    }
  }
  return data
}

// 当前生成时间函数
function clock () {
  var now = new Date()
  var y = now.getFullYear()
  var m = now.getMonth() + 1
  var d = now.getDate()
  var hours = now.getHours()
  var mins = now.getMinutes()
  var secs = now.getSeconds()

  var timeStr = y + '-' + m + '-' + d + ' ' + add0(hours) + ':' + add0(mins) + ':' + add0(secs)
  return timeStr
}

// 补0函数
function add0 (n) {
  return n < 10 ? '0' + n : '' + n
}

// 判断可否移动数据
function canMoveData (db, currentId, targetId) {
  const currentData = db[currentId]

  const targetParents = getAllParents(db, targetId)
  if (currentData.pId === targetId) {
    return 2 // 移动到自己所在的目录
  }

  if (targetParents.indexOf(currentData) !== -1) {
    return 3 // 移动到自己的子集
  }
  if (!nameCanUse(db, targetId, currentData.name)) {
    return 4 // 名字冲突
  }
  if (db[targetId].type === 'zip') {
    return 5 // 压缩文件
  }

  return 1
}

function moveDataToTarget (db, currentId, targetId) {
  db[currentId].pId = targetId
}

export { getId, getAllParents, getChildrenById, rankTime, toArr, nameCanUse, deleteItemById, getCheckedFileFromBuffer, clock, add0, canMoveData, moveDataToTarget }
