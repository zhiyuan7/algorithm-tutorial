如果没有面向对象，我们自己编写的函数，或者调用第三方库提供的函数，通常都会以比较扁平的方式散落在不同位置。它们当然也可以按照模块形成一定的层级关系，但当我们需要解决一个具体问题时，往往仍要面对很多入口，逐个寻找合适的函数并不轻松。

例如，要控制一个机器人移动，我们可能会先找到 `move_left`、`move_right`、`move_forward` 等函数；还要在外部单独记录机器人的坐标、朝向和电量。随着功能增多，这些函数和数据会越来越分散，使用它们的人既要知道该调用哪些函数，也要小心维护那些本应由机器人自己管理的状态。

面向对象提供了另一种思路：先思考“哪个对象适合解决这个问题”，再调用这个对象提供的相应功能。机器人对象可以负责移动，也可以保存并处理自己的坐标、朝向和电量等内部状态；外部代码不必直接关心这些状态是如何记录和变化的。

因此，我们需要一种机制，既能保存对象内部的数据，又能把与这些数据相关的函数聚合起来。对象便应运而生了。

## 一、对象与生命周期

在 C++ 中，对象的生命周期主要由两类特殊函数负责：

\[
\boxed{\text{构造函数}}
\qquad
\boxed{\text{析构函数}}
\]

构造函数负责对象的“出生”，析构函数负责对象的“死亡”。


### 1. 构造函数：建立一个合法的对象

假设我们定义一个机器人类：

```cpp
class Robot {
private:
    double x;
    double y;

public:
    Robot(double init_x, double init_y) {
        x = init_x;
        y = init_y;
    }
};
```

这里：

```cpp
Robot(double init_x, double init_y)
```

就是构造函数。

当我们写：

```cpp
Robot robot(10.0, 20.0);
```

程序并不是简单地“申请了一块内存”。

更准确地说，它经历了：

\[
\text{获得对象所需的存储空间}
\rightarrow
\text{执行构造函数}
\rightarrow
\text{形成一个有效的 Robot 对象}
\]

所以构造函数真正承担的任务，是：

> 把一块可以存放对象的内存，初始化为一个满足类设计要求的合法对象。

### 2. 初始化列表：在成员建立时完成初始化

C++ 中，只要条件允许，通常更推荐在构造函数中使用初始化列表：

```cpp
class Robot {
private:
    double x;
    double y;

public:
    Robot(double init_x, double init_y)
        : x(init_x), y(init_y) {
    }
};
```

这里的：

```cpp
: x(init_x), y(init_y)
```

表示 `x` 和 `y` 在被建立的那一刻，就分别用 `init_x` 和 `init_y` 初始化。构造函数体随后才开始执行。

这与下面的写法有本质区别：

```cpp
Robot(double init_x, double init_y) {
    x = init_x;
    y = init_y;
}
```

上面的构造函数体并没有“初始化” `x` 和 `y`，而是在它们已经建立之后，再进行赋值。两种过程可以概括为：

\[
\text{构造函数体中赋值：先默认初始化成员}
\rightarrow
\text{再赋新值}
\]

\[
\text{初始化列表：建立成员时直接给出初始值}
\]

对于 `double` 这样的简单类型，差异通常不明显；但成员本身是一个对象时，区别就很直观：

```cpp
class Name {
public:
    Name() { /* 建立一个空名字 */ }
    Name(const std::string& text) { /* 直接用 text 建立名字 */ }

    Name& operator=(const std::string& text) {
        /* 把已有名字改成 text */
        return *this;
    }
};

class Student {
private:
    Name name;

public:
    Student(const std::string& text)
        : name(text) {             // 直接调用 Name(text)
    }
};
```

如果改为在构造函数体中赋值：

```cpp
Student(const std::string& text) {
    name = text;
}
```

那么程序会先调用 `Name()` 建立一个空的 `name`，再调用赋值运算符把它改成 `text`。这不仅多做了一步，而且“如何建立对象”和“如何修改已有对象”本来就是两件不同的事。

因此，初始化列表的好处主要有三点：

- **语义更准确**：成员从一开始就处于正确的初始状态，而不是先随意建立、再补救式地修改。
- **通常更高效**：对于类类型成员，可以避免一次默认构造和一次赋值。
- **有些情况下是唯一写法**：`const` 成员必须在建立时初始化；引用成员必须在建立时绑定；没有默认构造函数的成员对象，也必须通过初始化列表提供构造所需的参数。

例如，下面的 `id` 和 `owner` 都不能在构造函数体中再赋值：

```cpp
class Task {
private:
    const int id;
    std::string& owner;

public:
    Task(int task_id, std::string& task_owner)
        : id(task_id), owner(task_owner) {
    }
};
```

还有一个容易忽略的规则：成员实际初始化的顺序，只由它们在类中**声明的顺序**决定，而不是初始化列表中书写的顺序。因此，初始化列表最好也按成员声明顺序书写，这样更清楚，也能避免编译器警告。


### 3. 构造函数与析构函数：管理对象的生命周期

构造函数负责让对象以合法状态进入生命周期；与它相对应的析构函数，则在对象离开生命周期时自动执行收尾工作。

```cpp
class Robot {
public:
    Robot() {
        std::cout << "Robot created\n";
    }

    ~Robot() {
        std::cout << "Robot destroyed\n";
    }
};
```

其中 `~Robot()` 就是析构函数。它没有参数，也没有返回值；一个类最多只能有一个析构函数。

```cpp
void test() {
    Robot r;
}  // 离开作用域，r 的析构函数自动执行
```

进入 `test()` 时，`r` 被构造；离开 `test()` 时，`r` 被析构。也就是说：

\[
\boxed{\text{对象进入生命周期} \rightarrow \text{构造}}
\qquad
\boxed{\text{对象离开生命周期} \rightarrow \text{析构}}
\]

如果类中只有 `int`、`double` 等普通成员，析构函数通常不需要做额外工作。但对象经常还拥有某些资源，例如动态内存、文件、网络连接、互斥锁、数据库连接或 GPU 资源。这些资源应当在对象不再需要它们时被正确释放。

```cpp
class Buffer {
private:
    int* data;

public:
    Buffer(int n)
        : data(new int[n]) {
    }

    ~Buffer() {
        delete[] data;
    }
};
```

`Buffer buffer(1000);` 建立时取得内存；当 `buffer` 离开作用域时，析构函数自动执行 `delete[] data`。于是资源的取得和释放被绑定在同一个对象的生命周期上。

这就是 C++ 中重要的 **RAII**（Resource Acquisition Is Initialization）思想：

> 让对象拥有资源；对象建立时取得资源，对象销毁时释放资源，而不是要求外部代码在每条可能的执行路径上手动清理资源。

实际代码中，优先使用 `std::vector`、`std::string`、`std::unique_ptr`、文件流等已经遵循 RAII 的类型，而不是直接手写 `new` 和 `delete`。这样通常无需自己编写析构函数，代码也更安全。


### 4. 默认构造、默认析构与 `= default`、`= delete`

如果我们没有为一个类编写构造函数和析构函数，编译器通常会在需要时为它生成默认版本。对于只由普通成员组成的简单类型，这往往已经足够：

```cpp
class Point {
private:
    double x = 0.0;
    double y = 0.0;
};

Point p;  // 使用编译器生成的默认构造函数
```

这里成员的默认值由类内初始化器给出。若成员没有类内初始值，默认构造后的简单类型成员未必具有我们期望的值，因此不要依赖“它大概是 0”。

一旦我们自己声明了带参数的构造函数，编译器通常就不会再自动提供无参数的默认构造函数：

```cpp
class Robot {
public:
    Robot(double x, double y);
};

// Robot r;  // 错误：没有无参数构造函数
```

如果仍然希望对象可以无参数创建，就明确写出默认构造函数。`= default` 的意思是：请编译器按照默认规则生成这个函数。

```cpp
class Robot {
public:
    Robot() = default;
    Robot(double init_x, double init_y)
        : x(init_x), y(init_y) {
    }

    ~Robot() = default;

private:
    double x = 0.0;
    double y = 0.0;
};
```

同样地，只有当类确实需要自行释放或协调资源时，才应编写析构函数；否则 `~Robot() = default;` 或完全不写析构函数通常更合适。

有时，我们不希望某种构造或操作被使用。此时可以用 `= delete` 在编译期明确禁止它。例如，一个必须给定编号才能建立的任务，不应该被无参数创建：

```cpp
class Task {
public:
    Task() = delete;               // 禁止 Task task;
    explicit Task(int task_id)
        : id(task_id) {
    }

private:
    int id;
};
```

## 二、封装：让对象自己管理自己的状态

有了对象之后，接下来一个问题是：

> 对象内部的数据，是不是所有代码都可以随意访问和修改？

原则上当然可以把所有成员变量都写成：

```cpp
public:
```

例如：

```cpp
class BankAccount {
public:
    double balance;
};
```

于是外部代码可以随便写：

```cpp
BankAccount account;

account.balance = -1000000;
```

但这就产生了问题。

如果我们的银行账户规定：

\[
balance \geq 0
\]

那么外部代码就轻易破坏了对象应当满足的约束。

因此，面向对象提出了一个非常重要的思想：

\[
\boxed{\text{封装}}
\]

也就是：

> 把对象的内部实现隐藏起来，只向外界开放必要的操作接口。


### 1. 数据成员通常应当是 private，函数提供 public 接口

例如：

```cpp
class BankAccount {
private:
    double balance;

public:
    BankAccount(double initial)
        : balance(initial) {}

    void deposit(double amount) {
        if (amount > 0)
            balance += amount;
    }

    bool withdraw(double amount) {
        if (amount <= balance) {
            balance -= amount;
            return true;
        }

        return false;
    }

    double getBalance() const {
        return balance;
    }
};
```

现在外界不能写：

```cpp
account.balance = -1000;
```

因为：

```cpp
balance
```

是 `private`。

外部只能通过：

```cpp
deposit()
withdraw()
getBalance()
```

这些公开接口操作账户。

于是我们实际上建立了一个边界：

\[
\boxed{
\text{外部程序}
\longrightarrow
\text{public 接口}
\longrightarrow
\text{private 内部状态}
}
\]

这正是 Scott Meyers 在《Effective C++》第 22 条中提出的建议：**数据成员应当声明为 `private`**。这里并不是说类中不能有 `public`，而是说：

- 数据本身通常不应直接暴露给外部；
- 外部确实需要使用的能力，可以设计为 `public` 成员函数；
- 只供类内部实现使用的辅助函数，也应当是 `private`。

因此，一个常见的设计方式是：外部告诉对象“想做什么”，对象自己决定“怎样修改内部数据”。例如，外部可以请求存款、取款或查询余额，却不能绕过规则直接改写余额。

这样做的第一个好处是能够维护对象的**不变量**，也就是对象在正常情况下始终应满足的条件。对于银行账户，`balance >= 0` 就是不变量。`deposit()` 和 `withdraw()` 是唯一允许修改余额的入口，因此它们可以在每次修改前检查金额、余额等条件；而公开数据成员会让任何调用者都能绕过这些检查。

第二个好处是接口更稳定。假如一开始余额用一个 `double` 保存，之后需要改为“分”为单位的整数，或需要同时保存可用余额、冻结余额和交易记录：

```cpp
class BankAccount {
private:
    long long available_cents;
    long long frozen_cents;

public:
    bool withdraw(double amount);
    double getBalance() const;
};
```

只要 `withdraw()`、`getBalance()` 等 `public` 函数的含义不变，使用这个类的外部代码通常不用改动。反过来，如果外部代码一直在访问 `account.balance`，那么数据的类型、名称、存储单位和内部结构都很难调整。

第三个好处是使用方式更统一。客户端只通过函数与对象交互，就不必记住某个成员究竟是“可以直接读写的数据”还是“必须调用的方法”；从接口角度看，它们都是对象提供的能力。

注意，`public` 成员函数也不是越多越好。一个函数只有在它确实是对象对外承诺提供的能力时才应该公开；实现细节和内部辅助函数仍然应当隐藏在 `private` 中。对于只表示一组简单数据、没有行为和不变量的类型，C++ 中也可以使用字段公开的 `struct`；但一旦这个类型需要维护规则、管理资源或准备长期演化，优先把数据放在 `private` 中会更稳妥。


### 2. 封装并不只是“把变量写成 private”

理解封装时，一个常见误区是认为：

> 封装就是把成员变量改成 `private`。

这只是表面的语法。

封装真正的思想是：

\[
\boxed{
\text{对象应当负责维护自己的合法状态}
}
\]

例如：

```cpp
class Temperature {
private:
    double value;

public:
    void setTemperature(double t) {
        if (t >= -273.15)
            value = t;
    }
};
```

为什么不能直接公开：

```cpp
double value;
```

因为一旦公开：

```cpp
temperature.value = -1000;
```

就会产生物理上没有意义的状态。

因此，封装实际上意味着：

> 外部代码不需要知道对象内部是怎样实现的，它只需要知道“我可以对这个对象做什么”。

换句话说：

\[
\boxed{
\text{封装把“实现”与“接口”分开}
}
\]


## 三、继承：建立类型之间的层次关系

当程序中的对象越来越多时，我们经常会遇到：

> 不同类型之间有大量共同性质。

例如机器人系统中可能存在：

- 步兵机器人；
- 哨兵机器人；
- 英雄机器人。

它们虽然具体不同，但是都可能具有：

- 位置；
- 速度；
- 编号；
- 移动功能。

如果分别定义：

```cpp
class InfantryRobot {
    // ...
};

class HeroRobot {
    // ...
};

class SentryRobot {
    // ...
};
```

如果分别定义它们，确实可能会出现重复代码；但“想少写几行代码”本身并不足以说明应当使用继承。更重要的是，它们在概念上是否真的都属于 `Robot`。

当这种类型关系成立时，C++ 可以使用：

\[
\boxed{\text{继承}}
\]


### 1. 继承描述 is-a，组合描述 has-a

我们可以先抽象出一个共同的 `Robot`：

```cpp
class Robot {
private:
    double x;
    double y;

public:
    Robot(double initial_x, double initial_y)
        : x(initial_x), y(initial_y) {
    }

    void move(double dx, double dy) {
        x += dx;
        y += dy;
    }
};
```

然后定义步兵机器人：

```cpp
class InfantryRobot : public Robot {
public:
    InfantryRobot(double x, double y)
        : Robot(x, y) {
    }
};
```

这里的 `Robot` 是**基类**（父类），`InfantryRobot` 是**派生类**（子类）。

```cpp
class InfantryRobot : public Robot
```

表达的不是“步兵机器人借用了一些机器人的代码”，而是：

\[
\boxed{\text{InfantryRobot is-a Robot}}
\]

也就是“步兵机器人是一种机器人”。因此，在需要 `Robot` 的地方，步兵机器人也应当能够被当作机器人使用。这是公有继承最重要的设计含义；代码复用只是随之而来的结果，而不是选择继承的首要理由。

与之相对的是 **has-a**，即“拥有一个”的关系。机器人有电池，但机器人不是电池，因此这里不应继承，而应把电池作为机器人的一个成员：

```cpp
class Battery {
public:
    void consume(double amount);
    double remaining() const;
};

class Robot {
private:
    Battery battery;  // Robot has-a Battery
    double x;
    double y;
};
```

这种“一个对象包含另一个对象”的设计通常称为**组合**；在不同语境下，也常被称为聚合、包含或复合。选择关系时，可以先问一句自然语言的问题：

\[
\text{A 是不是一种 B？}
\]

若答案是肯定的，并且 A 可以在任何需要 B 的地方合理使用，才考虑 `class A : public B`；若更自然的说法是“A 有一个 B”，就优先使用组合。不要仅仅为了复用几段代码而建立并不真实的 is-a 类型关系。

例如，步兵机器人、英雄机器人和哨兵机器人可以构成下面的类型层次：

```text
Robot
├── InfantryRobot
├── HeroRobot
└── SentryRobot
```

但每一种机器人都可以“拥有”电池、武器、传感器等部件；这些部件通常是 has-a 关系，而不是机器人类型层次的一部分。


### 2. 派生类可以复用已有功能，也可以增加新功能

派生类会继承基类中可访问的成员函数。因此，步兵机器人不需要重新实现移动功能：

```cpp
class InfantryRobot : public Robot {
public:
    InfantryRobot(double x, double y)
        : Robot(x, y) {
    }

    void shoot() {
        std::cout << "Infantry fires\n";
    }
};
```

```cpp
InfantryRobot infantry(0, 0);

infantry.move(1, 2);  // 使用从 Robot 继承的功能
infantry.shoot();     // 使用 InfantryRobot 新增的功能
```

这说明派生类的自由度并不只是“继承原样的功能”。它至少可以：

- 直接使用基类已经提供的功能；
- 增加只有自己才具有的新数据和新函数；
- 针对某个可变行为，给出更符合自身特点的实现。

不过，基类的 `private` 数据仍然不应由派生类直接修改。派生类应通过基类提供的函数完成通用操作，这样基类仍能维护自己的内部规则。


## 四、多态：用统一接口处理不同对象

继承建立了类型之间的层次关系。

但是如果只有继承，我们还没有发挥这种类型体系最大的价值。

假设：

```cpp
class InfantryRobot : public Robot {};
class HeroRobot : public Robot {};
class SentryRobot : public Robot {};
```

现在我们希望设计一个函数：

```cpp
void attack(...);
```

这个函数可以接收任何一种机器人，而不同机器人执行自己的攻击行为。

这就涉及面向对象中最重要的概念之一：

\[
\boxed{\text{多态}}
\]

Polymorphism。

它字面上的意思就是：

\[
\boxed{\text{同一种形式，可以表现出多种不同形态}}
\]


### 1. 非虚函数、虚函数与纯虚函数：三种不同的约定

继承不只是“派生类能不能调用一个函数”的问题，更重要的是：基类希望派生类对这个函数有什么自由度。《Effective C++》把它理解为“接口继承”和“实现继承”的不同组合。

假设 `Robot` 是可供继承的基类：

```cpp
class Robot {
public:
    int id() const {                 // 非虚函数
        return serial_number;
    }

    virtual void move(double dx, double dy) {  // 虚函数
        x += dx;
        y += dy;
    }

    virtual void attack() = 0;       // 纯虚函数

    virtual ~Robot() = default;

private:
    int serial_number = 0;
    double x = 0.0;
    double y = 0.0;
};
```

三种声明对应三种不同的设计意图：

| 函数种类 | 基类提供什么 | 对派生类的要求 |
| --- | --- | --- |
| 非虚函数 | 接口和既定实现 | 应当直接使用该实现，不应改变其含义 |
| 虚函数 | 接口和一个默认实现 | 可以直接沿用，也可以重写 |
| 纯虚函数 | 只有接口 | 具体派生类必须提供自己的实现 |

#### 非虚函数：接口和实现都应保持不变

`id()` 没有 `virtual`，表示所有机器人都按照相同规则取得编号。它表达的是基类在各种特化情形下仍要保持的规则：派生类可以调用 `id()`，但不应该试图把“编号如何取得”改成另一种含义。

派生类若写出一个同名函数，技术上会隐藏基类函数，但这不是多态意义上的重写；当代码通过 `Robot&` 或 `Robot*` 调用时，仍会使用 `Robot::id()`。因此，若一个操作确实允许不同机器人有不同实现，就不应把它设计为非虚函数。

#### 虚函数：提供默认版本，也允许派生类改变

`move()` 是普通虚函数。基类给出了“更新坐标”的默认实现，所以某个派生类可以什么也不写，直接继承这个版本；也可以按相同签名写出 `override`，提供更符合自身特点的移动方式：

```cpp
class ScoutRobot : public Robot {
public:
    void move(double dx, double dy) override {
        Robot::move(dx, dy);  // 先复用通用的坐标更新
        battery_used += 0.5;  // 再补充侦察机器人自己的处理
    }

    void attack() override {
        std::cout << "Scout marks the target\n";
    }

private:
    double battery_used = 0.0;
};
```

这里也可以完全不调用 `Robot::move()`，而改写整个移动算法；是否保留基类实现取决于基类的规则是否仍然适用。`override` 应当始终写上：一旦参数、`const` 属性等与基类声明不一致，编译器会及时报错，避免误写成同名隐藏。

#### 纯虚函数：只规定必须具备的接口

`virtual void attack() = 0;` 中的 `= 0` 表示纯虚函数。它说明“任何机器人都必须会攻击”，但基类没有一个适用于所有机器人的默认攻击方式。因此，`Robot` 成为**抽象类**，不能直接创建：

```cpp
// Robot r;  // 错误：抽象类不能直接建立对象
```

任何想成为可创建对象的具体派生类，都必须实现 `attack()`；否则它仍然是抽象类。纯虚函数因此表达的是一个**接口契约**。在 C++ 中，纯虚函数技术上也可以有函数定义，但这不会消除派生类为成为具体类而重写该函数的责任；入门阶段可将它理解为“基类只提出要求，不给默认答案”。


### 2. 多态：用同一个接口调用不同对象

当代码通过基类引用或基类指针使用对象，并调用虚函数时，程序会依据对象的实际类型选择相应版本：

```cpp
class InfantryRobot : public Robot {
public:
    void attack() override {
        std::cout << "Infantry fires rifle\n";
    }
};

class HeroRobot : public Robot {
public:
    void attack() override {
        std::cout << "Hero fires cannon\n";
    }
};

void executeAttack(Robot& robot) {
    robot.attack();
}
```

```cpp
InfantryRobot infantry;
HeroRobot hero;

executeAttack(infantry);
executeAttack(hero);
```

两次调用使用的都是 `Robot` 接口，却会分别执行步兵机器人和英雄机器人的 `attack()`。这就是多态：

\[
\boxed{
\text{相同接口}
+
\text{不同实际对象}
\rightarrow
\text{不同实际行为}
}
\]

调用者不需要编写一长串“如果是步兵就……、如果是英雄就……”的类型判断；它只需相信传入的对象满足 `Robot` 的接口契约。


### 3. 接口类与工厂函数：隐藏具体类型的创建

只有纯虚函数（以及虚析构函数）的基类，常被用作**接口类**。外部代码只依赖 `Robot` 这个稳定接口，而不依赖某个具体的 `InfantryRobot` 或 `HeroRobot` 实现。这不仅能用于调用，也能用于对象的创建。

例如，下面的简单**工厂函数**根据配置创建合适的机器人，但将具体派生类藏在函数内部：

```cpp
std::unique_ptr<Robot> makeRobot(const std::string& type) {
    if (type == "infantry") {
        return std::make_unique<InfantryRobot>();
    }
    if (type == "hero") {
        return std::make_unique<HeroRobot>();
    }

    throw std::invalid_argument("unknown robot type");
}
```

调用方只面向 `Robot` 编程：

```cpp
std::unique_ptr<Robot> robot = makeRobot("hero");
robot->attack();
```

这样，调用方不必知道该使用哪个派生类构造函数，也不会因为内部更换了某个具体机器人类型而到处修改。`std::unique_ptr` 同时负责对象的生命周期；当它离开作用域时，会自动销毁所拥有的机器人。由于这里会通过 `Robot*` 销毁派生类对象，所以接口基类必须具有虚析构函数，这正是前面 `virtual ~Robot() = default;` 的意义。

当系统不只是创建一种产品，而是需要创建一整组相互配套的对象时，可以进一步设计**抽象工厂**：先定义一个只含纯虚创建函数的工厂接口，再由不同的具体工厂创建各自的一组产品。对于当前“按类型创建一个机器人”的需求，简单工厂函数已经足够，且更容易理解。


### 4. 多态基类为什么需要虚析构函数

只要一个类准备被当作多态基类使用，并且对象可能通过 `Robot*` 或 `std::unique_ptr<Robot>` 销毁，它的析构函数通常就必须是 `virtual`：

```cpp
class Robot {
public:
    virtual ~Robot() = default;
    virtual void attack() = 0;
};
```

原因在于，指针的静态类型和对象的实际类型可能不同：

```cpp
Robot* robot = new InfantryRobot();
delete robot;
```

变量的类型是 `Robot*`，但它实际指向 `InfantryRobot`。析构函数为 `virtual` 时，`delete robot` 会先调用 `InfantryRobot` 的析构函数，再调用 `Robot` 的析构函数，从而完整清理派生类和基类各自拥有的资源。若基类析构函数不是虚函数，通过基类指针销毁派生对象会产生未定义行为，派生类的收尾工作也可能被跳过。


继承关系中的构造和析构顺序，也正好说明了基类与派生类如何共同组成一个完整对象：

例如：

```cpp
class Robot {
public:
    Robot() {
        std::cout << "Robot constructed\n";
    }

    virtual ~Robot() {
        std::cout << "Robot destroyed\n";
    }
};

class InfantryRobot : public Robot {
public:
    InfantryRobot() {
        std::cout << "Infantry constructed\n";
    }

    ~InfantryRobot() {
        std::cout << "Infantry destroyed\n";
    }
};
```

创建：

```cpp
InfantryRobot robot;
```

时，构造顺序是：

```text
Robot constructed
Infantry constructed
```

也就是说：

\[
\boxed{
\text{先构造基类}
\rightarrow
\text{再构造派生类}
}
\]

因为在一个“步兵机器人”出现之前，它首先必须已经是一个合法的“机器人”。

而销毁顺序恰好相反：

```text
Infantry destroyed
Robot destroyed
```

也就是：

\[
\boxed{
\text{先析构派生类}
\rightarrow
\text{再析构基类}
}
\]
