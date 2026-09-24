## 一、极限

### 1. 极限的定义？

例如考虑函数

\[
f(x)=\frac{x^2-1}{x-1}.
\]

当 \(x\neq1\) 时，

\[
f(x)=x+1.
\]

于是当 \(x\) 越来越接近 \(1\) 时，\(f(x)\) 就越来越接近 \(2\)。

我们于是写作

\[
\lim_{x\to1}f(x)=2.
\]

直观上，这句话表示：

> 当 \(x\) 足够接近 \(1\) 时，\(f(x)\) 可以任意接近 \(2\)。

这里有一个非常重要的地方。

极限 \(2\) 本身当然仍然是一个数，但是**极限并不是通过“把 \(x\) 取成某一个非常接近 1 的数”来定义的**。

例如不能说：

\[
x=0.999999
\]

时 \(f(x)\) 很接近 \(2\)，所以极限就是 \(2\)。

因为无论我们选择怎样一个具体的数，它都只表示一次有限程度的逼近。

真正的极限概念要求的是：

> **无论你要求函数值离目标多么近，我总能够进一步限制自变量，使这个要求得到满足。**

因此，极限的核心不是某一次逼近，而是一个可以无限继续下去的控制过程。

### 2. \(\varepsilon-\delta\) 定义

严格地说，

\[
\lim_{x\to a}f(x)=L
\]

意味着：

对于任意

\[
\varepsilon>0,
\]

都存在

\[
\delta>0,
\]

使得只要

\[
0<|x-a|<\delta,
\]

就一定有

\[
|f(x)-L|<\varepsilon.
\]

这里的逻辑结构非常重要：

\[
\forall\varepsilon>0,\quad
\exists\delta>0,\quad
0<|x-a|<\delta
\Rightarrow
|f(x)-L|<\varepsilon.
\]

是一个可以一直执行下去的过程

例如要求
\[
|f(x)-L|<10^{-3}.
\]

我们必须找到一个对应的 \(\delta\)，保证只要

\[
|x-a|<\delta,
\]

这个要求就一定成立。

如果对方进一步要求

\[
|f(x)-L|<10^{-100},
\]

我们仍然能够找到新的 \(\delta\)。

因此，极限表达的不是：

\[
f(x)\text{ 和 }L\text{ 很接近},
\]

而是更强的命题：

\[
\boxed{\text{函数值与 }L\text{ 的距离可以被任意控制。}}
\]

这正是极限思想的本质。

同样的，数列极限也是完全相同的思想。

\[
\lim_{n\to\infty}a_n=L
\]

意味着

\[
\forall\varepsilon>0,
\quad
\exists N,
\quad
n>N
\Rightarrow
|a_n-L|<\varepsilon.
\]

这里的 \(N\) 扮演的角色，与函数极限中的 \(\delta\) 类似。

## 二、一元函数中的连续、可导与可微

极限建立以后，我们就可以进一步定义连续和微分。

这几个概念之间存在一个非常自然的递进关系。

### 1. 连续

函数 \(f\) 在 \(x_0\) 处连续，定义为

\[
\lim_{x\to x_0}f(x)=f(x_0).
\]

这句话可以理解为：

> 当输入产生一个足够小的变化时，输出也只会产生足够小的变化。

写成增量形式就是：

\[
\Delta x\to0
\quad\Longrightarrow\quad
\Delta y\to0.
\]

其中

\[
\Delta y=f(x+\Delta x)-f(x).
\]

下面从极限的 \(\varepsilon\)-\(\delta\) 定义严格推出这一增量表述。设函数在定点 \(x_0\) 处连续，即

\[
\lim_{x\to x_0}f(x)=f(x_0).
\]

按照极限的定义，对任意 \(\varepsilon>0\)，都存在 \(\delta>0\)，使得

\[
0<|x-x_0|<\delta
\quad\Longrightarrow\quad
|f(x)-f(x_0)|<\varepsilon.
\]

现在把自变量写成

\[
x=x_0+\Delta x.
\]

于是

\[
x-x_0=\Delta x,
\]

而函数值的增量为

\[
\Delta y=f(x_0+\Delta x)-f(x_0).
\]

因此，上面的定义可以逐字改写为

\[
\forall\varepsilon>0,\quad
\exists\delta>0,\quad
0<|\Delta x|<\delta
\Rightarrow
|\Delta y|<\varepsilon.
\]

这恰好就是

\[
\lim_{\Delta x\to0}\Delta y=0,
\]

也就是

\[
\boxed{\Delta x\to0\quad\Longrightarrow\quad\Delta y\to0.}
\]

这也可以用一种以后很有用的记号来写。把随 \(\Delta x\) 变化、并且在 \(\Delta x\to0\) 时趋于零的量记作

\[
o(1).
\]

这里的 \(1\) 表示常数阶；因此 \(o(1)\) 的意思是“相对于常数 \(1\) 而言可以忽略的量”，严格地说，若 \(r(\Delta x)=o(1)\)，就是

\[
\lim_{\Delta x\to0}r(\Delta x)=0.
\]

于是 \(\Delta y\to0\) 可以写成 \(\Delta y=o(1)\)，连续性便得到等价的增量表达式：

\[
f(x_0+\Delta x)
=
f(x_0)+o(1)
\qquad(\Delta x\to0).
\]

也就是说，在 \(x_0\) 附近，函数值等于该点的函数值（也就是此处的极限值）再加上一个趋于零的小量。

还要注意一个马上会用到的关系：

\[
o(1)\,\Delta x=o(\Delta x).
\]

因此连续描述的是一种非常基本的稳定性：

\[
\boxed{\text{小的输入变化不会突然产生大的输出跳变。}}
\]

但是连续只能告诉我们：

\[
\Delta x\text{ 小}
\Rightarrow
\Delta y\text{ 小}.
\]

它并没有进一步告诉我们：

\[
\Delta y
\]

究竟以什么规律变化。

于是就需要导数。

### 2. 可导

对于一元函数

\[
y=f(x),
\]

如果极限

\[
\lim_{\Delta x\to0}
\frac{f(x+\Delta x)-f(x)}{\Delta x}
\]

存在，就称 \(f\) 在 \(x\) 处可导，并把这个极限记作

\[
f'(x).
\]

因此

\[
f'(x)
=
\lim_{\Delta x\to0}
\frac{\Delta y}{\Delta x}.
\]

直观上，导数描述函数在某一点附近变化的“瞬时比例”。

> **可微意味着函数在局部可以被一个线性函数近似。**

### 3. 可微

如果

\[
f(x+\Delta x)-f(x)
=
A\Delta x+o(\Delta x),
\]

那么称 \(f\) 在 \(x\) 处可微。

其中

\[
o(\Delta x)
\]

表示比 \(\Delta x\) 更高阶的小量，即

\[
\frac{o(\Delta x)}{\Delta x}\to0.
\]

因此局部来看，

\[
\Delta y
\approx
A\Delta x.
\]

这个线性部分

\[
A\Delta x
\]

就是微分。

最终可以证明：

\[
A=f'(x).
\]

于是

\[
df=f'(x)\,dx.
\]

### 4. 三者之间的关系

#### 4.1 可导与连续的关系

对于一元函数，

\[
\boxed{\text{可导}\Rightarrow\text{连续}.}
\]

事实上，若 \(f\) 在 \(x_0\) 处可导，则差商

\[
\frac{f(x_0+\Delta x)-f(x_0)}{\Delta x}
\]

在 \(\Delta x\to0\) 时有有限极限 \(f'(x_0)\)。于是

\[
\Delta y
=
\frac{\Delta y}{\Delta x}\,\Delta x
\longrightarrow
f'(x_0)\cdot0=0,
\]

所以 \(f\) 在 \(x_0\) 处连续。

反过来却不成立：

\[
\boxed{\text{连续}\not\Rightarrow\text{可导}.}
\]

最简单的例子是

\[
f(x)=|x|.
\]

它在 \(x=0\) 连续，但左右导数分别为 \(-1\) 和 \(1\)，因此在 \(0\) 处不可导。

更极端的例子是**维尔斯特拉斯函数**。例如取 \(0<a<1\)、\(b\) 为奇整数，并满足 \(ab>1+\frac{3\pi}{2}\)，令

\[
W(x)=\sum_{n=0}^{\infty}a^n\cos\bigl(\pi b^n x\bigr).
\]

这个级数定义的函数在每一点都连续，却在每一点都不可导。它说明连续只保证函数值不会发生跳变，并不保证曲线在局部具有确定的切线斜率。

#### 4.2 可导与可微的关系

对于一元实函数，二者实际上等价：

\[
\boxed{\text{可导}\iff\text{可微}.}
\]

若 \(f\) 在 \(x\) 处可导，记 \(\Delta y=f(x+\Delta x)-f(x)\)。由导数的定义，

\[
\frac{\Delta y}{\Delta x}
\longrightarrow f'(x).
\]

按照刚才引入的 \(o(1)\) 记号，这等价于

\[
\frac{\Delta y}{\Delta x}
=
f'(x)+o(1).
\]

两边乘以 \(\Delta x\)，并使用 \(o(1)\,\Delta x=o(\Delta x)\)，便有

\[
\Delta y
=
f'(x)\Delta x+o(1)\Delta x
=
f'(x)\Delta x+o(\Delta x).
\]

这正是可微的定义，因此可导推出可微。反过来，若

\[
\Delta y=A\Delta x+o(\Delta x),
\]

两边除以 \(\Delta x\) 得

\[
\frac{\Delta y}{\Delta x}
=
A+\frac{o(\Delta x)}{\Delta x}
\longrightarrow A,
\]

所以导数存在，且 \(f'(x)=A\)。

综合起来，一元实函数满足

\[
\boxed{
\text{可微}
\iff
\text{可导}
\Rightarrow
\text{连续}.
}
\]

## 三、多元标量函数的连续、偏导与可微

### 1. 多元函数的连续

**累次连续（逐变量检验）**：先固定一个变量，只让另一个变量趋近，再对剩余变量取极限。例如

$$
\lim_{y\to y_0}\left(\lim_{x\to x_0}f(x,y)\right),
\qquad
\lim_{x\to x_0}\left(\lim_{y\to y_0}f(x,y)\right).
$$

它只检验按坐标逐次靠近的情形。更一般地，若固定 \(y\) 时 \(x\mapsto f(x,y)\) 连续，且固定 \(x\) 时 \(y\mapsto f(x,y)\) 也连续，就称函数分别连续。

**二重连续（联合连续）**：令 \((x,y)\) 同时趋于 \((x_0,y_0)\)，即

$$
\lim_{(x,y)\to(x_0,y_0)}f(x,y)=f(x_0,y_0).
$$

它才是二维函数在一点连续的标准含义。

先看二维函数 \(f(x,y)\)。称
\[
\lim_{(x,y)\to(x_0,y_0)}f(x,y)=L
\]

为二重极限，是指：对任意 \(\varepsilon>0\)，都存在 \(\delta>0\)，使得

\[
0<\sqrt{(x-x_0)^2+(y-y_0)^2}<\delta
\quad\Longrightarrow\quad
|f(x,y)-L|<\varepsilon.
\]

函数在 \((x_0,y_0)\) 处连续，正是指这个二重极限存在，且等于函数在该点的值：

\[
\lim_{(x,y)\to(x_0,y_0)}f(x,y)=f(x_0,y_0).
\]

注意，二重极限要求 \((x,y)\) 从**所有方向、沿所有路径**靠近 \((x_0,y_0)\)。这与只沿坐标轴或只按某一种顺序靠近是不同的。

更一般地，设 \(a\in\mathbb R^n\)，并把靠近 \(a\) 的增量记作 \(h\in\mathbb R^n\)。函数 \(f:\mathbb R^n\to\mathbb R\) 在 \(a\) 处连续，是指

\[
\lim_{h\to0}f(a+h)=f(a).
\]

等价地，对任意 \(\varepsilon>0\)，都存在 \(\delta>0\)，使得

\[
\|x-a\|<\delta
\quad\Longrightarrow\quad
|f(x)-f(a)|<\varepsilon.
\]

这里 \(h\to0\) 表示 \(\|h\|\to0\)；当 \(n=2\) 时，这个范数定义正是上面的二重极限定义。下面仍以二维情形为例，区分两种常见的检验方式。

二重连续一定推出两个累次极限存在且都等于函数值；但反过来不成立。考虑

\[
f(x,y)=
\begin{cases}
\dfrac{xy}{x^2+y^2},&(x,y)\ne(0,0),\\
0,&(x,y)=(0,0).
\end{cases}
\]

在原点，两个累次极限都等于 \(0\)，而且函数对每个变量分别连续；但沿直线 \(y=x\) 靠近原点时，\(f(x,x)=\frac12\)。所以二重极限不存在，函数在原点不连续。

### 2. 偏导数

对于 \(f:\mathbb R^n\to\mathbb R\)，第 \(i\) 个偏导数只让第 \(i\) 个坐标变化，其余坐标固定：

\[
\frac{\partial f}{\partial x_i}(a)
=
\lim_{t\to0}
\frac{f(a_1,\ldots,a_i+t,\ldots,a_n)-f(a)}{t}.
\]

因此，偏导数描述的是函数沿坐标轴方向的瞬时变化率。可是，在二维或更高维空间中，靠近一个点的方向有无穷多个；偏导数只看到了其中有限个坐标方向，不能代表所有方向的行为。

对上面的函数，在原点两个偏导数都存在，且

\[
\frac{\partial f}{\partial x}(0,0)
=
\frac{\partial f}{\partial y}(0,0)
=0,
\]

但它在原点甚至不连续。这正说明“各偏导数存在”本身是一个很弱的条件。

### 3. 可微

#### 3.1 多元标量函数的可微

多元函数的可微要求比偏导数存在强得多。函数 \(f:\mathbb R^n\to\mathbb R\) 在 \(a\) 处可微，是指存在一个线性函数 \(A:\mathbb R^n\to\mathbb R\)，使得

\[
f(a+h)
=
f(a)+A(h)+o(\|h\|)
\qquad(h\to0).
\]

由于 \(A\) 是从 \(\mathbb R^n\) 到 \(\mathbb R\) 的线性函数，它可以写成

\[
A(h)
=
\sum_{i=1}^n A_i h_i.
\]

当 \(f\) 可微时，\(A_i=\frac{\partial f}{\partial x_i}(a)\)，因此

\[
f(a+h)
=
f(a)+\nabla f(a)^T h+o(\|h\|).
\]

这表示函数在 \(a\) 附近不仅变化得小，而且其一阶变化能由一个线性函数准确刻画。

#### 3.2 向量值函数的可微与 Jacobian 矩阵

现在把输出也允许为一个向量。设

\[
F:\mathbb R^n\to\mathbb R^m,
\qquad
F(x)=
\begin{bmatrix}
f_1(x)\\
\vdots\\
f_m(x)
\end{bmatrix}.
\]

它在 \(a\) 处可微，是指存在一个从 \(\mathbb R^n\) 到 \(\mathbb R^m\) 的线性映射 \(A\)，使得

\[
F(a+h)
=
F(a)+A(h)+o(\|h\|).
\]

这里最后一项是向量值余项；严格地说，它满足

\[
\frac{\|F(a+h)-F(a)-A(h)\|}{\|h\|}
\longrightarrow0.
\]

这个定义并没有额外的神秘之处。它只是把标量值函数的同一种可微展开，分别应用于 \(m\) 个分量：

\[
f_j(a+h)
=
f_j(a)+\sum_{i=1}^n
\frac{\partial f_j}{\partial x_i}(a)h_i
+o(\|h\|),
\qquad j=1,\ldots,m.
\]

把这 \(m\) 行式子纵向叠起来，所有一阶系数就组成矩阵

\[
J_F(a)
=
\begin{bmatrix}
\dfrac{\partial f_1}{\partial x_1}(a)&\cdots&\dfrac{\partial f_1}{\partial x_n}(a)\\
\vdots&\ddots&\vdots\\
\dfrac{\partial f_m}{\partial x_1}(a)&\cdots&\dfrac{\partial f_m}{\partial x_n}(a)
\end{bmatrix}.
\]

这就是 **Jacobian 矩阵**。因此向量值函数的可微展开可以简洁地写为

\[
F(a+h)
=
F(a)+J_F(a)h+o(\|h\|).
\]

换言之，Jacobian 的每一行就是一个输出分量的一阶线性近似；整个矩阵只是把这些近似一起写出来。

### 4. 连续、偏导与可微之间的关系

对于多元标量函数，有如下关系：

\[
\boxed{
\text{一阶偏导在邻域内存在且在该点连续}
\Rightarrow
\text{可微}
\Rightarrow
\text{连续}.
}
\]

此外，可微必然推出各个一阶偏导数存在：

\[
\boxed{\text{可微}\Rightarrow\text{各偏导数存在}.}
\]

这些逆命题一般都不成立。特别地，上面的例子已经说明

\[
\text{偏导存在}
\not\Rightarrow
\text{连续}
\not\Rightarrow
\text{可微}.
\]

因此在多元分析中，不能把“各偏导数存在”与“函数可微”混为一谈。若“可导”指 Fréchet 意义下的导数，它和可微是同一个概念；若只指偏导数存在，它则远弱于可微。

## 四、复变函数中的情况更加特殊

现在考虑

\[
f:\mathbb C\to\mathbb C.
\]

复函数的导数同样定义为

\[
f'(z)
=
\lim_{h\to0}
\frac{f(z+h)-f(z)}{h}.
\]

形式上，这与实函数几乎完全相同。

但是这里有一个巨大的区别：

\[
h\in\mathbb C.
\]

所以 \(h\to0\) 可以从复平面中的**任意方向**进行。

例如可以沿实轴：

\[
h\in\mathbb R,
\]

也可以沿虚轴：

\[
h=it,
\]

甚至可以沿任意角度：

\[
h=re^{i\theta}.
\]

无论从哪个方向趋近，差商都必须得到同一个极限。

因此复可导比实可导严格得多。

### 1. Cauchy–Riemann 条件

设

\[
z=x+iy,
\]

并且

\[
f(z)=u(x,y)+iv(x,y).
\]

如果 \(f\) 复可导，那么实部和虚部需要满足 Cauchy–Riemann 方程：

\[
\frac{\partial u}{\partial x}
=
\frac{\partial v}{\partial y},
\]

\[
\frac{\partial u}{\partial y}
=
-
\frac{\partial v}{\partial x}.
\]

为什么会出现这样强的限制？

因为从实二维的角度看，

\[
f:\mathbb R^2\to\mathbb R^2.
\]

一般的实可微映射，其局部线性近似可以是任意 \(2\times2\) 矩阵：

\[
A=
\begin{bmatrix}
a&b\\
c&d
\end{bmatrix}.
\]

但是复数乘法

\[
w\mapsto cw
\]

对应的实矩阵只能具有特殊形式：

\[
\begin{bmatrix}
a&-b\\
b&a
\end{bmatrix}.
\]

Cauchy–Riemann 方程正是在要求 Jacobian 必须具有这样的特殊结构。

所以可以从线性代数角度理解：

> 实可微要求函数局部近似于一个实线性映射；复可微则要求它局部近似于一个**复线性映射**。

后者显然更加严格。

### 2. 复函数的关系

复可导仍然推出连续：

\[
\boxed{\text{复可导}\Rightarrow\text{连续}.}
\]

而如果一个函数在某个开集中的每一点都复可导，我们称它为**全纯函数（holomorphic function）**。

复分析中还存在一个非常惊人的结论：

> 一个函数只要在开集上复可导一次，就会自动具有任意阶导数。

即

\[
\text{全纯}
\Rightarrow
C^\infty.
\]

一个实函数完全可能只有一阶导数，却没有二阶导数。

因此复可导虽然条件更苛刻，但一旦满足，就会得到极其强大的性质。

## 五、从微分自然进入矩阵微积分

当自变量或函数值是向量、矩阵时，微分的本质仍不变：寻找局部的一阶线性近似。下面只把这种近似用梯度、Jacobian、Hessian 和矩阵微分的符号写出来。

### 1. 梯度

考虑

\[
f:\mathbb R^n\to\mathbb R.
\]

设

\[
x=
\begin{bmatrix}
x_1\\
x_2\\
\vdots\\
x_n
\end{bmatrix}.
\]

梯度定义为

\[
\nabla_x f
=
\begin{bmatrix}
\frac{\partial f}{\partial x_1}\\
\frac{\partial f}{\partial x_2}\\
\vdots\\
\frac{\partial f}{\partial x_n}
\end{bmatrix}.
\]

于是函数的微分可以写成

\[
df
=
\nabla f^{T}dx.
\]

### 2. Jacobian 矩阵

如果

\[
f:\mathbb R^n\to\mathbb R^m,
\]

其中

\[
f(x)=
\begin{bmatrix}
f_1(x)\\
\vdots\\
f_m(x)
\end{bmatrix},
\]

那么 Jacobian 定义为

\[
J_f
=
\begin{bmatrix}
\frac{\partial f_1}{\partial x_1}
&
\cdots
&
\frac{\partial f_1}{\partial x_n}
\\
\vdots
&
\ddots
&
\vdots
\\
\frac{\partial f_m}{\partial x_1}
&
\cdots
&
\frac{\partial f_m}{\partial x_n}
\end{bmatrix}.
\]

因此

\[
J_f\in\mathbb R^{m\times n}.
\]

微分关系为

\[
df=J_f\,dx.
\]

或者写成局部近似：

\[
f(x+\Delta x)
\approx
f(x)+J_f(x)\Delta x.
\]

### 3. Hessian 矩阵

如果

\[
f:\mathbb R^n\to\mathbb R,
\]

梯度本身是一个向量值函数：

\[
\nabla f:\mathbb R^n\to\mathbb R^n.
\]

因此，可以把梯度看作前面 \(\mathbb R^n\to\mathbb R^m\) 情形中的向量值函数，再对它应用一次 Jacobian 的定义。得到的 Jacobian 矩阵就是 Hessian：

\[
H_f(x)
=
J_{\nabla f}(x)
=
\nabla^2f(x).
\]

即

\[
H_f
=
\begin{bmatrix}
\frac{\partial^2f}{\partial x_1^2}
&
\cdots
&
\frac{\partial^2f}{\partial x_1\partial x_n}
\\
\vdots
&
\ddots
&
\vdots
\\
\frac{\partial^2f}{\partial x_n\partial x_1}
&
\cdots
&
\frac{\partial^2f}{\partial x_n^2}
\end{bmatrix}.
\]

矩阵中第 \((i,j)\) 个元素正是

\[
\bigl(H_f(x)\bigr)_{ij}
=
\frac{\partial}{\partial x_j}
\left(\frac{\partial f}{\partial x_i}\right)
=
\frac{\partial^2f}{\partial x_i\partial x_j}.
\]

所以 Hessian 并不是新的求导规则：它就是“先由标量函数得到梯度，再把梯度当作向量值函数求 Jacobian”。一阶 Taylor 展开

\[
f(x+\Delta x)
\approx
f(x)+\nabla f^T\Delta x
\]

可以进一步扩展成二阶形式：

\[
f(x+\Delta x)
\approx
f(x)
+
\nabla f^T\Delta x
+
\frac12
\Delta x^T
H_f
\Delta x.
\]

因此：

- 梯度描述一阶变化；
- Hessian 描述曲率和二阶变化。

### 4. 矩阵变量的微分

矩阵微分有两种不同的情形，容易混在一起：

\[
X\longmapsto f(X)\in\mathbb R
\]

是“矩阵到标量”，而

\[
X\longmapsto F(X)\in\mathbb R^{p\times q}
\]

才是“矩阵到矩阵”。先处理前者，因为梯度、优化和大多数求导公式都以它为基础。

#### 4.1 矩阵到标量：矩阵梯度

设

\[
X=
\begin{bmatrix}
X_{11}&\cdots&X_{1n}\\
\vdots&\ddots&\vdots\\
X_{m1}&\cdots&X_{mn}
\end{bmatrix}
\in\mathbb R^{m\times n},
\qquad
f(X)\in\mathbb R.
\]

可以把 \(X\) 暂时看成由 \(mn\) 个普通变量 \(X_{ij}\) 组成。于是，和多元标量函数完全一样，\(f\) 的一阶变化是

\[
df
=
\sum_{i=1}^m\sum_{j=1}^n
\frac{\partial f}{\partial X_{ij}}\,dX_{ij}.
\]

定义矩阵梯度

\[
\nabla_Xf
=
\left[
\frac{\partial f}{\partial X_{ij}}
\right]
\in\mathbb R^{m\times n}.
\]

它的形状与 \(X\) 相同：第 \((i,j)\) 个元素就是 \(f\) 对 \(X_{ij}\) 的偏导数。

迹公式并不是一个新的规则，而只是把上面的双重求和压缩成矩阵写法。对任意同型矩阵 \(A,B\)，都有

\[
\operatorname{tr}(A^TB)
=
\sum_{i=1}^m\sum_{j=1}^n A_{ij}B_{ij}.
\]

因此取 \(A=\nabla_Xf\)、\(B=dX\)，便得到

\[
\boxed{
df
=
\operatorname{tr}\!\left((\nabla_Xf)^T dX\right).
}
\]

这里 \(dX\) 表示矩阵的微小变化；这个公式的含义就是：把每个矩阵元素的微小变化 \(dX_{ij}\)，按对应偏导数加权后全部相加。

例如，令

\[
f(X)=\|X\|_F^2
=
\sum_{i=1}^m\sum_{j=1}^nX_{ij}^2.
\]

逐元素求微分可得

\[
df
=
\sum_{i,j}2X_{ij}\,dX_{ij}
=
\operatorname{tr}\!\left((2X)^TdX\right).
\]

对照定义便立刻读出

\[
\boxed{\nabla_X\|X\|_F^2=2X.}
\]

#### 4.2 矩阵到矩阵：线性化与 Jacobian

现在才考虑真正的矩阵值函数

\[
F:\mathbb R^{m\times n}\to\mathbb R^{p\times q}.
\]

它在 \(X\) 处可微，是指存在一个线性映射 \(DF(X)\)，使得

\[
F(X+H)
=
F(X)+DF(X)[H]+o(\|H\|_F).
\]

这里 \(H\) 是输入矩阵的微小增量，\(DF(X)[H]\) 是对 \(H\) 的线性响应。通常把它记为

\[
dF=DF(X)[dX].
\]

这和前面向量值函数的可微完全是同一件事：把 \(X\) 的 \(mn\) 个元素排成一个长向量，把 \(F(X)\) 的 \(pq\) 个元素也排成一个长向量。若 \(\operatorname{vec}\) 表示这种按列堆叠的操作，则

\[
\operatorname{vec}(dF)
=
J_F(X)\operatorname{vec}(dX),
\]

其中

\[
J_F(X)\in\mathbb R^{pq\times mn}
\]

就是矩阵值函数的 Jacobian 矩阵。

因此，矩阵到矩阵的微分也没有新的本质：它仍然是在所有输入元素的一阶变化与所有输出元素的一阶变化之间，寻找一个线性映射。只是把这个映射完整写成 Jacobian 后，矩阵尺寸往往很大，所以实际计算中更常保留紧凑的形式 \(dF=DF(X)[dX]\)，而不是显式写出整个 Jacobian。

## 六、矩阵微积分中的几个基本规则

### 1. 线性规则

如果

\[
f(X)=a\,g(X)+b\,h(X),
\]

那么

\[
df
=
a\,dg+b\,dh.
\]

因此

\[
\nabla_Xf
=
a\nabla_Xg+b\nabla_Xh.
\]

### 2. 乘积法则

普通微积分中有

\[
d(xy)=x\,dy+y\,dx.
\]

矩阵中仍然成立：

\[
d(AB)
=
(dA)B+A(dB).
\]

但矩阵乘法不能随意交换顺序，因此必须严格保留因子的次序。

### 3. 转置

\[
d(X^T)
=
(dX)^T.
\]

### 4. 链式法则

普通一元微积分中：

\[
y=f(u),\qquad u=g(x),
\]

则

\[
\frac{dy}{dx}
=
\frac{dy}{du}
\frac{du}{dx}.
\]

到了多元函数，设

\[
x\in\mathbb R^n,
\qquad
y=g(x)\in\mathbb R^m,
\qquad
z=f(y)\in\mathbb R^p.
\]

微分分别为

\[
dy=J_g\,dx,
\]

以及

\[
dz=J_f\,dy.
\]

代入得到

\[
dz
=
J_fJ_g\,dx.
\]

所以

\[
\boxed{
J_{f\circ g}
=
J_fJ_g.
}
\]

这就是多元链式法则，也是神经网络反向传播、机器人运动学以及复杂优化问题求导的数学基础。

### 5. 迹

由于

\[
\operatorname{tr}(AB)
=
\operatorname{tr}(BA),
\]

所以迹在矩阵微积分中特别有用。

例如

\[
d\,\operatorname{tr}(X)
=
\operatorname{tr}(dX).
\]

又例如

\[
f(X)=\operatorname{tr}(A^TX),
\]

那么

\[
df
=
\operatorname{tr}(A^TdX),
\]

所以

\[
\boxed{
\nabla_Xf=A.
}
\]

## 七、常见矩阵求导公式

### 1. 线性函数

如果

\[
f(x)=a^Tx,
\]

那么

\[
\boxed{
\nabla_xf=a.
}
\]

### 2. 二次型

考虑

\[
f(x)=x^TAx.
\]

利用微分，

\[
df
=
d(x^TAx).
\]

由乘积法则：

\[
df
=
(dx)^TAx
+
x^TA(dx).
\]

第一项可以转换成

\[
(dx)^TAx
=
x^TA^Tdx.
\]

于是

\[
df
=
x^T(A^T+A)dx.
\]

所以

\[
\boxed{
\nabla_x(x^TAx)
=
(A+A^T)x.
}
\]

如果 \(A\) 是对称矩阵，

\[
A=A^T,
\]

那么

\[
\boxed{
\nabla_x(x^TAx)=2Ax.
}
\]

这是优化、控制和机器学习中极为常见的公式。

### 3. 最小二乘

考虑

\[
f(x)=\|Ax-b\|^2.
\]

展开：

\[
f(x)
=
(Ax-b)^T(Ax-b).
\]

于是

\[
\boxed{
\nabla_xf
=
2A^T(Ax-b).
}
\]

令梯度为零：

\[
A^T(Ax-b)=0,
\]

得到正规方程

\[
A^TAx=A^Tb.
\]

因此线性代数中的最小二乘解，与微积分中的最优化实际上自然地连接起来。

### 4. 逆矩阵的微分

设

\[
Y=X^{-1}.
\]

由于

\[
XY=I,
\]

微分得到

\[
d(XY)=0.
\]

利用乘积法则：

\[
(dX)Y+X(dY)=0.
\]

左右整理：

\[
dY
=
-X^{-1}(dX)X^{-1}.
\]

因此

\[
\boxed{
d(X^{-1})
=
-X^{-1}(dX)X^{-1}.
}
\]
