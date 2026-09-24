export interface MorphCard {
  id: string
  sourceLabel: string
  targetLabel: string
  from: [number, number]
  to: [number, number]
  accent: string
}

export interface MorphDefinition {
  title: string
  sourceCaption: string
  targetCaption: string
  cards: MorphCard[]
  arrivals: { id: string; label: string; at: [number, number]; accent: string }[]
  links: { from: string; to: string; label: string }[]
}

export const morphs: Record<'one-to-many' | 'many-to-matrix', MorphDefinition> = {
  'one-to-many': {
    title: '从一元局部结构到方向与线性映射',
    sourceCaption: '一元：沿数轴趋近',
    targetCaption: '多元：沿所有路径趋近',
    cards: [
      { id: 'limit', sourceLabel: '极限', targetLabel: '联合连续', from: [350, 330], to: [310, 360], accent: '#163F6F' },
      { id: 'continuity', sourceLabel: '连续', targetLabel: '', from: [650, 330], to: [310, 360], accent: '#396D80' },
      { id: 'derivative', sourceLabel: '导数', targetLabel: '偏导', from: [950, 330], to: [710, 360], accent: '#624F6B' },
      { id: 'differential', sourceLabel: '一元可微', targetLabel: 'Fréchet 可微', from: [1250, 330], to: [1080, 360], accent: '#B5855F' },
    ],
    arrivals: [{ id: 'complex', label: '复可导', at: [1350, 625], accent: '#624F6B' }],
    links: [
      { from: 'limit', to: 'derivative', label: '方向增多' },
      { from: 'derivative', to: 'differential', label: '统一线性映射' },
      { from: 'differential', to: 'complex', label: '复线性更强' },
    ],
  },
  'many-to-matrix': {
    title: '从线性映射到矩阵计算',
    sourceCaption: '定义：同一个线性映射近似变化',
    targetCaption: '计算：记录系数、组合规则',
    cards: [
      { id: 'partial', sourceLabel: '偏导', targetLabel: '梯度', from: [320, 335], to: [290, 355], accent: '#74A0BA' },
      { id: 'jacobian', sourceLabel: 'Jacobian', targetLabel: 'Jacobian', from: [650, 335], to: [650, 355], accent: '#396D80' },
      { id: 'frechet', sourceLabel: 'Fréchet 可微', targetLabel: '矩阵值微分', from: [1000, 335], to: [1010, 355], accent: '#9AAE8F' },
      { id: 'complex', sourceLabel: '复线性分支', targetLabel: '', from: [1320, 335], to: [1330, 355], accent: '#624F6B' },
    ],
    arrivals: [
      { id: 'hessian', label: 'Hessian', at: [450, 625], accent: '#624F6B' },
      { id: 'rules', label: '微分规则', at: [1120, 625], accent: '#B5855F' },
    ],
    links: [
      { from: 'partial', to: 'hessian', label: '再求一次导' },
      { from: 'jacobian', to: 'frechet', label: '向量化' },
      { from: 'frechet', to: 'rules', label: '进行组合' },
    ],
  },
}
