// 定义单个商品的结构
export interface Product {
  id: number;
  title: string; // 商品标题
  price: number; // 价格
  coverUrl: string; // 封面图链接
  tags?: string[]; // 标签（比如：京东超市、包邮、看相似）
  commentCount?: string; // 评论数（比如：100+条评论）
  shopName?: string; // 店铺名称
}
