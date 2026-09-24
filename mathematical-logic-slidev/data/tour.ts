import type { TourScene } from './types'

const syntaxBranch = ['logic-root', 'syntax', 'signature', 'term', 'formula']
const syntaxEdges = ['h-logic-root-syntax', 'h-syntax-signature', 'h-syntax-term', 'h-syntax-formula']
const semanticsBranch = ['logic-root', 'semantics', 'structure', 'satisfaction']
const semanticsEdges = ['h-logic-root-semantics', 'h-semantics-structure', 'h-semantics-satisfaction', 'r-structure-satisfaction']
const correspondenceBranch = ['logic-root', 'correspondence', 'proof', 'consequence']
const correspondenceEdges = ['h-logic-root-correspondence', 'h-correspondence-proof', 'h-correspondence-consequence']
const syntaxAll = ['logic-root', 'syntax', 'signature', 'term', 'formula', 'semantics', 'structure', 'satisfaction', 'correspondence', 'proof', 'consequence']

const quantifierAll = ['quantifiers-root', 'dependent-choice', 'pointwise-continuity', 'x2-counterexample', 'uniform-choice', 'uniform-continuity']

export const tour: TourScene[] = [
  { id: 'opening', map: 'syntax-semantics', focus: 'logic-root', framing: 'node', mode: 'detail', detailKey: 'opening', visibleNodes: ['logic-root'], visibleEdges: [], chapter: '数理逻辑', headline: '合法的符号，什么时候才说出了一个命题？' },
  { id: 'same-formula', map: 'syntax-semantics', focus: 'logic-root', framing: 'node', mode: 'detail', detailKey: 'same-formula', visibleNodes: ['logic-root'], visibleEdges: [], chapter: '语法与语义', headline: '结构不变，解释可以完全改变' },
  { id: 'signature', map: 'syntax-semantics', focus: 'signature', framing: 'node', mode: 'detail', detailKey: 'symbols', visibleNodes: ['logic-root', 'syntax', 'signature'], visibleEdges: ['h-logic-root-syntax', 'h-syntax-signature'], chapter: '语法 · 符号表', headline: '先声明符号的角色' },
  { id: 'term', map: 'syntax-semantics', focus: 'term', framing: 'node', mode: 'detail', detailKey: 'term', visibleNodes: ['logic-root', 'syntax', 'term'], visibleEdges: ['h-logic-root-syntax', 'h-syntax-term'], chapter: '语法 · 项', headline: '项负责指称对象' },
  { id: 'formula', map: 'syntax-semantics', focus: 'formula', framing: 'node', mode: 'detail', detailKey: 'construction', visibleNodes: ['logic-root', 'syntax', 'formula'], visibleEdges: ['h-logic-root-syntax', 'h-syntax-formula'], chapter: '语法 · 公式', headline: '从原子公式递归构造复杂公式' },
  { id: 'syntax-truth', map: 'syntax-semantics', focus: 'syntax', framing: 'subtree', mode: 'detail', detailKey: 'truth', visibleNodes: syntaxBranch, visibleEdges: syntaxEdges, chapter: '语法边界', headline: '合法不等于为真' },
  { id: 'semantics-setup', map: 'syntax-semantics', focus: 'semantics', framing: 'subtree', mode: 'detail', detailKey: 'setup', visibleNodes: semanticsBranch, visibleEdges: semanticsEdges, chapter: '语义', headline: '论域、解释与赋值让形式获得意义' },
  { id: 'structure', map: 'syntax-semantics', focus: 'structure', framing: 'node', mode: 'detail', detailKey: 'model', visibleNodes: ['logic-root', 'semantics', 'structure'], visibleEdges: ['h-logic-root-semantics', 'h-semantics-structure'], chapter: '语义 · 结构', headline: '结构不只是一组对象' },
  { id: 'satisfaction', map: 'syntax-semantics', focus: 'satisfaction', framing: 'node', mode: 'detail', detailKey: 'interpretations', visibleNodes: semanticsBranch, visibleEdges: semanticsEdges, chapter: '语义 · 满足', headline: '同一公式可以生活在不同模型中' },
  { id: 'proof', map: 'syntax-semantics', focus: 'proof', framing: 'node', mode: 'detail', detailKey: 'proof', visibleNodes: ['logic-root', 'correspondence', 'proof'], visibleEdges: ['h-logic-root-correspondence', 'h-correspondence-proof'], chapter: '句法关系 · ⊢', headline: '可证明性是一条形式推导链' },
  { id: 'consequence', map: 'syntax-semantics', focus: 'consequence', framing: 'node', mode: 'detail', detailKey: 'consequence', visibleNodes: correspondenceBranch, visibleEdges: correspondenceEdges, chapter: '语义关系 · ⊨', headline: '逻辑后承同时约束所有模型' },
  { id: 'soundness', map: 'syntax-semantics', focus: 'correspondence', framing: 'node', mode: 'detail', detailKey: 'soundness', visibleNodes: correspondenceBranch, visibleEdges: [...correspondenceEdges, 'r-proof-correspondence'], chapter: '健全性', headline: '证明系统不会认证语义错误' },
  { id: 'completeness', map: 'syntax-semantics', focus: 'correspondence', framing: 'node', mode: 'detail', detailKey: 'completeness', visibleNodes: correspondenceBranch, visibleEdges: [...correspondenceEdges, 'r-proof-correspondence', 'r-consequence-correspondence'], chapter: '完备性', headline: '语义后承能够被形式证明捕捉' },
  { id: 'syntax-overview', map: 'syntax-semantics', focus: 'logic-root', framing: 'all', mode: 'overview', visibleNodes: syntaxAll, visibleEdges: 'all', chapter: '第一张知识图', headline: '语法与语义在经典一阶逻辑中精确对齐' },
  { id: 'before-morph', map: 'syntax-semantics', focus: 'semantics', framing: 'subtree', mode: 'concept', visibleNodes: semanticsBranch, visibleEdges: semanticsEdges, chapter: '视角转换', headline: '把论域与赋值放大成一次次选择' },
  { id: 'quantifier-morph', map: 'morph', focus: 'quantifiers-root', framing: 'all', mode: 'overview', visibleNodes: 'all', visibleEdges: [], chapter: '变形过渡', headline: '模型中的赋值，重组为量词的选择顺序' },
  { id: 'first-order', map: 'quantifier-dependency', focus: 'quantifiers-root', framing: 'node', mode: 'detail', detailKey: 'first-order', visibleNodes: ['quantifiers-root'], visibleEdges: [], chapter: '量词', headline: '一阶量词直接遍历论域中的对象' },
  { id: 'forall', map: 'quantifier-dependency', focus: 'quantifiers-root', framing: 'node', mode: 'detail', detailKey: 'forall', visibleNodes: ['quantifiers-root'], visibleEdges: [], chapter: '全称量词 · ∀', headline: '任意对象都必须通过检验' },
  { id: 'exists', map: 'quantifier-dependency', focus: 'quantifiers-root', framing: 'node', mode: 'detail', detailKey: 'exists', visibleNodes: ['quantifiers-root'], visibleEdges: [], chapter: '存在量词 · ∃', headline: '找到一个见证就足够' },
  { id: 'dependent-choice', map: 'quantifier-dependency', focus: 'dependent-choice', framing: 'node', mode: 'detail', detailKey: 'order', visibleNodes: ['quantifiers-root', 'dependent-choice'], visibleEdges: ['h-quantifiers-root-dependent-choice'], chapter: '∀x ∃y', headline: '后选的 y 可以依赖先选的 x' },
  { id: 'uniform-choice', map: 'quantifier-dependency', focus: 'uniform-choice', framing: 'node', mode: 'detail', detailKey: 'order', visibleNodes: ['quantifiers-root', 'dependent-choice', 'uniform-choice'], visibleEdges: ['h-quantifiers-root-dependent-choice', 'h-quantifiers-root-uniform-choice'], chapter: '∃y ∀x', headline: '先固定一个 y，再应付所有 x' },
  { id: 'implication', map: 'quantifier-dependency', focus: 'uniform-choice', framing: 'all', mode: 'detail', detailKey: 'implication', visibleNodes: ['quantifiers-root', 'dependent-choice', 'uniform-choice'], visibleEdges: ['h-quantifiers-root-dependent-choice', 'h-quantifiers-root-uniform-choice', 'r-uniform-dependent'], chapter: '量词强弱', headline: '统一选择蕴含逐个选择' },
  { id: 'pointwise', map: 'quantifier-dependency', focus: 'pointwise-continuity', framing: 'node', mode: 'detail', detailKey: 'pointwise', visibleNodes: ['quantifiers-root', 'dependent-choice', 'pointwise-continuity'], visibleEdges: ['h-quantifiers-root-dependent-choice', 'h-dependent-choice-pointwise-continuity', 'r-dependent-pointwise'], chapter: '普通连续', headline: 'δ 可以依赖具体位置 x' },
  { id: 'uniform-continuity', map: 'quantifier-dependency', focus: 'uniform-continuity', framing: 'all', mode: 'detail', detailKey: 'uniform', visibleNodes: ['quantifiers-root', 'dependent-choice', 'pointwise-continuity', 'uniform-choice', 'uniform-continuity'], visibleEdges: ['h-quantifiers-root-dependent-choice', 'h-dependent-choice-pointwise-continuity', 'h-quantifiers-root-uniform-choice', 'h-uniform-choice-uniform-continuity', 'r-uniform-uniformity', 'r-pointwise-not-uniform'], chapter: '一致连续', headline: '同一个 δ 必须覆盖整个定义域' },
  { id: 'x2-counterexample', map: 'quantifier-dependency', focus: 'x2-counterexample', framing: 'node', mode: 'detail', detailKey: 'counterexample', visibleNodes: ['quantifiers-root', 'dependent-choice', 'pointwise-continuity', 'x2-counterexample'], visibleEdges: ['h-quantifiers-root-dependent-choice', 'h-dependent-choice-pointwise-continuity', 'h-pointwise-continuity-x2-counterexample'], chapter: '反例 · x²', headline: '连续不保证存在全局通用的 δ' },
  { id: 'quantifier-overview', map: 'quantifier-dependency', focus: 'quantifiers-root', framing: 'all', mode: 'overview', visibleNodes: quantifierAll, visibleEdges: 'all', chapter: '第二张知识图', headline: '量词顺序，就是依赖关系的语法' },
]

export function getScene(step: number): TourScene {
  return tour[Math.min(Math.max(0, step), tour.length - 1)]
}
