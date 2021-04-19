const local = 'http://localhost:8090/uploads'
const prod = 'http://121.89.217.223:2080'
export const imgPath = (path) => {
  return path.replace(/.*uploads/, prod)
}

const getName = () => {
  const pre = [
    '才气的', '智慧的', '努力的', '有趣的', '甜甜的', '美丽的', '开心的', '坚硬的', '清香的', '酸酸的', '成熟的',
    '青涩的', '聪明的', '红红的', '青青的', '酸甜的', '香甜的', '可口的', '透明的', '晶莹的', '黄黄的', '软软的'
  ]
  const name = [
    '苹果', '石榴', '香蕉', '梨子', '板栗', '开心果', '杏仁', '甘蔗', '番薯', '香瓜', '西瓜', '橘子', '橙子', '柚子', 
    '葡萄', '无花果', '莲雾', '凤梨', '菠萝', '糯米', '草莓', '榴莲', '番石榴', '菠萝蜜', '瓜子', '花生', '核桃', '桃子'
  ]
  return pre[Math.floor(Math.random()*pre.length)] + name[Math.floor(Math.random()*name.length)]
}

export const createLocalUser = () => {
  const user = {
    id: Date.now(),
    nickname: getName(),
    avatar: ''
  } 

  localStorage.setItem('user', JSON.stringify(user))
  return user
}