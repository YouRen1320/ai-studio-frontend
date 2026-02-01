import type { Product } from '../types/products';

// 模拟延迟，假装在请求服务器
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// 模拟的商品数据（参考了你的图片）
const mockProducts: Product[] = [
  {
    id: 1,
    title: '全金属手机支架桌面可升降懒人平板ipad旋转...',
    price: 3.01,
    coverUrl:
      'https://img14.360buyimg.com/n1/jfs/t1/210252/15/22273/135316/62624518E6627521e/212e690069006322.jpg', // 手机支架图
    tags: ['京喜自营'],
    commentCount: '10万+',
  },
  {
    id: 2,
    title: 'ROG夜魔Extreme 无线/蓝牙三模游戏机械键...',
    price: 999.0, // 假设价格
    coverUrl:
      'https://img14.360buyimg.com/n1/jfs/t1/168433/32/36735/104928/64e8379cF29447470/c30c84177727c955.jpg', // 键盘图
    tags: ['自营', '新品'],
    commentCount: '5000+',
  },
  {
    id: 3,
    title: '太太乐扫把簸箕套装 家用旋转防风梳...',
    price: 19.9,
    coverUrl:
      'https://img14.360buyimg.com/n1/jfs/t1/187421/22/27042/178385/62f6027aE89551720/5d46123957262601.jpg', // 扫把图
    tags: ['京东超市'],
    commentCount: '200+',
  },
  {
    id: 4,
    title: '男士护理套装（示例商品）',
    price: 58.0,
    coverUrl:
      'https://img14.360buyimg.com/n0/jfs/t1/134496/23/23019/58582/61f8d38eE81084260/d1933e1462002518.jpg', // 替换了图片中的敏感商品，用通用商品代替
    tags: ['看相似'],
    commentCount: '100+条评论',
  },
];

// 获取商品列表的接口
export const getProductList = async (): Promise<Product[]> => {
  await wait(500); // 假装网络延迟 0.5秒
  return mockProducts;
};
