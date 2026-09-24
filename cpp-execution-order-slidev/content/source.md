## 一、顺序执行

### 1. 什么是顺序执行

最简单的程序执行方式就是：

> 从上到下，一条语句接着一条语句执行。

例如：

```cpp
#include <iostream>

int main()
{
    int a = 10;
    int b = 20;

    int c = a + b;

    std::cout << c << std::endl;

    return 0;
}
```

程序的执行顺序就是：

```text
定义 a
    ↓
定义 b
    ↓
计算 c
    ↓
输出 c
    ↓
结束程序
```

也就是说：

\[
S_1
\rightarrow
S_2
\rightarrow
S_3
\rightarrow
\cdots
\rightarrow
S_n
\]

其中 \(S_i\) 表示一条语句。

这就是所谓的**顺序结构**。


### 2. 顺序执行是默认执行方式

如果程序中没有任何额外的控制结构，那么 C++ 默认就是按照代码出现的顺序执行。

例如：

```cpp
int x = 1;

x = x + 2;

x = x * 3;

std::cout << x;
```

程序不是同时执行这些语句，而是依次执行：

第一步：

```cpp
x = 1;
```

于是：

\[
x=1
\]

第二步：

```cpp
x = x + 2;
```

于是：

\[
x=3
\]

第三步：

```cpp
x = x * 3;
```

于是：

\[
x=9
\]

最终输出：

```text
9
```

所以程序中的“顺序”非常重要。

例如把两条语句交换：

```cpp
x = x * 3;
x = x + 2;
```

得到的就是：

\[
1\times3+2=5
\]

而不再是 9。

因此程序并不是单纯的一组数学公式，而是：

> **一个随时间依次发生的计算过程。**


## 二、选择执行

选择执行的基本思想是：

> **根据某个条件是否成立，决定执行哪一段程序。**

C++ 中最基本的选择结构是：

```cpp
if
```


### 1. 最简单的 if

例如：

```cpp
int score;
std::cin >> score;

if (score >= 60)
{
    std::cout << "pass";
}
```

其中：

```cpp
score >= 60
```

是一个条件表达式。

它的结果是一个布尔值：

```cpp
true
```

或者：

```cpp
false
```

因此它实际上可以理解为：

\[
score\ge60
\rightarrow
\{\text{true},\text{false}\}
\]

如果条件为：

```cpp
true
```

那么执行：

```cpp
std::cout << "pass";
```

否则直接跳过。

程序结构可以表示为：

```text
        score >= 60 ?
          /      \
       true     false
        |          |
    输出 pass      |
          \        /
           继续执行
```


### 2. if...else：二选一

更加常见的是：

```cpp
if (condition)
{
    ...
}
else
{
    ...
}
```

例如：

```cpp
int score;
std::cin >> score;

if (score >= 60)
{
    std::cout << "pass";
}
else
{
    std::cout << "fail";
}
```

逻辑结构为：

```text
          score >= 60
           /       \
        true       false
         |            |
   输出 "pass"   输出 "fail"
         \            /
          \          /
            后续程序
```

这里最重要的一点是：

> `if` 和 `else` 中只有一个分支会被执行。

如果：

```cpp
score = 80;
```

那么：

```cpp
score >= 60
```

为真，因此执行：

```cpp
std::cout << "pass";
```

而：

```cpp
std::cout << "fail";
```

不会执行。


### 3. 多分支选择

现实中的情况往往不只有两个选择。

例如：

```text
90~100：A
80~89：B
70~79：C
60~69：D
0~59：F
```

这时可以使用：

```cpp
if
else if
else
```

例如：

```cpp
int score;
std::cin >> score;

if (score >= 90)
{
    std::cout << "A";
}
else if (score >= 80)
{
    std::cout << "B";
}
else if (score >= 70)
{
    std::cout << "C";
}
else if (score >= 60)
{
    std::cout << "D";
}
else
{
    std::cout << "F";
}
```

这里程序会从上到下依次判断。

如果：

```cpp
score = 85;
```

首先判断：

```cpp
score >= 90
```

结果为假。

然后判断：

```cpp
score >= 80
```

结果为真。

于是执行：

```cpp
std::cout << "B";
```

然后整个选择结构结束。

后面的条件不会继续判断。

因此：

```cpp
if
else if
else
```

可以理解成：

\[
P_1?
\]

若失败，再问：

\[
P_2?
\]

若还失败，再问：

\[
P_3?
\]

直到找到第一个成立的条件。


### 4. switch：根据离散值进行选择

如果我们不是判断一个范围，而是根据某个变量的具体取值进行选择，还可以使用：

```cpp
switch
```

例如：

```cpp
int choice;
std::cin >> choice;

switch (choice)
{
case 1:
    std::cout << "Open";
    break;

case 2:
    std::cout << "Save";
    break;

case 3:
    std::cout << "Exit";
    break;

default:
    std::cout << "Unknown";
}
```

如果：

```cpp
choice == 2
```

那么执行：

```cpp
std::cout << "Save";
```

这种结构特别适合处理：

```text
菜单选项
状态编号
枚举类型
命令编号
```

等离散情况。

例如：

```text
1 → 前进
2 → 后退
3 → 左转
4 → 右转
```


## 三、循环执行

除了“选择执行哪一条路径”，程序还有另一个非常重要的需求：

> **重复执行同一段操作。**

例如，我们希望计算：

\[
1+2+3+\cdots+100
\]

一种非常笨的方法是：

```cpp
sum += 1;
sum += 2;
sum += 3;
...
sum += 100;
```

显然没有必要写 100 条几乎完全相同的语句。

因为这里存在一种重复结构：

\[
sum
\leftarrow
sum+i
\]

只不过：

\[
i=1,2,\cdots,100
\]

于是我们希望告诉计算机：

> 把某一段程序重复执行若干次。

这就是：

\[
\boxed{\text{循环}}
\]


### 1. while 循环

最基本的循环结构之一是：

```cpp
while
```

基本形式为：

```cpp
while (condition)
{
    statement;
}
```

含义是：

> 只要条件成立，就不断执行循环体。

例如：

```cpp
int i = 1;

while (i <= 5)
{
    std::cout << i << std::endl;

    i++;
}
```

执行过程为：

```text
i = 1

判断 i <= 5
    ↓ true
输出 1
i = 2

判断 i <= 5
    ↓ true
输出 2
i = 3

...

判断 i <= 5
    ↓ false
结束循环
```

因此输出：

```text
1
2
3
4
5
```


循环本质上是“条件判断 + 回跳”。

从控制流角度看，循环并不是一种完全神秘的新结构。

以：

```cpp
while (condition)
{
    body;
}
```

为例，其逻辑就是：

```text
      ┌─────────────┐
      ↓             |
判断 condition      |
   /       \        |
 true     false     |
  |          |      |
执行 body    |      |
  |          |      |
  └──────────┘      |
             ↓
          后续程序
```

因此循环的本质是：

1. 判断条件；
2. 如果条件成立，执行循环体；
3. 回到条件判断；
4. 如果条件不成立，则离开循环。

循环通常需要一个变量记录：

> 现在循环进行到什么阶段了。

例如：

```cpp
int i = 1;

while (i <= 100)
{
    std::cout << i << std::endl;
    i++;
}
```

这里的：

```cpp
i
```

就是循环变量。

它依次经历：

\[
1,2,3,\cdots,100
\]

而：

```cpp
i++;
```

实际上等价于：

```cpp
i = i + 1;
```

也就是：

\[
i\leftarrow i+1
\]

注意，这里的 `=` 不是数学中的等号。

它表示：

> 把右边计算出来的新值存入左边的变量。

因此循环实际上非常依赖变量状态不断发生变化：

\[
i=1
\]

变为：

\[
i=2
\]

再变为：

\[
i=3
\]

依次进行。


当循环条件始终为真时，就会出现无限循环。

例如：

```cpp
int i = 1;

while (i <= 5)
{
    std::cout << i;
}
```

这里忘记了：

```cpp
i++;
```

于是：

\[
i
\]

永远等于：

\[
1
\]

所以：

```cpp
i <= 5
```

永远成立。

循环于是变成：

\[
\text{true}
\rightarrow
\text{执行}
\rightarrow
\text{true}
\rightarrow
\text{执行}
\rightarrow\cdots
\]

这就是所谓的：

\[
\boxed{\text{无限循环}}
\]

或者：

```text
死循环
```

有时无限循环是程序错误，但有时它又是故意设计的。

例如一个机器人控制程序可能写成：

```cpp
while (true)
{
    read_sensor();
    calculate_control();
    send_command();
}
```

含义就是：

> 只要系统运行，就不断读取传感器、计算控制量并发送控制命令。

因此无限循环本身并不一定错误。


### 2. for 循环

如果循环次数比较明确，那么 C++ 中经常使用：

```cpp
for
```

例如：

```cpp
for (int i = 1; i <= 5; i++)
{
    std::cout << i << std::endl;
}
```

输出：

```text
1
2
3
4
5
```

`for` 循环通常写成：

```cpp
for (初始化; 条件; 更新)
{
    循环体;
}
```

因此：

```cpp
for (int i = 1; i <= 5; i++)
```

可以拆解为三个部分：

初始化：

```cpp
int i = 1;
```

条件：

```cpp
i <= 5
```

更新：

```cpp
i++;
```

它大体等价于：

```cpp
int i = 1;

while (i <= 5)
{
    std::cout << i << std::endl;

    i++;
}
```

所以：

> `for` 和 `while` 在能力上并没有本质区别。

只是它们适合表达不同类型的循环。

### 3. for 循环与 while 循环的关系

通常来说：

如果我们明确知道：

> 循环多少次

那么：

```cpp
for
```

比较自然。

例如：

```cpp
for (int i = 0; i < 100; i++)
```

意思非常直观：

> 循环 100 次。

而如果我们不知道具体循环多少次，只知道：

> 满足某个条件的时候继续循环

那么：

```cpp
while
```

更加自然。

例如：

```cpp
while (temperature < target)
{
    heat();
}
```

这里我们并不知道究竟需要加热多少次。

只是知道：

\[
temperature < target
\]

的时候继续加热。

### 4. break 与 continue 机制

#### break：提前结束循环

有时候循环本来应该继续，但是我们希望在某个特殊情况下直接结束循环。

例如：

```cpp
for (int i = 1; i <= 100; i++)
{
    if (i == 10)
    {
        break;
    }

    std::cout << i << std::endl;
}
```

当：

```cpp
i == 10
```

时执行：

```cpp
break;
```

程序立即退出当前循环。

因此只会输出：

```text
1
2
3
...
9
```

`break` 可以理解为：

> 直接跳到循环结束之后。

#### continue：跳过本次循环

另一个常见语句是：

```cpp
continue;
```

例如：

```cpp
for (int i = 1; i <= 10; i++)
{
    if (i % 2 == 0)
    {
        continue;
    }

    std::cout << i << std::endl;
}
```

如果：

```cpp
i
```

为偶数，那么执行：

```cpp
continue;
```

也就是：

> 本次循环后面的内容不执行，直接进入下一次循环。

所以最终输出：

```text
1
3
5
7
9
```

## 四、三种结构可以相互组合

真正的程序通常不会只使用一种结构。

而是：

\[
\text{顺序}
+
\text{选择}
+
\text{循环}
\]

共同组成程序。

例如，我们希望输入 5 个数字，并统计其中有多少个正数：

```cpp
#include <iostream>

int main()
{
    int count = 0;

    for (int i = 0; i < 5; i++)
    {
        int x;
        std::cin >> x;

        if (x > 0)
        {
            count++;
        }
    }

    std::cout << count << std::endl;

    return 0;
}
```

这里同时出现了三种结构。

首先：

```cpp
int count = 0;
```

然后：

```cpp
for (...)
```

然后：

```cpp
std::cout << count;
```

这些整体上构成**顺序结构**。

而：

```cpp
for
```

构成**循环结构**。

在循环内部：

```cpp
if (x > 0)
```

又构成**选择结构**。

所以程序的结构实际上可以层层嵌套：

```text
顺序
│
├── 初始化
│
├── 循环
│   │
│   ├── 输入
│   │
│   └── 选择
│       └── count++
│
└── 输出
```

这就是复杂程序最基本的构造方式。

## 五、从数学函数到程序控制流

如果只看数学，我们经常把问题描述成：

\[
y=f(x)
\]

给定输入：

\[
x
\]

经过函数：

\[
f
\]

得到输出：

\[
y
\]

但是实际程序内部并不一定只是简单地计算一个公式。

例如：

```cpp
int abs(int x)
{
    if (x >= 0)
    {
        return x;
    }
    else
    {
        return -x;
    }
}
```

从数学角度，它描述的是绝对值函数：

\[
|x|=
\begin{cases}
x,&x\ge0\\
-x,&x<0
\end{cases}
\]

而从程序执行角度看：

```cpp
if
```

负责根据条件选择不同计算路径。

因此：

> 数学中的“分段函数”，在程序里经常对应选择结构。

类似地，数学中的有限求和：

\[
\sum_{i=1}^{n}i
\]

在程序中可以写成：

```cpp
int sum = 0;

for (int i = 1; i <= n; i++)
{
    sum += i;
}
```

因此：

> 数学中的重复递推过程，在程序里经常对应循环结构。
