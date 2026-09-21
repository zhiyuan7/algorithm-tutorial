## 一、理解 ROS 2 的两个起点：Node 与 Callback

### 1. 从机器人程序的特点出发：为什么需要 Node？

一个稍微复杂一些的机器人，通常都不是一个简单的程序。

例如一台移动机器人可能同时进行：

\[
\text{相机采集}
\rightarrow
\text{目标检测}
\rightarrow
\text{目标定位}
\rightarrow
\text{路径规划}
\rightarrow
\text{运动控制}
\]

与此同时，还可能有：

\[
\text{IMU读取、雷达处理、状态估计、日志记录、通信、UI}
\]

等等任务。

如果把所有这些功能全部写进一个巨大的 `main()` 函数中，程序很快就会变得难以开发、调试和维护。

因此，ROS 2 首先采用了一种非常自然的思想：

\[
\boxed{\text{把一个复杂机器人系统拆成若干相对独立的计算单元}}
\]

这些计算单元，就是 **Node（节点）**。

ROS 2 官方把 Node 描述为 ROS graph 中的参与者和典型的计算单元，并建议一个 Node 负责一个相对独立的逻辑功能。Node 可以和同一进程、其他进程，甚至其他计算机上的 Node 通信。

比如我们可以设计：

```text
camera_node
    ↓
detector_node
    ↓
localization_node
    ↓
planner_node
    ↓
controller_node
```

每一个节点只关心自己的功能。

例如：

- `camera_node` 只负责产生图像；
- `detector_node` 只负责检测目标；
- `planner_node` 只负责路径规划；
- `controller_node` 只负责输出控制量。

于是整个机器人就从一个庞大的单体程序，变成了一张由许多 Node 组成的计算图，也就是 ROS 2 中所谓的 **ROS Graph**。

#### 1.1 分布式计算

Node 的另一个重要意义在于，它天然适合分布式计算。

机器人的计算平台不一定只有一台计算机。

例如可以有：

```text
Jetson
    ├─ 相机处理
    ├─ 神经网络推理
    └─ 三维视觉

MCU
    ├─ 电机控制
    └─ 编码器读取

另一台工控机
    └─ 路径规划
```

计算量大的任务可以运行在性能更强的平台上，而简单、实时性要求高的任务可以运行在 MCU 或嵌入式平台上。

ROS 2 的通信机制屏蔽了很大一部分“这些节点到底运行在哪台机器上”的差异。

所以从程序设计的角度看：

\[
\boxed{\text{Node 是逻辑上的功能划分}}
\]

而不是：

\[
\boxed{\text{Node = Process}}
\]

这一点非常重要。

一个 Node 可以独占一个进程，也可以和许多其他 Node 一起运行在同一个进程中。

#### 1.2 故障隔离

如果把不同节点放入不同进程，那么操作系统会给这些进程分配彼此独立的虚拟地址空间。

这就带来一个重要优点：**故障隔离**。

假设：

```text
camera_process

detect_process

control_process
```

三个程序分别运行。

如果 `detect_process` 因为非法内存访问发生崩溃，那么通常并不会直接导致另外两个进程一起崩溃。

相反，如果所有功能都写在同一个进程中：

```text
camera
detect
control
```

那么某一个模块发生严重错误，例如 segmentation fault，就可能导致整个进程退出。

因此，多进程部署通常拥有更好的故障隔离能力。

但是我们稍后会看到：

> 多进程虽然隔离性好，却又增加了通信成本。

ROS 2 后面的 Component、Composition、Intra-process Communication，其实正是在寻找：

\[
\boxed{\text{模块化、故障隔离与通信效率之间的平衡}}
\]

### 2. 从“函数什么时候执行”出发：Callback

把机器人拆成很多 Node 以后，第二个问题出现了：

> **节点里面的函数应该什么时候执行？**

机器人程序中的很多函数并不是只调用一次。

例如目标检测函数：

```cpp
detect(image);
```

显然不能只运行一次。

我们希望每得到一幅新的图像，就运行一次。

而控制器：

```cpp
control();
```

可能希望每隔 1 ms 调用一次，也就是以大约

\[
1000\text{ Hz}
\]

的频率运行。

于是机器人程序中出现了两类非常典型的执行方式。

#### 2.1 事件驱动

第一种是：

\[
\boxed{\text{有事件发生}\Rightarrow\text{执行函数}}
\]

例如图像处理。

我们并不希望不断写：

```cpp
while (true)
{
    check_image();
}
```

因为在没有新图像的时候，这样做没有意义。

更加自然的逻辑应该是：

```text
新图像到来
      ↓
触发图像回调
      ↓
执行图像处理
```

因此可以写成类似：

```cpp
void image_callback(const Image & image)
{
    detect(image);
}
```

当消息到达时，ROS 2 才安排这个函数执行。

这就是一个典型的 **Callback（回调函数）**。


#### 2.2 时间驱动

另外一些函数并不是由消息触发，而是希望按照一定周期执行。

例如控制系统中的：

```text
外环：100 Hz
内环：500 Hz
电流环：1000 Hz
```

这时候可以创建 Timer：

```text
Timer到期
    ↓
触发Timer Callback
    ↓
执行控制函数
```

比如：

```cpp
void control_callback()
{
    calculate_control_command();
}
```

因此：

\[
\boxed{
\text{Callback}
=
\text{当某个事件满足条件以后，希望 ROS 2 调用的函数}
}
\]

常见的 Callback 来源包括：

```text
Subscription
Timer
Service
Client
Action
Guard Condition
```

需要注意，Timer 设置为 `1 ms` 并不意味着操作系统能够数学意义上严格保证每隔 `1 ms` 执行一次。

Timer 只是告诉 ROS 2：

> 到达这个时间以后，这个 Callback 已经 ready。

真正什么时候获得 CPU，还要受到 Executor、线程、操作系统调度以及其他 Callback 执行时间的影响。

所以 ROS 2 中“回调什么时候 Ready”和“回调什么时候真正执行”是两个不同的问题。

后面的叙述都会围绕两个角度展开：**节点（Node）**如何划分和组织机器人系统，以及**回调函数（Callback）**在什么条件下被调度执行。


## 二、通信方式：Topic 与 Service

Node 被拆开以后，自然又出现一个问题：

> Node A 产生的数据，怎样交给 Node B？

这就是 ROS 2 的通信系统。

ROS 2 最常见的通信方式包括：

\[
\boxed{\text{Topic、Service、Action}}
\]

这里首先讨论 Topic 和 Service。


### 1. Topic：我产生了一个信息，谁需要谁来听

Topic 使用的是：

\[
\boxed{\text{Publish / Subscribe}}
\]

模型。

例如：

```text
Camera Node
    │
    │ publish
    ▼
/camera/image
    │
 ┌──┴──────────┐
 ▼             ▼
Detector     Recorder
```

相机节点并不需要知道：

```text
谁需要我的图像？
有几个节点需要？
它们运行在哪台机器？
```

它只需要做：

```text
publish(image)
```

订阅 `/camera/image` 的节点则会在消息到达以后触发自己的 Subscription Callback。

ROS 2 官方将 Topic 推荐用于**连续数据流**，例如传感器数据、机器人状态等。Publisher 与 Subscriber 通过 Topic 名称发现彼此，而且可以形成多发布者、多订阅者的 many-to-many 结构。

因此 Topic 的核心语义是：

\[
\boxed{
\text{发布者只负责发布信息，不等待某个具体接收者给出回答}
}
\]

例如：

```text
camera image
lidar point cloud
IMU
joint state
target position
robot state
```

都非常适合使用 Topic。

从 ROS 2 API 的角度：

> Topic 是一种异步、松耦合的发布—订阅通信模型。


### 2. Service：我要你完成一次请求，并给我结果

另一种问题完全不同。

例如：

```text
“请告诉我机器人当前地图保存成功了吗？”
```

或者：

```text
“请计算一下这个位置的逆运动学。”
```

这里客户端并不是简单地广播一个信息，而是在表达：

\[
\boxed{\text{请你完成一件事情，然后把结果返回给我}}
\]

因此 ROS 2 提供了 Service。

Service 使用：

\[
\boxed{\text{Request / Response}}
\]

模型。

例如：

```text
Client
   │
   │ Request
   ▼
Server
   │
   │ calculation
   ▼
Response
   │
   ▼
Client
```

一个 `.srv` 接口本身就由两部分组成：

```text
Request
Response
```

ROS 2 官方把 Service 定义为一种 Remote Procedure Call，即一个 Node 请求另一个 Node 执行某个计算并返回结果。

比如：

```text
request:
    target_pose

response:
    success
    error_code
```

客户端发出：

```text
“移动到这里。”
```

服务端返回：

```text
“请求是否被接受/处理完成。”
```

需要特别区分两个概念：

#### 2.1 Service 的语义是 Request/Response

但客户端代码**并不一定必须阻塞等待**。

例如 C++ 中常见：

```cpp
async_send_request(...)
```

调用本身完全可以是异步的。

所以：

\[
\text{Service}
\neq
\text{必须使用同步阻塞函数}
\]

更准确地说是：

\[
\boxed{
\text{Service 的通信关系存在明确的 Request 与 Response 对应关系}
}
\]

这正是它与 Topic 最重要的区别。

## 三、通信匹配

当两个节点希望通过 Topic 或 Service 通信时，不能只看“是否都创建了 Publisher、Subscription、Client 或 Server”。它们还需要在 QoS、接口类型和名称这三个方面满足相应条件。

### 1. QoS：通信行为是否兼容

ROS 2 中另外一个非常重要的概念叫：

\[
\boxed{\text{QoS：Quality of Service}}
\]

也就是服务质量。

假设有一台机器人通过无线网络发送相机：

```text
1920 × 1080
60 FPS
```

如果每一帧图像都要求：

> 一帧也不能丢，必须重传直到成功。

网络一旦发生波动，大量旧图像就可能堆积。

但对于机器人视觉而言：

> 两秒以前的一帧图像即使最终可靠到达，可能已经没有意义了。

于是很多传感器数据更加适合：

```text
Best Effort
```

也就是说：

> 尽最大努力发送，但网络不好时允许丢数据。

而另外一些消息，例如某些重要状态或者指令，又可能更加希望使用：

```text
Reliable
```

ROS 2 因此允许开发者定义通信行为。官方 QoS 文档指出，ROS 2 可以根据不同 QoS 配置，在“类似可靠传输”与“Best Effort”之间做选择。

常见 QoS 包括：

| QoS | 含义 |
|---|---|
| History | 保存历史消息的方式 |
| Depth | `Keep Last` 时最多保存多少条 |
| Reliability | `Reliable` 或 `Best Effort` |
| Durability | 新加入的订阅者是否能取得此前数据 |
| Deadline | 消息期望更新周期 |
| Lifespan | 消息有效时间 |
| Liveliness | 如何判断通信实体仍然存活 |

例如：

#### 1.1 Reliability

```text
Reliable
```

要求尽量保证消息交付，可以进行重传。

```text
Best Effort
```

则允许丢失消息。

#### 1.2 Durability

常见的：

```text
Volatile
```

表示订阅者只能接收加入之后的新消息。

而：

```text
Transient Local
```

则允许 Publisher 保存一定历史数据，使后加入的 Subscriber 仍然可能收到此前的数据。


#### 1.3 QoS 并不要求“完全一样”

这是一个非常重要的地方。

通信双方的 QoS：

\[
\boxed{\text{不要求完全相同，而要求兼容}}
\]

ROS 2 使用一种 **Request / Offered** 模型。

Publisher 是：

\[
\text{Offered QoS}
\]

Subscriber 是：

\[
\text{Requested QoS}
\]

只有 Publisher 提供的服务能够满足 Subscriber 的最低要求，两者才能建立连接。

例如 Reliability：

| Publisher | Subscriber | 能否通信 |
|---|---|---|
| Reliable | Reliable | 可以 |
| Reliable | Best Effort | 可以 |
| Best Effort | Best Effort | 可以 |
| Best Effort | Reliable | 不可以 |

原因很好理解。

Publisher 如果说：

> “我能够可靠发送。”

Subscriber 只要求：

> “Best Effort 就够了。”

当然没有问题。

反过来 Publisher 只能提供：

```text
Best Effort
```

而 Subscriber 要求：

```text
Reliable
```

Publisher 无法满足它。

因此不能建立兼容连接。

QoS 只是通信匹配的第一层：它决定双方的通信行为能否兼容。即使 QoS 兼容，接口类型和名称不匹配时，通信同样无法建立。

### 2. 接口类型：双方交换的内容是否一致

ROS 2 中，通信时需要匹配的不只是“有没有数据”，还要明确数据或请求、响应采用什么**接口类型（Interface Type）**。

对于 Topic，Publisher 与 Subscription 必须使用同一种**消息类型**。例如：

```text
/camera/image
    ├─ Publisher:    sensor_msgs/msg/Image
    └─ Subscription: sensor_msgs/msg/Image
```

如果一个节点发布的是 `sensor_msgs/msg/Image`，另一个节点却按 `sensor_msgs/msg/CompressedImage` 订阅，即使两边 Topic 名称相同，也不能正常通信。

对于 Service，Client 与 Server 则必须使用同一种**服务类型**，因为请求和响应是一对整体。例如：

```text
/reset_odometry
    ├─ Client: std_srvs/srv/Empty
    └─ Server: std_srvs/srv/Empty
```

ROS 2 已经提供了许多可直接使用的接口类型。常见的消息类型来自：

```text
std_msgs
geometry_msgs
sensor_msgs
nav_msgs
trajectory_msgs
```

常见的服务类型则包括 `std_srvs`、`example_interfaces`、`nav_msgs` 等包中的 `.srv` 定义。

当现成类型无法表达自己的业务数据时，也可以在自己的 ROS 2 包中定义接口：

- 用 `.msg` 定义自定义消息类型，供 Topic 使用。例如可以创建 `msg/RobotStatus.msg`：

  ```text
  int32 robot_id
  float32 battery_voltage
  bool is_charging
  ```

  这个消息类型可以用来发布某台机器人的编号、电池电压和充电状态。

- 用 `.srv` 定义自定义服务类型，其中 `---` 前是 Request、后是 Response。例如可以创建 `srv/SetMode.srv`：

  ```text
  string mode
  ---
  bool success
  string message
  ```

  Client 请求切换到某个 `mode`，Server 则通过 `success` 和 `message` 返回处理结果。

因此，“类型匹配”并不只指消息类型；它更准确地指：**Topic 两端要使用相同的消息类型，Service 两端要使用相同的服务类型**。

### 3. 名称：双方是否在寻找同一个通信端点

类型一致以后，双方还要使用同一个解析后的名称。

对于 Topic：

```text
Publisher  →  /camera/image  ←  Subscription
```

对于 Service：

```text
Client  →  /reset_odometry  ←  Server
```

名称不同，ROS 2 就会把它们视为不同的通信端点；例如发布 `/camera/image`，却订阅 `/front_camera/image`，二者不会自动连接。

这里应特别注意：代码中的相对名称会受到节点命名空间和 remapping 规则影响。真正用于匹配的是 ROS 2 最终解析出来的名称，而不是只看源码中写下的字符串。

因此可以把通信匹配概括为：

\[
\boxed{
\text{Name Match + Interface Type Match + Compatible QoS}
}
\]

其中，Topic 需要名称、消息类型和 QoS 兼容；Service 至少需要名称与服务类型对应。实际开发时，还应让名称所表达的业务语义保持一致，例如不要把名为 `/camera/image` 的端点拿来传递完全无关的数据。


## 四、回调函数的执行

到目前为止，我们知道：

```text
Node
    ↓
创建 Publisher / Subscription / Timer / Service
    ↓
产生 Callback
```

但一个更加底层的问题还没有回答：

> **这些 Callback 到底由谁执行？**

要回答这个问题，需要先把 ROS 2 的执行模型与操作系统中的 Process（进程）和 Thread（线程）联系起来。

一个 Process 是操作系统分配资源与隔离运行环境的基本单位。不同 Process 通常拥有彼此独立的虚拟地址空间；这也是一个进程崩溃通常不会直接破坏另一个进程内存的原因。

一个 Process 可以包含多个 Thread。Thread 是实际被操作系统调度执行的基本单位：同一 Process 内的 Thread 共享该进程的地址空间和大部分资源，但每个 Thread 仍有自己的栈与寄存器上下文。

当可运行的 Thread 多于 CPU 核心时，操作系统调度器会在它们之间分配 CPU 时间；常见的分时调度会让 Thread 在一个时间片内运行，再在需要时切换到其他 Thread。因此，线程能够带来并发，但它不保证某个 Callback 会在数学意义上精确的时刻获得 CPU。

### 1. 进程的分配

#### 1.1 传统方式：一个 Node 一个进程

最简单的 ROS 2 程序通常长这样：

```cpp
int main(...)
{
    rclcpp::init(...);

    auto node =
        std::make_shared<MyNode>();

    rclcpp::spin(node);

    rclcpp::shutdown();
}
```

编译以后得到：

```text
my_node
```

然后运行：

```bash
ros2 run my_package my_node
```

操作系统会创建一个 Process，而 Node 就运行在这个 Process 中。

所以在最直观的使用方式中，很容易形成：

```text
Process A
    └─ Node A

Process B
    └─ Node B

Process C
    └─ Node C
```

这种结构的优点是：

```text
隔离性强
调试方便
某个进程崩溃不一定拖垮其他进程
```

但是缺点也非常明显：

\[
\boxed{\text{进程间通信成本}}
\]

尤其是传输：

```text
Image
PointCloud2
大型地图
三维数组
```

这类巨大消息时。

传统跨进程通信通常会涉及：

```text
ROS message
     ↓
serialization
     ↓
middleware
     ↓
transport
     ↓
deserialization
     ↓
ROS message
```

数据量非常大的时候，这些工作会带来 CPU、内存带宽和延迟开销。


#### 1.2 Component 方式：多个 Node 放到同一个 Process

于是 ROS 2 提供了 **Composition / Component** 机制。

核心思想是：

\[
\boxed{\text{Node 仍然保持逻辑独立，但可以部署到同一个进程}}
\]

例如原来：

```text
Process 1
└─ camera_node

Process 2
└─ detector_node

Process 3
└─ tracker_node
```

现在可以变成：

```text
Component Container Process
├─ camera_node
├─ detector_node
└─ tracker_node
```

ROS 2 官方 Composition 文档明确支持把多个 Node 组合到同一进程中，而且组件可以在运行过程中动态加载和卸载。

Component 通常被编译为可以动态加载的共享库，而不是每个 Node 都必须拥有自己的 `main()`。

于是可以：

```bash
ros2 run rclcpp_components component_container
```

启动一个容器，然后：

```bash
ros2 component load ...
```

把不同 Component 动态加载进去。


##### 1.2.1 进程内通信（Intra-process Communication）

既然 Publisher 与 Subscriber 已经处在同一个 Process 中，那么理论上就没有必要：

```text
序列化
→ 发送
→ 反序列化
```

完全可以直接利用进程内存中的对象传递。

这就是：

\[
\boxed{\text{Intra-process Communication}}
\]

ROS 2 的进程内通信机制可以直接利用进程内存，在合适情况下避免序列化，并减少甚至避免消息数据的复制。

例如：

```text
Publisher
    │
    │ shared_ptr / ownership transfer
    ▼
Subscriber
```

而不是：

```text
Publisher
    ↓
Serialize
    ↓
DDS
    ↓
Deserialize
    ↓
Subscriber
```

这对图像和点云尤其重要。

不过这里最好不要简单地说：

> “Component 就等于零拷贝。”

更加准确的是：

\[
\boxed{
\text{Composition 提供同进程部署条件，
Intra-process Communication 提供高效进程内传输机制}
}
\]

而实际是否真正做到 **0 copy**，还与消息所有权、Subscriber 数量、API 使用方式和底层实现有关。ROS 2 的设计文档明确讨论了 `unique_ptr`、`shared_ptr` 以及不同 Subscriber 数量下可能产生的复制次数，因此“同进程”并不意味着任何情况下都严格为零次复制。

而且当前 Component 的 `use_intra_process_comms` 是一个需要配置的选项，并不能简单认为“只要放进 Component Container，就自动拥有所有进程内通信优化”。


### 2. 回调组（Callback Group）

一个 Process 可以包含多个 Thread。

于是：

```text
Process
├─ Thread 1
├─ Thread 2
├─ Thread 3
└─ Thread 4
```

如果机器人同时有：

```text
image_callback
imu_callback
control_callback
service_callback
```

我们自然会希望：

> 有些 Callback 可以同时运行，而有些 Callback 绝对不能同时运行。

这就是 **Callback Group** 出现的原因。


#### 2.1 Mutually Exclusive Callback Group

第一类是：

\[
\boxed{\text{Mutually Exclusive}}
\]

也就是互斥回调组。

如果：

```text
Callback A
Callback B
Callback C
```

属于同一个 Mutually Exclusive Callback Group，那么：

\[
\boxed{\text{同一时刻最多只能有其中一个 Callback 执行}}
\]

例如：

```text
Group A
├─ update_state()
└─ reset_state()
```

两个函数都修改同一份状态变量。

如果同时执行，很容易产生数据竞争。

于是把它们放入同一个 Mutually Exclusive Callback Group：

```text
update_state ─┐
              ├─ 不允许并发
reset_state ──┘
```

可以非常自然地表达线程安全约束。


#### 2.2 Reentrant Callback Group

第二种是：

\[
\boxed{\text{Reentrant}}
\]

它允许组内 Callback 并发执行。

甚至同一个 Callback 的多个实例，也可能同时运行。

例如：

```text
Callback A(message1)
Callback A(message2)
```

在满足条件时可能并发。

因此：

```text
Reentrant
        ↓
允许 Executor 并行调度组内 Callback
```

官方文档将二者的区别概括为：

- Mutually Exclusive：组内 Callback 不允许并行；
- Reentrant：组内 Callback 可以并行；
- 不同 Callback Group 中的 Callback 也可以并行执行。

这里还有一个很容易忽略的细节：

\[
\boxed{\text{Node 的默认 Callback Group 是 Mutually Exclusive}}
\]

如果你创建：

```text
Subscription
Timer
Service
```

时什么 Callback Group 都没有指定，那么它们通常全部进入默认 Callback Group。

于是即使使用：

```cpp
MultiThreadedExecutor
```

但所有 Callback 都在同一个默认 Mutually Exclusive Group 中，那么这些 Callback 仍然无法相互并发。

换句话说：

\[
\boxed{
\text{MultiThreadedExecutor}
\not\Rightarrow
\text{你的 Callback 一定并发}
}
\]

这是使用 ROS 2 多线程时非常重要的一点。


### 3. 执行器（Executor）

现在终于可以引出 ROS 2 执行模型的核心：

\[
\boxed{\text{Executor}}
\]

我们前面已经知道：

```text
Subscription
Timer
Service
...
      ↓
产生 ready Callback
```

但 Callback 自己不会突然获得 CPU。

真正负责发现：

> 哪些 Callback 已经可以执行？

并把它们交给线程运行的，是 **Executor**。

官方对 Executor 的描述就是：Executor 使用底层操作系统的一个或多个线程来调用 Subscription、Timer、Service、Action 等产生的 Callback。

可以把关系理解为：

```text
Node
│
├─ Subscription Callback ─┐
├─ Timer Callback ────────┤
├─ Service Callback ──────┤
└─ Action Callback ───────┘
             │
             ▼
       Callback Groups
             │
             ▼
          Executor
             │
             ▼
       OS Threads
             │
             ▼
            CPU
```

这里特别需要强调：

> Executor 通常不是给每一个 Callback Group 永久分配一条线程。

尤其对于 `MultiThreadedExecutor`，更准确的理解是：

\[
\boxed{\text{Executor 维护一组工作线程，形成线程池}}
\]

某个 Callback Ready 以后：

```text
Executor发现Callback ready
       ↓
检查Callback Group并发约束
       ↓
寻找可执行Callback
       ↓
由线程池中的某个线程执行
```

官方也明确把 Multi-Threaded Executor 描述为使用多个线程形成线程池，在 Callback Group 约束允许的情况下尽可能并行处理 Callback。


#### 3.1 SingleThreadedExecutor

\[
\boxed{\text{单线程执行器}}
\]

只有一条线程处理 Callback。

例如：

```text
Callback A
    ↓
Callback B
    ↓
Callback C
```

不存在 Callback 之间真正意义上的并行执行。

我们平时写：

```cpp
rclcpp::spin(node);
```

从经典执行模型上，可以理解成创建了一个 SingleThreadedExecutor，然后：

```cpp
executor.add_node(node);
executor.spin();
```

官方文档也是这样解释 `rclcpp::spin()` 的。


#### 3.2 MultiThreadedExecutor

\[
\boxed{\text{多线程执行器}}
\]

拥有多条工作线程。

例如：

```text
              ┌─ Thread 1 → Callback A
Executor ─────┼─ Thread 2 → Callback B
              ├─ Thread 3 → Callback C
              └─ Thread 4
```

但是最终哪些 Callback 可以同时执行，仍然受到 Callback Group 限制。

所以真正的并发关系是：

\[
\boxed{
\text{Executor线程数}
+
\text{Callback Group约束}
+
\text{当前Ready的Callback}
}
\]

共同决定的。

### 4. Wait Set 与 wait() 机制

接下来就是 ROS 2 执行模型中最容易令人迷惑的部分：

> Executor 怎么知道消息来了？

最简单的想象可能是：

```cpp
while (true)
{
    if (image_ready)
        run_image();

    if (imu_ready)
        run_imu();

    if (timer_ready)
        run_timer();
}
```

也就是不停地检查。

但是如果真的进行 CPU busy polling：

```text
检查
检查
检查
检查
检查
……
```

那会非常浪费 CPU。

ROS 2 实际上主要依赖：

\[
\boxed{\text{Wait Set}}
\]

机制。

Executor 会把：

```text
Subscription
Timer
Service
Client
Guard Condition
...
```

这些可以产生事件的 Entity 放进 Wait Set。

然后进入等待状态。

可以粗略理解为：

```text
Executor
   │
   ▼
rmw_wait(...)
   │
   ├──── 没有事件 ────> sleep / block
   │
   └──── 有事件
              ↓
          wake up
              ↓
       检查哪些Entity ready
              ↓
        选择Callback执行
```

当 `wait()` 返回时，可以把这一轮看到的 ready 状态理解成一次快照。Executor 会从这份快照中逐个取出可执行实体；本轮快照处理完以后，再次进入 `wait()`，等待新的事件：

```text
         DDS / ROS entities

   A       B       C
   │       │       │
   └───────┼───────┘
           ↓
         wait()

           ↓

   一次 ready snapshot

    [ A , B , C ]
      ↑
      │
   取出 A

    [ × , B , C ]

         ↓
      执行 A()

         ↓

    [ × , B , C ]
          ↑
       再取 B

         ↓

    [ × , × , C ]

         ↓
       再取 C

         ↓

    [ × , × , × ]

         ↓
     再次 wait()
```

ROS 2 官方 RMW 文档也描述了这个过程：Executor 向 middleware 提交需要等待的 Subscription、Client、Server 等实体，通过 `rmw_wait()` 等待，至少一个实体存在新数据或者等待超时以后返回，再检查哪些实体已经 ready 并触发相应 Callback。

所以 ROS 2 所谓的“polling”更适合理解成：

\[
\boxed{\text{等待事件 + 醒来以后扫描Ready Entity}}
\]

而不是简单的：

\[
\boxed{\text{CPU无休止地while(true)查询}}
\]

因此，当系统没有发生拥塞时，执行效果可能看起来比较接近 FIFO；

但是一旦 Callback 执行速度赶不上消息产生速度，消息开始在 middleware 中积压以后，经典 Executor 的调度更接近：

\[
\boxed{\text{Round-Robin}}
\]

而不是全局 FIFO。官方当前 Executor 文档明确指出，在出现积压以后，Wait Set 只知道某一个 Topic 是否存在消息，而不知道完整队列长度，因此 Executor 会以 round-robin 的方式处理 ready 的消息，而不是按照严格 FIFO 顺序。

可以近似理解成：

```text
A有数据 → 取一个A
B有数据 → 取一个B
C有数据 → 取一个C

再回来：

A还有数据 → 再取一个A
...
```

而不是：

```text
按照所有消息的全局到达时间
严格排序
```

### 5. 优先级策略

可以。

这也是理解 ROS 2 更高级调度方式的关键。

可以构造：

```text
Process
│
├─ Executor A
│    └─ Control Callback Group
│
└─ Executor B
     └─ Perception Callback Group
```

ROS 2 的 `Executor::add_callback_group()` 就允许将不同 Callback Group 分配给不同 Executor。官方文档也明确指出，可以利用这种方式再结合操作系统线程调度，对某些 Callback 进行更高优先级处理。

例如：

```text
Control Callback Group
       ↓
Executor A
       ↓
High Priority OS Thread
```

而：

```text
Logging Callback Group
       ↓
Executor B
       ↓
Normal Priority OS Thread
```

这样就可以让：

```text
500 Hz控制环
```

比：

```text
日志
可视化
普通Service
```

拥有更高的操作系统调度优先级。

不过 Callback Group 一旦已经关联到某个 Executor，就不能同时再属于另一个 Executor；rclcpp 的 Executor Entity 管理接口也会检查这种关联关系。

所以更准确地说：

\[
\boxed{
\text{一个Process中可以存在多个Executor，
不同Callback Group可以被分配给不同Executor}
}
\]

如果真的希望：

```text
控制线程 Priority 90
视觉线程 Priority 50
日志线程 Priority 10
```

通常需要进一步结合 Linux 的：

```text
SCHED_FIFO
SCHED_RR
thread priority
CPU affinity
```

等操作系统实时调度机制。

ROS 2 官方 Executor 文档也正是建议通过“不同 Callback Group → 不同 Executor → 配置底层线程的 OS Scheduler”来实现更明确的优先处理。

## 五、Launch：如何启动整个机器人系统？

到目前为止，我们已经把机器人拆成了很多：

```text
Node
Component
Process
```

那么最后一个现实问题就是：

> 难道机器人每次启动，都要打开十几个 Terminal，然后一个一个执行 `ros2 run` 吗？

显然不现实。

如果只有一个普通可执行 Node：

```bash
ros2 run package_name executable_name
```

当然没有问题。

但是一个真正机器人可能需要同时启动：

```text
camera
imu
detector
tracker
localization
planner
controller
rviz
robot_state_publisher
tf
...
```

因此 ROS 2 提供：

\[
\boxed{\text{Launch System}}
\]

官方对 Launch 的描述是：

> Launch 系统用于描述整个系统的配置，然后按照配置执行它，包括运行哪些程序、传入什么参数以及 ROS 特有的各种配置。

于是我们可以写一个 Launch File：

```text
robot.launch.py
```

里面描述：

```text
启动camera
启动detector
启动tracker
启动controller

设置参数
设置namespace
设置remapping
设置environment
启动component container
把component加载进container
```

最后只需要：

```bash
ros2 launch my_package robot.launch.py
```

整个机器人软件系统就可以启动。

Launch 并不只是“批量执行几个 `ros2 run`”。

它还承担：

\[
\boxed{
\text{整个ROS 2系统的部署与配置描述}
}
\]

例如官方文档就支持用 Launch 创建 Component Container，并把多个 Composable Node 加载到其中，同时设置 remapping、parameter 以及 `use_intra_process_comms`。

因此 Launch 实际上处于一个比 Node 更高的层次。
